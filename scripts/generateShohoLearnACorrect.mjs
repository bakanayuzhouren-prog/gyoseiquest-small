/**
 * 商法・会社法: 誤答肢（K列・（ｒ）なし）を条文・解説に基づき正しいA列文に変換
 *
 *   node scripts/generateShohoLearnACorrect.mjs --dry-run --limit 5
 *   node scripts/generateShohoLearnACorrect.mjs --overwrite --limit 10
 *   node scripts/generateShohoLearnACorrect.mjs --write
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHEET = '商法・会社法';
const STATUTE_SHEET = '解説資料（商・会）';
const START_ROW = 2;
const OUT_DIR = path.join(__dirname, 'output');
const CACHE_PATH = path.join(OUT_DIR, 'shoho-a-correct-cache.json');

const GEMINI_KEY = (process.env.GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY || '').trim();
const PROMPT_MODEL = 'gemini-2.5-flash';

const KANJI_DIGITS = { 〇: 0, 零: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
const KOU_CIRCLED = { 2: '②', 3: '③', 4: '④', 5: '⑤', 6: '⑥', 7: '⑦', 8: '⑧', 9: '⑨' };

const STYLE_REF = `【短縮の手本】
長文：商人の営業、商行為その他商事については、他の法律に特別の定めがあるものを除くほか、商法の定めるところによる。
短縮：商人の営業、商行為など商事について、他の法律に特別の定めがない限り、商法が適用

短縮のコツ：
- 「その他」→「など」、「ものを除くほか」→「ない限り」、「定めるところによる」→「適用」
- 目安25〜55字。条件・効果の骨格だけ残す`;

function zen2han(s) {
  return String(s || '').replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function parseKanjiNumber(kanji) {
  const s = String(kanji || '').trim();
  if (!s) return null;
  if (/^\d+$/.test(s)) return parseInt(s, 10);
  if (!/^[〇零一二三四五六七八九十百千]+$/.test(s)) return null;
  let total = 0;
  let num = 0;
  for (const ch of s) {
    if (ch in KANJI_DIGITS) num = KANJI_DIGITS[ch];
    else if (ch === '十') {
      total += (num || 1) * 10;
      num = 0;
    } else if (ch === '百') {
      total += (num || 1) * 100;
      num = 0;
    } else if (ch === '千') {
      total += (num || 1) * 1000;
      num = 0;
    } else return null;
  }
  return total + num;
}

function convertStatuteKanjiNumeralsToArabic(raw) {
  let s = zen2han(String(raw || '')).replace(/項/g, '项');
  s = s.replace(/第([〇零一二三四五六七八九十百千]+)条/g, (_, k) => {
    const n = parseKanjiNumber(k);
    return n != null ? `第${n}条` : `第${k}条`;
  });
  s = s.replace(/第([〇零一二三四五六七八九十百千]+)項/g, (_, k) => {
    const n = parseKanjiNumber(k);
    return n != null ? `第${n}项` : `第${k}项`;
  });
  s = s.replace(/条の([〇零一二三四五六七八九十]+)(?![〇零一二三四五六七八九十百千])/g, (_, k) => {
    const n = parseKanjiNumber(k);
    return n != null ? `条の${n}` : `条の${k}`;
  });
  return s;
}

function getAuth(write = false) {
  const scope = write
    ? 'https://www.googleapis.com/auth/spreadsheets'
    : 'https://www.googleapis.com/auth/spreadsheets.readonly';
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: [scope],
    });
  }
  return process.env.GOOGLE_SHEETS_API_KEY;
}

function isQuestionH(h) {
  const t = String(h || '').trim();
  if (t.length < 40) return false;
  return /どれか(?:[。.]|$)|どれ(?:[。.]|$)|ものか(?:[。.]|$)|なるか(?:[。.]|$)|述べよ|選びなさい|いくつある|組合せはどれ/.test(t);
}

function stripChoice(k) {
  return String(k || '')
    .replace(/（ｒ）|\(ｒ\)|\(r\)/gi, '')
    .replace(/^[\s　]*[ア-オ①②③④⑤⑥⑦⑧⑨⑩⑪⑫][\s　．.、]/, '')
    .trim();
}

function isCorrectK(rawK) {
  return /[（(][ｒr][）)]/i.test(String(rawK || ''));
}

function cacheKey(k) {
  return `W:${k}`;
}

function isBadCache(text) {
  const t = String(text || '').trim();
  if (!t || t.length < 8) return true;
  if (/^(The|SKIP|EMPTY|【誤答)/i.test(t)) return true;
  if (/^[0-9０-９]+[.．]/.test(t)) return true;
  if (/試験の定説|行政書士試験/.test(t)) return true;
  return false;
}

function extractRefsFromM(m) {
  if (!m) return '';
  const head = zen2han(String(m)).slice(0, 1200);
  if (/最判|高判|地判|家裁判/.test(head.slice(0, 300)) && !/第\d+条|商法|会社法/.test(head.slice(0, 300))) {
    return '';
  }
  let seed = '';
  const label = head.match(/根拠(?:条文|と判例|判例)?[：:]\s*([^\n。]+)/);
  if (label) seed = label[1];
  else {
    const inline = head.match(
      /((?:商法|会社法|民法)第?\d+条(?:の\d+)?(?:第?\d+項)?(?:[、,]\s*(?:および\s*)?(?:商法|会社法|民法)?第?\d+条(?:の\d+)?(?:第?\d+項)?)*)/,
    );
    if (inline) seed = inline[1];
  }
  if (!seed) return '';
  const refs = [];
  const re = /(商法|会社法|民法)?第?(\d+)条(?:の(\d+))?(?:第?(\d+)項)?/g;
  let m2;
  let lastLaw = '';
  while ((m2 = re.exec(seed))) {
    const law = m2[1] || lastLaw;
    if (m2[1]) lastLaw = m2[1];
    let part = `${law}${m2[2]}条`;
    if (m2[3] && m2[4]) part += `の${m2[3]}第${m2[4]}項`;
    else if (m2[3]) part += `の${m2[3]}`;
    else if (m2[4]) part += `${m2[4]}項`;
    refs.push(part);
  }
  return [...new Set(refs.filter(Boolean))].join(',');
}

function extractRefsFromI(i) {
  if (!i) return '';
  const refs = [];
  const re = /(商法|会社法|民法)?第?(\d+)条(?:の(\d+))?(?:第?(\d+)項)?/g;
  let m;
  let lastLaw = '';
  const head = zen2han(String(i)).slice(0, 600);
  while ((m = re.exec(head))) {
    const law = m[1] || lastLaw;
    if (m[1]) lastLaw = m[1];
    let part = `${law}${m[2]}条`;
    if (m[3] && m[4]) part += `の${m[3]}第${m[4]}項`;
    else if (m[3]) part += `の${m[3]}`;
    else if (m[4]) part += `${m[4]}項`;
    refs.push(part);
  }
  return [...new Set(refs.filter(Boolean))].join(',');
}

function isMainBodyStatute(title) {
  const t = String(title || '');
  if (/附\s*則|附則|施行期日|経過措置|旧法及び|この附則/.test(t)) return false;
  if (/^(商法|会社法|民法) 第.+条 [一二三四五六七八九十\d]+ （/.test(t)) return false;
  if (!/第[0-9０-９\d]+项|第[0-9０-９\d]+項/.test(convertStatuteKanjiNumeralsToArabic(t)) && !/（[^）]+）/.test(t)) {
    return false;
  }
  return true;
}

function parseRef(ref) {
  const r = zen2han(String(ref || '')).replace(/第/g, '').replace(/項/g, '项').trim();
  const m = r.match(/^(商法|会社法|民法)?(\d+)条(?:の(\d+))?(?:(\d+)项)?$/);
  if (!m) return null;
  return {
    law: m[1] || '商法',
    art: parseInt(m[2], 10),
    sub: m[3] ? parseInt(m[3], 10) : 0,
    kou: m[4] ? parseInt(m[4], 10) : 0,
  };
}

function parseStatuteTitleKey(title) {
  const law = (String(title).match(/^(商法|会社法|民法)/) || ['', ''])[1];
  if (!law) return null;
  const norm = convertStatuteKanjiNumeralsToArabic(title);
  const artM = norm.match(/第(\d+)条(?:の(\d+))?/);
  if (!artM) return null;
  const kouM = norm.match(/第(\d+)项/);
  return {
    law,
    art: parseInt(artM[1], 10),
    sub: artM[2] ? parseInt(artM[2], 10) : 0,
    kou: kouM ? parseInt(kouM[1], 10) : 0,
  };
}

async function loadStatuteCatalog(sheets) {
  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `'${STATUTE_SHEET.replace(/'/g, "''")}'!B:C`,
  });
  const rows = resp.data.values || [];
  const catalog = [];
  for (let i = 1; i < rows.length; i++) {
    const title = (rows[i][0] || '').trim();
    const content = (rows[i][1] || '').trim();
    if (!title || title === '条・項・号・目的' || !content) continue;
    if (!isMainBodyStatute(title)) continue;
    const key = parseStatuteTitleKey(title);
    if (!key) continue;
    catalog.push({ title, content, key, order: i });
  }
  return catalog;
}

function pickBestHits(hits) {
  if (hits.length <= 1) return hits;
  const withCaption = hits.filter((s) => /（[^）]+）/.test(s.title));
  const pool = withCaption.length ? withCaption : hits;
  return [pool.sort((a, b) => a.order - b.order)[0]];
}

function findStatutesForRef(ref, catalog) {
  const p = parseRef(ref);
  if (!p) return [];
  let hits = catalog.filter((s) => s.key.law === p.law && s.key.art === p.art && s.key.sub === p.sub);
  if (p.kou > 0) {
    hits = hits.filter((s) => s.key.kou === p.kou);
    hits = pickBestHits(hits);
  } else {
    const withKou = hits.filter((s) => s.key.kou > 0);
    if (withKou.length) {
      const byKou = new Map();
      for (const h of withKou.sort((a, b) => a.order - b.order)) {
        const dupes = withKou.filter((x) => x.key.kou === h.key.kou);
        const best = pickBestHits(dupes)[0];
        if (best) byKou.set(h.key.kou, best);
      }
      hits = [...byKou.values()];
    } else if (hits.length > 1) {
      hits = pickBestHits(hits);
    }
  }
  hits.sort((a, b) => a.key.kou - b.key.kou || a.order - b.order);
  return hits;
}

function formatStatuteBlock(hits) {
  if (!hits.length) return '';
  const firstTitle = hits[0].title;
  const headMatch = firstTitle.match(/第[一二三四五六七八九十百千万〇零\d]+条(?:の[一二三四五六七八九十\d]+)?/);
  const articleHead = headMatch ? headMatch[0] : '';
  const lines = [`${articleHead}　`];
  for (const h of hits) {
    const content = (h.content || '').trim();
    if (!content) continue;
    const kou = h.key.kou;
    if (kou <= 1) lines.push(content);
    else lines.push(`${KOU_CIRCLED[kou] || `${kou}`}　${content}`);
  }
  return lines.join('\n');
}

function buildFullIColumnText(refsString, catalog) {
  if (!refsString) return '';
  const parts = refsString.split(',').map((r) => r.trim()).filter(Boolean);
  const blocks = [];
  const seen = new Set();
  for (const ref of parts) {
    const hits = findStatutesForRef(ref, catalog);
    const block = formatStatuteBlock(hits);
    if (block) {
      const sig = block.slice(0, 80);
      if (!seen.has(sig)) {
        seen.add(sig);
        blocks.push(block);
      }
    }
  }
  return blocks.join('\n\n');
}

function trimOutput(text) {
  let t = String(text || '')
    .replace(/^["「『]|["」』]$/g, '')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, '')
    .trim();
  if (t.length > 65) {
    const cut = t.slice(0, 65);
    const last = Math.max(cut.lastIndexOf('、'), cut.lastIndexOf('。'), cut.lastIndexOf('に'), cut.lastIndexOf('を'));
    t = last > 20 ? cut.slice(0, last + 1) : cut;
  }
  return t;
}

function buildCorrectPrompt({ kText, hContext, mHead, iText, statuteBody, correctChoices }) {
  return `あなたは行政書士試験「見て聞いて覚える」用の超短縮ライターです。
入力は**試験の誤答肢**（K列）です。条文・判例・行政書士試験の定説に照らし、**同じ論点について正しい内容**を1行で書いてください。

${STYLE_REF}

【絶対ルール】
- 出力は正しい内容の要約1行のみ（引用符・番号・Markdown・解説禁止）
- 25〜55字を目標。最大65字
- 「正しい」「誤り」「誤答」は付けない
- 誤答肢の誤った部分をそのまま繰り返さない。条文上正しいルールを書く
- 試験問題の語尾「〜はどれか」は入れない
- 条文・正解肢と矛盾する内容は書かない
- 「行政書士試験」「定説」などのメタ説明は書かない

【問題文（参考）】
${(hContext || '（なし）').slice(0, 220)}

【誤答肢（K列・これを訂正する）】
${kText}

【同じ問題の正解肢（参考）】
${correctChoices.length ? correctChoices.map((c, i) => `${i + 1}. ${c}`).join('\n') : '（なし）'}

【M列深掘り（参考）】
${(mHead || '（なし）').slice(0, 500)}

【I列根拠条文（参考）】
${(iText || '（なし）').slice(0, 400)}

【条文本文（最優先）】
${(statuteBody || '（なし）').slice(0, 2000)}`;
}

async function geminiCall(prompt, useSearch = false) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${PROMPT_MODEL}:generateContent?key=${GEMINI_KEY}`;

  async function attempt(withSearch) {
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.25, maxOutputTokens: 512 },
    };
    if (withSearch) body.tools = [{ google_search: {} }];

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const raw = await res.text();
    if (!res.ok) throw new Error(`${PROMPT_MODEL} ${res.status}: ${raw.slice(0, 500)}`);
    const data = JSON.parse(raw);
    const finish = data.candidates?.[0]?.finishReason;
    if (finish === 'TOO_MANY_TOOL_CALLS') throw new Error('TOO_MANY_TOOL_CALLS');
    let text = (data.candidates?.[0]?.content?.parts || [])
      .filter((p) => p.text)
      .map((p) => p.text)
      .join('')
      .trim();
    text = trimOutput(text);
    if (!text || isBadCache(text)) {
      throw new Error(`生成失敗: ${JSON.stringify(data.candidates?.[0] || data).slice(0, 300)}`);
    }
    return text;
  }

  try {
    return await attempt(useSearch);
  } catch (e) {
    if (useSearch && String(e.message).includes('TOO_MANY_TOOL_CALLS')) {
      return attempt(false);
    }
    throw e;
  }
}

async function geminiCorrectA(job, catalog) {
  const refs = [extractRefsFromI(job.i), extractRefsFromM(job.m)].filter(Boolean).join(',');
  const uniqueRefs = [...new Set(refs.split(',').map((r) => r.trim()).filter(Boolean))].join(',');
  const statuteBody = buildFullIColumnText(uniqueRefs, catalog);
  const prompt = buildCorrectPrompt({
    kText: job.k,
    hContext: job.h,
    mHead: job.m,
    iText: job.i,
    statuteBody,
    correctChoices: job.correctChoices,
  });
  return geminiCall(prompt, !statuteBody);
}

function findEndRowForQuestion(rows, hRows, questionLimit) {
  if (!questionLimit || hRows.length < questionLimit) return rows.length;
  const lastQStart = hRows[questionLimit - 1];
  let finalEndRow = lastQStart;
  for (let i = lastQStart - 1; i < rows.length; i++) {
    const rowNum = i + 1;
    const nh = (rows[i][7] || '').trim();
    if (rowNum > lastQStart && isQuestionH(nh)) break;
    if (stripChoice(rows[i][10] || '').length > 12) finalEndRow = rowNum;
  }
  return finalEndRow;
}

function collectJobs(rows, { questionLimit, rowLimit, wrongOnly }) {
  const hRows = [];
  for (let i = START_ROW - 1; i < rows.length; i++) {
    const h = (rows[i][7] || '').trim();
    if (isQuestionH(h)) hRows.push(i + 1);
  }
  const finalEndRow = questionLimit
    ? findEndRowForQuestion(rows, hRows, questionLimit)
    : rowLimit
      ? START_ROW + rowLimit - 1
      : rows.length;

  const jobs = [];
  let currentH = '';
  let currentCorrect = [];

  for (let i = START_ROW - 1; i < rows.length && i + 1 <= finalEndRow; i++) {
    const row = rows[i];
    const rowNum = i + 1;
    const h = (row[7] || '').trim();
    const rawK = row[10] || '';
    const k = stripChoice(rawK);

    if (isQuestionH(h)) {
      currentH = h;
      currentCorrect = [];
    } else if (h && h.length > 30) {
      currentH = h;
    }

    if (!k || k.length < 12) continue;

    if (isCorrectK(rawK)) {
      currentCorrect.push(k);
      continue;
    }
    if (wrongOnly === false) continue;

    jobs.push({
      rowNum,
      k,
      h: currentH,
      m: (row[12] || '').trim(),
      i: (row[8] || '').trim(),
      correctChoices: [...currentCorrect],
    });
  }

  return { jobs, endRow: finalEndRow, questionCount: questionLimit || hRows.length };
}

async function main() {
  if (!GEMINI_KEY) {
    console.error('GEMINI_API_KEY がありません');
    process.exit(1);
  }

  const dryRun = process.argv.includes('--dry-run');
  const doWrite = process.argv.includes('--write');
  const overwrite = process.argv.includes('--overwrite');
  const wrongOnly = !process.argv.includes('--all-choices');
  const questionLimit = process.argv.includes('--questions')
    ? parseInt(process.argv[process.argv.indexOf('--questions') + 1], 10)
    : null;
  const rowLimit = process.argv.includes('--limit')
    ? parseInt(process.argv[process.argv.indexOf('--limit') + 1], 10)
    : null;

  const sheets = google.sheets({ version: 'v4', auth: getAuth(doWrite) });
  const catalog = await loadStatuteCatalog(sheets);
  console.log(`条文カタログ: ${catalog.length} 件`);

  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `'${SHEET.replace(/'/g, "''")}'!A:M`,
  });
  const rows = resp.data.values || [];
  const { jobs, endRow } = collectJobs(rows, { questionLimit, rowLimit, wrongOnly });

  console.log(`対象: ${jobs.length} 肢（誤答肢のみ）/ R${START_ROW}-R${endRow}${overwrite ? ' / 上書き' : ''}`);

  if (dryRun) {
    for (const j of jobs.slice(0, 10)) {
      console.log(`  R${j.rowNum}: ${j.k.slice(0, 55)}…`);
    }
    if (jobs.length > 10) console.log(`  …他 ${jobs.length - 10} 件`);
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  let cache = {};
  if (fs.existsSync(CACHE_PATH)) cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));

  const updates = [];
  let generated = 0;
  let reused = 0;
  let skipped = 0;

  for (const job of jobs) {
    const key = cacheKey(job.k);
    let text = cache[key];
    const needGen = overwrite || !text || isBadCache(text);

    if (needGen) {
      process.stdout.write(`R${job.rowNum} (誤答→正)… `);
      try {
        text = await geminiCorrectA(job, catalog);
        cache[key] = text;
        fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf8');
        console.log(text);
        generated++;
        await new Promise((r) => setTimeout(r, 1500));
      } catch (e) {
        console.log(`SKIP: ${e.message.slice(0, 80)}`);
        skipped++;
        if (text && !isBadCache(text)) updates.push({ rowNum: job.rowNum, text });
        continue;
      }
    } else {
      console.log(`R${job.rowNum} 再利用: ${text}`);
      reused++;
    }
    updates.push({ rowNum: job.rowNum, text });
  }

  console.log(`\n新規生成: ${generated} / 再利用: ${reused} / SKIP: ${skipped} / 書込対象: ${updates.length}`);

  if (doWrite) {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.error('--write には GOOGLE_APPLICATION_CREDENTIALS が必要です');
      process.exit(1);
    }
    const BATCH = 20;
    for (let i = 0; i < updates.length; i += BATCH) {
      const slice = updates.slice(i, i + BATCH);
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: process.env.SHEET_ID,
        requestBody: {
          valueInputOption: 'RAW',
          data: slice.map((u) => ({ range: `${SHEET}!A${u.rowNum}`, values: [[u.text]] })),
        },
      });
      console.log(`書込 ${Math.min(i + BATCH, updates.length)}/${updates.length}`);
      await new Promise((r) => setTimeout(r, 800));
    }
    console.log('✓ A列 更新完了 → npm run sync:learn で learn.js 反映');
  } else {
    console.log('シート未書込（--write で反映）');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

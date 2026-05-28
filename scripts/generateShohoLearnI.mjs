/**
 * 商法・会社法: K/H/M → I列（根拠条文）
 * - M列から条文番号を抽出 → 解説資料（商・会）から条文本文を付与
 * - 国家賠償法シート I列と同形式（第X条　＋本文 ＋ ②　…）
 * - 取れない肢のみ Gemini で条文番号を推定
 *
 *   node scripts/generateShohoLearnI.mjs --questions 20 --dry-run
 *   node scripts/generateShohoLearnI.mjs --questions 20 --write --overwrite
 *   node scripts/generateShohoLearnI.mjs --short   # 条文番号のみ（旧動作）
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
const CACHE_PATH = path.join(OUT_DIR, 'shoho-i-cache.json');

const GEMINI_KEY = (process.env.GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY || '').trim();
const PROMPT_MODEL = 'gemini-2.5-flash';
const KOU_CIRCLED = ['', '', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];

const KANJI_DIGITS = { '〇': 0, '零': 0, '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9 };

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

function zen2han(s) {
  return String(s || '').replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0));
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
    else if (ch === '十') { total += (num || 1) * 10; num = 0; }
    else if (ch === '百') { total += (num || 1) * 100; num = 0; }
    else if (ch === '千') { total += (num || 1) * 1000; num = 0; }
    else return null;
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

/** M列テキストから条文参照を抽出 */
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

function normalizeRefString(ref) {
  return zen2han(String(ref || '')).replace(/第/g, '').replace(/項/g, '项');
}

function isMainBodyStatute(title) {
  const t = String(title || '');
  if (/附\s*則|附則|施行期日|経過措置|旧法及び|この附則/.test(t)) return false;
  // 会社法 第二条 一 （定義）など「号」レベルは除外
  if (/^(商法|会社法|民法) 第.+条 [一二三四五六七八九十\d]+ （/.test(t)) return false;
  // 附則の「商法 第一条」単独行（項・見出しなし）を除外
  if (!/第[0-9０-９\d]+项|第[0-9０-９\d]+項/.test(convertStatuteKanjiNumeralsToArabic(t)) && !/（[^）]+）/.test(t)) {
    return false;
  }
  return true;
}

function parseRef(ref) {
  const r = normalizeRefString(ref).trim();
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
  let hits = catalog.filter(
    (s) => s.key.law === p.law && s.key.art === p.art && s.key.sub === p.sub,
  );
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

/** 国家賠償法 I列形式: 第X条　→ 1項本文 → ②　2項本文 */
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
    } else {
      blocks.push(ref);
    }
  }
  return blocks.join('\n\n');
}

function normalizeGeminiRef(text) {
  if (!text) return '';
  return text
    .split(',')
    .map((part) => {
      part = part.replace(/第/g, '').trim();
      if (/^(商法|会社法|民法)\d+/.test(part) && !/条/.test(part)) {
        part = part.replace(/^(商法|会社法|民法)(\d+)/, '$1$2条');
      }
      return part;
    })
    .filter(Boolean)
    .join(',');
}

function buildGeminiPrompt(kText, hContext, mHead) {
  return `あなたは行政書士試験の根拠条文指定ライターです。
選択肢の内容に対応する**根拠条文**を、I列用の短い参照形式で1行だけ出力してください。

【出力形式の例】
商法1条2項
商法17条2項,会社法22条2項
会社法369条2項

【絶対ルール】
- 出力は参照1行のみ（説明・Markdown・引用符禁止）
- 「第」は省略可（商法1条2項 または 商法第1条2項）
- 複数条文は半角カンマ区切り
- 判例のみが根拠の場合は EMPTY とだけ出力
- 民法条文が主根拠なら 民法○条 形式
- 商法・会社法の条文番号は正確に

【問題文（参考）】
${(hContext || '（なし）').slice(0, 220)}

【選択肢（K列）】
${kText}

【M列深掘り（参考・あれば）】
${(mHead || '（なし）').slice(0, 400)}`;
}

async function geminiStatuteRef(kText, hContext, mHead) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${PROMPT_MODEL}:generateContent?key=${GEMINI_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildGeminiPrompt(kText, hContext, mHead) }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 128 },
    }),
  });
  const raw = await res.text();
  if (!res.ok) throw new Error(`${PROMPT_MODEL} ${res.status}: ${raw.slice(0, 400)}`);
  const data = JSON.parse(raw);
  let text = (data.candidates?.[0]?.content?.parts || [])
    .filter((p) => p.text)
    .map((p) => p.text)
    .join('')
    .trim();
  text = text.replace(/^["「『]|["」』]$/g, '').replace(/\s+/g, '').trim();
  if (/^EMPTY$/i.test(text)) return '';
  text = normalizeGeminiRef(text.replace(/第/g, ''));
  if (!text || text.length > 80) throw new Error(`生成失敗: ${raw.slice(0, 200)}`);
  return text;
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

function collectJobs(rows, { questionLimit, rowLimit, overwrite }) {
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

  let currentH = '';
  const jobs = [];
  for (let i = START_ROW - 1; i < rows.length && i + 1 <= finalEndRow; i++) {
    const row = rows[i];
    const rowNum = i + 1;
    const h = (rows[i][7] || '').trim();
    const k = stripChoice(row[10] || '');
    const existingI = (row[8] || '').trim();
    const m = (row[12] || '').trim();
    if (h && h.length > 30) currentH = h;
    if (!k || k.length < 12) continue;
    if (existingI && !overwrite) continue;
    jobs.push({ rowNum, k, h: currentH, m });
  }
  return { jobs, endRow: finalEndRow };
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const doWrite = process.argv.includes('--write');
  const overwrite = process.argv.includes('--overwrite');
  const refsOnly = process.argv.includes('--short');
  const questionLimit = process.argv.includes('--questions')
    ? parseInt(process.argv[process.argv.indexOf('--questions') + 1], 10)
    : null;
  const rowLimit = process.argv.includes('--limit')
    ? parseInt(process.argv[process.argv.indexOf('--limit') + 1], 10)
    : null;

  const sheets = google.sheets({ version: 'v4', auth: getAuth(doWrite) });
  const catalog = refsOnly ? [] : await loadStatuteCatalog(sheets);
  if (!refsOnly) console.log(`条文カタログ: ${catalog.length} 件`);

  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `'${SHEET.replace(/'/g, "''")}'!A:M`,
  });
  const rows = resp.data.values || [];
  const { jobs, endRow } = collectJobs(rows, { questionLimit, rowLimit, overwrite });

  console.log(`対象: ${jobs.length} 肢 / 問${questionLimit || '?'} / R${START_ROW}-R${endRow}${refsOnly ? ' / 番号のみ' : ''}`);

  if (dryRun) {
    for (const j of jobs.slice(0, 5)) {
      const refs = extractRefsFromM(j.m) || '（Gemini要）';
      const body = refsOnly ? refs : buildFullIColumnText(refs === '（Gemini要）' ? '' : refs, catalog);
      console.log(`\n--- R${j.rowNum} refs: ${refs} ---`);
      console.log((body || '（未取得）').slice(0, 350));
    }
    return;
  }

  if (!GEMINI_KEY) console.warn('GEMINI_API_KEY なし（M抽出のみ）');

  fs.mkdirSync(OUT_DIR, { recursive: true });
  let cache = {};
  if (fs.existsSync(CACHE_PATH)) cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));

  const updates = [];
  let fromM = 0;
  let fromGemini = 0;
  let empty = 0;
  let withBody = 0;

  for (const job of jobs) {
    let refs = extractRefsFromM(job.m);
    if (refs) {
      fromM++;
    } else {
      const cacheKey = `${job.k}::${job.h.slice(0, 80)}`;
      if (cache[cacheKey] !== undefined && !overwrite) {
        refs = cache[cacheKey];
      } else if (GEMINI_KEY) {
        process.stdout.write(`R${job.rowNum} Gemini… `);
        refs = await geminiStatuteRef(job.k, job.h, job.m);
        cache[cacheKey] = refs;
        fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf8');
        console.log(refs || '（空）');
        fromGemini++;
        await new Promise((r) => setTimeout(r, 1200));
      }
    }

    let text = refsOnly ? refs : buildFullIColumnText(refs, catalog);
    if (!text && refs) text = refs;
    if (!text) empty++;
    else if (text.length > 40) withBody++;

    if (refs) console.log(`R${job.rowNum}: ${refs.slice(0, 40)} → ${text.length}字`);
    updates.push({ rowNum: job.rowNum, text });
  }

  console.log(`\nM抽出: ${fromM} / Gemini: ${fromGemini} / 空: ${empty} / 本文付き: ${withBody} / 合計: ${updates.length}`);

  if (doWrite) {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.error('--write には GOOGLE_APPLICATION_CREDENTIALS が必要です');
      process.exit(1);
    }
    const BATCH = 10;
    for (let i = 0; i < updates.length; i += BATCH) {
      const slice = updates.slice(i, i + BATCH);
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: process.env.SHEET_ID,
        requestBody: {
          valueInputOption: 'RAW',
          data: slice.map((u) => ({ range: `${SHEET}!I${u.rowNum}`, values: [[u.text]] })),
        },
      });
      console.log(`書込 ${Math.min(i + BATCH, updates.length)}/${updates.length}`);
      await new Promise((r) => setTimeout(r, 800));
    }
    console.log('✓ I列 更新完了');
  } else {
    console.log('シート未書込（--write を付けて再実行）');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

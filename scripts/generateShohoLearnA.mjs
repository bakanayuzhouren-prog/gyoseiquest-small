/**
 * 商法・会社法: K列 → A列（見て聞いて覚える・最大短縮）
 *
 *   node scripts/generateShohoLearnA.mjs --questions 20 --dry-run
 *   node scripts/generateShohoLearnA.mjs --questions 20 --write --overwrite
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHEET = '商法・会社法';
const START_ROW = 2;
const OUT_DIR = path.join(__dirname, 'output');
const CACHE_PATH = path.join(OUT_DIR, 'shoho-a-v2-cache.json');

const GEMINI_KEY = (process.env.GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY || '').trim();
const PROMPT_MODEL = 'gemini-2.5-flash';

const STYLE_REF = `【短縮の手本】
長文：商人の営業、商行為その他商事については、他の法律に特別の定めがあるものを除くほか、商法の定めるところによる。
短縮：商人の営業、商行為など商事について、他の法律に特別の定めがない限り、商法が適用

短縮のコツ：
- 「その他」→「など」、「ものを除くほか」→「ない限り」、「定めるところによる」→「適用」
- 「〜については」→「〜について」、「〜される」等の語尾は削れるなら削る（意味が通る範囲）
- 目安25〜55字。条件・効果の骨格だけ残す`;

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

function buildPrompt(kText, hContext) {
  return `あなたは行政書士試験「見て聞いて覚える」用の超短縮ライターです。
K列の選択肢を、暗記・音声用に**最大限短く**要約してください。

${STYLE_REF}

【絶対ルール】
- 出力は要約1行のみ（引用符・番号・Markdown禁止）
- 25〜55字を目標。最大65字
- 選択肢の内容を要約（正誤判定・法律の訂正はしない）
- 「正しい」「誤り」は付けない
- 試験問題の語尾「〜はどれか」は入れない

【問題文（参考）】
${(hContext || '（なし）').slice(0, 200)}

【選択肢（K列）】
${kText}`;
}

async function geminiShorten(kText, hContext) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${PROMPT_MODEL}:generateContent?key=${GEMINI_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(kText, hContext) }] }],
      generationConfig: { temperature: 0.25, maxOutputTokens: 512 },
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
  if (!text || text.length < 8) throw new Error(`生成失敗: ${raw.slice(0, 200)}`);
  if (text.length > 65) {
    const cut = text.slice(0, 65);
    const last = Math.max(cut.lastIndexOf('、'), cut.lastIndexOf('。'), cut.lastIndexOf('に'), cut.lastIndexOf('を'));
    text = last > 20 ? cut.slice(0, last + 1) : cut;
  }
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
    if (h && h.length > 30) currentH = h;
    if (!k || k.length < 12) continue;
    if (row[0]?.trim() && !overwrite) continue;
    jobs.push({ rowNum, k, h: currentH });
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
  const questionLimit = process.argv.includes('--questions')
    ? parseInt(process.argv[process.argv.indexOf('--questions') + 1], 10)
    : null;
  const rowLimit = process.argv.includes('--limit')
    ? parseInt(process.argv[process.argv.indexOf('--limit') + 1], 10)
    : null;

  const sheets = google.sheets({ version: 'v4', auth: getAuth(doWrite) });
  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `'${SHEET.replace(/'/g, "''")}'!A:K`,
  });
  const rows = resp.data.values || [];
  const { jobs, endRow, questionCount } = collectJobs(rows, { questionLimit, rowLimit, overwrite });

  console.log(`対象: ${jobs.length} 肢 / 問${questionLimit || '?'} / R${START_ROW}-R${endRow}${overwrite ? ' / 上書き' : ''}`);

  if (dryRun) {
    for (const j of jobs.slice(0, 15)) console.log(`  R${j.rowNum}: ${j.k.slice(0, 50)}…`);
    if (jobs.length > 15) console.log(`  …他 ${jobs.length - 15} 件`);
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  let cache = {};
  if (fs.existsSync(CACHE_PATH)) cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));

  const updates = [];
  let generated = 0;
  for (const job of jobs) {
    let short = cache[job.k];
    if (!short || overwrite) {
      process.stdout.write(`R${job.rowNum}… `);
      short = await geminiShorten(job.k, job.h);
      cache[job.k] = short;
      fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf8');
      console.log(short);
      generated++;
      await new Promise((r) => setTimeout(r, 1200));
    } else {
      console.log(`R${job.rowNum} 再利用: ${short}`);
    }
    updates.push({ rowNum: job.rowNum, text: short });
  }

  console.log(`\n新規生成: ${generated} / 合計: ${updates.length}`);

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
    console.log('✓ A列 更新完了');
  } else {
    console.log('シート未書込（--write）');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

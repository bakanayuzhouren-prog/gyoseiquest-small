/**
 * 行政事件訴訟法シート: I列（根拠判例）→ M列（もっと深掘る）を Gemini で生成。
 * - デフォルトは判例のみ（最判・高判・地判等）。条文・（論点名）は対象外。
 * - M2（生成済み）を文体参考。M2自体は再生成しない。
 * - 同一I列は文章使い回し（重複判例）。
 *
 *   node scripts/generateGyosoDeepDiveM.mjs --dry-run
 *   node scripts/generateGyosoDeepDiveM.mjs --limit 3
 *   node scripts/generateGyosoDeepDiveM.mjs --write
 *   node scripts/generateGyosoDeepDiveM.mjs --revert-non-cases --write  # 判例以外のM列を空に戻す
 *   node scripts/generateGyosoDeepDiveM.mjs --include-statutes          # 条文・論点名も対象（明示時のみ）
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SHEET_NAME = '行政事件訴訟法';
const REF_ROW = 2;
const OUT_DIR = path.join(ROOT, 'scripts', 'output');
const CACHE_PATH = path.join(OUT_DIR, 'gyoso-m-cache.json');
const UPDATES_PATH = path.join(OUT_DIR, 'gyoso-m-updates.json');

const GEMINI_KEY = (process.env.GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY || '').trim();
const PROMPT_MODEL = 'gemini-2.5-pro';

function getSheetsAuth(write = false) {
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

/** I列が根拠判例（最判・高判・地判等）か。てらしぃ指示「判例のみ」用。 */
function isCaseLawReference(iText) {
  const t = String(iText || '').trim();
  if (!t) return false;
  if (/^（/.test(t)) return false;
  if (/^第[一二三四五六七八九十百千万0-9]+/.test(t)) return false;
  return /最判|高判|家裁判|地判|簡易裁判所/.test(t);
}

function extractDedupeKey(iText) {
  const t = String(iText || '').trim();
  const m = t.match(/(?:最判|高判|地判|家裁判)[^\n]{3,40}/);
  if (m) return m[0].replace(/\s+/g, '');
  const firstLine = t.split('\n')[0].replace(/\s+/g, '').slice(0, 120);
  return firstLine || t.slice(0, 80);
}

function sanitizeOutput(text) {
  return text
    .replace(/判例マスターからの/g, '')
    .replace(/判例マスター/g, '')
    .replace(/💡\s*ワンポイントアドバイス/g, '💡 ワンポイントアドバイス')
    .trim();
}

function buildSystemPrompt(refSample, iText, choiceText) {
  return `あなたは行政書士試験の「もっと深掘る」解説ライターです。
以下の【参考例（M2・生成済み）】と同じ体裁・口調で、新しい解説を1本書いてください。

【絶対ルール】
- 出力は解説本文のみ（前置き・JSON・コードブロック禁止）。
- 必ず次の3部構成:
  ① ストーリーを4コマで説明！ … 【1コマ目：…】〜【4コマ目：…】（各コマに短い見出しとストーリー）
  ② 重要論点を判旨から読み解く … 判旨の核心をフランク口調で
  ③ 行政書士試験を想定した問題 … 【問題】は試験形式（択一式等）。肢と【解答・解説】を付ける
- 解説パートはフランクな口調。「〜だよ」「〜じゃん」可。
- 問題文・選択肢は試験形式（堅い文体）。
- 「判例マスター」という語は一切使わない。末尾は「💡 ワンポイントアドバイス：」で1〜3文。
- Google検索で判旨・事案を確認し、正確に書く。

【参考例（M2・文体の手本。内容はコピーしない）】
${refSample.slice(0, 3500)}

【今回のI列（根拠）】
${iText}

【該当肢（問題文脈）】
${choiceText || '（継続行・肢のみ）'}`;
}

async function geminiGenerate(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${PROMPT_MODEL}:generateContent?key=${GEMINI_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      tools: [{ google_search: {} }],
      generationConfig: { temperature: 0.45, maxOutputTokens: 8192 },
    }),
  });
  const raw = await res.text();
  if (!res.ok) throw new Error(`${PROMPT_MODEL} ${res.status}: ${raw.slice(0, 600)}`);
  const data = JSON.parse(raw);
  const text = (data.candidates?.[0]?.content?.parts || [])
    .filter((p) => p.text)
    .map((p) => p.text)
    .join('\n')
    .trim();
  if (!text || text.length < 400) throw new Error('生成文が短すぎます');
  if (!/①\s*ストーリー/.test(text) || !/②\s*重要論点/.test(text) || !/③/.test(text)) {
    throw new Error('①②③構成が不足');
  }
  return sanitizeOutput(text);
}

async function fetchJobs(sheets, { casesOnly }) {
  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${SHEET_NAME}!H:M`,
  });
  const rows = resp.data.values || [];
  const refRow = rows[REF_ROW - 1];
  const refSample = refRow?.[5] || '';
  if (!refSample.trim()) throw new Error(`M${REF_ROW} 参考文が空です`);

  const jobs = [];
  for (let i = 1; i < rows.length; i++) {
    const rowNum = i + 1;
    if (rowNum === REF_ROW) continue;
    const row = rows[i];
    const iText = (row[1] || '').trim();
    const mText = (row[5] || '').trim();
    const choiceText = (row[3] || '').trim();
    if (!iText) continue;
    if (casesOnly && !isCaseLawReference(iText)) continue;
    if (mText) continue;
    jobs.push({
      rowNum,
      iText,
      choiceText,
      dedupeKey: extractDedupeKey(iText),
    });
  }
  return { jobs, refSample, rows };
}

async function fetchNonCaseRowsWithM(sheets) {
  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${SHEET_NAME}!H:M`,
  });
  const rows = resp.data.values || [];
  const revert = [];
  for (let i = 1; i < rows.length; i++) {
    const rowNum = i + 1;
    if (rowNum === REF_ROW) continue;
    const row = rows[i];
    const iText = (row[1] || '').trim();
    const mText = (row[5] || '').trim();
    if (!iText || !mText) continue;
    if (isCaseLawReference(iText)) continue;
    revert.push({ rowNum, iText: iText.slice(0, 40) });
  }
  return revert;
}

async function writeToSheet(sheets, updates) {
  const data = updates.map((u) => ({
    range: `${SHEET_NAME}!M${u.rowNum}`,
    values: [[u.text]],
  }));
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    requestBody: { valueInputOption: 'RAW', data },
  });
}

async function clearMCells(sheets, rowNums) {
  if (!rowNums.length) return;
  const data = rowNums.map((rowNum) => ({
    range: `${SHEET_NAME}!M${rowNum}`,
    values: [['']],
  }));
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    requestBody: { valueInputOption: 'RAW', data },
  });
}

async function main() {
  if (!GEMINI_KEY) {
    console.error('GEMINI_API_KEY がありません');
    process.exit(1);
  }
  if (!process.env.SHEET_ID) {
    console.error('SHEET_ID がありません');
    process.exit(1);
  }

  const dryRun = process.argv.includes('--dry-run');
  const doWrite = process.argv.includes('--write');
  const revertNonCases = process.argv.includes('--revert-non-cases');
  const casesOnly = !process.argv.includes('--include-statutes');
  const limit = process.argv.includes('--limit')
    ? parseInt(process.argv[process.argv.indexOf('--limit') + 1], 10)
    : Infinity;

  const sheets = google.sheets({ version: 'v4', auth: getSheetsAuth(doWrite) });

  if (revertNonCases) {
    const toRevert = await fetchNonCaseRowsWithM(sheets);
    console.log(`判例以外でM列に入っている行: ${toRevert.length} 件`);
    for (const r of toRevert.slice(0, 15)) {
      console.log(`  R${r.rowNum} I=${r.iText}`);
    }
    if (toRevert.length > 15) console.log(`  …他 ${toRevert.length - 15} 件`);
    if (dryRun || !doWrite) {
      console.log('実行: --revert-non-cases --write');
      return;
    }
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.error('--write には GOOGLE_APPLICATION_CREDENTIALS が必要です');
      process.exit(1);
    }
    const BATCH = 20;
    const rowNums = toRevert.map((r) => r.rowNum);
    for (let i = 0; i < rowNums.length; i += BATCH) {
      await clearMCells(sheets, rowNums.slice(i, i + BATCH));
      console.log(`M列クリア ${Math.min(i + BATCH, rowNums.length)}/${rowNums.length}`);
      await new Promise((r) => setTimeout(r, 800));
    }
    console.log('✓ 判例以外のM列を空に戻しました');
    return;
  }

  const { jobs, refSample } = await fetchJobs(sheets, { casesOnly });

  const uniqueKeys = new Set(jobs.map((j) => j.dedupeKey));
  const scopeLabel = casesOnly ? '判例のみ' : '判例+条文+論点名';
  console.log(`対象: ${scopeLabel} / 空M: ${jobs.length} 件 / ユニーク: ${uniqueKeys.size} / 参考: M${REF_ROW}`);

  if (dryRun) {
    for (const j of jobs.slice(0, 20)) {
      console.log(`  R${j.rowNum} key=${j.dedupeKey.slice(0, 40)}`);
    }
    if (jobs.length > 20) console.log(`  …他 ${jobs.length - 20} 件`);
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  let cache = {};
  if (fs.existsSync(CACHE_PATH)) {
    cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  }

  const updates = [];
  let generated = 0;
  const jobSlice = jobs.slice(0, limit);

  for (const job of jobSlice) {
    let text = cache[job.dedupeKey];
    if (!text) {
      console.log(`\n生成: ${job.dedupeKey.slice(0, 50)} (R${job.rowNum})…`);
      try {
        text = await geminiGenerate(buildSystemPrompt(refSample, job.iText, job.choiceText));
        cache[job.dedupeKey] = text;
        fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf8');
        generated++;
        console.log(`  ✓ ${text.length} 文字`);
      } catch (e) {
        console.warn(`  ✗ ${e.message}`);
        continue;
      }
      await new Promise((r) => setTimeout(r, 2500));
    } else {
      console.log(`再利用: ${job.dedupeKey.slice(0, 40)} → R${job.rowNum}`);
    }
    updates.push({ rowNum: job.rowNum, dedupeKey: job.dedupeKey, text });
  }

  fs.writeFileSync(UPDATES_PATH, JSON.stringify(updates, null, 2), 'utf8');
  console.log(`\n保存: ${path.relative(ROOT, UPDATES_PATH)} (${updates.length} 行)`);
  console.log(`新規生成: ${generated} / キャッシュ: ${Object.keys(cache).length} キー`);

  if (doWrite) {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.error('--write には GOOGLE_APPLICATION_CREDENTIALS（編集権限）が必要です');
      process.exit(1);
    }
    const BATCH = 10;
    for (let i = 0; i < updates.length; i += BATCH) {
      await writeToSheet(sheets, updates.slice(i, i + BATCH));
      console.log(`シート書込 ${Math.min(i + BATCH, updates.length)}/${updates.length}`);
      await new Promise((r) => setTimeout(r, 1000));
    }
    console.log('✓ 行政事件訴訟法 M列 更新完了');
  } else {
    console.log('シート未書込（--write または手動貼付）。npm run sync:questions で取込可。');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/**
 * 地方自治法 第11問 R70–R75: M列（専決・町村総会・関与）
 *
 *   node scripts/writeJichiQ11M.mjs
 *   node scripts/writeJichiQ11M.mjs --write
 *   node scripts/writeJichiQ11M.mjs --write --start-row 328
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(__dirname, 'output');
const SHEET_NAME = '地方自治法';

const COMMON_TABLE = `■ 紛らわしい論点（第11問・専決・町村総会・共通早見）

| テーマ | 正しい理解 | 頻出誤答 |
|--------|-----------|----------|
| 179条軽易専決 | 議会が**議決で指定**した事項 | 長の裁量で任意指定 |
| 180条軽易専決 | **報告＋次会議で承認** | 報告のみ・承認不要 |
| 180条4項 | 条例・予算否決→**必要措置** | 当然失効 |
| 94条町村総会 | 条例で設置・**住民投票** | 投票なしで設置 |
| 136条 | 除名再当選→**拒否可**（正当理由） | 必ず議員になる |
| 2条8項 | 法定受託**以外**＝自治事務 | 法律が定めたとき限り |
| 245条の2 | 法定受託の関与は**法律・政令** | 条例だけで関与可 |

| 専決 | 179条（軽易） | 180条（緊急） |
|------|-------------|---------------|
| 前提 | 議会**議決で指定** | 議会**議決しない**等 |
| 事後 | **報告・承認**（次会議） | 同左＋4項**必要措置** |`;

const ROW_FILES = {
  70: 'jichi-q11-m70.txt',
  71: 'jichi-q11-m71.txt',
  72: 'jichi-q11-m72.txt',
  73: 'jichi-q11-m73.txt',
  74: 'jichi-q11-m74.txt',
  75: 'jichi-q11-m75.txt',
};

function getAuth(write) {
  const scope = write
    ? 'https://www.googleapis.com/auth/spreadsheets'
    : 'https://www.googleapis.com/auth/spreadsheets.readonly';
  return new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: [scope],
  });
}

function buildM(rowNum) {
  const file = ROW_FILES[rowNum];
  return `${COMMON_TABLE}\n\n${fs.readFileSync(path.join(OUT, file), 'utf8').trim()}`;
}

function parseStartRow() {
  const i = process.argv.indexOf('--start-row');
  if (i === -1 || !process.argv[i + 1]) return 70;
  return Number.parseInt(process.argv[i + 1], 10);
}

async function main() {
  const doWrite = process.argv.includes('--write');
  const startRow = parseStartRow();
  const isPreview = startRow !== 70;

  const sourceRows = Object.keys(ROW_FILES)
    .map(Number)
    .sort((a, b) => a - b);
  const updates = sourceRows.map((srcRow, idx) => {
    const text = buildM(srcRow);
    const targetRow = isPreview ? startRow + idx : srcRow;
    const outPath = path.join(OUT, `jichi-q11-m${srcRow}-final.txt`);
    fs.writeFileSync(outPath, text, 'utf8');
    console.log(`肢${idx + 1} (元R${srcRow}): ${text.length} 文字 → M${targetRow}`);
    return { targetRow, text };
  });

  if (!doWrite) {
    console.log(`\nシート未書込（--write --start-row ${startRow}）`);
    return;
  }

  const sheets = google.sheets({ version: 'v4', auth: getAuth(true) });
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    requestBody: {
      valueInputOption: 'RAW',
      data: updates.map((u) => ({
        range: `${SHEET_NAME}!M${u.targetRow}`,
        values: [[u.text]],
      })),
    },
  });
  const endRow = updates[updates.length - 1].targetRow;
  console.log(`\n✓ ${SHEET_NAME} M${updates[0].targetRow}–M${endRow} に書込完了`);

  if (isPreview) {
    console.log('確認用書込のため sync:questions はスキップ');
    return;
  }
  execSync('node scripts/syncQuiz.js', { cwd: ROOT, stdio: 'inherit' });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

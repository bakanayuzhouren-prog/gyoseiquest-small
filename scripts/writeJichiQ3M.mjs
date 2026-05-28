/**
 * 地方自治法 第3問 R18–R25: M列（特別区記述）
 *
 *   node scripts/writeJichiQ3M.mjs
 *   node scripts/writeJichiQ3M.mjs --write
 *   node scripts/writeJichiQ3M.mjs --write --start-row 231
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

const COMMON_TABLE = `■ 紛らわしい論点（第3問・特別区・共通早見）

| 比較 | 特別区 | 指定都市の区 |
|------|--------|-------------|
| 分類 | **特別**地方公共団体 | 普通地方公共団体の**一部** |
| 法人格 | **有する** | **有しない** |
| 議会 | **区議会** | **なし** |
| 区長 | **公選** | 市長が**命ずる**（一般職） |
| 条例 | **あり**（14条＋283条） | **なし** |

| テーマ | パターンA | パターンB |
|--------|-----------|-----------|
| 283条 | 市の規定**準用** | 普通地方公共団体**ではない** |
| 282条 | 交付金**交付** | 交付**禁止**ではない |
| 281条の6 | **助言・勧告** | **指揮監督**ではない |
| 組合 | 複合的→都道府県**不可** | 一般一部事務組合→**可** |`;

const ROW_FILES = {
  18: 'jichi-q3-m18.txt',
  19: 'jichi-q3-m19.txt',
  20: 'jichi-q3-m20.txt',
  21: 'jichi-q3-m21.txt',
  22: 'jichi-q3-m22.txt',
  23: 'jichi-q3-m23.txt',
  24: 'jichi-q3-m24.txt',
  25: 'jichi-q3-m25.txt',
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
  if (i === -1 || !process.argv[i + 1]) return 18;
  return Number.parseInt(process.argv[i + 1], 10);
}

async function main() {
  const doWrite = process.argv.includes('--write');
  const startRow = parseStartRow();
  const isPreview = startRow !== 18;

  const sourceRows = Object.keys(ROW_FILES)
    .map(Number)
    .sort((a, b) => a - b);
  const updates = sourceRows.map((srcRow, idx) => {
    const text = buildM(srcRow);
    const targetRow = isPreview ? startRow + idx : srcRow;
    const outPath = path.join(OUT, `jichi-q3-m${srcRow}-final.txt`);
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

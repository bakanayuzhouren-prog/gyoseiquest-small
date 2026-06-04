/**
 * 地方自治法 第6問 R40–R46: M列（都道府県事務・規定）
 *
 *   node scripts/writeJichiQ6M.mjs
 *   node scripts/writeJichiQ6M.mjs --write
 *   node scripts/writeJichiQ6M.mjs --write --start-row 258
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

const COMMON_TABLE = `■ 紛らわしい論点（第6問・都道府県事務規定・共通早見）

| テーマ | 正しい理解 | 頻出誤答 |
|--------|-----------|----------|
| 2条8項 | 法定受託**以外**＝自治事務（除外定義） | 法律が定めたとき**限り** |
| 252条の17の2 | 条例で市町村に**移譲** | 知事の委任のみ |
| 245条の2 | 関与は**法律・政令**が必要 | 法定受託は自由関与可 |
| 255条の2 | 法定受託→**所管大臣** | **総務大臣**全部 |
| 255条の2 | 自治事務→**知事** | **大臣**へ |
| 14条上乗せ | 2条2項の事務・条件付き | 自治事務**のみ**無条件 |
| 2条14項 | 最大の**効果** | **結果** |

| 審査請求先 | 自治事務 | 法定受託（都道府県） |
|-----------|---------|---------------------|
| 知事処分 | **知事** | **所管大臣** |`;

const ROW_FILES = {
  40: 'jichi-q6-m40.txt',
  41: 'jichi-q6-m41.txt',
  42: 'jichi-q6-m42.txt',
  43: 'jichi-q6-m43.txt',
  44: 'jichi-q6-m44.txt',
  45: 'jichi-q6-m45.txt',
  46: 'jichi-q6-m46.txt',
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
  if (i === -1 || !process.argv[i + 1]) return 40;
  return Number.parseInt(process.argv[i + 1], 10);
}

async function main() {
  const doWrite = process.argv.includes('--write');
  const startRow = parseStartRow();
  const isPreview = startRow !== 40;

  const sourceRows = Object.keys(ROW_FILES)
    .map(Number)
    .sort((a, b) => a - b);
  const updates = sourceRows.map((srcRow, idx) => {
    const text = buildM(srcRow);
    const targetRow = isPreview ? startRow + idx : srcRow;
    const outPath = path.join(OUT, `jichi-q6-m${srcRow}-final.txt`);
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

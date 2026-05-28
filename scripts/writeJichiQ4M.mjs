/**
 * 地方自治法 第4問 R26–R33: M列（普通地方公共団体の事務）
 *
 *   node scripts/writeJichiQ4M.mjs
 *   node scripts/writeJichiQ4M.mjs --write
 *   node scripts/writeJichiQ4M.mjs --write --start-row 231
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

const COMMON_TABLE = `■ 紛らわしい論点（第4問・事務分類・共通早見）

| テーマ | パターンA | パターンB |
|--------|-----------|-----------|
| 現行分類 | **自治事務**＋**法定受託**（2種） | 機関委任事務（**廃止**） |
| 2条8項 | 法定受託**以外**＝自治事務 | 法定受託⊂自治事務（**×**） |
| 14条1項 | **2条2項**の全事務→条例可 | 法定受託＝条例**不可**（**×**） |
| 知事の地位 | **自治体の長** | **国の機関**（**×**） |
| 255条の2 | 自治→大臣審査**不可** | 法定受託→大臣審査**可** |

| 分類 | 定義条文 | 国の関与 |
|------|---------|---------|
| **自治事務** | 2条8項（除外定義） | 限定（対等・協力） |
| **法定受託事務** | 2条9項（1号・2号） | **関与**・大臣審査請求可 |`;

const ROW_FILES = {
  26: 'jichi-q4-m26.txt',
  27: 'jichi-q4-m27.txt',
  28: 'jichi-q4-m28.txt',
  29: 'jichi-q4-m29.txt',
  30: 'jichi-q4-m30.txt',
  31: 'jichi-q4-m31.txt',
  32: 'jichi-q4-m32.txt',
  33: 'jichi-q4-m33.txt',
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
  if (i === -1 || !process.argv[i + 1]) return 26;
  return Number.parseInt(process.argv[i + 1], 10);
}

async function main() {
  const doWrite = process.argv.includes('--write');
  const startRow = parseStartRow();
  const isPreview = startRow !== 26;

  const sourceRows = Object.keys(ROW_FILES)
    .map(Number)
    .sort((a, b) => a - b);
  const updates = sourceRows.map((srcRow, idx) => {
    const text = buildM(srcRow);
    const targetRow = isPreview ? startRow + idx : srcRow;
    const outPath = path.join(OUT, `jichi-q4-m${srcRow}-final.txt`);
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

/**
 * 地方自治法 第8問 R52–R59: M列（議会・妥当でない）
 *
 *   node scripts/writeJichiQ8M.mjs
 *   node scripts/writeJichiQ8M.mjs --write
 *   node scripts/writeJichiQ8M.mjs --write --start-row 305
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

const COMMON_TABLE = `■ 紛らわしい論点（第8問・議会運営・共通早見）

| テーマ | 正しい理解 | 頻出誤答 |
|--------|-----------|----------|
| 予算提出 | **長のみ**（112条但書） | 議員も提出可 |
| 予算修正 | 議会**可**（97条） | 修正不可 |
| 予算増額 | **97条2項で可** | 増額不可 |
| 議案提出 | 予算**以外**は議員も可 | 長のみ |
| 議員提出 | **1/12**賛成 | 1人可 |
| 任期 | **4年**（93条・条例変更×） | 条例で変更可 |
| 定数 | **条例**（91条の枠内） | 自由に定める |
| 拒否権 | 条例・予算**以外**（177条） | 一般拒否権 |
| 会期 | **議会**が定める（102条7項） | 長が定める |

| 操作 | 長 | 議員 | 条文 |
|------|-----|------|------|
| 予算**提出** | **○** | **×** | 112条 |
| 予算**修正** | — | **○** | 97条 |
| 条例等**提出** | **○** | **○**（1/12） | 112条 |`;

const ROW_FILES = {
  52: 'jichi-q8-m52.txt',
  53: 'jichi-q8-m53.txt',
  54: 'jichi-q8-m54.txt',
  55: 'jichi-q8-m55.txt',
  56: 'jichi-q8-m56.txt',
  57: 'jichi-q8-m57.txt',
  58: 'jichi-q8-m58.txt',
  59: 'jichi-q8-m59.txt',
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
  if (i === -1 || !process.argv[i + 1]) return 52;
  return Number.parseInt(process.argv[i + 1], 10);
}

async function main() {
  const doWrite = process.argv.includes('--write');
  const startRow = parseStartRow();
  const isPreview = startRow !== 52;

  const sourceRows = Object.keys(ROW_FILES)
    .map(Number)
    .sort((a, b) => a - b);
  const updates = sourceRows.map((srcRow, idx) => {
    const text = buildM(srcRow);
    const targetRow = isPreview ? startRow + idx : srcRow;
    const outPath = path.join(OUT, `jichi-q8-m${srcRow}-final.txt`);
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

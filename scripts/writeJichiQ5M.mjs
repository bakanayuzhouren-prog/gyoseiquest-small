/**
 * 地方自治法 第5問 R34–R39: M列（都道府県の事務）
 *
 *   node scripts/writeJichiQ5M.mjs
 *   node scripts/writeJichiQ5M.mjs --write
 *   node scripts/writeJichiQ5M.mjs --write --start-row 231
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

const COMMON_TABLE = `■ 紛らわしい論点（第5問・都道府県事務・共通早見）

| テーマ | パターンA | パターンB |
|--------|-----------|-----------|
| 事務分類 | **自治**＋**法定受託**（2種） | 機関委任（**廃止**） |
| 14条1項 | 法定受託も**条例可** | 法定受託＝条例**不可**（**×**） |
| 8項定義 | **除外定義**（例示なし） | **例示列挙**（**×**） |
| 賠償 | 法定受託も**都道府県**に責任 | 国のみ（**×**） |
| 監査 | 75条・242条→**両方**対象 | 自治事務のみ（**×**） |
| 2条17項 | 法令違反→**無効** | 取消可能のみ（**×**） |

| 監査制度 | 条文 | 要件 |
|---------|------|------|
| 事務の監査請求 | 75条 | 有権者**50分の1**連署 |
| 住民監査請求 | 242条 | **住民**（1人可）・**1年**以内 |`;

const ROW_FILES = {
  34: 'jichi-q5-m34.txt',
  35: 'jichi-q5-m35.txt',
  36: 'jichi-q5-m36.txt',
  37: 'jichi-q5-m37.txt',
  38: 'jichi-q5-m38.txt',
  39: 'jichi-q5-m39.txt',
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
  if (i === -1 || !process.argv[i + 1]) return 34;
  return Number.parseInt(process.argv[i + 1], 10);
}

async function main() {
  const doWrite = process.argv.includes('--write');
  const startRow = parseStartRow();
  const isPreview = startRow !== 34;

  const sourceRows = Object.keys(ROW_FILES)
    .map(Number)
    .sort((a, b) => a - b);
  const updates = sourceRows.map((srcRow, idx) => {
    const text = buildM(srcRow);
    const targetRow = isPreview ? startRow + idx : srcRow;
    const outPath = path.join(OUT, `jichi-q5-m${srcRow}-final.txt`);
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

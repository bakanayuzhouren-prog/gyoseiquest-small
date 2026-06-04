/**
 * 地方自治法 第12問 R76–R84: M列（監査委員・委員会）
 *
 *   node scripts/writeJichiQ12M.mjs
 *   node scripts/writeJichiQ12M.mjs --write
 *   node scripts/writeJichiQ12M.mjs --write --start-row 334
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

const COMMON_TABLE = `■ 紛らわしい論点（第12問・監査委員・委員会・共通早見）

| テーマ | 正しい理解 | 頻出誤答 |
|--------|-----------|----------|
| 195条定数 | 都道府県**4**・市**2**・町村**2**（政令市**4**） | すべて2人 |
| 195条選任 | **議会**が選任→**長**の同意 | 長が選任 |
| 196条兼務 | 常勤職員・議員等は**兼務不可** | 議員も可 |
| 196条常勤 | 人口**5万超**市・政令市・都道府県は**常勤** | 政令市は不要 |
| 監査委員会 | 都道府県・**市**に置く（町村は置かない） | 町村にも必置 |

| 置く主体 | 教委・選管・人事・監査 | 公安・労働・収用・海区・内水面 |
|---------|----------------------|------------------------------|
| 都道府県 | **○** | **○** |
| 市町村 | **○**（監査は**市**） | **×**（農業・固定資産評価等は市町村） |

| 地域自治区 | 地域協議会 | 事務所 |
|-----------|-----------|--------|
| 設置時 | **必置** | **置くことができる**（必須ではない） |`;

const ROW_FILES = {
  76: 'jichi-q12-m76.txt',
  77: 'jichi-q12-m77.txt',
  78: 'jichi-q12-m78.txt',
  79: 'jichi-q12-m79.txt',
  80: 'jichi-q12-m80.txt',
  81: 'jichi-q12-m81.txt',
  82: 'jichi-q12-m82.txt',
  83: 'jichi-q12-m83.txt',
  84: 'jichi-q12-m84.txt',
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
  if (i === -1 || !process.argv[i + 1]) return 76;
  return Number.parseInt(process.argv[i + 1], 10);
}

async function main() {
  const doWrite = process.argv.includes('--write');
  const startRow = parseStartRow();
  const isPreview = startRow !== 76;

  const sourceRows = Object.keys(ROW_FILES)
    .map(Number)
    .sort((a, b) => a - b);
  const updates = sourceRows.map((srcRow, idx) => {
    const text = buildM(srcRow);
    const targetRow = isPreview ? startRow + idx : srcRow;
    const outPath = path.join(OUT, `jichi-q12-m${srcRow}-final.txt`);
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

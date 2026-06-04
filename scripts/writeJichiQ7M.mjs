/**
 * 地方自治法 第7問 R47–R51: M列（議会・正しいもの）
 *
 *   node scripts/writeJichiQ7M.mjs
 *   node scripts/writeJichiQ7M.mjs --write
 *   node scripts/writeJichiQ7M.mjs --write --start-row 300
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

const COMMON_TABLE = `■ 紛らわしい論点（第7問・議会招集・共通早見）

| テーマ | 正しい理解 | 頻出誤答 |
|--------|-----------|----------|
| 101条2項 | 議長→長へ**請求** | 議長が**招集** |
| 101条5項 | 20日経過→**議長招集** | 最初から議長招集 |
| 101条3項 | 定数**1/4**→長へ請求 | 1/4で直接招集 |
| 101条4項 | 請求→**20日以内**招集 | 時期の定めなし |
| 102条3項 | 臨時会＝**事件限定** | 定例会と同じ |
| 102条4項 | 付議事件→**長**が告示 | 議会が告示 |
| 112条2項 | 議案提出**1/12** | 1人可／条例で緩和 |
| 112条但書 | **予算**提出＝長のみ | 議員も予算提出 |
| 114条 | 強制開会**1/2** | 会議規則のみ |
| 115条 | **公開**原則・秘密会**2/3** | 法に定めなし |

| 数字 | 101条 | 112条 | 113条 |
|------|-------|-------|-------|
| 割合 | **1/4**（請求） | **1/12**（提出） | **1/2**（定足数） |`;

const ROW_FILES = {
  47: 'jichi-q7-m47.txt',
  48: 'jichi-q7-m48.txt',
  49: 'jichi-q7-m49.txt',
  50: 'jichi-q7-m50.txt',
  51: 'jichi-q7-m51.txt',
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
  if (i === -1 || !process.argv[i + 1]) return 47;
  return Number.parseInt(process.argv[i + 1], 10);
}

async function main() {
  const doWrite = process.argv.includes('--write');
  const startRow = parseStartRow();
  const isPreview = startRow !== 47;

  const sourceRows = Object.keys(ROW_FILES)
    .map(Number)
    .sort((a, b) => a - b);
  const updates = sourceRows.map((srcRow, idx) => {
    const text = buildM(srcRow);
    const targetRow = isPreview ? startRow + idx : srcRow;
    const outPath = path.join(OUT, `jichi-q7-m${srcRow}-final.txt`);
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

/**
 * 地方自治法 第9問 R60–R64: M列（長と議会・組合せ）
 *
 *   node scripts/writeJichiQ9M.mjs
 *   node scripts/writeJichiQ9M.mjs --write
 *   node scripts/writeJichiQ9M.mjs --write --start-row 313
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

const COMMON_TABLE = `■ 紛らわしい論点（第9問・長と議会・共通早見）

| テーマ | 正しい理解 | 頻出誤答 |
|--------|-----------|----------|
| 178条 | 不信任→**10日**解散（1回限り） | 2回目も解散可 |
| 178条2回目 | 再不信任→**失職** | 再解散 |
| 178条同意 | 1回目**3/4**／2回目**過半数** | 2回目も3/4 |
| 176条1項 | 異議→再議**できる**（裁量） | — |
| 176条4項 | 法令違反→再議**しなければならない** | 裁量で再議 |
| 101条5項 | 20日→**議長招集** | — |
| 179条 | **議決しない**→専決可 | 開会中は不可 |
| 180条 | 承認なくても**失効しない** | 失効する |
| 自主解散 | **特例法**2条（出席3/4・同意4/5） | 自治法のみ |

| 再議 | 176条1項 | 176条4項 |
|------|----------|----------|
| 要件 | 長の**異議** | **法令違反** |
| 性質 | **裁量** | **義務** |
| 再可決 | 過半数 | **2/3以上** |`;

const ROW_FILES = {
  60: 'jichi-q9-m60.txt',
  61: 'jichi-q9-m61.txt',
  62: 'jichi-q9-m62.txt',
  63: 'jichi-q9-m63.txt',
  64: 'jichi-q9-m64.txt',
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
  if (i === -1 || !process.argv[i + 1]) return 60;
  return Number.parseInt(process.argv[i + 1], 10);
}

async function main() {
  const doWrite = process.argv.includes('--write');
  const startRow = parseStartRow();
  const isPreview = startRow !== 60;

  const sourceRows = Object.keys(ROW_FILES)
    .map(Number)
    .sort((a, b) => a - b);
  const updates = sourceRows.map((srcRow, idx) => {
    const text = buildM(srcRow);
    const targetRow = isPreview ? startRow + idx : srcRow;
    const outPath = path.join(OUT, `jichi-q9-m${srcRow}-final.txt`);
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

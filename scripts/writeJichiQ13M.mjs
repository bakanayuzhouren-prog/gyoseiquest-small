/**
 * 地方自治法 第13問 R85–R93: M列（住民・地域自治区・組合せ）
 *
 *   node scripts/writeJichiQ13M.mjs
 *   node scripts/writeJichiQ13M.mjs --write
 *   node scripts/writeJichiQ13M.mjs --write --start-row 343
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

const COMMON_TABLE = `■ 正解の組合せ（本問・正しい記述）
| 番号 | 内容 | 条文 |
|------|------|------|
| 1 | 住所→**市町村＋都道府県**の住民 | 38条1項 |
| 3 | **役務**の平等提供・負担分任 | 38条2項 |
| 6 | 条例で**地域自治区**を設置 | 252条1項 |
| 7 | **地域協議会**を置く | 252条1項 |
| 9 | **総合区長**＝補助機関職員から市長が選任 | 257条の2 |

■ 紛らわしい論点（第13問・住民・共通早見）
| テーマ | 正しい理解 | 頻出誤答 |
|--------|-----------|----------|
| 38条1項 | 市町村住所→**二重の住民** | 市町村のみ |
| 選挙権 | 原則**日本国籍**必要 | 国籍不問 |
| 38条3項 | **普通地方公共団体**が記録整備 | 都道府県のみ・別法 |
| 条例請求 | **一定の事項**に限る | すべての条例 |
| 252条4項 | 構成員は**選挙** | **市町村長が選任** |
| 地域協議会 | **必置** | 事務所も必置 |

| 8番の罠 | 正解 | 誤答 |
|---------|------|------|
| 構成員 | **選挙**（252条4項） | 長の**選任** |`;

const ROW_FILES = {
  85: 'jichi-q13-m85.txt',
  86: 'jichi-q13-m86.txt',
  87: 'jichi-q13-m87.txt',
  88: 'jichi-q13-m88.txt',
  89: 'jichi-q13-m89.txt',
  90: 'jichi-q13-m90.txt',
  91: 'jichi-q13-m91.txt',
  92: 'jichi-q13-m92.txt',
  93: 'jichi-q13-m93.txt',
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
  if (i === -1 || !process.argv[i + 1]) return 85;
  return Number.parseInt(process.argv[i + 1], 10);
}

async function main() {
  const doWrite = process.argv.includes('--write');
  const startRow = parseStartRow();
  const isPreview = startRow !== 85;

  const sourceRows = Object.keys(ROW_FILES)
    .map(Number)
    .sort((a, b) => a - b);
  const updates = sourceRows.map((srcRow, idx) => {
    const text = buildM(srcRow);
    const targetRow = isPreview ? startRow + idx : srcRow;
    const outPath = path.join(OUT, `jichi-q13-m${srcRow}-final.txt`);
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

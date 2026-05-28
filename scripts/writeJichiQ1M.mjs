/**
 * 地方自治法 第1問 R2–R12: M列（もっと深掘る）を紛らわしい論点・数字表入りで生成
 *
 *   node scripts/writeJichiQ1M.mjs
 *   node scripts/writeJichiQ1M.mjs --write
 *   node scripts/writeJichiQ1M.mjs --write --start-row 220   # 確認用（sync なし）
 *   npm run sync:questions   # 本番 M2–M12 反映後
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

const COMMON_TABLE = `■ 紛らわしい論点（第1問・共通早見）

| テーマ | パターンA | パターンB |
|--------|-----------|-----------|
| 境界変更 | 都道府県→**法律**（6条） | 市町村→知事＋都道府県議会＋**届出**（7条） |
| 市の人口 | 一般の市 **5万人**（8条） | 指定都市 **50万人**（252条の19） |
| 境界争論 | **申請のみ**（9条） | 251条の2は**職権**も可（一般紛争） |
| 区の長 | 行政区長→同意不要・任期なし | 総合区長→同意要・**4年** |
| 財務役職 | 監査委員→同意**要** | 会計管理者→同意**不要**・**1人** |`;

const ROW_FILES = {
  2: 'jichi-q1-m2.txt',
  3: 'jichi-q1-m3.txt',
  4: 'jichi-q1-m4.txt',
  5: 'jichi-q1-m5.txt',
  6: 'jichi-q1-m6.txt',
  7: 'jichi-q1-m7.txt',
  8: 'jichi-q1-m8.txt',
  9: 'jichi-q1-m9.txt',
  10: 'jichi-q1-m10.txt',
  11: 'jichi-q1-m11.txt',
  12: 'jichi-q1-m12.txt',
};

function getAuth(write) {
  const scope = write
    ? 'https://www.googleapis.com/auth/spreadsheets'
    : 'https://www.googleapis.com/auth/spreadsheets.readonly';
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: [scope],
    });
  }
  return process.env.GOOGLE_SHEETS_API_KEY;
}

function buildM(rowNum) {
  const file = ROW_FILES[rowNum];
  const body = fs.readFileSync(path.join(OUT, file), 'utf8').trim();
  return `${COMMON_TABLE}\n\n${body}`;
}

function parseStartRow() {
  const i = process.argv.indexOf('--start-row');
  if (i === -1 || !process.argv[i + 1]) return 2;
  const n = Number.parseInt(process.argv[i + 1], 10);
  if (!Number.isFinite(n) || n < 1) {
    console.error('--start-row には正の行番号を指定してください');
    process.exit(1);
  }
  return n;
}

async function main() {
  const doWrite = process.argv.includes('--write');
  const startRow = parseStartRow();
  const isPreview = startRow !== 2;
  if (!process.env.SHEET_ID) {
    console.error('SHEET_ID がありません');
    process.exit(1);
  }

  const sourceRows = Object.keys(ROW_FILES)
    .map(Number)
    .sort((a, b) => a - b);
  const updates = [];
  sourceRows.forEach((srcRow, idx) => {
    const text = buildM(srcRow);
    const targetRow = startRow + idx;
    updates.push({ srcRow, targetRow, text });
    const outPath = path.join(OUT, `jichi-q1-m${srcRow}-final.txt`);
    fs.writeFileSync(outPath, text, 'utf8');
    console.log(
      `肢${idx + 1} (元R${srcRow}): ${text.length} 文字 → M${targetRow} / ${path.basename(outPath)}`,
    );
  });

  if (!doWrite) {
    console.log(`\nシート未書込（--write --start-row ${startRow} で反映）`);
    return;
  }
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('--write には GOOGLE_APPLICATION_CREDENTIALS が必要です');
    process.exit(1);
  }

  const sheets = google.sheets({ version: 'v4', auth: getAuth(true) });
  const data = updates.map((u) => ({
    range: `${SHEET_NAME}!M${u.targetRow}`,
    values: [[u.text]],
  }));
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    requestBody: { valueInputOption: 'RAW', data },
  });
  const endRow = startRow + updates.length - 1;
  console.log(`\n✓ ${SHEET_NAME} M${startRow}–M${endRow} に書込完了`);

  if (isPreview) {
    console.log('確認用書込のため sync:questions はスキップ');
    return;
  }

  console.log('sync:questions 実行中…');
  execSync('node scripts/syncQuiz.js', { cwd: ROOT, stdio: 'inherit' });
  console.log('✓ sync:questions 完了');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

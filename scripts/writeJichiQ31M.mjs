/**
 * 地方自治法 第31問 R192–196: M列（肢4＝自治紛争）
 *   node scripts/writeJichiQ31M.mjs --write --start-row 195
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'scripts', 'output');
const SHEET_NAME = '地方自治法';

const LIMB_HEADING_RE = /■\s*本肢/;
const SUPPLEMENT_SECTION = '■ 条文・制度の補足';
const COMMON_TABLE = `■ 紛らわしい論点（第31問・自治/法定受託・共通早見）

| テーマ | 正しい理解 | 頻出誤答 |
|--------|-----------|----------|
| 2条8項 | 自治事務＝**法定受託以外** | 条例で定義のみ |
| 245条の2 | 関与＝**法律・政令**必要 | 自治事務は自由関与 |
| 245条の6 | 知事→市町村**勧告** | 大臣 |
| 251条 | 自治紛争処理委員＝**非常勤** | **常勤必置** |
| 250条の7〜9 | 国地方係争＝**常置**・国の関与 | 自治紛争と混同 |`;

const ROW_FILES = { 195: 'jichi-q31-m195.txt' };

function getAuth(write) {
  const scope = write
    ? 'https://www.googleapis.com/auth/spreadsheets'
    : 'https://www.googleapis.com/auth/spreadsheets.readonly';
  return new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: [scope],
  });
}

function extractLimbBlock(body) {
  const m = body.match(LIMB_HEADING_RE);
  if (!m || m.index === undefined) return { limb: '', supplement: body.trim() };
  return { limb: body.slice(m.index).trim(), supplement: body.slice(0, m.index).trim() };
}

function buildM(rowNum) {
  const file = ROW_FILES[rowNum];
  const body = fs.readFileSync(path.join(OUT, file), 'utf8').replace(/\r\n/g, '\n').trim();
  const { limb, supplement } = extractLimbBlock(body);
  const parts = [];
  if (limb) parts.push(limb);
  if (supplement) parts.push(`${SUPPLEMENT_SECTION}\n\n${supplement}`);
  parts.push(COMMON_TABLE);
  return parts.join('\n\n');
}

async function main() {
  const doWrite = process.argv.includes('--write');
  const srIdx = process.argv.indexOf('--start-row');
  const startRow = parseInt(srIdx >= 0 ? process.argv[srIdx + 1] : '195', 10);
  const value = buildM(startRow);
  fs.writeFileSync(path.join(OUT, `jichi-q31-m${startRow}-final.txt`), value, 'utf8');
  console.log(`M${startRow} (${value.length} chars) preview ok`);

  if (!doWrite) {
    console.log('書込: node scripts/writeJichiQ31M.mjs --write --start-row 195');
    return;
  }

  const auth = await getAuth(true);
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: process.env.SPREADSHEET_ID,
    requestBody: { valueInputOption: 'RAW', data: [{ range: `${SHEET_NAME}!M${startRow}`, values: [[value]] }] },
  });
  console.log(`✓ M${startRow} 書込完了`);
  execSync('node scripts/syncQuiz.js', { cwd: ROOT, stdio: 'inherit' });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

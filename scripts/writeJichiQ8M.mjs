/**
 * 地方自治法 第8問 R99–107: M列（もっと深掘る）を数字表入りでシート反映
 *
 *   node scripts/writeJichiQ8M.mjs
 *   node scripts/writeJichiQ8M.mjs --write
 *   npm run sync:questions   # --write 後
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

const DIRECT_TABLE = `■ 数字・要件（教科書より）

| 制度 | 数字 | 請求先 | 条文 |
|------|------|--------|------|
| 条例制定改廃 | **50分の1** | 長 | 74条 |
| 事務監査 | **50分の1** | 監査委員 | 75条 |
| 議会解散 | **3分の1**（スライド） | 選管 | 76条 |
| 解散投票 | **過半数**（緩和なし） | — | 78条 |
| 解職（79〜88条） | **3分の1** 等 | **監査委員** | 79条〜 |
| 役員等解職（86条） | **3分の1** → 失職 **3分の2×4分の3** | 長→議会 | 86条 |

【3段階】①誰に ②何人（50分の1 vs 3分の1） ③その後（20日招集／過半数投票／議会3分の2×4分の3）`;

const ROW_EXTRA = {
  99: `| 本肢の数字 | **50分の1** | 監査委員 | 75条1項 |
| 242条との違い | 1人可／財務のみ | 監査委員 | 242条 |`,
  100: `| 本肢の数字 | **50分の1** | 長 | 74条1項 |
| 受理→招集 | **20日以内** | 長 | 74条3項 |`,
  101: `| 署名効力決定 | **20日以内** | 選管 | 74条の2 |
| 署名簿縦覧 | **7日間** | — | 74条の2第2項 |
| 異議申出 | 縦覧期間内 | 選管 | 74条の2第4項 |`,
  102: `| 本肢（連署） | **3分の1**（スライド） | 選管 | 76条1項 |
| 40万以下 | 全数の **3分の1** | — | 76条1項 |
| 40万超80万以下 | 40万×1/3 ＋ 超過分× **1/6** | — | 76条1項 |
| 80万超 | 上記＋超過分× **1/8** | — | 76条1項 |`,
  103: `| 連署（76条） | **3分の1**（スライドあり） | 選管 | 76条1項 |
| 解散投票（78条） | **過半数**（緩和なし） | — | 78条 |`,
  104: DIRECT_TABLE,
  105: `| 解職請求の請求先 | — | **監査委員** | 79〜82条 |
| 解散請求の請求先 | **3分の1** | **選管** | 76条 |`,
  106: `| 教育長・委員解職 | — | **監査委員** | 85〜86条 |`,
  107: `| 議員解職請求 | — | **監査委員** | 83条 |
| 長の直接罷免 | **なし** | — | — |`,
};

const ROW_FILES = {
  99: 'jichi-m99.txt',
  100: 'jichi-m100.txt',
  101: 'jichi-m101.txt',
  102: 'jichi-m102.txt',
  103: 'jichi-m103.txt',
  104: 'jichi-q8-m104.txt',
  105: 'jichi-q8-m105.txt',
  106: 'jichi-q8-m106.txt',
  107: 'jichi-q8-m107.txt',
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

function sanitizeBody(text) {
  return text
    .replace(/\$\$\\frac\{1\}\{3\}\$\$/g, '3分の1')
    .replace(/\$\$\\frac\{1\}\{6\}\$\$/g, '6分の1')
    .replace(/\$\$\\frac\{1\}\{8\}\$\$/g, '8分の1')
    .replace(/76条1项/g, '76条1項')
    .trim();
}

function buildM(rowNum) {
  const file = ROW_FILES[rowNum];
  const body = sanitizeBody(fs.readFileSync(path.join(OUT, file), 'utf8'));
  const extra = ROW_EXTRA[rowNum];
  if (rowNum === 104) {
    return `${DIRECT_TABLE}\n\n${body}`;
  }
  const extraBlock = extra
    ? `\n\n| 項目 | 数字 | 請求先 | 条文 |\n|------|------|--------|------|\n${extra}\n`
    : '';
  return `${DIRECT_TABLE}${extraBlock}\n${body}`;
}

async function main() {
  const doWrite = process.argv.includes('--write');
  if (!process.env.SHEET_ID) {
    console.error('SHEET_ID がありません');
    process.exit(1);
  }

  const updates = [];
  for (let r = 99; r <= 107; r++) {
    const text = buildM(r);
    updates.push({ rowNum: r, text });
    const outPath = path.join(OUT, `jichi-q8-m${r}-final.txt`);
    fs.writeFileSync(outPath, text, 'utf8');
    console.log(`R${r}: ${text.length} 文字 → ${path.basename(outPath)}`);
  }

  if (!doWrite) {
    console.log('\nシート未書込（--write で反映）');
    return;
  }
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('--write には GOOGLE_APPLICATION_CREDENTIALS が必要です');
    process.exit(1);
  }

  const sheets = google.sheets({ version: 'v4', auth: getAuth(true) });
  const data = updates.map((u) => ({
    range: `${SHEET_NAME}!M${u.rowNum}`,
    values: [[u.text]],
  }));
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    requestBody: { valueInputOption: 'RAW', data },
  });
  console.log(`\n✓ ${SHEET_NAME} M99–M107 に書込完了`);

  console.log('sync:questions 実行中…');
  execSync('node scripts/syncQuiz.js', { cwd: ROOT, stdio: 'inherit' });
  console.log('✓ sync:questions 完了');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/**
 * 地方自治法 第15問 R99–107: M列（直接請求・数字表）
 * ※旧 writeJichiQ8M.mjs（行番号と問番号不一致のため移行）
 *
 *   node scripts/writeJichiQ15M.mjs
 *   node scripts/writeJichiQ15M.mjs --write
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
| 解職（79〜85条等） | **3分の1** 等 | **選管** | 79条〜 |
| 教育委員解職（86条） | **3分の1** → 失職 **3分の2×4分の3** | **長**→議会 | 86条 |

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
  105: `| 解職請求の請求先 | **3分の1** | **選管** | 79〜84条 |
| 解散請求の請求先 | **3分の1** | **選管** | 76条 |`,
  106: `| 教育長解職（85条） | **3分の1** | **選管** | 85条 |
| 教育委員解職（86条） | **3分の1** | **長** | 86条 |`,
  107: `| 議員解職請求 | **3分の1** | **選管** | 83条 |
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
  return new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: [scope],
  });
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

function parseStartRow() {
  const i = process.argv.indexOf('--start-row');
  if (i === -1 || !process.argv[i + 1]) return 99;
  return Number.parseInt(process.argv[i + 1], 10);
}

async function main() {
  const doWrite = process.argv.includes('--write');
  const startRow = parseStartRow();
  const isPreview = startRow !== 99;

  const sourceRows = Object.keys(ROW_FILES)
    .map(Number)
    .sort((a, b) => a - b);
  const updates = sourceRows.map((srcRow, idx) => {
    const text = buildM(srcRow);
    const targetRow = isPreview ? startRow + idx : srcRow;
    const outPath = path.join(OUT, `jichi-q15-m${srcRow}-final.txt`);
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

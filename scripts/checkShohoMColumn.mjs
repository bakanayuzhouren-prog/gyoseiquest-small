/**
 * 商法・会社法: M列の配置・内容を H/K と照合してレポート
 * node scripts/checkShohoMColumn.mjs --report
 */
import dotenv from 'dotenv';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const auth = process.env.GOOGLE_APPLICATION_CREDENTIALS
  ? new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })
  : process.env.GOOGLE_SHEETS_API_KEY;

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = process.env.SHEET_ID;
const SHEET = '商法・会社法';

function looksLikeNewQuestion(hText) {
  const t = String(hText || '').trim();
  if (t.length < 40) return false;
  return /どれか(?:[。.]|$)|どれ(?:[。.]|$)|ものか(?:[。.]|$)|なるか(?:[。.]|$)|述べよ(?:[。.]|$)|選びなさい(?:[。.]|$)|いくつある(?:[。.]|$)|正しいものはどれ(?:[。.]|$)|誤っているものはどれ(?:[。.]|$)/.test(t);
}

function looksLikeChoice(k, h) {
  const t = String(k || '').trim();
  if (!t) return false;
  if (h && t === h.trim()) return false;
  if (/^[\s　]*[ア-オ][\s　．.、]/.test(t)) return true;
  if (/^[\s　]*[①②③④⑤⑥⑦⑧⑨⑩⑪⑫]/.test(t)) return true;
  if (/（ｒ）/.test(t)) return true;
  if (t.length <= 200 && h && !/組合せはどれか|次の記述のうち/.test(t)) return true;
  return false;
}

function stripChoice(k) {
  return String(k || '')
    .replace(/^[\s　]*[ア-オ①②③④⑤⑥⑦⑧⑨⑩⑪⑫][\s　．.、]/, '')
    .replace(/（ｒ）/g, '')
    .trim();
}

function extractArticles(text) {
  const refs = [];
  const re = /(?:商法|会社法)?第[0-9０-９一二三四五六七八九十百千万]+条(?:の[0-9０-９一二三四五六七八九十]+)?/g;
  let m;
  while ((m = re.exec(String(text || '')))) refs.push(m[0].replace(/\s/g, ''));
  return [...new Set(refs)];
}

function normArticle(a) {
  return a.replace(/^(商法|会社法)/, '').replace(/条の/g, '条');
}

function keyTerms(text) {
  return [...new Set(String(text || '').match(/[\u4e00-\u9fff]{3,8}/g) || [])].slice(0, 12);
}

const report = process.argv.includes('--report');

const resp = await sheets.spreadsheets.values.get({
  spreadsheetId,
  range: `'${SHEET.replace(/'/g, "''")}'!H:M`,
});
const rows = resp.data.values || [];

let qNum = 0;
let currentH = '';
let currentRows = [];
const issues = [];
const stats = { mTotal: 0, mOnChoice: 0, mNoChoice: 0, mDupText: 0 };

const flush = () => {
  if (!currentRows.length) return;
  const mRows = currentRows.filter((r) => r.m);
  stats.mTotal += mRows.length;

  // M が問題文行（Kが問題文と同じ or 肢でない）にある
  for (const r of mRows) {
    if (looksLikeChoice(r.k, currentH)) stats.mOnChoice++;
    else {
      stats.mNoChoice++;
      issues.push({
        type: 'M配置（肢行でない）',
        qNum,
        row: r.rowNum,
        h: currentH.slice(0, 70),
        k: (r.k || '（空）').slice(0, 70),
        mHead: r.m.slice(0, 90).replace(/\n/g, ' '),
      });
    }
  }

  // 同一M文が複数肢で異なるK
  const byM = new Map();
  for (const r of mRows.filter((x) => looksLikeChoice(x.k, currentH))) {
    const head = r.m.slice(0, 200);
    if (!byM.has(head)) byM.set(head, []);
    byM.get(head).push(r);
  }
  for (const [, group] of byM) {
    if (group.length <= 1) continue;
    const ks = group.map((g) => stripChoice(g.k).slice(0, 40));
    const allSame = ks.every((k) => k === ks[0]);
    if (!allSame) {
      stats.mDupText++;
      issues.push({
        type: '同一M文・異なるK',
        qNum,
        rows: group.map((g) => g.rowNum).join(','),
        ks: ks.join(' | '),
        mHead: group[0].m.slice(0, 90).replace(/\n/g, ' '),
      });
    }
  }

  // 肢ごと: K/I と M の条文・キーワード
  for (const r of mRows.filter((x) => looksLikeChoice(x.k, currentH))) {
    const kClean = stripChoice(r.k);
    if (r.iCol) {
      const iArts = extractArticles(r.iCol);
      const mArts = extractArticles(r.m);
      if (iArts.length && mArts.length) {
        const iNorm = new Set(iArts.map(normArticle));
        const overlap = mArts.filter((a) => iNorm.has(normArticle(a)));
        if (!overlap.length) {
          issues.push({
            type: 'I列条文とM不一致',
            qNum,
            row: r.rowNum,
            iCol: r.iCol.slice(0, 60),
            iArts: iArts.join(', '),
            mArts: mArts.slice(0, 3).join(', '),
            k: kClean.slice(0, 60),
            mHead: r.m.slice(0, 90).replace(/\n/g, ' '),
          });
        }
      }
    }
    const kArts = extractArticles(r.k + r.iCol);
    const mArts = extractArticles(r.m);
    if (kArts.length && mArts.length) {
      const kNorm = new Set(kArts.map(normArticle));
      const overlap = mArts.filter((a) => kNorm.has(normArticle(a)));
      if (!overlap.length) {
        issues.push({
          type: '条文参照ずれ',
          qNum,
          row: r.rowNum,
          kArts: kArts.join(', '),
          mArts: mArts.slice(0, 3).join(', '),
          k: kClean.slice(0, 60),
          mHead: r.m.slice(0, 90).replace(/\n/g, ' '),
        });
      }
    }

    const terms = keyTerms(kClean).filter((t) => !/記述|組合せ|商法|会社法|規定|照らし/.test(t));
    const miss = terms.filter((t) => !r.m.includes(t));
    if (terms.length >= 3 && miss.length === terms.length) {
      issues.push({
        type: 'Kの論点がMに未反映',
        qNum,
        row: r.rowNum,
        terms: terms.slice(0, 4).join('、'),
        k: kClean.slice(0, 60),
        mHead: r.m.slice(0, 90).replace(/\n/g, ' '),
      });
    }
  }

  currentRows = [];
};

for (let i = 0; i < rows.length; i++) {
  const rowNum = i + 1;
  const row = rows[i];
  // H:M → [0]=H [1]=I [2]=J [3]=K [4]=L [5]=M
  const h = (row[0] || '').trim();
  const iCol = (row[1] || '').trim();
  const k = (row[3] || '').trim();
  const m = (row[5] || '').trim();

  if (h && looksLikeNewQuestion(h)) {
    flush();
    qNum++;
    currentH = h;
  }
  if (k || m || iCol) currentRows.push({ rowNum, k, iCol, m });
}
flush();

if (report) {
  const out = { stats, issues };
  const outPath = path.join(__dirname, 'output', 'shoho-m-check.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');

  // 同一M文・異なるK を全件スキャン
  const dupMap = new Map();
  for (let i = 0; i < rows.length; i++) {
    const m = (rows[i][5] || '').trim();
    const k = (rows[i][3] || '').trim();
    if (!m || m.length < 80 || !k) continue;
    const key = m.slice(0, 200);
    if (!dupMap.has(key)) dupMap.set(key, []);
    dupMap.get(key).push({ row: i + 1, k: k.slice(0, 100) });
  }
  const dupIssues = [];
  for (const [mHead, arr] of dupMap) {
    if (arr.length <= 1) continue;
    const ks = new Set(arr.map((a) => a.k));
    if (ks.size > 1) dupIssues.push({ mHead, arr });
  }
  console.log(`\n--- 同一M文・異なるK（全件）: ${dupIssues.length} 組 ---`);
  for (const d of dupIssues) {
    console.log(`M: ${d.mHead.slice(0, 80).replace(/\n/g, ' ')}…`);
    for (const a of d.arr) console.log(`  R${a.row}: ${a.k}`);
    console.log('');
  }
}

console.log(`M列あり: ${stats.mTotal} 行（肢行 ${stats.mOnChoice} / 非肢行 ${stats.mNoChoice}）`);
console.log(`不一致・要確認: ${issues.length} 件\n`);

for (const x of issues) {
  console.log(`[${x.type}] 問${x.qNum}${x.row ? ` R${x.row}` : ''}${x.rows ? ` R${x.rows}` : ''}`);
  if (x.kArts) console.log(`  I/K条文: ${x.kArts} → M: ${x.mArts}`);
  if (x.terms) console.log(`  K論点: ${x.terms}`);
  if (x.ks) console.log(`  K群: ${x.ks}`);
  if (x.k) console.log(`  K: ${x.k}${x.k.length >= 60 ? '…' : ''}`);
  if (x.h) console.log(`  H: ${x.h}…`);
  console.log(`  M: ${x.mHead}…`);
  console.log('');
}

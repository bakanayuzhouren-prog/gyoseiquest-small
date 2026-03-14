#!/usr/bin/env node
/**
 * スプレッドシートとアプリ（src/questions.js）の問題数を比較
 */
import 'dotenv/config';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// syncQuiz.js と同じマッピング
const getMapping = (title) => {
  if (title.includes('基礎法学')) return { subject: '基礎法学', category: title };
  if (title.includes('憲法')) {
    if (title.includes('多肢選択')) return { subject: '多肢選択', category: '憲法' };
    return { subject: '憲法', category: title };
  }
  if (title === '行政法総論' || title.includes('行政法総論')) return { subject: '行政法', category: '行政法総論' };
  if (title.includes('行政手続法')) return { subject: '行政法', category: '行政手続法' };
  if (title.includes('行政不服審査法')) return { subject: '行政法', category: '行政不服審査法' };
  if (title.includes('行政事件訴訟法')) return { subject: '行政法', category: '行政事件訴訟法' };
  if (title.includes('国家賠償法')) return { subject: '行政法', category: '国家賠償法・損失訴訟' };
  if (title.includes('地方自治法')) return { subject: '行政法', category: '地方自治法' };
  if (title.includes('行政法総合')) return { subject: '行政法', category: '行政法総合' };
  if (title.includes('行政法記述')) return { subject: '記述', category: '行政法' };
  if (title.includes('民法記述')) return { subject: '記述', category: '民法' };
  if (title.includes('行政法')) {
    if (title.includes('多肢選択')) return { subject: '多肢選択', category: '行政法' };
    return { subject: '行政法', category: '行政法総論' };
  }
  if (title.includes('民法総論') || title.includes('民法総則')) return { subject: '民法', category: '民法総則' };
  if (title.includes('民法物権')) return { subject: '民法', category: '民法物権' };
  if (title.includes('物権')) return { subject: '民法', category: '民法物権' };
  if (title.includes('債権総論')) return { subject: '民法', category: '債権総論' };
  if (title.includes('債権各論')) return { subject: '民法', category: '債権各論' };
  if (title.includes('家族法')) return { subject: '民法', category: '家族法' };
  if (title.includes('民法総合')) return { subject: '民法', category: '民法総合' };
  if (title.includes('民法全般')) return { subject: '民法', category: '民法総合' };
  if (title.includes('民法')) return { subject: '民法', category: title };
  if (title.includes('商法')) return { subject: '商法・会社法', category: title };
  if (title.includes('会社法')) return { subject: '商法・会社法', category: title };
  if (title.includes('基礎知識')) return { subject: '基礎知識', category: title };
  if (title.includes('多肢選択')) return { subject: '多肢選択', category: '憲法' };
  return null;
};

function countApp() {
  const path = `${__dirname}/../src/questions.js`;
  const content = fs.readFileSync(path, 'utf-8');
  const match = content.match(/export const SUBJECTS = (\{[\s\S]*?\});/);
  if (!match) return null;
  const str = match[1];
  const counts = {};
  const subjectPattern = /"([^"]+)":\s*\{/g;
  let m;
  while ((m = subjectPattern.exec(str)) !== null) {
    const subject = m[1];
    const subStart = m.index + m[0].length;
    const catPattern = /"([^"]+)":\s*\[/g;
    catPattern.lastIndex = subStart;
    counts[subject] = counts[subject] || {};
    let catCount = 0;
    let catMatch;
    const subStr = str.substring(subStart);
    const catRegex = /"([^"]+)":\s*\[/g;
    let depth = 0;
    let inBracket = false;
    for (const cm of subStr.matchAll(catRegex)) {
      const cat = cm[1];
      const arrStart = subStr.indexOf(cm[0]) + cm[0].length;
      let bc = 1;
      let i = arrStart;
      while (i < subStr.length && bc > 0) {
        if (subStr[i] === '{') bc++;
        if (subStr[i] === '}') bc--;
        if (subStr[i] === '[') bc++;
        if (subStr[i] === ']') { bc--; if (bc === 0) break; }
        i++;
      }
      const inner = subStr.substring(arrStart, i);
      const qCount = (inner.match(/"text":\s*"/g) || []).length;
      counts[subject][cat] = qCount;
      catCount += qCount;
    }
  }
  return counts;
}

function countAppSimple() {
  const path = `${__dirname}/../src/questions.js`;
  const content = fs.readFileSync(path, 'utf-8');
  const counts = {};
  const subjMatches = content.matchAll(/"([^"]+)":\s*\{\s*"([^"]+)":\s*\[/g);
  for (const m of content.matchAll(/"([^"]+)":\s*\{/g)) {
    const subject = m[1];
    if (subject === 'RESOURCES') break;
    counts[subject] = counts[subject] || {};
  }
  const catRegex = /"([^"]+)":\s*\[([\s\S]*?)\]\s*(?:,\s*"[^"]+"|$)/g;
  let lastSubject = null;
  const lines = content.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const subMatch = line.match(/^\s*"([^"]+)":\s*\{/);
    if (subMatch) {
      lastSubject = subMatch[1];
      if (lastSubject === 'RESOURCES') break;
      counts[lastSubject] = counts[lastSubject] || {};
    }
    const catMatch = line.match(/^\s*"([^"]+)":\s*\[/);
    if (catMatch && lastSubject) {
      const cat = catMatch[1];
      let bracketCount = 1;
      let j = i;
      let fullLine = line;
      while (bracketCount > 0 && j < lines.length) {
        const l = lines[j];
        if (j > i) fullLine += '\n' + l;
        bracketCount += (l.match(/\[/g) || []).length - (l.match(/\]/g) || []).length;
        j++;
      }
      const qCount = (fullLine.match(/"text":\s*"/g) || []).length;
      counts[lastSubject][cat] = qCount;
      i = j - 1;
    }
    i++;
  }
  return counts;
}

function countAppByEval() {
  try {
    const content = fs.readFileSync(`${__dirname}/../src/questions.js`, 'utf-8');
    const exportMatch = content.match(/export const SUBJECTS = ([\s\S]+?);\s*(?:export|$)/);
    if (!exportMatch) return null;
    const objStr = exportMatch[1];
    const subjMatch = objStr.match(/export const SUBJECTS = /);
    const clean = content.replace(/export const SUBJECTS = /, 'const __SUBJECTS = ').replace(/export const RESOURCES[\s\S]*$/, '');
    const mod = clean.replace(/export const SUBJECTS = [\s\S]*?export const RESOURCES/, '');
    const beforeExport = content.split('export const SUBJECTS = ')[1];
    const arrPart = beforeExport.split('export const RESOURCES')[0];
    const obj = eval('(' + arrPart.trim().replace(/;?\s*$/, '') + ')');
    const counts = {};
    for (const [subj, cats] of Object.entries(obj)) {
      if (subj === 'RESOURCES') break;
      counts[subj] = {};
      for (const [cat, arr] of Object.entries(cats)) {
        if (Array.isArray(arr)) counts[subj][cat] = arr.length;
      }
    }
    return counts;
  } catch (e) {
    console.error('Count by eval failed:', e.message);
    return null;
  }
}

async function countSpreadsheet() {
  const spreadsheetId = process.env.SHEET_ID;
  if (!spreadsheetId) {
    console.error('SHEET_ID not set in .env');
    return null;
  }
  let auth;
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
  } else {
    auth = process.env.GOOGLE_SHEETS_API_KEY;
  }
  const sheets = google.sheets({ version: 'v4', auth });
  const metadata = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetList = metadata.data.sheets;
  const counts = {};
  const sheetCounts = {};

  for (const sheet of sheetList) {
    const title = sheet.properties.title;
    const mapping = getMapping(title);
    if (!mapping) continue;
    if (title.includes('解説') || title.includes('資料') || title.includes('条文') || title.includes('説明')) continue;

    const t = title.normalize('NFKC').trim();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${title}!A:AZ`,
    });
    const rows = response.data.values;
    if (!rows || rows.length <= 1) continue;

    const useGyosei1Layout = title.includes('行政法１') || title.includes('行政法 1') || title.includes('行政法1');
    let qCount = 0;
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const valB = row[1] ? row[1].trim() : '';
      const valH = row[7] ? row[7].trim() : '';
      const valProblem = useGyosei1Layout ? valB : valH;
      const valProblemNorm = (valProblem || '')
        .replace(/\s*[＜<][^＞>]*[＞>]\s*$/, '')
        .replace(/\s*（[^）]{1,20}）\s*$/, '')
        .trim();
      const isNewProblemRow = useGyosei1Layout ? /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫・]/.test(valProblem) : true;
      const isRealQuestion = valProblemNorm && /どれか(?:[。.]|$)|どれ(?:[。.]|$)|ものか(?:[。.]|$)|なるか(?:[。.]|$)|述べよ(?:[。.]|$)|選びなさい(?:[。.]|$)|いくつある(?:[。.]|$)|正しいものはどれ(?:[。.]|$)|誤っているものはどれ(?:[。.]|$)/.test(valProblemNorm);
      const isHeading = !isRealQuestion && valProblem && valProblemNorm.length < 60 &&
        (valProblem.includes('に照らし、') || valProblem.includes('次の記述のうち、') ||
         valProblem.includes('次のア〜オ') || valProblem.includes('次の文章'));
      const hasTrigger = valProblem && !isHeading && (useGyosei1Layout ? isNewProblemRow : true);

      if (hasTrigger) {
        const valA = row[0] ? row[0].trim() : '';
        if (valA === '問題' || valA === '肢' || valA.startsWith('科目')) continue;
        const trimmedContent = (valProblem || '').trim();
        if (trimmedContent === '本文' || trimmedContent === '（本文）' || trimmedContent === '【本文】' || trimmedContent === '内容' || /^内容[（(].*[）)]$/.test(trimmedContent)) continue;
        let questionText = valProblem;
        if (!questionText) continue;
        const firstChoice = useGyosei1Layout ? (row[2] ? row[2].trim() : '') : (row[10] ? row[10].trim() : '');
        const hasChoices = firstChoice || (row[10] ? row[10].trim() : '');
        if (row.length > 20) {
          const valN = row[13] ? row[13].trim() : '';
          const valO = row[14] ? row[14].trim() : '';
          const valP = row[15] ? row[15].trim() : '';
          const valQ = row[16] ? row[16].trim() : '';
          const valS = row[18] ? row[18].trim() : '';
          const hasNtoS = [valN, valO, valP, valQ, valS].some(v => v.length > 0);
        }
        qCount++;
      }
    }
    const subj = mapping.subject;
    const cat = mapping.category;
    if (title.includes('行政法 1') || title.includes('行政法１') || title.includes('行政法1') || title === '行政法総論' || title.includes('行政法総論')) {
      // 行政法総論
    }
    counts[subj] = counts[subj] || {};
    counts[subj][cat] = (counts[subj][cat] || 0) + qCount;
    sheetCounts[title] = qCount;
  }
  return { counts, sheetCounts };
}

// アプリ側のカウント（簡易: 正規表現で "text": の出現回数）
function countAppRegex() {
  const content = fs.readFileSync(`${__dirname}/../src/questions.js`, 'utf-8');
  const counts = {};
  const subjOrder = ['基礎法学', '憲法', '行政法', '民法', '商法・会社法', '基礎知識', '多肢選択', '記述'];
  const subjCats = {
    '行政法': ['行政法総論', '行政手続法', '行政不服審査法', '行政事件訴訟法', '国家賠償法・損失訴訟', '地方自治法', '行政法総合'],
    '民法': ['民法総則', '民法物権', '債権総論', '債権各論', '家族法', '民法総合'],
    '多肢選択': ['憲法', '行政法'],
    '記述': ['民法', '行政法'],
  };
  for (const subj of subjOrder) {
    counts[subj] = {};
    const cats = subjCats[subj] || [subj];
    for (const cat of cats) {
      const re = new RegExp(`"${subj}"\\s*:\\s*\\{[^}]*"${cat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s*:\\s*\\[`, 's');
      const m = content.match(re);
      if (!m) continue;
      const start = content.indexOf(m[0]) + m[0].length;
      let depth = 1;
      let pos = start;
      while (depth > 0 && pos < content.length) {
        if (content[pos] === '[') depth++;
        if (content[pos] === ']') depth--;
        pos++;
      }
      const arrContent = content.substring(start, pos - 1);
      const qCount = (arrContent.match(/"text"\s*:\s*"/g) || []).length;
      counts[subj][cat] = qCount;
    }
  }
  return counts;
}

async function countAppDirect() {
  try {
    const { createRequire } = await import('module');
    const req = createRequire(import.meta.url);
    const m = req(path.join(__dirname, '../src/questions.js'));
    const counts = {};
    for (const [subj, cats] of Object.entries(m.SUBJECTS || {})) {
      if (subj === 'RESOURCES') break;
      counts[subj] = {};
      for (const [cat, arr] of Object.entries(cats)) {
        if (Array.isArray(arr)) counts[subj][cat] = arr.length;
      }
    }
    return counts;
  } catch (e) {
    console.error('countAppDirect:', e.message);
    return null;
  }
}

async function main() {
  console.log('=== アプリ側 (src/questions.js) ===');
  const appCounts = await countAppDirect();
  if (!appCounts) {
    console.log('Failed to parse app questions');
    return;
  }
  let appTotal = 0;
  for (const [subj, cats] of Object.entries(appCounts)) {
    for (const [cat, n] of Object.entries(cats)) {
      console.log(`  ${subj} / ${cat}: ${n}`);
      appTotal += n;
    }
  }
  console.log(`  合計: ${appTotal}\n`);

  if (!process.env.SHEET_ID) {
    console.log('SHEET_ID 未設定のためスプレッドシート比較はスキップ');
    return;
  }

  console.log('=== スプレッドシート側 ===');
  try {
    const { counts: sheetCounts } = await countSpreadsheet();
    if (!sheetCounts) return;
    let sheetTotal = 0;
    for (const [subj, cats] of Object.entries(sheetCounts)) {
      for (const [cat, n] of Object.entries(cats)) {
        const appN = appCounts[subj]?.[cat] ?? 0;
        const diff = n - appN;
        const diffStr = diff === 0 ? '' : ` (diff: ${diff > 0 ? '+' : ''}${diff})`;
        console.log(`  ${subj} / ${cat}: ${n}${diffStr}`);
        sheetTotal += n;
      }
    }
    console.log(`  合計: ${sheetTotal}\n`);

    console.log('=== 差異サマリ ===');
    const diffs = [];
    for (const [subj, cats] of Object.entries(sheetCounts)) {
      for (const [cat, sheetN] of Object.entries(cats)) {
        const appN = appCounts[subj]?.[cat] ?? 0;
        if (sheetN !== appN) {
          diffs.push({ subj, cat, sheet: sheetN, app: appN });
        }
      }
    }
    if (diffs.length === 0) {
      console.log('差異なし');
    } else {
      // アプリにのみあるカテゴリ
      for (const [subj, cats] of Object.entries(appCounts)) {
        for (const [cat, appN] of Object.entries(cats)) {
          if (!sheetCounts[subj]?.[cat] && appN > 0) {
            diffs.push({ subj, cat, sheet: 0, app: appN });
          }
        }
      }
      diffs.forEach(d => console.log(`  ${d.subj}/${d.cat}: シート=${d.sheet} アプリ=${d.app}`));
    }
  } catch (e) {
    console.error('Spreadsheet fetch error:', e.message);
  }
}

main();

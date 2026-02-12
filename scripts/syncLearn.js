require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

let sheets;
if (process.env.GOOGLE_SHEETS_API_KEY) {
  console.log('Using API Key for authentication');
  sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_SHEETS_API_KEY });
} else {
  console.log('Using Service Account for authentication');
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  sheets = google.sheets({ version: 'v4', auth });
}
const OUTPUT_FILE = path.join(__dirname, '../src/learn.js');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sync() {
  const spreadsheetId = process.env.SHEET_ID;
  console.log(`Syncing from spreadsheet: ${spreadsheetId}`);

  // 1. Get all sheet names
  let sheetList;
  try {
    const metadata = await sheets.spreadsheets.get({ spreadsheetId });
    sheetList = metadata.data.sheets;
  } catch (error) {
    console.error('Error fetching spreadsheet metadata:', error);
    return;
  }

  if (!sheetList || sheetList.length === 0) {
    console.log('No sheets found.');
    return;
  }

  const learnContent = {};

  // 2. Iterate through sheets and aggregate content
  for (const sheet of sheetList) {
    const title = sheet.properties.title;
    let sheetDefaultSubject = null;

    // 1. Determine base subject from sheet title
    const t = title.normalize('NFKC').trim();

    // Skip "総1", "総2" ... "総10" as requested
    if (t.match(/^総[0-9]+$/)) {
      console.log(`Skipping excluded sheet: ${title}`);
      continue;
    }

    // Skip explanatory, study materials, or statute dumps
    if (t.includes('解説') || t.includes('資料') || t.includes('条文') || t.includes('説明')) {
      console.log(`Skipping non-problem sheet: ${title}`);
      continue;
    }

    // Debug: detailed title check for mapping issues
    if (t.includes('総')) {
      const charCodes = Array.from(t).map(c => c.charCodeAt(0).toString(16)).join(',');
      console.log(`Title: "${title}", Normalized: "${t}", CharCodes: ${charCodes}`);
    }

    // Primary Sheet Mapping (Highest Priority)
    if (t === '行政法総論' || t.includes('全総') || t === '行政法総合') {
      sheetDefaultSubject = '行政法総論';
    }
    else if (t.includes('全憲') || t.includes('憲法')) sheetDefaultSubject = '憲法';
    else if (t.includes('全手') || t.includes('行手') || t.includes('行政手続')) sheetDefaultSubject = '行政手続法';
    else if (t.includes('全審') || t.includes('行審') || t.includes('不服') || t.includes('審査')) sheetDefaultSubject = '行政不服審査法';
    else if (t.includes('全訴') || t.includes('行訴') || t.includes('事件') || t.includes('訴訟')) sheetDefaultSubject = '行政事件訴訟法';
    else if (t.includes('全国') || t.includes('国賠') || t.includes('国家賠償')) sheetDefaultSubject = '国家賠償法';
    else if (t.includes('全地') || t.includes('自治')) sheetDefaultSubject = '地方自治法';
    else if (t.includes('行政')) sheetDefaultSubject = '行政法総論';

    // Civil Law Mappings (Priority over General "Sou")
    else if (t.includes('民総') || (t.includes('民法') && t.includes('総'))) sheetDefaultSubject = '民法総論';
    else if (t.includes('物権') || t.includes('民物')) sheetDefaultSubject = '民法物権';
    else if (t.includes('債総') || (t.includes('債権') && t.includes('総'))) sheetDefaultSubject = '債権総論';
    else if (t.includes('債各') || (t.includes('債権') && t.includes('各'))) sheetDefaultSubject = '債権各論';
    else if (t.includes('親族') || t.includes('相続') || t.includes('家族')) sheetDefaultSubject = '家族法';
    else if (t.includes('民法記述')) sheetDefaultSubject = '民法記述';
    else if (t.includes('民法')) sheetDefaultSubject = '民法総論';

    else if (t.includes('商法') || t.includes('会社法') || t.includes('商・会')) sheetDefaultSubject = '商法・会社法';
    else if (t.includes('基礎法学')) sheetDefaultSubject = '基礎法学';
    else if (t.includes('多肢選択')) sheetDefaultSubject = '多肢選択';
    else if (t.includes('基礎知識')) {
      sheetDefaultSubject = '基礎知識';
    }

    let range = `${title}!A:F`;
    let response;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range,
        });
        break;
      } catch (e) {
        if (e.message.includes('Quota exceeded') && attempt < 3) {
          console.warn(`Quota exceeded for ${title}, retrying in ${attempt * 10}s...`);
          await sleep(attempt * 10000);
          continue;
        }
        throw e;
      }
    }

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      console.log(`No data or only header in sheet: ${title}`);
      continue;
    }

    // Skip the first row (memo/header row)
    const dataRows = rows.slice(1);

    dataRows.forEach(row => {
      // RESET currentSubject for every row to the sheet default
      let currentSubject = sheetDefaultSubject;

      const rawSubject = row[0];
      // ONLY Column A overrides if it is relatively short (category name) 
      // AND doesn't look like legal text. Long text here is usually content.
      if (rawSubject && rawSubject.length < 20) {
        if (rawSubject.includes('行政法総論')) currentSubject = '行政法総論';
        else if (rawSubject.includes('行政手続法')) currentSubject = '行政手続法';
        else if (rawSubject.includes('行政不服審査法')) currentSubject = '行政不服審査法';
        else if (rawSubject.includes('行政事件訴訟法')) currentSubject = '行政事件訴訟法';
        else if (rawSubject.includes('国家賠償法')) currentSubject = '国家賠償法';
        else if (rawSubject.includes('地方自治法')) currentSubject = '地方自治法';
        else if (rawSubject.includes('行政法総合')) currentSubject = '行政法総合';
        else if (rawSubject.includes('行政法') && rawSubject.includes('記述')) currentSubject = '行政法記述';

        else if (rawSubject.includes('民法総論')) currentSubject = '民法総論';
        else if (rawSubject.includes('民法物権')) currentSubject = '民法物権';
        else if (rawSubject.includes('債権総論')) currentSubject = '債権総論';
        else if (rawSubject.includes('債権各論')) currentSubject = '債権各論';
        else if (rawSubject.includes('民法') && rawSubject.includes('記述')) currentSubject = '民法記述';

        else if (rawSubject.includes('多肢選択')) currentSubject = '多肢選択';
        else if (rawSubject.includes('家族法')) currentSubject = '家族法';
        else if (rawSubject.includes('憲法') || rawSubject.includes('人権') || rawSubject.includes('統治')) currentSubject = '憲法';
        else if (rawSubject.includes('商法') || rawSubject.includes('会社法')) currentSubject = '商法・会社法';
        else if (rawSubject.includes('基礎法学')) currentSubject = '基礎法学';
        else if (rawSubject.includes('基礎知識')) currentSubject = '基礎知識';
      }

      // If we have a determined subject, add content
      if (currentSubject) {
        let content = row[2];
        if (!content && row[1]) content = row[1];
        if (!content && row[0]) {
          if (!row[0].startsWith('科目')) {
            content = row[0];
          }
        }

        // Filter out header/metadata rows to match syncQuiz.js logic exactly
        // syncQuiz skips: valA === '問題' || valA === '肢' || valA === '科目（憲法）' || valA === '科目'
        // Here 'content' serves as the primary text. If it matches these, skip.
        // Also check raw row[0] if content came from there? 
        // SyncQuiz checks row[0] (valA) specifically.
        const valA = row[0] ? row[0].trim() : '';
        if (valA === '問題' || valA === '肢' || valA === '科目（憲法）' || valA === '科目') return;

        if (content) {
          const trimmedContent = content.trim();

          if (!learnContent[currentSubject]) {
            learnContent[currentSubject] = [];
          }

          // Capping Kenpo at 230 items and avoiding leakage from other sheets
          if (currentSubject === '憲法') {
            if (t !== '憲法') return; // Strict source control
            if (learnContent['憲法'].length >= 230) return;
            // No noisy filters for the primary Kenpo sheet to ensure we get all 230
          } else {
            // Original filters for other subjects
            if (
              trimmedContent.includes('条文') ||
              trimmedContent.includes('解説') ||
              trimmedContent.includes('資料') ||
              trimmedContent.includes('説明')
            ) {
              return;
            }

            if (
              trimmedContent === '本文' || trimmedContent === '（本文）' || trimmedContent === '【本文】' ||
              trimmedContent === '内容' || /^内容[（(].*[）)]$/.test(trimmedContent)
            ) {
              return;
            }
          }

          // Check for Deep Dive in F column (Index 5)
          const deepDive = row[5] ? row[5].trim() : '';
          if (deepDive && !content.includes('[[LINK:')) {
            const index = learnContent[currentSubject].length;
            content = `${content}[[LINK:${index}]]`;
          }

          learnContent[currentSubject].push(content);
        }
      }
    });
  }

  // Write to src/learn.js
  const fileContent = `export const LEARN_CONTENT = ${JSON.stringify(learnContent, null, 2)};`;
  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log(`learn.js synced successfully to ${OUTPUT_FILE}`);
}

sync();

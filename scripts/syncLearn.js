require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });
const OUTPUT_FILE = path.join(__dirname, '../src/learn.js');

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
    console.log(`Processing sheet: ${title}`);

    // General Knowledge (Sou 1-10)
    if (title.startsWith('総') || title.includes('基礎知識')) sheetDefaultSubject = '基礎知識';

    else if (title.includes('憲法') || title.includes('全憲') || title.includes('人権') || title.includes('統治')) sheetDefaultSubject = '憲法';
    else if (title.includes('基礎法学')) sheetDefaultSubject = '基礎法学';

    // Administrative Law Mappings (Full & Abbreviations)
    else if (title.includes('行政法総論') || title.includes('全行総')) sheetDefaultSubject = '行政法総論';
    else if (title.includes('行政手続法') || title.includes('全手')) sheetDefaultSubject = '行政手続法';
    else if (title.includes('行政不服審査法') || title.includes('全審')) sheetDefaultSubject = '行政不服審査法';
    else if (title.includes('行政事件訴訟法') || title.includes('全訴')) sheetDefaultSubject = '行政事件訴訟法';
    else if (title.includes('国家賠償法') || title.includes('全国')) sheetDefaultSubject = '国家賠償法';
    else if (title.includes('地方自治法') || title.includes('全地')) sheetDefaultSubject = '地方自治法';
    else if (title.includes('行政法総合')) sheetDefaultSubject = '行政法総合';
    else if (title.includes('行政法記述')) sheetDefaultSubject = '行政法記述';
    else if (title.includes('行政法')) sheetDefaultSubject = '行政法総論'; // Broad match fallback

    // Civil Law Mappings
    else if (title.includes('民法総論') || title.includes('民総')) sheetDefaultSubject = '民法総論';
    else if (title.includes('民法物権') || title.includes('民物')) sheetDefaultSubject = '民法物権';
    else if (title.includes('債権総論') || title.includes('債総')) sheetDefaultSubject = '債権総論';
    else if (title.includes('債権各論') || title.includes('債各')) sheetDefaultSubject = '債権各論';
    else if (title.includes('民法記述')) sheetDefaultSubject = '民法記述';
    else if (title.includes('家族法')) sheetDefaultSubject = '家族法';
    else if (title.includes('民法')) sheetDefaultSubject = '民法総論';

    else if (title.includes('商法') || title.includes('会社法')) sheetDefaultSubject = '商法・会社法';
    else if (title.includes('多肢選択')) sheetDefaultSubject = '多肢選択';

    let range = `${title}!A:C`;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) continue;

    let currentSubject = sheetDefaultSubject;

    rows.forEach(row => {
      const rawSubject = row[0];
      // Column A overrides sheet default if present
      if (rawSubject) {
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
        else if (rawSubject.includes('民法')) currentSubject = '民法総論';

        else if (rawSubject.includes('憲法') || rawSubject.includes('人権') || rawSubject.includes('統治')) currentSubject = '憲法';
        else if (rawSubject.includes('商法') || rawSubject.includes('会社法')) currentSubject = '商法・会社法';
        else if (rawSubject.includes('基礎法学')) currentSubject = '基礎法学';
        else if (rawSubject.includes('基礎知識')) currentSubject = '基礎知識';
      }

      // If we have a determined subject (either from sheet title or col A), add content
      if (currentSubject) {
        // User confirmed A=Subject, C=Content for the main sheet.
        // But for individual sheets (e.g. "全審"), content is often in A.
        // Priority: C > B > A (if long enough)

        let content = row[2];
        if (!content && row[1] && row[1].length > 5) content = row[1];
        // Fallback to A if it looks like content (long enough) and isn't just a subject name repetition
        if (!content && row[0] && row[0].length > 8) {
          // Exclude obvious headers like "科目（...）"
          if (!row[0].startsWith('科目')) {
            content = row[0];
          }
        }

        if (content) {
          if (learnContent[currentSubject]) {
            learnContent[currentSubject].push(content);
          } else {
            learnContent[currentSubject] = [content];
          }
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

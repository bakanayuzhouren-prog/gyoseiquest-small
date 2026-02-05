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

    let range = `${title}!A:C`;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log(`No data in sheet: ${title}`);
      continue;
    }

    rows.forEach(row => {
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
          // Filter out content that is EXACTLY "本文" or a simple header variation.
          // Legal articles often contain "本文" in the sentence which should NOT be filtered.
          const trimmedContent = content.trim();

          // Global noise filter: skip raw statutes, deep explanations, or metadata
          if (
            trimmedContent.includes('条文') ||
            trimmedContent.includes('解説') ||
            trimmedContent.includes('資料') ||
            trimmedContent.includes('説明')
          ) {
            console.log(`Skipping noisy content: ${content.substring(0, 30)}...`);
            return;
          }

          if (
            trimmedContent === '本文' || trimmedContent === '（本文）' || trimmedContent === '【本文】' || trimmedContent === '本文：' || trimmedContent === '本文:' ||
            trimmedContent === '内容' || /^内容[（(].*[）)]$/.test(trimmedContent) || trimmedContent === '内容：' || trimmedContent === '内容:'
          ) {
            console.log(`Skipping content matching generic placeholder: ${content}`);
            return;
          }

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

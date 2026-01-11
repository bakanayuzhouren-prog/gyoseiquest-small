require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function debugSheet() {
    const spreadsheetId = process.env.SHEET_ID;
    console.log(`Using Spreadsheet ID: ${spreadsheetId}`);

    // 1. Get Spreadsheet Metadata (Title)
    const metadata = await sheets.spreadsheets.get({ spreadsheetId });
    console.log(`Spreadsheet Title: ${metadata.data.properties.title}`);

    const allSheets = metadata.data.sheets.map(s => s.properties.title);
    console.log('Current Sheet List:', JSON.stringify(allSheets));

    // 2. Inspect '憲法' specifically
    const targetSheet = metadata.data.sheets.find(s => s.properties.title.trim() === '憲法');

    if (!targetSheet) {
        console.log('Sheet "憲法" NOT found (fuzzy match failed?).');
        return;
    }

    console.log(`Inspecting Sheet: "${targetSheet.properties.title}" (ID: ${targetSheet.properties.sheetId})`);

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `'${targetSheet.properties.title}'!A1:B10`, // Explicit A1:B10
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
        console.log('  -> No data found in A1:B10.');
        // Try A100?
        return;
    }

    console.log('  -> Data found in top 10 rows:');
    rows.forEach((row, i) => console.log(`    Row ${i + 1}: ${JSON.stringify(row)}`));
}

debugSheet();

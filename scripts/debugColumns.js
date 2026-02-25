require('dotenv').config();
const { google } = require('googleapis');

async function debug() {
    const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_SHEETS_API_KEY });
    const spreadsheetId = process.env.SHEET_ID;

    console.log('--- Checking [民法物権] Sheet Columns ---');
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: '民法物権!A1:F10',
    });
    const rows = res.data.values;
    if (!rows) {
        console.log('No data found.');
        return;
    }

    rows.forEach((row, i) => {
        console.log(`Row ${i}: A=[${(row[0] || '').substring(0, 20)}], C=[${(row[2] || '').substring(0, 20)}], F=[${(row[5] || '').substring(0, 20)}]`);
    });
}

debug();

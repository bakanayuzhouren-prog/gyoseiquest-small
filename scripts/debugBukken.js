const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

const spreadsheetId = process.env.SHEET_ID;
const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

async function run() {
    const sheets = google.sheets({ version: 'v4', auth: apiKey });

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `民法物権!A1:Z50`,
    });
    const rows = response.data.values;

    if (rows) {
        rows.forEach((row, i) => {
            console.log(`Row ${i}: H="${row[7] || ''}", F="${row[5] ? 'DATA' : 'EMPTY'}", content="${(row[0] || '').substring(0, 30)}..."`);
        });
    }
}

run();

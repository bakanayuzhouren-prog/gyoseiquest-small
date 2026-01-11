require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function debugSheet() {
    const spreadsheetId = process.env.SHEET_ID;
    const sheetName = '憲法'; // Target sheet
    console.log(`Inspecting sheet: ${sheetName}`);

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!A1:E20`, // Inspect A to E, first 20 rows
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }

        rows.forEach((row, index) => {
            console.log(`Row ${index + 1}: [A]${row[0] || ''} [B]${row[1] || ''} [C]${row[2] || ''} [D]${row[3] || ''} [E]${row[4] || ''}`);
        });

    } catch (error) {
        console.error('Error fetching sheet data:', error);
    }
}

debugSheet();

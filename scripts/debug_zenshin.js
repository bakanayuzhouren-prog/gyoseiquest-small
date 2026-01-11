require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function debugSheet() {
    const spreadsheetId = process.env.SHEET_ID;
    const sheetName = '全審';
    console.log(`Inspecting sheet: ${sheetName}`);

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!A1:C10`,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }

        console.log('--- First 10 Rows ---');
        rows.forEach((row, index) => {
            console.log(`Row ${index + 1}: ${JSON.stringify(row)}`);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

debugSheet();

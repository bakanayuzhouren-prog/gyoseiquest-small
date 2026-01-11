require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function inspectRows() {
    const sheetName = process.env.LEARN_SHEET_NAME || process.env.SHEET_NAME;
    console.log(`Inspecting sheet: ${sheetName}`);

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: `${sheetName}!A1:E6`, // Fetch first 6 rows, columns A to E
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }

        console.log('--- First 5 Rows ---');
        rows.forEach((row, index) => {
            console.log(`Row ${index + 1}:`, JSON.stringify(row));
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

inspectRows();

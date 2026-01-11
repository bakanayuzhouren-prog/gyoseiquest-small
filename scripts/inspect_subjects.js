require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function sync() {
    const sheetName = process.env.LEARN_SHEET_NAME || process.env.SHEET_NAME;
    console.log(`Inspecting sheet: ${sheetName}`);

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: `${sheetName}!A:A`, // Only need subject column
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
    }

    const distinctSubjects = new Set();
    rows.forEach(r => {
        if (r[0] && r[0].trim() !== '') distinctSubjects.add(r[0]);
    });

    console.log('--- DISTINCT SUBJECTS ---');
    Array.from(distinctSubjects).forEach(s => console.log(s));
    console.log('-------------------------');
}

sync().catch(console.error);

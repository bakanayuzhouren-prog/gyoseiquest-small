require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function dumpColA() {
    const sheetName = process.env.LEARN_SHEET_NAME || process.env.SHEET_NAME;
    console.log(`Dumping A from: ${sheetName}`);

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: `${sheetName}!A1:A1000`, // Check first 1000 rows
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }

        const colA = new Set();
        rows.forEach(row => {
            if (row[0] && row[0].trim() !== '') {
                colA.add(row[0].trim());
            }
        });

        console.log('--- Non-Empty Column A Values ---');
        colA.forEach(v => console.log(`"${v}"`));

    } catch (error) {
        console.error('Error:', error);
    }
}

dumpColA();

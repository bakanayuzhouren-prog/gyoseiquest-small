require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function dumpColumns() {
    const sheetName = process.env.LEARN_SHEET_NAME || process.env.SHEET_NAME;
    console.log(`Dumping A-C from: ${sheetName}`);

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: `${sheetName}!A1:C20`,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }

        const colA = new Set();
        const colB = new Set();
        const colC = new Set();

        rows.forEach(row => {
            if (row[0]) colA.add(row[0].trim());
            if (row[1]) colB.add(row[1].trim());
            if (row[2]) colC.add(row[2].trim());
        });

        console.log('--- Column A Values ---');
        colA.forEach(v => console.log(v));
        console.log('\n--- Column B Values ---');
        colB.forEach(v => console.log(v));
        console.log('\n--- Column C Values ---');
        // Truncate C values if too long
        colC.forEach(v => console.log(v.length > 30 ? v.substring(0, 30) + '...' : v));

    } catch (error) {
        console.error('Error:', error);
    }
}

dumpColumns();

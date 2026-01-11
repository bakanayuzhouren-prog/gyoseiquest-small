require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function debugRow6() {
    const sheetName = process.env.LEARN_SHEET_NAME || process.env.SHEET_NAME;
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: `${sheetName}!A6:E6`,
        });

        const row = response.data.values[0];
        if (!row) {
            console.log('Row 6 not found');
            return;
        }

        console.log(`A (idx0): "${row[0]}"`);
        console.log(`B (idx1): "${row[1]}"`);
        console.log(`C (idx2): "${row[2]}"`);
        console.log(`D (idx3): "${row[3]}"`);
        console.log(`E (idx4): "${row[4]}"`);

    } catch (error) {
        console.error('Error:', error);
    }
}

debugRow6();

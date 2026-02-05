require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function dumpSheet(sheetName) {
    console.log(`Dumping sheet: ${sheetName}`);
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: `'${sheetName}'!A1:E10`,
        });
        console.log(JSON.stringify(response.data.values, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

dumpSheet('全総');

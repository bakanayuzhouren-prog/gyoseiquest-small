require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function listSheets() {
    console.log(`Listing sheets for ID: ${process.env.SHEET_ID}`);

    try {
        const response = await sheets.spreadsheets.get({
            spreadsheetId: process.env.SHEET_ID,
        });

        const sheetList = response.data.sheets;
        if (!sheetList || sheetList.length === 0) {
            console.log('No sheets found.');
            return;
        }

        console.log('--- Available Sheets ---');
        sheetList.forEach(s => {
            console.log(`- "${s.properties.title}"`);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

listSheets();

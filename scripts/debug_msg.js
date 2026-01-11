require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function debugSheet() {
    const spreadsheetId = process.env.SHEET_ID;
    const sheetName = '行政法総論';
    console.log(`Inspecting sheet: ${sheetName} for questions (Col H)`);

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!H1:L200`,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }

        let qCount = 0;
        rows.forEach((row, index) => {
            const H = row[0]; // Question
            if (H && H.trim()) {
                qCount++;
                console.log(`[Q#${qCount}] Row ${index + 1}: ${H.substring(0, 40)}...`);
            }
        });

        console.log(`Total questions found in H1:L200: ${qCount}`);

    } catch (error) {
        console.error('Error fetching sheet data:', error);
    }
}

debugSheet();

require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function debugSheet() {
    const spreadsheetId = process.env.SHEET_ID;
    const sheetName = '憲法';
    console.log(`Inspecting sheet: ${sheetName}`);

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!A1:E50`,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }

        rows.forEach((row, index) => {
            // Only print if Col D (index 3) is present
            const D = row[3] ? row[3].replace(/\n/g, ' ') : '';
            if (D.length > 0) {
                console.log(`Row ${index + 1}:`);
                console.log(`  [A] ${row[0] || ''}`);
                console.log(`  [B] ${row[1] || ''}`);
                console.log(`  [C] ${row[2] || ''}`);
                console.log(`  [D] ${D.substring(0, 50)}...`); // Truncate for readability
                console.log(`  [E] ${row[4] || ''}`);
                console.log('-------------------');
            }
        });

    } catch (error) {
        console.error('Error fetching sheet data:', error);
    }
}

debugSheet();

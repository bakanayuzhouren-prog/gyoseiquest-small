require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function debug() {
    const spreadsheetId = process.env.SHEET_ID;
    console.log(`Checking spreadsheet: ${spreadsheetId}`);

    const metadata = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetTitles = metadata.data.sheets.map(s => s.properties.title);
    console.log('Available Sheets:', sheetTitles);

    const targetSheets = [
        '解説資料（行手）',
        '解説資料（行審）',
        '解説資料（行訴）',
        // Add potential matches dynamically if found
    ];

    // Add fuzzy matches for Jichi and Kokubai
    const jichi = sheetTitles.find(t => t.includes('地方自治'));
    if (jichi) targetSheets.push(jichi);

    const kokubai = sheetTitles.find(t => t.includes('国賠'));
    if (kokubai) targetSheets.push(kokubai);

    console.log('Targeting Sheets:', targetSheets);

    for (const sheetName of targetSheets) {
        try {
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: `${sheetName}!A1:F5`, // Read first 5 rows
            });

            const rows = response.data.values;
            console.log(`\n--- ${sheetName} ---`);
            if (!rows || rows.length === 0) {
                console.log('No data found.');
            } else {
                console.log('Headers (Row 1):', rows[0]);
                console.log('Sample Data (Row 2):', rows[1]);
            }
        } catch (error) {
            console.error(`Error reading ${sheetName}:`, error.message);
        }
    }
}

debug();

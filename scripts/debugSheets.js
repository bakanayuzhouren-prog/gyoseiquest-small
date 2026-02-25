const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

const spreadsheetId = process.env.SHEET_ID;
const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

async function run() {
    const sheets = google.sheets({ version: 'v4', auth: apiKey });
    const metadata = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetList = metadata.data.sheets;

    for (const sheet of sheetList) {
        const title = sheet.properties.title;
        try {
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: `${title}!A1:Z2`,
            });
            const rows = response.data.values;
            console.log(`SHEET: ${title}`);
            if (rows && rows.length > 0) {
                console.log(`  Header: ${JSON.stringify(rows[0])}`);
                if (rows.length > 1) {
                    console.log(`  Row 1: ${JSON.stringify(rows[1]).substring(0, 100)}...`);
                }
            } else {
                console.log(`  (Empty)`);
            }
        } catch (e) {
            console.log(`SHEET: ${title} (Error fetching data: ${e.message})`);
        }
    }
}

run();

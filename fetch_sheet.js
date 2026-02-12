const { google } = require('googleapis');
require('dotenv').config();

async function run() {
    const auth = process.env.GOOGLE_SHEETS_API_KEY;
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SHEET_ID;

    // Exact title from previous metadata scan
    const title = '解説資料（憲法判例）';

    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `'${title}'!A:Z`
        });

        if (res.data.values) {
            require('fs').writeFileSync('tmp_sheet.json', JSON.stringify(res.data.values, null, 2));
            console.log('Successfully saved to tmp_sheet.json');
        } else {
            console.log('No values found in sheet: ' + title);
        }
    } catch (e) {
        console.error('Error fetching sheet: ' + e.message);
    }
}

run();

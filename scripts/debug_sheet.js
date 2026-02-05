const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

async function debugSheet() {
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SHEET_ID;

    const targetSheet = process.argv[2] || '行政法総論';
    const range = process.argv[3] || 'A1:E50';

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `'${targetSheet}'!${range}`,
        });

        const rows = response.data.values;
        if (rows && rows.length) {
            console.log(`Rows found in ${targetSheet} (${range}):`);
            rows.forEach((row, index) => {
                console.log(`${index}: ${JSON.stringify(row)}`);
            });
        } else {
            console.log(`No data found in ${targetSheet}.`);
        }
    } catch (err) {
        console.error('Error fetching sheet data:', err);
    }
}

debugSheet();

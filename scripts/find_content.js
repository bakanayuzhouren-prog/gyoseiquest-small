const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

async function findContent() {
    const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SHEET_ID;

    try {
        const meta = await sheets.spreadsheets.get({ spreadsheetId });
        const sheetTitles = meta.data.sheets.map(s => s.properties.title);

        for (const title of sheetTitles) {
            if (title.startsWith('総') && !title.includes('1') && !title.includes('2')) {
                // Just checking a few
            }

            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: `'${title}'!A1:Z100`,
            });

            const rows = response.data.values;
            if (rows) {
                rows.forEach((row, i) => {
                    const joined = row.join(' ');
                    if (joined.includes('各省大臣')) {
                        console.log(`FOUND in sheet: "${title}" at row ${i + 1}`);
                    }
                });
            }
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

findContent();

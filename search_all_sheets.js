const { google } = require('googleapis');
require('dotenv').config();

async function run() {
    const auth = process.env.GOOGLE_SHEETS_API_KEY;
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SHEET_ID;

    try {
        const metadata = await sheets.spreadsheets.get({ spreadsheetId });
        const titles = metadata.data.sheets.map(s => s.properties.title);
        console.log(`Searching in ${titles.length} sheets...`);

        const keywords = ['Twitter', 'リツイート', 'Google検索結果削除'];

        for (const title of titles) {
            console.log(`Checking sheet: ${title}`);
            const res = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: `'${title}'!A:AZ`
            });

            const rows = res.data.values;
            if (rows) {
                rows.forEach((row, i) => {
                    row.forEach((cell, j) => {
                        if (cell) {
                            for (const keyword of keywords) {
                                if (cell.includes(keyword)) {
                                    console.log(`MATCH FOUND!`);
                                    console.log(`Sheet: ${title}`);
                                    console.log(`Cell: ${String.fromCharCode(65 + Math.floor(j / 26) * 26 + j % 26)}${i + 1} (Index ${j})`);
                                    console.log(`Content (50 chars): ${cell.substring(0, 50)}`);
                                    console.log('---');
                                }
                            }
                        }
                    });
                });
            }
            // Sleep a bit to avoid quota issues
            await new Promise(r => setTimeout(r, 200));
        }
        console.log('Search finished.');
    } catch (e) {
        console.error('Error during search: ' + e.message);
    }
}

run();

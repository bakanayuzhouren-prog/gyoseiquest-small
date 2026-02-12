
const { google } = require('googleapis');
require('dotenv').config();

const auth = process.env.GOOGLE_SHEETS_API_KEY;
const spreadsheetId = process.env.SHEET_ID;

const sheets = google.sheets({ version: 'v4', auth });

async function scanDeepContent() {
    console.log(`Scanning Spreadsheet ID: ${spreadsheetId}`);

    try {
        const meta = await sheets.spreadsheets.get({ spreadsheetId });
        const sheetList = meta.data.sheets;

        console.log(`Found ${sheetList.length} sheets.`);

        for (const sheet of sheetList) {
            const title = sheet.properties.title;
            console.log(`Scanning sheet: ${title}...`);

            // Get all data up to column AZ (or typical max)
            const res = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: `${title}!A:AZ`,
            });

            const rows = res.data.values;
            if (!rows || rows.length === 0) continue;

            let foundInSheet = 0;

            rows.forEach((row, rowIndex) => {
                // Check columns from index 20 (U column) onwards
                if (row.length > 20) {
                    for (let j = 20; j < row.length; j++) {
                        const cellContent = row[j];
                        if (cellContent && cellContent.trim().length > 0) {
                            console.log(`[FOUND] Sheet: "${title}" | Row: ${rowIndex + 1} | Col: ${j} (${String.fromCharCode(65 + j)})`);
                            console.log(`   Question (Col A/Text): ${row[0] ? row[0].substring(0, 20) + '...' : '(Empty)'}`);
                            console.log(`   Content: ${cellContent.substring(0, 50).replace(/\r?\n/g, ' ')}...`);
                            foundInSheet++;
                        }
                    }
                }
            });

            if (foundInSheet === 0) {
                console.log(`  -> No deep content (Col U+) found in ${title}.`);
            }
        }
    } catch (error) {
        console.error('Error scanning sheets:', error);
    }
}

scanDeepContent();

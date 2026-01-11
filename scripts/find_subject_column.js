require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function findSubjectColumn() {
    const sheetName = process.env.LEARN_SHEET_NAME || process.env.SHEET_NAME;
    console.log(`Scanning sheet: ${sheetName}`);

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: `${sheetName}!A1:E20`,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }

        const keywords = ['行政法', '民法', '憲法', '基礎法学', '商法', '基礎知識'];
        let matchesA = 0;
        let matchesC = 0;

        rows.forEach(row => {
            // Check Column A (Index 0)
            if (row[0] && typeof row[0] === 'string') {
                for (const keyword of keywords) {
                    if (row[0].includes(keyword)) {
                        matchesA++;
                        console.log(`Match in A: ${row[0]}`);
                        break;
                    }
                }
            }
            // Check Column C (Index 2)
            if (row[2] && typeof row[2] === 'string') {
                for (const keyword of keywords) {
                    if (row[2].includes(keyword)) {
                        matchesC++;
                        console.log(`Match in C: ${row[2]}`);
                        break;
                    }
                }
            }
        });

        console.log(`Total Matches in A: ${matchesA}`);
        console.log(`Total Matches in C: ${matchesC}`);

    } catch (error) {
        console.error('Error:', error);
    }
}

findSubjectColumn();

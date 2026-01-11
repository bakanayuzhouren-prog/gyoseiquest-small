require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function inspect() {
    const sheetName = process.env.LEARN_SHEET_NAME || process.env.SHEET_NAME;
    console.log(`Inspecting sheet: ${sheetName}`);

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: `${sheetName}!A:C`, // Assuming A is subject, C is content or vice versa based on user input
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }

        const subjects = new Set();
        // Assuming column A (index 0) or C (index 2) is the subject column.
        // The user mentioned "C列（科目名の列）" in previous advice acceptance.
        // Let's check both 0 and 2 just in case.

        rows.forEach(row => {
            if (row[2]) subjects.add(row[2]); // Checking C column as per advice
            if (row[0]) subjects.add(row[0]); // Checking A column as per original script
        });

        console.log('Unique Subjects Found in A or C columns:');
        Array.from(subjects).sort().forEach(s => console.log(`- ${s}`));

    } catch (error) {
        console.error('Error:', error);
    }
}

inspect();

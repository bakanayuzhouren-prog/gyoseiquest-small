require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function sync() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: `${process.env.SHEET_NAME}!${process.env.RANGE}`,
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }

  const csv = rows.map(row => row.join(',')).join('\n');
  const fs = require('fs');
  const path = require('path');
  const csvPath = path.join(__dirname, '..', 'data', 'questions.csv');
  fs.writeFileSync(csvPath, csv);
  console.log('questions.csv synced successfully');
}

sync().catch(console.error);
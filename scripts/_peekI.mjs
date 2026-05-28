import dotenv from 'dotenv';
import { google } from 'googleapis';
dotenv.config();
const auth = process.env.GOOGLE_APPLICATION_CREDENTIALS
  ? new google.auth.GoogleAuth({ keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] })
  : process.env.GOOGLE_SHEETS_API_KEY;
const sheets = google.sheets({ version: 'v4', auth });
const r = await sheets.spreadsheets.values.get({
  spreadsheetId: process.env.SHEET_ID,
  range: "'商法・会社法'!I2:K20",
});
let emptyI = 0, filledI = 0;
for (let i = 0; i < (r.data.values || []).length; i++) {
  const row = r.data.values[i];
  const iCol = (row[0] || '').trim();
  const k = (row[2] || '').trim();
  if (!k) continue;
  if (iCol) { filledI++; console.log('R' + (i+2), 'I:', iCol.slice(0,50), '| K:', k.slice(0,40)); }
  else { emptyI++; console.log('R' + (i+2), 'I:(空) | K:', k.slice(0,50)); }
}
console.log('\nempty I:', emptyI, 'filled I:', filledI);

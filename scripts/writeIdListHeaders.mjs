/**
 * 名簿シートの1行目。A=ユーザーNO（000001から連番） B=ID（6桁ランダム） C=PW D=ユーザー名 E=アバター
 * 問題シートの同期には混ぜない。鍵は credentials/sheets-writer.json（gitignore）。
 *   node scripts/writeIdListHeaders.mjs
 */
import fs from 'fs';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

const spreadsheetId = process.env.ID_LIST_SHEET_ID;
const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!spreadsheetId) {
  console.error('ID_LIST_SHEET_ID が .env に無い');
  process.exit(1);
}
if (!keyFile || !fs.existsSync(keyFile)) {
  console.error(`書き込み鍵が無い: ${keyFile || 'GOOGLE_APPLICATION_CREDENTIALS'}`);
  console.error('credentials/sheets-writer.json を置いてから再実行する');
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  keyFile,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });
const meta = await sheets.spreadsheets.get({ spreadsheetId });
const sheet = meta.data.sheets?.[0];
const title = sheet?.properties?.title || 'シート1';
const sheetId = sheet?.properties?.sheetId ?? 0;
const quoted = title.replace(/'/g, "''");
await sheets.spreadsheets.values.update({
  spreadsheetId,
  range: `'${quoted}'!A1:E1`,
  valueInputOption: 'RAW',
  requestBody: { values: [['ユーザーNO', 'ID', 'PW', 'ユーザー名', 'アバター']] },
});
const navy = { red: 0.09, green: 0.2, blue: 0.33 };
const ink = { red: 0.16, green: 0.18, blue: 0.22 };
const band = sheet.bandedRanges || [];
const widths = [150, 130, 160, 200, 140];
await sheets.spreadsheets.batchUpdate({
  spreadsheetId,
  requestBody: {
    requests: [
      ...band.map((b) => ({ deleteBanding: { bandedRangeId: b.bandedRangeId } })),
      {
        updateSheetProperties: {
          properties: {
            sheetId,
            title: '名簿',
            tabColor: navy,
            gridProperties: { frozenRowCount: 1, hideGridlines: true },
          },
          fields: 'title,tabColor,gridProperties.frozenRowCount,gridProperties.hideGridlines',
        },
      },
      {
        addBanding: {
          bandedRange: {
            range: { sheetId, startRowIndex: 0, endRowIndex: 31, startColumnIndex: 0, endColumnIndex: 5 },
            rowProperties: {
              headerColor: navy,
              firstBandColor: { red: 1, green: 1, blue: 1 },
              secondBandColor: { red: 0.96, green: 0.95, blue: 0.92 },
            },
          },
        },
      },
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 5 },
          cell: {
            userEnteredFormat: {
              backgroundColor: navy,
              horizontalAlignment: 'CENTER',
              verticalAlignment: 'MIDDLE',
              textFormat: {
                foregroundColor: { red: 1, green: 1, blue: 1 },
                bold: true,
                fontFamily: 'Noto Sans JP',
                fontSize: 12,
              },
            },
          },
          fields: 'userEnteredFormat(backgroundColor,horizontalAlignment,verticalAlignment,textFormat)',
        },
      },
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 1, endRowIndex: 31, startColumnIndex: 0, endColumnIndex: 5 },
          cell: {
            userEnteredFormat: {
              verticalAlignment: 'MIDDLE',
              textFormat: { foregroundColor: ink, fontFamily: 'Noto Sans JP', fontSize: 12 },
            },
          },
          fields: 'userEnteredFormat(verticalAlignment,textFormat)',
        },
      },
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 1, endRowIndex: 31, startColumnIndex: 0, endColumnIndex: 2 },
          cell: {
            userEnteredFormat: {
              horizontalAlignment: 'CENTER',
              numberFormat: { type: 'TEXT' },
            },
          },
          fields: 'userEnteredFormat(horizontalAlignment,numberFormat)',
        },
      },
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 1, endRowIndex: 31, startColumnIndex: 2, endColumnIndex: 4 },
          cell: { userEnteredFormat: { horizontalAlignment: 'LEFT' } },
          fields: 'userEnteredFormat.horizontalAlignment',
        },
      },
      {
        repeatCell: {
          range: { sheetId, startRowIndex: 1, endRowIndex: 31, startColumnIndex: 4, endColumnIndex: 5 },
          cell: { userEnteredFormat: { horizontalAlignment: 'CENTER' } },
          fields: 'userEnteredFormat.horizontalAlignment',
        },
      },
      {
        updateBorders: {
          range: { sheetId, startRowIndex: 0, endRowIndex: 31, startColumnIndex: 0, endColumnIndex: 5 },
          innerHorizontal: { style: 'SOLID', color: { red: 0.9, green: 0.89, blue: 0.86 } },
        },
      },
      {
        updateDimensionProperties: {
          range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 },
          properties: { pixelSize: 40 },
          fields: 'pixelSize',
        },
      },
      {
        updateDimensionProperties: {
          range: { sheetId, dimension: 'ROWS', startIndex: 1, endIndex: 31 },
          properties: { pixelSize: 32 },
          fields: 'pixelSize',
        },
      },
      ...widths.map((pixelSize, i) => ({
        updateDimensionProperties: {
          range: { sheetId, dimension: 'COLUMNS', startIndex: i, endIndex: i + 1 },
          properties: { pixelSize },
          fields: 'pixelSize',
        },
      })),
    ],
  },
});
console.log(`styled ${title}`);

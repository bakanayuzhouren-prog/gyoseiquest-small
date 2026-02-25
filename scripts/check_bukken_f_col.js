require('dotenv').config();
const { google } = require('googleapis');

const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_SHEETS_API_KEY });
const spreadsheetId = process.env.SHEET_ID;

async function run() {
    // 全シート取得
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetList = meta.data.sheets.map(s => s.properties.title);
    console.log('All sheets:', sheetList.join(', '));

    // 民法物権シートを探す
    const bukkenSheet = sheetList.find(t => t.includes('物権') || t === '民法物権');
    if (!bukkenSheet) {
        console.log('民法物権シートが見つかりません');
        return;
    }
    console.log(`\n=== シート: ${bukkenSheet} ===`);

    const resp = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${bukkenSheet}!A:K`,
    });
    const rows = resp.data.values || [];
    console.log(`総行数: ${rows.length}`);
    if (rows.length > 0) {
        console.log('1行目(ヘッダ):', JSON.stringify(rows[0]));
    }

    // F列（index=5）があるかチェック
    let fColCount = 0;
    rows.slice(1).forEach((row, i) => {
        const fVal = row[5] ? row[5].trim() : '';
        if (fVal) {
            fColCount++;
            if (fColCount <= 5) {
                console.log(`\nRow ${i + 2} F列あり:`);
                console.log('  A:', (row[0] || '').substring(0, 60));
                console.log('  F:', fVal.substring(0, 120));
            }
        }
    });
    console.log(`\nF列データがある行: ${fColCount}/${rows.length - 1}`);
}

run().catch(console.error);

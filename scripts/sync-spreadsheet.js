const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const SPREADSHEET_ID = process.env.SHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || '行政法 1（ここに全部入ってる）';
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

async function syncSpreadsheet() {
    try {
        console.log('🔄 Google Sheetsからデータを取得中...');

        const sheets = google.sheets({ version: 'v4', auth: API_KEY });

        // A列（問題文）とF列（もっと深掘る）を取得
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:F`,
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            console.error('❌ データが見つかりませんでした');
            process.exit(1);
        }

        console.log(`✅ ${rows.length}行のデータを取得しました`);

        // ヘッダー行をスキップ（1行目）
        const dataRows = rows.slice(1);

        // 既存のquestions.jsの構造に合わせてデータを変換
        const questions = dataRows.map((row, index) => {
            const text = row[0] || ''; // A列：問題文
            const explain = row[5] || ''; // F列：もっと深掘る

            return {
                text: text,
                choices: [], // 選択肢は別途設定が必要
                answer: [0],
                explain: explain,
                wordBank: '',
                memo: '',
                slots: [],
                refId: '',
                isBonus: false
            };
        });

        // JSONファイルとして出力
        const outputPath = path.join(__dirname, '..', 'src', 'questions-from-sheets.json');
        fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2), 'utf8');

        console.log(`✅ ${outputPath} にデータを保存しました`);
        console.log(`📊 合計 ${questions.length} 問の問題を処理しました`);

    } catch (error) {
        console.error('❌ エラーが発生しました:', error.message);

        if (error.message.includes('API key')) {
            console.error('\n💡 ヒント: .envファイルにGOOGLE_SHEETS_API_KEYが設定されているか確認してください');
        }

        process.exit(1);
    }
}

syncSpreadsheet();

/**
 * sync_bukken_deep_dive.js
 * 民法物権シートのF列（深掘り内容）を
 * - src/learn.js の民法物権項目に [[LINK:N]] タグを追加
 * - src/questions.js の民法物権[N].explain にF列の内容を設定
 */

require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_SHEETS_API_KEY });
const spreadsheetId = process.env.SHEET_ID;

const LEARN_PATH = path.join(__dirname, '../src/learn.js');
const QUESTIONS_PATH = path.join(__dirname, '../src/questions.js');

async function run() {
    // 1. スプレッドシートから民法物権シートを取得
    console.log('民法物権シートを取得中...');
    const resp = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: '民法物権!A:K',
    });
    const rows = resp.data.values || [];
    const dataRows = rows.slice(1); // ヘッダ除外

    // 2. 各行を走査してF列データを持つ行のインデックスとコンテンツを収集
    //    (syncLearn.js と同じ「新問題開始」ロジックを使用)
    let qIndex = -1;
    const deepDiveMap = {}; // { learnIndex: { contentA, contentF } }

    dataRows.forEach((row) => {
        const valH = row[7] ? row[7].trim() : '';
        const valA = row[0] ? row[0].trim() : '';
        const valF = row[5] ? row[5].trim() : '';

        const isNewQ = valH || (valA && !valA.startsWith('科目') && valA !== '問題' && valA !== '肢');
        if (isNewQ) {
            qIndex++;
        }
        if (valF && qIndex >= 0) {
            deepDiveMap[qIndex] = { contentA: valA, contentF: valF };
        }
    });

    console.log(`F列データが見つかったインデックス: ${Object.keys(deepDiveMap).join(', ')}`);
    Object.entries(deepDiveMap).forEach(([idx, { contentA }]) => {
        console.log(`  [${idx}] ${contentA.substring(0, 50)}`);
    });

    // 3. learn.js を更新（[[LINK:N]] タグを追加）
    console.log('\nlearn.js を更新中...');
    const learnSrc = fs.readFileSync(LEARN_PATH, 'utf-8');
    // 現在の LEARN_CONTENT を eval で取得
    const learnModule = {};
    eval(learnSrc.replace('export const', 'learnModule.LEARN_CONTENT ='));
    const learnContent = learnModule.LEARN_CONTENT;

    const bukkenLearn = learnContent['民法物権'] || [];
    let learnUpdated = 0;
    Object.entries(deepDiveMap).forEach(([idxStr, { contentF }]) => {
        const idx = parseInt(idxStr, 10);
        if (idx < bukkenLearn.length) {
            // 既存のLINKタグがあれば除去してから付け直す
            bukkenLearn[idx] = bukkenLearn[idx].replace(/\[\[LINK:\d+\]\]/g, '');
            bukkenLearn[idx] = `${bukkenLearn[idx]}[[LINK:${idx}]]`;
            learnUpdated++;
        }
    });
    learnContent['民法物権'] = bukkenLearn;
    const newLearnSrc = `export const LEARN_CONTENT = ${JSON.stringify(learnContent, null, 2)};`;
    fs.writeFileSync(LEARN_PATH, newLearnSrc);
    console.log(`learn.js: ${learnUpdated}件の[[LINK:]]タグを更新しました`);

    // 4. questions.js を更新（民法物権[N].explain にF列の内容を設定）
    console.log('\nquestions.js を更新中...');
    let questionsSrc = fs.readFileSync(QUESTIONS_PATH, 'utf-8');

    // questions.js をモジュールとしてロード（CommonJS形式）
    // export を module.exports に変換してeval
    const qModule = {};
    eval(questionsSrc
        .replace(/^export const SUBJECTS\s*=/, 'qModule.SUBJECTS =')
    );
    const SUBJECTS = qModule.SUBJECTS;

    // 民法物権カテゴリを検索
    let bukkenQuestions = null;
    for (const category of Object.values(SUBJECTS)) {
        if (category['民法物権']) {
            bukkenQuestions = category['民法物権'];
            break;
        }
    }

    if (!bukkenQuestions) {
        console.error('questions.js に民法物権が見つかりません');
        return;
    }

    console.log(`questions.js 民法物権: ${bukkenQuestions.length} 件`);
    let qUpdated = 0;

    Object.entries(deepDiveMap).forEach(([idxStr, { contentF, contentA }]) => {
        const idx = parseInt(idxStr, 10);
        if (idx < bukkenQuestions.length) {
            // explain が空または問題文のみの場合は更新
            const current = bukkenQuestions[idx].explain || '';
            if (!current || current === contentA || current.length < 30) {
                bukkenQuestions[idx].explain = contentF;
                bukkenQuestions[idx].title = bukkenQuestions[idx].title || contentA.substring(0, 40);
                console.log(`  [${idx}] explain を更新: ${contentA.substring(0, 40)}`);
                qUpdated++;
            } else {
                console.log(`  [${idx}] スキップ（既に内容あり）: ${current.substring(0, 30)}`);
            }
        } else {
            console.log(`  [${idx}] インデックス超過 (questions.js には ${bukkenQuestions.length} 件)`);
        }
    });

    // questions.js を再書き込み
    const newQSrc = `export const SUBJECTS = ${JSON.stringify(SUBJECTS, null, 2)};`;
    fs.writeFileSync(QUESTIONS_PATH, newQSrc);
    console.log(`\nquestions.js: ${qUpdated}件の explain を更新しました`);
    console.log('\n同期完了！');
}

run().catch(console.error);

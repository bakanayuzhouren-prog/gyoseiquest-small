/**
 * sync_bukken_questions_force.js
 * 民法物権シートのF列（深掘り内容）を questions.js の民法物権[N].explain に強制反映
 * ※ 既存のコンテンツを問わず全件上書き
 */

require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_SHEETS_API_KEY });
const spreadsheetId = process.env.SHEET_ID;
const QUESTIONS_PATH = path.join(__dirname, '../src/questions.js');

async function run() {
    // 1. スプレッドシートからF列データを取得（民法物権シート）
    console.log('民法物権シートを取得中...');
    const resp = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: '民法物権!A:K',
    });
    const rows = resp.data.values || [];
    const dataRows = rows.slice(1);

    // 2. 民法物権の各肢（A列）インデックスとF列データを対応付け
    //    syncLearn.js と同じロジック：H列あり=グループ開始、A列=各肢エントリ
    //    F列はその肢に直接紐付く（各肢行にF列がある）
    let qIndex = -1; // learnContent の push カウンタ（実際のインデックス）
    const deepDiveMap = {}; // { learnIndex: { contentA, contentF } }

    dataRows.forEach((row) => {
        const valH = row[7] ? row[7].trim() : '';
        const valA = row[0] ? row[0].trim() : '';
        const valF = row[5] ? row[5].trim() : '';

        if (valA === '問題' || valA === '肢' || valA.startsWith('科目')) return;

        // A列が空かつH列が問題文のみの行はスキップ（H列の問題文はlearnに入らない）
        if (!valA && valH) return;

        // A列がある行がエントリとなる
        if (valA) {
            qIndex++;
            if (valF) {
                deepDiveMap[qIndex] = { contentA: valA, contentF: valF };
            }
        }
    });

    console.log(`F列データが見つかったインデックス: ${Object.keys(deepDiveMap).join(', ')}`);
    Object.entries(deepDiveMap).forEach(([idx, { contentA }]) => {
        console.log(`  [${idx}] ${contentA.substring(0, 50)}`);
    });

    // 3. questions.js を読み込む
    console.log('\nquestions.js を読み込み中...');
    let src = fs.readFileSync(QUESTIONS_PATH, 'utf-8');

    // 4. 民法物権セクションの範囲を特定
    const bukkenStart = src.indexOf('"民法物権": [');
    if (bukkenStart === -1) {
        console.error('民法物権セクションが見つかりません');
        return;
    }
    let pos = bukkenStart + '"民法物権": ['.length;
    let depth = 1;
    while (pos < src.length && depth > 0) {
        if (src[pos] === '[') depth++;
        else if (src[pos] === ']') depth--;
        pos++;
    }
    const bukkenEnd = pos;
    const bukkenSection = src.substring(bukkenStart, bukkenEnd);
    console.log(`民法物権セクション: ${bukkenStart}〜${bukkenEnd} (${bukkenSection.length}文字)`);

    // 5. 各オブジェクトのexplainを強制上書き
    let newBukkenSection = bukkenSection;
    let updated = 0;
    let skipped = 0;

    for (const [idxStr, { contentF, contentA }] of Object.entries(deepDiveMap)) {
        const idx = parseInt(idxStr, 10);
        const escapedContentF = JSON.stringify(contentF);

        // idx番目のオブジェクトを探す（括弧カウント）
        let objStart = -1, objEnd = -1, objCount = -1;
        let scanPos = '"民法物権": ['.length;
        let scanDepth = 0, inStr = false, escape = false;

        while (scanPos < newBukkenSection.length) {
            const ch = newBukkenSection[scanPos];
            if (escape) { escape = false; scanPos++; continue; }
            if (ch === '\\' && inStr) { escape = true; scanPos++; continue; }
            if (ch === '"') { inStr = !inStr; scanPos++; continue; }
            if (!inStr) {
                if (ch === '{') {
                    scanDepth++;
                    if (scanDepth === 1) { objCount++; if (objCount === idx) objStart = scanPos; }
                } else if (ch === '}') {
                    if (scanDepth === 1 && objCount === idx) { objEnd = scanPos + 1; break; }
                    scanDepth--;
                }
            }
            scanPos++;
        }

        if (objStart === -1 || objEnd === -1) {
            console.log(`  [${idx}] ⚠ オブジェクトが見つかりません（questions.js に${idx}番目の項目がない可能性）`);
            skipped++;
            continue;
        }

        const objStr = newBukkenSection.substring(objStart, objEnd);
        const explainMatch = objStr.match(/"explain"\s*:\s*("(?:[^"\\]|\\.)*")/);
        if (!explainMatch) {
            console.log(`  [${idx}] ⚠ explainフィールドなし`);
            skipped++;
            continue;
        }

        // 強制上書き
        const newObjStr = objStr.replace(
            /"explain"\s*:\s*("(?:[^"\\]|\\.)*")/,
            `"explain": ${escapedContentF}`
        );
        newBukkenSection = newBukkenSection.substring(0, objStart) + newObjStr + newBukkenSection.substring(objEnd);
        console.log(`  [${idx}] ✅ 更新: ${contentA.substring(0, 40)}`);
        updated++;
    }

    const newSrc = src.substring(0, bukkenStart) + newBukkenSection + src.substring(bukkenEnd);
    fs.writeFileSync(QUESTIONS_PATH, newSrc);
    console.log(`\nquestions.js: ${updated}件更新 / ${skipped}件スキップ`);
}

run().catch(console.error);

/**
 * sync_bukken_questions.js
 * 民法物権シートのF列（深掘り内容）を questions.js の民法物権[N].explain に反映
 * ※ questions.js が ESM 形式のため、正規表現ベースで直接書き換える
 */

require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_SHEETS_API_KEY });
const spreadsheetId = process.env.SHEET_ID;
const QUESTIONS_PATH = path.join(__dirname, '../src/questions.js');

async function run() {
    // 1. スプレッドシートからF列データを取得
    console.log('民法物権シートを取得中...');
    const resp = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: '民法物権!A:K',
    });
    const rows = resp.data.values || [];
    const dataRows = rows.slice(1);

    // 2. F列データを持つ行のインデックスとコンテンツを収集
    let qIndex = -1;
    const deepDiveMap = {}; // { learnIndex: { contentA, contentF } }
    dataRows.forEach((row) => {
        const valH = row[7] ? row[7].trim() : '';
        const valA = row[0] ? row[0].trim() : '';
        const valF = row[5] ? row[5].trim() : '';
        const isNewQ = valH || (valA && !valA.startsWith('科目') && valA !== '問題' && valA !== '肢');
        if (isNewQ) qIndex++;
        if (valF && qIndex >= 0) {
            deepDiveMap[qIndex] = { contentA: valA, contentF: valF };
        }
    });
    console.log(`F列データが見つかったインデックス: ${Object.keys(deepDiveMap).join(', ')}`);

    // 3. questions.js を読み込む
    console.log('\nquestions.js を読み込み中...');
    let src = fs.readFileSync(QUESTIONS_PATH, 'utf-8');

    // 4. 民法物権セクションの開始位置を見つける
    const bukkenStart = src.indexOf('"民法物権": [');
    if (bukkenStart === -1) {
        console.error('民法物権セクションが見つかりません');
        return;
    }
    console.log(`民法物権セクション開始位置: ${bukkenStart}`);

    // 5. 民法物権セクションの終了位置を見つける（次の大セクション手前まで）
    // 民法物権の配列終端 "]" を探す
    // 括弧カウントで配列の終端を見つける
    let pos = bukkenStart + '"民法物権": ['.length;
    let depth = 1;
    while (pos < src.length && depth > 0) {
        if (src[pos] === '[') depth++;
        else if (src[pos] === ']') depth--;
        pos++;
    }
    const bukkenEnd = pos;
    console.log(`民法物権セクション終了位置: ${bukkenEnd}`);

    const bukkenSection = src.substring(bukkenStart, bukkenEnd);

    // 6. 民法物権セクション内の各オブジェクト（問題）を見つけ、explain を更新
    // 問題オブジェクト は { ... } 形式
    // インデックスを数えながら処理
    let updated = 0;
    let newBukkenSection = bukkenSection;

    for (const [idxStr, { contentF, contentA }] of Object.entries(deepDiveMap)) {
        const idx = parseInt(idxStr, 10);
        console.log(`\n[${idx}] ${contentA.substring(0, 40)} の explain を更新...`);

        // 現在の explain の値を JSON.stringify で安全にエスケープ
        const escapedContentF = JSON.stringify(contentF);

        // idx 番目のオブジェクト内の explain フィールドを特定するために
        // セクション内の { } を1つずつカウントしてidx番目のオブジェクトを見つける
        let objStart = -1;
        let objEnd = -1;
        let objCount = -1;
        let scanPos = '"民法物権": ['.length;
        let scanDepth = 0;
        let inStr = false;
        let escape = false;

        while (scanPos < newBukkenSection.length) {
            const ch = newBukkenSection[scanPos];
            if (escape) { escape = false; scanPos++; continue; }
            if (ch === '\\' && inStr) { escape = true; scanPos++; continue; }
            if (ch === '"') { inStr = !inStr; scanPos++; continue; }
            if (!inStr) {
                if (ch === '{') {
                    scanDepth++;
                    if (scanDepth === 1) { // トップレベルのオブジェクト開始
                        objCount++;
                        if (objCount === idx) objStart = scanPos;
                    }
                } else if (ch === '}') {
                    if (scanDepth === 1 && objCount === idx) {
                        objEnd = scanPos + 1;
                        break;
                    }
                    scanDepth--;
                }
            }
            scanPos++;
        }

        if (objStart === -1 || objEnd === -1) {
            console.log(`  [${idx}] オブジェクトが見つかりません`);
            continue;
        }

        const objStr = newBukkenSection.substring(objStart, objEnd);

        // explain フィールドの現在の値を確認
        const explainMatch = objStr.match(/"explain"\s*:\s*("(?:[^"\\]|\\.)*")/);
        if (!explainMatch) {
            console.log(`  [${idx}] explainフィールドが見つかりません`);
            continue;
        }
        const currentExplain = JSON.parse(explainMatch[1]);
        // 既にF列内容が入っていればスキップ
        if (currentExplain && currentExplain === contentF) {
            console.log(`  [${idx}] スキップ（既に同じ内容）`);
            continue;
        }
        // explainが空 or F列の先頭100文字が含まれていない場合は更新
        const fPreview = contentF.substring(0, 80);
        if (currentExplain && currentExplain.includes(fPreview)) {
            console.log(`  [${idx}] スキップ（F列内容が既に含まれている）`);
            continue;
        }

        // explain を置換
        const newObjStr = objStr.replace(
            /"explain"\s*:\s*("(?:[^"\\]|\\.)*")/,
            `"explain": ${escapedContentF}`
        );

        newBukkenSection = newBukkenSection.substring(0, objStart) + newObjStr + newBukkenSection.substring(objEnd);
        console.log(`  [${idx}] 更新完了`);
        updated++;
    }

    // 7. questions.js 全体を再構築して書き込み
    const newSrc = src.substring(0, bukkenStart) + newBukkenSection + src.substring(bukkenEnd);
    fs.writeFileSync(QUESTIONS_PATH, newSrc);
    console.log(`\nquestions.js: ${updated}件の explain を更新しました`);
}

run().catch(console.error);

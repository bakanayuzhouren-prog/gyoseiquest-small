/**
 * import_bukken_images.js
 * temp_images/minpo_bukken/ の画像を:
 *   1. assets/images/ にコピー
 *   2. src/imageMap.js に登録
 *   3. src/questions.js の民法物権[N].explain に [[image:{N}-110]] を追加
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../temp_images/minpo_bukken');
const DEST_DIR = path.join(__dirname, '../assets/images');
const IMAGE_MAP_PATH = path.join(__dirname, '../src/imageMap.js');
const QUESTIONS_PATH = path.join(__dirname, '../src/questions.js');

// 1. 画像ファイル一覧取得（{N}-110.png 形式）
const imageFiles = fs.readdirSync(SRC_DIR)
    .filter(f => /^\d+-110\.png$/.test(f))
    .sort((a, b) => {
        const na = parseInt(a.split('-')[0], 10);
        const nb = parseInt(b.split('-')[0], 10);
        return na - nb;
    });

console.log(`対象画像: ${imageFiles.length}枚`);
imageFiles.forEach(f => console.log('  ', f));

// 2. assets/images にコピー
let copied = 0;
for (const file of imageFiles) {
    const src = path.join(SRC_DIR, file);
    const dest = path.join(DEST_DIR, file);
    if (!fs.existsSync(dest)) {
        fs.copyFileSync(src, dest);
        console.log(`コピー: ${file}`);
        copied++;
    } else {
        console.log(`スキップ（既存）: ${file}`);
    }
}
console.log(`\n画像コピー: ${copied}件\n`);

// 3. imageMap.js に登録
let imageMapSrc = fs.readFileSync(IMAGE_MAP_PATH, 'utf-8');
let imageMapUpdated = 0;
for (const file of imageFiles) {
    const key = file.replace('.png', ''); // e.g. "1-110"
    if (imageMapSrc.includes(`'${key}'`)) {
        console.log(`imageMap スキップ（既存）: ${key}`);
        continue;
    }
    // 閉じ括弧の直前に追加
    const insertLine = `  '${key}': require('@/assets/images/${file}'),\n`;
    imageMapSrc = imageMapSrc.replace('};', insertLine + '};');
    console.log(`imageMap 追加: ${key}`);
    imageMapUpdated++;
}
fs.writeFileSync(IMAGE_MAP_PATH, imageMapSrc);
console.log(`imageMap 更新: ${imageMapUpdated}件\n`);

// 4. questions.js の民法物権[N].explain に [[image:{N}-110]] を追加
let qSrc = fs.readFileSync(QUESTIONS_PATH, 'utf-8');
const bukkenStart = qSrc.indexOf('"民法物権": [');
if (bukkenStart === -1) {
    console.error('民法物権セクションが見つかりません');
    process.exit(1);
}
let pos = bukkenStart + '"民法物権": ['.length;
let depth = 1;
while (pos < qSrc.length && depth > 0) {
    if (qSrc[pos] === '[') depth++;
    else if (qSrc[pos] === ']') depth--;
    pos++;
}
const bukkenEnd = pos;
const bukkenSection = qSrc.substring(bukkenStart, bukkenEnd);

let newBukkenSection = bukkenSection;
let qUpdated = 0;

for (const file of imageFiles) {
    const n = parseInt(file.split('-')[0], 10); // questions.js インデックス
    const imageKey = file.replace('.png', ''); // e.g. "1-110"
    const imageTag = `\\n[[image:${imageKey}]]`;

    // N番目のオブジェクトを探す
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
                if (scanDepth === 1) { objCount++; if (objCount === n) objStart = scanPos; }
            } else if (ch === '}') {
                if (scanDepth === 1 && objCount === n) { objEnd = scanPos + 1; break; }
                scanDepth--;
            }
        }
        scanPos++;
    }

    if (objStart === -1 || objEnd === -1) {
        console.log(`[${n}] ⚠ オブジェクトが見つかりません`);
        continue;
    }

    const objStr = newBukkenSection.substring(objStart, objEnd);

    // 既に同じ画像タグがあればスキップ
    if (objStr.includes(`[[image:${imageKey}]]`)) {
        console.log(`[${n}] スキップ（既に画像タグあり）`);
        continue;
    }

    // explain フィールドの先頭に画像タグを追加
    const explainMatch = objStr.match(/"explain"\s*:\s*("(?:[^"\\]|\\.)*")/);
    if (!explainMatch) {
        console.log(`[${n}] ⚠ explainフィールドなし`);
        continue;
    }

    const oldExplainJson = explainMatch[1];
    // explain の先頭（開始ダブルクォートの直後）に画像タグと改行を挿入
    const newExplainJson = '"' + `[[image:${imageKey}]]\\n\\n` + oldExplainJson.slice(1);
    const newObjStr = objStr.replace(explainMatch[0], `"explain": ${newExplainJson}`);
    newBukkenSection = newBukkenSection.substring(0, objStart) + newObjStr + newBukkenSection.substring(objEnd);
    console.log(`[${n}] ✅ 画像タグ追加: [[image:${imageKey}]]`);
    qUpdated++;
}

const newQSrc = qSrc.substring(0, bukkenStart) + newBukkenSection + qSrc.substring(bukkenEnd);
fs.writeFileSync(QUESTIONS_PATH, newQSrc);
console.log(`\nquestions.js 画像追加: ${qUpdated}件`);

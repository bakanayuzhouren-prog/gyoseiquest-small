
const fs = require('fs');

const questionsPath = 'c:/dev/gyosei-quest-small/src/questions.js';
let content = fs.readFileSync(questionsPath, 'utf8');

console.log('Starting precise 民法物権 replacement...');

// "民法物権": [ の開始位置を探す
const startMarker = '"民法物権": [';
const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error('Could not find 民法物権 start');
    process.exit(1);
}

// セクションの終わり（対応する ]）を探す
let bracketCount = 0;
let endIndex = -1;
for (let i = startIndex + startMarker.length - 1; i < content.length; i++) {
    if (content[i] === '[') bracketCount++;
    if (content[i] === ']') bracketCount--;
    if (bracketCount === 0) {
        endIndex = i + 1;
        break;
    }
}

if (endIndex === -1) {
    console.error('Could not find 民法物権 end');
    process.exit(1);
}

const bukkenSection = content.substring(startIndex, endIndex);
// 各問題を { で分割するが、プロパティ内の { もあるので慎重に。
// 問題はトップレベルのオブジェクトなので "      {" みたいな感じで始まっているはず。
const questions = bukkenSection.split(/\n\s*\{\n/);
console.log(`Split into ${questions.length} parts (first part is header).`);

let imgNum = 1;
const updatedParts = questions.map((part, index) => {
    if (index === 0) return part; // "民法物権": [ 

    if (imgNum === 43) imgNum++;
    const newImgTag = `[[image:${imgNum}-110]]`;

    let updatedPart = part;
    // explain プロパティを探す
    if (updatedPart.includes('"explain": "')) {
        // もし既に改行から始まっているなら（前のスクリプトでそうなった）、それも考慮
        updatedPart = updatedPart.replace(/"explain": "\n\n/g, '"explain": "');
        updatedPart = updatedPart.replace(/"explain": "/, `"explain": "${newImgTag}\\n\\n`);
    }

    // chunks 内の explain も修正
    if (updatedPart.includes('"chunks": [')) {
        updatedPart = updatedPart.replace(/"explain": "\n\n/g, '"explain": "');
        updatedPart = updatedPart.replace(/"explain": "/g, (match, offset) => {
            // chunks の開始以降にある explain のみ置換（簡易的だがこの構造なら動くはず）
            if (offset > updatedPart.indexOf('"chunks"')) {
                return `"explain": "${newImgTag}\\n\\n`;
            }
            return match;
        });
    }

    imgNum++;
    // 画像は50まで。超えたらループするか止める。指示はないが50枚提供されているので50枚使う。
    if (imgNum > 50) imgNum = 1;

    return updatedPart;
});

const newBukkenSection = updatedParts.join('\n      {\n');
content = content.substring(0, startIndex) + newBukkenSection + content.substring(endIndex);

fs.writeFileSync(questionsPath, content, 'utf8');
console.log('Successfully updated questions.js');

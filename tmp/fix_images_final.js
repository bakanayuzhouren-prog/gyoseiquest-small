
const fs = require('fs');

const questionsPath = 'c:/dev/gyosei-quest-small/src/questions.js';
let content = fs.readFileSync(questionsPath, 'utf8');

console.log('Starting precise 民法物権 replacement with better splitting...');

const startMarker = '"民法物権": [';
const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error('Could not find 民法物権 start');
    process.exit(1);
}

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

// 問題ごとの分割をより柔軟に行う
// 各オブジェクトは { で始まり } で終わる。
// 正確に分割するために、ネストを考慮した分割を行う。
const questions = [];
let currentPos = bukkenSection.indexOf('{');
while (currentPos !== -1) {
    let nest = 0;
    let start = currentPos;
    for (let i = currentPos; i < bukkenSection.length; i++) {
        if (bukkenSection[i] === '{') nest++;
        if (bukkenSection[i] === '}') nest--;
        if (nest === 0) {
            questions.push(bukkenSection.substring(start, i + 1));
            currentPos = bukkenSection.indexOf('{', i + 1);
            break;
        }
    }
    if (nest !== 0) break; // エラー回避
}

console.log(`Found ${questions.length} questions in 民法物権.`);

let imgNum = 1;
const updatedQuestions = questions.map((q) => {
    if (imgNum === 43) imgNum++;
    const newImgTag = `[[image:${imgNum}-110]]`;

    let updatedQ = q;
    // explain プロパティを置換
    // 正規表現で "explain": "..." を探す。
    // すでに前の実行で \n\n が先頭に入っている可能性があるのでそれも考慮。
    updatedQ = updatedQ.replace(/"explain": "(\\n\\n)?/, `"explain": "${newImgTag}\\n\\n`);

    // chunks 内の explain も同様に。
    if (updatedQ.includes('"chunks"')) {
        const chunksPart = updatedQ.substring(updatedQ.indexOf('"chunks"'));
        const updatedChunksPart = chunksPart.replace(/"explain": "(\\n\\n)?/g, `"explain": "${newImgTag}\\n\\n`);
        updatedQ = updatedQ.substring(0, updatedQ.indexOf('"chunks"')) + updatedChunksPart;
    }

    imgNum++;
    if (imgNum > 50) imgNum = 1;

    return updatedQ;
});

// セクション全体を再構築
const prefix = bukkenSection.substring(0, bukkenSection.indexOf('{'));
const suffix = bukkenSection.substring(bukkenSection.lastIndexOf('}') + 1);
const newBukkenSection = prefix + updatedQuestions.join(',\n      ') + suffix;

content = content.substring(0, startIndex) + newBukkenSection + content.substring(endIndex);

fs.writeFileSync(questionsPath, content, 'utf8');
console.log('Successfully updated questions.js');

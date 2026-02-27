
const fs = require('fs');
const path = require('path');

const questionsPath = 'c:/dev/gyosei-quest-small/src/questions.js';
let content = fs.readFileSync(questionsPath, 'utf8');

console.log('Starting regex-based replacement...');

// 1. 民法物権セクションを特定する
// "民法物権": [ ... ]
const bukkenSectionRegex = /"民法物権":\s*\[([\s\S]*?)\n\s*\],/;
const bukkenMatch = content.match(bukkenSectionRegex);

if (bukkenMatch) {
    let bukkenContent = bukkenMatch[1];
    let imgNum = 1;

    // "explain": "[[image:223-230]]\n\n..." を置換する
    // 欠番 43 を考慮しつつ順番に置換する。
    // 全体を一度に置換するのではなく、一問ずつ処理するために split/join 的なアプローチをとる。

    // 問題の区切り "{ ... }" を探す
    const questionBlocks = bukkenContent.split(/\},\n\s*\{/);
    console.log(`Found ${questionBlocks.length} potential questions in 民法物権.`);

    const updatedBlocks = questionBlocks.map((block, index) => {
        if (imgNum === 43) imgNum++;
        const newImgTag = `[[image:${imgNum}-110]]`;

        // explain 内の [[image:223-230]] を置換、または先頭に追加
        let updatedBlock = block;
        if (updatedBlock.includes('"explain": "[[image:223-230]]')) {
            updatedBlock = updatedBlock.replace(/\[\[image:223-230\]\]\n*/g, newImgTag + '\n\n');
        } else if (updatedBlock.includes('"explain": "')) {
            // タグがない場合は入れる
            updatedBlock = updatedBlock.replace(/"explain": "/, `"explain": "${newImgTag}\\n\\n`);
        }

        imgNum++;
        return updatedBlock;
    });

    const newBukkenContent = updatedBlocks.join('},\n      {');
    content = content.replace(bukkenMatch[1], newBukkenContent);
    console.log('Updated 民法物権 section.');
} else {
    console.error('Could not find 民法物権 section');
}

// 2. クリーンアップ：憲法セクション以外から [[image:223-230]] を削除
// 憲法セクションの位置を特定する。
const kenpoMatch = content.match(/"憲法":\s*\{([\s\S]*?)\n\s*\},/);
if (kenpoMatch) {
    const kenpoContent = kenpoMatch[0];
    const beforeKenpo = content.substring(0, content.indexOf(kenpoContent));
    const afterKenpo = content.substring(content.indexOf(kenpoContent) + kenpoContent.length);

    // 憲法以外（前後）から [[image:223-230]] を削除
    const cleanBefore = beforeKenpo.replace(/\[\[image:223-230\]\]\n*/g, '');
    const cleanAfter = afterKenpo.replace(/\[\[image:223-230\]\]\n*/g, '');

    content = cleanBefore + kenpoContent + cleanAfter;
    console.log('Cleaned up other sections.');
} else {
    console.log('憲法セクションが見つかりませんでした。全体置換は安全のため保留します。');
}

fs.writeFileSync(questionsPath, content, 'utf8');
console.log('Successfully saved questions.js');

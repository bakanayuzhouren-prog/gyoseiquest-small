const fs = require('fs');

const QUESTIONS_FILE = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

console.log('=== 憲法2/230に画像タグ追加 ===\n');

let content = fs.readFileSync(QUESTIONS_FILE, 'utf8');

// 2つ目の "title": "参考解説" を探して、その次の行の "explain" に画像を追加
const pattern = /"title": "参考解説"/g;
let matches = [];
let match;

while ((match = pattern.exec(content)) !== null) {
    matches.push(match.index);
}

console.log(`✓ ${matches.length}個の「参考解説」を発見`);

if (matches.length < 2) {
    console.log('✗ 2つ目の参考解説が見つかりません');
    process.exit(1);
}

// 2つ目の「参考解説」の位置
const secondIndex = matches[1];
console.log(`  2つ目は index ${secondIndex}`);

// 2つ目の「参考解説」の後の "explain": を探す
const afterSecond = content.substring(secondIndex);
const explainMatch = afterSecond.match(/"explain": "([^"]*1\. 実質的意味の憲法)/);

if (!explainMatch) {
    console.log('✗ explain行が見つかりませんでした');
    process.exit(1);
}

// 既に画像タグがあるか確認
if (explainMatch[0].includes('[[image:substantive_formal_constitution]]')) {
    console.log('- 既に画像タグが存在します');
} else {
    // 画像タグを追加
    const actualExplainIndex = secondIndex + afterSecond.indexOf(explainMatch[0]);
    const before = content.substring(0, actualExplainIndex);
    const after = content.substring(actualExplainIndex);

    const updatedAfter = after.replace(
        /"explain": "1\. 実質的意味の憲法/,
        '"explain": "[[image:substantive_formal_constitution]]\\\\n\\\\n1. 実質的意味の憲法'
    );

    fs.writeFileSync(QUESTIONS_FILE, before + updatedAfter, 'utf8');
    console.log('✓ 画像タグを追加しました');
}

console.log('\n=== 完了 ===');

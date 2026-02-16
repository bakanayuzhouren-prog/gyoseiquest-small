const fs = require('fs');

const QUESTIONS_FILE = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

console.log('=== 憲法2/230に画像タグ追加 ===\n');

let content = fs.readFileSync(QUESTIONS_FILE, 'utf8');

// 憲法2/230を特定: "特定の意味を持つ憲法" で始まる問題
// この問題のchunks[0].explainを検索

// 2つ目の"参考解説"を探す（1つ目は憲法1/230）
let count = 0;
const lines = content.split('\n');
let targetLineIndex = -1;

for (let i = 0; i < lines.length; i++) {
    // chunksの中の"title": "参考解説"を検索
    if (lines[i].includes('"title": "参考解説"')) {
        count++;
        if (count === 2) {
            // 2つ目の"参考解説"が見つかった
            // 次の行が"explain"行
            targetLineIndex = i + 1;
            console.log(`✓ 憲法2/230の参考解説を発見（line ${targetLineIndex + 1}）`);
            break;
        }
    }
}

if (targetLineIndex === -1) {
    console.log('✗ 憲法2/230が見つかりませんでした');
    process.exit(1);
}

// explainの行を確認
const explainLine = lines[targetLineIndex];

if (explainLine.includes('[[image:substantive_formal_constitution]]')) {
    console.log('- 既に画像タグが存在します');
} else if (explainLine.includes('"explain":')) {
    // 画像タグを追加
    lines[targetLineIndex] = explainLine.replace(
        /"explain": "([^"]*1\. 実質的意味)/,
        '"explain": "[[image:substantive_formal_constitution]]\\\\n\\\\n$1'
    );

    // ファイルに書き戻し
    fs.writeFileSync(QUESTIONS_FILE, lines.join('\n'), 'utf8');
    console.log('✓ 画像タグを追加しました');
} else {
    console.log('✗ explain行が見つかりませんでした');
    console.log('行の内容:', explainLine.substring(0, 100));
}

console.log('\n=== 完了 ===');

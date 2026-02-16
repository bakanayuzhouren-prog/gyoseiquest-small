yconst fs = require('fs');

const QUESTIONS_FILE = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

console.log('=== 憲法1-4/230に画像タグ追加（新画像名） ===\n');

let content = fs.readFileSync(QUESTIONS_FILE, 'utf8');

// 「参考解説」を探して、出現順に画像を置き換える
const pattern = /"title": "参考解説"/g;
let matches = [];
let match;

while ((match = pattern.exec(content)) !== null) {
    matches.push(match.index);
}

console.log(`✓ ${matches.length}個の「参考解説」を発見`);

// 1つ目: 憲法1/230 → 1-230
// 2つ目: 憲法2/230 → 2-230
// 3つ目: 憲法4/230 → 4-230（3/230はchunksなし）

const replacements = [
    { index: 0, oldImage: 'rigid_flexible_constitution', newImage: '1-230', label: '憲法1/230' },
    { index: 1, oldImage: 'substantive_formal_constitution', newImage: '2-230', label: '憲法2/230' },
    { index: 2, oldImage: 'rigid_flexible_constitution', newImage: '4-230', label: '憲法4/230' }
];

let updatedContent = content;
let offset = 0;

for (const repl of replacements) {
    if (repl.index >= matches.length) {
        console.log(`⚠ ${repl.label}: スキップ（参考解説が不足）`);
        continue;
    }

    const matchIndex = matches[repl.index] + offset;
    const afterMatch = updatedContent.substring(matchIndex);
    const explainMatch = afterMatch.match(/"explain": "(\[\[image:[^\]]+\]\])?([^"]*)"/);

    if (!explainMatch) {
        console.log(`⚠ ${repl.label}: explain行が見つかりません`);
        continue;
    }

    const actualExplainIndex = matchIndex + afterMatch.indexOf(explainMatch[0]);
    const before = updatedContent.substring(0, actualExplainIndex);
    const after = updatedContent.substring(actualExplainIndex);

    // 既存の画像タグを新しい画像名に置き換え、または追加
    let updatedAfter;
    if (explainMatch[1]) {
        // 既に画像タグがある場合は置き換え
        updatedAfter = after.replace(
            /\[\[image:[^\]]+\]\]/,
            `[[image:${repl.newImage}]]`
        );
        console.log(`✓ ${repl.label}: ${repl.oldImage} → ${repl.newImage}に置き換え`);
    } else {
        // 画像タグがない場合は追加
        updatedAfter = after.replace(
            /"explain": "([^"]*)/,
            `"explain": "[[image:${repl.newImage}]]\\\\n\\\\n$1`
        );
        console.log(`✓ ${repl.label}: ${repl.newImage}を追加`);
    }

    const lengthDiff = updatedAfter.length - after.length;
    offset += lengthDiff;

    updatedContent = before + updatedAfter;
}

// ファイルに書き戻し
fs.writeFileSync(QUESTIONS_FILE, updatedContent, 'utf8');

console.log('\n=== 完了 ===');
console.log('憲法3/230はchunksが空のため、スキップしました。');
console.log('必要に応じて手動で追加してください。');

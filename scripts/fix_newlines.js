const fs = require('fs');
const path = require('path');

const QUEST_FILE = path.join(__dirname, '..', 'src', 'questions.js');

if (!fs.existsSync(QUEST_FILE)) {
    console.error('questions.js not found');
    process.exit(1);
}

let content = fs.readFileSync(QUEST_FILE, 'utf8');

console.log('Checking for double-escaped newlines...');

// 正規表現: [[image:...]] の後に \\n が続いている箇所を探す
// ファイル上の \\n は、JS文字列としては \\\\n
const regex = /(\[\[image:[^\]]+\]\])(\\\\n)+/g;

let count = 0;
const newContent = content.replace(regex, (match, tag) => {
    count++;
    // ファイル上に \n\n と書き込みたい場合、JS文字列としては '\\n\\n' とする
    return tag + '\\n\\n';
});

if (count > 0) {
    console.log(`Found and fixing ${count} occurrences.`);
    fs.writeFileSync(QUEST_FILE, newContent, 'utf8');
    console.log('questions.js updated successfully.');
} else {
    console.log('No double-escaped newlines found.');

    // デバッグ用：実際にどうなっているか確認
    const debugRegex = /\[\[image:[^\]]+\]\](.{0,10})/g;
    let m;
    let shown = 0;
    while ((m = debugRegex.exec(content)) !== null) {
        if (shown++ < 5) {
            console.log(`Sample: ${m[0]}`);
        }
    }
}

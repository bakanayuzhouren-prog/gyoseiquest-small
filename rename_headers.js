
const fs = require('fs');
const path = require('path');

const targetPath = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

try {
    console.log(`Reading file: ${targetPath}`);
    let content = fs.readFileSync(targetPath, 'utf8');

    // Patterns to replace
    const replacements = [
        { from: /4\. 学習アプリへの実装ヒント/g, to: '４．実践' },
        { from: /学習アプリへの実装ヒント/g, to: '実践' },
        { from: /4\. アプリ実装へのヒント/g, to: '４．実践' },
        { from: /アプリ実装へのヒント/g, to: '実践' },
        { from: /アプリ用ヒント：/g, to: '【実践】' } // Point 22 case
    ];

    let newContent = content;
    for (const r of replacements) {
        newContent = newContent.replace(r.from, r.to);
    }

    if (newContent !== content) {
        console.log("Saving changes...");
        fs.writeFileSync(targetPath, newContent);
        console.log("Successfully renamed implementation hint sections.");
    } else {
        console.log("No matches found to rename.");
    }

} catch (err) {
    console.error("An error occurred:");
    console.error(err);
    process.exit(1);
}

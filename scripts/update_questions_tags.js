const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'src', 'questions.js');

try {
    console.log('Reading file...');
    let content = fs.readFileSync(FILE_PATH, 'utf8');

    // 単純な文字列置換
    // [[image:1-230]] -> [[image:1-230-1]]\n[[image:1-230-2]]
    // ※ エスケープされた改行 \\n を使う必要がある（JSON文字列内なので）

    // 注意: 前回のスクリプトでタグの位置が変わっている可能性がある。
    // 親のexplainにあるはず。

    const target = '[[image:1-230]]';
    const replacement = '[[image:1-230-1]]\\\\n[[image:1-230-2]]';

    if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(FILE_PATH, content, 'utf8');
        console.log('Successfully updated questions.js');
    } else {
        console.warn('Target tag not found:', target);
        // すでに変換済みか、フォーマットが違うか確認
        if (content.includes('[[image:1-230-1]]')) {
            console.log('Already updated.');
        }
    }

} catch (err) {
    console.error('Error:', err);
}

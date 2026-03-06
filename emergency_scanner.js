const fs = require('fs');
const filePath = 'c:/dev/gyosei-quest-small/src/questions.js';

try {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`File size: ${content.length} characters`);

    // 1. 不特定の文字化け（制御文字や不正な結合）の探索
    const lines = content.split('\n');
    let corruptions = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // "order": 999 などの近くに日本語が混じっている怪しい箇所（前回の不具合）
        if (line.includes('er": 999') && !line.includes('"order": 999')) {
            corruptions.push({ line: i + 1, content: line.trim() });
        }
        // 文字化け特有のパターンや、明らかに壊れたキー名を探索
        if (line.match(/[^\x00-\x7F]{1,3}[a-zA-Z0-9]{1,3}":/)) {
            corruptions.push({ line: i + 1, content: line.trim(), reason: 'Possible key corruption' });
        }
    }

    if (corruptions.length > 0) {
        console.log('--- Corruptions Found ---');
        corruptions.forEach(c => console.log(`L${c.line}: ${c.content} (${c.reason || 'Splicing error'})`));
    } else {
        console.log('No obvious string-level corruptions found.');
    }

    // 2. 問題データの整合性チェック
    // textキーがあるのに choices がない、あるいはその逆を探索
    let structuralIssues = [];
    let currentSubject = '';
    let inQuestion = false;
    let hasText = false;
    let hasChoices = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('"text":')) hasText = true;
        if (line.includes('"choices":')) hasChoices = true;

        if (line.trim() === '},' || line.trim() === '}') {
            if (hasText && !hasChoices) {
                structuralIssues.push({ line: i + 1, reason: 'Missing choices for a question' });
            }
            hasText = false;
            hasChoices = false;
        }
    }

    if (structuralIssues.length > 0) {
        console.log('--- Structural Issues Found ---');
        structuralIssues.forEach(s => console.log(`L${s.line}: ${s.reason}`));
    } else {
        console.log('No obvious structural issues found.');
    }

} catch (err) {
    console.error('Critical Error during scanning:', err);
}

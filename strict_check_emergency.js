const fs = require('fs');
const filePath = 'c:/dev/gyosei-quest-small/src/questions.js';

try {
    const content = fs.readFileSync(filePath, 'utf8');
    // export const SUBJECTS = ...; をオブジェクトとして抽出するための簡易 eval 環境
    const subjects = {};
    const mockExport = (name, value) => { subjects[name] = value; };

    // export const SUBJECTS = { ... }; の部分を無理やり評価
    const scriptContent = content
        .replace('export const SUBJECTS =', 'global.SUBJECTS =')
        .replace(/import .*/g, '// $&');

    try {
        eval(scriptContent);
        console.log('SUBJECTS successfully evaluated.');

        if (!global.SUBJECTS) {
            throw new Error('global.SUBJECTS is empty after eval');
        }

        const sections = Object.keys(global.SUBJECTS);
        console.log('Found subjects:', sections);

        sections.forEach(s => {
            const subItems = global.SUBJECTS[s];
            Object.keys(subItems).forEach(subKey => {
                const questions = subItems[subKey];
                if (!Array.isArray(questions)) {
                    console.log(`[ISSUE] ${s} -> ${subKey} is not an array!`);
                    return;
                }
                questions.forEach((q, idx) => {
                    if (!q.text) console.log(`[MISSING TEXT] ${s} -> ${subKey}[${idx}]`);
                    if (!q.choices) {
                        console.log(`[MISSING CHOICES] ${s} -> ${subKey}[${idx}]`);
                        console.log('Problematic question object preview:', JSON.stringify(q).substring(0, 100));
                    }
                });
            });
        });

    } catch (e) {
        console.error('Eval error (Syntax Error in questions.js?):', e.message);

        // エラー箇所を絞り込む
        const lines = content.split('\n');
        const match = e.stack.match(/<anonymous>:(\d+):(\d+)/);
        if (match) {
            const lineNum = parseInt(match[1]);
            console.log(`Potential syntax error around line ${lineNum}:`);
            console.log(lines.slice(Math.max(0, lineNum - 3), lineNum + 2).join('\n'));
        }
    }

} catch (err) {
    console.error('File read error:', err);
}

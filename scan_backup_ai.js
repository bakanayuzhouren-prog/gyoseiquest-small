const fs = require('fs');
const filePath = 'c:/dev/gyosei-quest-small/src/questions.js.backup_ai';

try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    let currentSubject = '';
    let inQuestion = false;
    let hasText = false;
    let hasChoices = false;
    let startLine = 0;

    console.log(`Analyzing ${filePath}...`);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('"text":')) {
            hasText = true;
            if (!inQuestion) {
                inQuestion = true;
                startLine = i + 1;
            }
        }
        if (line.includes('"choices":')) hasChoices = true;

        // オブジェクトの終わり } または },
        if (line.trim().match(/^\},?$/)) {
            if (inQuestion) {
                if (!hasChoices && hasText) {
                    console.log(`[DATA MISMATCH] L${startLine}-${i + 1}: Missing "choices"`);
                    console.log(`Preview: ${lines[startLine - 1].trim()} ...`);
                }
                inQuestion = false;
                hasText = false;
                hasChoices = false;
            }
        }
    }
} catch (err) {
    console.error(err);
}

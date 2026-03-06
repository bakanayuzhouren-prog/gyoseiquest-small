const fs = require('fs');

const backupPath = 'c:/dev/gyosei-quest-small/src/questions.js.backup_ai_v2';
const bukkenDataPath = 'c:/dev/gyosei-quest-small/temp_bukken_generated.js';
const targetPath = 'c:/dev/gyosei-quest-small/src/questions.js';

try {
    console.log('--- FINAL STRING RESTORATION START ---');

    let content = fs.readFileSync(backupPath, 'utf8');
    const bukkenQuestions = fs.readFileSync(bukkenDataPath, 'utf8');

    // Find "民法物権": [ ... ] and replace its content
    const bukkenKey = '"民法物権":';
    const keyIndex = content.indexOf(bukkenKey);

    if (keyIndex === -1) {
        throw new Error('Could not find 民法物権 in backup_ai_v2');
    }

    const arrayStart = content.indexOf('[', keyIndex);
    if (arrayStart === -1) throw new Error('Could not find array start for bukken');

    // Find matching array end ]
    let balance = 0;
    let arrayEnd = -1;
    for (let i = arrayStart; i < content.length; i++) {
        if (content[i] === '[') balance++;
        else if (content[i] === ']') balance--;

        if (balance === 0) {
            arrayEnd = i;
            break;
        }
    }

    if (arrayEnd === -1) throw new Error('Could not find array end for bukken');

    // Replacement
    const newContent = content.substring(0, arrayStart) + bukkenQuestions + content.substring(arrayEnd + 1);

    // Make sure export const RESOURCES exists or rename STATUTES
    let finalContent = newContent;
    if (!finalContent.includes('export const RESOURCES')) {
        if (finalContent.includes('export const STATUTES')) {
            finalContent = finalContent.replace('export const STATUTES', 'export const RESOURCES');
        } else if (finalContent.includes('const RESOURCES')) {
            finalContent = finalContent.replace('const RESOURCES', 'export const RESOURCES');
        } else if (finalContent.includes('RESOURCES =')) {
            finalContent = finalContent.replace('RESOURCES =', 'export const RESOURCES =');
        }
    }

    fs.writeFileSync(targetPath, finalContent, 'utf8');
    console.log('Successfully restored src/questions.js via string manipulation.');

} catch (err) {
    console.error('RESTORE v5 FAILED:', err);
    process.exit(1);
}

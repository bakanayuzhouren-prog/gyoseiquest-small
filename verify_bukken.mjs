import { readFileSync } from 'fs';

const text = readFileSync('src/questions.js', 'utf8');
const lines = text.split('\n');

// 民法物権セクションの正確な問題数と内容を確認
let inSection = false;
let sectionStart = -1;
let sectionEnd = -1;
let qCount = 0;
let depth = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('"民法物権"') && line.includes('[')) {
        inSection = true;
        sectionStart = i + 1;
        console.log(`民法物権 starts at line ${i + 1}`);
        // depth count
        for (const ch of line) {
            if (ch === '[') depth++;
            else if (ch === ']') depth--;
        }
        continue;
    }

    if (inSection) {
        for (const ch of line) {
            if (ch === '[') depth++;
            else if (ch === ']') {
                depth--;
                if (depth === 0) {
                    sectionEnd = i + 1;
                    console.log(`民法物権 ends at line ${i + 1}`);
                    break;
                }
            }
        }
        if (sectionEnd !== -1) break;

        if (line.trim().startsWith('"text":')) qCount++;
    }
}

console.log(`民法物権の問題数: ${qCount}`);
console.log(`セクション行数: ${sectionEnd - sectionStart}`);

// 最初の5問を確認
let found = 0;
let inSec2 = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"民法物権"')) { inSec2 = true; continue; }
    if (inSec2 && lines[i].trim().startsWith('"text":') && found < 5) {
        console.log(`Q${found + 1}: ${lines[i].trim().substring(0, 80)}`);
        found++;
    }
    if (found >= 5) break;
}

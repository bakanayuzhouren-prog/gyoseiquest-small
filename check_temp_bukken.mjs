import { readFileSync } from 'fs';

const text = readFileSync('temp_check.mjs', 'utf8');
const lines = text.split('\n');

let inMinpoBukken = false;
let startLine = -1;
let endLine = -1;
let qCount = 0;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"民法物') && lines[i].includes('権"')) {
        inMinpoBukken = true;
        startLine = i + 1;
        console.log('temp_check 民法物権 start line:', startLine);
        continue;
    }
    if (inMinpoBukken) {
        if (lines[i].trim().match(/^"text":/)) {
            qCount++;
        }
        // Look for next section
        if (i > startLine + 10 && (
            lines[i].trim().match(/^"民法(債権|家族|総論)"/) ||
            lines[i].trim().match(/^"行政/) ||
            lines[i].trim().match(/^"憲法/) ||
            lines[i].trim() === '};'
        )) {
            endLine = i + 1;
            console.log('temp_check 民法物権 end line:', endLine, ':', lines[i].trim().substring(0, 60));
            break;
        }
    }
}

console.log('Question count in temp_check 民法物権:', qCount);

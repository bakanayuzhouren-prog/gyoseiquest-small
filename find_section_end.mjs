import { readFileSync } from 'fs';

const text = readFileSync('src/questions.js', 'utf8');
const lines = text.split('\n');

let inMinpoBukken = false;
let startLine = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"民法物') && lines[i].includes('権"')) {
        inMinpoBukken = true;
        startLine = i + 1;
        console.log('民法物権 start line:', startLine);
        continue;
    }
    if (inMinpoBukken && i > startLine + 10) {
        const trimmed = lines[i].trim();
        // Look for a new top-level key after the section
        if (trimmed.match(/^"民法(債権|家族|総論)"/) || trimmed.match(/^"行政/) || trimmed.match(/^"憲法/)) {
            console.log('Next section at line:', i + 1, ':', trimmed.substring(0, 80));
            break;
        }
    }
}

// Count questions in 民法物権 section
let qCount = 0;
let inSection = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"民法物') && lines[i].includes('権"')) {
        inSection = true;
        continue;
    }
    if (inSection) {
        if (lines[i].trim().match(/^"text":/)) {
            qCount++;
        }
        if (lines[i].trim().match(/^"民法(債権|家族|総論)"/) || lines[i].trim().match(/^"行政/) || lines[i].trim().match(/^"憲法/)) {
            break;
        }
    }
}
console.log('Question count in 民法物権:', qCount);

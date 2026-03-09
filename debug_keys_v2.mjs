import fs from 'fs';

const content = fs.readFileSync('src/questions.js', 'utf8');
const lines = content.split('\n');

let report = "";
let subjectsCount = 0;
lines.forEach((line, idx) => {
    if (line.includes('export const SUBJECTS = {')) {
        subjectsCount++;
        report += `SUBJECTS #${subjectsCount} found at Line ${idx + 1}\n`;
    }

    const match = line.match(/^\s*"([^"]+)": \{/);
    if (match) {
        report += `  Key: "${match[1]}" at Line ${idx + 1}\n`;
    }
});

fs.writeFileSync('keys_report.txt', report);
console.log("Report written to keys_report.txt");

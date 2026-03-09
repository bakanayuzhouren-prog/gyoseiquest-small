import fs from 'fs';

const content = fs.readFileSync('src/questions.js', 'utf8');
const lines = content.split('\n');

console.log('--- SUBJECTS occurrences ---');
lines.forEach((line, idx) => {
    if (line.includes('export const SUBJECTS = {')) {
        console.log(`Line ${idx + 1}: ${line}`);
    }
});

console.log('\n--- Top keys in the whole file (very basic) ---');
lines.forEach((line, idx) => {
    const match = line.match(/^\s*"([^"]+)": \{/);
    if (match) {
        console.log(`Line ${idx + 1}: ${match[1]}`);
    }
});

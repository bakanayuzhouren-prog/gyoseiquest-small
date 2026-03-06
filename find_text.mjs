import fs from 'fs';
const content = fs.readFileSync('temp_check.mjs', 'utf8');
const lines = content.split('\n');

console.log('Searching for "総有に属する"...');
lines.forEach((line, i) => {
    if (line.includes('総有に属する')) {
        console.log(`${i + 1}: ${line.trim()}`);
    }
});

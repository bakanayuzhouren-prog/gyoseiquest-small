import fs from 'fs';
const content = fs.readFileSync('temp_check.mjs', 'utf8');
const lines = content.split('\n');

console.log('Searching for (r)...');
lines.forEach((line, i) => {
    if (line.includes('(r)')) {
        console.log(`${i + 1}: ${line.trim()}`);
    }
});

console.log('\nSearching for ※...');
lines.forEach((line, i) => {
    if (line.includes('※')) {
        console.log(`${i + 1}: ${line.trim()}`);
    }
});

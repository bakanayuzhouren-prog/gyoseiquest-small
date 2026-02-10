const fs = require('fs');

function getQuestions(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = [...content.matchAll(/\"憲法\":\s*\[([\s\S]*?)\]/g)];
    const lastMatch = matches[matches.length - 1];
    const arrayContent = lastMatch[1].trim();
    return arrayContent.split('\n').map(l => l.trim()).filter(l => l.startsWith('"')).map(l => l.replace(/^"|"?,?$/g, ''));
}

const oldQs = getQuestions('old_learn.js');
const curQs = getQuestions('src/learn.js');

console.log('Old count:', oldQs.length);
console.log('Current count:', curQs.length);

const missing = oldQs.filter(q => !curQs.includes(q));

console.log('Number of questions in Old but not in Current:', missing.length);
console.log('--- Missing List ---');
missing.forEach((q, i) => console.log(`${i + 1}: ${q}`));

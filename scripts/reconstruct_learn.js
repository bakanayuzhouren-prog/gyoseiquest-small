const fs = require('fs');
const path = require('path');

const rawFile = path.join(__dirname, '../raw_list.txt');
const targetFile = path.join(__dirname, '../src/learn.js');

const content = fs.readFileSync(rawFile, 'utf8');
const lines = content.split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .filter(l => !l.includes('問題が少なすぎるけど'))
    .filter((v, i, a) => a.indexOf(v) === i); // Unique

const data = {
    "行政法": lines
};

const output = `export const LEARN_CONTENT = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync(targetFile, output);
console.log(`Successfully reconstructed learn.js with ${lines.length} items.`);

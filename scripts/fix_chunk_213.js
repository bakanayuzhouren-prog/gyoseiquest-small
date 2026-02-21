const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'src', 'questions.js');
let content = fs.readFileSync(filePath, 'utf8');

const markerIndex = content.indexOf('"憲法": [');
if (markerIndex === -1) { console.log('not found'); process.exit(1); }

let pos = content.indexOf('[', markerIndex) + 1;
let depth = 0;
let count = 0;
let objStart = -1;
let objEnd = -1;

for (let i = pos; i < content.length; i++) {
    if (content[i] === '{') {
        if (depth === 0) {
            if (count === 212) objStart = i;
            depth++;
        } else {
            depth++;
        }
    } else if (content[i] === '}') {
        depth--;
        if (depth === 0 && count === 212) {
            objEnd = i;
            break;
        }
        if (depth === 0) count++;
    }
}

if (objStart === -1 || objEnd === -1) {
    console.log('ERROR: object not found at index 212');
    process.exit(1);
}

const objStr = content.substring(objStart, objEnd + 1);
const chunksMatch = objStr.match(/"chunks":\s*\[[^\]]*\]/);
if (!chunksMatch) {
    console.log('ERROR: chunks not found');
    process.exit(1);
}
console.log('Original:', chunksMatch[0]);

const newChunks = '"chunks": [\n          {\n            "title": "予算の執行まとめ",\n            "explain": "[[image:213-230]]"\n          }\n        ]';
const newObjStr = objStr.replace(/"chunks":\s*\[[^\]]*\]/, newChunks);

content = content.substring(0, objStart) + newObjStr + content.substring(objEnd + 1);
fs.writeFileSync(filePath, content, 'utf8');
console.log('SUCCESS: question 213 (index 212) chunks updated');

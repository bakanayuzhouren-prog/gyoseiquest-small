const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'src', 'questions.js');
let content = fs.readFileSync(filePath, 'utf8');

// 民法物権 の203番目...インデックス9（0-based）= 10番目のquestion
const markerIndex = content.indexOf('"民法物権": [');
if (markerIndex === -1) { console.log('not found'); process.exit(1); }

let pos = content.indexOf('[', markerIndex) + 1;
let depth = 0;
let count = 0;
let objStart = -1;
let objEnd = -1;
const TARGET_INDEX = 9;

for (let i = pos; i < content.length; i++) {
    if (content[i] === '{') {
        if (depth === 0) {
            if (count === TARGET_INDEX) objStart = i;
            depth++;
        } else {
            depth++;
        }
    } else if (content[i] === '}') {
        depth--;
        if (depth === 0 && count === TARGET_INDEX) {
            objEnd = i;
            break;
        }
        if (depth === 0) count++;
    }
}

if (objStart === -1 || objEnd === -1) {
    console.log('ERROR: object not found at index', TARGET_INDEX);
    process.exit(1);
}

const objStr = content.substring(objStart, objEnd + 1);
const chunksMatch = objStr.match(/"chunks":\s*\[[^\]]*\]/);
if (!chunksMatch) {
    console.log('ERROR: chunks not found');
    process.exit(1);
}
console.log('Original:', chunksMatch[0].substring(0, 80));

const newChunks = '"chunks": [\n          {\n            "title": "所有権留保と責任まとめ",\n            "explain": "[[image:10-121物権]]"\n          }\n        ]';
const newObjStr = objStr.replace(/"chunks":\s*\[[^\]]*\]/, newChunks);

content = content.substring(0, objStart) + newObjStr + content.substring(objEnd + 1);
fs.writeFileSync(filePath, content, 'utf8');
console.log('SUCCESS: 民法物権 question 10 (index 9) chunks updated');

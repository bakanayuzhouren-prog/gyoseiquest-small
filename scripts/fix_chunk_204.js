const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'src', 'questions.js');
let content = fs.readFileSync(filePath, 'utf8');

// 憲法配列内の203番目（0-indexed）の要素のchunksを更新
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
            if (count === 203) objStart = i;
            depth++;
        } else {
            depth++;
        }
    } else if (content[i] === '}') {
        depth--;
        if (depth === 0 && count === 203) {
            objEnd = i;
            break;
        }
        if (depth === 0) count++;
    }
}

if (objStart === -1 || objEnd === -1) {
    console.log('ERROR: object not found at index 203');
    process.exit(1);
}

const objStr = content.substring(objStart, objEnd + 1);
console.log('Original chunks area:');
const chunksMatch = objStr.match(/"chunks":\s*\[[^\]]*\]/);
if (!chunksMatch) {
    console.log('ERROR: chunks not found');
    process.exit(1);
}
console.log(chunksMatch[0]);

const newChunks = '"chunks": [\n          {\n            "title": "裁判官の独立・身分保障まとめ",\n            "explain": "[[image:204-230]]"\n          }\n        ]';
const newObjStr = objStr.replace(/"chunks":\s*\[[^\]]*\]/, newChunks);

content = content.substring(0, objStart) + newObjStr + content.substring(objEnd + 1);
fs.writeFileSync(filePath, content, 'utf8');
console.log('SUCCESS: question 204 (index 203) chunks updated');

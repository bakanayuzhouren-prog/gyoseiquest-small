const fs = require('fs');
const filePath = 'src/questions.js';
let content = fs.readFileSync(filePath, 'utf8');

const m = content.indexOf('"民法物権": [');
let pos = content.indexOf('[', m) + 1, depth = 0, count = 0, objStart = -1, objEnd = -1;
for (let i = pos; i < content.length; i++) {
    if (content[i] === '{') {
        if (depth === 0) { if (count === 9) objStart = i; depth++; } else depth++;
    } else if (content[i] === '}') {
        depth--;
        if (depth === 0 && count === 9) { objEnd = i; break; }
        if (depth === 0) count++;
    }
}

let objStr = content.substring(objStart, objEnd + 1);

// 1. explainに画像を先頭追加
objStr = objStr.replace(
    /"explain":\s*"((?:[^"\\]|\\.)*)"/,
    (_, existing) => `"explain": "[[image:10-121物権]]\\n\\n${existing}"`
);

// 2. chunksを空に戻す
objStr = objStr.replace(
    /"chunks":\s*\[[\s\S]*?\](?=\s*[,}])/,
    '"chunks": []'
);

content = content.substring(0, objStart) + objStr + content.substring(objEnd + 1);
fs.writeFileSync(filePath, content, 'utf8');
console.log('SUCCESS: image moved to explain, chunks cleared');

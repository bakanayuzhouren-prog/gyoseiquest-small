const fs = require('fs');
const content = fs.readFileSync('src/questions.js', 'utf8');
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
const obj = content.substring(objStart, objEnd + 1);
// Find explain
const explainMatch = obj.match(/"explain":\s*"((?:[^"\\]|\\.)*)"/);
console.log('explain:', explainMatch ? explainMatch[1].substring(0, 200) : 'NOT FOUND');
// Find chunks
const chunksMatch = obj.match(/"chunks":\s*(\[[\s\S]*?\](?=\s*[,}]))/);
console.log('chunks:', chunksMatch ? chunksMatch[1].substring(0, 200) : 'NOT FOUND');

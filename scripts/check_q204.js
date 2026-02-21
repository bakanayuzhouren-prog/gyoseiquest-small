const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'questions.js'), 'utf8');

// 憲法配列内の203番目（0-indexed）の要素を取得
const markerIndex = src.indexOf('"憲法": [');
if (markerIndex === -1) { console.log('not found'); process.exit(1); }

let pos = src.indexOf('[', markerIndex) + 1;
let depth = 0;
let count = 0;
let start = -1;

for (let i = pos; i < src.length; i++) {
    if (src[i] === '{') {
        if (depth === 0) {
            if (count === 203) start = i;
            depth++;
        } else {
            depth++;
        }
    } else if (src[i] === '}') {
        depth--;
        if (depth === 0 && count === 203) {
            const chunk = src.substring(start, i + 1);
            console.log('Q204 (index 203):');
            console.log(chunk.substring(0, 400));
            break;
        }
        if (depth === 0) count++;
    }
}

const fs = require('fs');
const src = fs.readFileSync('./src/questions.js', 'utf8');
const startIdx = src.indexOf('"民法物権": [');
if (startIdx !== -1) {
    console.log(src.substring(startIdx, startIdx + 5000));
} else {
    console.log('民法物権が見つかりませんでした');
}

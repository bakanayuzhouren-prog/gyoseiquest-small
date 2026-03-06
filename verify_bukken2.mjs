import { readFileSync } from 'fs';

const code = readFileSync('src/questions.js', 'utf8');
const startIdx = code.indexOf('"民法物権"');
if (startIdx === -1) { console.log('セクション未発見'); process.exit(1); }

// 配列の開始を探す
const arrStart = code.indexOf('[', startIdx);
let depth = 0, arrEnd = -1;
for (let i = arrStart; i < code.length; i++) {
    if (code[i] === '[') depth++;
    else if (code[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
}
const section = code.substring(arrStart, arrEnd + 1);
const qCount = (section.match(/"question"/g) || []).length;
const answerCount = (section.match(/"answer":\s*\[[^\]]+\]/g) || []).length;
const emptyAnswerCount = (section.match(/"answer":\s*\[\]/g) || []).length;

console.log('民法物権 問題数:', qCount);
console.log('正解あり:', answerCount);
console.log('正解なし（空）:', emptyAnswerCount);

// 各問題のanswer確認
const answers = section.matchAll(/"answer":\s*(\[[^\]]*\])/g);
let i = 1;
for (const m of answers) {
    console.log(`Q${i++}: answer = ${m[1]}`);
}

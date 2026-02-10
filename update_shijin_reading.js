const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const linesArr = rawContent.split(/\r?\n/);

console.log('Updating Index 63 (Jieitai Goshi) with the reading "私人（しじん）"...');

const jieitai_updated = "[[section:解説：自衛隊合祀訴訟（最大判 昭63.6.1）]]\\n[[character:boss]]\\n「信仰とは違う宗教儀式をされた不快感」が、[[bold:私人（しじん）]]間の法的侵害になるか争われた判決だよ。\\n\\n[[character:midBoss]]\\n[[bold:1. 結論：合憲（適法）]]\\n・[[bold:理由]]: 他人が自分と違う宗教儀式を行っても、それが信仰を直接妨げない限り、ある程度は「受忍（我慢）」すべきである。\\n・[[bold:静謐な環境]]: 「静謐な宗教的環境で過ごす権利」は、法的保護に値する権利とは認められませんでした。\\n\\n[[point:不快感はあっても「法的権利侵害」ではない、という厳しい判断を覚えよう！]]";

let subjectStartLine = -1;
for (let i = 0; i < linesArr.length; i++) {
    if (linesArr[i].includes('"憲法": {') || linesArr[i].includes("'憲法': {")) {
        subjectStartLine = i;
        break;
    }
}

let arrayStartLine = -1;
for (let i = subjectStartLine; i < linesArr.length; i++) {
    if (linesArr[i].includes('"憲法": [') || linesArr[i].includes("'憲法': [")) {
        arrayStartLine = i;
        break;
    }
}

let questionCount = 0;
let depth = 0;
let updated = false;

for (let i = arrayStartLine + 1; i < linesArr.length; i++) {
    const line = linesArr[i].trim();

    if (line.includes('{')) {
        if (depth === 0) {
            if (questionCount === 63) {
                for (let j = i; j < linesArr.length; j++) {
                    if (linesArr[j].includes('"explain":') || linesArr[j].includes("'explain':")) {
                        console.log(`Updating accurately Index 63 at Line ${j + 1}...`);
                        linesArr[j] = `        "explain": "${jieitai_updated}",`;
                        updated = true;
                        break;
                    }
                    if (linesArr[j].trim().startsWith('}') && linesArr[j].includes(',')) break;
                }
            }
            questionCount++;
        }
        depth += (line.match(/{/g) || []).length;
    }

    if (line.includes('}')) {
        depth -= (line.match(/}/g) || []).length;
    }

    if (updated || (questionCount > 64 && depth < 0)) break;
}

if (updated) {
    fs.writeFileSync(filePath, linesArr.join('\n'), 'utf8');
    console.log('Updated Index 63 successfully!');
} else {
    console.log('Failed to find Index 63.');
}

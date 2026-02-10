const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');

// Find start of Constitution
let subjectStartLine = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"憲法": {') || lines[i].includes("'憲法': {")) {
        subjectStartLine = i;
        break;
    }
}

if (subjectStartLine === -1) {
    console.error('憲法 section not found');
    process.exit(1);
}

// Find the start of the questions array within Constitution
let arrayStartLine = -1;
for (let i = subjectStartLine; i < lines.length; i++) {
    if (lines[i].includes('"憲法": [') || lines[i].includes("'憲法': [")) {
        arrayStartLine = i;
        break;
    }
}

if (arrayStartLine === -1) {
    console.error('憲法 array not found');
    process.exit(1);
}

// Find the 4th question (index 3)
let questionCount = 0;
let targetQuestionStart = -1;
for (let i = arrayStartLine + 1; i < lines.length; i++) {
    if (lines[i].trim() === '{') {
        if (questionCount === 3) {
            targetQuestionStart = i;
            break;
        }
        questionCount++;
    }
}

if (targetQuestionStart === -1) {
    console.error('Question index 3 not found');
    process.exit(1);
}

// Find the explain field for that question
let explainLine = -1;
for (let i = targetQuestionStart; i < lines.length; i++) {
    if (lines[i].includes('"explain":') || lines[i].includes("'explain':")) {
        explainLine = i;
        break;
    }
    // Safety break if we reach next question
    if (lines[i].trim() === '},' || lines[i].trim() === '}') break;
}

if (explainLine === -1) {
    console.error('Explain field not found in question 3');
    process.exit(1);
}

console.log(`Found it! Line ${explainLine + 1}: ${lines[explainLine].trim()}`);

const newExplain = '        "explain": "[[section:憲法と条約の優越関係 Q&A]]\\n[[character:boss]]\\n[[bold:Q1. 憲法と条約、どちらが法的に上位ですか？]]\\n[[character:midBoss]]\\n[[red:A. 憲法です（憲法優位説）。]]\\n日本の判例（砂川事件）は、憲法が条約に対して優越する立場を前提としていると解釈されています。\\n\\n[[character:boss]]\\n[[bold:Q2. なぜ条約より憲法が優先されるのですか？]]\\n[[character:midBoss]]\\n[[red:A. 日本が「硬性憲法」を採用しているからです。]]\\nもし条約が優先されると、政府が外国と約束するだけで、厳しい改正手続き（96条）を経ずに実質的に憲法の内容を変えられてしまうため、これを防ぐ必要があります。\\n\\n[[character:boss]]\\n[[bold:Q3. 裁判所は条約が違憲かどうかを審査しますか？]]\\n[[character:midBoss]]\\n[[red:A. 原則として審査しません（統治行為論）。]]\\n安保条約のような「高度の政治性」を持つものは、司法審査になじまないとして判断を避けます。\\n\\n[[character:boss]]\\n[[bold:Q4. 審査される例外はありますか？]]\\n[[character:midBoss]]\\n[[red:A. 「一見してきわめて明白に違憲無効」な場合のみ審査の対象になります。]]\\n砂川事件の判決では、この例外を認めているため、「条約よりも憲法が上」という立場（憲法優位説）を前提にしていると言えます。\\n\\n[[point:砂川事件の核心は、「一見して明白」でない限り政治の判断を尊重する（統治行為論）という点にあります！」,';

lines[explainLine] = newExplain;

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Update complete!');

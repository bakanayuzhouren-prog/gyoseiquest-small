const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);

let subjectStartLine = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"憲法": {') || lines[i].includes("'憲法': {")) {
        subjectStartLine = i;
        break;
    }
}

let arrayStartLine = -1;
for (let i = subjectStartLine; i < lines.length; i++) {
    if (lines[i].includes('"憲法": [') || lines[i].includes("'憲法': [")) {
        arrayStartLine = i;
        break;
    }
}

let questionCount = 0;
let output = [];
for (let i = arrayStartLine + 1; i < lines.length; i++) {
    if (lines[i].trim() === '{') {
        if (questionCount >= 60 && questionCount <= 74) {
            let info = { index: questionCount, line: i + 1, text: "" };
            for (let j = i; j < lines.length; j++) {
                if (lines[j].includes('"text":')) {
                    info.text = lines[j].trim().substring(0, 80);
                    break;
                }
            }
            output.push(info);
        }
        questionCount++;
    }
    if (questionCount > 75) break;
}
console.log(JSON.stringify(output, null, 2));

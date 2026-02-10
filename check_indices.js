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
for (let i = arrayStartLine + 1; i < lines.length; i++) {
    if (lines[i].trim() === '{') {
        if (questionCount >= 60 && questionCount <= 75) {
            console.log(`--- Index ${questionCount} ---`);
            for (let j = i; j < lines.length; j++) {
                if (lines[j].includes('"text":')) {
                    console.log(lines[j].trim());
                    break;
                }
            }
        }
        questionCount++;
    }
    if (questionCount > 76) break;
}

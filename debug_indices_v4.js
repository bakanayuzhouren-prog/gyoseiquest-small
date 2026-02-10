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
        if (questionCount >= 54 && questionCount <= 65) {
            let row = `Index ${questionCount} (Line ${i + 1}): `;
            for (let j = i; j < lines.length; j++) {
                if (lines[j].includes('"text":')) {
                    row += lines[j].trim();
                    break;
                }
            }
            output.push(row);
        }
        questionCount++;
    }
    if (questionCount > 66) break;
}
console.log(output.join('\n'));

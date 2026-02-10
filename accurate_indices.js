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
let depth = 0;
let output = [];

for (let i = arrayStartLine + 1; i < lines.length; i++) {
    const line = lines[i].trim();

    // Count opening and closing braces to track depth relative to the array start
    if (line.includes('{')) {
        if (depth === 0) {
            // This is a top-level question object
            if (questionCount >= 60 && questionCount <= 69) {
                let text = "";
                for (let j = i; j < lines.length; j++) {
                    if (lines[j].includes('"text":')) {
                        text = lines[j].trim().substring(0, 100);
                        break;
                    }
                }
                output.push({ index: questionCount, line: i + 1, text: text });
            }
            questionCount++;
        }
        depth += (line.match(/{/g) || []).length;
    }

    if (line.includes('}')) {
        depth -= (line.match(/}/g) || []).length;
    }

    if (questionCount > 70 && depth < 0) break; // Exited the array
}

console.log(JSON.stringify(output, null, 2));

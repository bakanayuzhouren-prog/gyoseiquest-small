const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');

function scanEveryObject() {
    console.log("Scanning every object in Constitution section...");
    const content = fs.readFileSync(QUEST_PATH, 'utf-8');
    const lines = content.split('\n');

    let kenStart = -1;
    let kenEnd = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"憲法": [')) {
            kenStart = i;
            break;
        }
    }
    for (let i = kenStart + 1; i < lines.length; i++) {
        if (lines[i].includes('"行政法": [')) {
            kenEnd = i - 1;
            break;
        }
    }

    let topoObjects = [];
    for (let i = kenStart + 1; i <= kenEnd; i++) {
        const line = lines[i];
        const lineTrim = line.trim();
        if (lineTrim === '{') {
            const indent = line.search(/\S/);
            // Check if this object contains a "text" field
            let isQuestion = false;
            let j = i + 1;
            while(j < lines.length && j < i + 10) { // Look ahead a bit
                if (lines[j].includes('"text":')) {
                    isQuestion = true;
                    break;
                }
                if (lines[j].trim() === '}' || lines[j].trim() === '},') break;
                j++;
            }
            
            topoObjects.push({
                line: i + 1,
                indent: indent,
                isQuestion: isQuestion,
                textSnippet: isQuestion ? lines[j].trim().substring(0, 50) : "N/A"
            });
        }
    }

    console.log(`Phys# | Line | Indent | isQ | Snippet`);
    console.log(`------|------|--------|-----|---------`);
    topoObjects.slice(0, 30).forEach((obj, i) => {
        console.log(`${(i+1).toString().padEnd(5)} | ${obj.line.toString().padEnd(4)} | ${obj.indent.toString().padEnd(6)} | ${obj.isQuestion.toString().padEnd(3)} | ${obj.textSnippet}`);
    });
}

scanEveryObject();

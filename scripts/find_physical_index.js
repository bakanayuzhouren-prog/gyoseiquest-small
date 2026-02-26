const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');

function findPhysicalIndex() {
    console.log("Finding physical index of '教育を受ける権利' in questions.js...");
    const content = fs.readFileSync(QUEST_PATH, 'utf-8');
    const lines = content.split('\n');

    let kenStart = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"憲法": [')) {
            kenStart = i;
            break;
        }
    }

    let count = 0;
    for (let i = kenStart + 1; i < lines.length; i++) {
        if (lines[i].trim() === '{' && lines[i].indexOf('{') === 6) {
            const index = count++;
            let text = "";
            for (let j = i + 1; j < i + 50 && j < lines.length; j++) {
                if (lines[j].includes('"text":')) {
                    text = lines[j].trim();
                    break;
                }
            }
            if (text.includes('教育を受ける権利')) {
                console.log(`FOUND: Index ${index} (Line ${i+1})`);
            }
        }
        if (lines[i].includes('"行政法": [')) break;
    }
}

findPhysicalIndex();

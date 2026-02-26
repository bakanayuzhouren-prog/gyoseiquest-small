const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');

function findSection() {
    const content = fs.readFileSync(QUEST_PATH, 'utf-8');
    const lines = content.split('\n');

    console.log("Searching for Constitution section in questions.js...");

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"憲法": [')) {
            console.log(`Found "憲法": [ at line ${i + 1}`);
            // Show first few questions for verification
            for (let j = 1; j <= 50; j++) {
                if (lines[i + j].includes('"text":')) {
                    console.log(`L${i + j + 1}: ${lines[i + j].trim()}`);
                }
                if (lines[i + j].includes('"explain":')) {
                    console.log(`L${i + j + 1}: ${lines[i + j].trim()}`);
                }
            }
            break;
        }
    }
}

findSection();

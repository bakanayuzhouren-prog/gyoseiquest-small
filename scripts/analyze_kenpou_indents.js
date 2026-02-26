const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');

function analyzeKenpouIndents() {
    console.log("Analyzing indent distribution for '{' in Constitution...");
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

    const indentCounts = {};

    for (let i = kenStart + 1; i <= kenEnd; i++) {
        const line = lines[i];
        if (line.trim() === '{') {
            const indent = line.search(/\S/);
            indentCounts[indent] = (indentCounts[indent] || 0) + 1;
            
            if (indent === 6 && indentCounts[indent] % 100 === 0) {
                console.log(`L${i+1}: Found 6-space indent { (Count: ${indentCounts[indent]})`);
            }
            if (indent !== 6 && indent !== 10) {
                 // console.log(`L${i+1}: Found unusual indent: ${indent} spaces`);
            }
        }
    }

    console.log("\nIndent | Count");
    console.log("-------|-------");
    Object.keys(indentCounts).sort((a,b)=>a-b).forEach(indent => {
        console.log(`${indent.toString().padEnd(6)} | ${indentCounts[indent]}`);
    });
}

analyzeKenpouIndents();

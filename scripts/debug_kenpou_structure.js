const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');

function debugKenpouStructure() {
    console.log("Analyzing Constitution section structure...");
    const content = fs.readFileSync(QUEST_PATH, 'utf-8');
    const lines = content.split('\n');

    let kenStart = -1;
    let kenEnd = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('"憲法": [')) {
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

    if (kenStart === -1) return;

    let questionCount = 0;
    let inQuestion = false;
    let currentQuestionLines = [];

    console.log(`Scanning lines ${kenStart + 1} to ${kenEnd + 1}...`);

    for (let i = kenStart; i <= kenEnd; i++) {
        const line = lines[i].trim();
        if (line === '{') {
            inQuestion = true;
            questionCount++;
        }
        if (inQuestion) {
            if (line.includes('"text":')) {
                console.log(`Q${questionCount} (Line ${i+1}): ${line.substring(0, 50)}...`);
            }
            if (line.includes('"explain":')) {
                console.log(`   Explain found at L${i+1}: ${line.substring(0, 50)}...`);
            }
        }
        if (line === '},' || line === '}') {
            inQuestion = false;
        }
        
        if (questionCount > 10) break; // Check first 10
    }
}

debugKenpouStructure();

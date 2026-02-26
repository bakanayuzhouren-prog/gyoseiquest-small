const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');

function verifyKenpouIndices() {
    console.log("Verifying Constitution question indices and image tags...");
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

    let questionIndex = 0;
    let inQuestion = false;

    console.log(`Index | Line | Image Tag`);
    console.log(`------|------|----------`);

    for (let i = kenStart + 1; i <= kenEnd; i++) {
        const line = lines[i];
        const lineTrim = line.trim();

        // Count top-level { (indented by 6 spaces)
        if (lineTrim === '{' && line.indexOf('{') === 6) {
            inQuestion = true;
            const currentIdx = questionIndex++;
            
            // Look for image tag in this question scope
            let j = i;
            let tagFound = "None";
            while (j <= kenEnd) {
                if (lines[j].includes('"explain":')) {
                    const match = lines[j].match(/\[\[image:[^\]]+\]\]/);
                    if (match) tagFound = match[0];
                    break;
                }
                if (lines[j].trim() === '},' && lines[j].indexOf('}') === 6) break;
                j++;
            }
            
            if (currentIdx < 10) {
                console.log(`${currentIdx.toString().padEnd(5)} | ${(i+1).toString().padEnd(4)} | ${tagFound}`);
            }
        }
    }
}

verifyKenpouIndices();

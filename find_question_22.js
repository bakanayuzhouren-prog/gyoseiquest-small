
const fs = require('fs');
const path = 'src/questions.js';

try {
    const data = fs.readFileSync(path, 'utf8');
    // Simple parsing by matching objects might be fragile if there are nested objects, 
    // but questions usually follow a standard format.
    // We'll look for "text": in the "民法総論" section.

    const minpoIndex = data.indexOf('"民法":');
    const souronIndex = data.indexOf('"民法総論":', minpoIndex);

    if (minpoIndex === -1 || souronIndex === -1) {
        console.log('Could not find 民法総論');
        return;
    }

    let currentIndex = souronIndex;
    let questionCount = 0;

    // Look for "text": which indicates a new question
    const textMatches = [];
    const lines = data.split('\n');

    let inSouron = false;
    let souronLineStart = -1;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"民法総論":')) {
            inSouron = true;
            souronLineStart = i;
        }

        if (inSouron) {
            // Stop if we hit the next section (heuristic: indentation or specific keys)
            // But for now let's just count "text":
            if (lines[i].includes('"text":')) {
                questionCount++;
                if (questionCount === 22) {
                    console.log(`Found Question 22 at line ${i + 1}`);
                    console.log(lines[i]);
                    // Print context to verify
                    for (let j = 0; j < 15; j++) {
                        console.log(lines[i + j]);
                    }
                    break;
                }
            }
            // if we see the end of the array, stop.
            // brute force for now.
        }
    }

} catch (err) {
    console.error(err);
}

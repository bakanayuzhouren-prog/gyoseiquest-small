
const fs = require('fs');
const path = 'src/questions.js';

try {
    const data = fs.readFileSync(path, 'utf8');
    const souronIndex = data.indexOf('"民法総論":');

    if (souronIndex === -1) {
        console.log('Could not find 民法総論');
        return;
    }

    let questionCount = 0;
    const lines = data.split('\n');
    let inSouron = false;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"民法総論":')) {
            inSouron = true;
        }

        if (inSouron) {
            if (lines[i].trim().startsWith('"text":')) {
                questionCount++;
                if (questionCount === 22) {
                    console.log(`LINE:${i + 1}`);
                    console.log(`TEXT:${lines[i]}`);
                    break;
                }
            }
            if (lines[i].trim() === '],') { // End of array heuristic
                // check if it closes 民法総論. 
                // Usually it's indented. 
            }
        }
    }

} catch (err) {
    console.error(err);
}

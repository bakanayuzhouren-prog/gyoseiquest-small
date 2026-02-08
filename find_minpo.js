
const fs = require('fs');
const path = 'src/questions.js';

try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"民法":')) {
            console.log(`Found "民法": at line ${i + 1}`);
            console.log(lines[i]);
        }
    }
} catch (err) {
    console.error(err);
}

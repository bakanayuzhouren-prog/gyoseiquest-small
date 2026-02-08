const fs = require('fs');
const content = fs.readFileSync('src/questions.js', 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
    if (line.includes('"民法":')) {
        console.log(`Found "民法": at line ${index + 1}`);
    }
    if (line.includes('後見監督人')) {
        console.log(`Found "後見監督人" at line ${index + 1}: ${line.trim().slice(0, 50)}...`);
    }
});

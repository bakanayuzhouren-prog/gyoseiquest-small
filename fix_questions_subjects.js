const fs = require('fs');
const content = fs.readFileSync('src/questions.js', 'utf8');
const lines = content.split('\n');
// We know the lines are roughly around 5900-6000
for (let i = 5910; i < 6000; i++) {
    if (lines[i]) {
        lines[i] = lines[i].replace('"subject": "民法"', '"subject": "民法総論"');
    }
}
fs.writeFileSync('src/questions.js', lines.join('\n'));
console.log('Fixed subjects in src/questions.js');

const fs = require('fs');
const path = 'c:/dev/gyosei-quest-small/src/questions.js';
let content = fs.readFileSync(path, 'utf8');

const typo = '代理権의錯誤';
const fix = '代理権の錯誤';

if (content.includes(typo)) {
    content = content.replace(new RegExp(typo, 'g'), fix);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Fixed typo in questions.js');
} else {
    console.log('Typo not found.');
}

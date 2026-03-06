const fs = require('fs');
const content = fs.readFileSync('c:/dev/gyosei-quest-small/src/questions.js', 'utf8');

const keyword = '"民法物権":';
const index = content.indexOf(keyword);

if (index === -1) {
    console.log('Keyword "民法物権": not found');
} else {
    console.log('--- 民法物権 Section Start ---');
    console.log(content.substring(index, index + 3000));
}

const subjectsIndex = content.indexOf('const SUBJECTS = {');
if (subjectsIndex !== -1) {
    console.log('--- SUBJECTS Definition Start ---');
    console.log(content.substring(subjectsIndex, subjectsIndex + 1000));
}

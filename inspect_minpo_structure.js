const fs = require('fs');
const content = fs.readFileSync('c:/dev/gyosei-quest-small/src/questions.js', 'utf8');

function findAndShow(keyword, len = 2000) {
    const index = content.indexOf(keyword);
    if (index === -1) {
        console.log(`Keyword "${keyword}" not found`);
        return;
    }
    console.log(`--- Context for "${keyword}" ---`);
    console.log(content.substring(index - 100, index + len));
}

findAndShow('"民法":');
findAndShow('"民法債権":');
findAndShow('"民法物権":');

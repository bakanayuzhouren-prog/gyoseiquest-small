const fs = require('fs');
const filePath = 'c:/dev/gyosei-quest-small/src/questions.js.bak';
const content = fs.readFileSync(filePath, 'utf8');

function findAndShow(keyword, len = 2000) {
    const index = content.indexOf(keyword);
    if (index === -1) {
        console.log(`Keyword "${keyword}" not found`);
        return;
    }
    console.log(`--- Context for "${keyword}" ---`);
    console.log(content.substring(index - 100, index + len));
}

console.log(`File Size: ${content.length} characters`);
findAndShow('"民法":');
findAndShow('"民法物権":');
findAndShow('"民法債権":');

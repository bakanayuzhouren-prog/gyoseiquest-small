const fs = require('fs');
const content = fs.readFileSync('c:/dev/gyosei-quest-small/src/questions_20231221_0787', 'utf8');

function findAndShow(keyword, contextBefore = 50, contextAfter = 1000) {
    const index = content.indexOf(keyword);
    if (index === -1) {
        console.log(`Keyword "${keyword}" not found`);
        return;
    }
    console.log(`--- Context for "${keyword}" ---`);
    console.log(content.substring(index - contextBefore, index + contextAfter));
}

findAndShow('"民法物権":');
findAndShow('"民法債権":', 200, 200);
console.log('Total characters:', content.length);

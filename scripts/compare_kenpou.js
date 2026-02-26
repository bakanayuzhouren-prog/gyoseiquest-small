const fs = require('fs');

function getKenpouObjects(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const startMarker = '"憲法": [';
    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) return [];

    let braceCount = 0;
    let arrayStartIndex = startIndex + startMarker.length - 1;
    let arrayEndIndex = -1;
    let openBrackets = 0;

    for (let i = arrayStartIndex; i < content.length; i++) {
        if (content[i] === '[') openBrackets++;
        if (content[i] === ']') {
            openBrackets--;
            if (openBrackets === 0) {
                arrayEndIndex = i;
                break;
            }
        }
    }

    const section = content.substring(arrayStartIndex + 1, arrayEndIndex);
    const objects = [];
    let current = '';
    let depth = 0;
    for (let i = 0; i < section.length; i++) {
        const char = section[i];
        if (char === '{') {
            if (depth === 0) current = '';
            depth++;
        }
        current += char;
        if (char === '}') {
            depth--;
            if (depth === 0) {
                objects.push(current);
                current = '';
            }
        }
    }
    return objects;
}

const currentObj = getKenpouObjects('src/questions.js');
const backupObj = getKenpouObjects('src/questions.js.backup');

console.log(`Current Count: ${currentObj.length}`);
console.log(`Backup Count : ${backupObj.length}`);

for (let i = 0; i < 5; i++) {
    console.log(`--- Index ${i} ---`);
    const cText = (currentObj[i].match(/"text":\s*"([^"]+)"/) || [null, "N/A"])[1];
    const bText = (backupObj[i].match(/"text":\s*"([^"]+)"/) || [null, "N/A"])[1];
    console.log(`  Current: ${cText.substring(0, 50)}`);
    console.log(`  Backup : ${bText.substring(0, 50)}`);
}

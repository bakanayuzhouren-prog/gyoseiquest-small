import fs from 'fs';

function extractArray(filePath, keyName) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const regex = new RegExp(`"${keyName}":\\s*\\[`, 'g');
    const match = regex.exec(content);
    if (!match) {
        console.log(`Key ${keyName} not found in ${filePath}`);
        return null;
    }
    let bracketCount = 0;
    let start = match.index + match[0].length - 1;
    for (let i = start; i < content.length; i++) {
        if (content[i] === '[') bracketCount++;
        else if (content[i] === ']') {
            bracketCount--;
            if (bracketCount === 0) {
                try {
                    return eval(`(${content.substring(start, i + 1)})`);
                } catch (e) {
                    console.log(`Eval error for ${keyName}: ${e.message}`);
                    return null;
                }
            }
        }
    }
    return null;
}

const key = "行政法総論";
const bak = extractArray('src/questions.js.bak', key);
const backup = extractArray('src/questions.js.backup', key);

console.log(`BAK length: ${bak ? bak.length : 'null'}`);
console.log(`BACKUP length: ${backup ? backup.length : 'null'}`);

if (bak && backup) {
    bak.forEach((q, i) => {
        const match = backup.find(bq => bq.text.includes(q.text.substring(0, 20)));
        console.log(`Q${i} match: ${match ? 'YES' : 'NO'} (Text: ${q.text.substring(0, 30)}...)`);
    });
}

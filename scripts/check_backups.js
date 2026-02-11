const fs = require('fs');
const path = require('path');

const srcDir = './src';
const backups = fs.readdirSync(srcDir).filter(f => f.startsWith('questions.js'));

console.log(`Scanning ${backups.length} files in ${srcDir}...`);

backups.forEach(f => {
    const p = path.join(srcDir, f);
    try {
        const stats = fs.statSync(p);
        if (stats.isDirectory()) return;

        const content = fs.readFileSync(p, 'utf8');
        const kempouIndex = content.indexOf('"憲法":');
        if (kempouIndex !== -1) {
            const arrayStartIndex = content.indexOf('[', kempouIndex);
            if (arrayStartIndex !== -1) {
                let bracketCount = 0;
                let arrayEndIndex = -1;
                for (let i = arrayStartIndex; i < content.length; i++) {
                    if (content[i] === '[') bracketCount++;
                    else if (content[i] === ']') {
                        bracketCount--;
                        if (bracketCount === 0) {
                            arrayEndIndex = i;
                            break;
                        }
                    }
                }

                if (arrayEndIndex !== -1) {
                    const arrayStr = content.substring(arrayStartIndex, arrayEndIndex + 1);
                    const count = (arrayStr.match(/\{\s*\"text\"/g) || []).length;
                    console.log(`${f.padEnd(40)} | Count: ${count.toString().padStart(4)} | Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

                    if (count === 233 || count === 231) {
                        console.log(`>>> POTENTIAL MASTER FOUND: ${f}`);
                    }
                } else {
                    console.log(`${f.padEnd(40)} | Error: Could not find array end`);
                }
            } else {
                console.log(`${f.padEnd(40)} | Error: Could not find array start`);
            }
        } else {
            console.log(`${f.padEnd(40)} | No "憲法" block found`);
        }
    } catch (e) {
        console.log(`${f.padEnd(40)} | Error: ${e.message}`);
    }
});

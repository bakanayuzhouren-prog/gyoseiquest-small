const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');

function detailedScan() {
    console.log("Detailed scan of first 1000 lines of Constitution section...");
    const content = fs.readFileSync(QUEST_PATH, 'utf-8');
    const lines = content.split('\n');

    let kenStart = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"憲法": [')) {
            kenStart = i;
            break;
        }
    }

    let count = 0;
    for (let i = kenStart + 1; i < kenStart + 1000 && i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === '{') {
            const indent = line.search(/\S/);
            count++;
            let text = "NO TEXT FIELD";
            let img = "NO IMAGE TAG";
            for (let j = i + 1; j < i + 20 && j < lines.length; j++) {
                if (lines[j].includes('"text":')) {
                    text = lines[j].trim();
                }
                if (lines[j].includes('"explain":')) {
                    const m = lines[j].match(/\[\[image:([^\]]+)\]\]/);
                    if (m) img = m[1];
                }
                if (lines[j].trim() === '}' || lines[j].trim() === '},') break;
            }
            console.log(`Obj #${count} | L${i+1} | Indent: ${indent} | Img: ${img.padEnd(8)} | Text: ${text.substring(0, 80)}`);
        }
    }
}

detailedScan();

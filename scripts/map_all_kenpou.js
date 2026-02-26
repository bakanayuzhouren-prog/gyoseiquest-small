const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');

function mapAllKenpou() {
    console.log("Mapping ALL Constitution questions from questions.js...");
    const content = fs.readFileSync(QUEST_PATH, 'utf-8');
    const lines = content.split('\n');

    let kenStart = -1;
    let kenEnd = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"憲法": [')) {
            kenStart = i;
            break;
        }
    }
    for (let i = kenStart + 1; i < lines.length; i++) {
        if (lines[i].includes('"行政法": [')) {
            kenEnd = i - 1;
            break;
        }
    }

    let questions = [];
    let count = 0;
    for (let i = kenStart + 1; i <= kenEnd; i++) {
        const line = lines[i];
        if (line.trim() === '{' && line.indexOf('{') === 6) {
            let qText = "None";
            let qImg = "None";
            let j = i;
            while (j <= kenEnd && lines[j].trim() !== '},' && lines[j].trim() !== '}') {
                if (lines[j].includes('"text":')) {
                    qText = lines[j].trim().substring(0, 50);
                }
                if (lines[j].includes('"explain":')) {
                    const m = lines[j].match(/\[\[image:([^\]]+)\]\]/);
                    if (m) qImg = m[1];
                }
                j++;
            }
            questions.push({
                idx: count++,
                line: i + 1,
                text: qText,
                img: qImg
            });
        }
    }

    console.log(`Index | Line | Image | Text Snippet`);
    console.log(`------|------|-------|--------------`);
    questions.slice(0, 20).forEach(q => {
        console.log(`${q.idx.toString().padEnd(5)} | ${q.line.toString().padEnd(4)} | ${q.img.toString().padEnd(7)} | ${q.text}`);
    });
}

mapAllKenpou();

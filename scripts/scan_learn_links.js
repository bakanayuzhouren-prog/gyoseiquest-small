const fs = require('fs');
const path = require('path');

const LEARN_PATH = path.join(__dirname, '../src/learn.js');

function scanLearnLinks() {
    console.log("Scanning LINK sequence in learn.js for Constitution...");
    const content = fs.readFileSync(LEARN_PATH, 'utf-8');
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
        if (lines[i].trim() === '],') {
            kenEnd = i;
            break;
        }
    }

    let links = [];
    for (let i = kenStart + 1; i < kenEnd; i++) {
        const line = lines[i];
        const m = line.match(/\[\[LINK:(\d+)\]\]/g);
        if (m) {
            m.forEach(match => {
                const id = parseInt(match.match(/\d+/)[0]);
                links.push({
                    line: i + 1,
                    id: id
                });
            });
        }
    }

    console.log(`Found ${links.length} links in Constitution.`);
    let violations = 0;
    for (let i = 0; i < Math.min(50, links.length); i++) {
        console.log(`Pos ${i+1} | Line ${links[i].line} | LINK:${links[i].id}`);
        if (i > 0 && links[i].id !== links[i-1].id + 1) {
            console.log(`  >>> DISCONTINUITY detected! Expected ${links[i-1].id + 1}, got ${links[i].id}`);
            violations++;
        }
    }
}

scanLearnLinks();

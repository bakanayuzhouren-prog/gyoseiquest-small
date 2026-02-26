const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');

function fixWithRegex() {
    console.log("Reading questions.js...");
    const content = fs.readFileSync(QUEST_PATH, 'utf-8');
    const lines = content.split('\n');

    const sections = [
        { name: '憲法', start: -1, end: -1 },
        { name: '民法物権', start: -1, end: -1 }
    ];

    // Identify section boundaries
    console.log("Identifying section boundaries...");
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"憲法": [')) sections[0].start = i;
        if (sections[0].start !== -1 && sections[0].end === -1 && lines[i].trim() === '],') {
            // Find the correct end by matching structure
            // Simplified: just find the next subject or large gap
            if (lines[i + 1] && lines[i + 1].includes('"行政法')) sections[0].end = i;
        }
        if (lines[i].includes('"民法物権": [')) sections[1].start = i;
        if (sections[1].start !== -1 && sections[1].end === -1 && lines[i].trim() === '],') {
            if (lines[i + 1] && lines[i + 1].includes('"民法債権')) sections[1].end = i;
        }
    }

    // Fallback if end not detected precisely
    if (sections[0].end === -1) sections[0].end = lines.length;
    if (sections[1].end === -1) sections[1].end = lines.length;

    let totalFixed = 0;

    sections.forEach(sec => {
        if (sec.start === -1) return;
        console.log(`Processing section ${sec.name} from line ${sec.start}`);

        // Find all explain lines and their image tags
        let explains = []; // { lineIdx, tag }
        for (let i = sec.start; i < sec.end; i++) {
            if (lines[i].includes('"explain":')) {
                const match = lines[i].match(/\[\[image:[^\]]+\]\]/);
                explains.push({
                    idx: i,
                    text: lines[i],
                    tag: match ? match[0] : null
                });
            }
        }

        // Shift tags: tag from explains[k] moves to explains[k-1]
        for (let k = 1; k < explains.length; k++) {
            if (explains[k].tag) {
                const tag = explains[k].tag;
                const prev = explains[k - 1];
                const current = explains[k];

                // Remove from current
                lines[current.idx] = lines[current.idx].replace(tag, "").replace(/\\n\\n$/, "").trimEnd();
                if (lines[current.idx].endsWith(',')) lines[current.idx] = lines[current.idx].slice(0, -1).trimEnd() + ',';
                else lines[current.idx] = lines[current.idx] + ',';

                // Add to previous
                // Check if prev already has image (safety)
                if (!lines[prev.idx].includes('[[image:')) {
                    const quoteIdx = lines[prev.idx].indexOf('"');
                    const secondQuoteIdx = lines[prev.idx].indexOf('"', quoteIdx + 1);
                    const explainStartIdx = lines[prev.idx].indexOf(':', secondQuoteIdx) + 1;
                    const firstCharIdx = lines[prev.idx].indexOf('"', explainStartIdx) + 1;

                    lines[prev.idx] = lines[prev.idx].slice(0, firstCharIdx) + tag + "\\n\\n" + lines[prev.idx].slice(firstCharIdx);
                    totalFixed++;
                    console.log(`  Moved ${tag} to line ${prev.idx + 1}`);
                }
            }
        }
    });

    if (totalFixed > 0) {
        fs.writeFileSync(QUEST_PATH, lines.join('\n'));
        console.log(`\nSuccessfully shifted ${totalFixed} tags using regex.`);
    } else {
        console.log("\nNo changes made.");
    }
}

fixWithRegex();

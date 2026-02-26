const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');

function fixTrueConstitutionSection() {
    console.log("Reading questions.js...");
    const content = fs.readFileSync(QUEST_PATH, 'utf-8');
    const lines = content.split('\n');

    let kenStart = -1;
    let kenEnd = -1;

    // Find the TRUE start of Constitution subject
    for (let i = 0; i < lines.length; i++) {
        // Look for the exact property name at start of line
        if (lines[i].trim().startsWith('"憲法": [')) {
            // Further verification: line 188 was our previous finding
            kenStart = i;
            console.log(`True Constitution start found at line ${i + 1}`);
            break;
        }
    }

    if (kenStart === -1) {
        console.error("Could not find true Constitution section.");
        return;
    }

    // Find the end: look for the closing ] for this section
    for (let i = kenStart + 1; i < lines.length; i++) {
        if (lines[i].trim() === '],') {
            kenEnd = i;
            console.log(`Constitution end found at line ${i + 1}`);
            break;
        }
    }

    // Process shifting
    let explains = [];
    for (let i = kenStart; i <= kenEnd; i++) {
        if (lines[i].includes('"explain":')) {
            const match = lines[i].match(/\[\[image:[^\]]+\]\]/);
            explains.push({
                idx: i,
                text: lines[i],
                tag: match ? match[0] : null
            });
        }
    }

    let totalFixed = 0;
    for (let k = 1; k < explains.length; k++) {
        if (explains[k].tag) {
            const tag = explains[k].tag;
            const prev = explains[k - 1];
            const current = explains[k];

            // Remove from current
            lines[current.idx] = lines[current.idx].replace(tag, "").replace(/\\n\\n$/, "").trimEnd();
            if (!lines[current.idx].endsWith(',')) lines[current.idx] += ',';

            // Add to previous if not present
            if (!lines[prev.idx].includes('[[image:')) {
                const firstQuoteIdx = lines[prev.idx].indexOf('"');
                const secondQuoteIdx = lines[prev.idx].indexOf('"', firstQuoteIdx + 1);
                const explainStartIdx = lines[prev.idx].indexOf(':', secondQuoteIdx) + 1;
                const firstCharIdx = lines[prev.idx].indexOf('"', explainStartIdx) + 1;

                lines[prev.idx] = lines[prev.idx].slice(0, firstCharIdx) + tag + "\\n\\n" + lines[prev.idx].slice(firstCharIdx);
                totalFixed++;
                console.log(`  Moved ${tag} to line ${prev.idx + 1}`);
            }
        }
    }

    if (totalFixed > 0) {
        fs.writeFileSync(QUEST_PATH, lines.join('\n'));
        console.log(`\nSuccessfully shifted ${totalFixed} tags for Constitution.`);
    } else {
        console.log("\nNo changes made for Constitution.");
    }
}

fixTrueConstitutionSection();

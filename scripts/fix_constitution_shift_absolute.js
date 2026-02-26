const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');

function fixAbsolutely() {
    console.log("Reading questions.js...");
    const content = fs.readFileSync(QUEST_PATH, 'utf-8');
    const lines = content.split('\n');

    let kenStart = -1;
    let kenEnd = -1;

    // Line 188 is where we saw "憲法": [
    // Let's search a bit around there more reliably
    for (let i = 180; i < 200; i++) {
        if (lines[i] && lines[i].includes('"憲法": [')) {
            kenStart = i;
            console.log(`Constitution start confirmed at line ${i + 1}`);
            break;
        }
    }

    if (kenStart === -1) {
        // Fallback to full search if not near 188
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('"憲法": [')) {
                kenStart = i;
                console.log(`Constitution start found via full search at line ${i + 1}`);
                break;
            }
        }
    }

    if (kenStart === -1) {
        console.error("FAILED to find Constitution section.");
        return;
    }

    // Find end by looking for next major subject "行政法"
    for (let i = kenStart + 1; i < lines.length; i++) {
        if (lines[i].includes('"行政法": [')) {
            kenEnd = i - 1;
            console.log(`Constitution end detected before "行政法" at line ${i + 1}`);
            break;
        }
    }

    if (kenEnd === -1) {
        // Find next closing ],
        for (let i = kenStart + 1; i < lines.length; i++) {
            if (lines[i].trim() === '],') {
                kenEnd = i;
                console.log(`Constitution end detected by ], at line ${i + 1}`);
                break;
            }
        }
    }

    // Extraction
    let explains = [];
    for (let i = kenStart; i <= kenEnd; i++) {
        if (lines[i].includes('"explain":')) {
            const match = lines[i].match(/\[\[image:[^\]]+\]\]/);
            explains.push({
                idx: i,
                tag: match ? match[0] : null
            });
        }
    }

    console.log(`Processing ${explains.length} questions in Constitution...`);

    let totalFixed = 0;
    for (let k = 1; k < explains.length; k++) {
        if (explains[k].tag) {
            const tag = explains[k].tag;
            const prev = explains[k-1];
            const current = explains[k];

            // Remove from current
            lines[current.idx] = lines[current.idx].replace(tag, "").replace(/\\n\\n$/, "").replace(/\\n\\n/, "").trimEnd();
            if (!lines[current.idx].endsWith(',') && !lines[current.idx].endsWith('"')) lines[current.idx] += ',';
            if (lines[current.idx].endsWith('",')) { /* ok */ }
            else if (lines[current.idx].endsWith('"')) { lines[current.idx] += ','; }

            // Add to previous if not present
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

    if (totalFixed > 0) {
        fs.writeFileSync(QUEST_PATH, lines.join('\n'));
        console.log(`\nSuccessfully shifted ${totalFixed} tags for Constitution.`);
    } else {
        console.log("\nNo changes made for Constitution.");
    }
}

fixAbsolutely();

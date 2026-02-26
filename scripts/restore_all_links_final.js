const fs = require('fs');
const path = require('path');

const LEARN_PATH = path.join(__dirname, '../src/learn.js');

function restoreLinks() {
    let learnSrc = fs.readFileSync(LEARN_PATH, 'utf-8');

    // Find where LEARN_CONTENT is defined
    const startMarker = 'export const LEARN_CONTENT = {';
    const startIndex = learnSrc.indexOf(startMarker);
    if (startIndex === -1) {
        console.error("Could not find LEARN_CONTENT start");
        return;
    }

    // We'll use a safer approach: parse the JSON part, update it, and stringify
    // To preserve the 'export const LEARN_CONTENT =' part
    const jsonPart = learnSrc.substring(startIndex + 'export const LEARN_CONTENT = '.length);

    // We need to handle the trailing semicolon if it exists
    let cleanJson = jsonPart.trim();
    if (cleanJson.endsWith(';')) {
        cleanJson = cleanJson.slice(0, -1);
    }

    let learnContent;
    try {
        // learn.js is valid JS, so eval is okay for this internal tool
        const tempModule = {};
        eval(`tempModule.content = ${cleanJson}`);
        learnContent = tempModule.content;
    } catch (e) {
        console.error("Parse error:", e);
        return;
    }

    const subjectsToFix = ['憲法', '民法物権'];
    let totalUpdated = 0;

    subjectsToFix.forEach(subject => {
        if (!learnContent[subject]) {
            console.warn(`Subject ${subject} not found`);
            return;
        }

        const array = learnContent[subject];
        for (let i = 0; i < array.length; i++) {
            const current = array[i];
            const linkTag = `[[LINK:${i}]]`;

            if (!current.includes('[[LINK:')) {
                array[i] = current + linkTag;
                totalUpdated++;
                console.log(`[${subject}] Added ${linkTag} to index ${i}`);
            } else if (!current.includes(linkTag)) {
                // Wrong link index found
                const fixed = current.replace(/\[\[LINK:\d+\]\]/g, '') + linkTag;
                array[i] = fixed;
                totalUpdated++;
                console.log(`[${subject}] Fixed link at index ${i} to ${linkTag}`);
            }
        }
    });

    if (totalUpdated > 0) {
        const newSrc = `export const LEARN_CONTENT = ${JSON.stringify(learnContent, null, 2)};\n`;
        fs.writeFileSync(LEARN_PATH, newSrc);
        console.log(`\nSuccessfully updated ${totalUpdated} links in learn.js`);
    } else {
        console.log("\nNo updates needed.");
    }
}

restoreLinks();

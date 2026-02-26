const fs = require('fs');
const path = require('path');

const QUEST_PATH = path.join(__dirname, '../src/questions.js');

function fixIndexShift() {
    console.log("Reading questions.js...");
    const content = fs.readFileSync(QUEST_PATH, 'utf-8');

    // We need to carefully parse the file as JS object
    // Since it's an export const SUBJECTS = { ... }
    const subjectsMarker = 'export const SUBJECTS = ';
    const startIdx = content.indexOf(subjectsMarker);
    if (startIdx === -1) {
        console.error("Could not find SUBJECTS export");
        return;
    }

    const subjectsStr = content.substring(startIdx + subjectsMarker.length).trim().replace(/;$/, '');

    let subjects;
    try {
        const tempModule = {};
        // Strip 'export ' if eval fails or handle it upfront
        const evalStr = `tempModule.SUBJECTS = ${subjectsStr}`;
        eval(evalStr);
        subjects = tempModule.SUBJECTS;
    } catch (e) {
        console.error("Parse error:", e);
        return;
    }

    const configs = [
        { main: '憲法', sub: '憲法' },
        { main: '民法物権', sub: '民法物権' }
    ];

    let totalFixed = 0;

    configs.forEach(cfg => {
        if (!subjects[cfg.main] || !subjects[cfg.main][cfg.sub]) {
            console.warn(`Section ${cfg.main} -> ${cfg.sub} not found`);
            return;
        }

        const questions = subjects[cfg.main][cfg.sub];
        console.log(`Processing ${cfg.main}...`);

        // Collect all image tags and their current indices
        // Then shift them forward (to i-1)
        const imageMap = new Map(); // index -> imageTag

        for (let i = 0; i < questions.length; i++) {
            const explain = questions[i].explain || "";
            const match = explain.match(/\[\[image:[^\]]+\]\]/);
            if (match) {
                imageMap.set(i, match[0]);
                // Remove from current
                questions[i].explain = explain.replace(match[0], "").trim();
            }
        }

        // Apply shift: image at i goes to i-1
        imageMap.forEach((tag, oldIdx) => {
            const newIdx = oldIdx - 1;
            if (newIdx >= 0) {
                const targetExplain = questions[newIdx].explain || "";
                if (!targetExplain.includes(tag)) {
                    questions[newIdx].explain = (tag + "\n\n" + targetExplain).trim();
                    totalFixed++;
                    console.log(`  Shifted ${tag} from index ${oldIdx} to ${newIdx}`);
                }
            } else {
                console.warn(`  Could not shift tag ${tag} from index 0 (no preview index)`);
            }
        });
    });

    if (totalFixed > 0) {
        const newContent = `export const SUBJECTS = ${JSON.stringify(subjects, null, 2)};\n`;
        fs.writeFileSync(QUEST_PATH, newContent);
        console.log(`\nSuccessfully fixed ${totalFixed} image shifts in questions.js`);
    } else {
        console.log("\nNo shifts were performed.");
    }
}

fixIndexShift();

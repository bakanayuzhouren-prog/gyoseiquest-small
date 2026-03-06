import fs from 'fs';
import { LEARN_CONTENT } from './src/l_current.mjs';
import { SUBJECTS } from './src/q_current.mjs'; // This is the merged one

const LEARN_JS = 'src/learn.js';

console.log('--- Phase 2: Updating learn.js (High Precision) ---');

const updatedLearnContent = {};

for (const subject in LEARN_CONTENT) {
    console.log(`Processing subject: ${subject}`);
    updatedLearnContent[subject] = LEARN_CONTENT[subject].map((text, index) => {
        if (!SUBJECTS[subject]) return text;

        let bestMatch = text;
        let maxSimilarity = 0;

        for (const subKey in SUBJECTS[subject]) {
            const questions = SUBJECTS[subject][subKey];
            for (const q of questions) {
                if (!q.explain) continue;

                const plainExplain = q.explain.replace(/\[\[image:.*?\]\]/g, '').replace(/\s/g, '');
                const plainText = text.replace(/\[\[image:.*?\]\]/g, '').replace(/\s/g, '');

                // Calculate a simple prefix/substring similarity or just use includes
                if (plainExplain.includes(plainText.substring(0, 15)) || plainText.includes(plainExplain.substring(0, 15))) {
                    // If it contains the image tag, prioritize it
                    if (q.explain.includes('[[image:')) {
                        return q.explain;
                    }
                }
            }
        }
        return bestMatch;
    });
}

const outputLearn = `export const LEARN_CONTENT = ${JSON.stringify(updatedLearnContent, null, 2)};\n`;
fs.writeFileSync(LEARN_JS, outputLearn);
console.log('Successfully updated src/learn.js');

// Verify count again
const finalContent = fs.readFileSync(LEARN_JS, 'utf8');
const count = (finalContent.match(/\[\[image:/g) || []).length;
console.log(`Final image count in learn.js: ${count}`);

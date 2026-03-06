import fs from 'fs';
import { LEARN_CONTENT as currentLearnContent } from './src/l_current.mjs';
import { SUBJECTS as bakSubjects } from './src/q_bak.mjs';
import { RESOURCES as currentResources, SUBJECTS as currentSubjects } from './src/q_current.mjs';

const QUESTIONS_JS = 'src/questions.js';
const LEARN_JS = 'src/learn.js';

console.log('--- Phase 1: Merging questions.js ---');

const mergedSubjects = JSON.parse(JSON.stringify(bakSubjects));

// Overwrite Civil Law (Minpo) with current version (latest fixes)
if (currentSubjects['民法']) {
    mergedSubjects['民法'] = currentSubjects['民法'];
}

// Write merged questions.js
const outputQuestions = `export const RESOURCES = ${JSON.stringify(currentResources, null, 2)};\n\nexport const SUBJECTS = ${JSON.stringify(mergedSubjects, null, 2)};\n`;
fs.writeFileSync(QUESTIONS_JS, outputQuestions);
console.log('Successfully updated src/questions.js');

console.log('--- Phase 2: Updating learn.js ---');

const updatedLearnContent = {};

for (const subject in currentLearnContent) {
    console.log(`Processing subject: ${subject}`);
    updatedLearnContent[subject] = currentLearnContent[subject].map((text, index) => {
        if (!mergedSubjects[subject]) return text;

        for (const subKey in mergedSubjects[subject]) {
            const questions = mergedSubjects[subject][subKey];
            for (const q of questions) {
                if (!q.explain) continue;

                // Match by text similarity
                const plainExplain = q.explain.replace(/\[\[image:.*?\]\]/g, '').replace(/\s/g, '');
                const plainText = text.replace(/\[\[image:.*?\]\]/g, '').replace(/\s/g, '');

                // Need a good match
                if (plainExplain.length > 20 && (plainExplain.includes(plainText.substring(0, 40)) || plainText.includes(plainExplain.substring(0, 40)))) {
                    return q.explain;
                }
            }
        }
        return text;
    });
}

const outputLearn = `export const LEARN_CONTENT = ${JSON.stringify(updatedLearnContent, null, 2)};\n`;
fs.writeFileSync(LEARN_JS, outputLearn);
console.log('Successfully updated src/learn.js');

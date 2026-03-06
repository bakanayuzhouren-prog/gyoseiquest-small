import fs from 'fs';

// Load the merged questions.js as .mjs for safe import
const QUESTIONS_TEMP = 'src/questions_merged_tmp.mjs';
const currentQuestions = fs.readFileSync('src/questions.js', 'utf8');
fs.writeFileSync(QUESTIONS_TEMP, currentQuestions);

// Use absolute path for import to be safe, or just same dir
import { LEARN_CONTENT } from './src/l_current.mjs';
import { SUBJECTS } from './src/questions_merged_tmp.mjs';

const LEARN_JS = 'src/learn.js';

console.log('--- Phase 2: Updating learn.js (High Precision FIXED PATH) ---');

const updatedLearnContent = {};

for (const subject in LEARN_CONTENT) {
    console.log(`Processing subject: ${subject}`);
    updatedLearnContent[subject] = LEARN_CONTENT[subject].map((text, index) => {
        const subjectsKeys = Object.keys(SUBJECTS);
        const matchKey = subjectsKeys.find(k => k.trim() === subject.trim());

        if (!matchKey) return text;

        for (const subKey in SUBJECTS[matchKey]) {
            const questions = SUBJECTS[matchKey][subKey];
            for (const q of questions) {
                if (!q.explain) continue;

                const plainExplain = q.explain.replace(/\[\[image:.*?\]\]/g, '').replace(/\s/g, '');
                const plainText = text.replace(/\[\[image:.*?\]\]/g, '').replace(/\s/g, '');

                if (plainExplain.includes(plainText.substring(0, 15)) || plainText.includes(plainExplain.substring(0, 15))) {
                    if (q.explain.includes('[[image:')) {
                        return q.explain;
                    }
                }
            }
        }
        return text;
    });
}

const outputLearn = `export const LEARN_CONTENT = ${JSON.stringify(updatedLearnContent, null, 2)};\n`;
fs.writeFileSync(LEARN_JS, outputLearn);
console.log('Successfully updated src/learn.js');

const finalContent = fs.readFileSync(LEARN_JS, 'utf8');
const count = (finalContent.match(/\[\[image:/g) || []).length;
console.log(`Final image count in learn.js: ${count}`);

// Cleanup
fs.unlinkSync(QUESTIONS_TEMP);

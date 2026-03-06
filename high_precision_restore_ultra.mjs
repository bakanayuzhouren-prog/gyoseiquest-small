import fs from 'fs';
import path from 'path';

async function run() {
    // Load the merged questions.js as .mjs for safe import
    const QUESTIONS_TEMP = path.resolve('src/questions_merged_final.mjs');
    const currentQuestions = fs.readFileSync('src/questions.js', 'utf8');
    fs.writeFileSync(QUESTIONS_TEMP, currentQuestions);

    const LEARN_DATA_TEMP = path.resolve('src/l_current_temp.mjs');
    const currentL = fs.readFileSync('src/l_current.mjs', 'utf8');
    fs.writeFileSync(LEARN_DATA_TEMP, currentL);

    console.log('--- Phase 2: Updating learn.js (Dynamic Import) ---');

    // Dynamic import to avoid parse-time evaluation of missing files
    const { SUBJECTS } = await import('file://' + QUESTIONS_TEMP);
    const { LEARN_CONTENT } = await import('file://' + LEARN_DATA_TEMP);

    const LEARN_JS = 'src/learn.js';
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
    fs.unlinkSync(LEARN_DATA_TEMP);
}

run().catch(console.error);

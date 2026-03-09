import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
const require = createRequire(import.meta.url);

function loadDataFromFile(filePath, varName) {
    const content = fs.readFileSync(filePath, 'utf8');
    const cleaned = content.replace(/export const /g, 'const ').replace(/export let /g, 'let ');
    const tempFile = 'temp_load_' + varName + '.cjs';
    const tempPath = path.join(process.cwd(), tempFile);
    fs.writeFileSync(tempPath, cleaned + '\nmodule.exports = { ' + varName + ' };\n');
    let data;
    try {
        data = require(tempPath)[varName];
    } catch (e) {
        throw e;
    }
    return data;
}

try {
    console.log("--- Loading Data ---");
    const bakSubjects = loadDataFromFile('src/questions.js.backup', 'SUBJECTS');
    const currentSubjects = loadDataFromFile('src/questions.js', 'SUBJECTS');
    const currentResources = loadDataFromFile('src/questions.js', 'RESOURCES');
    const oldLearn = loadDataFromFile('src/learn_old_233.js', 'LEARN_CONTENT');
    const currentLearn = loadDataFromFile('src/learn.js', 'LEARN_CONTENT');

    console.log("--- Updating questions.js ---");
    currentSubjects['行政法'] = bakSubjects['行政法'];
    fs.writeFileSync('src/questions.js', `export const RESOURCES = ${JSON.stringify(currentResources, null, 2)};\n\nexport const SUBJECTS = ${JSON.stringify(currentSubjects, null, 2)};\n`);
    console.log("Updated questions.js");

    console.log("--- Updating learn.js ---");
    const keyMap = {
        '行政法総論': '行政法総論',
        '行政手続法': '行政手続法',
        '行政不服審査法': '行政不服審査法',
        '行政事件訴訟法': '行政事件訴訟法',
        '国家賠償法・損失訴訟': '国家賠償法',
        '地方自治法': '地方自治法',
        '行政法総合': '総合問題'
    };

    const adminSubjects = currentSubjects['行政法'];

    for (const subKey in adminSubjects) {
        const learnKey = keyMap[subKey];
        if (!learnKey) continue;

        const targetLen = adminSubjects[subKey].length;
        console.log(`Processing ${subKey} -> ${learnKey} (Target length: ${targetLen})`);

        if (subKey === '行政法総合') {
            // Generate from subjects since oldLearn has 0
            currentLearn[learnKey] = adminSubjects[subKey].map(q => {
                return q.explain ? q.explain : (q.answer || q.text);
            });
        } else {
            // Take from oldLearn up to targetLen
            let learns = oldLearn[learnKey] || [];
            if (learns.length >= targetLen) {
                currentLearn[learnKey] = learns.slice(0, targetLen);
            } else {
                console.warn(`Warning: Not enough learn data for ${learnKey}. Expected ${targetLen}, found ${learns.length}`);
                // Pad with explains if necessary
                currentLearn[learnKey] = [...learns];
                for (let i = learns.length; i < targetLen; i++) {
                    const q = adminSubjects[subKey][i];
                    currentLearn[learnKey].push(q.explain ? q.explain : (q.text || ""));
                }
            }
        }
        console.log(`  Resulting length for ${learnKey}: ${currentLearn[learnKey]?.length}`);
    }

    fs.writeFileSync('src/learn.js', `export const LEARN_CONTENT = ${JSON.stringify(currentLearn, null, 2)};\n`);
    console.log("Updated learn.js");
    console.log("--- Sync Complete ---");
} catch (e) {
    console.error("Failed:", e);
}

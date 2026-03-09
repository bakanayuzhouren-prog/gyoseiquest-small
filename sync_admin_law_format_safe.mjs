import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
const require = createRequire(import.meta.url);

function loadDataFromFile(filePath, varName) {
    const content = fs.readFileSync(filePath, 'utf8');
    const cleaned = content.replace(/export const /g, 'const ').replace(/export let /g, 'let ');
    const tempFile = 'temp_load_fix_' + varName + '.cjs';
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

function customStringify(obj, indent = 0) {
    const pad = ' '.repeat(indent);
    if (typeof obj === 'string') {
        if (obj.includes('\n')) {
            // Use template literal for multi-line strings to preserve formatting
            return `\`${obj.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\``;
        }
        return JSON.stringify(obj).replace(/\\\\/g, '\\');
    }
    if (Array.isArray(obj)) {
        let out = '[\n';
        for (let i = 0; i < obj.length; i++) {
            out += pad + '  ' + customStringify(obj[i], indent + 2);
            if (i < obj.length - 1) out += ',';
            out += '\n';
        }
        out += pad + ']';
        return out;
    }
    if (typeof obj === 'object' && obj !== null) {
        let out = '{\n';
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            out += pad + '  "' + keys[i] + '": ' + customStringify(obj[keys[i]], indent + 2);
            if (i < keys.length - 1) out += ',';
            out += '\n';
        }
        out += pad + '}';
        return out;
    }
    return JSON.stringify(obj);
}

try {
    console.log("--- Loading Data ---");
    const currentSubjects = loadDataFromFile('src/questions.js', 'SUBJECTS');
    const oldLearn = loadDataFromFile('src/learn_old_233.js', 'LEARN_CONTENT');
    const currentLearn = loadDataFromFile('src/learn.js', 'LEARN_CONTENT');

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
            currentLearn[learnKey] = adminSubjects[subKey].map(q => {
                return q.explain ? q.explain : (q.answer || q.text);
            });
        } else {
            let learns = oldLearn[learnKey] || [];
            if (learns.length >= targetLen) {
                currentLearn[learnKey] = learns.slice(0, targetLen);
            } else {
                currentLearn[learnKey] = [...learns];
                for (let i = learns.length; i < targetLen; i++) {
                    const q = adminSubjects[subKey][i];
                    currentLearn[learnKey].push(q.explain ? q.explain : (q.text || ""));
                }
            }
        }
        console.log(`  Resulting length for ${learnKey}: ${currentLearn[learnKey]?.length}`);
    }

    const outputLearn = 'export const LEARN_CONTENT = ' + customStringify(currentLearn, 0) + ';\n';
    fs.writeFileSync('src/learn.js', outputLearn);
    console.log("Updated learn.js with custom stringifier!");
    console.log("--- Sync Complete ---");
} catch (e) {
    console.error("Failed:", e);
}

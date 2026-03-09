import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
const require = createRequire(import.meta.url);

// custom stringifier that generates backticks for multiline strings
function formatValue(obj, indent = 0) {
    const pad = ' '.repeat(indent);
    if (typeof obj === 'string') {
        if (obj.includes('\n')) {
            return `\`${obj.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\``;
        }
        return JSON.stringify(obj);
    }
    if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]';
        let out = '[\n';
        for (let i = 0; i < obj.length; i++) {
            out += pad + '  ' + formatValue(obj[i], indent + 2);
            if (i < obj.length - 1) out += ',';
            out += '\n';
        }
        out += pad + ']';
        return out;
    }
    if (typeof obj === 'object' && obj !== null) {
        const keys = Object.keys(obj);
        if (keys.length === 0) return '{}';
        let out = '{\n';
        for (let i = 0; i < keys.length; i++) {
            out += pad + '  "' + keys[i] + '": ' + formatValue(obj[keys[i]], indent + 2);
            if (i < keys.length - 1) out += ',';
            out += '\n';
        }
        out += pad + '}';
        return out;
    }
    return JSON.stringify(obj);
}

function loadDataFromFile(filePath, varName) {
    const content = fs.readFileSync(filePath, 'utf8');
    const cleaned = content.replace(/export const /g, 'const ').replace(/export let /g, 'let ');
    const tempFile = 'temp_load_hi_' + varName + '_' + Date.now() + Math.floor(Math.random() * 1000) + '.cjs';
    const tempPath = path.join(process.cwd(), tempFile);
    fs.writeFileSync(tempPath, cleaned + '\nmodule.exports = { ' + varName + ' };\n');
    return require(tempPath)[varName];
}

function replaceBlock(content, keyStarter, openChar, closeChar, newInnerContent) {
    const startIdx = content.indexOf(keyStarter);
    if (startIdx === -1) {
        const lastBrace = content.lastIndexOf('}');
        if (lastBrace === -1) throw new Error("Could not find end of object");
        return content.substring(0, lastBrace) + ',\n  ' + newInnerContent + '\n' + content.substring(lastBrace);
    }

    const blockStart = content.indexOf(openChar, startIdx);
    if (blockStart === -1) throw new Error("Block start char not found after key starter: " + keyStarter);

    let braces = 0;
    let started = false;
    let endIdx = -1;

    // A simple parser to ignore strings inside
    let inString = false;
    let inBacktick = false;

    for (let i = blockStart; i < content.length; i++) {
        const c = content[i];
        const prev = i > 0 ? content[i - 1] : '';

        if (!inString && !inBacktick) {
            if (c === '"') inString = true;
            else if (c === '\`') inBacktick = true;
            else if (c === openChar) { braces++; started = true; }
            else if (c === closeChar) { braces--; }
        } else if (inString) {
            if (c === '"' && prev !== '\\') inString = false;
        } else if (inBacktick) {
            if (c === '\`' && prev !== '\\') inBacktick = false;
        }

        if (started && braces === 0 && !inString && !inBacktick) {
            endIdx = i + 1;
            break;
        }
    }

    if (endIdx === -1) throw new Error("Block end char not found for: " + keyStarter);

    return content.substring(0, startIdx) + newInnerContent + content.substring(endIdx);
}

try {
    console.log("--- Loading Data safely ---");
    const currentQ = fs.readFileSync('src/questions.js', 'utf8');
    const currentL = fs.readFileSync('src/learn.js', 'utf8');

    // Original correct data sources
    const bakSubjects = loadDataFromFile('src/questions.js.backup', 'SUBJECTS');
    const oldLearn = loadDataFromFile('src/learn_old_233.js', 'LEARN_CONTENT');
    // Using current data structure simply as a reference for keys and sizing
    const currentSubjects = loadDataFromFile('src/questions.js.pre_restore', 'SUBJECTS');

    console.log("--- Patching questions.js ---");
    const newAdminLawBlock = '"行政法": ' + formatValue(bakSubjects['行政法'], 2);
    const patchedQ = replaceBlock(currentQ, '"行政法":', '{', '}', newAdminLawBlock);
    fs.writeFileSync('src/questions.js', patchedQ);
    console.log(" > Successfully patched questions.js without destroying format!");

    console.log("--- Patching learn.js ---");
    const keyMap = {
        '行政法総論': '行政法総論',
        '行政手続法': '行政手続法',
        '行政不服審査法': '行政不服審査法',
        '行政事件訴訟法': '行政事件訴訟法',
        '国家賠償法・損失訴訟': '国家賠償法',
        '地方自治法': '地方自治法',
        '行政法総合': '総合問題'
    };

    let patchedL = currentL;
    const adminSubjects = bakSubjects['行政法'];

    for (const subKey in adminSubjects) {
        const learnKey = keyMap[subKey];
        if (!learnKey) continue;

        const targetLen = adminSubjects[subKey].length;
        console.log(`Processing ${subKey} -> ${learnKey} (Target count: ${targetLen})`);

        let targetArr = [];
        if (subKey === '行政法総合') {
            targetArr = adminSubjects[subKey].map(q => q.explain ? q.explain : (q.answer || q.text));
        } else {
            let learns = oldLearn[learnKey] || [];
            if (learns.length >= targetLen) {
                targetArr = learns.slice(0, targetLen);
            } else {
                targetArr = [...learns];
                for (let i = learns.length; i < targetLen; i++) {
                    const q = adminSubjects[subKey][i];
                    targetArr.push(q.explain ? q.explain : (q.text || ""));
                }
            }
        }

        // Replace in patchedL
        const newBlock = `"${learnKey}": ` + formatValue(targetArr, 2);
        patchedL = replaceBlock(patchedL, `"${learnKey}":`, '[', ']', newBlock);
    }

    fs.writeFileSync('src/learn.js', patchedL);
    console.log(" > Successfully patched learn.js without destroying others!");
    console.log("--- Sync Complete safely! ---");
} catch (e) {
    console.error("Failed:", e);
}

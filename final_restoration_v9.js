const fs = require('fs');

const BAK_PATH = 'src/questions.js.bak';
const BACKUP_PATH = 'src/questions.js.backup';
const CURRENT_QS_PATH = 'src/questions.js';
const CURRENT_LEARN_PATH = 'src/learn.js';
const OLD_LEARN_PATH = 'src/learn_old_233.js';

function extractData(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    const parts = content.split('export const ');
    const subjectsPart = parts.find(p => p.startsWith('SUBJECTS'));
    if (!subjectsPart) return null;
    const startIdx = subjectsPart.indexOf('{');
    const endIdx = subjectsPart.lastIndexOf('}');
    if (startIdx === -1 || endIdx === -1) return null;
    const objStr = subjectsPart.substring(startIdx, endIdx + 1);
    try {
        return eval(`(${objStr})`);
    } catch (e) {
        return null;
    }
}

function extractLearnData(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/export const LEARN_CONTENT = (\{[\s\S]+?\});/);
    if (!match) return null;
    try {
        return eval(`(${match[1]})`);
    } catch (e) {
        return null;
    }
}

const subjectsBak = extractData(BAK_PATH);
const subjectsBackup = extractData(BACKUP_PATH);
const oldLearnOrig = extractLearnData(OLD_LEARN_PATH);

if (!subjectsBak || !subjectsBackup || !oldLearnOrig) {
    console.error('Missing data files');
    process.exit(1);
}

// ---------------------------------------------------------
// Phase 1: High-quality SUBJECTS merge (Kenpou/Admin from .bak, Minpou from .backup)
// ---------------------------------------------------------
const merged = JSON.parse(JSON.stringify(subjectsBak));

// Priority overwrite for Civil Law from backup
for (const cat in subjectsBackup) {
    if (cat.includes('民法')) {
        merged[cat] = subjectsBackup[cat];
    } else {
        for (const sub in subjectsBackup[cat]) {
            if (sub.includes('民法')) {
                if (!merged[cat]) merged[cat] = {};
                merged[cat][sub] = subjectsBackup[cat][sub];
            }
        }
    }
}

// ---------------------------------------------------------
// Phase 2: Robust Image Map
// ---------------------------------------------------------
const imageMap = new Map();
for (const cat in merged) {
    for (const subNameRaw in merged[cat]) {
        const subName = subNameRaw.trim();
        if (!imageMap.has(subName)) imageMap.set(subName, []);
        const arr = imageMap.get(subName);
        merged[cat][subNameRaw].forEach((q, i) => {
            const match = q.explain && q.explain.match(/\[\[(image:.*?|incident)\]\]/);
            if (match) arr[i] = match[0];
        });
    }
}

// ---------------------------------------------------------
// Phase 3: Restoration with FORCED injection of image tags
// ---------------------------------------------------------
const oldLearnClean = {};
let totalRestored = 0;

for (const subNameRaw in oldLearnOrig) {
    const subName = subNameRaw.trim();
    const items = oldLearnOrig[subNameRaw];
    const sourceArr = imageMap.get(subName);

    if (sourceArr) {
        let subRestored = 0;
        for (let i = 0; i < items.length; i++) {
            const img = sourceArr[i]; // Use index directly if no LINK tag
            if (img && !items[i].includes('[[image:')) {
                items[i] += ` ${img}`;
                subRestored++;
            }
        }
        totalRestored += subRestored;
        console.log(`Subject "${subName}": Injected ${subRestored} images.`);
    }
    oldLearnClean[subName] = items;
}

console.log(`Final image injection count: ${totalRestored}`);

// Write back files
fs.writeFileSync(CURRENT_LEARN_PATH, `export const LEARN_CONTENT = ${JSON.stringify(oldLearnClean, null, 2)};`);

const currentQsStr = fs.readFileSync(CURRENT_QS_PATH, 'utf8');
const resourcesStr = (currentQsStr.match(/export const RESOURCES = (\{[\s\S]+?\});/) || ['export const RESOURCES = {};'])[0];
fs.writeFileSync(CURRENT_QS_PATH, `${resourcesStr}\n\nexport const SUBJECTS = ${JSON.stringify(merged, null, 2)};`);

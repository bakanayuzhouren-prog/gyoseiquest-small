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
    const require = (p) => p;
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
    const require = (p) => p;
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
    console.error('Missing critical data files');
    process.exit(1);
}

// ---------------------------------------------------------
// Phase 1: Build a high-quality SUBJECTS object
// ---------------------------------------------------------

// Start with .bak as the primary source (richer explains/images for Admin/Kenpou)
const merged = JSON.parse(JSON.stringify(subjectsBak));

// Inject or overwrite Civil Law (Minpou) from .backup (which is more complete for Minpou)
for (const cat in subjectsBackup) {
    const isMinpou = cat.includes('民法');
    if (isMinpou) {
        console.log(`Overwriting category "${cat}" from .backup (Minpou priority)`);
        merged[cat] = subjectsBackup[cat];
    } else {
        for (const sub in subjectsBackup[cat]) {
            if (sub.includes('民法')) {
                console.log(`Overwriting subject "${sub}" in category "${cat}" from .backup`);
                if (!merged[cat]) merged[cat] = {};
                merged[cat][sub] = subjectsBackup[cat][sub];
            }
        }
    }
}

// ---------------------------------------------------------
// Phase 2: Build Image Map from the NOW MERGED SUBJECTS
// ---------------------------------------------------------
const imageMap = new Map();
for (const cat in merged) {
    for (const subNameRaw in merged[cat]) {
        const subName = subNameRaw.trim();
        if (!imageMap.has(subName)) imageMap.set(subName, []);
        const arr = imageMap.get(subName);
        merged[cat][subNameRaw].forEach((q, i) => {
            const match = q.explain && q.explain.match(/\[\[image:.*?\]\]/);
            if (match) arr[i] = match[0];
        });
    }
}

// ---------------------------------------------------------
// Phase 3: Restore learn.js using the high-quality Map
// ---------------------------------------------------------
const aliases = {
    '民法総論': '民法',
    '民法': '民法総論'
};

const oldLearnClean = {};
let totalRestored = 0;

for (const subNameRaw in oldLearnOrig) {
    const subName = subNameRaw.trim();
    const items = oldLearnOrig[subNameRaw];
    const alias = aliases[subName];
    const sourceArr = imageMap.get(subName) || (alias && imageMap.get(alias));

    if (sourceArr) {
        let subRestored = 0;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const m = item.match(/\[\[LINK:(\d+)\]\]/);
            if (m) {
                const qIdx = parseInt(m[1], 10);
                const img = sourceArr[qIdx];
                if (img) {
                    items[i] = item.replace(/\[\[LINK:\d+\]\]/, img);
                    subRestored++;
                }
            }
        }
        totalRestored += subRestored;
        console.log(`Learn subject "${subName}": Restored ${subRestored} images.`);
    }
    oldLearnClean[subName] = items;
}

console.log(`Total images restored in learn.js: ${totalRestored}`);

// Write back learn.js
const learnOut = `export const LEARN_CONTENT = ${JSON.stringify(oldLearnClean, null, 2)};`;
fs.writeFileSync(CURRENT_LEARN_PATH, learnOut);

// ---------------------------------------------------------
// Phase 4: Finalize questions.js
// ---------------------------------------------------------
const currentQsStr = fs.readFileSync(CURRENT_QS_PATH, 'utf8');
const resMatch = currentQsStr.match(/export const RESOURCES = (\{[\s\S]+?\});/);
const resourcesStr = resMatch ? resMatch[0] : 'export const RESOURCES = {};';

const qsOut = `export const SUBJECTS = ${JSON.stringify(merged, null, 2)};`;
fs.writeFileSync(CURRENT_QS_PATH, `${resourcesStr}\n\n${qsOut}`);
console.log('Successfully updated questions.js with high-quality merge.');

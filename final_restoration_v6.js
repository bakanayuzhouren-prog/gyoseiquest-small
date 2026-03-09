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

// Build master image map using a real Map for key stability
const imageMap = new Map(); // SubjectName (trimmed) -> Array of ImageTags

function populateMap(data, sourceName) {
    if (!data) return;
    for (const catName in data) {
        for (const subNameRaw in data[catName]) {
            const subName = subNameRaw.trim();
            if (!imageMap.has(subName)) {
                imageMap.set(subName, []);
            }
            const arr = imageMap.get(subName);
            let added = 0;
            data[catName][subNameRaw].forEach((q, i) => {
                if (q.explain && q.explain.includes('[[image:')) {
                    const match = q.explain.match(/\[\[image:.*?\]\]/);
                    if (match && !arr[i]) {
                        arr[i] = match[0];
                        added++;
                    }
                }
            });
            console.log(`Source ${sourceName}: Subject "${subName}" (Cat: ${catName}) populated with ${added} images.`);
        }
    }
}

populateMap(subjectsBak, 'Bak');
populateMap(subjectsBackup, 'Backup');

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
        if (subRestored > 0) {
            console.log(`Subject "${subName}": Restored ${subRestored} images.`);
            totalRestored += subRestored;
        } else {
            console.log(`Subject "${subName}": Found in map but 0 matches for LINK tags.`);
        }
    } else {
        console.log(`Subject "${subName}": No image map found.`);
    }
    oldLearnClean[subName] = items;
}

console.log(`Total images restored: ${totalRestored}`);

// Write back learn.js
const learnOut = `export const LEARN_CONTENT = ${JSON.stringify(oldLearnClean, null, 2)};`;
fs.writeFileSync(CURRENT_LEARN_PATH, learnOut);

// questions.js part
const currentQsStr = fs.readFileSync(CURRENT_QS_PATH, 'utf8');
const resMatch = currentQsStr.match(/export const RESOURCES = (\{[\s\S]+?\});/);
const resourcesStr = resMatch ? resMatch[0] : 'export const RESOURCES = {};';

const merged = JSON.parse(JSON.stringify(subjectsBackup));
// Patch images from Bak
for (const cat in subjectsBak) {
    if (!merged[cat]) merged[cat] = {};
    for (const sub in subjectsBak[cat]) {
        if (!merged[cat][sub]) {
            merged[cat][sub] = subjectsBak[cat][sub];
        } else {
            subjectsBak[cat][sub].forEach((q, i) => {
                const m = q.explain && q.explain.match(/\[\[image:.*?\]\]/);
                if (m && merged[cat][sub][i] && !merged[cat][sub][i].explain.includes('[[image:')) {
                    merged[cat][sub][i].explain += ' ' + m[0];
                }
            });
        }
    }
}

const qsOut = `export const SUBJECTS = ${JSON.stringify(merged, null, 2)};`;
fs.writeFileSync(CURRENT_QS_PATH, `${resourcesStr}\n\n${qsOut}`);
console.log('Successfully updated questions.js');

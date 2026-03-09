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
    process.exit(1);
}

// ---------------------------------------------------------
// Phase 1: High-quality SUBJECTS merge with NORMALIZE KEYS
// ---------------------------------------------------------
const merged = {};

function normalizeAndInject(src) {
    for (const catRaw in src) {
        const cat = catRaw.trim();
        if (!merged[cat]) merged[cat] = {};
        for (const subRaw in src[catRaw]) {
            const sub = subRaw.trim();
            merged[cat][sub] = src[catRaw][subRaw];
        }
    }
}

// First, inject BAK as base
normalizeAndInject(subjectsBak);

// Then, overwrite with BACKUP for specific subjects (Civil Law priority)
for (const catRaw in subjectsBackup) {
    const cat = catRaw.trim();
    if (cat === '民法' || cat === ' 民法') {
        merged['民法'] = subjectsBackup[catRaw];
    } else {
        for (const subRaw in subjectsBackup[catRaw]) {
            const sub = subRaw.trim();
            if (sub.includes('民法')) {
                if (!merged[cat]) merged[cat] = {};
                merged[cat][sub] = subjectsBackup[catRaw][subRaw];
            }
        }
    }
}

// ---------------------------------------------------------
// Phase 2: ULTRA-ROBUST Recursive Image Map
// ---------------------------------------------------------
const imageMap = new Map();

for (const cat in merged) {
    for (const sub in merged[cat]) {
        if (!imageMap.has(sub)) imageMap.set(sub, []);
        const arr = imageMap.get(sub);
        const questions = merged[cat][sub];
        if (Array.isArray(questions)) {
            questions.forEach((q, i) => {
                const match = q.explain && q.explain.match(/\[\[(image\s*:\s*.*?|incident)\]\]/i);
                if (match) {
                    let tag = match[0];
                    if (tag.toLowerCase().startsWith('[[image')) {
                        const parts = match[1].split(':');
                        const inner = parts.length > 1 ? parts[1].trim() : 'MISSING';
                        tag = `[[image:${inner}]]`;
                    }
                    if (!arr[i]) arr[i] = tag;
                }
            });
        }
    }
}

// ---------------------------------------------------------
// Phase 3: Restoration with forced injection
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
            const img = sourceArr[i];
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

console.log(`Final total image injection count: ${totalRestored}`);

// Write back files
fs.writeFileSync(CURRENT_LEARN_PATH, `export const LEARN_CONTENT = ${JSON.stringify(oldLearnClean, null, 2)};`);

const currentQsStr = fs.readFileSync(CURRENT_QS_PATH, 'utf8');
const resourcesStr = (currentQsStr.match(/export const RESOURCES = (\{[\s\S]+?\});/) || ['export const RESOURCES = {};'])[0];
fs.writeFileSync(CURRENT_QS_PATH, `${resourcesStr}\n\nexport const SUBJECTS = ${JSON.stringify(merged, null, 2)};`);

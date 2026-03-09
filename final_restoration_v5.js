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
const oldLearn = extractLearnData(OLD_LEARN_PATH);

if (!subjectsBak || !subjectsBackup || !oldLearn) {
    console.error('Missing critical data files');
    process.exit(1);
}

// Build master image map
const imageMap = {}; // subjectName -> [imageTag at index]

function populateMap(data, sourceName) {
    if (!data) return;
    for (const cat in data) {
        for (const sub in data[cat]) {
            if (!imageMap[sub]) {
                imageMap[sub] = [];
            }
            let sourceImgCount = 0;
            data[cat][sub].forEach((q, i) => {
                if (q.explain && q.explain.includes('[[image:')) {
                    const match = q.explain.match(/\[\[image:.*?\]\]/);
                    if (match) {
                        if (!imageMap[sub][i]) {
                            imageMap[sub][i] = match[0];
                            sourceImgCount++;
                        }
                    }
                }
            });
            console.log(`Source ${sourceName}: Subject "${sub}" populated with ${sourceImgCount} images.`);
        }
    }
}

populateMap(subjectsBak, 'Bak');
populateMap(subjectsBackup, 'Backup');

// Add subject aliases for mapping
const subjectAliases = {
    '民法総論': '民法',
    '民法': '民法総論'
};

let restoredCount = 0;
for (const subName in oldLearn) {
    const items = oldLearn[subName];
    const targetSub = subjectAliases[subName] || subName;

    // Check if we have images for this subject or its alias
    const sourceMap = imageMap[subName] || imageMap[targetSub];

    if (sourceMap) {
        let subRestored = 0;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const linkMatch = item.match(/\[\[LINK:(\d+)\]\]/);
            if (linkMatch) {
                const qIdx = parseInt(linkMatch[1], 10);
                const img = sourceMap[qIdx];
                if (img) {
                    items[i] = item.replace(/\[\[LINK:\d+\]\]/, img);
                    restoredCount++;
                    subRestored++;
                }
            }
        }
        if (subRestored > 0) console.log(`Subject "${subName}": Restored ${subRestored} images.`);
    } else {
        console.log(`Subject "${subName}": No image map entries found (Sub: ${subName}, Alias: ${targetSub})`);
    }
}

console.log(`Phase 1: Restored ${restoredCount} image tags in LEARN_CONTENT.`);

// Write back learn.js
const learnContentOut = `export const LEARN_CONTENT = ${JSON.stringify(oldLearn, null, 2)};`;
fs.writeFileSync(CURRENT_LEARN_PATH, learnContentOut);

// Phase 2: questions.js restoration
const currentQsContent = fs.readFileSync(CURRENT_QS_PATH, 'utf8');
const resourcesMatch = currentQsContent.match(/export const RESOURCES = (\{[\s\S]+?\});/);
const resourcesStr = resourcesMatch ? resourcesMatch[0] : 'export const RESOURCES = {};';

// Merge strategy for SUBJECTS:
// Use backupData as base (it has most questions)
const mergedSubjects = JSON.parse(JSON.stringify(subjectsBackup));

// Patch in images from subjectsBak (which has more images for Administrative/Constitution)
for (const cat in subjectsBak) {
    if (!mergedSubjects[cat]) mergedSubjects[cat] = {};
    for (const sub in subjectsBak[cat]) {
        if (!mergedSubjects[cat][sub]) {
            mergedSubjects[cat][sub] = subjectsBak[cat][sub];
        } else {
            // If exists in both, update explanations with images if missing
            subjectsBak[cat][sub].forEach((q, i) => {
                if (q.explain && q.explain.includes('[[image:')) {
                    const img = q.explain.match(/\[\[image:.*?\]\]/)[0];
                    if (mergedSubjects[cat][sub][i]) {
                        if (!mergedSubjects[cat][sub][i].explain.includes('[[image:')) {
                            mergedSubjects[cat][sub][i].explain += ' ' + img;
                        }
                    }
                }
            });
        }
    }
}

const subjectsOut = `export const SUBJECTS = ${JSON.stringify(mergedSubjects, null, 2)};`;
fs.writeFileSync(CURRENT_QS_PATH, `${resourcesStr}\n\n${subjectsOut}`);
console.log('Phase 2: Updated questions.js with merged data and images.');

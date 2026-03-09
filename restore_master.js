const fs = require('fs');

const BAK_PATH = 'src/questions.js.bak';
const BACKUP_PATH = 'src/questions.js.backup';
const CURRENT_PATH = 'src/questions.js';
const LEARN_JS_PATH = 'src/learn.js';
const LEARN_OLD_PATH = 'src/learn_old_233.js';

function extractData(filePath) {
    if (!fs.existsSync(filePath)) return null;
    console.log(`Extracting data from ${filePath}...`);
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
        console.error(`Error parsing ${filePath}:`, e.message);
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

function restore() {
    console.log('--- Phase 1: Building Image Map from multiple backups ---');
    const bakData = extractData(BAK_PATH);
    const backupData = extractData(BACKUP_PATH);

    // imageMap: SubjectName -> [ImageTags]
    const imageMap = {};

    function addToMap(data) {
        if (!data) return;
        for (const catName in data) {
            for (const subName in data[catName]) {
                if (!imageMap[subName]) imageMap[subName] = [];
                data[catName][subName].forEach((q, idx) => {
                    if (q.explain && q.explain.includes('[[image:')) {
                        const img = q.explain.match(/\[\[image:.*?\]\]/)[0];
                        if (!imageMap[subName][idx]) imageMap[subName][idx] = img;
                    }
                });
            }
        }
    }

    addToMap(bakData);
    addToMap(backupData);

    console.log('--- Phase 2: Restoring learn.js from old backup ---');
    const oldLearn = extractLearnData(LEARN_OLD_PATH);
    if (!oldLearn) {
        console.error('Could not find LEARN_OLD_PATH');
        return;
    }

    let restoredCount = 0;
    for (const subName in oldLearn) {
        const items = oldLearn[subName];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const linkMatch = item.match(/\[\[LINK:(\d+)\]\]/);
            if (linkMatch) {
                const idx = parseInt(linkMatch[1], 10);
                const img = imageMap[subName] && imageMap[subName][idx];
                if (img) {
                    items[i] = item.replace(/\[\[LINK:\d+\]\]/, img);
                    restoredCount++;
                }
            }
        }
    }
    console.log(`Restored ${restoredCount} image tags in learn.js`);

    const newLearnContent = `export const LEARN_CONTENT = ${JSON.stringify(oldLearn, null, 2)};`;
    fs.writeFileSync(LEARN_JS_PATH, newLearnContent);

    console.log('--- Phase 3: Restoring questions.js ---');
    let currentQuestions = extractData(CURRENT_PATH) || {};

    // Subject restoration logic:
    // If subject is missing or very small, use backupData (the most complete source for questions)
    if (backupData) {
        for (const catName in backupData) {
            if (!currentQuestions[catName]) currentQuestions[catName] = {};
            for (const subName in backupData[catName]) {
                const target = backupData[catName][subName];
                const current = currentQuestions[catName][subName] || [];

                // For Civil Law and Basic Law, always replace with backup if backup is larger
                const isCivilOrBasic = catName === '民法' || subName.includes('民法') || catName === '基礎法学';

                if (isCivilOrBasic || current.length < target.length * 0.9) {
                    console.log(`Updating ${subName}: ${current.length} -> ${target.length} questions`);
                    currentQuestions[catName][subName] = target;
                }

                // Patch explanations with images from our master map
                currentQuestions[catName][subName].forEach((q, idx) => {
                    const img = imageMap[subName] && imageMap[subName][idx];
                    if (img && (!q.explain || !q.explain.includes('[[image:'))) {
                        if (!q.explain) q.explain = '';
                        q.explain += ' ' + img;
                    }
                });
            }
        }
    }

    // Keep RESOURCES from current
    const currentFullContent = fs.readFileSync(CURRENT_PATH, 'utf8');
    const resMatch = currentFullContent.match(/export const RESOURCES = (\{[\s\S]+?\});/);
    const resourcesStr = resMatch ? resMatch[0] : 'export const RESOURCES = {};';

    const newQuestionsContent = `${resourcesStr}\n\nexport const SUBJECTS = ${JSON.stringify(currentQuestions, null, 2)};`;
    fs.writeFileSync(CURRENT_PATH, newQuestionsContent);
    console.log('Successfully updated questions.js');
}

restore();

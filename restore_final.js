const fs = require('fs');

const QUESTIONS_BAK_PATH = 'src/questions.js.backup';
const QUESTIONS_JSON_PATH = 'src/questions.js';
const LEARN_JS_PATH = 'src/learn.js';
const LEARN_OLD_PATH = 'src/learn_old_233.js';

function extractData(filePath) {
    console.log(`Extracting data from ${filePath}...`);
    const content = fs.readFileSync(filePath, 'utf8');

    const parts = content.split('export const ');
    const subjectsPart = parts.find(p => p.startsWith('SUBJECTS'));

    if (!subjectsPart) {
        console.error(`Could not find SUBJECTS export in ${filePath}`);
        return null;
    }

    const startIdx = subjectsPart.indexOf('{');
    const endIdx = subjectsPart.lastIndexOf('}');
    if (startIdx === -1 || endIdx === -1) {
        console.error(`Could not find object in SUBJECTS part of ${filePath}`);
        return null;
    }

    const objStr = subjectsPart.substring(startIdx, endIdx + 1);
    const require = (p) => p;
    try {
        const data = eval(`(${objStr})`);
        console.log(`Successfully parsed ${filePath}.`);
        return data;
    } catch (e) {
        console.error(`Error parsing ${filePath}:`, e.message);
        return null;
    }
}

function extractLearnData(filePath) {
    console.log(`Extracting learn data from ${filePath}...`);
    const content = fs.readFileSync(filePath, 'utf8');
    const startIdx = content.indexOf('{');
    const endIdx = content.lastIndexOf('}');
    if (startIdx === -1 || endIdx === -1) return null;

    const objStr = content.substring(startIdx, endIdx + 1);
    const require = (p) => p;
    try {
        return eval(`(${objStr})`);
    } catch (e) {
        console.error(`Error parsing ${filePath}:`, e.message);
        return null;
    }
}

function restore() {
    console.log('--- Phase 1: Restoration of LEARN_CONTENT ---');
    // Load from old backup which has all the correct [[LINK:n]] tags
    const learnData = extractLearnData(LEARN_OLD_PATH);
    const bakData = extractData(QUESTIONS_BAK_PATH);

    if (!learnData || !bakData) {
        console.error('Failed to load required data');
        return;
    }

    let restoredCount = 0;
    let subjectMatchCount = 0;

    const subjectMap = {
        '民法記述': ['記述', '民法']
    };

    for (const [subjectName, items] of Object.entries(learnData)) {
        let bakItems = null;

        for (const catName in bakData) {
            if (bakData[catName][subjectName]) {
                bakItems = bakData[catName][subjectName];
                subjectMatchCount++;
                break;
            }
        }

        if (!bakItems && subjectMap[subjectName]) {
            const [mappedCat, mappedSub] = subjectMap[subjectName];
            if (bakData[mappedCat] && bakData[mappedCat][mappedSub]) {
                bakItems = bakData[mappedCat][mappedSub];
                subjectMatchCount++;
                console.log(`Mapped subject "${subjectName}" to bakData["${mappedCat}"]["${mappedSub}"]`);
            }
        }

        if (!bakItems) continue;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const linkMatch = item.match(/\[\[LINK:(\d+)\]\]/);
            if (linkMatch) {
                const qIndex = parseInt(linkMatch[1], 10);
                const bakQuestion = bakItems[qIndex];
                if (bakQuestion && bakQuestion.explain) {
                    const imageMatch = bakQuestion.explain.match(/\[\[image:(.+?)\]\]/);
                    if (imageMatch) {
                        const imageTag = imageMatch[0];
                        items[i] = item.replace(/\[\[LINK:\d+\]\]/, imageTag);
                        restoredCount++;
                    }
                }
            }
        }
    }

    console.log(`LEARN_CONTENT: Matched subjects: ${subjectMatchCount}. Restored image tags: ${restoredCount}`);

    // Update learn.js - we write back the ENTIRE thing from learnData (base was LEARN_OLD_PATH)
    const newLearnContent = `export const LEARN_CONTENT = ${JSON.stringify(learnData, null, 2)};`;
    fs.writeFileSync(LEARN_JS_PATH, newLearnContent);
    console.log('Updated learn.js (Total subjects: ' + Object.keys(learnData).length + ')');

    console.log('--- Phase 2: Questions Data Restoration ---');
    // Load current questions to patch or replace
    const questionsData = extractData(QUESTIONS_JSON_PATH);
    if (questionsData) {
        let qRestoredCount = 0;
        let qReplacedCount = 0;

        for (const catName in bakData) {
            for (const subName in bakData[catName]) {
                const bakSub = bakData[catName][subName];
                if (!questionsData[catName]) questionsData[catName] = {};

                const qList = questionsData[catName][subName] || [];

                // Always replace Civil Law, General Law, and potentially broken Administrative Law subjects
                const isTarget = catName === '民法' || subName.includes('民法') || catName === '基礎法学' || qList.length < bakSub.length * 0.9;

                if (isTarget) {
                    console.log(`Replacing subject "${subName}" in category "${catName}": ${qList.length} -> ${bakSub.length} questions`);
                    questionsData[catName][subName] = bakSub;
                    qReplacedCount += bakSub.length;
                } else {
                    for (let i = 0; i < qList.length; i++) {
                        if (bakSub[i] && bakSub[i].explain && !qList[i].explain) {
                            qList[i].explain = bakSub[i].explain;
                            qList[i].chunks = bakSub[i].chunks || [];
                            qList[i].slots = bakSub[i].slots || [];
                            qRestoredCount++;
                        }
                    }
                }
            }
        }

        console.log(`Questions: Replaced ${qReplacedCount} questions, Patched explanations for ${qRestoredCount} questions.`);
        const newQuestionsContent = `export const SUBJECTS = ${JSON.stringify(questionsData, null, 2)};`;
        fs.writeFileSync(QUESTIONS_JSON_PATH, newQuestionsContent);
        console.log('Updated questions.js');
    }
}

restore();

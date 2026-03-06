import fs from 'fs';

const QUESTIONS_BAK = 'src/questions.js.bak';
const QUESTIONS_JS = 'src/questions.js';
const LEARN_JS = 'src/learn.js';

function extractData(filePath, variableName) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Find "export const NAME = { ... };"
    const startMarker = `export const ${variableName} = `;
    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) throw new Error(`Could not find ${variableName} in ${filePath}`);

    let braceCount = 0;
    let endIndex = -1;
    let started = false;

    for (let i = startIndex + startMarker.length; i < content.length; i++) {
        if (content[i] === '{' || content[i] === '[') {
            braceCount++;
            started = true;
        } else if (content[i] === '}' || content[i] === ']') {
            braceCount--;
        }

        if (started && braceCount === 0) {
            endIndex = i + 1;
            break;
        }
    }

    if (endIndex === -1) throw new Error(`Could not find end of ${variableName} in ${filePath}`);

    const dataString = content.substring(startIndex + startMarker.length, endIndex);
    try {
        return eval('(' + dataString + ')');
    } catch (e) {
        console.error(`Error parsing ${variableName} from ${filePath}`);
        // Fallback or debug
        fs.writeFileSync(`debug_${variableName}_fail.js`, dataString);
        throw e;
    }
}

console.log('--- Phase 1: Merging questions.js ---');
const bakSubjects = extractData(QUESTIONS_BAK, 'SUBJECTS');
const currentSubjects = extractData(QUESTIONS_JS, 'SUBJECTS');
const currentResources = extractData(QUESTIONS_JS, 'RESOURCES');

const mergedSubjects = JSON.parse(JSON.stringify(bakSubjects));

// Overwrite Civil Law with current version (it contains the latest fixes)
if (currentSubjects['民法']) {
    mergedSubjects['民法'] = currentSubjects['民法'];
}

// Special case: If any subject in bak doesn't have images but current does (unlikely but possible), sync them.
// But the goal is to GET images from bak.

// Write merged questions.js
const outputQuestions = `export const RESOURCES = ${JSON.stringify(currentResources, null, 2)};\n\nexport const SUBJECTS = ${JSON.stringify(mergedSubjects, null, 2)};\n`;
fs.writeFileSync(QUESTIONS_JS, outputQuestions);
console.log('Successfully updated src/questions.js');

console.log('--- Phase 2: Updating learn.js ---');
const currentLearnContent = extractData(LEARN_JS, 'LEARN_CONTENT');

const updatedLearnContent = {};

for (const subject in currentLearnContent) {
    console.log(`Processing subject: ${subject}`);
    updatedLearnContent[subject] = currentLearnContent[subject].map((text, index) => {
        if (!mergedSubjects[subject]) return text;

        for (const subKey in mergedSubjects[subject]) {
            const questions = mergedSubjects[subject][subKey];
            for (const q of questions) {
                if (!q.explain) continue;

                // Match by text similarity (ignore whitespace and half-width/full-width if possible, but let's start simple)
                const plainExplain = q.explain.replace(/\[\[image:.*?\]\]/g, '').replace(/\s/g, '');
                const plainText = text.replace(/\[\[image:.*?\]\]/g, '').replace(/\s/g, '');

                if (plainExplain.includes(plainText.substring(0, 30)) || plainText.includes(plainExplain.substring(0, 30))) {
                    return q.explain;
                }
            }
        }
        return text;
    });
}

const outputLearn = `export const LEARN_CONTENT = ${JSON.stringify(updatedLearnContent, null, 2)};\n`;
fs.writeFileSync(LEARN_JS, outputLearn);
console.log('Successfully updated src/learn.js');

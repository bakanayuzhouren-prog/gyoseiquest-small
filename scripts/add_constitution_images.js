/**
 * Constitution Image Mapping Script
 * Maps images like "14-230.png" to the 14th question of Constitution.
 */

const fs = require('fs');
const path = require('path');

const QUEST_FILE = path.join(__dirname, '..', 'src', 'questions.js');
const { PATHS } = require('./tempImagesPaths');
const TEMP_DIR = PATHS.learnKenpou;

if (!fs.existsSync(TEMP_DIR)) {
    console.error('Temp dir not found');
    process.exit(1);
}

const files = fs.readdirSync(TEMP_DIR).filter(f => f.match(/^\d+-230.*\.png$/));

if (files.length === 0) {
    console.log('No matching files found in temp_images');
    process.exit(0);
}

let content = fs.readFileSync(QUEST_FILE, 'utf8');

// Find the Constitution block
// "憲法": {
//   "憲法": [
const constStartRegex = /"憲法":\s*\{\s*"憲法":\s*\[/;
const constMatch = content.match(constStartRegex);

if (!constMatch) {
    console.error('Constituion block not found');
    process.exit(1);
}

const startIndex = constMatch.index + constMatch[0].length;
const afterStart = content.substring(startIndex);

// We need to parse individual question objects. 
// Since JSON format in JS file is standard, we can try to find objects by counting braces or simple splitting?
// Splitting by `{` might be dangerous if text contains it.
// Let's use a simple state machine to find the objects in the array.

let depth = 0;
let arrayDepth = 1; // We are inside the array `[`
let currentObjStart = -1;
let questionIndices = []; // Stores { start, end } for each question object

for (let i = 0; i < afterStart.length; i++) {
    const char = afterStart[i];
    if (char === '{') {
        if (depth === 0) currentObjStart = i;
        depth++;
    } else if (char === '}') {
        depth--;
        if (depth === 0) {
            questionIndices.push({ start: startIndex + currentObjStart, end: startIndex + i + 1 });
        }
    } else if (char === ']') {
        if (depth === 0) break; // End of questions array
    }
}

console.log(`Found ${questionIndices.length} questions in Constitution.`);

let updates = [];

files.forEach(file => {
    const match = file.match(/^(\d+)-230(.*)\.png$/);
    if (!match) return;

    const id = parseInt(match[1]);
    const index = id - 1; // 0-based index

    if (index < 0 || index >= questionIndices.length) {
        console.warn(`Index ${index} out of bounds for file ${file}`);
        return;
    }

    const imageName = path.basename(file, '.png');
    const tag = `[[image:${imageName}]]`;

    updates.push({ index, tag, imageName });
});

// Sort updates by index descending to not mess up offsets
updates.sort((a, b) => b.index - a.index);

let updatedContent = content;

updates.forEach(({ index, tag, imageName }) => {
    const { start, end } = questionIndices[index];
    // Extract the question object string
    // We need to find "explain": "..." inside this range in the ORIGINAL content (updatedContent changes, but offsets are based on original if we process one by one? No, valid only if descending)
    // Wait, questionIndices are based on `content`. If I modify `updatedContent`, the indices shift.
    // Descedning order is safe.

    const qRaw = content.substring(start, end);

    // Check if tag exists
    if (qRaw.includes(tag)) {
        console.log(`Skipping ${imageName} (already exists)`);
        return;
    }

    // Find explain field
    // "explain": "..."
    // regex: /"explain":\s*"/ 
    const explainMatch = qRaw.match(/"explain":\s*"/);
    if (!explainMatch) {
        console.warn(`Explain field not found for Q${index + 1}`);
        return;
    }

    // Calculate absolute position of insertion point
    const insertPos = start + explainMatch.index + explainMatch[0].length;

    // Insert tag + newline
    const insertion = `${tag}\\n\\n`;

    // We need to adjust `updatedContent`.
    // Since we are iterating descending, `start` is valid for `updatedContent` as long as we only touched text *after* `start`.
    // But we are touching text *at* `start` (inside the object).
    // So descending order works.

    const before = updatedContent.substring(0, insertPos);
    const after = updatedContent.substring(insertPos);

    updatedContent = before + insertion + after;
    console.log(`Added ${tag} to Q${index + 1}`);
});

if (content !== updatedContent) {
    fs.writeFileSync(QUEST_FILE, updatedContent, 'utf8');
    console.log('Updated questions.js');
} else {
    console.log('No changes made.');
}

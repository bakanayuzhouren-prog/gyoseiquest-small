const fs = require('fs');

const questionsContent = fs.readFileSync('src/questions.js', 'utf8');
const learnContent = fs.readFileSync('src/learn.js', 'utf8');

// Find start and end of Constitution in questions.js
const startMarker = '"憲法": [';
const startIndex = questionsContent.indexOf(startMarker);
if (startIndex === -1) {
    console.log('Constitution section not found in questions.js');
    process.exit(1);
}

// Find bracket balance
let braceCount = 0;
let arrayStartIndex = startIndex + startMarker.length - 1; // pointing to '['
let arrayEndIndex = -1;
let openBrackets = 0;

for (let i = arrayStartIndex; i < questionsContent.length; i++) {
    if (questionsContent[i] === '[') openBrackets++;
    if (questionsContent[i] === ']') {
        openBrackets--;
        if (openBrackets === 0) {
            arrayEndIndex = i;
            break;
        }
    }
}

const kenpouSection = questionsContent.substring(arrayStartIndex + 1, arrayEndIndex);

// Simple regex to split objects - this might be fragile if objects contain nested arrays but better than nothing
// Actually, let's use a more robust object parser
const objects = [];
let current = '';
let depth = 0;
for (let i = 0; i < kenpouSection.length; i++) {
    const char = kenpouSection[i];
    if (char === '{') {
        if (depth === 0) current = '';
        depth++;
    }
    current += char;
    if (char === '}') {
        depth--;
        if (depth === 0) {
            objects.push(current);
            current = '';
        }
    }
}

console.log(`Total Objects in Constitution: ${objects.length}`);

// Scan first 20 objects
for (let i = 0; i < Math.min(objects.length, 20); i++) {
    const objStr = objects[i];
    const textMatch = objStr.match(/"text":\s*"([^"]+)"/);
    const imageMatches = objStr.match(/\[\[image:([^\]]+)\]\]/g);
    
    console.log(`--- Index ${i} ---`);
    console.log(`Text: ${textMatch ? textMatch[1].substring(0, 50) + '...' : 'N/A'}`);
    console.log(`Images: ${imageMatches ? imageMatches.join(', ') : 'None'}`);
}

// Check for 4-230 specifically
objects.forEach((obj, idx) => {
    if (obj.includes('4-230')) {
        console.log(`\n!!! 4-230 found at Index ${idx} !!!`);
    }
});

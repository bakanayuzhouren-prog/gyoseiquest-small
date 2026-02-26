const fs = require('fs');
const content = fs.readFileSync('src/questions.js', 'utf8');

// Precise marker search
const subjectMarker = '"憲法": [';
const startIdx = content.indexOf(subjectMarker);
if (startIdx === -1) { console.log("Not found"); process.exit(1); }

let objects = [];
let depth = 0;
let arrayDepth = 0;
let current = '';
let isInsideArray = false;

for (let i = startIdx + subjectMarker.length - 1; i < content.length; i++) {
    const char = content[i];
    if (char === '[') arrayDepth++;
    if (char === ']') {
        arrayDepth--;
        if (arrayDepth === 0) break;
    }
    
    if (arrayDepth === 1) { // Inside the main Constitution array
        if (char === '{') {
            if (depth === 0) current = '';
            depth++;
        }
        current += char;
        if (char === '}') {
            depth--;
            if (depth === 0) {
                objects.push(current);
                if (objects.length >= 20) break;
            }
        }
    }
}

objects.forEach((obj, idx) => {
    const text = (obj.match(/"text":\s*"([^"]+)"/) || [null, "N/A"])[1];
    const explainImages = (obj.match(/"explain":\s*"([^"]+)"/) || [null, ""])[1].match(/\[\[image:([^\]]+)\]\]/g) || [];
    const chunkImages = (obj.match(/"chunks":\s*\[([\s\S]+?)\]/) || [null, ""])[1].match(/\[\[image:([^\]]+)\]\]/g) || [];
    const slotImages = (obj.match(/"slots":\s*\[([\s\S]+?)\]/) || [null, ""])[1].match(/\[\[image:([^\]]+)\]\]/g) || [];

    console.log(`[Index ${idx}]`);
    console.log(`  Text    : ${text.substring(0, 40)}...`);
    console.log(`  Explain : ${explainImages.join(', ') || 'None'}`);
    console.log(`  Chunks  : ${chunkImages.join(', ') || 'None'}`);
    console.log(`  Slots   : ${slotImages.join(', ') || 'None'}`);
});

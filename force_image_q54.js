const fs = require('fs');
const path = 'c:/dev/gyosei-quest-small/src/questions.js';
let content = fs.readFileSync(path, 'utf8');

// Find Q54 by refId
const refId = '"refId": "civil_limitation_capacity_demand"';
const refIndex = content.indexOf(refId);

if (refIndex === -1) {
    console.error('Q54 not found by refId');
    process.exit(1);
}

// Find the START of the object containing this refId.
// We look backwards for '{'
const objectStart = content.lastIndexOf('{', refIndex);

// Find the 'explain' field within this object.
// It should be between objectStart and refIndex.
const explainKey = '"explain":';
const explainKeyIndex = content.lastIndexOf(explainKey, refIndex);

if (explainKeyIndex === -1 || explainKeyIndex < objectStart) {
    console.error('Explain key not found in Q54 object');
    process.exit(1);
}

// Check what's currently there
const explainValueStart = content.indexOf('"', explainKeyIndex + explainKey.length) + 1;
// Find the end quote. Since the value might contain escaped quotes, we need to be careful.
// However, since it's a JSON string, it ends with a non-escaped quote followed by a comma or closing brace.
// Let's use a regex or just scan.
let explainValueEnd = explainValueStart;
while (true) {
    explainValueEnd = content.indexOf('"', explainValueEnd + 1);
    if (content[explainValueEnd - 1] !== '\\') { // Not escaped
        break;
    }
}

const currentExplain = content.substring(explainValueStart, explainValueEnd);
console.log('Current explain:', currentExplain);

// Replace it!
const newExplain = '[[image:summary_diagram]]';
const newContent = content.substring(0, explainValueStart) + newExplain + content.substring(explainValueEnd);

fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully enforced image-only explain for Q54');

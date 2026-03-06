const fs = require('fs');
const filePath = 'c:/dev/gyosei-quest-small/src/questions.js';
let content = fs.readFileSync(filePath, 'utf8');

// Find the LAST valid property or array end, and then the final };
// For safety, let's find the last occurrence of "      "order": 999\n    }\n  ]\n};"
const tailPattern = /"order": \d+\s*}\s*]\s*}/;
const match = content.match(tailPattern);

if (match) {
    // If we found the pattern, we should find the VERY LAST one that looks like a real ending.
    const indices = [];
    let pos = content.indexOf('};');
    while (pos !== -1) {
        indices.push(pos);
        pos = content.indexOf('};', pos + 1);
    }

    // The real end is likely near the last few characters.
    // Let's just find the last occurrence of '};' and truncate there.
    const lastIndex = indices[indices.length - 1];
    if (lastIndex !== -1) {
        const fixed = content.substring(0, lastIndex + 2);
        fs.writeFileSync(filePath, fixed, 'utf8');
        console.log('File tail cleaned up at index ' + lastIndex);
    }
} else {
    console.log('Tail pattern not found precisely, performing fallback cleanup');
    const lastIndex = content.lastIndexOf('};');
    if (lastIndex !== -1) {
        const fixed = content.substring(0, lastIndex + 2);
        fs.writeFileSync(filePath, fixed, 'utf8');
        console.log('Fallback cleanup at last }; index ' + lastIndex);
    }
}


const fs = require('fs');
const path = require('path');

const targetPath = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

try {
    console.log(`Reading file: ${targetPath}`);
    let content = fs.readFileSync(targetPath, 'utf8');

    // Pattern to replace full-width to half-width
    const newContent = content.replace(/４．実践/g, '4.実践').replace(/【実践】/g, '4.実践');

    if (newContent !== content) {
        console.log("Saving changes...");
        fs.writeFileSync(targetPath, newContent);
        console.log("Successfully standardized section headers to '4.実践'.");
    } else {
        console.log("No matches found to rename.");
    }

} catch (err) {
    console.error("An error occurred:");
    console.error(err);
    process.exit(1);
}

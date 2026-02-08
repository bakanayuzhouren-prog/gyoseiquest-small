
const fs = require('fs');
const path = require('path');

const targetPath = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

try {
    const content = fs.readFileSync(targetPath, 'utf8');
    const lines = content.split('\n');

    // Line 5447 (0-indexed 5446) is '      }'
    // Line 5448 (0-indexed 5447) is '      {'
    if (lines[5446].trim() === '}' && lines[5447].trim() === '{') {
        lines[5446] = lines[5446] + ',';
        console.log("Added comma to line 5447");
    } else {
        console.log("Lines don't match expected pattern. Checking nearby...");
        for (let i = 5440; i < 5460; i++) {
            console.log(`${i + 1}: [${lines[i]}]`);
        }
        // Fallback search
        for (let i = 5440; i < 5460; i++) {
            if (lines[i].trim() === '}' && lines[i + 1].trim() === '{') {
                lines[i] = lines[i] + ',';
                console.log(`Added comma to line ${i + 1}`);
                break;
            }
        }
    }

    fs.writeFileSync(targetPath, lines.join('\n'));
    console.log("Finished fix script");

} catch (err) {
    console.error(err);
}

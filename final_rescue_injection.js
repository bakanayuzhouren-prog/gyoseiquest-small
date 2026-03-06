const fs = require('fs');

const backupPath = 'c:/dev/gyosei-quest-small/src/questions.js.backup_ai';
const bukkenDataPath = 'c:/dev/gyosei-quest-small/temp_bukken_generated.js'; // This is just the array content
const targetPath = 'c:/dev/gyosei-quest-small/src/questions.js';

try {
    console.log(`Restoring from: ${backupPath}`);
    let content = fs.readFileSync(backupPath, 'utf8');

    // Ensure the file is not corrupted at the end (Step 641 showed some mess)
    const lastCurly = content.lastIndexOf('};');
    if (lastCurly !== -1) {
        content = content.substring(0, lastCurly + 2);
    } else {
        // If no };, append it (but it should be there)
        if (!content.trim().endsWith('};')) content += '\n};';
    }

    // Read bukken data
    const bukkenArray = fs.readFileSync(bukkenDataPath, 'utf8');

    // We need to inject "民法": { "民法物権": [ ... ] }
    // Check if "民法": exists
    const minpoIndex = content.indexOf('"民法":');

    let newContent;
    if (minpoIndex === -1) {
        // If "民法" doesn't exist, add it before the last };
        const insertPos = content.lastIndexOf('};');
        const minpoSection = `,\n  "民法": {\n    "民法物権": [\n${bukkenArray}\n    ]\n  }`;
        newContent = content.substring(0, insertPos).trim() + minpoSection + '\n};';
    } else {
        // If it exists, we need to find "民法物権": inside it or add it
        // To be safe, let's just replace the whole "民法" object or just the bukken array.
        // Given the previous jumble, let's find the end of "民法": { ... }
        // A simple way: find next "}," or the end of the object.
        // For now, let's just append "民法物権" if missing, or replace.

        // EASIER: Since we are starting from a CLEAN backup (backup_ai), 
        // let's just reconstruct the MINPO section or add to it.

        // Let's see what's after "民法": {
        const minpoOpen = content.indexOf('{', minpoIndex);
        // If there's already data, we can try to inject.
        // But since backup_ai might not have "民法" at all or it's empty, let's just make it right.

        // Find "民法物権": inside "民法"
        const bukkenKey = '"民法物権":';
        const bukkenIndex = content.indexOf(bukkenKey, minpoIndex);

        if (bukkenIndex === -1) {
            // Add inside "民法": {
            newContent = content.substring(0, minpoOpen + 1) + `\n    "民法物権": [\n${bukkenArray}\n    ],` + content.substring(minpoOpen + 1);
        } else {
            // Replace existing bukken array
            const arrayStart = content.indexOf('[', bukkenIndex);
            // Find matching ]
            let balance = 1;
            let arrayEnd = -1;
            for (let i = arrayStart + 1; i < content.length; i++) {
                if (content[i] === '[') balance++;
                else if (content[i] === ']') balance--;
                if (balance === 0) {
                    arrayEnd = i;
                    break;
                }
            }
            if (arrayEnd !== -1) {
                newContent = content.substring(0, arrayStart) + '[\n' + bukkenArray + '\n    ]' + content.substring(arrayEnd + 1);
            } else {
                throw new Error('Could not find end of bukken array');
            }
        }
    }

    // Final WordBank fix for the whole file
    newContent = newContent.replace(/"wordBank":\s*\[\]/g, '"wordBank": ""');

    console.log(`Writing to: ${targetPath}`);
    fs.writeFileSync(targetPath, newContent, 'utf8');
    console.log('Success! Questions restored and fixed.');

} catch (err) {
    console.error('CRITICAL ERROR:', err);
    process.exit(1);
}

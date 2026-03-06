const fs = require('fs');
const path = require('path');

const backupPath = 'c:/dev/gyosei-quest-small/src/questions.js.backup';
const targetPath = 'c:/dev/gyosei-quest-small/src/questions.js';

try {
    console.log(`Reading backup: ${backupPath}`);
    const content = fs.readFileSync(backupPath, 'utf8');
    console.log(`Backup size: ${content.length} characters`);
    console.log(`Backup lines: ${content.split('\n').length}`);

    console.log('Applying wordBank fix...');
    const fixed = content.replace(/"wordBank":\s*\[\]/g, '"wordBank": ""');
    console.log(`Fixed lines: ${fixed.split('\n').length}`);

    console.log(`Writing to: ${targetPath}`);
    fs.writeFileSync(targetPath, fixed, 'utf8');
    console.log('Success!');
} catch (err) {
    console.error('Error during restoration:', err);
    process.exit(1);
}

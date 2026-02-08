const fs = require('fs');
const path = require('path');

const targetPath = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

try {
    console.log(`Reading file: ${targetPath}`);
    let content = fs.readFileSync(targetPath, 'utf8');

    // The previous script turned "": "", into ": ", for empty strings.
    // We need to find ": ", and turn it back to ": "",

    // We will be specific to avoids false positives.
    // Matches "key": ",
    const pattern = /("explain"|"wordBank"|"memo"|"refId"):\s*",/g;

    // Count occurrences
    const count = (content.match(pattern) || []).length;
    console.log(`Found ${count} broken empty strings.`);

    // Replace
    content = content.replace(pattern, '$1: "",');

    console.log("Saving back to file...");
    fs.writeFileSync(targetPath, content);
    console.log("Successfully restored empty strings in src/questions.js");

} catch (err) {
    console.error("An error occurred:");
    console.error(err);
    process.exit(1);
}

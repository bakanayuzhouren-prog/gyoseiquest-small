const fs = require('fs');
const path = require('path');

const targetPath = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

try {
    console.log(`Reading file: ${targetPath}`);
    let content = fs.readFileSync(targetPath, 'utf8');

    // The error pattern is "explain": "...\"",",
    // where the extra " comes before the ,
    // Actually it's just two " together at the end of the string.

    // We look for "" followed by a comma and whitespace or wordBank.
    const pattern = /""(,\s*"\w+":)/g;
    const count = (content.match(pattern) || []).length;
    console.log(`Found ${count} occurrences of extra quotes.`);

    content = content.replace(pattern, '"$1');

    console.log("Saving back to file...");
    fs.writeFileSync(targetPath, content);
    console.log("Successfully fixed src/questions.js syntax.");

} catch (err) {
    console.error("An error occurred:");
    console.error(err);
    process.exit(1);
}

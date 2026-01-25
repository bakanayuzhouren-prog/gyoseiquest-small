const fs = require('fs');
const path = require('path');

const TARGET_FILE = path.join(__dirname, '../src/questions.js');

const resourcesExport = `
export const RESOURCES = {};
`;

try {
    let content = fs.readFileSync(TARGET_FILE, 'utf-8');

    if (content.includes("export const RESOURCES")) {
        console.log("RESOURCES export already exists. Skipping.");
        process.exit(0);
    }

    // Append to end
    fs.appendFileSync(TARGET_FILE, resourcesExport, 'utf-8');
    console.log("Successfully appended RESOURCES export.");

} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}

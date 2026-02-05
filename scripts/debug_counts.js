
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/questions.js');
const content = fs.readFileSync(filePath, 'utf8');

// The file exports SUBJECTS, needing to extract the JSON part.
// It looks like `export const SUBJECTS = { ... };`
// I'll regex capture the JSON object string.
const match = content.match(/export const SUBJECTS = (\{[\s\S]*?\});/);

if (!match) {
    console.error("Could not find SUBJECTS object.");
    process.exit(1);
}

const subjectsData = JSON.parse(match[1]);
const adminLaw = subjectsData['行政法'];

if (!adminLaw) {
    console.log("No Administrative Law found.");
} else {
    // Check '行政手続法'
    const procLaw = adminLaw['行政手続法'];
    if (!procLaw) {
        console.log("No Administrative Procedure Act data found.");
    } else {
        const total = procLaw.length;
        const bonus = procLaw.filter(q => q.isBonus).length;
        const normal = procLaw.filter(q => !q.isBonus).length;

        console.log(`Total Questions: ${total}`);
        console.log(`Bonus Questions: ${bonus}`);
        console.log(`Normal Questions: ${normal}`);
    }
}

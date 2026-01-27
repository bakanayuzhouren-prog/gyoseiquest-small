const fs = require('fs');
const path = require('path');

const QUESTIONS_FILE = path.join(__dirname, '../src/questions.js');

function loadData() {
    const content = fs.readFileSync(QUESTIONS_FILE, 'utf8');
    const subjectsMatch = content.match(/export const SUBJECTS = ({[\s\S]+?});/);
    if (!subjectsMatch) throw new Error("Could not find SUBJECTS");
    const subjectsJson = subjectsMatch[1];
    return JSON.parse(subjectsJson);
}

const subjects = loadData();
if (subjects["行政法"]) {
    console.log("Keys under 行政法:");
    Object.keys(subjects["行政法"]).forEach(k => console.log(k));
} else {
    console.log("行政法 key not found");
}

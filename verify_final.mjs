import fs from 'fs';
import { SUBJECTS } from './src/questions.js';

let report = "--- Final Restoration Verification ---\n";
for (const majorKey in SUBJECTS) {
    for (const subKey in SUBJECTS[majorKey]) {
        const count = SUBJECTS[majorKey][subKey].length;
        report += `${majorKey} -> ${subKey}: ${count} items\n`;
    }
}

fs.writeFileSync('verification_results.txt', report);
console.log("Verification report written to verification_results.txt");

import fs from 'fs';
import { SUBJECTS } from './src/questions.js';

let report = "--- Hybrid Ultimate Restoration: Final Verification Results ---\n";
let total = 0;
for (const majorKey in SUBJECTS) {
    for (const subKey in SUBJECTS[majorKey]) {
        const count = SUBJECTS[majorKey][subKey].length;
        report += `${majorKey} -> ${subKey}: ${count} items\n`;
        total += count;
    }
}
report += `\nTOTAL QUESTIONS: ${total}\n`;

console.log(report);
fs.writeFileSync('final_victory_report.txt', report);

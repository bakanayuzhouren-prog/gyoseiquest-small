import { SUBJECTS } from './src/questions.js';

const minpoSoron = SUBJECTS["民法"]["民法総論"];

console.log("Checking Questions 20-30 (0-indexed indices 19-29):");

for (let i = 19; i <= 30; i++) {
    const q = minpoSoron[i];
    if (q) {
        console.log(`\nIndex ${i} (Question ${i + 1}):`);
        console.log(`Text: ${q.text.substring(0, 50)}...`);
        console.log(`Has Explain: ${!!q.explain}`);
        if (q.explain) {
            console.log(`Explain start: ${q.explain.substring(0, 50)}...`);
        }
    } else {
        console.log(`\nIndex ${i}: Undefined`);
    }
}

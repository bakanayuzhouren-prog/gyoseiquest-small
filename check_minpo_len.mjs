import { SUBJECTS } from './src/questions.js';

const minpoSoron = SUBJECTS["民法"]["民法総論"];
console.log(`Length of SUBJECTS["民法"]["民法総論"]: ${minpoSoron.length}`);

console.log("\nLast 5 items in src/questions.js (民法総論):");
minpoSoron.slice(-5).forEach((q, i) => {
    console.log(`Index ${minpoSoron.length - 5 + i}: ${q.text.substring(0, 50)}...`);
});

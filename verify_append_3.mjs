import { SUBJECTS } from './src/questions.js';

const minpoSoron = SUBJECTS["民法"]["民法総論"];
console.log(`Current length: ${minpoSoron.length}`);

for (let i = 40; i < minpoSoron.length; i++) {
    const q = minpoSoron[i];
    console.log(`Index ${i}: ${q.text.substring(0, 50)}...`);
}

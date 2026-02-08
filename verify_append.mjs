import { SUBJECTS } from './src/questions.js';

const minpoSoron = SUBJECTS["民法"]["民法総論"];
console.log(`New length of SUBJECTS["民法"]["民法総論"]: ${minpoSoron.length}`);

for (let i = 30; i < minpoSoron.length; i++) {
    const q = minpoSoron[i];
    console.log(`Index ${i}: ${q.text.substring(0, 50)}...`);
}

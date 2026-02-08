import { SUBJECTS } from './src/questions.js';
const minpoSoron = SUBJECTS["民法"]["民法総論"];
minpoSoron.forEach((q, i) => {
    console.log(`${i}: ${q.text.substring(0, 80)}`);
});

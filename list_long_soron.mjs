import { SUBJECTS } from './src/questions.js';
const minpoSoron = SUBJECTS["民法"]["民法総論"];
for (let i = 0; i < Math.min(minpoSoron.length, 100); i++) {
    console.log(`${i}: ${minpoSoron[i].text.substring(0, 80)}`);
}

import { SUBJECTS } from './src/questions.js';

const minpoSoron = SUBJECTS["民法"]["民法総論"];

console.log("Listing some questions from Civil Law General Provisions:");
for (let i = 24; i <= 28; i++) {
    if (minpoSoron[i]) {
        console.log(`Index ${i}: ${minpoSoron[i].text.substring(0, 80)}`);
    }
}
for (let i = 46; i <= 50; i++) {
    if (minpoSoron[i]) {
        console.log(`Index ${i}: ${minpoSoron[i].text.substring(0, 80)}`);
    }
}

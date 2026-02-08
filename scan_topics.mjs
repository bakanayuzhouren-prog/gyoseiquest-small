import { SUBJECTS } from './src/questions.js';

const minpoSoron = SUBJECTS["民法"]["民法総論"];

minpoSoron.forEach((q, i) => {
    if (q.text.includes("錯誤") || q.text.includes("乱用") || q.text.includes("代理")) {
        console.log(`Index ${i}: ${q.text.substring(0, 50)}...`);
    }
});

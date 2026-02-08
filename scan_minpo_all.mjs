import { SUBJECTS } from './src/questions.js';

const minpo = SUBJECTS["民法"];

for (const category in minpo) {
    minpo[category].forEach((q, i) => {
        if (q.text.includes("錯誤") || q.text.includes("乱用") || q.text.includes("代理")) {
            console.log(`${category} [${i}]: ${q.text.substring(0, 50)}`);
        }
    });
}

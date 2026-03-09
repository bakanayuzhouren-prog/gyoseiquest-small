import { LEARN_CONTENT } from './src/learn.js';
import { SUBJECTS } from './src/questions.js';

const qAdmin = SUBJECTS["行政法"] || {};
console.log("=== Questions (src/questions.js) ===");
for (const k in qAdmin) {
    console.log(`${k}: ${qAdmin[k].length}`);
}

console.log("\n=== Learn (src/learn.js) ===");
const targetKeys = ["行政法総論", "行政手続法", "行政不服審査法", "行政事件訴訟法", "国家賠償法", "地方自治法", "多肢選択式", "総合問題"];
for (const k of targetKeys) {
    if (LEARN_CONTENT[k]) {
        console.log(`${k}: ${LEARN_CONTENT[k].length}`);
    } else {
        // maybe try other keys
    }
}
// Print all keys in LEARN_CONTENT to be sure
console.log("\nAll Learn Keys:");
console.log(Object.keys(LEARN_CONTENT).join(", "));

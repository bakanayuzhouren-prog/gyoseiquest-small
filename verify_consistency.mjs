import { LEARN_CONTENT } from './src/learn.js';
import { SUBJECTS } from './src/questions.js';

console.log('--- Consistency Verification: Questions vs Learn ---');

const learnKenpou = LEARN_CONTENT["憲法"] || [];
const questionsKenpou = SUBJECTS["憲法"]["憲法"] || [];

console.log(`Learn Content (Constitution): ${learnKenpou.length} items`);
console.log(`Questions Content (Constitution): ${questionsKenpou.length} items`);

if (learnKenpou.length !== questionsKenpou.length) {
    console.error('CRITICAL: Count mismatch between Questions and Learn content!');
}

// Check first 5 items mapping
for (let i = 0; i < Math.min(5, learnKenpou.length, questionsKenpou.length); i++) {
    const q = questionsKenpou[i];
    const l = learnKenpou[i];
    console.log(`\nItem ${i + 1}:`);
    console.log(`  Q Text: ${q.text.substring(0, 50)}...`);
    console.log(`  L Text: ${l.substring(0, 50)}...`);

    // Check image tags
    const qTag = q.explain.match(/\[\[image:\d+-\d+.*?\]\]/);
    const lTag = l.match(/\[\[image:\d+-\d+.*?\]\]/);
    console.log(`  Q Image Tag: ${qTag ? qTag[0] : 'MISSING'}`);
    console.log(`  L Image Tag: ${lTag ? lTag[0] : 'MISSING'}`);
}

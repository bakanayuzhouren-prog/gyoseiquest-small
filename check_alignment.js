const learn = require('./src/learn.js').LEARN_CONTENT;
const questions = require('./src/questions.js').SUBJECTS;

const learnKenpo = learn['憲法'];
const questionsKenpo = questions['憲法']['憲法'];

console.log(`Learn Kenpo items: ${learnKenpo.length}`);
console.log(`Questions Kenpo items: ${questionsKenpo.length}`);

let mismatch = 0;
for (let i = 0; i < Math.max(learnKenpo.length, questionsKenpo.length); i++) {
    const l = learnKenpo[i] ? learnKenpo[i].split('[[LINK:')[0] : 'MISSING';
    const q = questionsKenpo[i] ? questionsKenpo[i].text : 'MISSING';

    if (l !== q) {
        console.log(`Mismatch at Index ${i}:`);
        console.log(`  Learn: ${l.substring(0, 50)}...`);
        console.log(`  Quest: ${q.substring(0, 50)}...`);
        mismatch++;
        if (mismatch > 10) break;
    }
}

if (mismatch === 0) {
    console.log('SUCCESS: All items aligned!');
} else {
    console.log(`FAILURE: ${mismatch} mismatches found.`);
}

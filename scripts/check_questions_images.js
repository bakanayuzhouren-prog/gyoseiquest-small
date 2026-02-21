const { SUBJECTS } = require('../src/questions.js');

const q45 = SUBJECTS['憲法'][44]; // Index 44 is Q45
const q59 = SUBJECTS['憲法'][58]; // Index 58 is Q59

console.log('--- Q45 ---');
console.log('ID:', q45.id);
console.log('Explain:', q45.explain);
console.log('Image in Explain:', q45.explain.match(/\[\[image:.*?\]\]/));

console.log('\n--- Q59 ---');
console.log('ID:', q59.id);
console.log('Explain:', q59.explain);
console.log('Image in Explain:', q59.explain.match(/\[\[image:.*?\]\]/));

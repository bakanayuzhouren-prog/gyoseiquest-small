import { learningData } from './src/learn.js';
import { questionsData } from './src/questions.js';

const cats = [
    'admin_law_general',
    'admin_procedure_law',
    'admin_appeal_law',
    'admin_litigation_law',
    'state_redress_law',
    'local_autonomy_law',
    'comprehensive_admin'
];

const results = {};
for (const c of cats) {
    results[c] = {
        questions: questionsData[c]?.length || 0,
        learn: learningData[c]?.length || 0
    };
}
console.log(JSON.stringify(results, null, 2));

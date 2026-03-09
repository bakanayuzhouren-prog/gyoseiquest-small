import * as learn from './src/learn.js';
import * as questions from './src/questions.js';

console.log("=== questions.js ===");
for (const [key, val] of Object.entries(questions)) {
    if (Array.isArray(val)) {
        console.log(`${key}: ${val.length}`);
    }
}

console.log("=== learn.js ===");
for (const [key, val] of Object.entries(learn)) {
    if (Array.isArray(val)) {
        console.log(`${key}: ${val.length}`);
    }
}

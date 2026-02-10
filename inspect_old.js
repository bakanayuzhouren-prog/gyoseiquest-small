const fs = require('fs');
const content = fs.readFileSync('old_learn.js', 'utf8');

// Use index of the second "憲法": [
const firstIndex = content.indexOf('"憲法": [');
const secondIndex = content.indexOf('"憲法": [', firstIndex + 1);

const targetIndex = secondIndex !== -1 ? secondIndex : firstIndex;
console.log('Target index:', targetIndex);

const sub = content.substring(targetIndex);
const match = sub.match(/\[([\s\S]*?)\]/);
if (match) {
    const lines = match[1].trim().split('\n').filter(l => l.trim().startsWith('"'));
    console.log('Count:', lines.length);
    // Print first 5 and last 5 questions
    console.log('First 5:');
    console.log(lines.slice(0, 5).join('\n'));
    console.log('Last 5:');
    console.log(lines.slice(-5).join('\n'));
} else {
    console.log('Not found');
}

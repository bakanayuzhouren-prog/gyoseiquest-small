const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/questions.js');
let content = fs.readFileSync(filePath, 'utf8');

// Target string (appears in Q7, Q8, Q9)
// Note: Q6 has images prefixing this, so it won't match.
const target = '"explain": "1. 自由権的基本権';
const replacement = '"explain": "[[image:6-230-2]]\\n\\n[[image:6-230-1]]\\n\\n1. 自由権的基本権';

// Check how many occurrences
const count = (content.match(new RegExp('\"explain\": \"1. 自由権的基本権', 'g')) || []).length;
console.log(`Found ${count} occurrences to replace.`);

if (count > 0) {
    const newContent = content.split(target).join(replacement);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Successfully updated src/questions.js');
} else {
    console.log('No occurrences found. Might be already updated.');
}

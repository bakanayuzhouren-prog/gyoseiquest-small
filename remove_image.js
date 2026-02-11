const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');

console.log('Removing [[image:rigid_constitution]] from src/questions.js...');

if (rawContent.includes('[[image:rigid_constitution]]')) {
    const updatedContent = rawContent.replace('[[image:rigid_constitution]]', '');
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log('Successfully removed the image tag!');
} else {
    console.log('Image tag not found.');
}

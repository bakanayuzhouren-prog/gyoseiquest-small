const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');

console.log('Searching for image tags in src/questions.js...');

// Search for anything matching [[image:...]] near the start of the Constitution section
const constitutionStart = rawContent.indexOf('"憲法": [');
if (constitutionStart === -1) {
    console.log('Could not find Constitution section.');
    process.exit(1);
}

const snippet = rawContent.substring(constitutionStart, constitutionStart + 1000);
console.log('Snippet around Constitution start:');
console.log(snippet);

if (rawContent.includes('[[image:rigid_constitution]]')) {
    const updatedContent = rawContent.replace('[[image:rigid_constitution]]', '');
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log('Successfully removed [[image:rigid_constitution]]!');
} else {
    // Try regex
    const regex = /\[\[image:rigid_constitution\]\]/g;
    if (regex.test(rawContent)) {
        const updatedContent = rawContent.replace(regex, '');
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log('Successfully removed [[image:rigid_constitution]] via regex!');
    } else {
        console.log('Image tag not found even with regex.');
    }
}

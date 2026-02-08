const fs = require('fs');

const brokenLine = '"explain": ""後見監督人の主な仕事は';
const fixedLine = '"explain": "後見監督人の主な仕事は';

try {
    let content = fs.readFileSync('src/questions.js', 'utf8');

    if (content.indexOf(brokenLine) === -1) {
        console.error('Target broken line not found');
        process.exit(1);
    }

    content = content.replace(brokenLine, fixedLine);

    fs.writeFileSync('src/questions.js', content, 'utf8');
    console.log('Successfully fixed syntax error in src/questions.js');

} catch (e) {
    console.error('Error fixing file:', e);
    process.exit(1);
}

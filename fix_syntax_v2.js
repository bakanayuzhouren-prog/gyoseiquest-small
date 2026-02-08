const fs = require('fs');

try {
    let content = fs.readFileSync('src/questions.js', 'utf8');

    // Regex to find "explain": ""SOMETHING
    // We want to replace "" with "
    // Be careful not to match empty explain "explain": "" if that's valid (though here it's followed by text)

    // The error line starts with "explain": ""後見監督人の主な仕事は

    const regex = /"explain":\s*""(後見監督人の主な仕事は)/;

    if (!regex.test(content)) {
        console.error('Target pattern not found with regex');
        // Debug: print what we find around that area
        const idx = content.indexOf('後見監督人の主な仕事は');
        if (idx !== -1) {
            console.log('Found text at index:', idx);
            console.log('Surrounding text:', content.substring(idx - 20, idx + 20));
        }
        process.exit(1);
    }

    content = content.replace(regex, '"explain": "$1');

    fs.writeFileSync('src/questions.js', content, 'utf8');
    console.log('Successfully fixed syntax error in src/questions.js (v2)');

} catch (e) {
    console.error('Error fixing file:', e);
    process.exit(1);
}

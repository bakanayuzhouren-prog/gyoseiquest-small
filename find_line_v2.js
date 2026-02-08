const fs = require('fs');
try {
    const content = fs.readFileSync('src/questions.js', 'utf8');
    const lines = content.split('\n');
    console.log('Total lines:', lines.length);

    lines.forEach((line, index) => {
        // Check for Main Subject Keys
        if (line.match(/^\s*"民法":\s*\{/)) {
            console.log(`MATCH KEY [民法] at line ${index + 1}: ${line.trim()}`);
        }
        // Check for "Supervisor of Guardian" text to find the specific question
        if (line.includes('後見監督人')) {
            console.log(`MATCH TEXT [後見監督人] at line ${index + 1}`);
        }
    });
} catch (e) {
    console.error(e);
}

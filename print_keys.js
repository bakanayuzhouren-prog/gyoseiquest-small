const fs = require('fs');
try {
    let content = fs.readFileSync('src/questions.js', 'utf8');
    content = content.replace(/export const/g, 'const');
    // Simple eval might fail due to other exports or complex logic.
    // Instead, let's extract keys using regex if eval fails, or try eval.
    // Actually, let's try to eval just the SUBJECTS definition.

    // Find start of SUBJECTS
    const start = content.indexOf('const SUBJECTS = {');
    if (start === -1) {
        console.log('SUBJECTS not found');
    } else {
        // We can't easily parse partial js.
        // Let's just print the first 50 lines of SUBJECTS definition using substring.
        console.log(content.substring(start, start + 500));
    }
} catch (e) {
    console.error(e);
}

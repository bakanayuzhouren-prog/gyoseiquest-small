import fs from 'fs';

try {
    const cur = fs.readFileSync('src/questions.js', 'utf8');
    const bak = fs.readFileSync('src/questions.js.backup', 'utf8');

    // Find RESOURCES
    const resStart = bak.indexOf('export const RESOURCES =');
    if (resStart === -1) throw new Error("RESOURCES not found in backup");

    let resEnd = bak.indexOf('export const', resStart + 10);
    if (resEnd === -1) {
        // RESOURCES is the last export
        resEnd = bak.length;
    }

    const resContent = bak.substring(resStart, resEnd);

    // Check if cur already has RESOURCES
    if (cur.indexOf('export const RESOURCES') === -1) {
        fs.writeFileSync('src/questions.js', cur + '\n\n' + resContent);
        console.log('RESOURCES safely injected at the end of questions.js!');
    } else {
        console.log('RESOURCES already exists in questions.js!');
    }
} catch (e) {
    console.error(e);
}

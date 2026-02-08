const fs = require('fs');
const path = require('path');

const targetPath = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

try {
    const content = fs.readFileSync(targetPath, 'utf8');

    // The file exports a constant, so we can't just JSON.parse the whole file.
    // It looks like: export const QUESTIONS = { ... };
    // We need to strip the prefix.

    const prefix = 'export const QUESTIONS = ';
    const startIndex = content.indexOf(prefix);

    if (startIndex === -1) {
        // Maybe it has a different start?
        // Let's try to just find the first {
        console.log("Could not find standard prefix. Trying to parse from first brace.");
    }

    let jsonStr = content.substring(startIndex + prefix.length);
    // It might end with a semicolon
    if (jsonStr.trim().endsWith(';')) {
        jsonStr = jsonStr.trim().slice(0, -1);
    }

    // It might allow trailing commas which JSON.parse doesn't like.
    // However, if we generated it with JSON.stringify, it should be standard JSON (except for the outer wrapper).
    // EXCEPT my update script used string concat, so it might have issues if I wasn't careful.
    // But let's try to Require it if it's a valid JS module?
    // No, it's ES6 export, node commonjs can't require it directly without package.json changes or .mjs extension.
    // Let's try to eval it in a safe-ish way or just allow loose parsing if possible.
    // Actually, since I wrote mostly valid JSON structure inside the variable, let's try `eval` (I know, dangerous, but this is a local check script).

    // Better: let's rename it to .mjs and import it?
    // Or just regex out the part I need.

    // Let's just try to parse the JSON part.
    // If it fails, I'll print the error.

    try {
        // Remove comments? The file starts with // Generated...
        jsonStr = jsonStr.replace(/^\/\/.*$/mg, '');

        // We know the structure: { "Subject": { "Category": [...] } }
        // Let's use Function constructor to parse it as JS object (tolerant of trailing commas)
        const data = new Function('return ' + jsonStr)();

        console.log("JSON/JS Object parse successful.");

        const civilCode = data["基礎法学"] ? data["基礎法学"]["民法総論"] : undefined;
        // Wait, structure in file is QUESTIONS = { "基礎法学": { "民法総論": [...] } } ?
        // Let's check keys.
        console.log("Subjects:", Object.keys(data));

        if (data["民法総論"]) {
            console.log("Found '民法総論' at top level? No, check structure.");
        }

        // In the file it seems QUESTIONS = { "基礎法学": { ... }, "民法総論": [...] } ??
        // Let's look at the actual file structure from previous view.
        // Line 2: export const SUBJECTS = {
        // Line 4: "基礎法学": [ ... ]
        // Wait, line 2 says SUBJECTS, not QUESTIONS.

    } catch (e) {
        console.error("Parse error:", e.message);
        // show context around error if possible?
    }

} catch (err) {
    console.error("File read error:", err);
}

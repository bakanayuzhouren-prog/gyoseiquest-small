const fs = require('fs');
const path = require('path');

const targetPath = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

try {
    const content = fs.readFileSync(targetPath, 'utf8');

    // The file exports: export const SUBJECTS = { ... };
    const prefix = 'export const SUBJECTS =';
    let startIndex = content.indexOf(prefix);

    if (startIndex === -1) {
        console.error("Could not find 'export const SUBJECTS ='.");
        process.exit(1);
    }

    let jsonStr = content.substring(startIndex + prefix.length);
    // Remove potential semicolon at end
    jsonStr = jsonStr.trim();
    if (jsonStr.endsWith(';')) {
        jsonStr = jsonStr.slice(0, -1);
    }

    // Evaluate as JS object (handles trailing commas, etc.)
    // We use Function constructor for a safer-than-eval approach to parse JS object literal
    let data;
    try {
        data = new Function('return ' + jsonStr)();
    } catch (e) {
        console.error("Javascript Object parse failed. The file might have syntax errors.");
        console.error(e.message);
        process.exit(1);
    }

    console.log("JS Object parse successful.");

    // Check structure
    // Expected: SUBJECTS["基礎法学"]["民法総論"] -> Array of questions

    if (!data["基礎法学"]) {
        console.error("Key '基礎法学' not found.");
        console.log("Keys found:", Object.keys(data));
        // Maybe the structure is flattened in this file?
        // Let's check for "民法総論" directly just in case, though usually it's nested.
        if (data["民法総論"]) {
            console.log("Found '民法総論' at top level. Count:", data["民法総論"].length);
        }
    } else {
        const minpo = data["基礎法学"]["民法総論"];
        if (minpo) {
            console.log("'民法総論' found in '基礎法学'.");
            console.log("Total Questions:", minpo.length);

            // detailed checks
            // Check Q4 (index 4) - should be about 保佐 (Curator)
            const q4 = minpo[4];
            console.log(`[Q5 (Index 4)] Text start: ${q4.text.substring(0, 20)}...`);
            console.log(`[Q5 (Index 4)] Explain start: ${q4.explain.substring(0, 20)}...`);

            // Check Q5 (index 5) - should be about 未成年後見 (Minor Guardianship) ?? Or whatever we fixed it to.
            // Wait, previous plan said:
            // Index 4: 制限行為能力（保佐）
            // Index 5: 制限行為能力（未成年後見）

            const q5 = minpo[5];
            console.log(`[Q6 (Index 5)] Text start: ${q5.text.substring(0, 20)}...`);

            // Check new Q23-30 (Index 23 to end)
            // Index 23 is the start of new batch?
            // Actually let's check the last few items.
            const lastIdx = minpo.length - 1;
            console.log(`[Last Question (Index ${lastIdx})] Text: ${minpo[lastIdx].text.substring(0, 30)}...`);

            // Check for duplicate or misplaced items?
        } else {
            console.error("'民法総論' not found inside '基礎法学'.");
            console.log("Categories in '基礎法学':", Object.keys(data["基礎法学"]));
        }
    }

} catch (err) {
    console.error("Runtime error:", err);
}

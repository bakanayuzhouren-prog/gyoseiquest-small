import { SUBJECTS } from './temp_check.mjs';

// If SUBJECTS is undefined, try default if available? No, named export.

if (SUBJECTS) {
    console.log("SUBJECTS imported successfully.");

    if (SUBJECTS["基礎法学"] && SUBJECTS["基礎法学"]["民法総論"]) {
        const list = SUBJECTS["基礎法学"]["民法総論"];
        console.log(`[民法総論] Total Questions: ${list.length}`);

        // Check specific items
        // Index 4
        if (list[4]) {
            console.log(`[Index 4] Text: ${list[4].text.substring(0, 40)}...`);
            console.log(`[Index 4] Explain: ${list[4].explain.substring(0, 40)}...`);
        }
        // Index 5
        if (list[5]) {
            console.log(`[Index 5] Text: ${list[5].text.substring(0, 40)}...`);
            console.log(`[Index 5] Explain: ${list[5].explain.substring(0, 40)}...`);
        }

        // Index 21
        if (list[21]) {
            console.log(`[Index 21] Explain: ${list[21].explain.substring(0, 40)}...`);
        }

        // Last item
        const lastIdx = list.length - 1;
        if (list[lastIdx]) {
            console.log(`[Index ${lastIdx}] Text: ${list[lastIdx].text.substring(0, 40)}...`);
        }

    } else {
        console.error("Could not find 民法総論 inside SUBJECTS['基礎法学'].");
    }
} else {
    console.error("SUBJECTS export is undefined/null.");
}

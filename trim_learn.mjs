import fs from 'fs';
import { LEARN_CONTENT } from './src/learn.js';

console.log('--- Trimming Learn Content (Constitution) to 230 items ---');

const currentKenpou = LEARN_CONTENT["憲法"];
if (currentKenpou && currentKenpou.length > 230) {
    const trimmedKenpou = currentKenpou.slice(0, 230);
    LEARN_CONTENT["憲法"] = trimmedKenpou;

    const newCode = "export const LEARN_CONTENT = " + JSON.stringify(LEARN_CONTENT, null, 2) + ";";
    fs.writeFileSync('src/learn.js', newCode);
    console.log(`Success: Trimmed from ${currentKenpou.length} to 230 items.`);
} else {
    console.log('No trimming needed or Constitution not found.');
}

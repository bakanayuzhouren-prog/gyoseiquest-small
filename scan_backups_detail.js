const fs = require('fs');
const path = require('path');

const srcDir = 'c:/dev/gyosei-quest-small/src';
const files = fs.readdirSync(srcDir).filter(f => f.startsWith('questions.js.backup'));

files.forEach(f => {
    const content = fs.readFileSync(path.join(srcDir, f), 'utf8');
    const match = content.match(/\"憲法\":\s*\[([\s\S]*?)\],/);
    if (match) {
        const items = match[1].split('},').filter(s => s.trim().length > 0);
        console.log(`${f}: ${items.length} items`);
        if (items.length === 233 || items.length === 231) {
            console.log(`!!! MATCH FOUND in ${f} !!!`);
        }
    } else {
        console.log(`${f}: Constitution section not found or format mismatch`);
    }
});

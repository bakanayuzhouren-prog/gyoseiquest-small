const fs = require('fs');
const content = fs.readFileSync('src/learn.js', 'utf8');

const lines = content.split('\n');
let foundKenpou = false;
let links = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('"憲法"') && line.includes(':')) {
        foundKenpou = true;
        console.log(`Found Constitution at line ${i + 1}`);
    }
    if (foundKenpou) {
        const match = line.match(/\[\[LINK:(\d+)\]\]/);
        if (match) {
            links.push({ line: i + 1, link: match[0], index: match[1], text: line.trim() });
        }
        if (links.length >= 20) break;
    }
}

links.forEach(l => console.log(`${l.line}: ${l.link} - ${l.text}`));

const fs = require('fs');
const content = fs.readFileSync('src/questions.js', 'utf8');
const lines = content.split('\n');
let inKenpou = false;
let objects = [];
let currentObject = null;
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('"憲法": [')) {
        inKenpou = true;
        continue;
    }
    if (!inKenpou) continue;

    if (line.trim() === '{') {
        if (braceCount === 0) {
            currentObject = { start: i + 1, lines: [] };
        }
        braceCount++;
    }
    
    if (currentObject) {
        currentObject.lines.push(line);
    }

    if (line.trim().includes('}')) {
        // Simple brace counting
        const open = (line.match(/{/g) || []).length;
        const close = (line.match(/}/g) || []).length;
        braceCount += open;
        braceCount -= close;
        
        if (braceCount === 0 && currentObject) {
            objects.push(currentObject);
            currentObject = null;
            if (objects.length >= 10) break;
        }
    }
}

objects.forEach((obj, idx) => {
    console.log(`--- Object Index ${idx} (Starting Line ${obj.start}) ---`);
    const textLine = obj.lines.find(l => l.includes('"text":'));
    const imageMatches = obj.lines.join('\n').match(/\[\[image:([^\]]+)\]\]/g);
    console.log(`Text: ${textLine ? textLine.trim() : 'N/A'}`);
    console.log(`Images Found: ${imageMatches ? imageMatches.join(', ') : 'None'}`);
});

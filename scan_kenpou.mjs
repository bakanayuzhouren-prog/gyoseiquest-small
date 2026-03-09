import fs from 'fs';

function scanFile(filePath, label) {
    if (!fs.existsSync(filePath)) {
        console.log(`${label}: NOT FOUND`);
        return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let found = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('\"憲法\": [')) {
            console.log(`${label}: Found at line ${i + 1}`);
            // Let's count questions by looking for "text": until the next subject or end of array
            let qCount = 0;
            let j = i + 1;
            while (j < lines.length && !lines[j].includes('],') && !lines[j].includes('}')) {
                if (lines[j].includes('\"text\":')) qCount++;
                j++;
            }
            console.log(`${label}: Roughly ${qCount} questions in this block.`);

            // Check sample explain
            let sampleIdx = lines.findIndex((l, idx) => idx > i && l.includes('\"explain\":'));
            if (sampleIdx !== -1) {
                console.log(`${label}: Sample explain: ${lines[sampleIdx].trim().substring(0, 100)}`);
            }
            found = true;
            break;
        }
    }
    if (!found) console.log(`${label}: \"憲法\": [ not found`);
}

console.log('--- Scaning for 憲法 ---');
scanFile('src/questions.js', 'CURRENT');
scanFile('src/questions.js.bak', 'BAK');
scanFile('src/questions.js.backup', 'BACKUP');

// Check learn.js
if (fs.existsSync('src/learn.js')) {
    const learnContent = fs.readFileSync('src/learn.js', 'utf8');
    const match = learnContent.match(/\"憲法\":\s*\[/);
    if (match) {
        const startIdx = match.index;
        const endIdx = learnContent.indexOf(']', startIdx);
        const kenpouBlock = learnContent.substring(startIdx, endIdx + 1);
        const itemMatch = kenpouBlock.match(/\"/g);
        const itemCount = itemMatch ? itemMatch.length / 2 - 1 : 0; // Rough
        console.log(`learn.js: 憲法 section found. Approx ${itemCount} items.`);
    } else {
        console.log('learn.js: 憲法 section NOT found.');
    }
}

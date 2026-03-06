const fs = require('fs');
const filePath = 'c:/dev/gyosei-quest-small/src/questions.js.bak';
const content = fs.readFileSync(filePath, 'utf8');

let results = `File Size: ${content.length} characters\n`;

function validateStructure(keyword) {
    const index = content.indexOf(keyword);
    if (index === -1) {
        results += `[FAIL] Keyword "${keyword}" not found\n`;
        return;
    }
    results += `[OK] Found "${keyword}" at index ${index}\n`;
    results += `Context: ${content.substring(index, index + 200).replace(/\n/g, ' ')}\n\n`;
}

validateStructure('"民法物権":');
validateStructure('"民法債権":');
validateStructure('"行政法":');
validateStructure('"憲法":');

results += '--- File End ---\n';
results += content.substring(content.length - 200);

fs.writeFileSync('c:/dev/gyosei-quest-small/bak_validation_report.txt', results);
process.exit(0);

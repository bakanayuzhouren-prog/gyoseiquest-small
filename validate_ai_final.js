const fs = require('fs');
const filePath = 'c:/dev/gyosei-quest-small/src/questions.js.backup_ai';
const content = fs.readFileSync(filePath, 'utf8');

function validateStructure(keyword) {
    const index = content.indexOf(keyword);
    if (index === -1) {
        console.log(`[FAIL] Keyword "${keyword}" not found`);
        return;
    }
    console.log(`[OK] Found "${keyword}" at index ${index}`);
    console.log(`Context: ${content.substring(index, index + 300).replace(/\n/g, ' ')}...`);
}

console.log(`File Size: ${content.length} characters`);
validateStructure('"基礎法学":');
validateStructure('"憲法":');
validateStructure('"行政法":');
validateStructure('"民法":');

// ファイルの末尾が正常か確認
console.log('--- File End ---');
console.log(content.substring(content.length - 100));

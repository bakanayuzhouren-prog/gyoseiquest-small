import fs from 'fs';

function extractKenpou(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');

    // Find "憲法": [
    const startIdx = content.indexOf('\"憲法\": [');
    if (startIdx === -1) return null;

    // Extract up to the matching ]
    let braceCount = 1;
    let currentIdx = startIdx + '\"憲法\": ['.length;
    let resultStr = '[';

    while (braceCount > 0 && currentIdx < content.length) {
        const char = content[currentIdx];
        if (char === '[') braceCount++;
        if (char === ']') braceCount--;
        resultStr += char;
        currentIdx++;
    }

    try {
        // Use a function constructor to eval in a more isolated way
        const data = new Function(`return ${resultStr}`)();
        return data;
    } catch (e) {
        console.log(`Error parsing ${filePath}: ${e.message}`);
        return null;
    }
}

function processFile(filePath, label) {
    console.log(`\n--- ${label} (${filePath}) ---`);
    const data = extractKenpou(filePath);
    if (!data) {
        console.log('宪法 data NOT extracted or found.');
        return;
    }

    console.log(`Total items: ${data.length}`);
    const emptyExplains = data.filter(q => !q.explain || q.explain.trim().length <= 5).length;
    console.log(`Empty/Short explains: ${emptyExplains}`);

    const imageTags = data.filter(q => q.explain && q.explain.includes('[[image:')).length;
    console.log(`Items with image tags: ${imageTags}`);

    if (data.length > 0) {
        console.log(`Example 0 explain: ${data[0].explain ? data[0].explain.substring(0, 50) : 'N/A'}`);
        if (data.length > 50) {
            console.log(`Example 50 explain: ${data[50].explain ? data[50].explain.substring(0, 50) : 'N/A'}`);
        }
    }
}

processFile('src/questions.js', 'CURRENT');
processFile('src/questions.js.bak', 'BAK');
processFile('src/questions.js.backup', 'BACKUP');

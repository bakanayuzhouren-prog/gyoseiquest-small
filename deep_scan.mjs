import fs from 'fs';

function scanFile(path) {
    if (!fs.existsSync(path)) return `--- ${path} not found ---\n`;

    console.log(`Scanning ${path}...`);
    const content = fs.readFileSync(path, 'utf8');
    let report = `=== Scan results for ${path} ===\n\n`;

    const subjects = [
        '憲法', '行政法総論', '行政手続法', '行政不服審査法', '行政事件訴訟法',
        '国家賠償法・損失訴訟', '地方自治法', '行政法総合',
        '民法総論', '民法物権', '債権総論', '債権各論', '家族法'
    ];

    subjects.forEach(subjectName => {
        const searchStr = `"${subjectName}": [`;
        let startIdx = 0;
        while ((startIdx = content.indexOf(searchStr, startIdx)) !== -1) {
            const lineNum = content.substring(0, startIdx).split('\n').length;

            // Count items
            let depth = 1;
            let itemCount = 0;
            let itemDepth = 0;
            let inString = false;
            let escape = false;
            let firstExplain = "";

            for (let i = startIdx + searchStr.length; i < content.length; i++) {
                const char = content[i];
                if (escape) { escape = false; continue; }
                if (char === '\\') { escape = true; continue; }
                if (inString) {
                    if (char === '"') inString = false;
                } else {
                    if (char === '"') inString = true;
                    else if (char === '[') depth++;
                    else if (char === ']') {
                        depth--;
                        if (depth === 0) break;
                    }
                    else if (char === '{') {
                        if (itemDepth === 0) itemCount++;
                        itemDepth++;
                    }
                    else if (char === '}') {
                        itemDepth--;
                    }
                }
            }

            // Sample explain of first item
            const subSection = content.substring(startIdx, startIdx + 5000);
            const explainMatch = subSection.match(/"explain":\s*"([\s\S]*?)"/);
            if (explainMatch) {
                firstExplain = explainMatch[1].substring(0, 100).replace(/\n/g, ' ');
            }

            report += `Found "${subjectName}" at Line ${lineNum}\n`;
            report += `  - Count: ${itemCount} items\n`;
            report += `  - Sample: ${firstExplain}...\n\n`;

            startIdx += searchStr.length;
        }
    });
    return report;
}

const finalReport = scanFile('src/questions.js.bak') + "\n" + scanFile('src/questions.js.backup');
fs.writeFileSync('deep_scan_report.txt', finalReport);
console.log("Deep scan complete. See deep_scan_report.txt");

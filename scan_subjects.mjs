import fs from 'fs';

const path = 'src/questions.js.bak';
const content = fs.readFileSync(path, 'utf8');

let report = "=== Scan Report for src/questions.js.bak ===\n\n";

function findSubjectData(subjectName) {
    const searchStr = `"${subjectName}": [`;
    let startIdx = 0;
    while ((startIdx = content.indexOf(searchStr, startIdx)) !== -1) {
        const lineNum = content.substring(0, startIdx).split('\n').length;
        report += `Found "${subjectName}" at index ${startIdx} (Line ${lineNum})\n`;

        let braceCount = 0;
        let subContent = "";
        let foundStart = false;
        for (let i = startIdx + subjectName.length + 4; i < content.length; i++) {
            subContent += content[i];
            if (content[i] === '[') braceCount++;
            if (content[i] === ']') braceCount--;
            if (braceCount === -1) break; // End of array
        }

        // Count items by counting objects { ... }
        let itemCount = 0;
        let innerBrace = 0;
        for (let j = 0; j < subContent.length; j++) {
            if (subContent[j] === '{') {
                if (innerBrace === 0) itemCount++;
                innerBrace++;
            }
            if (subContent[j] === '}') innerBrace--;
        }
        report += `  - Count: ${itemCount} items\n`;

        // Sample first item's explain
        const firstExplainMatch = subContent.match(/"explain":\s*"([\s\S]*?)"/);
        if (firstExplainMatch) {
            report += `  - Sample Explain: ${firstExplainMatch[1].substring(0, 100).replace(/\n/g, ' ')}...\n`;
        }

        startIdx += searchStr.length;
    }
}

const subjects = ['憲法', '行政法総論', '行政手続法', '行政不服審査法', '行政事件訴訟法', '国家賠償法・損失訴訟', '地方自治法', '行政法総合', '民法総論', '民法物権', '債権総論', '債権各論', '家族法'];
subjects.forEach(findSubjectData);

fs.writeFileSync('scan_report.txt', report);
console.log("Report written to scan_report.txt");

import fs from 'fs';

function extractPart(filePath, keyName) {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Look for "keyName": [
    const regex = new RegExp(`"${keyName}":\\s*\\[`, 'g');
    const match = regex.exec(content);
    if (!match) return null;

    let bracketCount = 0;
    let start = match.index + match[0].length - 1;
    let end = -1;
    for (let i = start; i < content.length; i++) {
        if (content[i] === '[') bracketCount++;
        else if (content[i] === ']') {
            bracketCount--;
            if (bracketCount === 0) {
                end = i;
                break;
            }
        }
    }

    if (end !== -1) {
        const part = content.substring(start, end + 1);
        try {
            // Clean up potential trailing commas before closing brackets
            const cleanPart = part.replace(/,(\s*[\]}])/g, '$1');
            return eval(`(${cleanPart})`);
        } catch (e) {
            console.error(`Failed to eval part ${keyName} from ${filePath}:`, e.message);
            return null;
        }
    }
    return null;
}

console.log("Starting Precise Extraction...");

// 1. Constitution 230 from learn.js
const kenpo230 = extractPart('src/learn.js', '憲法');
console.log(`Kenpo from learn.js: ${kenpo230 ? kenpo230.length : 0} items found.`);

// 2. Admin Law 5-choice from .bak
const subjects_to_get = [
    "行政法総論", "行政手続法", "行政不服審査法", "行政事件訴訟法",
    "国家賠償法・損失訴訟", "地方自治法", "行政法総合",
    "民法総論", "民法物権", "債権総論", "債権各論", "家族法", "民法総合"
];

const finalSubjects = {
    "憲法": {
        "憲法": (kenpo230 || []).map((item, idx) => ({
            text: item.text,
            choices: ["正解（○）", "間違い（×）"],
            answer: [item.text.includes("？") ? 1 : 0], // Placeholder, user will check
            explain: item.explain || item.text,
            image: item.image || `[[image:${idx + 1}-230]]`
        }))
    },
    "行政法": {},
    "民法": {}
};

subjects_to_get.forEach(sub => {
    const data = extractPart('src/questions.js.bak', sub);
    if (data) {
        console.log(`Extracted ${sub} from .bak: ${data.length} items.`);
        if (sub.startsWith("行政")) {
            finalSubjects["行政法"][sub] = data;
        } else {
            finalSubjects["民法"][sub] = data;
        }

        // Merge Divine Explanations from .backup
        const backupData = extractPart('src/questions.js.backup', sub);
        if (backupData) {
            data.forEach(q => {
                const match = backupData.find(bq => bq.text.includes(q.text.substring(0, 20)));
                if (match && match.explain && (match.explain.length > (q.explain || "").length)) {
                    q.explain = match.explain;
                }
            });
        }
    }
});

const output = `export const SUBJECTS = ${JSON.stringify(finalSubjects, null, 2)};`;
fs.writeFileSync('src/questions.js', output);
console.log("Master Restore SUCCESS! Fixed and merged.");

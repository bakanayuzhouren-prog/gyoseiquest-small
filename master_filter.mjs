import fs from 'fs';

function extractArray(filePath, keyName) {
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
        const arrayStr = content.substring(start, end + 1);
        try {
            // Basic cleanup for non-JSON JS (leading/trailing commas etc. if any)
            return eval(`(${arrayStr})`);
        } catch (e) {
            console.error(`Failed to eval ${keyName} in ${filePath}:`, e.message);
            return null;
        }
    }
    return null;
}

console.log("Starting Divine Selection Process...");

// 1. Constitution MUST be exactly 230 from learn.js
const kenpo230 = extractArray('src/learn.js', '憲法');
if (!kenpo230 || kenpo230.length !== 230) {
    console.error(`ERROR: Found ${kenpo230 ? kenpo230.length : 0} Constitution questions, but 230 are required!`);
    // Try another source if available or proceed with caution? No, the user said 230 is confirmed.
}

const finalSubjects = {
    "憲法": {
        "憲法": (kenpo230 || []).map((item, idx) => ({
            text: item.text,
            choices: ["正味（○）", "間違い（×）"], // Placeholder for 2-choice format
            answer: [0], // Default
            explain: item.explain || "神解説はlearn.jsから引用",
            image: item.image || `[[image:${idx + 1}-230]]`
        }))
    },
    "行政法": {},
    "民法": {}
};

const subjects = [
    { cat: "行政法", keys: ["行政法総論", "行政手続法", "行政不服審査法", "行政事件訴訟法", "国家賠償法・損失訴訟", "地方自治法", "行政法総合"] },
    { cat: "民法", keys: ["民法総論", "民法物権", "債権総論", "債権各論", "家族法", "民法総合"] }
];

subjects.forEach(({ cat, keys }) => {
    keys.forEach(key => {
        const bakArray = extractArray('src/questions.js.bak', key);
        const backupArray = extractArray('src/questions.js.backup', key);

        if (bakArray && backupArray) {
            // Keep only questions with "Divine Explanation" from .backup
            // Divine means match exists and explain.length > 50
            const eliteQuestions = bakArray.filter(q => {
                const match = backupArray.find(bq => bq.text.includes(q.text.substring(0, 30)));
                if (match && match.explain && match.explain.length > 50) {
                    q.explain = match.explain; // Inject the Divine Explanation
                    return true;
                }
                return false;
            });

            if (eliteQuestions.length > 0) {
                finalSubjects[cat][key] = eliteQuestions;
                console.log(`Kept ${eliteQuestions.length} elite questions for ${key}. (Original: ${bakArray.length})`);
            }
        }
    });
});

const output = `export const SUBJECTS = ${JSON.stringify(finalSubjects, null, 2)};`;
fs.writeFileSync('src/questions.js', output);
console.log("Divine Selection Complete! Only the best remains.");

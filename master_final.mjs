import fs from 'fs';

function extractArray(filePath, keyName) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const regex = new RegExp(`"${keyName}":\\s*\\[`, 'g');
        const match = regex.exec(content);
        if (!match) return null;
        let bracketCount = 0;
        let start = match.index + match[0].length - 1;
        for (let i = start; i < content.length; i++) {
            if (content[i] === '[') bracketCount++;
            else if (content[i] === ']') {
                bracketCount--;
                if (bracketCount === 0) {
                    return eval(`(${content.substring(start, i + 1)})`);
                }
            }
        }
    } catch (e) {
        console.log(`Error extracting ${keyName} from ${filePath}: ${e.message}`);
    }
    return null;
}

const subjects = [
    { cat: "基礎法学", keys: ["基礎法学"] },
    { cat: "憲法", keys: ["憲法"] }, // Special handling later
    { cat: "行政法", keys: ["行政法総論", "行政手続法", "行政不服審査法", "行政事件訴訟法", "国家賠償法・損失補償", "地方自治法", "行政法総合"] },
    { cat: "民法", keys: ["民法総則", "民法物権", "債権総論", "債権各論", "家族法"] }
];

const finalSubjects = {};

// 1. Constitution from learn.js (exactly 230)
const kenpo230 = extractArray('src/learn.js', '憲法');
if (kenpo230) {
    finalSubjects["憲法"] = {
        "憲法": kenpo230.slice(0, 230).map((q, idx) => ({
            ...q,
            explain: q.explain || "解説準備中",
            image: `[[image:${idx + 1}-230]]`
        }))
    };
    console.log(`Constitutional Law: 230 questions restored from learn.js`);
}

// 2. Others from backup.utf8 (Clean UTF-8 source with high-quality explanations)
const backupPath = 'src/questions.js.backup.utf8';

subjects.forEach(s => {
    if (s.cat === "憲法") return;
    finalSubjects[s.cat] = {};
    s.keys.forEach(k => {
        let items = extractArray(backupPath, k) || [];
        // Divine Selection: Keep only those with meaningful explanations (> 50 chars)
        // Or at least have choices
        const elite = items.filter(q => q.choices && q.choices.length >= 2 && q.explain && q.explain.length > 50);
        if (elite.length > 0) {
            finalSubjects[s.cat][k] = elite;
            console.log(`Kept ${elite.length}/${items.length} elite questions for ${k}`);
        } else if (items.length > 0) {
            // Fallback: if no elite, take up to 20 best available
            finalSubjects[s.cat][k] = items.slice(0, 20);
            console.log(`Fallback: took ${finalSubjects[s.cat][k].length} questions for ${k}`);
        }
    });
});

const output = `export const SUBJECTS = ${JSON.stringify(finalSubjects, null, 2)};`;
fs.writeFileSync('src/questions.js', output);
console.log('Final Salvation Complete: src/questions.js overwritten.');

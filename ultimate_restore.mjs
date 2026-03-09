import fs from 'fs';

const bakPath = 'src/questions.js.bak';
const targetPath = 'src/questions.js';

console.log('--- Starting Ultimate Restoration v2 (Steel Logic) ---');

if (!fs.existsSync(bakPath)) {
    console.error('Error: .bak file not found!');
    process.exit(1);
}

const bakContent = fs.readFileSync(bakPath, 'utf8');

/**
 * Extract an array content starting from subjectName: [
 * Handles nested arrays and strings containing brackets.
 */
function extractSubject(content, subjectName) {
    const searchStr = `"${subjectName}": [`;
    const startIdx = content.indexOf(searchStr);
    if (startIdx === -1) return null;

    let result = "[";
    let depth = 1;
    let inString = false;
    let escape = false;
    let quoteChar = '';

    for (let i = startIdx + searchStr.length; i < content.length; i++) {
        const char = content[i];
        result += char;

        if (escape) {
            escape = false;
            continue;
        }

        if (char === '\\') {
            escape = true;
            continue;
        }

        if (inString) {
            if (char === quoteChar) {
                inString = false;
            }
        } else {
            if (char === '"' || char === "'") {
                inString = true;
                quoteChar = char;
            } else if (char === '[') {
                depth++;
            } else if (char === ']') {
                depth--;
                if (depth === 0) break;
            }
        }
    }
    return result;
}

/**
 * Extract exactly N items from a JSON-like array string.
 */
function extractFirstNItems(arrayStr, n) {
    if (!arrayStr) return null;

    let items = [];
    let currentItem = "";
    let depth = 0;
    let inString = false;
    let escape = false;
    let quoteChar = '';

    // Start after the first '['
    for (let i = 1; i < arrayStr.length; i++) {
        const char = arrayStr[i];

        if (escape) {
            currentItem += char;
            escape = false;
            continue;
        }
        if (char === '\\') {
            currentItem += char;
            escape = true;
            continue;
        }

        if (inString) {
            currentItem += char;
            if (char === quoteChar) inString = false;
        } else {
            if (char === '"' || char === "'") {
                inString = true;
                quoteChar = char;
                currentItem += char;
            } else if (char === '{') {
                if (depth === 0) currentItem = "{";
                else currentItem += "{";
                depth++;
            } else if (char === '}') {
                depth--;
                currentItem += "}";
                if (depth === 0) {
                    items.push(currentItem.trim());
                    if (items.length >= n) break;
                }
            } else {
                if (depth > 0) currentItem += char;
            }
        }
    }
    return "[\n    " + items.join(",\n    ") + "\n  ]";
}

const subjectsToRestore = [
    "行政法総論", "行政手続法", "行政不服審査法", "行政事件訴訟法", "国家賠償法・損失訴訟", "地方自治法", "行政法総合",
    "民法総論", "民法物権", "債権総論", "債権各論", "家族法", "商法・会社法", "基礎知識", "多肢選択", "記述"
];

let newSubjectsCode = "export const SUBJECTS = {\n";

// 1. 基礎法学
console.log("Extracting 基礎法学...");
const kisoCode = extractSubject(bakContent, "基礎法学");
if (kisoCode) {
    newSubjectsCode += `  "基礎法学": {\n    "基礎法学": ${kisoCode}\n  },\n`;
}

// 2. 憲法 (230 questions target)
console.log("Extracting 憲法 (Target 230)...");
const fullKenpouCode = extractSubject(bakContent, "憲法");
const kenpou230Code = extractFirstNItems(fullKenpouCode, 230);
if (kenpou230Code) {
    newSubjectsCode += `  "憲法": {\n    "憲法": ${kenpou230Code}\n  },\n`;
}

// 3. Others
subjectsToRestore.forEach(s => {
    console.log(`Extracting ${s}...`);
    const code = extractSubject(bakContent, s);
    if (code) {
        newSubjectsCode += `  "${s}": {\n    "${s}": ${code}\n  },\n`;
    } else {
        console.warn(`Warning: Subject ${s} not found in .bak`);
    }
});

newSubjectsCode += "};";

const finalCode = "export const RESOURCES = {};\n\n" + newSubjectsCode;
fs.writeFileSync(targetPath, finalCode);

console.log("\nSuccess: src/questions.js has been completely rebuilt with Steel Logic!");

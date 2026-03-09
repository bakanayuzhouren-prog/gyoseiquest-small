import fs from 'fs';

const bakPath = 'src/questions.js.bak';
const backupPath = 'src/questions.js.backup';
const targetPath = 'src/questions.js';

console.log('--- Hybrid Ultimate Restoration Starting ---');

// Parse logic that handles nested brackets and strings
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
            if (char === quoteChar) inString = false;
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

function extractFirstNItems(arrayStr, n) {
    if (!arrayStr) return null;
    let items = [];
    let currentItem = "";
    let depth = 0;
    let inString = false;
    let escape = false;
    let quoteChar = '';

    for (let i = 1; i < arrayStr.length; i++) {
        const char = arrayStr[i];
        if (escape) { currentItem += char; escape = false; continue; }
        if (char === '\\') { currentItem += char; escape = true; continue; }
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

const bakContent = fs.readFileSync(bakPath, 'utf8');
const backupContent = fs.readFileSync(backupPath, 'utf8');

let subjectsOutput = "export const SUBJECTS = {\n";

// --- SOURCE 1: .bak (FOR CONSTITUTION ONLY) ---
console.log('Extracting Constitution (230 items) from .bak...');
const fullKenpou = extractSubject(bakContent, "憲法");
const kenpou230 = extractFirstNItems(fullKenpou, 230);
if (kenpou230) {
    subjectsOutput += `  "憲法": {\n    "憲法": ${kenpou230}\n  },\n`;
}

// --- SOURCE 2: .backup (FOR ALL OTHER SUBJECTS) ---
const subjectsFromBackup = [
    "基礎法学", "行政法総論", "行政手続法", "行政不服審査法", "行政事件訴訟法",
    "国家賠償法・損失訴訟", "地方自治法", "行政法総合",
    "民法総論", "民法物権", "債権総論", "債権各論", "家族法",
    "商法・会社法", "基礎知識", "多肢選択", "記述"
];

subjectsFromBackup.forEach(s => {
    console.log(`Extracting ${s} from .backup...`);
    const code = extractSubject(backupContent, s);
    if (code) {
        subjectsOutput += `  "${s}": {\n    "${s}": ${code}\n  },\n`;
    } else {
        console.warn(`Warning: ${s} not found in .backup`);
    }
});

subjectsOutput += "};";

const finalFileCode = "export const RESOURCES = {};\n\n" + subjectsOutput;
fs.writeFileSync(targetPath, finalFileCode);

console.log('\n--- SUCCESS: Hybrid Ultimate Restoration Complete! ---');
console.log('src/questions.js has been rebuilt with the best data from both backups.');

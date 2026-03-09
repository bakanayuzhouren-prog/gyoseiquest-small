import fs from 'fs';

function extractAll(path) {
    if (!fs.existsSync(path)) return null;
    const content = fs.readFileSync(path, 'utf8');

    let subjectsStart = content.indexOf('export const SUBJECTS = {');
    if (subjectsStart === -1) {
        subjectsStart = content.indexOf('const SUBJECTS = {');
    }
    if (subjectsStart === -1) return null;

    const subStr = content.substring(subjectsStart);
    let braceCount = 0;
    let subjectsStr = "";
    let foundStart = false;
    for (let i = 0; i < subStr.length; i++) {
        subjectsStr += subStr[i];
        if (subStr[i] === '{') {
            braceCount++;
            foundStart = true;
        }
        if (subStr[i] === '}') {
            braceCount--;
        }
        if (foundStart && braceCount === 0) break;
    }

    const structure = {};
    const lines = subjectsStr.split('\n');
    let currentTopKey = null;
    let currentSubKey = null;
    let innerBrace = 0;

    for (let line of lines) {
        const trimmed = line.trim();
        if (innerBrace === 1) {
            const topMatch = trimmed.match(/^"([^"]+)": \{/);
            if (topMatch) {
                currentTopKey = topMatch[1];
                structure[currentTopKey] = {};
            }
        } else if (innerBrace === 2 && currentTopKey) {
            const subMatch = trimmed.match(/^"([^"]+)": \[/);
            if (subMatch) {
                currentSubKey = subMatch[1];
                structure[currentTopKey][currentSubKey] = 0;
            }
        }

        // Very basic counting of items (objects starting with {)
        if (innerBrace === 3 && currentTopKey && currentSubKey) {
            if (trimmed === '{') {
                structure[currentTopKey][currentSubKey]++;
            }
        }

        if (trimmed.includes('{')) innerBrace += (trimmed.match(/\{/g) || []).length;
        if (trimmed.includes('}')) innerBrace -= (trimmed.match(/\}/g) || []).length;
    }
    return structure;
}

const paths = {
    'current': 'src/questions.js',
    'bak': 'src/questions.js.bak',
    'backup': 'src/questions.js.backup'
};

let report = "";
for (const [name, path] of Object.entries(paths)) {
    report += `=== ${name} (${path}) ===\n`;
    try {
        const struct = extractAll(path);
        if (!struct) {
            report += "Not found or failed to parse.\n";
            continue;
        }
        for (const [top, subs] of Object.entries(struct)) {
            report += `${top}:\n`;
            for (const [sub, count] of Object.entries(subs)) {
                report += `  - ${sub} (${count} items)\n`;
            }
        }
    } catch (e) {
        report += `Error: ${e.message}\n`;
    }
    report += "\n";
}

fs.writeFileSync('structure_report.txt', report);
console.log("Report written to structure_report.txt");

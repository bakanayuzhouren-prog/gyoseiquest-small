import fs from 'fs';

function extract(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const results = {};
    const regex = /"([^"]+)":\s*\[/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const key = match[1];
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
            try {
                const arr = eval(content.substring(start, end + 1));
                if (Array.isArray(arr)) {
                    results[key] = arr.length;
                }
            } catch (e) { }
        }
    }
    return results;
}

console.log("Scanning src/learn.js...");
const learnRes = extract('src/learn.js');
console.log("src/learn.js counts:", JSON.stringify(learnRes, null, 2));

console.log("Scanning src/questions.js...");
const qRes = extract('src/questions.js');
console.log("src/questions.js counts:", JSON.stringify(qRes, null, 2));

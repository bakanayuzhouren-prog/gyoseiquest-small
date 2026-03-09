import fs from 'fs';

function deepExtract(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const subjects = {};

    // Find all category structures: "Category": { "SubCategory": [ ... ] }
    // Regex to find "Key": [
    const arrayRegex = /"([^"]+)":\s*\[/g;
    let match;

    while ((match = arrayRegex.exec(content)) !== null) {
        const key = match[1];
        const startIndex = match.index + match[0].length - 1; // index of '['

        // Find closing ']'
        let bracketCount = 0;
        let endIndex = -1;
        for (let i = startIndex; i < content.length; i++) {
            if (content[i] === '[') bracketCount++;
            else if (content[i] === ']') {
                bracketCount--;
                if (bracketCount === 0) {
                    endIndex = i;
                    break;
                }
            }
        }

        if (endIndex !== -1) {
            const arrayStr = content.substring(startIndex, endIndex + 1);
            try {
                // Evaluate to get the array
                const arr = eval(arrayStr);
                if (Array.isArray(arr) && arr.length > 0) {
                    subjects[key] = arr;
                    console.log(`Extracted key: ${key}, Count: ${arr.length}`);
                }
            } catch (e) {
                // console.error(`Failed to eval key ${key}:`, e.message);
            }
        }
    }
    return subjects;
}

const files = fs.readdirSync('src').filter(f => f.startsWith('questions.js'));
const allResults = {};

for (const file of files) {
    console.log(`Scanning src/${file}...`);
    try {
        const data = deepExtract(`src/${file}`);
        allResults[file] = Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k, v.length])
        );
    } catch (e) {
        console.error(`Failed to scan ${file}`);
    }
}

fs.writeFileSync('mega_scan_results.json', JSON.stringify(allResults, null, 2));
console.log("Mega scan complete! Results in mega_scan_results.json");

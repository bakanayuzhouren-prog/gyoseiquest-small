const fs = require('fs');

const backupPath = 'c:/dev/gyosei-quest-small/src/questions.js.backup_ai_v2';
const bukkenDataPath = 'c:/dev/gyosei-quest-small/temp_bukken_generated.js';
const targetPath = 'c:/dev/gyosei-quest-small/src/questions.js';

try {
    console.log('--- FINAL RESTORATION v4 START ---');

    const content = fs.readFileSync(backupPath, 'utf8');

    // Regex to extract SUBJECTS object content
    // Matches "SUBJECTS = { ... };" OR "const SUBJECTS = { ... };" OR "export const SUBJECTS = { ... };"
    function extractObject(name) {
        const pattern = new RegExp(`(?:export\\s+const\\s+|const\\s+|\\s*)${name}\\s*=\\s*(\\{)`, 'm');
        const match = content.match(pattern);
        if (!match) return null;

        const startPos = match.index + match[0].length - 1; // Position of '{'

        // Find matching closing brace
        let braceCount = 1;
        let endPos = -1;
        for (let i = startPos + 1; i < content.length; i++) {
            if (content[i] === '{') braceCount++;
            else if (content[i] === '}') braceCount--;

            if (braceCount === 0) {
                // Check if it's followed by ';'
                if (content.substr(i, 5).includes('};')) {
                    endPos = i;
                    break;
                }
            }
        }

        if (endPos === -1) return null;
        return eval('(' + content.substring(startPos, endPos + 1) + ')');
    }

    const SUBJECTS = extractObject('SUBJECTS');
    let RESOURCES = extractObject('RESOURCES') || extractObject('STATUTES');

    if (!SUBJECTS) throw new Error('Could not find SUBJECTS in backup');
    if (!RESOURCES) {
        console.warn('RESOURCES not found, using empty object');
        RESOURCES = {};
    }

    console.log('Successfully extracted SUBJECTS and RESOURCES.');

    // 2. Load and integration bukken
    const bukkenRaw = fs.readFileSync(bukkenDataPath, 'utf8');
    const bukkenQuestions = eval(bukkenRaw);

    if (!SUBJECTS['民法']) SUBJECTS['民法'] = {};
    SUBJECTS['民法']['民法物権'] = bukkenQuestions;
    console.log(`Integrated ${bukkenQuestions.length} questions into 民法物権.`);

    // 3. Output
    const finalOutput = `// Final Stable Restoration v4
export const SUBJECTS = ${JSON.stringify(SUBJECTS, null, 2)};

export const RESOURCES = ${JSON.stringify(RESOURCES, null, 2)};
`;

    fs.writeFileSync(targetPath, finalOutput, 'utf8');
    console.log(`Saved to ${targetPath}`);

    // Stats
    console.log(`RESOURCES items: ${Object.keys(RESOURCES).length}`);
    console.log(`SUBJECTS keys: ${Object.keys(SUBJECTS).join(', ')}`);

} catch (err) {
    console.error('RESTORE v4 FAILED:', err);
    process.exit(1);
}

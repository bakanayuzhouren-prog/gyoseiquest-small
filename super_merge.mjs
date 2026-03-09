import fs from 'fs';

function extractObject(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    // Find the first { and the last }
    const start = content.indexOf('{');
    const end = content.lastIndexOf('}');
    if (start === -1 || end === -1) return null;

    const objStr = content.substring(start, end + 1);
    console.log(`Extracted object from ${filePath}, length: ${objStr.length}`);
    // Try evaluating it (wrapped in parens)
    try {
        return eval(`(${objStr})`);
    } catch (e) {
        console.error(`Error evaluating ${filePath}:`, e.message);
        // Try a more aggressive cleanup if it fails
        return null;
    }
}

console.log("Loading .bak file...");
const bakSubjects = extractObject('src/questions.js.bak');
console.log("Loading .backup file...");
const backupSubjects = extractObject('src/questions.js.backup');

if (!bakSubjects || !backupSubjects) {
    process.exit(1);
}

const resultSubjects = {};

for (const catName in bakSubjects) {
    resultSubjects[catName] = {};
    for (const subName in bakSubjects[catName]) {
        console.log(`Processing ${catName} -> ${subName}...`);
        const bakQuestions = bakSubjects[catName][subName];
        // Find matching category/subject in backup (it might be named slightly differently or merged)
        const backupQuestions = backupSubjects[catName] ? backupSubjects[catName][subName] : null;

        resultSubjects[catName][subName] = bakQuestions.map(q => {
            let mergedExplain = q.explain || "";
            const isFakeExplain = !mergedExplain || mergedExplain.trim() === q.text.trim();

            if (isFakeExplain && backupQuestions) {
                let detailedExplains = [];
                q.choices.forEach((choice, idx) => {
                    const match = backupQuestions.find(bq =>
                        bq.text.includes(choice.trim().substring(0, 30)) ||
                        (bq.choices && bq.choices[0] && bq.choices[0].includes(choice.trim().substring(0, 30)))
                    );
                    if (match && match.explain && match.explain.length > 20) {
                        detailedExplains.push(`【選択肢${idx + 1}の解説】\n${match.explain.trim()}`);
                    }
                });

                if (detailedExplains.length > 0) {
                    mergedExplain = detailedExplains.join("\n\n");
                } else {
                    // Try whole question match
                    const wholeMatch = backupQuestions.find(bq => bq.text.includes(q.text.substring(0, 30)));
                    if (wholeMatch && wholeMatch.explain) {
                        mergedExplain = wholeMatch.explain;
                    }
                }
            }

            return { ...q, explain: mergedExplain };
        });
    }
}

fs.writeFileSync('src/questions.js', `export const SUBJECTS = ${JSON.stringify(resultSubjects, null, 2)};`);
console.log("Done! src/questions.js updated.");

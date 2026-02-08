const fs = require('fs');

const questionText = "制限行為能力者に関する次の記述のうち、民法の規定に照らし、正しいものの組合せはどれか。";

// New explanation text (simplified)
const newExplainText = "後見監督人の主な仕事は「後見人の監視」です。\n詳しい業務内容や、試験に出る重要ポイント（利益相反のルールなど）は、\n下の「📌 もっと深掘る（詳細図解）」ボタンを押して確認してください！";

try {
    let content = fs.readFileSync('src/questions.js', 'utf8');

    // Regex to find the question block
    // We need to match the text, then find "refId": "" and replace it with "refId": "civil_guardian_supervisor"
    // And also update "explain".

    // 1. Update refId
    // Look for: "text": "...questionText...", ... "refId": ""
    // JS regex for multiline matching is tricky. 
    // Let's find the index of the question text, then search forward for "refId".

    const textIndex = content.indexOf(questionText);
    if (textIndex === -1) {
        console.error('Question text not found');
        process.exit(1);
    }

    // Find "refId": "" after textIndex
    const refIdSearchStr = '"refId": ""';
    const refIdIndex = content.indexOf(refIdSearchStr, textIndex);

    if (refIdIndex === -1) {
        // Check if it's already set?
        if (content.indexOf('"refId": "civil_guardian_supervisor"', textIndex) !== -1) {
            console.log('refId already set');
        } else {
            console.error('refId field not found or already set to something else');
            // process.exit(1); // Proceed to update explain anyway
        }
    } else {
        content = content.substring(0, refIdIndex) + '"refId": "civil_guardian_supervisor"' + content.substring(refIdIndex + refIdSearchStr.length);
        console.log('Updated refId');
    }

    // 2. Update explain
    // We need to find "explain": "..." associated with this question.
    // We can search for "explain": near the textIndex.
    // Actually, we can just use replace on the whole file if we are careful, or specifically target the one near textIndex.

    // Let's find the start of the explain field after textIndex
    const explainMarker = '"explain": "';
    const explainStartIndex = content.indexOf(explainMarker, textIndex);

    if (explainStartIndex !== -1) {
        // Find the end of the string. This is hard because of escaped quotes.
        // But we know the previous content ends with quote.
        // Let's just use the same regex approach as before for safety.
        const regex = new RegExp(`("text":\\s*"${questionText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"explain":\\s*")((?:[^"\\\\]|\\\\.)*")`, 'm');

        content = content.replace(regex, (match, p1, p2) => {
            const escapedExplain = newExplainText.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
            return p1 + '"' + escapedExplain + '"';
        });
        console.log('Updated explain text');
    }

    fs.writeFileSync('src/questions.js', content, 'utf8');
    console.log('Successfully updated src/questions.js');

} catch (e) {
    console.error('Error:', e);
    process.exit(1);
}

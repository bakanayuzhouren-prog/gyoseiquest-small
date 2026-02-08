
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');

// The current content (as verified in previous steps)
const targetString = `"explain": "後見監督人の主な仕事は「後見人の監視」です。\\n詳しい業務内容や、試験に出る重要ポイント（利益相反のルールなど）は、\\n下の「📌 もっと深掘る（詳細図解）」ボタンを押して確認してください！\\n\\n後見監督人（こうけんかんとくにん）とは、成年後見人の仕事をチェックする人のこと。\\n\\n家庭裁判所が必要だと判断したときに選ばれます。\\n必ず選ばなきゃいけないわけではありません。\\n\\n後見監督人の主な仕事は４つ\\n１．後見人の事務を監督する\\n２．後見人がいなくなったときに、遅滞なく後見人を選任する\\n３．急迫の事情があるときに、必要な処分をする\\n４．後見人と本人の利益が相反するときに、本人を代表する",`;

// The new content with rich text markup
const replacementString = `"explain": "[[big:後見監督人の主な仕事は「後見人の監視」です。]]\\n詳しい業務内容や、試験に出る重要ポイント（利益相反のルールなど）は、\\n下の「[[red:📌 もっと深掘る（詳細図解）]]」ボタンを押して確認してください！\\n\\n[[bold:後見監督人（こうけんかんとくにん）]]とは、成年後見人の仕事をチェックする人のこと。\\n\\n[[marker:家庭裁判所が必要だと判断したときに選ばれます。]]\\n必ず選ばなきゃいけないわけではありません。\\n\\n後見監督人の主な仕事は[[red:４つ]]\\n１．後見人の事務を監督する\\n２．後見人がいなくなったときに、遅滞なく後見人を選任する\\n３．急迫の事情があるときに、必要な処分をする\\n４．後見人と本人の利益が相反するときに、本人を代表する",`;

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if target exists
    if (content.indexOf(targetString) === -1) {
        console.error('Target string NOT found. Please check line endings or exact content.');
        // Debug: print a Snippet around line 5079 if possible, or just exit
        process.exit(1);
    }

    // Perform replacement
    const newContent = content.replace(targetString, replacementString);

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Successfully updated questions.js with rich text.');

} catch (err) {
    console.error('Error updating file:', err);
    process.exit(1);
}

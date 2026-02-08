const fs = require('fs');

const questionText = "制限行為能力者に関する次の記述のうち、民法の規定に照らし、正しいものの組合せはどれか。";
const newExplanation = `## 後見監督人の主な仕事（職務）

後見監督人の役割は、一言で言えば**「後見人のウォッチ（監視）」**です。
具体的には以下の4つが主な業務です（民法851条）。

1.  **後見人の事務を監督すること**
    *   後見人が被後見人の財産を使い込んでいないか、不適切な契約をしていないかを厳しくチェックします。
2.  **後見人が欠けた場合に、遅滞なくその選任を家庭裁判所に請求すること**
    *   後見人が死亡したり辞任したりして不在になった際、穴を埋める手続きをします。
3.  **急迫の事情がある場合に、必要な処分をすること**
    *   後見人が動けない時などに、緊急で財産を守るための行動を代わりに行います。
4.  **後見人と被後見人の利益が相反する場合に、被後見人を代表すること**
    *   ここが最重要ポイントです！ 通常、利益相反がある場合は「特別代理人」を選任しますが、後見監督人がいる場合は、監督人が自動的に代表します。

## 試験に出る「ここが重要！」ポイント

### ① 誰が選ぶのか？
家庭裁判所が、必要があると認めるときに、請求（本人、親族、後見人などから）または職権で選任します（民法849条）。
必ず置かなければならないわけではなく、**「任意設置」**です。

### ② 誰がなれるのか？（欠格事由）
後見人をチェックする立場なので、以下のような人はなれません。
*   後見人の配偶者、直系血族、兄弟姉妹（身内だと甘くなってしまうため）。
*   その他、未成年者や破産者などの一般的な欠格事由に該当する人。

### ③ 利益相反（りえきそうはん）のルール
試験で最も狙われるのが、後見人と被後見人の間で利益がぶつかるケースです。

| ケース | 対応 |
| :--- | :--- |
| **後見監督人がいない** | 家庭裁判所に特別代理人の選任を申し立てる |
| **後見監督人がいる** | 後見監督人が被後見人を代表する（特別代理人は不要） |

例： 後見人と被後見人（本人）が、亡くなった親の遺産分割協議を一緒に行う場合などは利益相反にあたります。`;

try {
    let content = fs.readFileSync('src/questions.js', 'utf8');

    // Create a regex to find the question block and then the explain field
    // We look for the text, then match until we find "explain": ""
    const regex = new RegExp(`("text":\\s*"${questionText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"explain":\\s*")(")`, 'm');

    if (!regex.test(content)) {
        console.error('Target question not found!');
        process.exit(1);
    }

    const newContent = content.replace(regex, (match, p1, p2) => {
        // p1 is everything up to "explain": "
        // p2 is the closing " (actually match string "explain": "" so it's empty string content)
        // We want to insert the new explanation escaped properly.
        const escapedExplain = newExplanation.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
        return p1 + escapedExplain + p2;
    });

    fs.writeFileSync('src/questions.js', newContent, 'utf8');
    console.log('Successfully updated src/questions.js');

} catch (e) {
    console.error('Error updating file:', e);
    process.exit(1);
}

const fs = require('fs');
const path = require('path');

const TARGET_FILE = path.join(__dirname, '../src/questions.js');

const niigataQuestion = `
    {
      "title": "新潟空港訴訟（原告適格）",
      "content": "新潟空港周辺の住民が、空港の拡張に伴う騒音被害等を理由に、運輸大臣（当時）が航空会社に対して行った定期航空運送事業免許の取消しを求めた訴訟（新潟空港訴訟）において、最高裁判所は住民の原告適格をどのように判断したか。",
      "imageUrl": "",
      "order": 1,
      "choices": [
        "住民には原告適格が認められるとした。",
        "住民には原告適格は認められないとした。",
        "騒音被害が著しい場合に限り、原告適格が認められるとした。",
        "空港の設置管理者に対する民事訴訟によるべきとして、行政訴訟の対象ではないとした。",
        "住民の居住地域が法律上の利益を有する範囲に含まれるか否かに関わらず、原告適格を否定した。"
      ],
      "answer": [
        1
      ],
      "explain": "最高裁は、行政事件訴訟法9条の「法律上の利益を有する者」には、著しい騒音被害を受ける地域の住民も含まれるとして、原告適格を認めない原審（高裁判決）を破棄し、肯定した（差し戻し）。※解説：いわゆる「原告適格」の拡大傾向を示した重要判例。詳しくは「判例図解」を参照。",
      "refId": "niigata_airport"
    },`;

try {
    let content = fs.readFileSync(TARGET_FILE, 'utf-8');

    // Check if already inserted
    if (content.includes("新潟空港訴訟（原告適格）")) {
        console.log("Question already exists. Skipping.");
        process.exit(0);
    }

    // Find insertion point
    const insertionPoint = '"gyoso": [';
    const index = content.indexOf(insertionPoint);

    if (index === -1) {
        console.error("Could not find 'gyoso' array start.");
        process.exit(1);
    }

    const newContent = content.slice(0, index + insertionPoint.length) + niigataQuestion + content.slice(index + insertionPoint.length);

    fs.writeFileSync(TARGET_FILE, newContent, 'utf-8');
    console.log("Successfully inserted Niigata Airport question.");

} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);

console.log('Preparing to update Constitution index 65 to 69...');

const sorachibuto = "[[section:解説：空知太神社事件（最大判 平22.1.20）]]\\n[[character:boss]]\\n砂川市が市有地を神社の敷地としてタダで貸し出したことが「違憲」とされた大事件だよ！\\n\\n[[character:midBoss]]\\n[[bold:1. 判決のロジック：総合判断]]\\n最高裁は「目的効果基準」だけでなく、[[red:「一般人の宗教的評価」]]を重視しました。\\n・[[bold:目的の正当性（違憲）]]: 町内会の集会所が含まれていても、中心は「神社（鳥居や社殿）」であり、特定宗教への支援とみなされました。\\n・[[bold:手段の相当性（違憲）]]: タダで貸すのは「強力な援助」であり、国家の中立性を損なう「中立性の喪失」にあたります。\\n\\n[[bold:2. 箕面忠魂碑との違い（試験の急所！）]]\\n| 項目 | 箕面忠魂碑（合憲） | 空知太神社（違憲） |\\n| :--- | :--- | :--- |\\n| 性格 | 戦没者慰霊（記念碑） | 神社（宗教施設） |\\n| 意義 | 希薄（もはや習俗） | 濃厚（誰が見ても神社） |\\n\\n[[point:「空知太（そらちぶと）＝ 違憲」！20条3項（宗教的活動）と89条（公金支出禁止）の両方に違反します。]]";

const tsu_groundbreaking = "[[section:解説：津地鎮祭訴訟（最大判 昭52.7.13）]]\\n[[character:boss]]\\n「地鎮祭は宗教か習俗か？」という問いに、最高裁が「セーフ（合憲）」を出した有名判例だよ。\\n\\n[[character:midBoss]]\\n[[bold:1. 判定基準の確立]]\\nここで[[red:「目的効果基準」]]が誕生しました。\\n・[[bold:目的]]: 建物の安全を願う、世俗的な「習俗」にすぎない。\\n・[[bold:効果]]: 特定の宗教を援助し、他を圧迫するほどではない。\\n\\n[[point:「地鎮祭は合憲」！空知太神社（違憲）や孔子廟（違憲）との違いを意識して覚えよう！]]";

const ex = {
    65: sorachibuto,
    66: sorachibuto,
    67: tsu_groundbreaking,
    68: sorachibuto,
    69: sorachibuto
};

let subjectStartLine = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"憲法": {') || lines[i].includes("'憲法': {")) {
        subjectStartLine = i;
        break;
    }
}

let arrayStartLine = -1;
for (let i = subjectStartLine; i < lines.length; i++) {
    if (lines[i].includes('"憲法": [') || lines[i].includes("'憲法': [")) {
        arrayStartLine = i;
        break;
    }
}

if (arrayStartLine === -1) {
    // Fallback if structure is nested differently
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"憲法": [') || lines[i].includes("'憲法': [")) {
            arrayStartLine = i;
            break;
        }
    }
}

let questionCount = 0;
let updatedCount = 0;
const targetIndices = Object.keys(ex).map(Number);
const maxTarget = Math.max(...targetIndices);

for (let i = arrayStartLine + 1; i < lines.length; i++) {
    if (lines[i].trim() === '{') {
        if (ex[questionCount]) {
            for (let j = i; j < lines.length; j++) {
                if (lines[j].includes('"explain":') || lines[j].includes("'explain':")) {
                    console.log(`Updating index ${questionCount} at line ${j + 1}...`);
                    lines[j] = `        "explain": "${ex[questionCount]}",`;
                    updatedCount++;
                    break;
                }
                if (lines[j].trim() === '},' || lines[j].trim() === '}') break;
            }
        }
        questionCount++;
    }
    if (questionCount > maxTarget + 1) break;
}

console.log(`Total questions scanned: ${questionCount}`);
console.log(`Total questions updated: ${updatedCount}`);

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Update complete!');

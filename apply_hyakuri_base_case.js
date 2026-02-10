const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);

console.log('Preparing to update Constitution index 23 to 28...');

const hyakuriExplain = "[[section:解説：百里基地訴訟（最判 昭57.9.9）]]\\n[[character:boss]]\\nこの判録は、憲法9条（自衛隊）と民法90条（公序良俗）が交差する、[[red:「憲法と民法の架け橋」]]となる超重要判例です。\\n\\n[[character:midBoss]]\\n[[bold:1. 事件の概要]]\\n国の基地建設のための土地売買について、反対派が「自衛隊は違憲だ。だからそのための契約は公序良俗違反で無効だ！」と訴えた事件ですね。\\n\\n[[bold:2. 判決のポイント]]\\n・[[bold:私法上の行為]]: 国が土地を買う行為は一般人と対等な[[red:「私法上の行為」]]であり、直接憲法ではなく、原則として民法が適用されます。\\n・[[bold:公序良俗（民法90条）の判断]]: 自衛隊が「一見して明白に違憲」とは言えない。したがって、契約が公序良俗に反して無効になることはありません。\\n・[[bold:判断の回避]]: 自衛隊の合憲性のような高度な政治的事項は、裁判所の判断に馴染まない（統治行為論的スタンス）とされました。\\n\\n[[big:【試験のひっかけポイント！】]]\\n・「国が関わるならすべて憲法が直接適用される」 → [[red:×]]（私法的行為には民法が適用）\\n・「最高裁は自衛隊を合憲と判断した」 → [[red:×]]（判断を避けています）\\n\\n[[point:「私法上の行為には民法を適用する」「一見して明白な違憲でなければ有効」という理屈を覚えましょう！]]";

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

let questionCount = 0;
let updatedCount = 0;
const targetRange = [23, 24, 25, 26, 27, 28];

for (let i = arrayStartLine + 1; i < lines.length; i++) {
    if (lines[i].trim() === '{') {
        if (targetRange.includes(questionCount)) {
            for (let j = i; j < lines.length; j++) {
                if (lines[j].includes('"explain":') || lines[j].includes("'explain':")) {
                    console.log(`Updating index ${questionCount} at line ${j + 1}...`);
                    lines[j] = `        "explain": "${hyakuriExplain}",`;
                    updatedCount++;
                    break;
                }
                if (lines[j].trim() === '},' || lines[j].trim() === '}') break;
            }
        }
        questionCount++;
    }
    if (updatedCount === targetRange.length) break;
}

if (updatedCount < targetRange.length) {
    console.error(`Only updated ${updatedCount} questions. Check indices.`);
    process.exit(1);
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Update complete for all 6 questions!');

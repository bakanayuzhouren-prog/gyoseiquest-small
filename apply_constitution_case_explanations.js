const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);

console.log('Searching for target lines for Constitution index 9 and 10...');

// 10/230 マクリーン事件解説
const foreignersExplain = "[[section:解説：外国人の政治活動の自由]]\\n[[character:boss]]\\n[[bold:1. 原則：外国人にも保障される]]\\n判例（マクリーン事件）は、基本的人権について、[[red:「権利の性質上日本国民のみを対象としていると解されるものを除き、在留外国人にも及ぶ」]]という性質説を採っています。\\n\\n[[character:midBoss]]\\n政治活動の自由も、原則として外国人にも保障されますが、国民と全く同じレベルではありません。\\n\\n[[bold:2. 例外：「相当でない」とされる活動とは？]]\\n[[red:「わが国の政治的意思決定またはその実施に影響を及ぼす活動」]]は、外国人の地位に照らして認めるのが相当でない（＝保障が及ばない）とされました。\\n\\n[[big:【具体的な線引きのイメージ】]]\\n・[[bold:一般的な政治活動（保障される）]]: デモ参加、政府批判のビラ配り、集会での発言など。\\n・[[bold:国の意思決定そのもの（保障されない）]]: 国政選挙の投票、公権力を行使する公務員への就任、政治資金の寄付など。\\n\\n[[point:「意見を言う自由はあるが、国の進路を決定する核心部分には口出しできない」という二段構えで理解しましょう！]]";

// 11/230 八幡製鉄事件解説
const corporationsExplain = "[[section:解説：法人の人権（八幡製鉄事件）]]\\n[[character:boss]]\\n[[bold:1. 八幡製鉄事件のポイント]]\\n会社が特定の政党に政治献金をしたことに対し、株主が訴えた事件です。\\n最高裁は、[[red:「法人も権利の性質上可能な限り、人権の保障を受ける」]]とし、会社には自然人と同様に政治的行為の自由があると判断しました。\\n\\n[[character:midBoss]]\\n[[bold:2. 自然人と法人の比較]]\\n・[[bold:精神的自由]]: 原則認められる（表現・信教の自由など）\\n・[[bold:経済的自由]]: 強く認められる（財産権・営業の自由など）\\n・[[bold:参政権・人身の自由]]: [[red:認められない]]（投票や拷問からの自由は人間のみ）\\n\\n[[bold:3. 南九州税理士会事件との違い（超重要！）]]\\n・[[bold:八幡製鉄事件（営利企業）]]: 寄附は自由。嫌なら株を売る自由があるから。\\n・[[bold:南九州税理士会事件（強制加入団体）]]: 政治献金の徴収は[[red:違法]]。強制加入であり、個人の思想の自由を侵すため。\\n\\n[[point:「営利企業は自由、強制加入の団体は制限あり」という対比が試験の急所です！]]";

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
const targetUpdates = {
    9: foreignersExplain,
    10: corporationsExplain
};
let updatedCount = 0;

for (let i = arrayStartLine + 1; i < lines.length; i++) {
    if (lines[i].trim() === '{') {
        if (targetUpdates[questionCount]) {
            for (let j = i; j < lines.length; j++) {
                if (lines[j].includes('"explain":') || lines[j].includes("'explain':")) {
                    console.log(`Updating index ${questionCount} at line ${j + 1}...`);
                    lines[j] = `        "explain": "${targetUpdates[questionCount]}",`;
                    updatedCount++;
                    break;
                }
                if (lines[j].trim() === '},' || lines[j].trim() === '}') break;
            }
        }
        questionCount++;
    }
    if (updatedCount === 2) break;
}

if (updatedCount < 2) {
    console.error(`Only updated ${updatedCount} questions. Check indices.`);
    process.exit(1);
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Update complete!');

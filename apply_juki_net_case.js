const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);

console.log('Preparing to update Constitution index 34 to 38 (Juki Net)...');

const jukiNetExplain = "[[section:解説：住基ネット訴訟（最判 平20.3.6）]]\\n[[character:boss]]\\nプライバシー権が「盾（邪魔されない自由）」としては強力に認められる一方、「剣（積極的に請求する権利）」としては認められなかった象徴的な判決です。\\n\\n[[character:midBoss]]\\n[[bold:1. 憲法13条が保障する権利の範囲]]\\n・[[bold:自由（消極的側面）]]: 何人も個人情報を[[red:「みだりに開示・公表されない自由」]]を有し、これは憲法13条で保障されます。\\n・[[bold:権利（積極的側面）]]: 自分の情報の閲覧・訂正・抹消を公権力に請求する権利までは、[[red:憲法13条には含まれない]]とされました。\\n\\n[[bold:2. 4情報の秘匿性]]\\n氏名・生年月日・性別・住所の4情報は、個人の内面に関わるような[[red:「秘匿性の高い情報」とは言えない]]、と判断されています。\\n\\n[[bold:3. 住基ネットの合憲性]]\\n行政目的（サービス向上・効率化）が正当であり、漏洩の[[red:「具体的な危険」]]が生じているとは言えないため、システムは[[bold:合憲]]とされました。\\n\\n[[point:「秘匿性は高くないが、13条で（みだりに開示されない自由として）守られてはいる」という二段構えが試験の急所です！]]";

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
const targetIndices = [34, 35, 36, 37, 38];

for (let i = arrayStartLine + 1; i < lines.length; i++) {
    if (lines[i].trim() === '{') {
        if (targetIndices.includes(questionCount)) {
            for (let j = i; j < lines.length; j++) {
                if (lines[j].includes('"explain":') || lines[j].includes("'explain':")) {
                    console.log(`Updating index ${questionCount} at line ${j + 1}...`);
                    lines[j] = `        "explain": "${jukiNetExplain}",`;
                    updatedCount++;
                    break;
                }
                if (lines[j].trim() === '},' || lines[j].trim() === '}') break;
            }
        }
        questionCount++;
    }
    if (updatedCount === targetIndices.length) break;
}

if (updatedCount < targetIndices.length) {
    console.error(`Only updated ${updatedCount} questions. Check indices.`);
    process.exit(1);
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Update complete for all 5 questions!');

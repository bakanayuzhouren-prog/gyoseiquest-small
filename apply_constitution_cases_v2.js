const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);

console.log('Searching for target lines for Constitution index 11, 12, and 13...');

// 12/230 世田谷目黒事件
const setagayaExplain = "[[section:解説：公務員の政治活動（世田谷目黒事件）]]\\n[[character:boss]]\\n[[bold:1. 事件の概要]]\\n厚労省の課長補佐（管理職）が休日にビラ配布等を行い、国公法違反で起訴された事件。\\n\\n[[character:midBoss]]\\n[[bold:2. 判決のポイント：なぜ有罪か？]]\\n最高裁は堀越事件と同様の基準を用いつつも、以下の理由で有罪としました。\\n・[[red:管理職という地位]]: 職務の裁量権や部下への指揮権がある。\\n・[[red:実質的なおそれ]]: 特定政党を応援すると、行政判断の公平性に疑念を抱かせる影響力が大きいため。\\n\\n[[bold:3. 堀越事件（無罪）との比較]]\\n・[[bold:堀越事件]]: 一般職（現場窓口）、裁量なし。[[red:無罪。]]\\n・[[bold:世田谷目黒事件]]: 課長補佐（管理職）、裁量あり。[[red:有罪。]]\\n\\n[[point:「管理職かどうか（職務の裁量権があるか）」が、アウトとセーフの分かれ目です！]]";

// 13/230 天皇の民事裁判権
const emperorExplain = "[[section:解説：天皇の民事裁判権]]\\n[[character:boss]]\\n[[bold:1. 最高裁の判断（平1.11.20）]]\\n天皇には[[red:「民事裁判権が及ばない」]]ものと解するのが相当であるとされました。\\n\\n[[character:midBoss]]\\n[[bold:2. なぜ裁判権が及ばないのか？]]\\n・[[bold:象徴としての尊厳]]: 象徴である方を被告として法廷に立たせることは、その尊厳を損なう恐れがあるから。\\n・[[bold:代わりの救済手段あり]]: 天皇個人を訴えられなくても、国を相手に国家賠償などを起こせば国民の権利救済は図れるから。\\n\\n[[bold:【比較表：裁判権の有無】]]\\n・[[bold:天皇]]: 民事(及ばない)、刑事(及ばない)\\n・[[bold:皇族]]: 民事(及ぶ)、刑事(及ばない ※皇室典範による)\\n・[[bold:総理]]: 民事(及ぶ)、刑事(在任中は訴追されない)\\n\\n[[point:「天皇は特別（象徴）」だけど、個人が損害を受けたら国を訴えればOK、という理屈です！]]";

// 14/230 旭川学テ事件
const asahikawaExplain = "[[section:解説：学習権と教育内容決定権（旭川学テ事件）]]\\n[[character:boss]]\\n教育を受ける権利の背後には、自己完成のための[[red:「学習権」]]がある、というのが判例の立場です。\\n\\n[[character:midBoss]]\\n[[bold:1. 子供と大人の「学習権」の違い]]\\n・[[bold:子供]]: 自力で学習できない。国や保護者に「教育を施せ」と求める[[red:具体的で強い権利]]。\\n・[[bold:大人一般]]: 知的好奇心を充足するための教育環境を求める権利。\\n\\n[[bold:2. 教育内容の決定権（折衷説）]]\\n「国が決めるか、国民が決めるか」に対し、最高裁は[[red:「どちらかが独占するものではない」]]としました。ただし、子供の学習権のため、国も必要かつ相当な範囲で決定権を持ちます。\\n\\n[[point:大人の権利の語尾「〜教育を施すことを要求する権利を有する」というフレーズは試験の定番！答えは◯です。]]";

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
    11: setagayaExplain,
    12: emperorExplain,
    13: asahikawaExplain
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
    if (updatedCount === 3) break;
}

if (updatedCount < 3) {
    console.error(`Only updated ${updatedCount} questions. Check indices.`);
    process.exit(1);
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Update complete!');

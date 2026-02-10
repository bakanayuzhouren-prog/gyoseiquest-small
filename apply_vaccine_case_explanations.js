const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);

console.log('Preparing to update Constitution index 29 to 32...');

const explanations = {
    29: "[[section:解説：東京地裁昭和59.5.18（東京予防接種禍訴訟）]]\\n[[character:boss]]\\n予防接種の副作用被害について、国の過失（国家賠償責任）を初めて広範に認めた歴史的判決です。\\n\\n[[character:midBoss]]\\n[[bold:1. 判決のポイント：国の「過失」を認定]]\\n・[[bold:予見可能性と回避義務]]: 国は副作用を予見できたはずであり、禁忌チェックの徹底など、被害回避の措置が不十分だったとされました。\\n・[[bold:集団接種の限界]]: 体質を考慮せず一律に「強制」に近い形で行う集団接種には、安全配慮義務の欠如があったと断じました。\\n\\n[[bold:2. 「損失補償」と「国家賠償」の交差点]]\\n・[[bold:昭和58年最高裁]]: 損失補償（落ち度なしの犠牲）で救済。\\n・[[bold:昭和59年東京地裁]]: 国家賠償（国の落ち度・過失）で救済。\\n\\n[[point:「国に落ち度・過失があった！」と厳しく指弾した点に、この地裁判決の大きな意義があります。]]",

    30: "[[section:解説：1.「救済の谷間」の問題と立法による解決]]\\n[[character:boss]]\\n適法な行政活動で損害が出た際、従来の枠組みでは救済が漏れてしまうことを[[red:「補償の谷間」]]と呼びます。\\n\\n[[character:midBoss]]\\n[[bold:1. なぜ救済が漏れるのか？]]\\n・[[bold:国家賠償の限界]]: 公務員に「過失」がなければ認められません。不可避な副作用には過失が認められにくい。\\n・[[bold:損失補償の限界]]: 本来は「財産権」を想定しており、命や体への被害は想定されていませんでした。\\n\\n[[bold:2. 学説の視点]]\\n裁判所が解釈で救済するのには限界があるため、国会が[[red:「報償責任」]]（利益を得る者が損失も負担する）の観点から補償法を作るべき（立法による解決）だと主張されます。\\n\\n[[point:「過失もないし、財産でもない」という、既存の法律が届かない隙間をどう埋めるかが議論の核です！]]",

    31: "[[section:解説：2.生命・身体に対する「特別な犠牲」]]\\n[[character:boss]]\\n「なぜ土地は補償されるのに、もっと大切な命や体は補償されないのか？」という疑問に対する学説の回答です。\\n\\n[[character:midBoss]]\\n[[bold:1. 特別犠牲説の拡大]]\\n感染症蔓延防止という公共の利益のために、個人が受忍限度を超える被害を受けた場合、それは[[red:「特別な犠牲」]]にあたります。\\n\\n[[bold:2. 憲法13条の活用]]\\n憲法29条（財産権）だけでなく、個人の尊厳を保障する[[red:憲法13条（人格的自律権）]]を根拠に加えます。\\n\\n[[point:「財産が補償されるなら、それより価値の高い命や体が補償されないのは理不尽だ！」と、29条3項を類推適用する考え方です。]]",

    32: "[[section:解説：3.過失認定の困難性と「結果責任」]]\\n[[character:boss]]\\n高度な科学技術が絡む分野では、学説上「過失」の考え方が修正されています。\\n\\n[[character:midBoss]]\\n[[bold:1. 過失認定の限界]]\\n当時の科学水準で予見できなかった副作用について、医師の「過失（不注意）」を責めるのは論理的に無理があります。\\n\\n[[bold:2. 危険責任（リスク責任）の理論]]\\n[[red:「高度な危険を伴う活動を管理し、利益を得ている国は、結果に対して責任を負うべき」]]という考え方（無過失責任に近い結果責任的アプローチ）です。\\n\\n[[point:科学の限界による救済漏れを防ぐため、過失の有無を問わず、結果そのものに責任を負わせるという強力な論理です！]]"
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

let questionCount = 0;
let updatedCount = 0;
const targetIndices = Object.keys(explanations).map(Number);

for (let i = arrayStartLine + 1; i < lines.length; i++) {
    if (lines[i].trim() === '{') {
        if (explanations[questionCount]) {
            for (let j = i; j < lines.length; j++) {
                if (lines[j].includes('"explain":') || lines[j].includes("'explain':")) {
                    console.log(`Updating index ${questionCount} at line ${j + 1}...`);
                    lines[j] = `        "explain": "${explanations[questionCount]}",`;
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
console.log('Update complete for all 4 questions!');

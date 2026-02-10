const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);

console.log('Preparing to update Constitution index 39 to 43...');

const explanations = {
    39: "[[section:解説：京都府学連事件（最大判 昭44.12.24）]]\\n[[character:boss]]\\n肖像権（撮影されない自由）を初めて認めた、超重要判例です。\\n\\n[[character:midBoss]]\\n[[bold:1. 憲法13条と「撮影されない自由」]]\\n憲法13条を根拠に、[[red:「何人も、その承諾なしに、みだりにその容ぼう・姿態を撮影されない自由」]]を有すると明言しました。\\n\\n[[bold:2. 撮影が「適法」となる3要件]]\\n以下のハードルをすべて満たせば、[[red:令状なし]]でも撮影は適法です。\\n1. 現に犯罪が行われ（または直後）であること。\\n2. 証拠保全の必要性および緊急性があること。\\n3. 方法が相当であること。\\n\\n[[point:「指紋押捺」「住基ネット」もすべて13条が根拠。セットで覚えましょう！]]",

    40: "[[section:解説：GPS捜査事件（最大判 平29.3.15）]]\\n[[character:boss]]\\nテクノロジーと私生活の不可侵がぶつかった、歴史的判決です。\\n\\n[[character:midBoss]]\\n[[bold:1. 強制の処分にあたるか？]]\\n最高裁は、GPS捜査は個人のプライバシーを大きく侵害し、公的領域に深く踏み込むものであるため、[[red:「強制の処分」]]に該当すると判断しました。\\n\\n[[bold:2. 結論と提言]]\\n・[[red:令状なしのGPS捜査は違法]]。\\n・既存の令状では不十分であり、プライバシーを保護しつつ捜査を管理する[[red:「新しい法律（立法）」]]が必要であると指摘しました。\\n\\n[[point:単なる尾行とは異なり、「私的領域への実質的な侵入」とみなされた理由が重要です！]]",

    41: "[[section:解説：電話傍受事件（最決 平11.12.16）]]\\n[[character:boss]]\\n通信の秘密（21条2項）と、捜査の限界が争われた判例です。\\n\\n[[character:midBoss]]\\n[[bold:1. 傍受が「適法」となる4要件]]\\n傍受は[[red:「強制の処分」]]であり、以下の要件を満たす場合に限り、検証令状による傍受は適法です。\\n1. [[bold:重大な犯罪]]: 犯罪が重大かつ現在進行中であること。\\n2. [[bold:補充性]]: 他の方法では捜査が著しく困難であること。\\n3. [[bold:相当性]]: 期間や方法が適切であること。\\n4. [[bold:司法のコントロール]]: 裁判官の令状による事前審査。\\n\\n[[point:憲法21条2項の「通信の秘密」は絶対ではなく、重大な犯罪捜査のために必要最小限度の制限は可能、という立場です。]]",

    42: "[[section:解説：オービスと同乗者の肖像権（最二小判 昭61.2.14）]]\\n[[character:boss]]\\n「違反していない助手席の人が写っちゃうのはアリ？」という問いへの答えです。\\n\\n[[character:midBoss]]\\n[[bold:1. 結論：合憲]]\\n速度違反の運転者を撮影する際、[[red:不可避的に同乗者が写り込んだとしても]]、直ちに憲法13条には違反しません。\\n\\n[[bold:2. 理由]]\\n・走行中の車を狙い撃つ際、隣の人が入るのは物理的に避けられない（[[bold:不可避性]]）。\\n・犯罪捜査の必要性があり、一般市民の我慢の範囲内（[[bold:受忍限度]]）であるため。\\n\\n[[point:「不可避的ならば許容される」というフレーズが正誤問題の分かれ目になります！]]",

    43: "[[section:解説：GPS捜査事件（憲法35条と令状主義）]]\\n[[character:boss]]\\n憲法35条（令状主義）とプライバシーの関係を深掘りします。\\n\\n[[character:midBoss]]\\n[[bold:1. なぜ「検証令状」ではダメなのか？]]\\n最高裁は、GPSによる24時間の絶え間ない位置情報の取得は、従来の「検証（場所の確認）」の枠組みを大きく超えていると考えました。\\n\\n[[bold:2. 川崎民商事件との繋がり]]\\n「強制的に個人のプライバシーを暴くなら、裁判官の令状（司法のコントロール）が必要」という、35条の精神が強く働いています。\\n\\n[[point:「GPS捜査は任意捜査の範囲内である」という選択肢は[[red:×]]です。必ず令状または新法が必要です！]]"
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
console.log('Update complete for all 5 questions!');

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);

console.log('Preparing to update Constitution index 49 to 59...');

const ex = {
    // 51: 福岡県道路交通取締条例
    50: "[[section:解説：福岡県道路交通取締条例事件（最大判 昭33.10.15）]]\\n[[character:boss]]\\n「地域格差＝即、違憲」ではない！地方自治の精神を確認した重要判例だよ。\\n\\n[[character:midBoss]]\\n[[bold:1. なぜ「地域差」があってもいいの？]]\\n憲法が[[red:地方自治（92条〜）]]を認めている以上、地域ごとにルールが異なるのは当然です。\\n・[[bold:合理的差別の容認]]: 交通量や事故率など、地域の実情に応じた「合理的理由」があれば、憲法14条には違反しません。\\n\\n[[point:「合理的理由」があればOK。何でも一律にするのが平等ではなく、事情に合わせるのが相対的平等です！]]",

    // 52: 重複立候補
    51: "[[section:解説：重複立候補制事件（最大判 平11.11.10）]]\\n[[character:boss]]\\n選挙制度の設計は[[red:「国会の広い裁量」]]に委ねられている、というスタンスが明確に示されたよ。\\n\\n[[character:midBoss]]\\n[[bold:1. 政党所属候補だけの優遇？]]\\n無所属候補は重複立候補できませんが、これは[[bold:合憲]]です。\\n・比例代表制はもともと「政党」を対象としたものであり、その枠組みの中で重複を認めるのは合理的。\\n・[[bold:立法裁量（47条）]]: 明らかに不当でない限り、裁判所は国会の判断を尊重します。\\n\\n[[point:「無所属＝不利」はあっても、それが直ちに憲法違反になるわけではない、という理屈です！]]",

    // 53, 56, 58 (婚外子相続分 / 非嫡出子)
    52: "[[section:解説：婚外子相続分差別訴訟（最大決 平25.9.4）]]\\n[[character:boss]]\\n日本の家族法と人権の歴史における大転換点！「嫡出子の1/2」が[[red:違憲]]とされたよ。\\n\\n[[character:midBoss]]\\n[[bold:1. なぜ違憲になったの？]]\\n・[[bold:子供に責任はない]]: 出生という自分では選べない事情で不利益を課すのはNG。\\n・[[bold:社会情勢の変化]]: 事実婚への意識の変化や国際的な「子供の権利」を重視する潮流。\\n\\n[[point:かつては「合憲」だったものが、時代の変化で「違憲」に変わった典型例です！]]",
    55: "[[section:解説：婚外子相続分差別訴訟（最大決 平25.9.4）]]\\n[[character:boss]]\\n嫡出子と非嫡出子の相続分差別は「もはや合理的な根拠はない」として[[red:違憲]]とされました。\\n\\n[[character:midBoss]]\\n[[bold:【試験対策の急所：将来効】]]\\n「今日から違憲」と言っても、すでに決着がついた過去の相続までひっくり返すことはできません。これを法的安定性の確保と言います。\\n\\n[[point:行政書士試験では、目的（法律婚尊重）は正当だが、手段（1/2の差）がやりすぎ、というロジックを覚えましょう！]]",

    // 54: 尊属殺
    53: "[[section:解説：尊属殺重罰規定違憲事件（最大判 昭48.4.4）]]\\n[[character:boss]]\\n最高裁が初めて法律を[[red:「違憲」]]と断じた、記念碑的な判決だよ！\\n\\n[[character:midBoss]]\\n[[bold:1. 何がダメだったの？]]\\n・[[bold:目的（合憲）]]: 親を敬うという「尊属敬愛」自体はOK。\\n・[[bold:手段（違憲）]]: 刑罰が「死刑または無期」のみで執行猶予も付けられない過酷さが、14条の「平等」に反するとされました。\\n\\n[[point:「目的はいいけど、罰が重すぎて手段がダメ」というロジックが違憲の決め手です！]]",

    // 55, 59 (再婚禁止期間)
    54: "[[section:解説：再婚禁止期間違憲判決（最大判 平27.12.16）]]\\n[[character:boss]]\\n180日のうち、[[red:「100日を超える部分」]]が違憲とされた画期的な判決だよ。\\n\\n[[character:midBoss]]\\n[[bold:1. ロジック：目的と手段]]\\n・[[bold:目的]]: 父性の推定の重複を避ける（子供の身分を守る）のは正当。\\n・[[bold:手段]]: 重複を避けるには100日で十分！それ以上は不合理な差別です。\\n\\n[[point:全部が違憲じゃないよ！100日まではOK、それを超えるのがNG。現在は法改正で撤廃されています！]]",
    58: "[[section:解説：再婚禁止期間違憲判決（最大判 平27.12.16）]]\\n[[character:boss]]\\n科学技術（DNA鑑定）や家族観の変化により、明治以来の「180日」が合理性を失ったよ。\\n\\n[[character:midBoss]]\\n[[bold:【試験の重要ポイント】]]\\n尊属殺と同様に、「目的はいいけど手段（期間）がやりすぎ」というパターンです。その後、民法が改正され期間が短縮され、現在は廃止に至っています。\\n\\n[[point:「期間そのものが違憲」ではなく、「100日超が不当」というニュアンスが大切です！]]",

    // 57: 国籍法
    56: "[[section:解説：国籍法違憲判決（最大判 平20.6.4）]]\\n[[character:boss]]\\n日本人父が認知しただけではダメ？その厳しすぎる要件が[[red:違憲]]とされたよ。\\n\\n[[character:midBoss]]\\n[[bold:1. なぜ違憲なの？]]\\n・[[bold:不合理な条件]]: 父が認知していても、父母が結婚しない限り国籍が取れないのは、子供の意思ではどうにもできない事情による差別です。\\n・結論：国籍法3条1項の「婚姻」要件は憲法14条に違反します。\\n\\n[[point:「認知があればOK」という現行法への道を作った、権利拡大の判決だよ！]]",

    // 58: 出生届
    57: "[[section:解説：出生届の記載事項合憲判決（最決 平25.9.26）]]\\n[[character:boss]]\\n相続分はダメだけど、書類にチェックを入れるのは[[bold:合憲]]？その違いを解説するよ。\\n\\n[[character:midBoss]]\\n[[bold:1. なぜ合憲なの？]]\\n・[[bold:事務的必要性]]: 制度上、正確な身分関係を把握する必要があり、記載させることは合理的な範囲内です。\\n・相続分との違い：相続は「利益の不利益」だが、記載は「事務的な手続」にすぎない、と考えられました。\\n\\n[[point:「非嫡出子に関する規定はすべて違憲」というひっかけに注意！記載はOKです。]]",

    // 49, 59, 60 (夫婦別姓 / 夫婦同氏)
    49: "[[section:解説：夫婦別姓訴訟（最大判 平27.12.16）]]\\n[[character:boss]]\\n「氏は人格の象徴」！でも、今の制度が直ちに違憲とは言えない理由を整理したよ。\\n\\n[[character:midBoss]]\\n[[bold:1. 氏の人格的利益]]\\n婚姻前に築いた信用や評価を維持する利益は、人格権そのものではないが、[[red:「人格的利益」]]として尊重されるべきものとされました。\\n\\n[[point:「利益」ではない、というひっかけに注意！人格権そのものではないが、大切な利益です。]]",
    59: "[[section:解説：夫婦別姓訴訟（最大判 平27.12.16）]]\\n[[character:boss]]\\n民法750条（夫婦同氏）を[[bold:合憲]]とした判決だよ。国会で決めるべき、というスタンスだね。\\n\\n[[character:midBoss]]\\n[[bold:1. なぜ合憲なの？]]\\n・[[bold:家族の呼称]]: 氏には「家族を識別する」という社会的な役割もある。\\n・立法裁量：どのような制度にするかは、国会の広い裁量に委ねられています。\\n\\n[[point:2021年（令和3年）にも再確認されています。結論は一貫して「合憲」だよ！]]"
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
const targetIndices = Object.keys(ex).map(Number);

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
    if (updatedCount === targetIndices.length) break;
}

if (updatedCount < targetIndices.length) {
    console.error(`Only updated ${updatedCount} questions. Check indices.`);
    process.exit(1);
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Update complete for all questions!');

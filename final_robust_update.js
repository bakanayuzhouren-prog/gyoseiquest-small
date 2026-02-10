const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const linesArr = rawContent.split(/\r?\n/);

console.log('Final Update: Injecting Constitution Deep Dives (Indices 60-69)...');

const sorachibuto = "[[section:解説：空知太神社事件（最大判 平22.1.20）]]\\n[[character:boss]]\\n砂川市が市有地を神社の敷地としてタダで貸し出したことが「違憲」とされた大事件だよ！\\n\\n[[character:midBoss]]\\n[[bold:1. 判決のロジック：総合判断]]\\n最高裁は「目的効果基準」だけでなく、[[red:「一般人の宗教的評価」]]を重視しました。\\n・[[bold:目的の正当性（違憲）]]: 町内会の集会所が含まれていても、中心は「神社（鳥居や社殿）」であり、特定宗教への支援とみなされました。\\n・[[bold:手段の相当性（違憲）]]: タダで貸すのは「強力な援助」であり、国家の中立性を損なう「中立性の喪失」にあたります。\\n\\n[[bold:2. 箕面忠魂碑との違い（試験の急所！）]]\\n| 項目 | 箕面忠魂碑（合憲） | 空知太神社（違憲） |\\n| :--- | :--- | :--- |\\n| 性格 | 戦没者慰霊（記念碑） | 神社（宗教施設） |\\n| 歴史 | 小学校の拡張に伴う移設 | 長年にわたる無償貸与 |\\n| 意義 | 希薄（もはや習俗） | 濃厚（誰が見ても神社） |\\n\\n[[bold:3. 解消への配慮]]\\nいきなり神社を壊せとは言わず、土地を譲渡したり有償化したりして「違憲状態」を解消するソフトランディングを認めました。\\n\\n[[point:「空知太 ＝ 違憲」！孔子廟訴訟（令和3年）もこのロジックを継承しているのでセットで覚えよう！]]";

const tsu_groundbreaking = "[[section:解説：津地鎮祭訴訟（最大判 昭52.7.13）]]\\n[[character:boss]]\\n「地鎮祭は宗教か習俗か？」という問いに、最高裁が「セーフ（合憲）」を出した有名判例だよ。\\n\\n[[character:midBoss]]\\n[[bold:1. 判定基準の確立]]\\nここで[[red:「目的効果基準」]]が誕生しました。\\n・[[bold:目的]]: 建物の安全を願う、世俗的な「習俗」にすぎない。\\n・[[bold:効果]]: 特定の宗教を援助し、他を圧迫するほどではない。\\n\\n[[point:「地鎮祭は合憲」！空知太神社（違憲）や孔子廟（違憲）との違いを意識して覚えよう！]]";

const minoh = "[[section:解説：箕面忠魂碑事件（最判 平5.2.16）]]\\n[[character:boss]]\\n「戦死者を祀る碑」は宗教か、それとも記念碑か？最高裁の答えを整理するよ。\\n\\n[[character:midBoss]]\\n[[bold:1. 結論：合憲]]\\n・[[bold:理由]]: 忠魂碑は「戦没者の記念碑」としての性格が強く、移設の目的も世俗的なものでした。\\n・[[bold:判定]]: 宗教人意義が希薄化し、世俗的な慰霊行事として定着しているため、合憲とされました。\\n\\n[[point:「忠魂碑 ＝ 記念碑的性格 ＝ 世俗的 ＝ 合憲」というロジックを覚えよう！]]";

const ehime = "[[section:解説：愛媛玉串料訴訟（最大判 平9.4.2）]]\\n[[character:boss]]\\n政教分離で最高裁が初めて[[red:「違憲」]]を突きつけた、超重要判決だよ！\\n\\n[[character:midBoss]]\\n[[bold:1. なぜアウトなの？]]\\n「玉串料」として公金を支出することは、特定の宗教儀式に直接参画するのと等しく、宗教的意義が濃厚です。\\n・[[bold:判定]]: 社会に「特定の宗教と特別の関わりを持つ」印象を与え、援助・助長に当たるとされました。\\n\\n[[point:「地鎮祭（合憲）」に対し、「玉串料（違憲）」！この仕分けが試験で最も問われます！]]";

const jieitai = "[[section:解説：自衛隊合祀訴訟（最大判 昭63.6.1）]]\\n[[character:boss]]\\n「信仰とは違う宗教儀式をされた不快感」が法的侵害になるか争われた判決だよ。\\n\\n[[character:midBoss]]\\n[[bold:1. 結論：合憲（適法）]]\\n・[[bold:理由]]: 他人が自分と違う宗教儀式を行っても、それが信仰を直接妨げない限り、ある程度は「受忍（我慢）」すべきである。\\n・[[bold:静謐な環境]]: 「静謐な宗教的環境で過ごす権利」は、法的保護に値する権利とは認められませんでした。\\n\\n[[point:不快感はあっても「法的権利侵害」ではない、という厳しい判断を覚えよう！]]";

const aum = "[[section:解説：オウム真理教解散命令事件（最判 平8.1.30）]]\\n[[character:boss]]\\n「解散命令は信教の自由を奪うのか？」という問いに最高裁が答えたよ。\\n\\n[[character:midBoss]]\\n[[bold:1. ロジック：法的資格 vs 個人の信仰]]\\n・[[bold:合憲（適法）]]: 解散命令は「宗教法人」という「法的資格」を取り消すだけ。\\n・[[bold:間接的な制約]]: 個人の信仰そのものを禁じるものではなく、施設が使えなくなるのは「付随的な不利益」にすぎません。\\n\\n[[point:「解散命令は信教の自由を直接制約するものではない」という結論が重要だよ！]]";

const ex = {
    60: tsu_groundbreaking,
    61: minoh,
    62: ehime,
    63: jieitai,
    64: aum,
    65: sorachibuto,
    66: sorachibuto,
    67: tsu_groundbreaking,
    68: sorachibuto,
    69: sorachibuto
};

let subjectStartLine = -1;
for (let i = 0; i < linesArr.length; i++) {
    if (linesArr[i].includes('"憲法": {') || linesArr[i].includes("'憲法': {")) {
        subjectStartLine = i;
        break;
    }
}

let arrayStartLine = -1;
for (let i = subjectStartLine; i < linesArr.length; i++) {
    if (linesArr[i].includes('"憲法": [') || linesArr[i].includes("'憲法': [")) {
        arrayStartLine = i;
        break;
    }
}

let questionCount = 0;
let depth = 0;
let updatedCount = 0;

for (let i = arrayStartLine + 1; i < linesArr.length; i++) {
    const line = linesArr[i].trim();

    if (line.includes('{')) {
        if (depth === 0) {
            // Found top-level question object
            if (ex[questionCount]) {
                for (let j = i; j < linesArr.length; j++) {
                    if (linesArr[j].includes('"explain":') || linesArr[j].includes("'explain':")) {
                        console.log(`Updating accurately Index ${questionCount} at Line ${j + 1}...`);
                        linesArr[j] = `        "explain": "${ex[questionCount]}",`;
                        updatedCount++;
                        break;
                    }
                    // Exit if we hit the end of the object without finding explain (unlikely but safe)
                    if (linesArr[j].trim().startsWith('}') && linesArr[j].includes(',')) break;
                }
            }
            questionCount++;
        }
        depth += (line.match(/{/g) || []).length;
    }

    if (line.includes('}')) {
        depth -= (line.match(/}/g) || []).length;
    }

    if (questionCount > 70 && depth < 0) break;
}

console.log(`Total accurately updated: ${updatedCount}`);
fs.writeFileSync(filePath, linesArr.join('\n'), 'utf8');
console.log('Done!');

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);

console.log('Preparing to update Constitution index 60 to 64...');

const ex = {
    // 61: 津地鎮祭
    60: "[[section:解説：津地鎮祭訴訟（最大判 昭52.7.13）]]\\n[[character:boss]]\\n政教分離の「アウトかセーフか」を決める魔法の基準、[[red:「目的効果基準」]]の誕生だ！\\n\\n[[character:midBoss]]\\n[[bold:1. 判定アルゴリズム]]\\n1. [[bold:目的]]: その行為に宗教的意義があるか？\\n2. [[bold:効果]]: 宗教を援助・助長、または圧迫・干渉するか？\\n[[bold:両方の条件を満たして初めて「違憲」]]となります。\\n\\n[[bold:2. 地鎮祭の判定結果：合憲]]\\n・[[bold:目的]]: 建築の安全を願う世俗的な習俗にすぎない。\\n・[[bold:効果]]: 特定の宗教を優遇するものではない。\\n\\n[[point:「地鎮祭はセーフ（合憲）」！試験では『宗教との関わり合いが相当とされる限度を超えるもの』を禁じている、というフレーズが出ます。]]",

    // 62: 箕面忠魂碑
    61: "[[section:解説：箕面忠魂碑事件（最判 平5.2.16）]]\\n[[character:boss]]\\n「戦死者を祀る碑」は宗教か、それとも記念碑か？最高裁の答えを整理するよ。\\n\\n[[character:midBoss]]\\n[[bold:1. 結論：合憲]]\\n忠魂碑の移設や土地の無償貸与は合憲とされました。\\n・[[bold:理由]]: 忠魂碑は「戦没者の記念碑」としての性格が強く、移設の目的も校舎増築という世俗的なものでした。\\n・[[bold:判定]]: 宗教的意義が希薄化し、世俗的な慰霊行事として定着しているため、援助にはあたらない。\\n\\n[[point:「忠魂碑 ＝ 記念碑的性格 ＝ 世俗的 ＝ 合憲」という数式を脳内に叩き込みましょう！]]",

    // 63: 愛媛玉串料
    62: "[[section:解説：愛媛玉串料訴訟（最大判 平9.4.2）]]\\n[[character:boss]]\\n政教分離で最高裁が初めて[[red:「違憲」]]を突きつけた、歴史的な金字塔判決だよ！\\n\\n[[character:midBoss]]\\n[[bold:1. なぜアウトなの？]]\\n「玉串料」として公金を支出することは、特定の宗教儀式に直接参画するのと等しく、宗教的意義が濃厚です。\\n・[[bold:目的効果基準]]: 県が特定の宗教と特別の関わりを持つ印象を社会に与え、援助・助長に当たるとされました。\\n\\n[[point:「地鎮祭（合憲）」に対し、「玉串料・献灯料（違憲）」！この仕分けが試験で一番出るところです！]]",

    // 64: 自衛隊合祀
    63: "[[section:解説：自衛隊合祀訴訟（最大判 昭63.6.1）]]\\n[[character:boss]]\\n「信仰とは違う宗教儀式をされた不快感」は権利侵害になるか？という厳しい判決だよ。\\n\\n[[character:midBoss]]\\n[[bold:1. 結論：合憲（法的権利の侵害ではない）]]\\nキリスト教徒の遺族の意思に反して護国神社に合祀されましたが、違憲とはされませんでした。\\n・[[bold:理由]]: 他人が自分と違う宗教儀式を行っても、それが信仰を直接妨げない限り、ある程度は[[red:「我慢（受忍）」]]すべきである。\\n・[[bold:静謐な環境]]: 遺族が主張した「静謐な宗教的環境で過ごす権利」は、法的保護に値する権利とは認められませんでした。\\n\\n[[point:不快感はあっても「法的権利侵害」ではない。試験では『静謐な環境』がキーワードです！]]",

    // 65: オウム真理教解散命令
    64: "[[section:解説：オウム真理教解散命令事件（最判 平8.1.30）]]\\n[[character:boss]]\\n「解散命令は信教の自由を奪うのか？」という点に、最高裁が明確な答えを出したよ。\\n\\n[[character:midBoss]]\\n[[bold:1. ロジック：法的資格 vs 個人の信仰]]\\n・[[bold:合憲（適法）]]: 解散命令はあくまで「宗教法人」という[[red:「法的資格」を剥奪するだけ]]のものです。\\n・[[bold:間接的な制約]]: 信者個人の信仰そのものを禁じるものではなく、施設が使えなくなる等の不利益は「付随的な結果」にすぎません。\\n\\n[[point:「解散命令は信教の自由を直接制約するものではない」というフレーズを覚えましょう！]]"
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

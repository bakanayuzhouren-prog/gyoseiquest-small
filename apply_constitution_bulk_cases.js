const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'questions.js');
const rawContent = fs.readFileSync(filePath, 'utf8');
const lines = rawContent.split(/\r?\n/);

console.log('Preparing to update Constitution index 14 to 22...');

const explanations = {
    14: "[[section:解説：指紋押捺拒否事件（最判 平7.12.15）]]\\n[[character:boss]]\\n[[bold:1. 憲法13条と「指紋を撮られない自由」]]\\n最高裁は、憲法13条の私生活上の自由として、[[red:「何人もみだりに指紋の押捺を強制されない自由」]]を保障していると明言しました。\\n\\n[[character:midBoss]]\\nこの自由は、性質上、日本に在留する[[red:外国人にも等しく及びます。]]\\n\\n[[bold:2. 「正当な理由」による制限]]\\n一方で、外国人登録制度の目的（身分関係の正確な把握）達成のために指紋は最も確実な手段であり、[[red:「必要かつ合理的」]]な制限として合憲とされました。\\n\\n[[point:保障は及ぶが、正当な理由があるから制限されても仕方ない（合憲）、というロジックを覚えましょう！]]",

    15: "[[section:解説：森川キャサリン事件（最判 平4.1.25）]]\\n[[character:boss]]\\nこの判録は、外国人の「再入国の許可」をめぐる重要判例です。\\n\\n[[character:midBoss]]\\n[[bold:1. 出国の自由 vs 再入国の自由]]\\n・[[bold:出国の自由]]: 憲法22条2項により、外国人にも保障されます。\\n・[[bold:再入国の自由]]: 憲法上、外国人の「日本に入ってくる自由」は保障されていません。再入国は性質上「入国」と同じであり、[[red:国の広い裁量]]に委ねられます。\\n\\n[[bold:2. 結論]]\\n「外国に一時旅行する自由（再入国を前提とした出国）」は、[[red:憲法上保障されているものではない]]と結論づけられました。\\n\\n[[point:「一回出てまた戻ってくる権利」は保障されていない。すべては法務大臣の裁量次第、というシビアなスタンスです！]]",

    16: "[[section:解説：マクリーン事件（最大判 昭53.10.4）]]\\n[[character:boss]]\\n外国人の「政治活動の自由」の限界を示した、憲法で最も重要な判例の一つです。\\n\\n[[character:midBoss]]\\n[[bold:1. 原則と例外]]\\n・[[bold:原則]]: 政治活動の自由も、外国人にも保障される（性質説）。\\n・[[bold:例外（限界）]]: [[red:「わが国の政治的意思決定またはその実施に影響を及ぼす活動」]]などは、保障が及ばない。\\n\\n[[bold:2. 在留の権利との関係（超重要！）]]\\n・外国人が日本に在留する権利は、[[red:憲法上保障されていない（国の恩恵）]]。\\n・保障の範囲内の政治活動であっても、それを理由に法務大臣が「在留更新を拒否」することは、直ちに違憲とはならない（裁量権。\\n\\n[[point:「権利として守られること」と「在留更新の判断材料にされること」は別、というのがひっかけの急所です！]]",

    17: "[[section:解説：東京都管理職選考試験事件（最大判 平17.1.26）]]\\n[[character:boss]]\\n外国人の地方公務員への就任、特に「管理職への昇任」についての判決です。\\n\\n[[character:midBoss]]\\n[[bold:1. 公権力行使の法理]]\\n・[[bold:一般事務職]]: 外国人の採用を禁止しているわけではない。\\n・[[bold:公権力行使職（管理職等）]]: [[red:「公権力の行使」や「国家意思の形成」]]に関わる職は、日本国民が担当すべき（国民主権）であり、外国人が就くことは想定されていない。\\n\\n[[bold:2. 結論]]\\n管理職試験を日本国民に限定することは合理的であり、[[red:憲法14条（平等権）にも違反しない]]とされました。\\n\\n[[point:「公務員になること自体」は禁止されていないが、「公権力を行使するレベル」には国民限定の壁がある、という区別が大切です！]]",

    18: "[[section:解説：塩見訴訟（最判 昭64.3.2）]]\\n[[character:boss]]\\n在留外国人の「社会権（生存権）」に関するリーディングケースです。\\n\\n[[character:midBoss]]\\n[[bold:1. 立法裁量の重視]]\\n限られた財源の中で誰を優先的に保護するかは、[[red:「国の政治的判断（立法裁量）」]]に委ねられています。\\n\\n[[bold:2. 結論]]\\n障害福祉年金の対象から外国人を外す（国籍条項）ことは、憲法25条（生存権）や14条（平等権）に違反しないと判断されました。\\n\\n[[big:【人権の種類と保障の差】]]\\n・[[bold:自由権]]: 原則保障（マクリーン）。\\n・[[bold:社会権]]: [[red:国の裁量が大きい。]] 自国民優先が許容される。\\n\\n[[point:予算が絡む「生存権」については、国に広いさじ加減（裁量）が認められているのがポイントです！]]",

    19: "[[section:解説：よど号記事抹消事件（最判 昭58.6.22）]]\\n[[character:boss]]\\n在監者（拘置所に収容されている人）の「知る権利」の制限に関する判例です。\\n\\n[[character:midBoss]]\\n[[bold:1. 制限が許される基準]]\\n単に「恐れ」があるだけでは不十分で、以下の条件が必要です。\\n・[[red:「相当の蓋然性（かなりの確からしさ）」]]があること。\\n・制限が[[red:「必要最小限度」]]であること。\\n\\n[[bold:2. 判例のキーワード]]\\n拘置所内の新聞記事の切り取りは、規律・秩序を乱す「相当の蓋然性」があったため合憲とされました。\\n\\n[[point:「新聞の閲覧（知る権利）」は、タバコの制限より厳しい基準（相当の蓋然性）でチェックされます！]]"
};

// 20-22 も 19 と同じ解説（よど号関連）をセット
explanations[20] = explanations[19];
explanations[21] = explanations[19];
explanations[22] = explanations[19];

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
console.log('Update complete for all 9 questions!');

const fs = require('fs');

let content = fs.readFileSync('./src/questions.js', 'utf8');

const q51 = {
    "text": "代理権の錯誤（民法101条）に関する次の記述のうち、正しいものはどれか。",
    "choices": [
        "代理人が相手方と契約を締結した際、代理人のみに錯誤があった場合、本人は当該契約を取り消すことができない。",
        "代理人が相手方と契約を締結した際、本人のみに錯誤があり代理人には錯誤がなかった場合でも、本人は錯誤を理由に契約を取り消すことができる。",
        "代理人がした意思表示の効力が、錯誤、詐欺、強迫、またはある事情を知っていたこと（悪意）などによって影響を受けるべきときは、その事由の有無は「代理人」を基準として判断する。",
        "本人が代理人に対し、特定の法律行為を委託した場合において、代理人が本人の指図に従ってその行為をしたときは、本人は、自分が知っていた事情について、代理人が知らなかったことを理由として主張できる。"
    ],
    "answer": [2],
    "explain": "[[big:1. 代理人基準説（民法101条1項）]]\n代理人がした意思表示の効力が、錯誤、詐欺、強迫、あるいはある事情を知っていた（悪意）か知らなかった（善意）かによって影響を受ける場合、その判断基準は[[red:「代理人」]]になります。\n\n- **代理人が騙された場合：** 本人が知らなくても取消し可能。\n- **代理人がカン違い（錯誤）した場合：** 本人が知らなくても取消し可能。\n- **本人が騙されても代理人が騙されていない場合：** 原則として取消し不可。\n\n[[big:2. 本人の指図がある場合の例外（101条3項）]]\n本人が「あいつを騙してこい」と言ったり、ある事情を知っていながら代理人に指図して契約させた場合、本人は「代理人が知らなかった（善意だった）」ということを言い訳にできません。\n\n[[big:3. 2020年改正のポイント（101条2項）]]\n「相手方が代理人に対してした意思表示」についても、その効力が相手方の錯誤などで影響を受けるときは、代理人を基準に判断します。",
    "wordBank": "",
    "memo": "",
    "slots": [],
    "refId": "civil_agency_mistake",
    "isBonus": false,
    "chunks": [
        { "subject": "民法", "id": 50, "title": "代理人の詐欺" },
        { "subject": "民法", "id": 52, "title": "代理権の乱用" }
    ]
};

const q52 = {
    "text": "代理権の乱用（民法107条）に関する次の記述のうち、正しいものはどれか。",
    "choices": [
        "代理人が自己の利益を図る目的で代理権の範囲内の行為をした場合、その行為は常に有効であり、本人は責任を負わなければならない。",
        "代理人が自己の利益を図る目的で代理権の範囲内の行為をした場合、相手方がその目的を知っていたとしても、権利の外観を信じた相手方は保護される。",
        "代理人が自己または第三者の利益を図る目的で代理権の範囲内の行為をした場合において、相手方がその目的を知り、または知ることができたときは、その行為は「無権代理」とみなされる。",
        "代理権の乱用があった場合、本人がその行為を追認しても、契約が有効になることはない。"
    ],
    "answer": [2],
    "explain": "[[big:1. 代理権の乱用とは？（民法107条）]]\n代理人が、形の上では「本人のために」代理権の範囲内で行動していながら、心の中では[[red:「自分のお小遣いにしよう」「友達を儲けさせよう」]]といった不純な目的で動くことです。\n\n[[big:2. 原則と例外]]\n\n[[bold:原則： 有効]]\n相手方が普通に取引した場合、本人はその責任を負わなければなりません。\n\n[[bold:例外： 無権代理とみなす]]\n相手方が、代理人の不純な目的を[[red:「知っていた（悪意）」]]、または[[red:「注意すれば気づけた（有過失）」]]場合には、もはやその相手方を保護する必要はありません。この場合、107条により[[bold:「無権代理」]]とみなされ、本人は追認しない限り責任を負いません。\n\n[[big:3. 無権代理とみなされる効果]]\n- 本人は追認できる。\n- 追認がない限り、本人に効果は帰属しない（責任を負わない）。\n- 相手方は無権代理人の責任（117条）を追及できる。",
    "wordBank": "",
    "memo": "",
    "slots": [],
    "refId": "civil_agency_abuse",
    "isBonus": false,
    "chunks": [
        { "subject": "民法", "id": 50, "title": "代理人の詐欺" },
        { "subject": "民法", "id": 51, "title": "代理権の錯誤" }
    ]
};

const chunksFor50 = [
    { "subject": "民法", "id": 51, "title": "代理権の錯誤" },
    { "subject": "民法", "id": 52, "title": "代理権 of 乱用" } // User might prefer title as "代理権の乱用"
];
chunksFor50[1].title = "代理権の乱用";

// Find where minpoSoron ends (it's the first subject in "民法")
const lines = content.split('\n');
let minpoSoronArrayStart = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"民法総論": [')) {
        minpoSoronArrayStart = i;
        break;
    }
}

if (minpoSoronArrayStart !== -1) {
    let braceCount = 0;
    let inArray = false;
    for (let i = minpoSoronArrayStart; i < lines.length; i++) {
        if (lines[i].includes('[')) {
            if (!inArray) {
                inArray = true;
                braceCount++;
            } else {
                braceCount++;
            }
        }
        if (lines[i].includes(']')) {
            braceCount--;
            if (braceCount === 0) {
                // Found the end of the array. Append before the closing bracket.
                const newQuestions = `,\n      ${JSON.stringify(q51, null, 2)},\n      ${JSON.stringify(q52, null, 2)}`;
                lines[i] = newQuestions + "\n    ]";
                content = lines.join('\n');
                break;
            }
        }
    }
}

// Update Q50 chunks
function updateQ50Chunks(contentStr) {
    const lines = contentStr.split('\n');
    let minpoSoronStart = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"民法総論": [')) {
            minpoSoronStart = i;
            break;
        }
    }

    let currentIdx = -1;
    let braceCount = 0;
    for (let i = minpoSoronStart + 1; i < lines.length; i++) {
        if (lines[i].includes('{')) {
            if (braceCount === 0) currentIdx++;
            braceCount++;
        }
        if (lines[i].includes('}')) {
            braceCount--;
            if (braceCount === 0 && currentIdx === 50) {
                // Replace the chunks field
                // It was: "chunks": [ ... ]
                // We'll look back from here to find the object start or just use regex on the object.
                // Simpler: find the "chunks" property within this range.
                for (let j = i - 1; j > 0; j--) {
                    if (lines[j].includes('"chunks": [')) {
                        // Found it. Replace the whole sub-array.
                        let k = j;
                        while (!lines[k].includes(']')) k++;
                        lines.splice(j, k - j + 1, `        "chunks": ${JSON.stringify(chunksFor50, null, 10)}`);
                        return lines.join('\n');
                    }
                }
            }
        }
    }
    return contentStr;
}

content = updateQ50Chunks(content);

fs.writeFileSync('./src/questions.js', content, 'utf8');
console.log("Successfully added Q51, Q52 and updated Q50 chunks.");

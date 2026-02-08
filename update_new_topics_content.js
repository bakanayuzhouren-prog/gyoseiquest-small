const fs = require('fs');

let content = fs.readFileSync('./src/questions.js', 'utf8');

const explain51 = `[[big:1. どっちの「勘違い」を基準にするか？]]
代理人が契約を行った場合、その契約に「勘違い（錯誤）」があったかどうかは、原則として代理人を基準に判断します（民法101条1項）。本人が勘違いしていなくても、代理人が勘違いしていれば、その契約は錯誤による取消しの対象になります。

[[big:2. 本人が「指図」した時の例外]]
ただし、本人が「あの土地を買いなさい」と具体的に指図していた場合は別です。この場合、本人が知っていた事情（または不注意で知らなかった事情）について、代理人が知らなかった（勘違いした）と主張することはできません（民法101条3項）。

[[big:3. なぜ「代理人基準」なのか？]]
契約の場にいて、実際に意思決定をしているのは代理人だからです。 [[marker:代理人が騙されたり勘違いしたりして結んだ契約]]を、そのまま本人に押し付けるのは、代理制度の本質に反すると考えられています。`;

const explain52 = `[[big:1. 代理権の範囲内だけど「目的」が不当な場合]]
代理人が、自分の借金を返すためや、自分の利益のために、代理権の範囲内の行為をすることを「代理権の濫用」といいます。例えば、「土地を売る権限」がある代理人が、売却代金を着服するつもりで売るようなケースです。

[[big:2. 相手方が「悪意・有過失」なら無権代理（民法107条）]]
改正民法でハッキリとルールが決まりました。

[[bold:原則：]] 代理権の範囲内なので、契約は有効。

[[bold:例外：]] 相手方が、代理人の「着服してやろう」という下心を知っていた（悪意）、または不注意で気づかなかった（有過失）場合、その行為は[[red:無権代理]]とみなされます。

[[big:3. なぜ「無権代理」とみなすのか？]]
相手方が代理人の裏切り行為を知っていた（または気づけた）のであれば、その相手方を守る必要はありません。 むしろ、裏切られた本人を保護し、本人に契約の責任を負わせない（＝[[marker:無権代理として本人は拒絶できる]]）ようにするのが公平だからです。`;

// Find Q51 and Q52 objects in "民法総論"
const lines = content.split('\n');
let minpoSoronStart = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"民法総論": [')) {
        minpoSoronStart = i;
        break;
    }
}

let currentIdx = -1;
let braceCount = 0;
let updatedQ51 = false;
let updatedQ52 = false;

for (let i = minpoSoronStart + 1; i < lines.length; i++) {
    if (lines[i].includes('{')) {
        if (braceCount === 0) currentIdx++;
        braceCount++;
    }
    if (lines[i].includes('}')) {
        braceCount--;
    }

    if (braceCount > 0) {
        if (currentIdx === 51 && lines[i].includes('"explain":')) {
            lines[i] = `    "explain": ${JSON.stringify(explain51)},`;
            updatedQ51 = true;
        }
        if (currentIdx === 52 && lines[i].includes('"explain":')) {
            lines[i] = `    "explain": ${JSON.stringify(explain52)},`;
            updatedQ52 = true;
        }
    }

    if (updatedQ51 && updatedQ52) break;
}

if (updatedQ51 && updatedQ52) {
    fs.writeFileSync('./src/questions.js', lines.join('\n'), 'utf8');
    console.log("Successfully updated explanations for Q51 and Q52.");
} else {
    console.error("Failed to find Q51 or Q52.");
}

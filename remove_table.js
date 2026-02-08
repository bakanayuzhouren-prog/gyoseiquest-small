
const fs = require('fs');
const path = require('path');

const targetPath = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

try {
    console.log(`Reading file: ${targetPath}`);
    const content = fs.readFileSync(targetPath, 'utf8');
    const lines = content.split('\n');
    console.log(`Read ${lines.length} lines.`);

    // 10/88 (Index 9, Line 5267 -> index 5266) - 詐術
    const c9_fraud_v3 = `[[big:1. 原則：単なる「黙秘」は詐術ではない]]
自分が制限行為能力者であることを相手に伝えなかった（黙っていた）というだけでは、原則として「詐術」にはあたりません。

[[marker:【ここがポイント！】]]
未成年者が**「単に大人っぽく見える（老けている）」**というだけでは、詐術にはあたりません。なぜなら、民法は制限行為能力者を厚く保護しているため、積極的に自分から告白しなかった程度で取消権を奪うのは厳しすぎるからです。

[[big:2. 例外：黙秘が「詐術」になる場合]]
単に黙っていただけでなく、他の言動と組み合わさって[[red:「相手を積極的にカン違い（誤信）させた」]]場合には、詐術とみなされます。

[[marker:具体例：]]
* **「ビールはやっぱり生ですよね」**など、成人であることを前提とした会話を積極的に行い、相手が「この人は成人だ」と確信してしまうような状況を作った場合。
* 嘘の身分証を提示したり、偽造した同意書を見せたりした場合。

[[big:3. 試験で狙われる「詐術」の3パターン]]

[[bold:① 積極的に嘘をつく]]（「私は大人です」と明言）
[[red:→ 詐術にあたる（取消しできない）]]

[[bold:② 単なる黙秘]]（聞かれなかったので言わなかった）
→ 詐術にあたらない（取消しできる）

[[bold:③ 黙秘 ＋ 誤信を強める言動]]（判例のケース）
[[red:→ 詐術にあたる（取消しできない）]]`;

    lines[5266] = `        "explain": ${JSON.stringify(c9_fraud_v3)},`;

    console.log("Saving back to file...");
    fs.writeFileSync(targetPath, lines.join('\n'));
    console.log("Successfully updated src/questions.js for index 9 (Table removed)");

} catch (err) {
    console.error("An error occurred:");
    console.error(err);
    process.exit(1);
}

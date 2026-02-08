
const fs = require('fs');
const path = require('path');

const targetPath = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

try {
    console.log(`Reading file: ${targetPath}`);
    const content = fs.readFileSync(targetPath, 'utf8');
    const lines = content.split('\n');
    console.log(`Read ${lines.length} lines.`);

    // 10/88 (Index 9, Line 5267 -> index 5266) - 詐術
    const c9_fraud = `[[big:1. 原則：単なる「黙秘」は詐術ではない]]
自分が制限行為能力者であることを相手に伝えなかった（黙っていた）というだけでは、原則として「詐術」にはあたりません。なぜなら、民法は制限行為能力者を厚く保護しているため、「嘘をつけとまでは言わないが、積極的に自分から告白しなかった」程度で取消権を奪うのは厳しすぎるからです。

[[marker:【ここが重要！】]]
[[bold:「未成年者が大人びて見える（老けている）」]]という外見上の理由だけで、「相手を騙した（詐術）」とみなされることはありません。あくまで「本人がどのような言動をとったか」が判断基準になります。

[[big:2. 例外：黙秘が「詐術」になる場合]]
あなたが挙げた通り、[[bold:「単に黙っていただけでなく、他の言動と組み合わさって相手をカン違い（誤信）させた」]]場合には、詐術とみなされます。

[[marker:ポイント：]]
* 相手が「この人は能力者だな」と信じている状態を、さらに強めるような言動があったかどうか。具体的には、嘘の身分証を見せたり、「自分は会社経営者で経験豊富だ」といった振る舞いをして、相手が「それなら制限行為能力者なわけがない」と確信してしまうようなケースです。

[[big:3. 試験で狙われる「詐術」の3パターン]]
行政書士試験対策として、以下の3つのケースを整理しておきましょう。

| ケース | 詐術にあたるか | 取消しできるか |
| :--- | :--- | :--- |
| **積極的に嘘をつく**（「私は大人です」と明言） | [[red:あたる]] | [[red:できない]] |
| **単なる黙秘**（聞かれなかったので言わなかった） | あたらない | できる |
| **黙秘 ＋ 誤信を強める言動**（判例のケース） | [[red:あたる]] | [[red:できない]] |`;

    lines[5266] = `        "explain": ${JSON.stringify(c9_fraud)},`;

    console.log("Saving back to file...");
    fs.writeFileSync(targetPath, lines.join('\n'));
    console.log("Successfully updated src/questions.js for index 9");

} catch (err) {
    console.error("An error occurred:");
    console.error(err);
    process.exit(1);
}

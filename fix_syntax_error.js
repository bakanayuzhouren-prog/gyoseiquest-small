const fs = require('fs');
const path = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

try {
    let content = fs.readFileSync(path, 'utf8');
    const targetText = '憲法の概念に関する次の記述のうち、妥当なものはどれか。';

    // エスケープを二重にせず、バッククォートではなく通常の文字列として定義し、JSON.stringifyで安全に埋め込みます
    const rawExplain = `[[big:1. 硬性憲法と軟性憲法の定義]]
憲法の改正手続きが、通常の法律（一般法）の制定・改廃手続きよりも厳格か否かで区別されます。

[[bold:硬性憲法 (Rigid Constitution):]]
改正に[[red:「出席議員の3分の2以上の賛成」]]や[[red:「国民投票」]]など、通常の法律（過半数の賛成など）よりも高いハードルが課されている憲法です。
日本、アメリカ、ドイツ、フランスなどがこれに該当します。

[[bold:軟性憲法 (Flexible Constitution):]]
通常の法律と同じ手続きで改正できる憲法です。典型例は[[red:イギリス]]です。
イギリスには「不文憲法」の伝統があり、議会が制定する法律が憲法と同等の重みを持ちます。

[[big:2. ドイツ・フランスが「硬性」なのに改正が多い理由]]
「硬性＝改正しにくい＝改正回数が少ない」と考えがちですが、実際にはそうではありません。
ドイツやフランスは手続き上は間違いなく「硬性憲法」ですが、改正回数は非常に多いのが特徴です。

[[marker:ドイツ（基本法）の事例]]
1949年の制定以来、[[bold:60回以上]]改正されています。
[[bold:なぜ硬性か：]] 改正には連邦議会（下院）と連邦参議院（上院）の[[red:両方で3分の2以上の賛成]]が必要です。
[[bold:なぜ多いか：]] ドイツでは、新しい課題が生じるたびに、条文を具体的に書き換えて対応する文化があるためです。
[[bold:憲法の核：]] ただし、人間としての尊厳や民主主義の本質については改正を禁じる[[red:「戦う民主主義（永久条項）」]]が存在します。

[[marker:フランス（第五共和国憲法）の事例]]
1958年の制定以来、[[bold:20回以上]]改正されています。
[[bold:なぜ硬性か：]] 改正には両議院の可決に加え、[[red:国民投票]]または両院合同会議での[[red:5分の3以上の賛成]]が必要です。
[[bold:なぜ多いか：]] 時代の変化に合わせて統治機構を微調整することを厭わない姿勢があります。

[[big:3. 日本との比較：手続きの「重み」の違い]]
日本国憲法も硬性憲法ですが、1947年の施行以来、[[bold:一度も改正されていません]]。

[[bold:国名 | 改正手続き | 回数 | 分類]]
----------------------------------------
[[bold:日本]] | 各議院の2/3 + 国民投票 | 0回 | [[bold:硬性]]
[[bold:米国]] | 2/3以上の賛成 + 3/4の州承認 | 27回 | [[bold:極めて硬性]]
[[bold:独国]] | 連邦議会・参議院の2/3 | 60回+ | [[bold:硬性]]
[[bold:英国]] | 通常の法律と同じ | 頻繁 | [[bold:軟性]]

[[big:周辺知識：なぜ硬性にする必要があるのか？]]
憲法を硬性にする最大の目的は[[marker:「少数派の保護」と「法の安定性」]]です。

[[bold:1. 時の政権による濫用防止:]]
権力者が自分に都合のいいように規定をコロコロ変えてしまうのを防ぎます。
[[bold:2. 最高法規性の担保:]]
国家の根本的なルールを一段高い場所に置くためです。

[[marker:💡 POINT]]
「硬性」とは「改正不可能」という意味ではなく、[[red:「熟議を必要とする」]]という意味であると捉えると、ドイツやフランスの例が分かりやすくなります。`;

    const explainValue = JSON.stringify(rawExplain);

    const startIndex = content.indexOf(targetText);
    if (startIndex === -1) {
        console.error('Target text not found');
        process.exit(1);
    }

    // "explain": " から始まる箇所を探す
    const explainKey = '"explain": "';
    const explainIndex = content.indexOf(explainKey, startIndex);
    if (explainIndex === -1) {
        console.error('Explain key not found');
        process.exit(1);
    }

    // 既存の (壊れた) explain の終わりを探す (次のキー "wordBank" の前まで)
    const nextKeyIndex = content.indexOf('"wordBank":', explainIndex);
    if (nextKeyIndex === -1) {
        console.error('Next key wordBank not found');
        process.exit(1);
    }

    // 構築し直し
    const prefix = content.substring(0, explainIndex);
    const suffix = content.substring(nextKeyIndex);

    // JSON.stringify は前後にダブルクォートを付けるので、キー名と結合
    const updatedContent = prefix + '"explain": ' + explainValue + ',\n        ' + suffix;

    fs.writeFileSync(path, updatedContent, 'utf8');
    console.log('Successfully fixed syntax error in questions.js');
} catch (err) {
    console.error('Error fixing file:', err);
    process.exit(1);
}

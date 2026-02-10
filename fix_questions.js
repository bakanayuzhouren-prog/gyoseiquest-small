const fs = require('fs');
const path = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

try {
    let content = fs.readFileSync(path, 'utf8');

    // First, find the first question
    const q0Text = '憲法の概念に関する次の記述のうち、妥当なものはどれか。';
    const q1Text = '次の文章は、基本的人権の分類についてかつて有力であったある考え方を整理・要約したものである。';

    // We want to clear explain for q1 and set for q0
    // To be safe, let's find the explain field for q1 first and clear it if it has the text
    const q1Start = content.indexOf(q1Text);
    if (q1Start !== -1) {
        const q1ExplainStart = content.indexOf('"explain": "', q1Start);
        const q1ExplainEnd = content.indexOf('",', q1ExplainStart + 12);
        const currentQ1Explain = content.substring(q1ExplainStart + 12, q1ExplainEnd);

        if (currentQ1Explain.includes('硬性憲法と軟性憲法の定義')) {
            console.log('Found incorrect explain in Question 1. Clearing it...');
            content = content.substring(0, q1ExplainStart) + '"explain": ""' + content.substring(q1ExplainEnd + 1);
        }
    }

    // Now ensure Q0 has it (though it likely already has it, we just make it clean)
    // But since line numbers might have shifted, we re-read or just use the current content
    const q0Start = content.indexOf(q0Text);
    if (q0Start !== -1) {
        const q0ExplainStart = content.indexOf('"explain": "', q0Start);
        // Note: it might be "explain": "" or "explain": "..."
        // If it's "explain": "", it's 13 chars. If it's already populated, we find the end quote.
        const q0ExplainEnd = content.indexOf('",', q0ExplainStart + 12);

        const explainText = `[[big:1. 硬性憲法と軟性憲法の定義]]\\n憲法の改正手続きが、通常の法律（一般法）の制定・改廃手続きよりも厳格か否かで区別されます。\\n\\n[[bold:硬性憲法 (Rigid Constitution):]]\\n改正に[[red:「出席議員の3分の2以上の賛成」]]や[[red:「国民投票」]]など、通常の法律（過半数の賛成など）よりも高いハードルが課されている憲法です。\\n日本、アメリカ、ドイツ、フランスなどがこれに該当します。\\n\\n[[bold:軟性憲法 (Flexible Constitution):]]\\n通常の法律と同じ手続きで改正できる憲法です。典型例は[[red:イギリス]]です。\\nイギリスには「不文憲法」の伝統があり、議会が制定する法律が憲法と同等の重みを持ちます。\\n\\n[[big:2. ドイツ・フランスが「硬性」なのに改正が多い理由]]\\n「硬性＝改正しにくい＝改正回数が少ない」と考えがちですが、実際にはそうではありません。\nドイツやフランスは手続き上は間違いなく「硬性憲法」ですが、改正回数は非常に多いのが特徴です。\\n\\n[[marker:ドイツ（基本法）の事例]]\\n1949年の制定以来, [[bold:60回以上]]改正されています。\\n[[bold:なぜ硬性か：]] 改正には連邦議会（下院）と連邦参議院（上院）の[[red:両方で3分の2以上の賛成]]が必要です。\\n[[bold:なぜ多いか：]] ドイツでは、新しい課題が生じるたびに、条文を具体的に書き換えて対応する文化があるためです。\\n[[bold:憲法の核：]] ただし、人間としての尊厳や民主主義の本質については改正を禁じる[[red:「戦う民主主義（永久条項）」]]が存在します。\\n\\n[[marker:フランス（第五共和国憲法）の事例]]\\n1958年の制定以来, [[bold:20回以上]]改正されています。\\n[[bold:なぜ硬性か：]] 改正には両議院の可決に加え、[[red:国民投票]]または両院合同会議での[[red:5分の3以上の賛成]]が必要です。\\n[[bold:なぜ多いか：]] 時代の変化に合わせて統治機構を微調整することを厭わない姿勢があります。\\n\\n[[big:3. 日本との比較：手続きの「重み」の違い]]\\n日本国憲法も硬性憲法ですが、1947年の施行以来, [[bold:一度も改正されていません]]。\\n\\n[[bold:国名 | 改正手続き | 回数 | 分類]]\\n----------------------------------------\\n[[bold:日本]] | 各議院の2/3 + 国民投票 | 0回 | [[bold:硬性]]\\n[[bold:米国]] | 2/3以上の賛成 + 3/4の州承認 | 27回 | [[bold:極めて硬性]]\\n[[bold:独国]] | 連邦議会・参議院の2/3 | 60回+ | [[bold:硬性]]\\n[[bold:英国]] | 通常の法律と同じ | 頻繁 | [[bold:軟性]]\\n\\n[[big:周辺知識：なぜ硬性にする必要があるのか？]]\\n憲法を硬性にする最大の目的は[[marker:「少数派の保護」と「法の安定性」]]です。\\n\\n[[bold:1. 時の政権による濫用防止:]]\\n権力者が自分に都合のいいように規定をコロコロ変えてしまうのを防ぎます。\\n[[bold:2. 最高法規性の担保:]]\\n国家の根本的なルールを一段高い場所に置くためです。\\n\\n[[marker:💡 POINT]]\\n「硬性」とは「改正不可能」という意味ではなく, [[red:「熟議を必要とする」]]という意味であると捉えると、ドイツやフランスの例が分かりやすくなります。`;

        content = content.substring(0, q0ExplainStart) + '"explain": "' + explainText + '"' + content.substring(q0ExplainEnd + 1);
    }

    fs.writeFileSync(path, content, 'utf8');
    console.log('Cleanup successful');
} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}

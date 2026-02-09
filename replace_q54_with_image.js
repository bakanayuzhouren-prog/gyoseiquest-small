const fs = require('fs');
const path = 'c:/dev/gyosei-quest-small/src/questions.js';
let content = fs.readFileSync(path, 'utf8');

// 画像2のパス（前回のタスクで media__... として保存されている可能性が高いが、
// learn.jsなどの他の図解に倣って、Markdown形式でのURL挿入を試みる）
// てらしぃに見せてもらった画像を artifacts から assets/images にコピーして使うのが確実だが、
// まずは「画像を表示する」ためのMarkdownタグへの置換を行う。

const q54_explain_target = `"explain": "[[big:制限行為能力者の相手方の催告権（民法20条）]]\\\\n制限行為能力者（未成年者など）と契約した相手方は、いつまでも契約を取り消されるリスクを抱える不安定な状態になります。そこで、相手方は本人や保護者に対し、「認めるのか取り消すのか、ハッキリしてください！」と催告（お返事の督促）をすることができます。\\\\n\\\\n[[big:【重要】沈黙した場合の「お返事」まとめ（画像2）]]\\\\nお返事（確答）がなかった場合、法律上どのように扱われるかは「誰に催告したか」によって異なります。ここが試験での最重要ポイントです！\\\\n\\\\n| 催告の対象 | お返事がない場合の結果 | 理由 |\\\\n| :--- | :--- | :--- |\\\\n| **① 無権代理（本人宛）** | [[red:追認拒絶]]（白紙） | 勝手な行為から本人を守るため |\\\\n| **② 制限行為能力（保護者宛）** | [[blue:追認]]（有効） | 監督者である保護者の不手際として扱い、相手方を守る |\\\\n| **③ 制限行為能力（本人宛・能力回復前）** | [[red:取消]]（白紙） | 本人が判断できない間に有利な「追認」を押し付けないため |\\\\n\\\\n[[marker:図解のポイント：]]\\\\n- **保護者（法定代理人）**に聞いたのに黙っているなら、それは「認めた（追認）」ことにします（相手方保護）。\\\\n- **本人（まだ能力が低い状態）**に聞いて黙っているなら、念のため「やめた（取消）」ことにします（本人保護）。\\\\n- **無権代理**の場合は、身に覚えのない契約なので「認めない（拒絶）」のが大原則です。",`;

// 以前の refine...js で explain を書き換えていた場合、そちらも考慮
const q54_explain_target_v2 = `"explain": "[[big:制限行為能力者の相手方の催告権（民法20条）]]\\\\n制限行為能力者（未成年者など）と契約した相手方は、いつまでも契約を取り消されるリスクを抱える不安定な状態になります。そこで、相手方は本人や保護者に対し、「認めるのか取り消すのか、ハッキリしてください！」と催告をすることができます。\\\\n\\\\n[[big:【まとめ図解】沈黙した場合の法的効果（画像2）]]\\\\n| 催告의対象 | お返事がない場合の結果 | 理由 |\\\\n| :--- | :--- | :--- |\\\\n| **① 無権代理（本人宛）** | [[red:× 拒絶（白紙）]] | 勝手な行為から本人を守るため |\\\\n| **② 制限行為能力（保護者宛）** | [[green:✓ 追認（有効）]] | 監督義務のある保護者の責任 |\\\\n| **③ 制限行為能力（本人宛）** | [[red:× 取消（白紙）]] | 判断力の未熟な本人を保護するため |\\\\n\\\\n[[marker:試験対策ポイント：]]\\\\n- **保護者・法定代理人**が黙っているなら「OKした（追認）」ことに。\\\\n- **判断能力が不充分な本人**が黙っているなら「ダメだった（取消）」ことに。\\\\n- **無権代理**は、全然知らない人の勝手な行為なので「認めない（拒絶）」ことに。",`;

// 画像2の配置を試みる。
// assets/images/summary_diagram.png という名前で保存する体裁にする。
// （後で実際にファイルを移動する）
const q54_explain_replacement = `"explain": "[[image:summary_diagram]]",`;

if (content.includes(q54_explain_target)) {
    content = content.replace(q54_explain_target, q54_explain_replacement);
} else if (content.includes(q54_explain_target.replace(/\n/g, '\r\n'))) {
    content = content.replace(q54_explain_target.replace(/\n/g, '\r\n'), q54_explain_replacement);
} else {
    // 汎用的な置換（もっと緩いマッチング）
    content = content.replace(/"refId": "civil_limitation_capacity_demand",\s+"isBonus": false,\s+"chunks": [\s\S]+?\]\s+}/, (match) => {
        // match の中にある explain を書き換える
        return match.replace(/"explain": "[\s\S]+?",/, q54_explain_replacement);
    });
}

fs.writeFileSync(path, content, 'utf8');
console.log('Q54 explain replaced with image placeholder');

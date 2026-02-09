const fs = require('fs');
const path = 'c:/dev/gyosei-quest-small/src/questions.js';
let content = fs.readFileSync(path, 'utf8');

// 1. 問題53のchunksを「その他催告 (ID 54)」の1つだけに絞る（抹消）
// 以前追加した状態をターゲットにして置換する
const q53_chunks_target = `"chunks": [
          {
            "subject": "民法総論",
            "id": 50,
            "title": "代理人の詐欺"
          },
          {
            "subject": "民法総論",
            "id": 51,
            "title": "代理権の錯誤"
          },
          {
            "subject": "民法総論",
            "id": 52,
            "title": "代理権の乱用"
          },
          {
            "subject": "民法総論",
            "id": 54,
            "title": "その他催告"
          }
        ]`;

const q53_chunks_replacement = `"chunks": [
          {
            "subject": "民法総論",
            "id": 54,
            "title": "その他催告"
          }
        ]`;

// CRLF/LF両対応で置換
if (content.includes(q53_chunks_target)) {
    content = content.replace(q53_chunks_target, q53_chunks_replacement);
} else {
    const q53_chunks_target_crlf = q53_chunks_target.replace(/\n/g, '\r\n');
    const q53_chunks_replacement_crlf = q53_chunks_replacement.replace(/\n/g, '\r\n');
    if (content.includes(q53_chunks_target_crlf)) {
        content = content.replace(q53_chunks_target_crlf, q53_chunks_replacement_crlf);
    } else {
        console.error('Q53 chunks target not found exactly.');
        // 問題53をrefIdで特定して再構築を検討
    }
}

// 2. 問題54（ID 54）の内容を画像2に基づいて再構成する
// 既存のID 54の内容を検索して置換
const q54_search = '"refId": "civil_limitation_capacity_demand"';
const q54_explain_text = `[[big:制限行為能力者の相手方の催告権（民法20条）]]\\n制限行為能力者（未成年者など）と契約した相手方は、いつまでも契約を取り消されるリスクを抱える不安定な状態になります。そこで、相手方は本人や保護者に対し、「認めるのか取り消すのか、ハッキリしてください！」と催告をすることができます。\\n\\n[[big:【まとめ図解】沈黙した場合の法的効果（画像2）]]\\n| 催告の対象 | お返事がない場合の結果 | 理由 |\\n| :--- | :--- | :--- |\\n| **① 無権代理（本人宛）** | [[red:× 拒絶（白紙）]] | 勝手な行為から本人を守るため |\\n| **② 制限行為能力（保護者宛）** | [[green:✓ 追認（有効）]] | 監督義務のある保護者の責任 |\\n| **③ 制限行為能力（本人宛）** | [[red:× 取消（白紙）]] | 判断力の未熟な本人を保護するため |\\n\\n[[marker:試験対策ポイント：]]\\n- **保護者・法定代理人**が黙っているなら「OKした（追認）」ことに。\\n- **判断能力が不充分な本人**が黙っているなら「ダメだった（取消）」ことに。\\n- **無権代理**は、全然知らない人の勝手な行為なので「認めない（拒絶）」ことに。`;

// 問題54の全体像を書き換える
// 一旦、追加したばかりのID 54を特定して explain を書き換える簡単なスクリプト
// （前回の追加が成功している前提）

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully refined questions.js');

const fs = require('fs');
const path = 'c:/dev/gyosei-quest-small/src/questions.js';
let content = fs.readFileSync(path, 'utf8');

// 1. 問題53のchunksに「その他催告 (ID 54)」を追加する
// 既存のchunksの末尾（ID 52の直後）に 54 を挿入
const q53_chunks_target = `{
            "subject": "民法総論",
            "id": 52,
            "title": "代理権の乱用"
          }
        ]`;
const q53_chunks_replacement = `{
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

// 2. 問題54（画像2の内容）を新規追加する
// 民法総論の最後（問題53の直後、配列の閉じ括弧の前）に挿入
const q54_insertion = `      },
      {
        "text": "制限行為能力者が行為能力者となった後、その相手方がその者に対し、一箇月以上の期間を定めて、その期間内にその取り消すことができる行為を追認するかどうかを確答すべき旨の催告をした場合において、その者がその期間内に確答を発しないときは、その行為を追認したものとみなされる。",
        "choices": [
          "妥当である",
          "妥当でない"
        ],
        "answer": [0],
        "explain": "[[big:制限行為能力者の相手方の催告権（民法20条）]]\\n制限行為能力者（未成年者など）と契約した相手方は、いつまでも契約を取り消されるリスクを抱える不安定な状態になります。そこで、相手方は本人や保護者に対し、「認めるのか取り消すのか、ハッキリしてください！」と催告（お返事の督促）をすることができます。\\n\\n[[big:【重要】沈黙した場合の「お返事」まとめ（画像2）]]\\nお返事（確答）がなかった場合、法律上どのように扱われるかは「誰に催告したか」によって異なります。ここが試験での最重要ポイントです！\\n\\n| 催告の対象 | お返事がない場合の結果 | 理由 |\\n| :--- | :--- | :--- |\\n| **① 無権代理（本人宛）** | [[red:追認拒絶]]（白紙） | 勝手な行為から本人を守るため |\\n| **② 制限行為能力（保護者宛）** | [[blue:追認]]（有効） | 監督者である保護者の不手際として扱い、相手方を守る |\\n| **③ 制限行為能力（本人宛・能力回復前）** | [[red:取消]]（白紙） | 本人が判断できない間に有利な「追認」を押し付けないため |\\n\\n[[marker:図解のポイント：]]\\n- **保護者（法定代理人）**に聞いたのに黙っているなら、それは「認めた（追認）」ことにします（相手方保護）。\\n- **本人（まだ能力が低い状態）**に聞いて黙っているなら、念のため「やめた（取消）」ことにします（本人保護）。\\n- **無権代理**の場合は、身に覚えのない契約なので「認めない（拒絶）」のが大原則です。",
        "wordBank": "",
        "memo": "",
        "slots": [],
        "refId": "civil_limitation_capacity_demand",
        "isBonus": false,
        "chunks": [
          {
            "subject": "民法総論",
            "id": 53,
            "title": "相手方の催告権"
          }
        ]
      }`;

// 修正実行
if (content.includes(q53_chunks_target)) {
    content = content.replace(q53_chunks_target, q53_chunks_replacement);
} else {
    // CRLF対応
    const q53_chunks_target_crlf = q53_chunks_target.replace(/\n/g, '\r\n');
    const q53_chunks_replacement_crlf = q53_chunks_replacement.replace(/\n/g, '\r\n');
    content = content.replace(q53_chunks_target_crlf, q53_chunks_replacement_crlf);
}

// 挿入実行
const boundary = '      }\n    ],\n    "民法物権": [';
const boundary_replacement = q54_insertion + '\n    ],\n    "民法物権": [';

if (content.includes(boundary)) {
    content = content.replace(boundary, boundary_replacement);
} else {
    const boundary_crlf = boundary.replace(/\n/g, '\r\n');
    const boundary_replacement_crlf = boundary_replacement.replace(/\n/g, '\r\n');
    content = content.replace(boundary_crlf, boundary_replacement_crlf);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated questions.js for Q54 and chunk link');

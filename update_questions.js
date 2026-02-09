const fs = require('fs');
const path = 'c:/dev/gyosei-quest-small/src/questions.js';
let content = fs.readFileSync(path, 'utf8');

// Chunk for ID 50
const chunk50_target = `"chunks": [
          {
            "subject": "民法総論",
            "id": 51,
            "title": "代理権の錯誤"
          },
          {
            "subject": "民法総論",
            "id": 52,
            "title": "代理権の乱用"
          }
        ]`;
const chunk50_replacement = `"chunks": [
          {
            "subject": "民法総論",
            "id": 51,
            "title": "代理権의錯誤"
          },
          {
            "subject": "民法総論",
            "id": 52,
            "title": "代理権の乱用"
          },
          {
            "subject": "民法総論",
            "id": 53,
            "title": "相手方の催告権"
          }
        ]`;

// Chunk for ID 51
const chunk51_target = `"chunks": [
          {
            "subject": "民法総論",
            "id": 50,
            "title": "代理人の詐欺"
          },
          {
            "subject": "民法総論",
            "id": 52,
            "title": "代理権の乱用"
          }
        ]`;
const chunk51_replacement = `"chunks": [
          {
            "subject": "民法総論",
            "id": 50,
            "title": "代理人の詐欺"
          },
          {
            "subject": "民法総論",
            "id": 52,
            "title": "代理権の乱用"
          },
          {
            "subject": "民法総論",
            "id": 53,
            "title": "相手方の催告権"
          }
        ]`;

// Chunk for ID 52
const chunk52_target = `"chunks": [
          {
            "subject": "民法総論",
            "id": 50,
            "title": "代理人の詐欺"
          },
          {
            "subject": "民法総論",
            "id": 51,
            "title": "代理権の錯誤"
          }
        ]`;
const chunk52_replacement = `"chunks": [
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
            "id": 53,
            "title": "相手方の催告権"
          }
        ]`;

// New question for ID 53
const q53_insertion = `      },
      {
        "text": "無権代理行為の相手方が本人に対し、相当の期間を定めて催告をした場合、本人が確答をしないときは、追認を拒絶したものとみなされる",
        "choices": [
          "妥当である",
          "妥当でない"
        ],
        "answer": [0],
        "explain": "[[big:1. 無権代理と相手方の催告権（民法114条）]]\\n無権代理行為（勝手に代理人を名乗って契約された状態）は、本人が「追認（あとから認めること）」しない限り、本人に効果は及びません。しかし、本人が「どうしようかな…」と黙ったままだと、相手方は契約が有効になるのか、それとも無効なのか分からず、ずっと不安定な立場に置かれてしまいます。\\n\\nそこで、相手方は本人に対し、[[bold:「やるのかやらないのか、ハッキリしてください！」と催告（さいこく）する権利]]を持っています。\\n\\n[[big:2. 「沈黙」は拒絶とみなされる（重要！）]]\\n本人が、相当の期間内に確答（お返事）をしない場合、[[red:「追認を拒絶したもの」]]とみなされます。\\n\\n[[marker:理由：]] 本人が何も言わないということは、積極的に「認めます」と言っていない以上、契約の責任を負わせない（＝拒絶したことにする）のが本人にとって安全であり、相手方にとっても契約が有効にならないことが確定するため、不確実な状態を解消できるからです。\\n\\n[[big:3. 制限行為能力者の「催告権」との違い]]\\nここが試験でよく狙われる最高難度のひっかけポイントです！\\n\\n項目	無権代理（本人の沈黙）	制限行為能力者（保護者の沈黙）\\nお返事がない場合	[[red:追認拒絶]]とみなす	[[blue:追認]]したとみなす（原則）\\n\\n[[bold:なぜ違うのか？]]\\n- **無権代理：** 本人が全く知らないところでされた勝手な行為なので、[[marker:本人を守るために「拒絶」]]にしたことにします。\\n- **制限行為能力者：** 保護者は本人の状況を監督すべき立場にあるため、お返事がないなら「認めた」ことにして、相手方を守ろうとする傾向があります（※例外あり）。",
        "wordBank": "",
        "memo": "",
        "slots": [],
        "refId": "civil_unqualified_agency_demand",
        "isBonus": false,
        "chunks": [
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
          }
        ]
      }`;

// Apply replacements
// Use split/join for simple replacement (replaces all occurrences, but target strings should be unique enough)
content = content.replace(chunk50_target, chunk50_replacement);
content = content.replace(chunk51_target, chunk51_replacement);
content = content.replace(chunk52_target, chunk52_replacement);

// Boundary replacement
const boundary = '      }\n    ],\n    "民法物権": [';
const boundary_replacement = q53_insertion + '\n    ],\n    "民法物権": [';

if (content.includes(boundary)) {
    content = content.replace(boundary, boundary_replacement);
} else {
    // Try with different line endings or slightly different spacing
    console.error('Boundary not found exactly. Trying alternative...');
    const alt_boundary = '      }\r\n    ],\r\n    "民法物権": [';
    if (content.includes(alt_boundary)) {
        content = content.replace(alt_boundary, q53_insertion + '\r\n    ],\r\n    "民法物権": [');
    } else {
        console.error('Alt boundary not found either.');
        process.exit(1);
    }
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated questions.js');

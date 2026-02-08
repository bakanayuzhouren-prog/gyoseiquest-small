
const fs = require('fs');
const path = require('path');

const targetPath = 'c:\\dev\\gyosei-quest-small\\src\\questions.js';

try {
    const content = fs.readFileSync(targetPath, 'utf8');
    const lines = content.split('\n');

    // Index 20 (Point 21: 管理人の権限)
    const c21_manager_auth = `[[big:1. 管理人ができる3つの行為]]
代理権の範囲がはっきり決まっていない管理人（不在者財産管理人など）は、以下の範囲内で活動できます。

[[bold:① 保存行為（ほぞんこうい）]]
* **内容：** 財産の現状を維持する行為です。
* **例：** 家屋の修繕、腐敗しやすい商品の売却、消滅時効の中断（更新）、未登記物件の登記。
* **ポイント：** これらは無制限に（本人の同意なしに）できます。

[[bold:② 利用行為（りようこうい）]]
* **内容：** 財産を収益化する行為です。
* **例：** お金を利息付きで貸し出す、空き家を賃貸に出す。
* **制限：** [[red:「目的である物又は権利の性質を変えない範囲」]]に限られます。

[[bold:③ 改良行為（かいりょうこうい）]]
* **内容：** 財産の価値を高める行為です。
* **例：** 家屋に造作を施す、無利息の貸金を利息付きにする。
* **制限：** 利用行為と同じく、[[red:「性質を変えない範囲」]]に限られます。

[[big:2. できないこと（＝処分行為）]]
性質を変えてしまう行為や、財産を手放す行為（処分行為）は、家庭裁判所の許可や本人の同意がない限りできません。
[[marker:NG例：]] 預金を引き出して株を買う（預金という「確実な債権」が、変動する「有価証券」に変わるため、性質が変わるとみなされます）、不動産の売却、抵当権の設定。

[[big:3. 試験で狙われるポイント]]

* [[bold:建物の修繕：]] できる（保存） ／ 「家裁の許可が必要」は[[red:×]]
* [[bold:消滅時効の更新：]] できる（保存） ／ 「処分行為にあたる」は[[red:×]]
* [[bold:預金で株を買う：]] [[red:できない]]（性質変更） ／ 「改良行為として認められる」は[[red:×]]
* [[bold:山林の伐採・売却：]] [[red:できない]]（処分） ／ 「保存行為にあたる」は[[red:×]]

[[marker:アドバイス：]] 「預金から株への変更」は、一見「改良（増やす）」に見えますが、法律上は「性質の変更」にあたるためNG、というロジックは非常に面白いポイントです。`;

    // Index 22 (Point 22: 管理人の改任)
    const c22_manager_replace = `[[big:解説：不在者の管理人改任]]
通常、本人が自分で管理人を置いている場合、家庭裁判所は干渉しません（私的自治の尊重）。

[[marker:介入の条件：]]
しかし、本人の生死が分からなくなると、その管理人が本人のために適切に動いているか確認できず、財産が危険にさらされる可能性があります。

そのため、民法26条により、[[red:生死不明の場合]]には家庭裁判所が介入して管理人を交代（改任）させることができるようになっています。

[[marker:アプリ用ヒント：]] 「生死が判明しているか、不明か」という変数が、家裁の介入可否の条件分岐になります。`;

    const q21_obj = `      {
        "text": "管理人は保存行為、性質を変えない利用、改良行為ができる",
        "choices": ["妥当である", "妥当でない"],
        "answer": [0],
        "explain": ${JSON.stringify(c21_manager_auth)},
        "wordBank": "",
        "memo": "",
        "slots": [],
        "refId": "",
        "isBonus": false
      },`;

    const q22_obj = `      {
        "text": "不在者が管理人を置かなかったときは、利害関係人、検察官の請求により家庭裁判所は必要な処分を命ずることができる",
        "choices": ["妥当である", "妥当でない"],
        "answer": [0],
        "explain": "",
        "wordBank": "",
        "memo": "",
        "slots": [],
        "refId": "",
        "isBonus": false
      },`;

    const q23_obj = `      {
        "text": "不在者が管理人を置いた場合、不在者の生死が明らかでないときは、利害関係人、検察官の請求により、家庭裁判所は管理人を改任できる",
        "choices": ["妥当である", "妥当でない"],
        "answer": [0],
        "explain": ${JSON.stringify(c22_manager_replace)},
        "wordBank": "",
        "memo": "",
        "slots": [],
        "refId": "",
        "isBonus": false
      }`;

    // Line 5470 (0-indexed 5469) is '    ],'
    const insertIdx = 5469;
    lines.splice(insertIdx, 0, q21_obj, q22_obj, q23_obj);

    // Also need to add a comma to the previous object at line 5469 (now 5469 is inside my splice but logically it's the item before 1247)
    // Actually, line 5469 was '      }' (the end of index 19). I need to add a comma there.
    lines[insertIdx - 1] = lines[insertIdx - 1] + ',';

    fs.writeFileSync(targetPath, lines.join('\n'));
    console.log("Successfully added indices 20-22 to src/questions.js");

} catch (err) {
    console.error(err);
}

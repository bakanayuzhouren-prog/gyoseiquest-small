# だれが、どの事務を処理する？

関連: TAC第1回・問22（自治事務か法定受託事務かで、条例制定権の有無が分かれる、と言い切る点。徳島市公安条例の目的の話は `tokushima-hebi-koushin.png`）

- 状態: 未生成
- 保存先: assets/images/deepdive/learn/jichi/jimu-buntan.png
- 画像キー: learn/jichi/jimu-buntan
- 見せ方: 表が本体。答え帯は置かない。表と同じ文を下に繰り返さない。案内役は置かない。
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。
- 上書きしない。この保存先のPNGは未作成。

## PRE-GENERATE-CHECK（地方自治法2条）

アプリ内の地方自治法。確認日 2026-10-21。正本は `data/knowledge/canonical/todoufuken-jorei-shichoson-jimu.md`。

2条2項の事務は、地域における事務と、法律またはこれに基づく政令により処理することとされるその他の事務。

2条3項は、市町村が基礎として、2条5項で都道府県が処理するものを除き、2条2項の事務を一般に処理する。

2条5項は、都道府県が、広域にわたるもの、市町村に関する連絡調整、規模または性質において一般の市町村が処理することが適当でないものを処理する。包括は、この範囲である。

2条6項は、都道府県と市町村が、処理するとき相互に競合しない。

2条9項2号の第二号法定受託事務は、都道府県が本来果たすべき役割に係る。処理するとされるのは市町村または特別区である。

書かない。都道府県が、中にある市町村の担任事務を全部処理する、と書くこと。第二号法定受託事務の処理主体を都道府県にすること。ブランド名。案内役。底部の判断軸、ひっかけ、暗記。

## 配役

置かない。表で足りる。

## GPT Image プロンプト

```text
Japanese legal-study infographic, warm off-white background, navy and teal. Very large gothic type. One sheet, 16:9. A table is the whole picture. No answer band. No cards under the table. No characters. No footnotes. No extra rows.

Title, a short question: だれが、どの事務を処理する？

One table. Three columns. Column headings on a navy band: 主体, 処理する事務, 条文. Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray. Not by column. Do not repeat the title under the table.

Row 1: 市町村 | 基礎として、都道府県の分を除き、2条2項の事務（地域における事務と、法律または政令で処理するとされたその他の事務）を一般に処理する | 2条3項
Row 2: 都道府県 | 広域にわたるもの。市町村に関する連絡調整。規模または性質上、一般の市町村が処理するのに向かないもの | 2条5項
Row 3: 都道府県と市町村 | 処理するときは、相互に競合しない | 2条6項
Row 4: 市町村（第二号法定受託事務） | 都道府県の役割に係るが、処理するのは市町村または特別区 | 2条9項2号

Print only the title and this table. Keep every cell complete. Do not shrink type until a word is cut off. If a cell wraps, wrap between sentences, not inside a word.
```

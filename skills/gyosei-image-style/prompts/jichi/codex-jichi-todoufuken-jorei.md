# 市町村の事務を、都道府県の条例で決められる？

関連: TAC第1回・問22（自治事務か法定受託事務かで、条例制定権の有無が分かれる、と言い切る点。蛇行進の目的は `tokushima-hebi-koushin.png`）

- 状態: 未生成
- 保存先: assets/images/deepdive/learn/jichi/todoufuken-jorei-shichoson.png
- 画像キー: learn/jichi/todoufuken-jorei-shichoson
- 見せ方: 表が本体。答え帯は置かない。表と同じ文を下に繰り返さない。案内役は置かない。
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。
- 上書きしない。この保存先のPNGは未作成。

## PRE-GENERATE-CHECK（地方自治法14条1項、2条16項、2条17項、252条の17の2）

アプリ内の地方自治法。確認日 2026-10-21。正本は `data/knowledge/canonical/todoufuken-jorei-shichoson-jimu.md`。

14条1項の文言は、第二条第二項の事務である。「その事務」ではない。

市町村が担任する事務は、自治事務でも法定受託事務でも、都道府県が処理する事務ではない（2条3項、2条5項）。都道府県の条例の対象ではない。

2条16項後段は、市町村が、当該都道府県の条例に違反して事務を処理してはならない、という処理上の制約である。従う条例は、都道府県が自分の事務について定めた条例である。

2条17項は、2条16項に違反して行った行為を無効とする。

252条の17の2は、条例で、知事の権限に属する事務の一部を市町村が処理することとできる。市町村の担任事務を都道府県が取る条例ではない。

書かない。自治事務なら都道府県の条例で決められる、と書くこと。法定受託事務なら都道府県の条例で決められる、と書くこと。2条16項を、市町村の担任事務そのものを都道府県条例の対象にする根拠として書くこと。ブランド名。案内役。底部の判断軸、ひっかけ、暗記。

## 配役

置かない。表で足りる。

## GPT Image プロンプト

```text
Japanese legal-study infographic, warm off-white background, navy and teal. Very large gothic type. One sheet, 16:9. A table is the whole picture. No answer band. No cards under the table. No characters. No footnotes. No extra rows.

Title, a short question: 市町村の事務を、都道府県の条例で決められる？

One table. Three columns. Column headings on a navy band: 場面, 内容, 条文. Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white. Not by column. Do not repeat the title under the table.

Row 1: 条例を定められる範囲 | 法令に違反しない限り、2条2項の事務（地域における事務と、法律または政令で処理するとされたその他の事務）。条文の文言は「その事務」ではない | 14条1項
Row 2: 市町村の担任事務 | 自治事務でも法定受託事務でも、都道府県の条例の対象ではない | 14条1項、2条3項・5項
Row 3: 都道府県の条例に違反する処理 | 市町村は、都道府県が自分の事務について定めた条例に違反して、事務を処理してはならない | 2条16項後段
Row 4: 違反した行為 | 無効になる | 2条17項
Row 5: 条例で市町村が処理できるもの | 知事の権限に属する事務の一部。市町村の担任事務を取る条例ではない | 252条の17の2

Print only the title and this table. Keep every cell complete. Do not shrink type until a word is cut off. If a cell wraps, wrap between sentences, not inside a word.
```

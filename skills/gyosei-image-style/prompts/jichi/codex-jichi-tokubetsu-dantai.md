# Codex用 — 特別区は東京23区。組合は仕事の共同。財産区は残った財産

1枚の表。各行の左に、その団体を示す小さい絵を1つ。絵は文字と表を隠さない。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/jichi/tokubetsu-dantai.png`
- 画像キー: `learn/jichi/tokubetsu-dantai`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・地方自治法の「もっと深掘る」。アプリ載せは生成後。

## 法律

地方自治法1条の3の特別地方公共団体は、特別区、地方公共団体の組合、財産区である。

特別区は、現に存在するのは東京都の特別区（23区）だけである。指定都市の区は市の内部組織であり、特別区ではない。大阪市を廃止して特別区を置く案は、住民投票で否決され、特別区は設置されていない。

地方公共団体の組合は、一部事務組合と広域連合である（284条1項）。

一部事務組合は、普通地方公共団体と特別区が、事務の一部を共同処理するために設ける（284条2項）。ごみ処理、消防、し尿、学校給食が典型である。都道府県が加入するものは総務大臣の許可、その他は都道府県知事の許可である。

市町村と特別区は、共同処理する事務の種類が違っていても、一部事務組合を設けることができる（285条）。都道府県はこの条の構成団体に入らない。

広域連合は、広域にわたる総合的な計画を作り、事務の一部を広域にわたり処理するために設ける（284条3項）。国の関係する事務を、法律又は政令の定めるところにより処理することができる（291条の2第1項）。例は、各都道府県の後期高齢者医療広域連合と、関西広域連合である。

財産区は、市町村又は特別区の一部が、財産を有し、又は公の施設を設けているものである（294条1項）。町村合併で、旧村の山林、温泉、水利、墓地を、新しい市町村の一般の財産にせず、その地区の財産として残したものが典型である。その財産に特に要する経費は財産区の負担とし、収入と支出の会計は分別する（294条2項・3項）。住民全体の行政をする団体ではない。

試験で「横浜市の区は、特別区」と書いてあったら×。
試験で「都道府県は、種類の違う事務をまとめる組合に入れる」と書いてあったら×。
試験で「財産区は、住民全体の行政をする」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（指定都市の区は特別区、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（特別区の行を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅとタスク亀は置かない。過去の辻さんと代さんは置かない。名簿外の人物を置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One table with a small icon on each data row. No left-right debate panels. No three cards at the bottom. No extra mascots inside the table.
Title: 特別区は東京23区。組合は仕事の共同。財産区は残った財産
Subtitle: 指定都市の区は、特別区ではない
Header, navy: 絵 / 種類 / 何をするか / 具体例
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Each icon is small, in the first column only, and does not cover the words.
Row icon, a simple cluster of ward buildings: 特別区 / 東京都の中の基礎的な団体 / 東京23区。横浜市などの区は入らない
Row icon, a garbage truck and a small fire helmet side by side: 一部事務組合 / 事務の一部を、複数の団体で共同処理する / ごみ処理、消防、し尿、学校給食
Row icon, several towns linked by one line: 広域連合 / 広域の計画を作り、広域で事務を処理する / 後期高齢者医療広域連合、関西広域連合
Row icon, a mountain, a hot spring mark, and a small cemetery gate: 財産区 / 市町村の一部が、財産や公の施設を持って管理する / 合併で残った山林、温泉、水利、墓地
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（指定都市の区は特別区、とする）:
試験で「横浜市の区は、特別区」と書いてあったら×。
試験で「都道府県は、種類の違う事務をまとめる組合に入れる」と書いてあったら×。
試験で「財産区は、住民全体の行政をする」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: ごみと消防のように種類の違う事務を一つにまとめる組合は、市町村と特別区だけ。都道府県が加入する組合の許可は総務大臣、それ以外は都道府県知事。
Do not print any brand name, account name, or app name. Do not cover the table with characters, icons, or the pointer.
```

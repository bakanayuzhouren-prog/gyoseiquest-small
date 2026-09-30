# Codex用 — 登記すべき事項は、登記の前は善意の第三者に対抗できない

4コマ漫画。商人は支配人を選任したが、その登記をしない。第三者はその選任を信じて取引する。登記の前は、善意の第三者に対抗できない。商号の譲渡と、譲受人の責任は、この図に載せない。左右パネルと底部3カードと中央表は使わない。

- 保存先: `assets/images/deepdive/learn/shouhou/shogo-toki-gaikan.png`
- 画像キー: `learn/shouhou/shogo-toki-gaikan`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・商法の「もっと深掘る」。アプリ載せは生成後。

## 法律

商法9条1項。この編の規定により登記すべき事項は、登記の後でなければ、これをもって善意の第三者に対抗することができない。登記の後であっても、第三者が正当な事由によってその登記があることを知らなかったときは、同様とする。

対象は、この編が登記を求める事項である。しなければならない例は、未成年者が営業するとき（5条）、後見人が被後見人のために営業するとき（6条）、支配人の選任とその代理権の消滅（22条）。商号を選定したことは、登記することができる事項であり（11条2項）、掲げただけで9条の対象にはならない。

第三者が知っていたときは、登記の前でも対抗できる。

商法9条2項。故意又は過失によって不実の事項を登記した者は、その事項が不実であることをもって善意の第三者に対抗することができない。

商号の譲渡（15条）と、譲渡人の商号を引き続き使う譲受人の責任（17条）は、別の論点である。この図には載せない。

試験で「第三者が知っていても、登記の前は対抗できない」と書いてあったら×。
試験で「登記の後は、正当な事由で知らなかった第三者にも対抗できる」と書いてあったら×。
試験で「商号を掲げただけで、9条の登記すべき事項になる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 商人 | 悪い役 | 商人（支配人の選任を登記せず、善意の第三者に対抗しようとする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 1コマ目と3コマ目。吹き出しの文字を隠さない |
| 第三者 | いい役 | 第三者（選任された支配人として取引する） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 2コマ目。登記簿の文字を隠さない |
| 案内 | いい役 | 案内（登記の前は善意の第三者に対抗できない、を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 答え帯の下余白の右。1体。緑の講師スーツ。コマの中には入れない |

ぴっちゅは置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。タスク亀は task_turtle_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study comic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four panels in one row, numbered 1 to 4, with wide gutters. Then one answer band. No comparison table. No left-right debate panels. No three cards at the bottom.
Title: 登記すべき事項は、登記の前は善意の第三者に対抗できない
Subtitle: 対象は、この編が登記を求める事項。商号を掲げたこと自体ではない
Panel 1: カチャドクロ as 商人（支配人の選任を登記せず、善意の第三者に対抗しようとする）. A blank commercial register reads 支配人の選任、登記なし. Caption: 商人は支配人を選任した。その登記はしていない（22条）。
Panel 2: タスク亀 as 第三者（選任された支配人として取引する）, dealing with a manager at the shop. Caption: 第三者は、その者が支配人として選任されたものと信じて取引した。登記は知らない。
Panel 3: カチャドクロ points at the blank register. Speech: 選任は登記していない。 Caption: 商人は、選任したことを第三者に対抗しようとする。
Panel 4: A large stamp across the claim, reading 対抗できない. Caption: 善意の第三者には、登記の後でなければ対抗できない（9条1項）。
Answer band, navy title 答え:
9条の対象は、この編の規定により登記すべき事項。例は、未成年者の営業（5条）、後見人の営業（6条）、支配人の選任とその代理権の消滅（22条）。
商号を選定したことは、登記することができる事項である（11条2項）。掲げただけで、9条の対象にはならない。
登記の後であっても、正当な事由によってその登記があることを知らなかった第三者には、対抗できない。
故意又は過失で不実の事項を登記した者は、その不実であることを善意の第三者に対抗できない（9条2項）。
Trap lines:
試験で「第三者が知っていても、登記の前は対抗できない」と書いてあったら×。
試験で「登記の後は、正当な事由で知らなかった第三者にも対抗できる」と書いてあったら×。
試験で「商号を掲げただけで、9条の登記すべき事項になる」と書いてあったら×。
ちゃちゃロット stands only in the bottom-right margin, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the first line of the answer band and does not cover the letters.
Do not print any brand name, account name, or app name. Do not cover panel text, the sign, or the answer band with characters.
```

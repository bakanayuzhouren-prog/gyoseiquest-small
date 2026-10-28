# Codex用 — 質権は、不動産と動産で何が違う？

横長の表1枚。6行。見本の密度は `genkoku-nashi.png`。試験の×は下に1行。ちゃちゃロットは下余白に1体。せりふは足さない。指し棒は表の中に入れない。

- 保存先: `assets/images/deepdive/learn/minnpou/shichi-fudosan-dosan.png`
- 画像キー: `learn/minnpou/shichi-fudosan-dosan`
- 生成は Codex。Cursor は描かない。
- PNGのアプリ載せは、できてからてらしぃが載せるまでしない。

## 法律

e-Gov。確認日 2026-10-28。正本は `data/knowledge/canonical/tac3-minpou-2026.md` の動産質・不動産質。

- 両方。設定は、債権者への引渡しで効力を生ずる（344条）。質権者は、設定者に自己に代わって質物を占有させることができない（345条）。占有改定では、動産質も不動産質も成立しない。
- 使用収益。動産は、債務者の承諾がなければ使用・賃貸・担保提供ができない。保存に必要な使用はできる（350条が準用する298条2項。350条は296条から300条までを準用する）。不動産は、用法に従い使用及び収益ができる（356条）。
- 利息。動産は、被担保債権に利息が含まれる（346条）。不動産は、原則として利息を請求できない（358条）。設定行為に別段の定めがあるとき、または担保不動産収益執行の開始があったときは、356条から358条は適用されない（359条）。特約があれば、不動産質でも利息を請求できる。一切請求できない、は誤り。使用収益ができても常に利息を請求できる、は誤り。
- 期間。不動産質は10年を超えることができない。より長く定めても10年。更新は、更新の時から10年を超えることができない（360条）。動産質に、この上限はない。
- 第三者対抗。動産は、継続して質物を占有しなければ対抗できない（352条）。不動産は、登記がなければ対抗できない（177条）。
- 実行。動産は、正当な理由があるときに限り、鑑定人の評価に従い質物をもって直ちに弁済に充てることを裁判所に請求できる。あらかじめ債務者に通知する（354条）。不動産に354条はない。抵当権の規定を、性質に反しない限り準用する（361条）。
- 順位。動産は設定の前後（355条）。不動産は、抵当権の順位規定の準用により、登記の前後（373条、361条）。

図に書かない。転質。物上保証人の求償。占有回収の訴え（353条）。模試の肢番号。出版社名。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（利息の行を指す。せりふで表を繰り返さない。指し棒は表に入れない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

場面役は置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。見本の密度: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 6 data rows. No side panels. No bottom cards. No answer bar.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. A cell may wrap. If a cell needs more than two lines, make that row taller. Do not shrink the type.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one test line for one guide.

Title, one short question: 質権は、不動産と動産で何が違う？
One premise line under the title: 引渡しで効力を生じ、設定者に占有を委ねられないのは、両方（344条、345条）
Header, navy: 何が違うか | 動産質 | 不動産質
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white, row 6 light gray. Not by column.
Row 1: 使用収益 | 債務者の承諾がなければ、使用・賃貸・担保提供はできない。保存に必要な使用はできる（350条、298条2項） | 用法に従い、使用及び収益ができる（356条）
Row 2: 利息の請求 | 元本のほか、利息を請求できる（346条） | 原則、利息を請求できない（358条）。特約または担保不動産収益執行の開始があると、請求できる（359条）
Row 3: 存続期間 | 法定の上限はない | 10年を超えることができない。より長く定めても10年。更新は、更新の時から10年（360条）
Row 4: 第三者への対抗 | 継続して質物を占有しなければ、対抗できない（352条） | 登記がなければ、対抗できない（177条）
Row 5: 弁済を受けないときの実行 | 正当な理由があるときに限り、鑑定人の評価に従い、直ちに弁済に充てることを裁判所に請求できる。あらかじめ債務者に通知する（354条） | 354条の方法はない。抵当権の実行の規定を準用する（361条）
Row 6: 質権の順位 | 設定の前後による（355条） | 登記の前後による（373条。361条が準用）
Each cell keeps its sentences. Do not shorten a cell to a slogan. Do not shrink type. Do not drop 特約. Do not drop 担保不動産収益執行. Do not drop 10年. Do not drop 継続して質物を占有. Do not drop 登記. Do not drop 正当な理由. Do not drop あらかじめ債務者に通知. Do not write that a real-estate pledge arises by registration alone. Do not write that interest can never be claimed.
Under the table, one line only: 試験の×は、動産質も利息を請求できず、占有改定で質権が成立する、とすること。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the 利息の請求 row from outside the table. The pointer does not enter any cell and does not cross any glyph. No speech balloon. Do not cover the table or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 引渡しと、設定者に占有を委ねられないことは、両方
- [ ] 動産の使用は承諾が必要。保存に必要な使用はできる。不動産は用法に従い使用収益できる
- [ ] 動産は利息を請求できる。不動産は原則できない。特約または担保不動産収益執行の開始があると請求できる
- [ ] 不動産は10年。より長く定めても10年。更新は更新の時から10年。動産にこの上限はない
- [ ] 動産の対抗は継続占有。不動産の対抗は登記。登記だけで効力が生ずる、とは書いていない
- [ ] 354条は動産だけ。正当な理由と、事前の通知がある。不動産は抵当権の実行の準用
- [ ] 順位は、動産が設定の前後、不動産が登記の前後
- [ ] 試験の×は、動産質も利息を請求できず、占有改定で質権が成立する、とすること
- [ ] 指し棒が表の文字に掛かっていない
- [ ] 文字は縮んでいない。行は白と薄いグレーの交互
- [ ] ブランド印字なし。名簿外なし

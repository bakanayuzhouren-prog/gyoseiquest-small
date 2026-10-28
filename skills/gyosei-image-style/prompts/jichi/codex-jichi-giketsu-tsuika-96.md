# 政令の除外は、法定受託事務だけ？

96条2項の条文を上に置き、括弧が見えること。その下に3行の表。見本の色と余白は `fushin-saisho-saido.png`。表の中にキャラを置かない。ちゃちゃロットは下余白に1体。指し棒は条文の括弧を指し、セルの文字に重ねない。

- 状態: 上書き（てらしぃ指示 2026-10-25。薄い表は不合格。この1枚だけ）
- 上書き対象: assets/images/deepdive/learn/jichi/giketsu-tsuika-96.png
- overwrite: true
- 保存先: assets/images/deepdive/learn/jichi/giketsu-tsuika-96.png
- 画像キー: learn/jichi/giketsu-tsuika-96
- 生成は Codex。Cursor は描かない。

## PRE-GENERATE-CHECK

確認日 2026-10-25。正本は `data/knowledge/canonical/giketsu-tsuika-96-2.md`。地方自治法96条2項、施行令121条の3。

- 上の枠は96条2項の全文。括弧は「法定受託事務に係るものにあつては」から「政令で定めるものを除く。」まで。自治事務には、この括弧はかからない。
- 1項の事件は、自治事務でも法定受託事務でも、最初から議決が義務。2項は、それ以外を条例で足す定め。
- どちらも条例で足せる。法定受託事務から引くのは、政令が議決に適当でないと定めたものだけ。全部ではない。
- 施行令121条の3は、国民保護法に基づき地方公共団体が処理する事務と、災害救助法施行令3条2項により同令18条の都道府県等が処理する事務。
- 試験の×は赤帯に1行。自治事務にも国の安全の政令除外がある、は誤り。
- せりふ、答え帯、底部の3枚、列の中のキャラは置かない。同じ文をタイトルと帯で繰り返さない。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（条文の括弧を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。条文と表と赤帯を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。色と余白の見本: assets/images/deepdive/learn/jichi/fushin-saisho-saido.png
Create a NEW Japanese legal-study infographic from scratch.
ONE job: the statute on top, then one table of 3 data rows, then one red line. No side panels. No bottom cards. No answer bar. No speech balloon. No characters inside the statute or the table.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. Wrap long lines. Wide gaps between the statute, the table, and the red line.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the red line for one guide.

Title, yellow rounded pill, one short question, large: 政令の除外は、法定受託事務だけ？

Statute box, navy border, white inside. Heading: 地方自治法96条2項
Body, full text, large:
前項に定めるものを除くほか、普通地方公共団体は、条例で普通地方公共団体に関する事件（法定受託事務に係るものにあっては、国の安全に関することその他の事由により議会の議決すべきものとすることが適当でないものとして政令で定めるものを除く。）につき議会の議決すべきものを定めることができる。
The parenthesis, from 法定受託事務に係るものにあっては through 政令で定めるものを除く。, is red. The rest of the sentence stays black.

One amber line under the statute: この括弧は、法定受託事務にだけかかる。

Header, navy: 議決の追加 | 自治事務 | 法定受託事務
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white. Not by column.
Row 1: 条例で足せるか | 足せる。1項で議決が義務の事件以外 | 足せる。政令が議決に適当でないと定めたものを引いた残り
Row 2: 括弧の除外 | かからない | かかる
Row 3: 政令の中身（施行令121条の3） | この条の除外一覧はない | 国民保護法に基づき地方公共団体が処理する事務。災害救助法施行令3条2項により、同令18条の都道府県等が処理する事務

One navy line under the table: 1項の事件は、どちらも最初から議決が義務。2項は、それ以外を条例で足す。

Red banner, one line only: 自治事務にも、国の安全の政令除外がある、は×。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the red parenthesis in the statute. The pointer must not cross any letter. No speech balloon. Do not cover the statute, the table, or the red banner. No nameplate.
No owl, cat, turtle, chick, skull, extra humans. No brand letters.
```

## 目視

- [ ] 上に96条2項の全文があり、括弧だけが赤
- [ ] 自治事務は括弧がかからない。法定受託事務はかかる。どちらも条例で足せる
- [ ] 政令の中身に、災害救助法施行令の同令18条がある
- [ ] 1項は最初から議決が義務、と表の下に1行ある
- [ ] 赤帯は1行。指し棒が文字に重なっていない
- [ ] 案内役は下余白。帽子は耳ではない。表の中に別のキャラがいない
- [ ] ブランド印字なし

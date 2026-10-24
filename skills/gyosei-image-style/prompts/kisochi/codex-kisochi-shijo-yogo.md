関連: LEC市販第3回・問49。正解は4。妥当でないのはウとエ。

# 完全競争と寡占

表が本体。6行。見本は `genkoku-nashi.png`。横長3:2。ちゃちゃロットは下余白に1体。せりふは足さない。

- 状態: 生成済み（2026-10-22）。てらしぃがこの画像の修正を言うまで上書きしない
- 保存先: `assets/images/deepdive/learn/kisochi/shijo-yogo.png`
- 画像キー: `learn/kisochi/shijo-yogo`
- 生成は Codex。Cursor は描かない。

## PRE-GENERATE-CHECK

確認日 2026-10-22。正本は `data/knowledge/canonical/kisochi-seiji-keizai-shakai.md`。

- 完全競争は、売り手が多数で、1社では価格を動かせず、市場で決まった価格を受け入れる。読みはかんぜんきょうそう。
- 寡占は、売り手が少数で、価格を動かせる。読みはかせん。
- プライス・リーダーは、寡占の企業で、価格を決め、他の企業がそれに従う。完全競争ではない。
- 外部経済は、市場を通さずに、他の経済主体へ利益が及ぶこと。
- 外部不経済は、市場を通さずに、他の経済主体へ不利益が及ぶこと。公害は外部不経済。
- 非価格競争は、寡占で、価格以外のデザイン、ブランド、宣伝、アフターサービスにより争うこと。

書かない。見るところ。結論、という列名。読みだけの行。答え帯。せりふ。同じ文の繰り返し。文字を縮めること。ちゃちゃロットを消すこと。ブランド名。左右の欄。底部の3枚。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（プライス・リーダーの行を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 6 data rows. No side panels. No bottom cards. No answer bar. No speech balloon.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. Wrap long lines.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one test line for one guide.

Title, one short label: 完全競争と寡占
Header, navy: 経済の用語 | 内容
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white, row 6 light gray. Not by column.
Row 1: 完全競争（かんぜんきょうそう） | 売り手が多数。1社では価格を動かせず、市場で決まった価格を受け入れる。
Row 2: 寡占（かせん） | 売り手が少数。価格を動かせる。
Row 3: プライス・リーダー | 寡占の企業。価格を決め、他の企業がそれに従う。
Row 4: 外部経済 | 市場を通さずに、他の経済主体へ利益が及ぶ。
Row 5: 外部不経済 | 市場を通さずに、他の経済主体へ不利益が及ぶ。公害はこれ。
Row 6: 非価格競争 | 寡占で、価格以外のデザイン、ブランド、宣伝、アフターサービスにより争う。
Under the table, one line only: 試験で「リーダーは完全競争。利益の波及は外部不経済」と書いてあったら×。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the price-leader row. No speech balloon. Do not cover the table or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [x] 列は「経済の用語」「内容」。見るところ、結論、はない
- [x] 完全競争は価格を動かせない。寡占は動かせる。リーダーは寡占
- [x] 利益が及ぶのは外部経済。不利益が及ぶのは外部不経済
- [x] 答え帯も、せりふもない。試験の×は1行。文字は縮んでいない
- [x] 案内役は下余白。帽子は耳ではない
- [x] ブランド印字なし。名簿外なし

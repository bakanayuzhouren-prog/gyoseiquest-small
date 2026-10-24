関連: 伊藤塾公開模試Ⅰ・問50。正解は5。妥当なのは、基準割引率と基準貸付利率の引上げで貨幣の供給が減る、という肢。売りオペ、量的緩和で供給が減る、マイナス金利で供給が減る、準備率の引上げで供給が増える、は妥当でない。

# 日本銀行の政策で、貨幣は増える？減る？

表が本体。5行。見本は `genkoku-nashi.png`。横長3:2。ちゃちゃロットは下余白に1体。せりふは足さない。

- 状態: 上書き（てらしぃ指示 2026-10-24。この1枚だけ）
- 上書き対象: assets/images/deepdive/learn/kisochi/kyokyu-houkou.png
- overwrite: true
- 保存先: assets/images/deepdive/learn/kisochi/kyokyu-houkou.png
- 画像キー: learn/kisochi/kyokyu-houkou
- 生成は Codex。Cursor は描かない。

## PRE-GENERATE-CHECK

確認日 2026-10-24。正本は `data/knowledge/canonical/kisochi-seiji-keizai-shakai.md`。

- 売りオペは、日本銀行が国債などを売ること。代金は日銀に戻り、貨幣の供給は減る。
- 量的緩和は、政策金利をほぼゼロにしたあとに、当座預金の残高を目標にして資金を大量に供給する。供給は増える。2001年3月から2006年3月。年は図に置かない。
- マイナス金利は、当座預金の金利をマイナスにし、銀行の資金を貸出へ向ける。供給は増える方向。
- 準備率の引上げは、金融機関が日銀に置く預金の割合を上げること。貸出に回る分が日銀に残り、供給は減る。最後に変えた年は置かない。
- 基準割引率と基準貸付利率の引上げは、日銀が金融機関に貸す金利を上げること。借入れは抑えられ、供給は減る。旧称は図に出さない。
- 試験の×は1行。売りオペで供給が増える、準備率を上げると供給が増える、は誤り。
- 答え帯、底部の3枚、同じ文の繰り返しは置かない。列名は金融政策と貨幣の供給。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（売りオペの行を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 5 data rows. No side panels. No bottom cards. No answer bar. No speech balloon.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. Wrap long lines.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one test line for one guide.

Title, one short question, large: 日本銀行の政策で、貨幣は増える？減る？
No subtitle. The title alone shows both results.
Header, navy: 金融政策 | 貨幣の供給
The right column is one large character only. 増 is green. 減 is red. No arrows beside the character. No sentence in the right column.
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white. Not by column.

Row 1: 売りオペ。日本銀行が国債などを売る。代金は日銀に戻る。 | 減
Row 2: 量的緩和。当座預金の残高を目標に、資金を大量に出す。 | 増
Row 3: マイナス金利。当座預金の金利をマイナスにし、銀行の資金を貸出へ向ける。 | 増
Row 4: 準備率の引上げ。金融機関が日銀に置く預金の割合を上げる。貸出に回る分は日銀に残る。 | 減
Row 5: 基準割引率と基準貸付利率の引上げ。日銀が金融機関に貸す金利を上げ、借入れを抑える。 | 減

Under the table, one line only: 売りオペで供給が増える、は×。準備率を上げると供給が増える、も×。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the 売りオペ row. No speech balloon. Do not cover the table or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] タイトルは「日本銀行の政策で、貨幣は増える？減る？」。向き、ではない
- [ ] 右列は「増」か「減」の1字。売りオペ、準備率、基準割引率は減。量的緩和とマイナス金利は増
- [ ] 各行は、何をするかまで読める。同じ文をタイトルと下で繰り返していない
- [ ] 試験の×は下に1行。答え帯も底部の3枚もない
- [ ] 案内役は下余白。帽子は耳ではない。表を隠さない
- [ ] ブランド印字なし。名簿外なし

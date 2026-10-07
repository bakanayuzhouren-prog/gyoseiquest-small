# Codex用 — 許諾して転売したら、代金は追える？

関連: 合格革命第2回・問30。動産売買の先取特権の転売図（`sakidori-tenbai-butsujodaii.png`）とは別。この1枚は、譲渡担保の許諾転売だけ。許諾がない転売の結論は、この図に書かない。

1枚。中央は許諾、転売、代金債権への物上代位の順。底部にひっかけと暗記。

- 保存先: `assets/images/deepdive/learn/minnpou/jototanpo-kyodaku.png`
- 画像キー: `learn/minnpou/jototanpo-kyodaku`
- 生成は Codex。Cursor は描かない。
- 配置案: 生成後に直前期パックの民法へ。PNGができるまでアプリには付けない。

## 法律

譲渡担保の目的物を、設定者が譲渡担保権者の許諾を得て第三者に転売したときは、譲渡担保権者は、その転売代金債権について物上代位できる（最判平11.5.17）。

許諾がない場合の追及と物上代位の切り分けは、この図の仕事にしない。

試験で「許諾して転売しても、代金債権には物上代位できない」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 譲渡担保権者 | いい役 | 譲渡担保権者（許諾した転売代金を確保したい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 左。許諾の印と、代金債権への矢印。矢印を隠さない |
| 設定者 | いい役 | 設定者（許諾を得て商品を転売したい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 中央。商品を右の柜台へ渡す。矢印を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（代金には物上代位できないと言う） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 底部のひっかけだけ |
| 案内 | いい役 | 案内（暗記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

転買人は人物にしない。右に柜台と札「転買人」だけ。

## GPT Image プロンプト

```text
参照必須: タスク亀は assets/images/characters/task_turtle_sheet.png。ぴっちゅは assets/images/characters/pitchi_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。ちゃちゃロットは skills/gyosei-image-style/assets/approved-chachalot-pointer.png と approved-smiling-hat-mascot.png。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。緑の講師スーツは白シャツ、ズボン、靴まで。1体だけ。下余白の右。指し棒は暗記に重ねない。

Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. 16:9. One title, one left-to-right scene of three steps, then a trap card and a memory bar. No second case about a sale without consent. No brand name, account name, or app name. The resale buyer is a shop counter only, not a person and not an animal.

Title: 許諾して転売したら、代金は追える？

Step 1, left: タスク亀, label 譲渡担保権者（許諾した転売代金を確保したい）, hands a paper 許諾 to the center.
Step 2, center: ぴっちゅ, label 設定者（許諾を得て商品を転売したい）, passes a boxed good to a shop counter labeled 転買人. No character stands at the counter.
Step 3: an arrow labeled 転売代金債権 runs from the counter back toward the settlor, and a second arrow labeled 物上代位 runs from タスク亀 onto that price claim.
Large answer under the scene: できる
One line: 許諾を得て転売した代金債権には、物上代位できる（最判平11.5.17）。

Bottom amber trap card. カチャドクロ beside it, not covering the words. Label: 誤った主張（代金には物上代位できないと言う）
試験で「許諾して転売しても、代金債権には物上代位できない」と書いてあったら×

Navy memory bar:
許諾転売の代金債権には、譲渡担保権者が物上代位できる。

One ちゃちゃロット only, bottom-right margin. Characters do not cover the arrows, the answer, or the memory bar.
```

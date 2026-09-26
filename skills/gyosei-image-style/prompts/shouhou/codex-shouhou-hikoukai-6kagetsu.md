# Codex用 — 公開会社でない株式会社は、6か月の継続保有が要らない

1枚の表。消えるのは6か月の継続保有だけ。議決権や株式の割合は残る。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/shouhou/hikoukai-6kagetsu.png`
- 画像キー: `learn/shouhou/hikoukai-6kagetsu`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・商法の「もっと深掘る」。アプリ載せは生成後。
- 前: `hikoukai-teikan.png`。次: `hikoukai-kikan.png`

## 法律

297条1項。総株主の議決権の100分の3以上を、6か月前から引き続き有する株主が、株主総会の招集を請求できる。297条2項。公開会社でない株式会社では、「6か月前から引き続き有する」を「有する」と読み替える。

360条1項。6か月前から引き続き株式を有する株主が、取締役の行為の差止めを請求できる。360条2項。公開会社でない株式会社では、株主であれば足りる。

847条1項。6か月前から引き続き株式を有する株主が、責任追及等の訴えの提起を請求できる。847条2項。公開会社でない株式会社では、株主であれば足りる。

847条の2第1項。株式交換・株式移転、又は吸収合併で消滅する会社の旧株主は、効力が生じた日の6か月前からその日まで引き続き株主であったことが要る。847条の2第2項。公開会社でない株式会社では、効力が生じた日において株主であったことで足りる。

854条1項。役員の解任の訴えは、議決権の100分の3以上、又は発行済株式の100分の3以上を、6か月前から引き続き有する株主。854条2項。公開会社でない株式会社では、継続保有を外し、「有する」と読み替える。割合は残る。

試験で「公開会社でない株式会社は、3%も要らない」と書いてあったら×。
試験で「6か月の継続保有が要らないのは、招集請求だけ」と書いてあったら×。
試験で「旧株主も、6か月前から引き続き、のまま」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（3%も要らない、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（割合は残る、を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅとタスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One comparison table is the figure. No left-right debate panels. No three cards at the bottom.
Title: 公開会社でない株式会社は、6か月の継続保有が要らない
Subtitle: 消えるのは6か月だけ。割合は残る
Header, navy: 株主がすること / 条 / 公開会社 / 公開会社でない株式会社
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Row: 株主総会の招集を請求する / 297条2項 / 6か月前から引き続き / 継続保有は要らない
Row: 取締役の行為の差止めを請求する / 360条2項 / 6か月前から引き続き / 継続保有は要らない
Row: 責任追及等の訴えの提起を請求する / 847条2項 / 6か月前から引き続き / 継続保有は要らない
Row: 旧株主として、責任追及等の訴えの提起を請求する / 847条の2第2項 / 効力が生じた日の6か月前から、その日まで / 効力が生じた日において株主であれば足りる
Row: 役員の解任の訴えを提起する / 854条2項 / 6か月前から引き続き / 継続保有は要らない。3%は残る
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（3%も要らない、とする）:
試験で「公開会社でない株式会社は、3%も要らない」と書いてあったら×。
試験で「6か月の継続保有が要らないのは、招集請求だけ」と書いてあったら×。
試験で「旧株主も、6か月前から引き続き、のまま」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 読み替えで消えるのは、6か月前から引き続き、だけ。
Do not print any brand name, account name, or app name. Do not cover the table with characters or the pointer.
```

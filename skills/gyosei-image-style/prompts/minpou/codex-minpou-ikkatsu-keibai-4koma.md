# Codex用 — 一括競売は、土地だけの競売と何が違うか（4コマ）

4コマ。建物の所有者と銀行のやり取り。更地の方が使い道が広く値が高いこと、建物があると土地だけの競売価格が限定されること、一括競売は土地と建物をまとめて売ること、優先権は土地の代価だけであることを描く。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/minnpou/ikkatsu-keibai-4koma.png`
- 画像キー: `learn/minnpou/ikkatsu-keibai-4koma`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。アプリ載せは生成後。

## 法律

抵当権の設定後に抵当地に建物が築造されたときは、抵当権者は土地とともにその建物を競売することができる。優先権は、土地の代価についてのみ行使できる（民法389条1項）。建物の代価は、建物の所有者に返る。

更地は、住宅にも店舗にも使え、使い道が広いので値が高い。設定後に建物が建つと、土地だけを競売しても、買受人は他人の建物が載った土地しか取れない。使い道が限られ、土地の代価が下がる。一括競売は、土地と建物を一人の買受人にまとめて渡し、その値下がりを避ける。土地だけの競売との違いは、建物も一緒に売ること。銀行が優先して取れる範囲は、土地の代価だけである。

設定当時から建物がある場合は、389条の一括競売はできない。抵当権者は、その建物がある前提で土地の担保価値を見ている。土地と建物の所有者が同じで、競売の結果所有者が分かれたときは、建物のために地上権が設定されたものとみなす（388条。法定地上権）。

建物の所有者が、抵当地を占有するについて抵当権者に対抗できる権利を有するときは、一括競売はできない（389条2項）。

試験で「一括競売をすると、銀行は建物の代価も優先して取れる」と書いてあったら×。
試験で「抵当権の設定当時から建物があっても、一括競売できる」と書いてあったら×。
試験で「一括競売は、土地だけの競売と同じ」と書いてあったら×。

## 配役

てらしぃの「銀行はマスク」は、名簿に仮面のキャラがいないため、銀行役をタスク亀にする。名簿外の仮面人間は置かない。カチャドクロは、誤った主張だけ。

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 主人公 | いい役 | 建物の所有者（設定後に建てた。建物の代価まで取られるのか知りたい） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 各コマの左。緑の講師スーツ。1コマに1体 |
| 銀行 | いい役 | 土地の抵当権者（土地の代価だけ優先して取りたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 各コマの右。銀行の窓口。本文を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（建物の代価も銀行が取る、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 4コマ目の小さな吹き出しだけ |

ぴっちゅは置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。
Create a NEW Japanese legal-study 4-panel comic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four panels left to right, numbered 1 to 4. Conversation between the building owner and the bank. No left-right debate panels. No three cards at the bottom. No brand name.
Title: 一括競売は、土地だけの競売と何が違うか（389条）
ちゃちゃロット is the building owner in every panel, on the left, one per panel. Green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. Not a cap. Label under ちゃちゃロット: 建物の所有者（設定後に建てた）
タスク亀 is the bank on the right, at a bank counter. Label: 銀行（土地の抵当権者）
Do not draw a new masked person. Do not cover faces with a cloth mask.

Panel 1. 更地は値が高い
Vacant land. The bank has a mortgage on the land only. Speech from the bank: 更地は、住宅にも店舗にも使える。使い道が広いので、土地の値は高い。
Speech from ちゃちゃロット: まだ建物はない。

Panel 2. あとから建物が建つと、土地だけの競売は値が下がる
ちゃちゃロット has built a house after the mortgage. Speech from the bank: 土地だけ競売すると、買受人は、他人の建物が載った土地しか取れない。使い道が限られ、土地の代価が下がる。
Small caption: 建物を合わせた価格に縛られない。下がるのは、土地だけの競売価格。

Panel 3. 一括競売
The bank auctions the land and the building together. One buyer receives both. Speech from the bank: 一括競売は、土地と建物をまとめて売る（389条）。土地だけの競売との違いは、建物も一緒に渡すこと。
Speech from ちゃちゃロット: じゃあ建物の代金も、銀行が取るの？
Speech from the bank: 優先権は、土地の代価だけ。建物の代価は、建物の所有者に返る。

Panel 4. 設定当時から建物があると、一括競売はできない
The house was already there when the mortgage was set. Speech from the bank: 設定当時から建物があるなら、一括競売はできない。その建物がある前提で、土地の値を見ている。受け皿は法定地上権（388条）。
Small カチャドクロ bubble only, label 誤った主張（建物の代価も銀行が取る、とする）: 建物の代価も銀行が取る。
Red X on that bubble.

Footer:
試験で「一括競売をすると、銀行は建物の代価も優先して取れる」と書いてあったら×。
試験で「抵当権の設定当時から建物があっても、一括競売できる」と書いてあったら×。
試験で「一括競売は、土地だけの競売と同じ」と書いてあったら×。
One line: 建物の所有者が、抵当地を占有するについて抵当権者に対抗できる権利を有するときは、一括競売はできない（389条2項）。
Do not print any brand name, account name, or app name. Do not cover the speech with characters.
```

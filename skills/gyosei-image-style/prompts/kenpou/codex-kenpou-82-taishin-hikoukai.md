# Codex用 — 対審だけ非公開にできる。この事件は、対審も公開

1枚。上は、対審を非公開にできる条件。下は、その条件がそろっても対審を非公開にできない事件。判決は、どちらの枠にも入れず、常に公開と書く。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/kenpou/taishin-hikoukai-82.png`
- 画像キー: `learn/kenpou/taishin-hikoukai-82`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・憲法の「もっと深掘る」。アプリ載せは生成後。

## 法律

憲法82条1項。裁判の対審及び判決は、公開法廷でこれを行う。

82条2項本文。裁判所が、裁判官の全員一致で、公の秩序又は善良の風俗を害するおそれがあると決した場合には、対審は、公開しないで行うことができる。過半数ではない。非公開にできるのは対審だけ。

82条2項ただし書。政治犯罪、出版に関する犯罪、又はこの憲法第三章で保障する国民の権利が問題となっている事件の対審は、常に公開しなければならない。上の条件がそろっても、これらの対審は非公開にならない。

判決の言渡しを非公開にする定めは、82条にない。

試験で「判決も非公開にできる」と書いてあったら×。
試験で「過半数で非公開にできる」と書いてあったら×。
試験で「政治犯罪でも、公の秩序を害するなら非公開にできる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（判決も非公開にできる、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（常に公開の3事件を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅとタスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One vertical branch. No left-right debate panels. No three cards at the bottom.
Title: 対審だけ非公開にできる。この事件は、対審も公開
Subtitle: 判決は、例外なく公開法廷で行う（82条1項）
Upper box, blue border, heading 対審を非公開にできるとき:
三つの条件を縦に並べ、すべて必要だと書く。
裁判所が決する
裁判官の全員一致（過半数ではない）
公の秩序又は善良の風俗を害するおそれ（82条2項本文）
Short line under the box: 閉じられるのは対審だけ。判決は閉じられない。
A short downward arrow labeled でも、次の事件は.
Lower box, amber outline so the eye hits it, heading 対審であっても、非公開にならない:
A three-row table. Header, navy: 常に公開の対審
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white. Not by column.
Row: 政治犯罪
Row: 出版に関する犯罪
Row: 憲法第三章で保障する国民の権利が問題となっている事件
Under the table: 82条2項ただし書。上の条件がそろっても、これらの対審は公開のまま。
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（判決も非公開にできる、とする）:
試験で「判決も非公開にできる」と書いてあったら×。
試験で「過半数で非公開にできる」と書いてあったら×。
試験で「政治犯罪でも、公の秩序を害するなら非公開にできる」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 非公開は対審だけ。政治犯罪、出版に関する犯罪、第三章の権利が問題の事件は、対審も公開。
Do not print any brand name, account name, or app name. Do not cover the boxes or the table with characters or the pointer.
```

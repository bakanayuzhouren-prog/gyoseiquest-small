# Codex用 — 転質は、質権者が質物を自分の債権者へさらに質入れすること

流れの図。質権は質権者から離れて移動しない。質物の占有は、転質権者へ移る。する人は、承諾があっても質権者だけ。左右パネルと底部3カードは使わない。表の行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。

- 保存先: `assets/images/deepdive/learn/minnpou/tenshichi-dare.png`
- 画像キー: `learn/minnpou/tenshichi-dare`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。アプリ載せは生成後。

## 法律

民法348条。質権者は、その権利の存続期間内において、自己の責任で、質物について、転質をすることができる。転質をしたことによって生じた損失については、不可抗力によるものであっても、その責任を負う。

民法350条が298条2項を準用する。質権者は、債務者の承諾を得なければ、質物を担保に供することができない。承諾があるときの転質を承諾転質という。する人は質権者である。責任は、298条1項の善良な管理者の注意である。

質権者の債権者は、転質を受ける側（転質権者）である。承諾があっても、質権者以外の者が自分で転質できるわけではない。

質権の設定は、債権者にその目的物を引き渡すことによって効力を生ずる（民法344条）。転質の質権も、引渡しがなければ効力を生じない。質権そのものは質権者に残る。質物が質権者の手元に残る、ではない。352条は、動産質権者が継続して占有しなければ第三者に対抗できない、という別の定めである。

民法362条2項。権利質には、性質に反しない限り、348条が準用される。債権質でも、質権者がその債権をさらに質入れできる。

試験で「承諾があれば、質権者の債権者が自分で転質できる」と書いてあったら×。
試験で「転質すると、質権が質権者から離れて移動する」と書いてあったら×。
試験で「転質しても、質物は質権者の手元に残る」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 質権者 | いい役 | 質権者（質物をさらに質入れする） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 中央の質権者の箱の横。矢印を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（質権者の債権者が自分で転質できる、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（質物の占有は転質権者へ移る、を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅは置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One horizontal flow, then one small table. No left-right debate panels. No three cards at the bottom.
Title: 転質は、質権者が質物を自分の債権者へさらに質入れすること
Subtitle: 質権は質権者に残る。質物の占有は、転質権者へ移る
Three boxes left to right, with space between them.
Box 1, label 質権設定者（質物を渡した）: empty hands. The thing has already left this box.
Arrow 1, label 質入れ: points to box 2. The thing moves along this arrow.
Box 2, label 質権者（さらに質入れする）: a card reading 質権. The physical thing is not in this box. タスク亀 beside this box only, not covering the arrow. Role text under the turtle: 質権者（さらに質入れする）
Arrow 2, thicker, label 転質（占有が移る）: the thing moves along this arrow to box 3.
Box 3, label 転質権者（質権者の債権者。質入れを受ける）: the same thing, now in this box, plus a second card reading 転質権
Caption under the flow: 質権は質権者に残る。質物の占有は転質権者へ移る。
Table heading: する人は、どちらも質権者
Header, navy: 種類 / 承諾 / 責任
Row 1 white: 責任転質（348条） / 設定者の承諾は不要 / 存続期間内。不可抗力による損失も質権者が負う
Row 2 light gray: 承諾転質（350条が準用する298条2項） / 設定者の承諾が必要 / 善良な管理者の注意。する人は質権者
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（質権者の債権者が自分で転質できる、とする）:
試験で「承諾があれば、質権者の債権者が自分で転質できる」と書いてあったら×。
試験で「転質すると、質権が質権者から離れて移動する」と書いてあったら×。
試験で「転質しても、質物は質権者の手元に残る」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 質権は残る。質物の占有は、転質権者へ移る。
Do not print any brand name, account name, or app name. Do not cover the boxes, arrows, or table with characters or the pointer.
```

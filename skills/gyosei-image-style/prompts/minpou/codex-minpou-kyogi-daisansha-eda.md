# Codex用 — 虚偽表示の第三者（当たる者を先に、差押えで枝分かれ）

枝分かれ図。当たる者を上に大きく。債権者だけ、差押えをしたかで二股。左右の対決パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/minnpou/kyogi-daisansha-eda.png`
- 画像キー: `learn/minnpou/kyogi-daisansha-eda`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法総則の「もっと深掘る」。アプリ載せは生成後。

## 法律

民法94条1項の通謀虚偽表示は無効。その無効は、善意の第三者に対抗できない（94条2項）。第三者は、虚偽表示で生じた外観を基礎に新たな法律関係に入り、その無効を主張されると困る者。取消しではない。無効である。

当たる者。仮装譲受人から、その土地を買い受けた者。仮装譲受人から、その土地に抵当権の設定を受けた者。仮装の債権を譲り受けた者。仮装の抵当権について転抵当権の設定を受けた者。

枝。仮装譲受人の債権者は、その土地を差し押さえたときは第三者に当たる。差し押さえていない一般債権者は、第三者に当たらない。

当たらない者。土地の虚偽表示について、仮装譲受人が建てた建物の賃借人（最判昭57.9.21。目的物は土地であり、建物は別）。仮装の債権譲渡における債務者（もともと債務を負い、新たな法律関係に入っていない）。当事者本人と、その包括承継人。

保護は善意で足りる。無過失までは要しない。94条2項の第三者として対抗するのに、自ら登記を備えることは要しない。悪意の者は、第三者に当たらないのではなく、94条2項の保護を受けない。

試験で「差し押さえていない一般債権者も、第三者に当たる」と書いてあったら×。
試験で「建物の賃借人は、土地の虚偽表示の第三者に当たる」と書いてあったら×。
試験で「善意でも、過失があれば第三者に当たらない」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 差押えをした側 | いい役 | 土地を差し押さえて第三者になる側 | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 差押えをした枝だけ。矢印を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（差押えなしでも第三者、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 差押えをしない枝と、底部のひっかけ |
| 案内 | いい役 | 案内（当たる者の列を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅは置かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. A branching diagram. Those who count as third parties are large and on top. The creditor splits into two branches. No left-right debate panels. No three cards at the bottom.
Title: 虚偽表示の第三者は、無効だと困る者（94条2項）
Subtitle: 虚偽表示で生じた外観を基礎に、新たな法律関係に入った者。取消しではない。無効である。
Four white boxes in a row, each marked 当たる:
土地を買い受けた者
土地に抵当権の設定を受けた者
仮装の債権を譲り受けた者
仮装の抵当権を転抵当に取った者
Then a fork titled 仮装譲受人の債権者.
Left branch, white, arrow labeled 土地を差し押さえた: 第三者に当たる. Small タスク亀 with the label 差押債権者（土地に手を入れる）.
Right branch, light gray, arrow labeled 差し押さえていない: 第三者に当たらない. Small カチャドクロ with the label 一般債権者（土地を対象にしていない）.
Below, a light gray strip titled 最初から当たらない:
仮装譲受人が建てた建物の賃借人（土地の虚偽表示では、目的物が違う。最判昭57.9.21）
仮装の債権譲渡の債務者（もともと債務を負っている）
当事者本人と、その包括承継人
One line under the boxes: 保護は善意で足りる。無過失は要しない。登記も要しない。悪意は、当たらないのではなく、保護を受けない。
Bottom trap strip, amber:
試験で「差し押さえていない一般債権者も、第三者に当たる」と書いてあったら×。
試験で「建物の賃借人は、土地の虚偽表示の第三者に当たる」と書いてあったら×。
試験で「善意でも、過失があれば第三者に当たらない」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. Not a cap.
Note text: 当たるのは、嘘の外観で新しい法律関係に入った者。債権者は、差し押さえて初めて当たる。
Do not print any brand name, account name, or app name. Do not cover the branches with characters or the pointer.
```

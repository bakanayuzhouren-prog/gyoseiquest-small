# Codex用 — 死亡後に成年後見人ができる保存（873条の2）

具体例の一覧。各語の横に小さな印。お金、家、時計、契約書。死体や火葬の場面は描かない。左右パネルと底部3カードは使わない。行の背面は白と薄いグレーの交互。

- 保存先: `assets/images/deepdive/learn/minnpou/kouken-shibou-hozon.png`
- 画像キー: `learn/minnpou/kouken-shibou-hozon`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。アプリ載せは生成後。

## 法律

成年後見人の生前の権限は、保存行為だけではない。財産を管理し、財産に関する法律行為を代表する（859条1項）。意思の尊重は858条であり、「意思に反することが明らかなときを除き保存できる」という条文ではない。

死亡後は、必要があるとき、相続人の意思に反することが明らかなときを除き、相続人が相続財産を管理できるまで、次ができる（873条の2）。

一号。相続財産に属する特定の財産の保存に必要な行為。家庭裁判所の許可は不要。例は、時効の完成が近い債権について請求して完成を猶予すること。雨漏りする建物を修繕すること。

二号。弁済期が到来している債務の弁済。家庭裁判所の許可は不要。例は、医療費、入院費、公共料金の支払。

三号。死体の火葬又は埋葬に関する契約の締結その他相続財産の保存に必要な行為（一号・二号を除く）。家庭裁判所の許可が要る。例は、火葬又は埋葬の契約。管理していた動産の寄託契約。居室の電気・ガス・水道の供給契約の解約。債務を弁済するための預貯金の払戻し。

試験で「本人の意思に反することが明らかなときを除き、保存できる」と書いてあったら×。
試験で「成年後見人は、生前も保存行為しかできない」と書いてあったら×。
試験で「預貯金の払戻しは、家庭裁判所の許可が不要」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 保存をする側 | いい役 | 死亡後、相続財産を保存する側 | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 一覧の左端。表を隠さない |
| 意思を見る相手 | いい役 | 相続人（意思に反することが明らかなら、保存はできない） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 上部の条件の横。表を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（本人の意思、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 底部のひっかけだけ |
| 案内 | いい役 | 案内（相続人の意思、の行を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。ぴっちゅは pitchi_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. A list of examples with a small icon beside each term. No corpse, no funeral scene, no cremation picture. No left-right debate panels. No three cards at the bottom.
Title: 死亡後の成年後見人ができる保存（873条の2）
Top condition, navy: 必要があるとき。相続人の意思に反することが明らかなときを除く。相続人が管理できるまで。
Beside that condition, small ぴっちゅ with the label: 相続人（意思に反することが明らかなら、できない）
Small タスク亀 at the left of the list, label: 成年後見人（死亡後に保存する）
Section header, white row: 許可は不要（1号・2号）
Row, white, house icon: 雨漏りする建物の修繕（特定の財産の保存。1号）
Row, light gray, clock and document icon: 時効の完成が近い債権を請求し、完成を猶予する（1号）
Row, white, yen coin icon: 弁済期が来た医療費・入院費・公共料金を払う（2号）
Section header, light gray: 家庭裁判所の許可が要る（3号）
Row, white, contract icon: 火葬又は埋葬に関する契約。場面は描かない
Row, light gray, box icon: 管理していた動産の寄託契約
Row, white, utility plug icon: 居室の電気・ガス・水道の供給契約の解約
Row, light gray, bankbook and yen icon: 債務を弁済するための預貯金の払戻し
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（本人の意思、とする）:
試験で「本人の意思に反することが明らかなときを除き、保存できる」と書いてあったら×。
試験で「成年後見人は、生前も保存行為しかできない」と書いてあったら×。
試験で「預貯金の払戻しは、家庭裁判所の許可が不要」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. Not a cap.
Note text: 見るのは相続人の意思。生前の財産管理は、保存行為だけではない（859条）。
Do not print any brand name, account name, or app name. Do not cover the list with characters or the pointer.
```

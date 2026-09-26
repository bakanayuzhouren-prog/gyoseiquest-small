# Codex用 — 家庭裁判所が職権で先にできること

枝分かれ。申立てがゼロのときは後見を始められない。申立てがあったあと、審判の効力まで、職権で先にできるものと、職権ではできないものを分ける。左右の対決パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/minnpou/kaji-shokken-hozen.png`
- 画像キー: `learn/minnpou/kaji-shokken-hozen`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。アプリ載せは生成後。

## 法律

後見開始は、申立てがなければ始められない（民法7条）。申立てがゼロの緊急では、家庭裁判所は職権で後見を始められない。

後見開始の申立てがあった場合、その審判が効力を生ずるまでの間、成年被後見人となるべき者の生活、療養看護又は財産の管理のため必要があるときは、家庭裁判所は、申立てにより又は職権で、担保を立てさせないで、財産の管理者を選任し、又は事件の関係人に生活、療養看護若しくは財産の管理に関する事項を指示することができる（家事事件手続法126条1項）。

財産上の行為（日常生活に関する行為を除く）について、その財産の管理者の後見を受けることを命ずる後見命令は、後見開始の申立てをした者の申立てによる。職権ではできない（126条2項）。

後見開始の審判をするときは、職権で成年後見人を選任しなければならない（民法843条1項）。後見監督人は、必要があると認めるときに、請求により又は職権で選任することができる（849条）。後見人に任務に適しない事由があるときは、請求により又は職権で解任することができる（846条）。

試験で「申立てがなくても、緊急なら職権で後見を始められる」と書いてあったら×。
試験で「後見命令は、職権でできる」と書いてあったら×。
試験で「財産の管理者の選任は、別の申立てがなければできない」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 先に保全する側 | いい役 | 申立てのあと、職権で財産を守る側 | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 126条1項の箱だけ。矢印を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（申立てなしで後見を始める、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 申立てゼロの箱と、底部のひっかけ |
| 案内 | いい役 | 案内（職権で先にできる箱を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅは置かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. A branching diagram. No left-right debate panels. No three cards at the bottom.
Title: 家庭裁判所は、申立てのあとなら職権で先に動ける
Top split.
Left box, light gray, カチャドクロ, label 誤った主張（申立てなしで後見を始める、とする）: 後見開始の申立てがゼロ。緊急でも、職権で後見は始められない（民法7条）。
Right path, white: 後見開始の申立てがあったあと。審判が効力を生ずるまで。
Under the right path, two boxes.
Box A, white, small タスク亀, label 財産の管理者（審判までの間、財産を守る）: 職権でできる（家事事件手続法126条1項）。担保は立てさせない。財産の管理者の選任。関係人への指示（生活、療養看護、財産の管理）。必要があるとき。
Box B, light gray: 職権ではできない（126条2項）。後見命令。財産上の行為について、管理者の後見を受けることを命ずる。日常生活に関する行為は除く。後見開始の申立てをした者の申立てが要る。
Bottom row, three small white boxes titled 審判のときの職権:
成年後見人は、後見開始の審判のとき、職権で選任しなければならない（民法843条1項）
後見監督人は、必要があるときに、請求により又は職権で選任できる（849条）
後見人の解任は、請求により又は職権でできる（846条）
Bottom trap strip, amber:
試験で「申立てがなくても、緊急なら職権で後見を始められる」と書いてあったら×。
試験で「後見命令は、職権でできる」と書いてあったら×。
試験で「財産の管理者の選任は、別の申立てがなければできない」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. Not a cap.
Note text: 先に動けるのは、申立てがあったあと。管理者の選任と指示は職権。後見命令は申立人の申立て。
Do not print any brand name, account name, or app name. Do not cover the branches with characters or the pointer.
```

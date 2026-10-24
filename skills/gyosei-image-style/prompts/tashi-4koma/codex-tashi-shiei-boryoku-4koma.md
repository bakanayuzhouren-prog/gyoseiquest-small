# Codex用 — 市営住宅の暴力団員排除。平等原則に反するか

関連: 合格革命第1回・問42。全国で居住を禁止する話にしない。退去と、入居資格の制限を混ぜて、居住の自由そのものを奪う図にしない。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/kenpou/shiei-boryoku-4koma.png`
- 画像キー: `learn/kenpou/shiei-boryoku-4koma`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

最判平成27年3月27日。市営住宅の入居について、暴力団員を排除する規定は、地方公共団体の合理的な裁量の範囲で審査される。暴力団から自ら脱退できることなどを踏まえ、憲法14条1項に違反しない。

社会権だから裁量がない、ではない。その市営住宅に入れないことと、全国で居住を禁じることとは別である。

試験で「暴力団員を市営住宅から排除する規定は、平等原則に反する」と書いてあったら×。試験で「全国で居住を禁止する規定だから、当然違憲である」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 排除する側 | いい役 | 市（市営住宅の入居資格を定めたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 1コマだけ |
| 入居を求める側 | 悪い役 | 暴力団員（市営住宅に入居したい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 2コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

3コマと4コマには場面役を置かない。過去の辻さんと代さんは置かない。排除規定を違憲として描かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards.

Title: 市営住宅の暴力団員排除。平等原則に反するか
Subtitle: 最判平成27年3月27日

Panel 1 title: 入居資格から外す条例
タスク亀 holds a housing rule. Label: 市（入居資格を定めたい）
Caption: 市は、市営住宅の入居者から、暴力団員を排除する規定を置いた。

Panel 2 title: 区別は平等原則に反する、と言う
カチャドクロ stands at the housing office. Label: 暴力団員（市営住宅に入居したい）
Caption: 入居を断られた側は、暴力団員というだけで区別するのは、憲法14条1項に反する、と言う。

Panel 3 title: 市の裁量は、合理的か
No character. Caption: 見るのは、入居制限が地方公共団体の合理的な裁量の範囲か。自ら暴力団を脱退できるかも、見る。

Panel 4 title: 14条1項には違反しない
No character. Caption: 脱退できることなどを踏まえると、この排除規定は、憲法14条1項に違反しない。全国で居住を禁じる規定ではない。

Footer, one line: 試験で「暴力団員の排除は平等原則に反する」と書いてあったら×。試験で「全国で居住を禁止するから当然違憲」と書いてあったら×。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers. The saved blanks are indexes only. Do not invent the missing word-bank items.
Red: 合理的な裁量。自ら脱退できる。憲法14条1項に違反しない。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

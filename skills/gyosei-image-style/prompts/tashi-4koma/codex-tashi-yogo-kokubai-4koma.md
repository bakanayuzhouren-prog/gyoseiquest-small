# Codex用 — 児童養護施設の国賠。施設の職員は、民法709条で払うか

関連: LEC公開第2回・問42。損害の絵で、虐待の場面を描かない。聞く一点は、公権力の行使のときの責任の主体である。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/kokubai/yogo-shisetsu-4koma.png`
- 上書き対象: `assets/images/deepdive/learn/kokubai/yogo-shisetsu-4koma.png`
- 画像キー: `learn/kokubai/yogo-shisetsu-4koma`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

最一小判平成19年1月25日。児童福祉法の措置（3号措置）に基づく児童養護施設の養育監護は、公権力の行使に当たる職務である。国家賠償法1条1項の賠償が成立するときは、公務員個人は民法709条の責任を負わず、使用者も民法715条の責任を負わない。

試験で「施設の職員は常に民法709条で払い、使用者は715条で払う」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 養育する側 | いい役 | 施設（措置に基づいて養育監護をする） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 1コマだけ |
| 賠償を求める側 | いい役 | 児童側（損害の賠償を求めたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

3コマと4コマには場面役を置かない。カチャドクロは置かない。過去の辻さんと代さんは置かない。傷害の場面は描かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards. Do not draw an injury or abuse scene.

Title: 児童養護施設の国賠。施設の職員は、民法709条で払うか
Subtitle: 最判平成19年1月25日

Panel 1 title: 措置で施設が養育した
タスク亀 stands at a simple children's home. Label: 施設（措置に基づいて養育監護をする）
Caption: 都道府県の措置で、児童は児童養護施設に入り、施設が養育監護をした。

Panel 2 title: 誰に賠償を求めるか
ぴっちゅ holds a claim paper. Label: 児童側（損害の賠償を求めたい）
Caption: 養育監護の過程で損害が生じたとき、職員個人や使用者に、民法で請求できるか。

Panel 3 title: 養育監護は、公権力の行使か
No character. Caption: 見るのは、3号措置に基づく養育監護が、公権力の行使に当たる職務か。

Panel 4 title: 国賠が成立するときは、民法の責任はない
No character. Caption: 養育監護は、公権力の行使に当たる。国家賠償法1条が成立するときは、公務員個人は民法709条の責任を負わず、使用者も民法715条の責任を負わない。

Footer, one line: 試験で「施設の職員は常に709条。使用者は715条」と書いてあったら×。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers.
Red: 公権力の行使。民法709条の責任を負わない。民法715条の責任を負わない。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

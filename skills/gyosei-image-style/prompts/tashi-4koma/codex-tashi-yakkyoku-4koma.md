# Codex用 — 薬局距離制限事件。距離で許可を拒む規定は、合憲か

関連: 辰巳2026・問41。小売市場の距離制限（最大判昭47.11.22）は、フッターの1行だけ。薬局の違憲を、距離制限の全部に広げない。公衆浴場の原告適格とも混ぜない。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/kenpou/yakkyoku-kyori-4koma.png`
- 上書き対象: `assets/images/deepdive/learn/kenpou/yakkyoku-kyori-4koma.png`
- 画像キー: `learn/kenpou/yakkyoku-kyori-4koma`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

最大判昭和50年4月30日。当時の薬事法が、既存の薬局から一定の距離内では薬局の開設を許可しない、とする適正配置の規定は、憲法22条1項の職業選択の自由に違反する。目的は、過当競争による不良医薬品の供給のような害悪の防止（消極目的）である。その目的のために、距離で開設を拒む手段が必要であるとはいえない。

小売市場の距離制限（最大判昭和47年11月22日）は、同じ距離でも結論が分かれる対比である。この図の結論を、距離制限は全部違憲、と書かない。公衆浴場は、既存業者の営業上の利益が法律上の利益になるかの話であり、この違憲審査ではない。

試験で「距離制限は、全部違憲である」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 距離で拒む側 | 悪い役 | 許可権者（近い場所の開設を拒みたい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 1コマだけ |
| 開設したい側 | いい役 | 開設希望者（薬局を開きたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

3コマと4コマには場面役を置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards.

Title: 薬局距離制限事件。距離で許可を拒む規定は、合憲か
Subtitle: 最大判昭和50年4月30日

Panel 1 title: 近い場所では、許可しない
カチャドクロ holds a ruler between two pharmacies. Label: 許可権者（近い場所の開設を拒みたい）
Caption: 当時の薬事法は、既存の薬局から一定の距離内では、新しい薬局の開設を許可しない、と定めていた。

Panel 2 title: 薬局を開きたい
ぴっちゅ stands with a small pharmacy sign. Label: 開設希望者（薬局を開きたい）
Caption: 開設を希望する者は、距離だけを理由に職業を選べないのは、憲法22条1項に反する、と言う。

Panel 3 title: 害悪の防止に、その手段は必要か
No character. Caption: 目的は、過当競争による不良な医薬品の供給のような害悪の防止である。見るのは、距離で開設を拒む手段が、その目的に必要か。

Panel 4 title: 22条1項に違反する
No character. Caption: その距離制限は、目的のために必要であるとはいえない。憲法22条1項に違反する。

Footer, one line: 試験で「距離制限は全部違憲」と書いてあったら×。小売市場の距離（最大判昭和47年11月22日）は、別の結論である。公衆浴場は、原告適格の話である。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers. The saved blanks are indexes only. Do not invent the missing word-bank items.
Red: 憲法22条1項に違反する。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

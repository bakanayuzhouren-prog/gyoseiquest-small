# Codex用 — 君が代起立斉唱。戒告の差止めに、重大な損害はあるか

関連: TAC第2回・問43。LEC市販第3回・問42。確認の訴えの分け方は `kimigayo-shogu-kakunin-4koma.png`。命令の合憲性（最判平成23年5月30日）は、この図に入れない。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/gyosei/kimigayo-songai-4koma.png`
- 画像キー: `learn/gyosei/kimigayo-songai-4koma`
- 上書きしない: `assets/images/deepdive/learn/gyosei/kimigayo-shogu-kakunin-4koma.png` `assets/images/deepdive/learn/gyosei/kimigayo-sashitome-songai.png`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

公立学校の校長が、式典で国旗に向かって起立し国歌を斉唱することを命じた。この職務命令自体は、処分ではない。

差止めの「重大な損害を生ずるおそれ」は、処分のあと取消訴訟と執行停止で容易に救済できるものでは足りない。処分の前に差し止めなければ救済が困難であることを要する（行政事件訴訟法37条の4第1項）。

この事件では、通達の下で懲戒が反復継続的かつ累積加重的にされる危険がある。戒告、減給、停職の一連は、事後の取消と執行停止では容易に救済できない。免職以外の懲戒の差止めには、そのおそれがある。戒告を超えるときだけ重大な損害がある、ではない。

戒告の差止めは、訴訟要件を満たしても本案では理由がない（最判平成24年1月16日）。免職の差止めは、される蓋然性がないとして不適法である。確認の利益があっても、起立斉唱の義務がないことにはならない。

試験で「戒告を超える懲戒のときだけ、重大な損害がある」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 命令する側 | いい役 | 校長（式典で起立斉唱を命じる） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 1コマだけ |
| 差止めを求める側 | いい役 | 教職員（懲戒の前に止めたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

3コマと4コマには場面役を置かない。カチャドクロは置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards.

Title: 君が代起立斉唱。戒告の差止めに、重大な損害はあるか
Subtitle: 最判平成24年2月9日

Panel 1 title: 起立斉唱を命じた
タスク亀 as the principal, small. Label: 校長（式典で起立斉唱を命じる）
Caption: 校長は、式典で国旗に向かって起立し、国歌を斉唱することを命じた。この命令自体は、処分ではない。

Panel 2 title: 従わないと、懲戒が重なる
ぴっちゅ as the teacher, small. Label: 教職員（懲戒の前に止めたい）
Caption: 通達の下で、戒告、減給、停職が繰り返され、重くなり得る。教職員は、その懲戒の前に差止めを求めた。

Panel 3 title: あとから戻せる損害か
No character. Caption: 見るのは、処分の前に止めなければ救済が困難か。取消訴訟と執行停止で容易に戻る損害では足りない（行政事件訴訟法37条の4）。

Panel 4 title: 一連の懲戒には、おそれがある
No character. Caption: 戒告から停職までの一連は、事後の取消と執行停止では容易に救済できない。免職以外の懲戒の差止めには、重大な損害を生ずるおそれがある。

Footer, two short lines:
戒告の差止めは、訴訟要件を満たしても本案では理由がない（最判平成24年1月16日）。免職の差止めは、される蓋然性がないとして不適法。
試験で「戒告を超える懲戒のときだけ、重大な損害がある」と書いてあったら×。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers.
Red: 訴訟要件。蓋然性。重大な損害。執行停止。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

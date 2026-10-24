# Codex用 — 君が代起立斉唱。命令のあと、どの訴え？（最判平24.2.9）

関連: 伊藤塾公開２・問19・肢ア。辰巳2026・問25。差止めの重大な損害は `kimigayo-songai-4koma.png`。命令の合憲性（最判平成23年5月30日）は、この図に無い。

定型の左右パネルと中央表は使わない。4コマは左から右。各コマは場面が一つ。底部の判断軸・ひっかけ・暗記は置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/gyosei/kimigayo-shogu-kakunin-4koma.png`
- 画像キー: `learn/gyosei/kimigayo-shogu-kakunin-4koma`
- 上書き対象: `assets/images/deepdive/learn/gyosei/kimigayo-shogu-kakunin-4koma.png`
- 上書きしない: `assets/images/deepdive/learn/gyosei/kimigayo-sashitome-songai.png`
- 生成は Codex。Cursor は描かない。
- 既存キーの上書きなので、新規の `[[image:]]` は付けない。

## 法律（背景と結論）

公立学校の校長が、式典で国旗に向かって起立し国歌を斉唱することを命じた。この職務命令自体は、処分ではない。教職員の身分や勤務条件を直接変えないので、抗告訴訟の対象にならない。

命令に従わなかったあと、不利益は二つに分かれる。戒告、減給、停職は懲戒処分である。勤務成績の評価を通じて昇給が抑えられることは、給与の減額ではなく、行政処分以外の処遇である。

最判平成24年2月9日は、義務がないことの確認を、目的で分けた。

将来の懲戒処分そのものの予防を目的とする確認は、無名抗告訴訟である。差止めの訴え（行政事件訴訟法37条の4）があるので、補充性を欠き不適法である。

昇給が抑えられることの予防を目的とする確認は、公法上の法律関係に関する確認の訴えである（4条後段、実質的当事者訴訟）。処遇上の不利益が反復継続的かつ累積加重的に拡大し、事後の回復が著しく困難なときは、確認の利益がある。

確認の利益があっても、義務がないことにはならない。この確認請求は、本案では理由がない。命令の合憲性（最判平成23年5月30日）、懲戒の程度（最判平成24年1月16日）、差止めの「重大な損害」は、この4コマに入れない。

試験で「確認の利益があるから、起立斉唱の義務はない」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 命令する側 | いい役 | 校長（式典で起立斉唱を命じる） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 1コマだけ。本文を隠さない |
| 確認を求める側 | いい役 | 教職員（昇給が抑えられるのを防ぎたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ。本文を隠さない |

3コマと4コマには場面役を置かない。カチャドクロは置かない。過去の辻さんと代さんは置かない。

案内役はちゃちゃロット。下余白の右に1体。緑の講師スーツ、指し棒。せりふは置かない。フッターの試験の×を指す。本文を隠さない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then one footer line. No comparison table. No left-right debate panels. No bottom cards.

Title: 君が代起立斉唱。命令のあと、どの訴え？
Subtitle: 最判平成24年2月9日

Panel 1 title: 命令自体は、処分ではない
タスク亀 as the school principal, small, not covering the caption. Label: 校長（式典で起立斉唱を命じる）
Caption: 校長は、式典で国旗に向かって起立し、国歌を斉唱することを命ずる。この職務命令は、身分や勤務条件を直接変えない。抗告訴訟の対象にならない。

Panel 2 title: 従わなかったあとは、二つ
ぴっちゅ as the teacher, small, not covering the caption. Label: 教職員（昇給が抑えられるのを防ぎたい）
Two short lines, not a table:
処分は、戒告、減給、停職。
処分以外は、勤務成績の評価を通じて昇給が抑えられること。給与の減額ではない。

Panel 3 title: 懲戒を防ぐ確認は、不適法
No character. Caption: 将来の戒告、減給、停職を防ぐ確認は、無名抗告訴訟。差止めの訴えがあるので、補充性を欠き不適法（行政事件訴訟法37条の4）。

Panel 4 title: 昇給を防ぐ確認は、実質的当事者訴訟
No character. Caption: 昇給が抑えられるのを防ぐ確認は、公法上の法律関係に関する確認の訴え（行政事件訴訟法4条後段）。処遇上の不利益が反復継続的かつ累積加重的に拡大し、事後の回復が著しく困難なときは、確認の利益がある。

Footer, one line only: 試験で「確認の利益があるから、起立斉唱の義務はない」と書いてあったら×。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

# Codex用 — 審査の申出は、だれが、だれに対して？（250条の13）

関連: 伊藤塾公開２・問24・肢3

定型の左右パネルと中央表は使わない。左から右へ、正しい申出を1本。その下に、できない向きを1本。底部の判断軸・ひっかけ・暗記は置かない。案内役は置かない。30日、3つの入口、高等裁判所は、この図に入れない。同じ文をタイトルと矢印で繰り返さない。

- 保存先: `assets/images/deepdive/learn/jichi/kuni-moushide-darekara.png`
- 画像キー: `learn/jichi/kuni-moushide-darekara`
- 生成は Codex。Cursor は描かない。
- PNGは未生成。できるまで `[[image:]]` は付けない。
- 既存の `kuni-kanyo-moushide-3.png` は、3つの入口の図である。この枚で上書きしない。

## 法律（250条の13）

審査の申出ができるのは、普通地方公共団体の長その他の執行機関だけである。申出先は、国地方係争処理委員会である。委員会は総務省に置かれる（250条の7第1項）。

相手方は、関与をした国の行政庁である。地方の執行機関を相手方にはしない。

国の行政庁は、地方公共団体の事務への関与を求めて拒否されても、委員会に審査の申出をすることはできない。

試験で「国の行政庁が、地方の執行機関を相手方にして審査の申出ができる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 申出する側 | いい役 | 長（国の関与に不服で、審査の申出をしたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 上段の左。矢印の起点 |
| 申出を受ける側 | いい役 | 委員会（審査の申出を受ける） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 上段の右。矢印の着点 |
| 誤った主張 | 悪い役 | 国の行政庁（自分から申出をしたい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下段だけ。上段の相手方の箱には置かない |

相手方の国の行政庁は、上段では箱だけにする。人物にしない。ちゃちゃロットは置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One correct flow on the top, left to right. One forbidden flow on the bottom. No comparison table. No left-right debate panels. No bottom cards. No guide character.

Title: 審査の申出は、だれが、だれに対して？
Chip: 地方自治法250条の13

Top flow, correct:
Left, ぴっちゅ small. Label: 長（国の関与に不服で、申出したい）
Arrow to the right, words on the arrow: 審査の申出
Right, タスク亀 small, at a doorway. Label: 委員会（申出を受ける）
Small place name on the doorway: 総務省
Under the arrow, one box with no character. Box title: 相手方
Box text: 関与をした国の行政庁。地方の執行機関ではない。

Bottom flow, forbidden, marked with a large red X:
Left, カチャドクロ small. Label: 国の行政庁（自分から申出をしたい）
Crossed-out arrow. Words on the crossed arrow: 地方の執行機関を相手方にする
Caption under the X: 関与を求めて拒否されても、国からは申出できない。

Footer, one line only: 試験で「国の行政庁が、地方の執行機関を相手方にして審査の申出ができる」と書いてあったら×。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the arrows or the boxes with characters.
```

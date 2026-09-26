# Codex用 — 歳出と支出

対比2語。左は歳出だけ。右は支出だけ。ひっかけは底部。左右パネルの見出しは「論点（歳出）」「論点（支出）」。底部3カードの定型は使わない。

- 保存先: `assets/images/deepdive/learn/jichi/saishutsu-shishutsu.png`
- 画像キー: `learn/jichi/saishutsu-shishutsu`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・地方自治の「もっと深掘る」。アプリ載せは生成後。

## 法律

歳出は、一会計年度に属する支出。会計年度は毎年4月1日に始まり、翌年3月31日に終わる（地方自治法208条1項）。各会計年度の歳出は、その年度の歳入をもって充てなければならない（208条2項）。予算では、歳出をその目的に従って款項に区分する（210条）。

支出は、会計管理者が公金を払い出す行為。会計管理者は、普通地方公共団体の長の、政令で定めるところによる命令がなければ、支出をすることができない（232条の4第1項）。命令をするのは長。政令は命令の方式を定める。命令があっても、法令又は予算に違反しないこと、および債務が確定していることを確認したうえでなければ支出できない（同条2項）。

試験で「歳出は、会計管理者が金を払い出す行為」と書いてあったら×。
試験で「支出は、その年度の歳入で充てる予算上の支出」と書いてあったら×。
試験で「支出を命じるのは政令」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 予算の支出 | いい役 | その年度の歳入で歳出を充てる側 | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 左の歳出。札の下。本文を隠さない |
| 払い出し | いい役 | 長の命令を確認してから払う側 | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 右の支出。札の下。本文を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（歳出と支出を同じものとする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 底部のひっかけだけ |
| 案内 | いい役 | 案内（歳出の列を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。ぴっちゅは pitchi_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Two columns only. Do not write the other word inside each column. No three cards labeled 判断軸, ひっかけ, 暗記.
Title: 歳出と支出は、別の言葉
Left heading: 論点（歳出）
Left only: 一会計年度に属する支出（地方自治法208条）。会計年度は4月1日から翌年3月31日。その年度の歳出は、その年度の歳入で充てなければならない（208条2項）。予算では、目的に従って款と項に分ける（210条）。
Under the left text, small タスク亀 with the label: 予算（その年の歳入で充てる）
Right heading: 論点（支出）
Right only: 会計管理者が公金を払い出す行為（232条の4）。長の、政令で定めるところによる命令がなければ、支出できない。命令をするのは長。政令は方式を定める。命令があっても、法令又は予算に違反しないこと、債務が確定していることを確認してから払う（232条の4第2項）。
Under the right text, small ぴっちゅ with the label: 会計管理者（命令を確認してから払う）
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（歳出と支出を同じものとする）:
試験で「歳出は、会計管理者が金を払い出す行為」と書いてあったら×。
試験で「支出は、その年度の歳入で充てる予算上の支出」と書いてあったら×。
試験で「支出を命じるのは政令」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. Not a cap.
Note text: 歳出は、その年の予算に載る支出。支出は、その払い出し。
Do not print any brand name, account name, or app name. Do not cover the two columns with characters or the pointer.
```

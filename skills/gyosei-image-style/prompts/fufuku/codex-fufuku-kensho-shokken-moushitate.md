# Codex用 — 検証の通知は、いつ要るか？

左右は対比2語。左は職権だけ。右は申立てだけ。中央の表は置かない。底部3カードは置かない。同じ文をタイトルと左右とフッターで繰り返さない。

- 保存先: `assets/images/deepdive/learn/gyosei/kensho-shokken-moushitate.png`
- 画像キー: `learn/gyosei/kensho-shokken-moushitate`
- 生成は Codex。Cursor は描かない。
- 既存の `assets/images/deepdive/fufuku/shoko-32-36.png` は上書きしない。あちらは32条から36条の一覧。この1枚は、検証の意味と、通知の有無だけ。
- 配置案: 行政不服審査法の審理手続。PNGができてから Cursor が載せる。生成前は `[[image:]]` を付けない。
- 関連: LEC市販第2回・問14・肢2。

## 法律（崩すな）

e-Gov。行政不服審査法35条。確認日 2026-10-14。

検証は、審理員が、必要な場所の状態を、その場で直接調べること。書類の提出は33条。人への質問は36条。

1項は、審査請求人若しくは参加人の申立てにより、又は職権で、必要な場所を検証できる。

2項は、申立てにより検証をしようとするときに限る。あらかじめ、日時と場所を、当該申立てをした者に通知し、立ち会う機会を与えなければならない。

通知先は、申し立てた者。審査請求人に限らない。参加人が申し立てたときは参加人。

職権の検証には、2項の通知と立会の機会の義務はない。

申立てがあっても、必ず検証するわけではない。義務が掛かるのは、検証をしようとするとき。

書かないこと。審査庁が検証する、と書くこと。職権でも請求人へ通知必須、と書くこと。問題文の全文。ブランド名。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 審理員 | いい役 | 審理員（必要な場所を、その場で調べたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 左の場所の前。右では通知を渡す側。本文を隠さない |
| 申立人 | いい役 | 申し立てた者（立ち会いたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 右だけ。通知を受け取る |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

カチャドクロ系は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One definition line under the title, then two columns side by side. No comparison table. No bottom trio of cards. No extra document icons.

Title: 検証の通知は、いつ要るか？
One line under the title: 検証は、審理員が必要な場所の状態を、その場で直接調べること（35条）。書類の提出は33条。

Left column heading: 論点（職権）
Do not write 申立て in this column.
タスク亀 looks at a simple building site, holding no notice paper.
Label under タスク亀: 審理員（場所を調べたい）
Q&A, short:
誰が始める？ → 審理員
事前の通知は？ → 35条2項の義務はない

Right column heading: 論点（申立て）
Do not write 職権 in this column.
タスク亀 hands a small paper reading 日時・場所 to ぴっちゅ.
Label under タスク亀: 審理員（通知したい）
Label under ぴっちゅ: 申し立てた者（立ち会いたい）
Q&A, short:
誰が始める？ → 審査請求人または参加人
通知は？ → 日時と場所を、申し立てた者へ
立会は？ → 機会を与えなければならない（35条2項）

Footer, two short lines only:
試験で「職権でも、請求人に日時と場所を通知しなければならない」と書いてあったら×。
試験で「通知先は、必ず審査請求人」と書いてあったら×。参加人が申し立てたときは、参加人。

Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only, outside the columns. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 申立てがあっても、必ず検証するわけではない。通知の義務は、検証をしようとするとき。

Do not print any brand name, account name, or app name. Do not cover the Q&A or the footer with characters or the pointer.
```

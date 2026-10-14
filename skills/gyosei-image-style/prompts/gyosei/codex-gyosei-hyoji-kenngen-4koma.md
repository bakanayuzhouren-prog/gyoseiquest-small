# Codex用 — 内部の会議と、外に出した書面は、どっちが行政行為か

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/gyosei/hyoji-kenngen-4koma.png`
- 画像キー: `learn/gyosei/hyoji-kenngen-4koma`
- 生成は Codex。Cursor は描かない。
- 配置案: 行政法総論の行政行為の成立。PNGができてから Cursor が載せる。生成前は `[[image:]]` を付けない。
- 関連: LEC市販第2回・問9・肢3。固有の当事者名は図に書かない。

## 法律（崩すな）

最三小判昭29.9.28（民集8巻9号1779頁）。確認日 2026-10-14。

書面でされた行政行為は、書面の作成で成立し、名宛人への到達で効力を生じる。

内部の意思決定と書面の表示が違っていても、表示が正当の権限ある者によってされた限り、書面に表示されたとおりの行政行為があったものと認める。判決は、その表示が正当の権限ある者によることは原審の認定だ、と書く。

表示した者と名宛人の固有名詞は、公開の判示からは確認できない。図の人物は役割だけ。知事、町長、申請者の氏名は書かない。

書かないこと。権限のない職員が書いた書面も有効、と書くこと。到達がなくても効力が生じる、と書くこと。問題文の全文。ブランド名。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 内部 | 悪い役 | 担当（会議では不許可にしたい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 1コマだけ。本文を隠さない |
| 表示 | いい役 | 表示権限のある者（外部へ書面を示したい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 2コマ。書面を渡す側 |
| 名宛人 | いい役 | 名宛人（書面を受け取りたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマ。受け取る側 |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

3コマと4コマにはキャラを置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。タスク亀は task_turtle_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one row, left to right, then a short footer. No comparison table. No left-right debate panels.

Title: 内部の会議と、外に出した書面は、どっちが行政行為か
Subtitle: 最三小判昭和29年9月28日。固有の当事者名は、この図に書かない

Panel 1 title: 会議は、不許可
カチャドクロ sits at a small meeting table. A paper on the table reads 不許可. Caption: 内部の意思決定は、不許可。この会議だけでは、行政行為は成立しない。
Label under カチャドクロ: 担当（会議では不許可にしたい）.

Panel 2 title: 権限のある者が、名宛人へ書面を渡した
タスク亀 hands a written sheet to ぴっちゅ. The sheet reads 許可. Caption: 表示した者は、その行政機関で外部へ書面を示す権限のある者。相手は、その書面の名宛人。
Label under タスク亀: 表示権限のある者（外部へ書面を示したい）.
Label under ぴっちゅ: 名宛人（書面を受け取りたい）.

Panel 3 title: 中身が食い違う
No character. Two papers side by side. Left paper: 内部は不許可. Right paper: 書面は許可. Caption: 内部の意思決定と、書面の表示は違う。判決は、表示が正当の権限ある者によることは、原審の認定だ、と書く。

Panel 4 title: 書面のほうが行政行為
No character. One large paper reading 許可. Caption: 正当の権限ある者の表示である限り、書面に表示されたとおりの行政行為があったものと認める。成立は書面の作成。効力は、名宛人への到達。

Footer, two short lines:
試験で「内部の会議の結論が、外の書面に勝つ」と書いてあったら×。
試験で「権限のない者が書いた書面でも、同じ結論になる」と書いてあったら×。

Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only, outside the panels. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 表示した者と名宛人の氏名は、この判例の公開判示からは特定しない。

Do not print any brand name, account name, or app name. Do not cover the captions or the footer with characters or the pointer. Do not invent a governor, a mayor, or an applicant's personal name.
```

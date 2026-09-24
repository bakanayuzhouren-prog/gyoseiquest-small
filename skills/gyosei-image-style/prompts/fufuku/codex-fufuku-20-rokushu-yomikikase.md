# Codex用 — 行服法20条 口頭審査請求は録取して読み聞かせる

1枚目は口頭のときの手続（20条）。2枚目は処分の審査請求書に書く6つ（19条2項）。
口頭で陳述するのは2項の6つだけではない。19条2項から5項。不作為は3項の3つ。

てらしぃの「その処分を録取」は条文と違う。録取するのは**陳述の内容**。図に「処分を録取」を正しいルールとして書かない。

現行20条後段に押印義務はない。押印必須と書かない。口頭意見陳述（31条）と混ぜない。経由送付の「直ちに」（21条）もこの図の答えにしない。

- 保存先（録取）: `assets/images/deepdive/fufuku/koto-rokushu-yomikikase.png`
- 保存先（6事項）: `assets/images/deepdive/fufuku/shinsa-seikyusho-6.png`
- 画像キー: `fufuku/koto-rokushu-yomikikase` / `fufuku/shinsa-seikyusho-6`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政不服審査法の「もっと深掘る」。アプリ載せは生成後。

## PRE-GENERATE-CHECK（行服法19条・20条）

**19条1項** 審査請求は、他の法律（条例に基づく処分については、条例）に口頭でできる旨の定めがある場合を除き、審査請求書を提出してする。

**19条2項（処分の審査請求書・6つ）**
1. 審査請求人の氏名又は名称及び住所又は居所
2. 審査請求に係る処分の内容
3. その処分（再調査の請求についての決定を経たときは、その決定）があったことを知った年月日
4. 審査請求の趣旨及び理由
5. 処分庁の教示の有無及びその内容
6. 審査請求の年月日

**19条3項（不作為・3つ）** 氏名又は名称及び住所又は居所／申請の内容及び年月日／審査請求の年月日。2枚目の本文表には入れない。キャプションだけ。

**19条4項・5項** 該当すれば追加。4項は代表者・管理人・総代・代理人の氏名及び住所又は居所。5項は、再調査の請求をした年月日、決定を経ない正当な理由、期間経過後の正当な理由。

**20条** 口頭で審査請求をする場合には、前条2項から5項までに規定する事項を陳述しなければならない。この場合において、陳述を受けた行政庁は、その陳述の内容を録取し、これを陳述人に読み聞かせて誤りのないことを確認しなければならない。21条2項の「審査請求録取書」は、この後段で録取した書面。

**書かない:** 処分を録取する。口頭なら自由。読み聞かせ不要。押印必須。口頭が原則。31条の口頭意見陳述と同じ。

## 配役（両枚）

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 陳述する側 | いい役 | 審査請求人（記載事項を陳述する） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` |
| 録取する側 | いい役 | 行政庁（陳述の内容を録取し、読み聞かせて確認する） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` |
| 誤った主張 | 悪い役 | 誤った主張をする側（口頭なら自由、読み聞かせは不要とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` |
| 案内 | いい役 | 案内（暗記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |

## 1枚目 GPT Image プロンプト（録取・読み聞かせ）

```text
参照必須: ぴっちゅは pitchi_sheet.png。タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。制度の意味を先に示し、条文番号は括弧で後から付ける。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 口頭で審査請求をするときは、審査請求書に記載すべき事項を陳述する。陳述を受けた行政庁は、その陳述の内容を録取し、これを陳述人に読み聞かせて誤りのないことを確認する（行政不服審査法20条）.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas/background: fully opaque solid warm off-white across 100% of the entire 16:9 canvas. No transparency or unpainted margin.
Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Do not print brand names anywhere on the image.
Scene people are only ぴっちゅ, タスク亀, カチャドクロ, and one ちゃちゃロット. No other people. No 辻さん. No 代さん.

Left heading 論点. Right heading ひっかけ.
Q&A answers are YES, NO, or a short legal phrase. Do not use GO or STOP.
Labels: ぴっちゅ「審査請求人（記載事項を陳述する）」タスク亀「行政庁（録取し、読み聞かせて確認する）」カチャドクロ「誤った主張をする側（口頭なら自由とする）」

Title:「口頭でも、記載事項を述べ、読み聞かせて確認する」
Chip:「行政不服審査法」

Center ONLY: one table. Header navy. Row zebra white / light gray, horizontal not columns.
Columns: 順番 | 誰が | 何をする
Rows:
1 | 審査請求人 | 審査請求書の記載事項を陳述する（19条2項から5項）
2 | 陳述を受けた行政庁 | 陳述の内容を録取する（20条）
3 | 同じ行政庁 | 陳述人に読み聞かせて、誤りがないことを確認する
Caption:「口頭は、法律又は条例に定めがあるときに限りできる。録取するのは処分ではなく、陳述の内容」

Left 論点:
1. いつも口頭でできるか？ → NO（法律・条例の定め）
2. 何を陳述するか？ → 審査請求書の記載事項
3. 録取のあと読み聞かせるか？ → YES

Right ひっかけ:
- 口頭なら言い方は自由
- 録取すれば読み聞かせは不要
- 処分そのものを録取する
- 口頭意見陳述と同じ手続

Bottom:
- 判断軸:「法律又は条例の定めがあるか。陳述したのは記載事項か。録取したのは陳述の内容か。読み聞かせて確認したか」
- ひっかけ:「口頭は自由。読み聞かせ不要。処分を録取」
- 暗記:「陳述の内容を録取し、読み聞かせて誤りがないことを確認する」
Answer:「口頭のときは記載事項を陳述し、行政庁は陳述の内容を録取して読み聞かせ、誤りがないことを確認する。」

Guide: ONE ちゃちゃロット only, SMALL bottom-right margin, wooden 指し棒 pointing at 暗記. Cream face, independent pale-sky-blue smiling hat with three rounded hills and a long brim (not ears, not a hood), closed smiling eyes, green lecturer jacket, white shirt, green trousers, shoes. No nameplate. Do not stand on the answer band.
ぴっちゅ and タスク亀 SMALL on the correct side. カチャドクロ SMALL on the trap side. Do not cover the table. No owl, bear, cat, raccoon.
```

## 2枚目 GPT Image プロンプト（処分の審査請求書の6つ）

左右パネルは置かない。6行を大きく読むため。

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。ぴっちゅは pitchi_sheet.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 処分についての審査請求書に記載する6つの事項（行政不服審査法19条2項）.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas/background: fully opaque solid warm off-white across 100% of the entire 16:9 canvas. No transparency or unpainted margin.
Layout: NO left panel and NO right panel. Title, one center TABLE, then bottom 判断軸 / ひっかけ / 暗記, then the answer bar. Keep the table glyphs large. Reserve only the lower-left margin for ぴっちゅ.

Do not print brand names anywhere on the image.
Scene people are only ぴっちゅ and one ちゃちゃロット. No other people. No カチャドクロ on this sheet. No 辻さん. No 代さん.

Title:「処分の審査請求書に書く6つ」
Chip:「行政不服審査法19条2項」

Center ONLY: one table. Header navy. Row zebra white / light gray, horizontal not columns.
Columns: 号 | 記載事項
Rows:
一 | 氏名又は名称、住所又は居所
二 | 処分の内容
三 | 処分を知った年月日（再調査の決定を経たときは、その決定を知った年月日）
四 | 審査請求の趣旨及び理由
五 | 処分庁の教示の有無及びその内容
六 | 審査請求の年月日
Caption:「口頭のときは、この6つを含め19条2項から5項を陳述する。不作為の審査請求書は、氏名等・申請の内容と年月日・審査請求の年月日の3つ（3項）」

Bottom:
- 判断軸:「処分の審査請求書か。知った日は処分か、再調査の決定を経たときはその決定か」
- ひっかけ:「知った日は処分の日だけ。教示の有無は書かない。6つは不作為の審査請求書にもそのまま要る」
- 暗記:「処分の審査請求書は、人・処分・知った日・趣旨理由・教示・請求の日」
Answer:「処分の審査請求書には、氏名等、処分の内容、知った年月日、趣旨と理由、教示の有無と内容、審査請求の年月日を書く。」

Guide: ONE ちゃちゃロット SMALL bottom-right, green lecturer suit, white shirt, green trousers, shoes, independent pale-sky-blue smiling hat, wooden 指し棒 at 暗記. No nameplate. Do not stand on the answer band.
ぴっちゅ SMALL lower-left, label「審査請求人（この6つを書く）」。Do not cover the table. No owl, bear, cat, raccoon.
```

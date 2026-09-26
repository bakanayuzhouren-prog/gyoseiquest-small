# Codex用 — 行政手続法と行政不服審査法の似ている組

2枚。1枚目は、同じ仕事で許可する人だけが違う組。2枚目は、似て見えるが努力か義務かが違う組。どちらも表。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右のdebateパネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/gyosei/gyotei-gyofuku-hito.png`
- 保存先: `assets/images/deepdive/learn/gyosei/gyotei-gyofuku-gimu.png`
- 画像キー: `learn/gyosei/gyotei-gyofuku-hito` / `learn/gyosei/gyotei-gyofuku-gimu`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政手続法と行政不服審査法の「もっと深掘る」。アプリ載せは生成後。

## 法律（1枚目。人だけが違う）

標準処理期間（行政手続法6条）も、標準審理期間（行政不服審査法16条）も、定めるのは努力義務。定めたときは、公にするのが義務。6条は申請から処分まで。16条は審査請求から裁決まで。不利益処分に標準処理期間はない。

聴聞の主宰者と、審査請求の審理員は、どちらも手続を司会し、最終の処分や裁決はしない。処分に関与した者でも主宰者にはなれる。審理員にはなれない。再調査には審理員がいない。語は主宰者であり、主催者ではない。

参加人。聴聞は主宰者の許可（17条）。審査請求は審理員の許可（13条）。どちらも、必要があるときは参加を求めることができる。当事者本人と審査請求人は許可不要。

補佐人。聴聞で補佐人と出頭するには主宰者の許可（20条2項）。口頭意見陳述で補佐人と出頭するには審理員の許可（31条3項）。

資料。聴聞は行政庁に閲覧を求める（18条）。審査請求は審理員に閲覧を求める（38条）。第三者の利益を害するおそれがあるときなど、正当な理由があれば拒める。

代理人。聴聞の当事者も審査請求人も、代理人を選べる。許可は不要（手続法16条、不服審査法12条）。

試験で「標準処理期間を定めたら、公にしなくてよい」と書いてあったら×。
試験で「審理員は、処分に関与した者でもなれる」と書いてあったら×。
試験で「審査請求の参加は、審査庁の許可」と書いてあったら×。

## 法律（2枚目。強さが違う）

申請の形式上の不備は、速やかに補正を求め、又は拒否できる（行政手続法7条）。審査請求書の不備は、相当の期間を定めて補正を命じなければならない（行政不服審査法23条）。補正が明らかに不能なときだけ、命令なしで却下できる（24条2項）。

聴聞は、制度が口頭。審査請求の口頭意見陳述は、申立てがあれば審理員が与える。弁明を口頭でするかは、行政庁が認めたときだけで、この対ではない。

関連する申請をまとめて進めるのは、努めるものとする（11条2項。努力）。審理手続を計画的に進めるのは、図らなければならない（28条。義務）。

主宰者は調書と報告書を作り、行政庁は意見を参酌して処分する。審理員は意見書を審査庁に出す。書いた人が最終判断をするのではない。

審理員名簿（17条）は、作るのが努力、作ったら公にするのが義務。行政手続法に、同じ名簿はない。

試験で「審査請求書の不備は、すぐに拒否できる」と書いてあったら×。
試験で「審理の計画的進行は、努力義務」と書いてあったら×。
試験で「行政手続法にも、審理員名簿がある」と書いてあったら×。

## 配役（両枚共通）

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（定めた期間は公にしなくてよい、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表の中に置かない |
| 案内 | いい役 | 案内（注記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。各枚1体。緑の講師スーツ |

ぴっちゅとタスク亀は、この2枚には置かない。表を隠さないため。過去の辻さんと代さんは置かない。

## GPT Image プロンプト（1枚目）

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One comparison table is the figure. No left-right debate panels. No three cards at the bottom.
Title: 手続法と不服審査法は、同じ仕事で人が違う
Subtitle: 定めるのは努力。定めたら、公にするのは義務
Header, navy: 仕事 / 行政手続法 / 行政不服審査法
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Row 期間の目安: 標準処理期間（6条）。申請から処分まで。不利益処分にはない / 標準審理期間（16条）。審査請求から裁決まで。どちらも、定めるのは努力。定めたら公にするのは義務
Row 司会: 聴聞の主宰者。処分に関与した者でもなれる。最終処分はしない / 審査請求の審理員。処分に関与した者はなれない。再調査にはいない。最終裁決はしない
Row 参加人: 主宰者の許可（17条）。必要があるときは参加を求められる / 審理員の許可（13条）。必要があるときは参加を求められる。審査庁の許可ではない
Row 補佐人: 聴聞で出頭するには、主宰者の許可（20条2項） / 口頭意見陳述で出頭するには、審理員の許可（31条3項）
Row 資料: 行政庁に閲覧を求める（18条）。正当な理由があれば拒める / 審理員に閲覧を求める（38条）。正当な理由があれば拒める
Row 代理人: 聴聞の当事者は代理人を選べる。許可不要（16条） / 審査請求人も代理人を選べる。許可不要（12条）
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（定めた期間は公にしなくてよい、とする）:
試験で「標準処理期間を定めたら、公にしなくてよい」と書いてあったら×。
試験で「審理員は、処分に関与した者でもなれる」と書いてあったら×。
試験で「審査請求の参加は、審査庁の許可」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 語は主宰者。主催者ではない。
Do not print any brand name, account name, or app name. Do not cover the table with characters or the pointer.
```

## GPT Image プロンプト（2枚目）

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One comparison table is the figure. No left-right debate panels. No three cards at the bottom.
Title: 似ている条文は、努力か義務かで分かれる
Subtitle: 形が同じでも、すぐに拒否できるとは限らない
Header, navy: 仕事 / 行政手続法 / 行政不服審査法
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Row 書類の不備: 申請の形式上の不備は、速やかに補正を求め、又は拒否できる（7条） / 審査請求書の不備は、相当の期間を定めて補正を命じなければならない（23条）。補正が明らかに不能なときだけ、命令なしで却下できる（24条2項）
Row 口頭: 聴聞は、制度が口頭 / 口頭意見陳述は、申立てがあれば審理員が与える。弁明の口頭は、行政庁が認めたときだけで、この対ではない
Row 進行: 関連する申請をまとめて進めるのは、努めるものとする（11条2項。努力） / 審理手続を計画的に進めるのは、図らなければならない（28条。義務）
Row 記録: 主宰者は調書と報告書を作る。行政庁が意見を参酌して処分する / 審理員は意見書を審査庁に出す。書いた人は最終判断をしない
Row 名簿: 同じ名簿はない / 審理員名簿（17条）。作るのは努力。作ったら公にするのは義務
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（計画的進行は努力でよい、とする）:
試験で「審査請求書の不備は、すぐに拒否できる」と書いてあったら×。
試験で「審理の計画的進行は、努力義務」と書いてあったら×。
試験で「行政手続法にも、審理員名簿がある」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 11条2項は努力。28条は義務。
Do not print any brand name, account name, or app name. Do not cover the table with characters or the pointer.
```

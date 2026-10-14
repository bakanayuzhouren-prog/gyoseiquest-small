# Codex用 — 参加人は、審査会に何を求める？

表が主役。3行だけ。底部カード、答え帯、案内役は置かない。同じ文をタイトルと表で繰り返さない。書類の流れ図（諮問するときの渡し先）は描き直さない。

- 保存先: `assets/images/deepdive/fufuku/sankajin-shinsakai-motomeru.png`
- 画像キー: `fufuku/sankajin-shinsakai-motomeru`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政不服審査法の審査会の深掘り。PNGができてから Cursor が載せる。生成前は `[[image:]]` を付けない。

## 法律の芯（崩すな）

e-Gov。行政不服審査法74条、75条、76条、78条、43条3項。確認日 2026-10-14。

審査関係人は、審査請求人、参加人、諮問をした審査庁。参加人が自分からできるのは次の3つ。

- 76条: 主張書面又は資料を提出できる。審査会が期間を定めたときは、その期間内。
- 75条1項: 口頭で意見を述べる申立てがあれば、審査会は機会を与えなければならない。審査会が必要がないと認めるときは、この限りでない。
- 75条2項: 審査請求人又は参加人は、審査会の許可を得て、補佐人とともに出頭できる。
- 78条1項: 提出された主張書面又は資料の閲覧、又は写しの交付を求めることができる。拒めるのは、第三者の利益を害するおそれがあると認めるとき、その他正当な理由があるとき。

周辺は1行だけ。74条は審査会が提出を求める側。43条3項の諮問の通知と審理員意見書の写しは、審査庁から届く。

**書かない:** 審理員の口頭意見陳述（31条）とその除外（所在不明などで困難）。手数料。答申書の送付。裁決。委員の人数。問題文の全文。ブランド名。

## 印字してよい文字

- タイトル: `参加人は、審査会に何を求める？`
- 列名: `参加人がすること` / `どこまでか`
- 1行目: `主張書面・資料を提出する（76条）` / `自分から出せる。期間を定めたときは、その期間内`
- 2行目: `口頭で意見を申し立てる（75条）` / `機会を与えなければならない。必要がないと認めれば除く。補佐人は審査会の許可`
- 3行目: `閲覧と写しの交付を求める（78条）` / `拒めるのは、第三者の利益を害するおそれその他正当な理由`
- 表の下に1行: `求められて出すのは74条。諮問の通知と審理員意見書の写しは、審査庁から届く（43条3項）`
- ひっかけ1行: `試験で「参加人は、求められないと審査会へ何も出せない」と書いたら×`

## 配役

置かない。表で足りる。案内役も置かない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
ONE job: three things an intervenor can ask of the administrative appeal review board on their own.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas: fully opaque warm off-white, entire 16:9. No dark empty corners.

LAYOUT: a short question, then one 3-row table, then two short lines. No left essay column. No right essay column. No bottom judgment cards. No navy answer bar. No mascot. No people. No documents. No arrows.

Title, one line, large:「参加人は、審査会に何を求める？」

One table. Header row is a navy band with white text. Data rows alternate by ROW, not by column: row 1 white, row 2 light gray, row 3 white.
Header:「参加人がすること」｜「どこまでか」
Row 1:「主張書面・資料を提出する（76条）」｜「自分から出せる。期間を定めたときは、その期間内」
Row 2:「口頭で意見を申し立てる（75条）」｜「機会を与えなければならない。必要がないと認めれば除く。補佐人は審査会の許可」
Row 3:「閲覧と写しの交付を求める（78条）」｜「拒めるのは、第三者の利益を害するおそれその他正当な理由」

One line under the table, once:「求められて出すのは74条。諮問の通知と審理員意見書の写しは、審査庁から届く（43条3項）」
One trap line at the bottom, once:「試験で「参加人は、求められないと審査会へ何も出せない」と書いたら×」

Do not repeat the three actions outside the table. Do not write that an oral hearing is always given. Do not write the examiner's hardship exception. Do not write a fee. Do not write that the intervenor becomes a board member.

No owl, bear, cat, mascot, nameplate, speech balloon. No brand letters. No watermark.
```

## 目視

- [ ] 76条は自分から提出できる。74条は審査会が求める側
- [ ] 75条の除外は「必要がない」。所在不明で困難、とは書いていない
- [ ] 補佐人は審査会の許可
- [ ] 78条で拒めるのは、第三者の利益を害するおそれその他正当な理由
- [ ] ブランド印字なし。キャラなし。行の背面は白、薄いグレー、白

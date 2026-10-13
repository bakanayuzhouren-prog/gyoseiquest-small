# Codex用 — 解散と解職の連署は、何人？

表が主役。3行だけ。底部カード、答え帯、案内役は置かない。同じ文をタイトルと表と脚注で繰り返さない。請求先は書かない（76条・80条・81条は選挙管理委員会、86条は長。この図の仕事は人数）。

- 保存先: `assets/images/deepdive/learn/jichi/rensho-dankai.png`
- 画像キー: `learn/jichi/rensho-dankai`
- 生成は Codex。Cursor は描かない。
- 既存の `gomi-san-chokusetsu.png` は上書きしない。あちらは50分の1と3分の1の聞き分け。この1枚は、3分の1側の段階計算だけ。
- 配置案: 見て聞いて覚える・地方自治の事務監査と解散の深掘り。PNGができてから Cursor が載せる。生成前は `[[image:]]` を付けない。

## 法律の芯（崩すな）

e-Gov。地方自治法76条1項、80条1項、81条1項、86条1項。確認日 2026-10-14。4つの請求の括弧内の計算は同じ。

選挙権を有する者の総数で切る。

- 40万以下（40万ちょうどを含む。緩和は「四十万を超える」から）: 総数の3分の1。
- 40万を超え、80万以下（80万ちょうどを含む。「八十万以下」）: 40万を超えた人数に6分の1を乗じた数 ＋ 40万に3分の1を乗じた数。
- 80万を超える（80万ちょうどは入らない。「八十万を超える」）: 80万を超えた人数に8分の1を乗じた数 ＋ 40万に6分の1を乗じた数 ＋ 40万に3分の1を乗じた数。

3段目の「40万の6分の1」は、40万人に6分の1を乗じる。80万人全体に6分の1ではない。総数全部に8分の1でもない。

この計算を使う請求は次だけ。

- 議会の解散（76条）
- 議員の解職（80条）
- 長の解職（81条）
- 副知事、副市町村長、指定都市の総合区長、選挙管理委員、監査委員、公安委員の解職（86条）

事務監査請求（75条）は50分の1のまま。住民監査請求（242条）は住民1人。条例の制定改廃（74条）も50分の1のまま。投票の過半数は、この図に書かない。

**書かない:** 端数の切り上げ。具体的な都市の人数。教育長・教育委員（地方自治法86条の列挙にない）。請求先を4つとも選挙管理委員会と書くこと。問題文の全文。ブランド名。

## 印字してよい文字

- タイトル: `解散と解職の連署は、何人？`
- 表の上に1行: `この人数を使う請求`
- 4つの札: `議会の解散（76条）` / `議員の解職（80条）` / `長の解職（81条）` / `副知事・副市町村長・総合区長・選挙管理委員・監査委員・公安委員の解職（86条）`
- 表の列名: `選挙権を有する者の数` / `連署`
- 1行目: `40万以下` / `総数の3分の1`
- 2行目: `40万を超え、80万以下` / `40万を超えた人数の6分の1 ＋ 40万の3分の1`
- 3行目: `80万を超える` / `80万を超えた人数の8分の1 ＋ 40万の6分の1 ＋ 40万の3分の1`
- ひっかけ1行: `試験で「事務監査や住民監査にも段階計算がある」と書いたら×`

## 配役

置かない。表で足りる。案内役も置かない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
ONE job: how many signatures are required for dissolution and removal, in three population bands.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas: fully opaque warm off-white, entire 16:9. No dark empty corners.

LAYOUT: a short question, four name chips, then one 3-row table. No left essay column. No right essay column. No bottom judgment cards. No navy answer bar. No mascot. No people. No documents. No arrows.

Title, one line, large:「解散と解職の連署は、何人？」

One line under the title:「この人数を使う請求」
Four chips in a row, wrapping to two lines if needed, large type:
「議会の解散（76条）」
「議員の解職（80条）」
「長の解職（81条）」
「副知事・副市町村長・総合区長・選挙管理委員・監査委員・公安委員の解職（86条）」

Then one table. Header row is a navy band with white text. Data rows alternate by ROW, not by column: row 1 white, row 2 light gray, row 3 white.
Header:「選挙権を有する者の数」｜「連署」
Row 1:「40万以下」｜「総数の3分の1」
Row 2:「40万を超え、80万以下」｜「40万を超えた人数の6分の1 ＋ 40万の3分の1」
Row 3:「80万を超える」｜「80万を超えた人数の8分の1 ＋ 40万の6分の1 ＋ 40万の3分の1」

One trap line at the bottom, once:「試験で「事務監査や住民監査にも段階計算がある」と書いたら×」

Do not repeat the three formulas outside the table. Do not write a filing office. Do not write that every voter is counted at one sixth or one eighth. Do not write 80万の6分の1. Do not put 80万ちょうど into the third row. The second row includes exactly 800,000. The first row includes exactly 400,000.

No owl, bear, cat, mascot, nameplate, speech balloon. No brand letters. No watermark.
```

## 目視

- [ ] 40万ちょうどは1行目。80万ちょうどは2行目。3行目は80万を超える
- [ ] 3行目は「80万を超えた人数の8分の1」＋「40万の6分の1」＋「40万の3分の1」。80万全体の6分の1ではない
- [ ] 1行目は「総数の3分の1」。40万の3分の1だけ、ではない
- [ ] 請求先が書いていない
- [ ] 事務監査・住民監査を、段階計算の対象札に入れていない
- [ ] ブランド印字なし。キャラなし。行の背面は白、薄いグレー、白

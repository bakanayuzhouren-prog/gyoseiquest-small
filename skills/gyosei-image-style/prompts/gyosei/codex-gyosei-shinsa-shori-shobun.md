# Codex用 — だれが、何を定める？

関連: LEC公開3・問11・肢4。審査基準と処分基準だけの既存図は `assets/images/deepdive/learn/tetsuzuki/shinsa-shobun-riyu.png`（理由の提示も入る。標準処理期間の「だれ」は無い）。標準処理期間と標準審理期間は `assets/images/deepdive/learn/gyosei/gyotei-gyofuku-gimu.png`。この枚は描き直さない。新しい1枚は、審査基準・標準処理期間・処分基準の、だれが定めるか。

横長の表1枚。3行。見本の密度は `genkoku-nashi.png`。試験の×は下に1行。ちゃちゃロットは下余白に1体。せりふは足さない。

- 状態: 生成済み（2026-10-23）。3条3項の条件は全文がある。指し棒が2行目のその文に掛かる。てらしぃがこの画像の修正を言うまで上書きしない。

- 保存先: `assets/images/deepdive/learn/gyosei/shinsa-shori-shobun.png`
- 画像キー: `learn/gyosei/shinsa-shori-shobun`
- 生成は Codex。Cursor は描かない。
- PNGのアプリ載せは、できてからてらしぃが載せるまでしない。

## 法律

e-Gov。行政手続法5条、6条、12条1項、3条3項。確認日 2026-10-23。正本は `data/knowledge/canonical/gyofuku-chiho-tekiyou.md`。

- 審査基準は、申請の許認可等をするかどうかを判断する基準。定めるのは義務。公にするのも義務。公にしないでよいのは、行政上特別の支障があるとき（5条3項）。主体は、その申請を処分する行政庁。
- 標準処理期間は、申請がその事務所に着いてから、その申請に対する処分をするまでに通常要すべき期間。定めるのは努力。定めたら、公にするのは義務。行政上特別の支障という例外はない。主体は、その申請を処分する行政庁。提出先がその行政庁と別の機関でも、定めるのは提出先ではない。そのときは、提出先に着いてから行政庁の事務所に着くまでの期間も、併せて定める（6条）。
- 6条が外れるのは、地方公共団体の機関がする処分で、その根拠が条例又は規則に置かれているとき（3条3項）。「条例又は規則が根拠のとき」まで短くしない。法律に根拠がある市町村長の許認可は、この括弧に入らない。
- 処分基準は、不利益処分をするか、どのような不利益処分にするかを判断する基準。定めるのも、公にするのも努力。行政上特別の支障という例外はない（12条1項）。主体は、その不利益処分をする行政庁。不利益処分の側に、標準処理期間はない。

図に書かない。標準審理期間。理由の提示。到達前の郵送。補正に要する期間。期間を過ぎたときの通知。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（標準処理期間の行を指す。せりふで表を繰り返さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

場面役は置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。見本の密度: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 3 data rows. No side panels. No bottom cards. No answer bar. No subtitle.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. A cell may wrap. If a cell needs more than two lines, make that row taller. Do not shrink the type. Do not shorten the Article 3 paragraph 3 condition.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one test line for one guide.

Title, one short question: だれが、何を定める？
Header, navy: 何を定めるか | だれが定めるか | 定める・公にする
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white. Not by column.
Row 1: 審査基準（5条）。申請の許認可をするかの基準 | その申請を処分する行政庁 | どちらも義務。公にする例外は、行政上特別の支障があるとき
Row 2: 標準処理期間（6条）。申請が着いてから処分までの目安 | その申請を処分する行政庁。提出先が別でも、定めるのはこの行政庁 | 定めるのは努力。定めたら、公にするのは義務。6条が外れるのは、地方公共団体の機関がする処分で、その根拠が条例又は規則に置かれているとき（3条3項）
Row 3: 処分基準（12条）。不利益処分をするか、どの処分にするかの基準 | その不利益処分をする行政庁 | どちらも努力。行政上特別の支障の例外はない
Each cell keeps its sentences. Do not shorten a cell to a slogan. Do not shrink type. In row 2, print the full condition 「地方公共団体の機関がする処分で、その根拠が条例又は規則に置かれているとき」. Do not shorten it to 「条例又は規則が根拠のとき」.
Under the table, one line only: 試験で「法律に根拠がある市町村長の許認可は、標準処理期間の適用除外だ」と書いてあったら×。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the 標準処理期間 row. No speech balloon. Do not cover the table or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 審査基準は、定めるのも公にするのも義務。公にする例外は、行政上特別の支障があるとき
- [ ] 標準処理期間は、定めるのは努力。定めたら公にするのは義務。主体は、その申請を処分する行政庁。提出先が別でも、この行政庁
- [ ] 6条が外れるのは、地方公共団体の機関がする処分で、その根拠が条例又は規則に置かれているとき（3条3項）。「条例又は規則が根拠のとき」まで短くなっていたら不合格
- [ ] 試験の×は、法律に根拠がある市町村長の許認可は標準処理期間の適用除外だ
- [ ] 処分基準は、不利益処分をする行政庁。どちらも努力。行政上特別の支障の例外はない
- [ ] 文字は縮んでいない。行は白と薄いグレーの交互
- [ ] 案内役は下余白。せりふで表を繰り返さない
- [ ] ブランド印字なし。名簿外なし

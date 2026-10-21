# 国の関与は、全部係争委に出せる？

- 状態: 未生成
- 保存先: assets/images/deepdive/learn/jichi/kuni-kanyo-keiso-taisho.png
- 画像キー: learn/jichi/kuni-kanyo-keiso-taisho
- 見せ方: 表が本体。答え帯は置かない。表と同じ文を下に繰り返さない。案内役は置かない。
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。
- 上書きしない: `assets/images/deepdive/learn/jichi/kuni-no-kanyo.png`。`assets/images/deepdive/learn/jichi/kuni-kanyo-moushide-3.png`。前者は法定主義。後者は申出の3つの入口。この枚は、245条の類型のどれが委員会に出せるか。

## PRE-GENERATE-CHECK（地方自治法245条、250条の7、250条の13）

アプリ内の地方自治法。確認日 2026-10-20。正本は `data/knowledge/canonical/kuni-kanyo-ruikei.md`。

委員会が扱うのは、国の行政機関が行う関与である（250条の7第2項）。

250条の13第1項は、是正の要求、許可の拒否その他の処分その他公権力の行使に当たるもの。除くのは、245条の8第2項と第13項の指示、同条第8項に基づき知事に代わって行うこと、市町村長への同じ読み替え。

2項は、申請等が行われた場合において、相当の期間内に、許可その他公権力の行使に当たる関与をすべきなのにしない不作為。申請等が行われた場合、を落とすと、単なる不作為も申出できるように読める。

3項は、法令に基づく協議の申出が国の行政庁に対して行われ、団体が義務を果たしたと認めるのに、協議が調わないとき。法令に基づく協議の申出、を落とすと、協議不調一般も申出できるように読める。

助言又は勧告と、資料の提出の要求は、公権力の行使ではない。是正の指示（245条の7）は、公権力の行使に当たる関与として1項に入る。代執行手続の中の指示とは別である。代執行の最初の勧告（245条の8第1項）は、公権力の行使ではない。

書かない。都道府県の機関の関与もこの委員会。助言も出せる。是正の指示（245条の7）を、代執行の途中の指示と一緒に除くこと。代執行の途中の指示を出せる、と書くこと。大臣が代わりに行うことを出せる、と書くこと。協議はいつでも出せる、と書くこと。不作為の行から「申請等が行われた場合」を落とすこと。協議の行から「法令に基づく協議の申出」を落とすこと。ブランド名。案内役。底部の判断軸、ひっかけ、暗記。

## 配役

置かない。表で足りる。

## GPT Image プロンプト

```text
Japanese legal-study infographic, warm off-white background, navy and teal. Very large gothic type. One sheet, 16:9. A table is the whole picture. No answer band. No cards under the table. No characters. No footnotes. No extra rows.

Title, a short question: 国の関与は、全部係争委に出せる？

One line under the title: 対象は、国の行政機関が行う関与。都道府県の機関の関与は、この委員会ではない（250条の7）

One table. Two columns. Column headings on a navy band: 重要ワード, 内容. Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white, row 6 light gray, row 7 white, row 8 light gray. Not by column. Do not repeat the title under the table.

重要ワード | 内容
助言・勧告、資料の提出の要求 | 出せない。公権力の行使ではない
是正の要求 | 出せる。250条の13第1項が名指しする
許可等の拒否と、しないこと | 拒否は出せる。申請等が行われた場合に、相当の期間内にしない不作為も出せる（250条の13第2項）
同意の拒否 | 公権力の行使に当たる処分であれば、出せる
是正の指示 | 245条の7。公権力の行使に当たるので出せる。代執行の途中の指示とは別
代執行 | 最初の勧告は出せない。途中の指示と、大臣が代わりに行うことは、250条の13第1項が除く。市町村長への読み替えも同じ
協議 | 法令に基づく協議の申出があり、義務を果たしたと認めるのに調わないときだけ、出せる（250条の13第3項）
そのほかの個別の関与 | 245条3号。公権力の行使に当たるものだけ、出せる

One trap line, large type, under the table: 試験で「助言も係争委に出せる」「代執行の途中の指示も出せる」と書いてあったら×。

No brand name, no watermark, no logo.
```

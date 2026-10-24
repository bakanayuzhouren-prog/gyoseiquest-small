# だれが、何を、請求できる？

情報公開法の入口。開示するかどうかは別紙。

- 保存先: `assets/images/deepdive/learn/gyosei/joho-kokai-seikyu.png`
- 画像キー: `learn/gyosei/joho-kokai-seikyu`
- 関連: LEC公開1・問26。LEC公開3・問26のア・イ。過去問の何人も、地方の努力義務。
- 上書きしない: なし。未生成。
- 別紙: `joho-kokai-kaiji.png`。公文書管理法、個人情報の本人開示、裁判所のインカメラは、この図に描かない。

生成はてらしぃが Codex に「joho-kokai-seikyu.png を画像生成して」と言うまでしない。Cursor は描かない。

## 法律の芯（崩すな）

行政機関情報公開法。確認日 2026-10-23。

- 何人も、行政機関の長に対し、行政文書の開示を請求できる（3条）。国籍も、法人格も、本人であることの確認も要らない。目的規定は、知る権利そのものを明文で定めていない。
- 行政文書かどうかは、職務上の作成・取得に加え、組織的な利用と、行政機関による保有で判断する（2条2項）。組織的に用いない職員個人のメモは、行政文書に含まれない。メモなら何でも含まれない、とは書かない。
- 地方公共団体の文書は、この法律の開示請求の対象ではない。地方公共団体は、趣旨にのっとり、必要な施策を講ずるよう努めなければならない。会計検査院は、この法律の行政機関に入る。
- 形式上の不備があるときは、相当の期間を定めて、補正を求めることができる。求めなければならない、ではない。補正の参考となる情報の提供は、努めなければならない（4条2項）。
- 開示するかどうかは、請求があった日から30日以内が原則。事務処理上の困難その他正当な理由があれば、延長できる（10条）。決定は書面で通知する（9条）。手数料は、実費の範囲内で政令が定める額（16条）。

## PRE-GENERATE-CHECK

- 補正は「できる」。参考情報の提供だけが努力義務。両方を義務にしない。
- 期限は延長できる。延長できない、と書かない。
- 地方は開示請求の対象ではない。努力義務まで落とさない。会計検査院は対象に入る。
- 行政文書の行は、次の2文。組織的に用いない職員個人のメモは、行政文書に含まれない。行政文書かどうかは、職務上の作成・取得に加え、組織的な利用と行政機関による保有で判断する（2条2項）。「入らない」と書かない。メモなら何でも対象外、とも書かない。
- 結論列に×を置かない。試験の×は下の1行。
- 5行。字を縮めない。行は白と薄いグレー。ちゃちゃロットは下余白。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（表を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

見本の密度: `assets/images/deepdive/learn/gyosho/genkoku-nashi.png`。5行。結論列の×は、この図には置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。表の密度は、原告適格なしパターンの見本と同じ。大きい字。5行まで。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One table of exactly 5 data rows. No side panels. No bottom cards.
Title: だれが、何を、請求できる？
Header, navy: 重要ワード | 内容
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white. Not by column.
No × column. Print these words once in large red type, and do not repeat them in black: 何人でもできる / 含まれない / 対象ではない / できる。義務ではない / 延長できる。
Keep the type large enough to read on a phone. Rows may wrap to two lines. Do not shrink the type to force each cell onto one line.
Exactly these 5 rows:
請求できる人 | 何人でもできる。本人確認は要らない。知る権利の明文はない（3条）
行政文書 | 組織的に用いない職員個人のメモは、行政文書に含まれない。行政文書かどうかは、職務上の作成・取得に加え、組織的な利用と行政機関による保有で判断する（2条2項）
地方の文書 | この法律の開示請求の対象ではない。地方は、必要な施策を講ずるよう努めなければならない。会計検査院は行政機関に入る
形式上の不備 | 補正は、相当の期間を定めて求めることができる。義務ではない。参考となる情報の提供は、努めなければならない（4条2項）
期限と通知 | 原則30日。事務処理上の困難その他正当な理由があれば、延長できる。決定は書面。手数料は実費の範囲で政令（10条・9条・16条）
Under the table, one line only:
試験で「本人確認が必要」「職員のメモはすべて行政文書に含まれない」「補正は義務」「期限は延長できない」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin, one mascot only, in a green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the table. No speech balloon. Do not cover the table or the line under the table.
Do not print any brand name, account name, or app name.
```

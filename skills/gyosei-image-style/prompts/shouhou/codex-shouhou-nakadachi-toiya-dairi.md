# 仲立人・問屋・代理商

表が本体。3行。見本は `assets/images/deepdive/learn/gyosho/genkoku-nashi.png`。横長3:2。ちゃちゃロットは下余白に1体。せりふは足さない。指し棒は表に入れない。

- 状態: 未生成
- 保存先: assets/images/deepdive/learn/shouhou/nakadachi-toiya-dairi.png
- 画像キー: learn/shouhou/nakadachi-toiya-dairi
- 生成は Codex。Cursor は描かない。
- PNGができるまで、アプリの `[[image:]]` は付けない。

## PRE-GENERATE-CHECK

確認日 2026-10-28。正本は `data/knowledge/canonical/shouhou-nakadachi-toiya-dairishou.md`。e-Gov商法27条、543条、549条、551条、552条1項。民法99条1項。

- 相手方との契約の当事者になるのは問屋だけ。仲立人も代理商もならない。
- 仲立人は、他人の間の商行為を媒介する（543条）。氏名または名称を示さなかった相手には、自ら履行する責任を負う（549条）。この履行責任で、当事者になるのではない。
- 問屋は、自己の名で、他人のために物品の販売または買入れをする（551条）。相手方に対して自ら権利を取得し、義務を負う（552条1項）。
- 代理商は、商人のために平常の営業の部類に属する取引を代理し、または媒介する者で、使用人ではない（27条）。媒介だけでも、代理して締結しても、当事者は本人である。代理の効果は本人に帰属する（民法99条1項）。
- 当事者の列は記号だけ。○は問屋。×は仲立人と代理商。「ない」という語は置かない。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（問屋の行を指す。せりふで表を繰り返さない。指し棒は表に入れない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と下の1行を隠さない |

場面役は置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。見本の密度: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 3 data rows. No side panels. No bottom cards. No answer bar. No subtitle.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. A cell may wrap. If a cell needs more than two lines, make that row taller. Do not shrink the type.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one test line for one guide.

Title, short label: 仲立人・問屋・代理商
Header, navy: 誰か | 名前と仕事 | 当事者
The third column is symbols only. Do not write ない in that column.
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white. Not by column.
Row 1: 仲立人 | 他人の間の商行為を媒介する（543条）。氏名または名称を示さなかった相手には、自ら履行する（549条） | ×
Row 2: 問屋 | 自己の名で、他人のために物品を売る、または買う（551条）。相手方に対して自ら権利を取得し、義務を負う（552条1項） | ○
Row 3: 代理商 | 特定の商人のために、平常の営業を代理し、または媒介する。使用人ではない（27条）。効果は本人に帰属する（民法99条1項） | ×
Under the table, one line only: 試験で「媒介代理商は、相手方との契約の当事者になる」と書いてあったら×。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the 問屋 row from outside the table. The pointer does not enter any cell and does not cross any glyph. No speech balloon. Do not cover the table or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

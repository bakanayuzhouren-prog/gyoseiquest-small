# Codex用 — 両院の議決が異なったとき、協議会は義務？任意？

関連: LEC公開3・問6。法律案は任意。予算・条約・内閣総理大臣の指名は、両院の議決が異なったとき義務。

横長の表1枚。4行。見本の密度は `genkoku-nashi.png`。試験の×は下に1行。ちゃちゃロットは下余白に1体。せりふは足さない。指し棒は表の中に入れない。

- 保存先: `assets/images/deepdive/learn/kenpou/ryouin-kyogikai.png`
- 画像キー: `learn/kenpou/ryouin-kyogikai`
- 生成は Codex。Cursor は描かない。
- PNGのアプリ載せは、できてからてらしぃが載せるまでしない。

## 法律

e-Gov。憲法59条2項・3項・4項、60条2項、61条、67条2項。国会法84条、85条、86条2項。確認日 2026-10-28。正本は `data/knowledge/canonical/ryouin-kyogikai-gimu-nini.md`。

- 法律案。両院の議決が異なったとき、協議会を求めるか、求めずに衆議院で出席議員の3分の2以上により再可決するか、である。両方は要らない。協議会は再可決の条件ではない（59条2項、3項、国会法84条）。参議院の請求は、衆議院が拒める（84条2項）。図のセルは、協議会を求めなくても、衆議院で出席議員の3分の2以上により再可決すると、法律になる。参議院が受領後、休会中を除き60日以内に議決しないときは、衆議院が否決とみなすことができる（59条4項）。
- 予算。両院の議決が異なったとき、衆議院は求めなければならない（国会法85条1項。回付案に同意しないとき、または送付案を否決したとき）。協議会で一致しないとき、または参議院が受領し、休会中を除き30日以内に参議院が議決しないとき、衆議院の議決が国会の議決になる（60条2項）。
- 条約。両院の議決が異なったとき、衆議院先議は衆議院が、参議院先議は参議院が、求めなければならない（国会法85条）。61条が60条2項を準用する。参議院が受領し、休会中を除き30日以内に参議院が議決しないときも、衆議院の議決が国会の議決になる。議決が異なったのに、協議会を開かず衆議院の議決を国会の議決にはできない。
- 内閣総理大臣の指名。両議院の議決が一致しないとき、参議院が求めなければならない（国会法86条2項）。開いても一致しないとき、または衆議院の指名の後、休会中を除き10日以内に参議院が指名の議決をしないとき、衆議院の議決が国会の議決になる（67条2項）。出席議員の3分の2の再議決はない。

図に書かない。憲法改正の原案。各院10人。成案は出席協議委員の3分の2。成案は修正できない。模試の肢番号。出版社名。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（法律案の行を指す。せりふで表を繰り返さない。指し棒は表に入れない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

場面役は置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。見本の密度: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 4 data rows. No side panels. No bottom cards. No answer bar. No subtitle.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. A cell may wrap. If a cell needs more than two lines, make that row taller. Do not shrink the type.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one test line for one guide.

Title, one short question: 両院の議決が異なったとき、協議会は義務？任意？
Header, navy: 何についての議決か | 両院協議会を開く義務 | その後の国会の議決
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray. Not by column.
Row 1: 法律案 | 両院の議決が異なったとき、任意。協議会を求めるか、求めずに再可決するか。両方は要らない。参議院の請求は、衆議院が拒める（59条3項、国会法84条） | 協議会を求めなくても、衆議院で出席議員の3分の2以上により再可決すると、法律になる。参議院が受領後、休会中を除き60日以内に議決しないときは、衆議院が否決とみなすことができる（59条2項、4項）
Row 2: 予算 | 両院の議決が異なったとき、義務。衆議院は、求めなければならない（国会法85条1項） | 協議会で一致しないとき、または参議院が受領し、休会中を除き30日以内に参議院が議決しないとき、衆議院の議決が国会の議決になる（60条2項）
Row 3: 条約 | 両院の議決が異なったとき、義務。衆議院先議は衆議院が、参議院先議は参議院が、求めなければならない（国会法85条） | 60条2項を準用する。参議院が受領し、休会中を除き30日以内に参議院が議決しないときも、衆議院の議決が国会の議決になる。両院の議決が異なったときは、協議会を開く（61条）
Row 4: 内閣総理大臣の指名 | 両議院の議決が一致しないとき、義務。参議院が、求めなければならない（国会法86条2項） | 協議会で一致しないとき、または衆議院の指名の後、休会中を除き10日以内に参議院が指名の議決をしないとき、衆議院の議決が国会の議決になる。3分の2の再議決はない（67条2項）
Column 2 must show the words 任意 and 義務. Do not replace them with a mark. Each cell keeps its sentences. Do not shorten a cell to a slogan. Do not shrink type. Do not drop 両院の議決が異なったとき. Do not drop 両議院の議決が一致しないとき. Do not drop 衆議院で. Do not drop 協議会を求めなくても. Do not drop 両方は要らない. Do not drop 参議院が受領. Do not drop 参議院が議決しない. Do not drop 休会中を除き. Do not drop 拒める. Do not drop 3分の2の再議決はない.
Under the table, one line only: 試験の×は、法律案を開催義務とし、条約を協議会なしの衆議院議決とすること。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the 法律案 row from outside the table. The pointer does not enter any cell and does not cross any glyph. No speech balloon. Do not cover the table or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] タイトルに、両院の議決が異なったとき、がある
- [ ] 法律案は、協議会を求めるか、求めずに衆議院で再可決するか。両方は要らない。参議院の請求は衆議院が拒める
- [ ] 再可決は、衆議院で出席議員の3分の2以上。60日は、参議院が受領し、参議院が議決しないとき。否決とみなすことができる。休会中を除く
- [ ] 予算の義務は、両院の議決が異なったとき。30日は、参議院が受領し、参議院が議決しないとき
- [ ] 条約の義務も、両院の議決が異なったとき。30日の主体は参議院。先議の議院が求めなければならない
- [ ] 首相指名の義務は、両議院の議決が一致しないとき。10日は参議院が指名の議決をしないとき。3分の2の再議決はない
- [ ] 試験の×は、法律案を開催義務とし、条約を協議会なしの衆議院議決とすること
- [ ] 指し棒が表の文字に掛かっていない
- [ ] 文字は縮んでいない。行は白と薄いグレーの交互
- [ ] ブランド印字なし。名簿外なし

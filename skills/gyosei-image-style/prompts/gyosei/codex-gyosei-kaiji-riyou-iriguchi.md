# Codex用 — 開示と利用、誰でも請求できる？

横長の表1枚。3行。見本の密度は `genkoku-nashi.png`。列は4つ。結論の○×列は置かない。試験の×は下に1行。ちゃちゃロットは下余白に1体。せりふは足さない。

- 状態: 未生成
- 保存先: `assets/images/deepdive/learn/gyosei/kaiji-riyou-iriguchi.png`
- 画像キー: `learn/gyosei/kaiji-riyou-iriguchi`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` を付けない。
- 上書きしない: `joho-kokai-seikyu.png` `joho-kokai-kaiji.png`

## 法律

e-Gov。行政機関の保有する情報の公開に関する法律（平成11年法律第42号）2条2項・3条・5条。公文書等の管理に関する法律（平成21年法律第66号）2条6項・7項・16条。個人情報の保護に関する法律（平成15年法律第57号）76条。確認日 2026-10-23。正本は `data/knowledge/canonical/joho-kokai-shiken-kiri.md`。

- 情報公開法3条。何人も、行政機関の長に対し、その行政機関が保有する行政文書の開示を請求できる。国籍、住所、利害関係は要らない。行政文書は、職員が職務上作成し又は取得し、組織的に用いるものとして行政機関が保有しているもの。特定歴史公文書等は除く（2条2項二号）。不開示情報はある（5条）。
- 公文書管理法16条。「何人も」とは書かない。国立公文書館等の長は、保存されている特定歴史公文書等について、目録の記載に従い利用の請求があったときは、利用を制限する場合を除き、利用させなければならない。請求者を本人や利害関係人に限る定めはない。特定歴史公文書等は、歴史資料として重要な公文書等のうち、国立公文書館等に移管されたもの等（2条6項・7項）。判断するのは国立公文書館等の長。
- 個人情報保護法76条。何人も、行政機関の長等に対し、自己を本人とする保有個人情報の開示を請求できる。他人の情報は対象ではない。

図に書かない。利用制限の各号の一覧。不開示情報の各号の一覧。76条2項の代理人。審査請求の相手方。知る権利の明文。手数料。地方公共団体の文書。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（公文書管理法の行を指す。せりふで表を繰り返さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

カチャドクロ、ぴっちゅ、タスク亀は置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。見本の密度: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 3 data rows. No side panels. No bottom cards. No answer bar. No subtitle.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. A cell may wrap to two lines.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one test line for one guide.

Title, one short question: 開示と利用、誰でも請求できる？
Header, navy: 法律 | 誰が請求できるか | 何を求めるか | 対象
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white. Not by column.
Row 1: 情報公開法3条 | 何人も | 行政機関の長へ、行政文書の開示を請求する。不開示情報はある | 行政機関が保有する現用の行政文書。特定歴史公文書等は除く
Row 2: 公文書管理法16条 | 本人や利害関係人に限らない | 国立公文書館等の長へ、目録に従い利用を請求する。利用を制限する場合はある | 国立公文書館等に移管され、保存されている特定歴史公文書等
Row 3: 個人情報保護法76条 | 何人も。他人の情報は対象外 | 行政機関の長等へ、保有個人情報の開示を請求する | 自己を本人とする保有個人情報
Keep four columns only. The second row's requester cell stays 本人や利害関係人に限らない.
Under the table, one line only: 試験で「公文書管理法には『何人も』という文言がないから、一般人は利用請求できない」と書いてあったら×。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the 公文書管理法16条 row. No speech balloon. Do not cover the table or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 3行。情報公開は開示、公文書管理は利用、個人情報は自己の情報
- [ ] 公文書管理の行に「何人も」と書いていない
- [ ] 判断する人は、行政機関の長、国立公文書館等の長、行政機関の長等
- [ ] 試験の×は、一般人は利用請求できない、の1行
- [ ] 文字は縮んでいない。行は白と薄いグレーの交互
- [ ] 案内役は下余白。せりふで表を繰り返さない
- [ ] ブランド印字なし。名簿外なし

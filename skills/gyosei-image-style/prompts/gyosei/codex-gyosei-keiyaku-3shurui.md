# Codex用 — 行政の契約は、何をする契約？

横長の表1枚。4行。見本の密度は `genkoku-nashi.png`。試験の×は下に1行。ちゃちゃロットは下余白に1体。せりふは足さない。

- 状態: 生成済み（2026-10-23 13:05）。具体例まで載った版。上書きしない。
- 保存先: `assets/images/deepdive/learn/gyosei/keiyaku-3shurui.png`
- 画像キー: `learn/gyosei/keiyaku-3shurui`
- 生成は Codex。Cursor は描かない。
- PNGのアプリ載せは、上書き後にてらしぃが載せるまでしない。
- 争い方の図 `keiyaku-arasoi.png` とは別枚。根拠の要否、民事訴訟、行訴法4条、最判昭62.5.19は、この枚に繰り返さない。

## 法律

e-Gov。地方自治法252条の14・234条、会計法29条の3、水道法6条2項。最判平21.7.10。確認日 2026-10-23。正本は `data/knowledge/canonical/gyosei-keiyaku-3shurui.md`。

- 行政主体どうし。普通地方公共団体は、協議により規約を定め、事務の一部を他の普通地方公共団体に委託できる（252条の14）。財産の売払いもある。
- 調達。行政が使う物の入手、公共工事、普通財産の売却。国は、原則として公告して競争に付す（会計法29条の3）。地方公共団体の指名競争入札、随意契約、せり売りは、政令で定める場合に限る（234条2項）。
- 給付。水道の給水、公営バスの運送。水道事業は、原則として市町村が経営する（水道法6条2項）。
- 規制。事業者が公害の防止を約する。町と産業廃棄物処分業者の使用期限の定めは、許可の期間内に事業や施設が廃止されても、廃棄物処理法の趣旨に反しない。その条項の法的効力は否定されない（最判平21.7.10）。すべての条項が常に拘束する、とまでは判示していない。

図に書かない。法律の根拠が要るかどうか。民事訴訟か当事者訴訟か。最判昭62.5.19。これらは別枚 `keiyaku-arasoi.png`。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（規制の行を指す。せりふで表を繰り返さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

カチャドクロ、ぴっちゅ、タスク亀は置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。見本の密度: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 4 data rows. No side panels. No bottom cards. No answer bar. No subtitle.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. A cell may wrap to two lines.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one test line for one guide.

Title, one short question: 行政の契約は、何をする契約？
Header, navy: 種類 | 何の契約か | 具体例
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray. Not by column.
Row 1: 行政主体どうし | 事務の委託。他の地方公共団体への財産の売払い | 協議で規約を定め、事務の一部を、他の普通地方公共団体の長に管理させ、執行させる（252条の14）
Row 2: 調達 | 物品の納入契約。公共工事の請負契約。普通財産の売買契約 | 基本は民法。国と地方が結ぶときは、一般競争入札が原則。随意契約は政令の場合に限る（234条2項、会計法29条の3）
Row 3: 給付 | 上水道の給水契約。公営バスの運送契約 | 水道の供給は、水道事業者である市町村と、給水を受ける者との契約。経営は、原則として市町村（水道法6条2項）
Row 4: 規制 | 地方公共団体が、公害の発生源となる事業者に、公害防止の措置を約させる | 処理施設の使用期限の定めは、許可の期間内に廃止されても、廃棄物処理法の趣旨に反しない（最判平21.7.10）
Each cell keeps both sentences. Do not shorten a cell to a slogan. A cell may wrap to two lines. Do not shrink type.
Under the table, one line only: 試験で「公害防止協定は、紳士協定にすぎない」と書いてあったら×。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the 規制 row. No speech balloon. Do not cover the table or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 調達は、納入・請負・売買と、民法が基本で一般競争入札が原則
- [ ] 給付は、市町村と給水を受ける者との給水契約。規制は、地方公共団体と事業者
- [ ] 公害防止は最判平21.7.10。紳士協定にすぎない、が試験の×
- [ ] 随意契約は政令の場合に限る、まで読める
- [ ] 文字は縮んでいない。行は白と薄いグレーの交互
- [ ] 案内役は下余白。せりふで表を繰り返さない
- [ ] ブランド印字なし。名簿外なし

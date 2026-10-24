# Codex用 — 行政契約の争いは、民事訴訟？

横長の表1枚。3行。見本の密度は `genkoku-nashi.png`。試験の×は下に1行。ちゃちゃロットは下余白に1体。せりふは足さない。三類型の具体例は、別枚 `keiyaku-3shurui.png` に書く。この枚で繰り返さない。

- 状態: 未生成
- 保存先: `assets/images/deepdive/learn/gyosei/keiyaku-arasoi.png`
- 画像キー: `learn/gyosei/keiyaku-arasoi`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` を付けない。
- 上書きしない。

## 法律

e-Gov。行政事件訴訟法4条。最判昭62.5.19。確認日 2026-10-23。正本は `data/knowledge/canonical/gyosei-keiyaku-3shurui.md`。

- 法律の根拠。行政契約は、当事者の合意で締結する。個別の法律の根拠は要らない。平等、比例、信義則は及ぶ。
- 訴訟。契約の違法や無効を争うのは、原則として民事訴訟である。その法律関係を公法上のものとみるときは、公法上の当事者訴訟である（4条の後半）。すべての行政契約が当事者訴訟になるわけではない。取消訴訟でもない。
- 随意契約。制限に違反して締結した契約も、その法令の趣旨を没却するような特段の事情がなければ、私法上当然には無効にならない（最判昭62.5.19）。違反すれば常に無効、ではない。

図に書かない。調達・給付・規制の具体例。252条の14。水道法6条2項。公害防止協定の最判平21.7.10。これらは別枚。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（随意契約の行を指す。せりふで表を繰り返さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

カチャドクロ、ぴっちゅ、タスク亀は置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。見本の密度: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 3 data rows. No side panels. No bottom cards. No answer bar. No subtitle.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. A cell may wrap to two lines.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one test line for one guide.

Title, one short question: 行政契約の争いは、民事訴訟？
Header, navy: 重要ワード | 内容
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white. Not by column.
Row 1: 法律の根拠 | 要らない。当事者の合意で締結する。平等・比例・信義則は及ぶ
Row 2: 訴訟 | 原則は民事訴訟。公法上の法律関係とみるときは、公法上の当事者訴訟（行訴法4条）
Row 3: 随意契約の制限違反 | 法令の趣旨を没却する特段の事情がなければ、私法上当然には無効にならない（最判昭62.5.19）
Under the table, one line only: 試験で「随意契約の制限に違反した契約は、私法上当然に無効だ」と書いてあったら×。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the 随意契約の制限違反 row. No speech balloon. Do not cover the table or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 3行。根拠は要らない。訴訟は原則民事。当事者訴訟は公法関係とみるとき
- [ ] 随意契約は、特段の事情がなければ当然無効ではない（最判昭62.5.19）
- [ ] 試験の×は、私法上当然に無効だ、の1行
- [ ] 調達・給付・規制の表をこの枚に繰り返していない
- [ ] 文字は縮んでいない。行は白と薄いグレーの交互
- [ ] 案内役は下余白。せりふで表を繰り返さない
- [ ] ブランド印字なし。名簿外なし

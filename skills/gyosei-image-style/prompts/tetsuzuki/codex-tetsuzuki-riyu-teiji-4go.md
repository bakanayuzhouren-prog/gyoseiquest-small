関連: LEC公開2・問43。青色申告は `assets/images/deepdive/learn/tetsuzuki/aoiro-riyu-4koma.png`、旅券は `ryoken-riyu-4koma.png`、一級建築士は `kenchikushi-riyu-4koma.png`。この3枚は上書きしない。この1枚は、理由付記の判例全体。

# Codex用 — 理由の提示は、どこまで必要か

見本は `assets/images/deepdive/learn/gyosho/genkoku-nashi.png`。左の列は、誰がどの処分で理由を示すか。右の列は、付記・提示の程度と、足りないときの処分の効果。模試の空欄記号は出さない。

- 保存先: `assets/images/deepdive/learn/tetsuzuki/riyu-teiji-4go.png`
- 画像キー: `learn/tetsuzuki/riyu-teiji-4go`
- 状態: 2026-10-24 に生成済み。てらしぃがこの画像のやり直しを言うまで上書きしない。
- 生成は Codex。Cursor は描かない。
- `[[image:]]` は付けない。この1枚だけ。
- 上書きしない: `aoiro-riyu-4koma.png`、`ryoken-riyu-4koma.png`、`kenchikushi-riyu-4koma.png`

## PRE-GENERATE-CHECK

正本は各4コマのプロンプトと `data/knowledge/canonical/tashi-hanrei-4koma-cores.md`。2026-10-24。

- 1行目と2行目は、最二小判昭和38年5月31日（民集17巻4号617頁）の一つの判決。付記の程度と、青色申告の資料の摘示を、別の日の判決に分けない。
- 付記の程度は、処分の性質と、理由の付記を命じた法律の趣旨・目的で決まる。
- 青色申告の更正は、帳簿書類の記載以上に信憑力のある資料を摘示しなければ、更正自体が取り消される。
- 一般旅券の発給拒否は、どの事実にどの法規を適用したかを、申請者が記載から分かるように示す。根拠規定だけでは、その記載から事実が当然分かるとき以外、足りない。その拒否は違法になる。最判昭和60年1月22日。外務大臣。
- 一級建築士の免許取消しは、国土交通大臣の処分。複雑な処分基準が公にされているとき、根拠規定と非違の概要だけでは、どの基準で取消しを選んだか分からない。聴聞を受けただけでは足りない。免許取消し自体が取り消される。最判平成23年6月7日。行政手続法14条1項。理由の提示。
- 下の試験の×は、4つの処分を同じ付記で足りる、とする誤り。旅券の一文だけを下に繰り返さない。
- 図に出さない。空欄の記号、語群の番号、模試の答え合わせ。申請拒否の8条。口語の動詞。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（下の試験の×を指す。せりふで表を繰り返さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない。指し棒は文字に掛けない |

場面役は置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。見本の密度と列の読み方: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch. Replace the previous sheet at the same path.
ONE job: one table of four holdings, exactly 4 data rows. No side panels. No bottom cards. No answer bar. No subtitle that repeats the table.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. A cell may wrap. If a cell needs more than two lines, make that row taller. Do not shrink the type.
Canvas: fully opaque warm off-white, landscape, same proportions as the sample table. Wide margins. Leave a bottom margin under the one test line for one guide.
Do not print answer-blank marks, slot numbers, or an answer key.
Use only the Japanese sentences below. 付記、提示、記載、摘示、示す。

Title, one short label: 理由の提示は、どこまで必要か

Table. Header row is a navy band, white type. Data rows alternate by whole row: row 1 white, row 2 light gray, row 3 white, row 4 light gray. Not column zebra.
Two columns, in this order: 誰が、どの処分で理由を示すか / 理由は、どこまで必要か
The left cell is the person and the disposition. The right cell is the required degree of the statement of reasons, and the effect on the disposition when it falls short. Each cell follows that order. Do not reduce the left cell to a doctrine label.

Row 1: 税務署長が、所得税の更正に理由を付記する / 付記の程度は、処分の性質と、理由の付記を命じた法律の趣旨・目的で決まる。処分が違えば、付記の程度も変わる（最二小判昭和38年5月31日）
Row 2: 税務署長が、青色申告の帳簿を否定して更正する / 帳簿以上の信憑力ある資料を摘示しなければ、更正自体が取り消される（同じ判決）
Row 3: 外務大臣が、一般旅券の発給を拒否する / どの事実に法規を適用したかを示さないと、拒否は違法になる。根拠規定だけは、その記載から事実が当然分かるとき以外、足りない（最判昭和60年1月22日）
Row 4: 国土交通大臣が、一級建築士の免許を取り消す / 複雑な処分基準が公にされているときは、どの基準で取消しを選んだかを示す。根拠と非違の概要だけでは足りず、聴聞を受けただけでも足りない。免許取消し自体が取り消される（最判平成23年6月7日。行政手続法14条1項）

One line under the table, only once:
試験で「どの処分でも、根拠規定を示せば理由として足りる」は×

Guide, bottom-right margin, one only. Green instructor suit, jacket, white shirt, green trousers, shoes. Independent light-blue smiling hat. Pointer stays in the margin and does not cover the table or the test line. No speech. No name tag.

Do not add people in the table. Do not add a hearing scene. Do not print a brand name, a logo, or a watermark.
```

# Codex用 — 取消判決と棄却判決、効力はどう違う？

横長の表1枚。4行。見本は `genkoku-nashi.png`。結論の列に「ない」は置かない。試験の×は下に1行。ちゃちゃロットは下余白に1体。せりふは足さない。

- 状態: 生成済み（2026-10-23）。アプリは見て聞いて覚える・行政事件訴訟法「処分取消判決には第三者効がある」
- 保存先: `assets/images/deepdive/learn/gyosho/hanketsu-4kouka.png`
- 画像キー: `learn/gyosho/hanketsu-4kouka`
- 生成は Codex。Cursor は描かない。
- 画像: `[[image:learn/gyosho/hanketsu-4kouka]]`。`src/appendGyoshoHyoLearn.js` と `src/deepdiveImages.ts`。
- 上書きしない: `genkoku-nashi.png` `horitsujo-rieki-junyo.png`
- 載せるカード: 見て聞いて覚える・行政事件訴訟法「処分取消判決には第三者効がある」。B列の短文は先に置く。

## 法律

e-Gov。行政事件訴訟法7条・32条・33条。民事訴訟法114条1項。確認日 2026-10-23。正本は `data/knowledge/canonical/gyosho-hanketsu-4kouka.md`。

- 形成力。確定した取消判決は、行政庁が自ら取り消すのを待たずに、処分の効力を失わせる。法律の見出し語ではない。棄却判決にはない。
- 第三者効。処分又は裁決を取り消す判決は、第三者に対しても効力を有する（32条1項）。既判力が第三者に及ぶ効力ではない。棄却判決にはない。
- 拘束力。取り消す判決は、その事件について、処分庁その他の関係行政庁を拘束する（33条1項）。同じ違法理由を繰り返せない。別の適法な理由があれば、申請拒否のあと再び拒否できる（33条2項）。手続の違法だけを理由に許可が取り消されても、適法な手続をやり直せば再び許可できる（33条3項）。このやり直しの中身は、図のセルに足すと4行が縮む。試験の×にはしない。棄却判決には拘束力はない。
- 既判力。行訴法7条により民事訴訟の例による。確定判決は、主文に包含するものに限り既判力を有する（民事訴訟法114条1項）。認容判決にも棄却判決にもある。理由中には、原則として及ばない。及ぶ相手は当事者等である。民事訴訟法115条は、当事者、当事者が他人のために原告又は被告となった場合のその他人、これらの者の口頭弁論終結後の承継人、これらの者のために請求の目的物を所持する者、と定める。一般の第三者ではない。第三者効（32条1項）は、既判力が一般の第三者に及ぶことではない。

図に書かない。無効等確認への38条の準用。国賠の違法性。行服法52条の裁決の拘束力。遡及。対世効という別名。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（既判力の行を指す。せりふで表を繰り返さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

カチャドクロ、ぴっちゅ、タスク亀は置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。見本の向きと余白: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 4 data rows. No side panels. No bottom cards. No answer bar. No subtitle.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. A cell may wrap to two lines.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one test line for one guide.

Title, one short question: 取消判決と棄却判決、効力はどう違う？
Header, navy: 効力 | 誰に、何が起きるか | 付く判決
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray. Not by column.
Row 1: 形成力 | 行政庁の取消しを待たず、処分の効力が失われる | 認容だけ
Row 2: 第三者効 | 取り消された処分の効力が、第三者との関係でも失われる（32条1項） | 認容だけ
Row 3: 拘束力 | 処分庁その他の関係行政庁は、同じ違法理由を繰り返せない（33条1項） | 認容だけ
Row 4: 既判力 | 当事者等は、主文と矛盾する主張ができない（7条、民訴114条1項、115条） | 認容も棄却
The third column is only 認容だけ or 認容も棄却. Do not write ない in that column.
Under the table, one line only: 試験で「取消判決の第三者効は、既判力が一般の第三者に及ぶことだ」と書いてあったら×。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the 既判力 row. No speech balloon. Do not cover the table or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] タイトルは「取消判決と棄却判決、効力はどう違う？」
- [ ] 4行。認容だけが3行。既判力だけ「認容も棄却」。既判力の行は「当事者等」
- [ ] 第三者効は32条1項。拘束力は33条1項。既判力は7条、民訴114条1項、115条
- [ ] 試験の×は「取消判決の第三者効は、既判力が一般の第三者に及ぶことだ」
- [ ] 結論列に「ない」がない。文字は縮んでいない
- [ ] 案内役は下余白。せりふで表を繰り返さない
- [ ] ブランド印字なし。名簿外なし

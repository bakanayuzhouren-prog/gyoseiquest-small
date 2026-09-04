# 株式の四変化 — 数・資本・枠・株主

- 保存先: assets/images/deepdive/learn/shouhou/kabushiki-4henka.png
- 画像キー: learn/shouhou/kabushiki-4henka
- 生成は Codex。Cursor は描かない。

列は制度／決定機関／資本金／発行済／発行可能／株主。元表の並びは使わない。

## 法律の芯（崩すな）

- 消却178条: 発行済は減少。資本金・発行可能は当然には変わらない。
- 併合180条: 株主総会の特別決議。発行済は減少。
- 分割183条: 発行済は増加。取締役会設置会社は取締役会、それ以外は株主総会。
- 無償割当て185条以下: 発行済は増加。原則として株主に持株割合に応じて割り当てる。
- 非種類株式発行会社の分割では184条2項の範囲で発行可能株式総数を増加できる。

**書かない:** 伊藤塾。あぷし。消却で資本金が当然減少。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 数は動く、資本は動かないことが多い |
| 中央 | 6列表（行ゼブラ） |
| 判断軸 | 発行済の増減と、資本・枠が当然に動くか |
| ひっかけ | 消却で資本減少。分割は常に特別決議 |
| 暗記 | 消却・併合は発行済減。分割・無償は増。資本は当然には動かない |
| 役割 | 会社（自己株式を消す）／株主（割合を見る） |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
Topic: 会社法の株式の消却・併合・分割・無償割当て.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of the approved「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Title:「数は動く、資本は動かないことが多い」
Chip:「178・180・183・185条」

Left heading 論点:
消却で発行済は？ → 減少
資本金は当然減るか？ → NO
分割の決定は？ → 取締役会設置なら取締役会
無償割当ての株主は？ → 持株割合に応じて

Right heading ひっかけ:
消却で資本金が当然に減る
発行可能株式総数も当然に減る
分割は常に特別決議
無償割当ては第三者に自由に配る

Center ONLY: one table. Header navy. Row zebra: white / light gray. NOT column colors.
Columns: 制度 | 決定機関 | 資本金 | 発行済 | 発行可能 | 株主
Keep cell text SHORT.
Rows:
消却 | 取締役会（設置会社） | 当然には不変 | 減少 | 当然には不変 | 自己株が消える
併合 | 株主総会特別決議 | 当然には不変 | 減少 | 当然には不変 | 株数減・端数あり得る
分割 | 取締役会設置は取締役会、他は株主総会 | 当然には不変 | 増加 | 原則不変。非種類は184条2項で増加可 | 割合は維持
無償割当て | 原則総会又は取締役会 | 当然には増やさない | 増加 | 枠の余裕が要る | 持株割合に応じて

Roles: 会社（自己株式を消す）／株主（割合を見る）. Never だれが.

Bottom:
- 判断軸:「発行済の増減と、資本・枠が当然に動くか」
- ひっかけ:「消却で資本減少。分割は常に特別決議」
- 暗記:「消却・併合は発行済減。分割・無償は増。資本は当然には動かない」
Answer:「自己株式の消却により発行済株式総数は減少するが、資本金の額と発行可能株式総数は当然には変わらない。」

Guide: ちゃちゃロット SMALL bottom-right, 指し棒 to 暗記. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat, not ears. No nameplate. No brand letters.
No overlapping text. Large gothic Japanese.
```

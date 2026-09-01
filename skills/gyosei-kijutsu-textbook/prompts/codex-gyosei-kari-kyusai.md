# 行訴・仮の救済（執行停止／仮の義務付け／仮の差止め）

- 保存先: assets/images/deepdive/textbook/gyosei-kijutsu/kari-kyusai.png
- **新規。** `junyo-taiko.png` / `hikoku-taiko.png` / `q16.png` は上書きしない。
- **生成は Codex。Cursor は描かない。**
- 38条の準用総表は `codex-gyosei-junyo-taiko.md`。

## PRE-GENERATE-CHECK（Cursor確認済み・e-Gov）

取消訴訟の仮の救済は**執行停止**（25条）。
38条3項: 25条から29条まで及び32条2項は**無効等確認の訴え**に準用（執行停止が使える）。
不作為の違法確認・義務付け・差止めには25条は準用されない。
37条の5第1項: 義務付けの訴え → **仮の義務付け**（償うことのできない損害を避けるため緊急の必要、本案について理由があるとみえるとき）。
37条の5第2項: 差止めの訴え → **仮の差止め**（同じ要件）。
37条の5第3項: 公共の福祉に重大な影響を及ぼすおそれがあるときはできない。
37条の5第4項: 仮の義務付け又は仮の差止めに、**25条5項から8項まで、26条から28条まで及び33条1項**を準用。29条・32条2項は準用リストにない。

市販教材の空欄パターンは使わない。28条は37条の5第4項で準用される。
法律用語だけ。口語禁止。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし. TWO TABLES. Save only as kari-kyusai.png. Do NOT overwrite junyo-taiko.png, hikoku-taiko.png, or q16.png.
Quality: q26-2.png and hikoku-taiko.png. 16:9 warm off-white, POP, large gothic Japanese, ZERO overlap.

LAYOUT (do NOT use 論点 / ひっかけ / 判断軸 / 暗記 boxes or those labels anywhere):
- Navy title bar
- Orange chip under title
- TABLE A upper hero
- TABLE B lower hero, same width, clear gap
- Navy answer bar at the very bottom
- No left sidebar. No right sidebar. No three bottom cards.
- TABLE ROW BACKGROUNDS (required, both tables): data rows alternate HORIZONTALLY. Row 1 WHITE, row 2 LIGHT GRAY, row 3 WHITE, row 4 LIGHT GRAY. Same fill across the whole row. Header row stays navy. Do not zebra by column.

Title:「仮の救済は、本案の訴訟類型で制度が分かれる」
Chip:「義務付け・差止めに執行停止は準用されない」

TABLE A heading EXACT:「本案と仮の救済」
TABLE A columns EXACT: 本案 | 仮の救済 | 根拠
Rows EXACT:
取消訴訟 | 執行停止 | 25条
無効等確認の訴え | 執行停止（準用） | 38条3項
不作為の違法確認の訴え | 執行停止は使えない | 38条に25条の準用なし
義務付けの訴え | 仮の義務付け | 37条の5第1項
差止めの訴え | 仮の差止め | 37条の5第2項

TABLE B heading EXACT:「仮の義務付け・仮の差止めに準用される規定（37条の5第4項）」
TABLE B columns EXACT: 規定 | 準用
Rows EXACT:
25条1項から4項まで | 準用されない（本案の執行停止要件ではない）
25条5項から8項まで | 準用される
26条（執行停止の取消し） | 準用される
27条（内閣総理大臣の異議） | 準用される
28条（執行停止等の管轄裁判所） | 準用される
29条・32条2項 | 準用されない
33条1項（拘束力） | 準用される

Answer bar EXACT:
「取消訴訟と無効等確認の仮の救済は執行停止である。義務付けは仮の義務付け、差止めは仮の差止めであり、執行停止は準用されない。」

Guide: ONE ちゃちゃロット only. approved-chachalot-pointer.png: cream face, circle eyes, pale-sky-blue HAT (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl, NOT bear, NOT tanuki, NOT cat. Bottom-right cream margin ABOVE navy bar. No name tag. Pointer off letters.
```

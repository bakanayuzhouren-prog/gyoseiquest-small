# 行訴・被告＋出訴期間（機関訴訟・民衆訴訟・当事者訴訟）

- 保存先: assets/images/deepdive/textbook/gyosei-kijutsu/hikoku-taiko-2.png
- **既存の hikoku-taiko-2.png を上書き。** `hikoku-taiko.png` / `q10.png` は上書きしない。
- **生成は Codex。Cursor は描かない。**
- 1枚目の大臣・知事・市長表は再掲しない。

## PRE-GENERATE-CHECK（Cursor確認済み・e-Gov）

43条1項: 民衆訴訟又は機関訴訟で取消しを求めるもの → 9条及び10条1項を除き**取消訴訟を準用**（11条・**14条も準用**）。
43条2項: 無効の確認を求めるもの → 36条を除き**無効等確認を準用**（14条は無効等確認に準用されていない → **期間の定めなし**が原則）。
43条3項: 前二項以外 → 39条及び**40条1項を除き**当事者訴訟を準用。行訴14条は乗らない。特別法の期間。

42条: 法律に定める場合に限り提起。特別法の被告・期間が優先。
例（断定しすぎない）: 選挙の効力に関する訴訟は公選法（選挙の日から30日が典型）。住民訴訟は監査結果の通知等から30日。自治法176条は裁定の日から60日。

41条: 当事者訴訟に**11条は準用されない**。
40条1項: 法令に出訴期間の定めがある当事者訴訟は、別段の定めがなければ、正当な理由があるときは期間経過後も提起できる。法令に定めがない実質的当事者訴訟は行訴14条の期間制限なし。

てらしぃ指示: 「論点」「ひっかけ」「判断軸」「暗記」の箱は置かない。出訴期間を表で出す。
法律用語だけ。口語禁止。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし. TWO TABLES. Save only as hikoku-taiko-2.png. Do NOT overwrite hikoku-taiko.png or q10.png.
Quality: q26-2.png and hikoku-taiko.png. 16:9 warm off-white, POP, large gothic Japanese, ZERO overlap.

LAYOUT (do NOT use 論点 / ひっかけ / 判断軸 / 暗記 boxes or those labels anywhere):
- Navy title bar
- Orange chip under title
- TABLE A (defendant / 準用) is the upper hero
- TABLE B (filing period) is the lower hero, same width, clear gap
- Navy answer bar at the very bottom
- No left sidebar. No right sidebar. No three bottom cards.
- TABLE ROW BACKGROUNDS (required, both tables): data rows alternate HORIZONTALLY. Row 1 WHITE, row 2 LIGHT GRAY, row 3 WHITE, row 4 LIGHT GRAY. Same fill across the whole row. Header row stays navy. Do not zebra by column. Do not paint all data rows the same color.

Title:「機関・民衆は求めるものによって準用先が分かれる」
Chip:「当事者訴訟に11条は準用されない。出訴期間も求めるもので変わる」

TABLE A columns EXACT: 訴訟類型 | 準用 | 被告
Rows EXACT:
機関訴訟で取消しを求める | 取消訴訟（43条1項） | 11条どおり国又は公共団体（特別法があればそれ）
機関訴訟で無効確認を求める | 無効等確認の訴え（43条2項） | 取消訴訟と同じ（11条準用）
機関訴訟で上記以外 | 当事者訴訟（43条3項） | 特別法の定め（例: 国の関与は国の行政庁）
民衆訴訟で取消しを求める | 取消訴訟（43条1項） | 11条どおり。ただし選挙訴訟は公選法（選管等）
民衆訴訟で無効確認を求める | 無効等確認の訴え（43条2項） | 取消訴訟と同じ（11条準用）。特別法があればそれ
民衆訴訟で上記以外 | 当事者訴訟（43条3項） | 特別法の定め
当事者訴訟（実質的） | 11条は準用されない（41条） | 公法上の法律関係の相手方（国又は公共団体）
当事者訴訟（形式的） | 11条は準用されない | 法令が定める当事者の一方

TABLE B heading EXACT:「出訴期間」
TABLE B columns EXACT: 訴訟類型 | 出訴期間
Rows EXACT:
機関・民衆で取消しを求める | 14条準用。知った日から六箇月。処分又は裁決の日から一年。正当な理由。特別法があればそれ
機関・民衆で無効確認を求める | 14条は準用されない。出訴期間の定めなし。特別法があればそれ
機関・民衆で上記以外 | 行訴14条は適用されない。特別法の期間
当事者訴訟 | 行訴14条は準用されない。法令に定めがあればその期間（40条）

Small note under TABLE B (one line, legal Japanese only):
例: 選挙の効力に関する訴訟は公選法（選挙の日から30日が典型）。住民訴訟は監査結果の通知等から30日。自治法176条は裁定の日から60日。

Answer bar EXACT:
「機関訴訟・民衆訴訟で取消しを求めるときは取消訴訟を準用し、出訴期間は14条である。特別法があればそれによる。当事者訴訟に11条は準用されない。」

Guide: ONE ちゃちゃロット only. approved-chachalot-pointer.png: cream face, circle eyes, pale-sky-blue HAT (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl, NOT bear, NOT tanuki, NOT cat. Bottom-right cream margin ABOVE navy bar. No name tag. Pointer off letters.
```

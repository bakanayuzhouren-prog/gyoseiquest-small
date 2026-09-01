# 住民訴訟1号（差止め）

- 保存先: assets/images/deepdive/textbook/gyosei-kijutsu/jumin-1.png
- **新規。** 既存PNGは上書きしない。
- **生成は Codex。Cursor は描かない。**
- 2号〜4号は別枚。この1枚に4号を詰め込まない。

## PRE-GENERATE-CHECK（Cursor確認済み・e-Gov）

地方自治法242条の2第1項1号: 当該執行機関又は職員に対する当該行為の全部又は一部の**差止め**の請求。
被告: 条文どおり**当該執行機関又は職員**（権限を有する長・委員会等）。普通地方公共団体そのものではない。
対象: 住民監査請求（242条）を経た、財務会計上の違法な行為。政策そのものではない。
6項: 差し止めることによって人の生命又は身体に対する重大な危害の発生の防止その他公共の福祉を著しく阻害するおそれがあるときは、差止めをすることができない。
11項: 行訴43条の適用あり。1号は取消しを求めるものではない。
原告: 当該普通地方公共団体の住民。自己の法律上の利益を要しない（民衆訴訟）。
出訴期間: 監査結果等の通知から原則30日（2項。不変期間）。
法律用語だけ。口語禁止。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし. TWO TABLES. Save only as jumin-1.png. Do NOT overwrite jumin-2.png or hikoku-taiko.png.
Quality: q26-2.png and hikoku-taiko.png. 16:9 warm off-white, POP, large gothic Japanese, ZERO overlap.

LAYOUT (do NOT use 論点 / ひっかけ / 判断軸 / 暗記 boxes or those labels anywhere):
- Navy title bar
- Orange chip under title
- TABLE A upper hero
- TABLE B lower hero, same width, clear gap
- Navy answer bar at the very bottom
- No left sidebar. No right sidebar. No three bottom cards.
- TABLE ROW BACKGROUNDS (required, both tables): data rows alternate HORIZONTALLY. Row 1 WHITE, row 2 LIGHT GRAY, row 3 WHITE. Same fill across the whole row. Header row stays navy. Do not zebra by column.

Title:「住民訴訟1号は、執行機関又は職員への差止めである」
Chip:「まだ行われていない財務会計上の行為を止める」

TABLE A heading EXACT:「1号の中身」
TABLE A columns EXACT: 項目 | 内容
Rows EXACT:
請求（242条の2第1項1号） | 当該行為の全部又は一部の差止め
被告 | 当該執行機関又は職員（権限を有する長・委員会等）
原告 | 当該普通地方公共団体の住民（自己の法律上の利益は不要）
対象 | 監査請求を経た財務会計上の違法な行為。政策そのものではない
性質 | 民衆訴訟。行訴43条の適用がある（11項）

TABLE B heading EXACT:「できないこと・期間」
TABLE B columns EXACT: 項目 | 帰結
Rows EXACT:
公共の福祉（6項） | 生命又は身体に対する重大な危害の防止その他公共の福祉を著しく阻害するおそれがあるときは、差止めをすることができない
仮処分（10項） | 違法な行為又は怠る事実については民事保全法の仮処分をすることができない
出訴期間（2項） | 監査の結果若しくは勧告の通知があった日などから30日以内。不変期間
被告の取り違え | 普通地方公共団体そのものを1号の被告にしない。2号と混同しない

Answer bar EXACT:
「1号は、当該執行機関又は職員を被告として、財務会計上の行為の差止めを求める。公共の福祉を著しく阻害するおそれがあるときは差止めできない。」

Guide: ONE ちゃちゃロット only. approved-chachalot-pointer.png: cream face, circle eyes, pale-sky-blue HAT (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl, NOT bear, NOT tanuki, NOT cat. Bottom-right cream margin ABOVE navy bar. No name tag. Pointer off letters.
```

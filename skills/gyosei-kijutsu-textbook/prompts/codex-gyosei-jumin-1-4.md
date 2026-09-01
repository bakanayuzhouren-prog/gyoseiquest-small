# 住民訴訟1号〜4号（1枚）

- 保存先: assets/images/deepdive/textbook/gyosei-kijutsu/jumin-1-4.png
- **新規。** `jumin-1.png`〜`jumin-4.png` はまだ無い想定。既存 hikoku / junyo は上書きしない。
- **生成は Codex。Cursor は描かない。**
- 1号〜4号を別枚にしない。この1枚で請求と被告を聞き分ける。6項・7項・ただし書の全文は載せない。

## PRE-GENERATE-CHECK（Cursor確認済み・e-Gov）

242条の2第1項:
1号 当該執行機関又は職員に対する当該行為の全部又は一部の差止め。
2号 行政処分たる当該行為の取消し又は無効確認。被告は43条→11条で**普通地方公共団体**。
3号 当該執行機関又は職員に対する当該怠る事実の違法確認。
4号 職員又は相手方に損害賠償又は不当利得返還の請求をすることを、執行機関又は職員に対して求める。職員個人を直接の被告にしない。

共通（答え帯・注記のみ）: 当該普通地方公共団体の住民。監査請求前置。出訴は原則30日（不変期間）。民衆訴訟。
法律用語だけ。口語禁止。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし. ONE MAIN TABLE plus a short note table. Save only as jumin-1-4.png. Do NOT overwrite hikoku-taiko.png or junyo-taiko.png.
Quality: q26-2.png and hikoku-taiko.png. 16:9 warm off-white, POP, large gothic Japanese, ZERO overlap.

LAYOUT (do NOT use 論点 / ひっかけ / 判断軸 / 暗記 boxes or those labels anywhere):
- Navy title bar
- Orange chip under title
- TABLE A is the hero (four data rows only)
- TABLE B is a short 3-row common note
- Navy answer bar at the very bottom
- No left sidebar. No right sidebar. No three bottom cards.
- TABLE ROW BACKGROUNDS (required, both tables): data rows alternate HORIZONTALLY. Row 1 WHITE, row 2 LIGHT GRAY, row 3 WHITE, row 4 LIGHT GRAY. Same fill across the whole row. Header row stays navy. Do not zebra by column.

Title:「住民訴訟は、号ごとに請求と被告が分かれる」
Chip:「2号だけ団体が被告。4号は職員個人を被告にしない」

TABLE A heading EXACT:「1号から4号」
TABLE A columns EXACT: 号 | 請求 | 被告
Rows EXACT:
1号 | 当該行為の全部又は一部の差止め | 当該執行機関又は職員
2号 | 行政処分たる当該行為の取消し又は無効確認 | 当該普通地方公共団体（43条・11条）
3号 | 当該怠る事実の違法確認 | 当該執行機関又は職員
4号 | 職員又は相手方への損害賠償若しくは不当利得返還の請求をすることを求める | 当該執行機関又は職員（長が原則）

TABLE B heading EXACT:「共通」
TABLE B columns EXACT: 項目 | 内容
Rows EXACT:
原告 | 当該普通地方公共団体の住民。自己の法律上の利益は不要（民衆訴訟）
前置・期間 | 住民監査請求を経る。出訴は監査結果等の通知などから30日以内（不変期間）
4号の向き | 団体に請求させる。職員個人や相手方をこの訴訟の被告にしない

Answer bar EXACT:
「1号は差止め、2号は処分の取消し又は無効確認、3号は怠る事実の違法確認、4号は団体に賠償請求をさせる。2号の被告だけが普通地方公共団体である。」

Guide: ONE ちゃちゃロット only. approved-chachalot-pointer.png: cream face, circle eyes, pale-sky-blue HAT (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl, NOT bear, NOT tanuki, NOT cat. Bottom-right cream margin ABOVE navy bar. No name tag. Pointer off letters.
```

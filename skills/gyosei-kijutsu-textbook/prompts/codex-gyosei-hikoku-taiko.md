# 行訴・被告＋出訴期間（取消訴訟＋準用の抗告訴訟）

- 保存先: assets/images/deepdive/textbook/gyosei-kijutsu/hikoku-taiko.png
- **既存の hikoku-taiko.png を上書き。** `q10.png` は上書きしない。
- **生成は Codex。Cursor は描かない。**
- 2枚目は `codex-gyosei-hikoku-taiko-2.md`。機関・民衆・当事者は詰め込まない。

## PRE-GENERATE-CHECK（Cursor確認済み・e-Gov）

11条1項: 処分庁が国又は公共団体に所属するとき、取消訴訟の被告は**所属する国又は公共団体**（大臣→国、知事→都道府県、市長→市町村）。庁の個人ではない。
11条2項: 所属しない行政庁 → **当該行政庁**（弁護士会・土地区画整理組合）。
38条1項: 11条は取消訴訟以外の抗告訴訟に準用。**14条は準用リストにない。**

14条1項: 処分又は裁決があったことを**知った日から六箇月**（正当な理由があるときはこの限りでない）。
14条2項: 処分又は裁決の日から**一年**（正当な理由があるときはこの限りでない）。
無効等確認・不作為の違法確認: **出訴期間の定めなし**（14条非準用）。

てらしぃ指示: 「論点」「ひっかけ」「判断軸」「暗記」の箱は置かない。出訴期間を表で出す。
法律用語だけ。口語禁止。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし. TWO TABLES. Save only as hikoku-taiko.png. Do NOT overwrite q10.png.
Quality: q26-2.png. 16:9 warm off-white, POP, large gothic Japanese, ZERO overlap.

LAYOUT (do NOT use 論点 / ひっかけ / 判断軸 / 暗記 boxes or those labels anywhere):
- Navy title bar
- Orange chip under title
- TABLE A (defendant) is the upper hero
- TABLE B (filing period) is the lower hero, same width, clear gap
- Navy answer bar at the very bottom
- No left sidebar. No right sidebar. No three bottom cards.
- TABLE ROW BACKGROUNDS (required, both tables): data rows alternate HORIZONTALLY. Row 1 WHITE, row 2 LIGHT GRAY, row 3 WHITE, row 4 LIGHT GRAY. Same fill across the whole row. Header row stays navy. Do not zebra by column. Do not paint all data rows the same color.

Title:「取消訴訟の被告は所属する国又は公共団体」
Chip:「出訴期間は14条。無効確認と不作為には14条は準用されない」

TABLE A columns EXACT: 訴訟類型 | 処分庁の例 | 被告
Rows EXACT:
取消訴訟（11条1項） | 大臣 | 国
取消訴訟（11条1項） | 知事 | 都道府県
取消訴訟（11条1項） | 市長 | 市町村
取消訴訟（11条2項） | 弁護士会・土地区画整理組合 | 当該行政庁
無効等確認の訴え（準用） | 取消訴訟と同じ | 取消訴訟と同じ（38条1項・11条準用）
不作為の違法確認の訴え（準用） | 応答すべき行政庁 | 取消訴訟と同じ（38条1項・11条準用）

TABLE B heading EXACT:「出訴期間」
TABLE B columns EXACT: 訴訟類型 | 出訴期間
Rows EXACT:
取消訴訟 | 処分又は裁決があったことを知った日から六箇月。処分又は裁決の日から一年。正当な理由があるときはこの限りでない（14条）
無効等確認の訴え | 14条は準用されない。出訴期間の定めなし
不作為の違法確認の訴え | 14条は準用されない。出訴期間の定めなし

Answer bar EXACT:
「取消訴訟の被告は、処分庁の所属する国又は公共団体である。出訴期間は、知った日から六箇月又は処分若しくは裁決の日から一年である。無効確認と不作為の違法確認に14条は準用されない。」

Guide: ONE ちゃちゃロット only. approved-chachalot-pointer.png: cream face, circle eyes, pale-sky-blue HAT (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl, NOT bear, NOT tanuki, NOT cat. Bottom-right cream margin ABOVE navy bar. No name tag. Pointer off letters.
```

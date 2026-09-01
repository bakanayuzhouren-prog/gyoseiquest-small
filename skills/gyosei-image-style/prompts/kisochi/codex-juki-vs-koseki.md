# 住基法・戸籍との取り違え

- 保存先: assets/images/deepdive/learn/juki/vs-koseki.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 住民基本台帳法6条1項・2項、戸籍法6条

配置（生成後・Cursor）: 見て聞いて覚える・住民基本台帳法の比較カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 住基: 個人を単位とする住民票を世帯ごとに編成して台帳を作成（6条1項）。適当と認めるときは世帯を単位とすることができる（6条2項）。原則は個人単位。
- 戸籍: 一の夫婦及びこれと氏を同じくする子ごと（戸籍法6条）。
- 住基は住所の公証。戸籍は身分関係の公証。本籍と住所を混ぜない。
- 禁止: 切る。住民票は常に世帯1枚が原則、と書かない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 住民基本台帳 vs 戸籍.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「住基は住所。戸籍は身分。単位を混ぜない」
Chip:「住基6条／戸籍6条」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
住民票の原則は？ → 個人単位
台帳の編成は？ → 世帯ごと
戸籍の単位は？ → 夫婦と同氏の子
世帯1枚が原則？ → NO

Right panel heading ひっかけ:
住民票は世帯単位で1枚が原則
戸籍も一人一戸籍が原則
本籍＝住所
住基ネットと戸籍の編製を混ぜる

MAIN: one clean table. Columns: 対比 | 住民基本台帳 | 戸籍
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
何を公証するか | 住所・住民であること | 身分関係
票の単位 | 原則は個人（6条1項） | 夫婦と同氏の子（戸籍6条）
例外 | 適当なら世帯単位にできる（6条2項） | 一人一戸籍が原則ではない
見る数字 | 転入転居14日 | 出生14日・死亡は知った日から7日

Small center metaphor: two stamp books labeled 住所 and 身分. Do not cover the table.

Bottom three cards:
判断軸: 先に住所の話か身分の話かを見る
ひっかけ: 単位と14日を横流しする
暗記: 票は個人、台帳は世帯編成。戸籍は夫婦と同氏の子

Answer bar EXACT:
「住民票は原則個人単位。戸籍は夫婦と同氏の子。住所と身分を混ぜない。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 6条1項が原則個人、2項が世帯単位にできる
- [ ] 戸籍6条が夫婦と同氏の子
- [ ] 行ゼブラ

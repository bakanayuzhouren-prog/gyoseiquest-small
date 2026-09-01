# 国家賠償法の被告

- 保存先: assets/images/deepdive/textbook/gyosei-kijutsu/kokubai-hikoku.png
- **新規。** 既存の hikoku-taiko / junyo-taiko / q*.png は上書きしない。
- **生成は Codex。Cursor は描かない。**

## PRE-GENERATE-CHECK（Cursor確認済み・e-Gov／判例）

国賠1条1項: 公権力の行使に当たる公務員が職務を行うについて故意又は過失により違法に他人に損害を加えたとき、**国又は公共団体**が賠償する。
国賠1条2項: 公務員に故意又は重大な過失があるとき、国又は公共団体は当該公務員に**求償**できる（被害者への直接責任ではない）。
国賠2条1項: 公の営造物の設置又は管理の瑕疵 → **国又は公共団体**。
国賠3条1項: 選任監督者等と費用負担者とが異なるとき、**費用を負担する者も**賠償の責めを負う。
判例の芯: 被害者は公務員個人に民法709条で追及できない。行政庁（知事個人等）を国賠の被告にすると不適法。指定確認検査機関の建築確認について、取消訴訟は行訴11条2項で当該行政庁、国賠は事務が帰属する都道府県又は指定都市（最判平17.6.24の試験芯）。確認できない細部は断定しない。
法律用語だけ。口語禁止。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし. TWO TABLES. Save only as kokubai-hikoku.png. Do NOT overwrite hikoku-taiko.png or junyo-taiko.png.
Quality: q26-2.png and hikoku-taiko.png. 16:9 warm off-white, POP, large gothic Japanese, ZERO overlap.

LAYOUT (do NOT use 論点 / ひっかけ / 判断軸 / 暗記 boxes or those labels anywhere):
- Navy title bar
- Orange chip under title
- TABLE A upper hero
- TABLE B lower hero, same width, clear gap
- Navy answer bar at the very bottom
- No left sidebar. No right sidebar. No three bottom cards.
- TABLE ROW BACKGROUNDS (required, both tables): data rows alternate HORIZONTALLY. Row 1 WHITE, row 2 LIGHT GRAY, row 3 WHITE. Same fill across the whole row. Header row stays navy. Do not zebra by column.

Title:「国家賠償の被告は、国又は公共団体である」
Chip:「公務員個人にも行政庁個人にも、被害者は向けない」

TABLE A heading EXACT:「誰が被告か」
TABLE A columns EXACT: 場面 | 被告 | 向けてはならない相手
Rows EXACT:
1条（公権力の行使） | 国又は公共団体 | 公務員個人。知事・市長などの行政庁個人
2条（公の営造物） | 国又は公共団体 | 現場の職員個人
3条（費用負担者が異なるとき） | 費用を負担する者も賠償の責めを負う（3条1項） | 費用負担者を無視して監督者だけに限る考え方
指定確認検査機関の建築確認（国賠） | 事務が帰属する都道府県又は指定都市 | 指定確認検査機関を国賠の被告にする（取消訴訟の11条2項と取り違えない）

TABLE B heading EXACT:「求償と訴えの帰結」
TABLE B columns EXACT: 項目 | 帰結
Rows EXACT:
求償（1条2項） | 公務員に故意又は重大な過失があるとき、国又は公共団体が当該公務員に求償できる
求償（2条2項） | 他に損害の原因について責めに任ずべき者があるとき、国又は公共団体が求償できる
行政庁を国賠の被告にしたとき | 被告適格を欠き、訴えは却下される
公務員個人に民法709条で請求したとき | 国家賠償法の仕組みにより理由がなく、請求は棄却される

Answer bar EXACT:
「国家賠償の被告は国又は公共団体である。公務員個人への民法上の請求は認められない。求償は国又は公共団体から公務員へ向かう。」

Guide: ONE ちゃちゃロット only. approved-chachalot-pointer.png: cream face, circle eyes, pale-sky-blue HAT (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl, NOT bear, NOT tanuki, NOT cat. Bottom-right cream margin ABOVE navy bar. No name tag. Pointer off letters.
```

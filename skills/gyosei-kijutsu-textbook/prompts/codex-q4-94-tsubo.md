# 記述解説図・民法記述Q4（94条・177条・通謀虚偽表示）— X最低ライン（q26-2基準）

- 保存先: assets/images/deepdive/textbook/minpou-kijutsu/q4.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png` および `q1-1.png`
- **既存の q4.png があれば上書きする。** `codex-batch-q2-q11.md` は開かない・使わない。
- **生成は Codex。Cursor は描かない。**
- **q2.png / q3.png / q1.png は上書きしない**

## PRE-GENERATE-CHECK（Cursor確認済み・e-Gov）

民法94条1項: 相手方と通じてした虚偽の意思表示は、無効とする。
94条2項: 前項の規定による意思表示の無効は、善意の第三者に対抗することができない。
177条: 不動産に関する物権の得喪及び変更は、登記をしなければ、第三者に対抗することができない。

本問の一点: CがDに勝つとき。当事者間の無効だけで終わらない。善意同士の後続争いは登記（177条）。

答案の芯（変更しない）:
`虚偽表示につき善意であり、Dより先に対抗要件としての登記を備えたときである。`（38字）

物置・地役権は図のひっかけ側だけ。答え帯に書かない。

禁止: 「切る」。GO混在。「だれが」。タイトルを「無効だから負ける」にしない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし 民法記述 Q4 (Civil Code 94 and 177). OVERWRITE q4.png only. Do NOT touch q2.png or q3.png. Do NOT use codex-batch files.
Quality bar: same density as q26-2.png and q1-1.png.
16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs. Explanation text is the priority.

Match LAYOUT of「主宰者の許可」: navy title, left green「論点」, right orange「ひっかけ」, ONE center metaphor, bottom 判断軸 / ひっかけ / 暗記, navy answer bar.

STRICT:
- Left「論点」Q&A only. NO GO/STOP. Do not mix GO and YES.
- Right「ひっかけ」. Never「（聞かない）」.
- Never write「だれが」. Never write 切る／切れない／釣られる.
- C wins when TWO things: 虚偽表示につき善意 AND 登記がDより先. Do not write「善意だけで足りる」.

Title (stylish one point):「善意同士なら、先に登記を備えたほうが勝つ」
Chip:「先登記＝戦闘機。早いほうが勝つ」

Left 論点:
1. 通謀虚偽表示の当事者間は？ → 無効（94条1項）
2. 善意の第三者には？ → 無効を対抗できない（94条2項）
3. CがDに勝つのは？ → 虚偽表示につき善意で、Dより先に登記（177条）

Center: 登記レース. C side has ONE small 戦闘機 badge labeled「先登記＝戦闘機」. Not a war scene. Labels:
「C（先に登記したい）」
「D（まだ未登記）」
Object:「甲土地」

Right ひっかけ:
- 無効だからCは負ける、で終わる
- 物置
- 地役権
- 善意だけで足りる（登記を落とす）

Bottom:
- 判断軸:「虚偽表示につき善意か。かつ、Dより先に対抗要件（登記）か」
- ひっかけ:「当事者間の無効や物置・地役権で終わらせない」
- 暗記:「善意＋先登記。登記は戦闘機。早いほうが勝つ」
Answer EXACT:
「虚偽表示につき善意であり、Dより先に対抗要件としての登記を備えたときである。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, circle eyes, pale-sky-blue HAT (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE navy bar. No name tag on the answer bar. Pointer must not cover letters.
```

# 記述解説図・民法記述Q4 2枚目（取消し後の登記＝戦闘機）

- 保存先: assets/images/deepdive/textbook/minpou-kijutsu/q4-2.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- **q4.png（1枚目）と q2.png / q3.png は上書きしない**
- 1枚目正本: `codex-q4-94-tsubo.md`（本問は94条・CとD）

## PRE-GENERATE-CHECK（Cursor確認済み）

正本: `data/knowledge/canonical/minpou-sagi-torikeshi-zen-go.md`

- 詐欺取消しは96条。94条（通謀虚偽表示）と入口を混ぜない。
- **取消し前**の第三者（96条3項）: 善意かつ無過失なら取消しを対抗できない。**登記は不要**。
- **取消し後**の不動産第三者（復帰的物権変動・大判昭17.9.30）: **177条**。原則、先に登記した者が勝つ。
- 「取消し後も常に戦闘機」とだけ書くと、取消し前（登記不要）を潰す。図では前／後を分ける。
- 対象は不動産。動産・債権まで一般化しない。強迫取消しは96条3項の対象外。
- 覚え方: 登記（とうき）＝戦闘機（せんとうき）。**早いほうが勝つ**。177条の棚だけ。

禁止: 「切る」。GO混在。「だれが」。タイトルを「取消し後は全部登記」にしない。詐欺を94条にしない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. This is PAGE 2 of 民法記述 Q4 related knowledge. OVERWRITE only q4-2.png. Do NOT touch q4.png, q2.png, q3.png.
Quality bar: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs. Explanation text is the priority.

Match LAYOUT of「主宰者の許可」: navy title, left green「論点」, right orange「ひっかけ」, ONE center metaphor, bottom 判断軸 / ひっかけ / 暗記, navy answer bar.

STRICT:
- Left「論点」Q&A only. NO GO/STOP. Do not mix GO and YES.
- Right「ひっかけ」. Never「（聞かない）」.
- Never write「だれが」. Never write 切る／切れない／釣られる.
- 戦闘機 is a MEMORY for 先登記（177条）only. Do not put a jet on the 取消し前 row.

Title (stylish one point):「取消し後の不動産は、先に登記したほうが勝つ」
Chip:「先登記＝戦闘機。取消し前は別（96条3項）」

Left 論点:
1. 取消し前の第三者は？ → 善意無過失なら対抗不可。登記不要（96条3項）
2. 取消し後の第三者は？ → 先に登記した者（177条）
3. 本問（94条のCとD）と同じ棚？ → 登記の先後は同じ。入口は94条と96条で別

Center: one 戦闘機 next to a 登記 finish tape, labeled「先登記＝戦闘機（早いほうが勝つ）」. Below it a small split:
「取消し前 → 善意無過失（登記不要）」
「取消し後 → 戦闘機（先登記）」
Roles if any:
「取消権者（登記を備えたい）」
「取消し後の第三者（先に登記したい）」

Right ひっかけ:
- 取消し前も登記が要る
- 取消し後は善意だけで足りる
- 94条と96条の入口を混ぜる
- 強迫取消しも96条3項と同じ

Bottom:
- 判断軸:「第三者は取消しの前か後か。後なら177条の先登記」
- ひっかけ:「取消し後も全部戦闘機、と前を潰すな」
- 暗記:「取消し後の不動産は戦闘機。先登記が勝つ」
Answer EXACT:
「取消し後の不動産は、原則として先に登記を備えた者が勝つ（177条）。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, circle eyes, pale-sky-blue HAT (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE navy bar. No name tag on the answer bar. Pointer must not cover letters.
```

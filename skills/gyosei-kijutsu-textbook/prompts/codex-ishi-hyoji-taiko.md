# 記述解説図・意思表示の対抗表（93・94・95・96）

- 保存先: assets/images/deepdive/textbook/minpou-kijutsu/ishi-hyoji-taiko.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q1-1-2.png` および `q26-2.png`
- **生成は Codex。Cursor は描かない。**
- **q3.png / q4.png / q4-2.png / q5.png は上書きしない**
- 正本: `data/knowledge/canonical/minpou-ishi-hyoji-taiko.md`

## PRE-GENERATE-CHECK（Cursor確認済み・e-Gov）

- 93条1項: 原則有効。相手方が真意を知り又は知ることができたとき無効。
- 93条2項: その無効は善意の第三者に対抗できない（過失不問）。
- 94条1項: 通謀虚偽表示は無効。2項: 善意の第三者に対抗できない（過失不問）。
- 95条: 取消し可。3項は表意者の**重過失**（善意無過失と書くな）。4項: 取消しは善意無過失の第三者に対抗できない → 善意有過失には対抗できる。
- 96条1項: 詐欺・強迫は取消し可。3項は**詐欺だけ**（善意無過失の第三者に対抗不可）。強迫は取消し前の第三者にも原則対抗可。
- 第三者列は**取消し前**。取消し後の不動産は177条（先登記＝戦闘機）。q4-2と同じ棚。

禁止: 「切る」。錯誤の行に「表意者の善意無過失」。詐欺と94条の混同。強迫を96条3項と同じにする。条文にないマスを足さない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. STATUTE COMPARISON TABLE. Save only as ishi-hyoji-taiko.png. Do NOT overwrite q3.png, q4.png, q4-2.png, q5.png.
Quality: same density as q1-1-2.png and q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs. Explanation text is the priority.

Title (stylish one point):「意思表示は、当事者間と第三者で列が変わる」
Chip:「第三者の列は取消し前。取消し後の不動産は戦闘機（177条）」

MAIN: one clean table. Columns EXACT:
類型 | 当事者間 | 善意有過失の第三者 | 善意無過失の第三者

Rows EXACT (do not invent):
心裡留保（93条） | 原則有効。相手方が知り又は知り得たときは無効 | できない | できない
虚偽表示（94条） | 無効 | できない | できない
錯誤（95条） | 取消し可（表意者に重過失があれば原則不可。3項例外あり） | できる | できない
詐欺（96条） | 取消し可 | できる | できない
強迫（96条） | 取消し可 | できる | できる

Highlight 強迫's last cell (できる／できる) and 錯誤・詐欺's 善意有過失＝できる.
Do NOT write「表意者の善意無過失」on 錯誤.

Below the table, three short cards:
判断軸: 無効組（93ただし書・94）は善意第三者に対抗できない。取消し組は95・96条4項／3項を見る
例外: 第三者列は取消し前。取消し後の不動産は先登記（177条・戦闘機）
関連: 強迫は96条3項の対象外。94条と96条の入口を混ぜるな

Answer bar EXACT:
「取消し前の第三者は上表。取消し後の不動産は、先に登記した者が勝つ。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, circle eyes, pale-sky-blue HAT (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE navy bar. No name tag on the answer bar. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

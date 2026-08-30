# 記述解説図・民法記述Q1-1 2枚目（13条1項各号の表）

- 保存先: assets/images/deepdive/textbook/minpou-kijutsu/q1-1-2.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- **`q1-1.png`（1枚目）と `q1.png`（Q1-2）は上書きしない**
- 1枚目正本: `codex-q1-1-13-hosanin.md`

## PRE-GENERATE-CHECK（Cursor確認済み・e-Gov）

民法13条（保佐人の同意を要する行為等）e-Gov:

- 1項本文: 被保佐人が次に掲げる行為をするには、その保佐人の同意を得なければならない。ただし、第9条ただし書に規定する行為については、この限りでない。
- 一 元本を領収し、又は利用すること。
- 二 借財又は保証をすること。
- 三 不動産その他重要な財産に関する権利の得喪を目的とする行為をすること。
- 四 訴訟行為をすること。
- 五 贈与、和解又は仲裁合意（仲裁法2条1項）をすること。
- 六 相続の承認若しくは放棄又は遺産の分割をすること。
- 七 贈与の申込みを拒絶し、遺贈を放棄し、負担付贈与の申込みを承諾し、又は負担付遺贈を承認すること。
- 八 新築、改築、増築又は大修繕をすること。
- 九 第602条に定める期間を超える賃貸借をすること。
- 十 前各号の行為を制限行為能力者の法定代理人としてすること。
- 2項: 各号以外も、家裁の審判で同意を要する行為にできる。ただし書（日常生活）は不可。
- 3項: 利益を害するおそれがないのに同意しないとき、家裁が同意に代わる許可。
- 4項: 同意またはこれに代わる許可を得ないでしたものは、取り消すことができる。

9条ただし書: 日用品の購入その他日常生活に関する行為。
120条: 制限行為能力者側が取り消せる。
この問の甲土地＝三号。自転車＝各号に当たらず、かつただし書。

禁止: 各号を省略して「重要な行為」だけにしない。条文にない号を足さない。602条の年数（山林10年等）を断定で並べない（九号は条文どおり「602条に定める期間を超える賃貸借」）。「切る」禁止。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. This is PAGE 2 of 民法記述 Q1-1. Do NOT overwrite q1-1.png or q1.png.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs. Explanation text is the priority.

This page is a STATUTE TABLE. The one point is what 13条 actually lists.

Title (stylish one point):「同意を要する行為は、13条1項各号に書いてある」
Chip:「本問の甲土地＝三号。自転車＝各号にない＋ただし書」

MAIN: one clean table. Columns: 号 | 同意が要る行為（条文の芯） | 本問
Rows EXACT (do not invent extra items):
一 | 元本の領収・利用 | —
二 | 借財・保証 | —
三 | 不動産その他重要な財産の権利の得喪 | 甲土地＝ここ
四 | 訴訟行為 | —
五 | 贈与・和解・仲裁合意 | —
六 | 相続の承認・放棄、遺産分割 | —
七 | 贈与申込の拒絶、遺贈放棄、負担付贈与の承諾、負担付遺贈の承認 | —
八 | 新築・改築・増築・大修繕 | —
九 | 602条の期間を超える賃貸借 | —
十 | 前各号を制限行為能力者の法定代理人としてすること | —

Highlight row 三 (yellow or teal). 「甲土地＝ここ」 only on 三.

Below the table, three short cards (not a second table):
判断軸: 各号に当たる → 同意要（13条1項）→ 同意なしは取消可（13条4項・120条）
例外: 日用品の購入その他日常生活に関する行為は対象外（9条ただし書＝13条1項ただし書）。自転車はここ。
関連: 家裁は各号以外も上乗せできる（13条2項）。日常生活は上乗せ不可。期間は追認できる時から５年／行為の時から２０年（126条・別問）。5条は未成年の取消しで、入口が違う。

Answer bar EXACT:
「甲土地は13条1項三号。自転車は各号に当たらず、日常生活に関する行為なので取り消せない。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag on the answer bar. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 一〜十が欠けていない／余分な号がない
- [ ] 三号が本問の甲土地と結びついている
- [ ] ただし書（日常生活）が表の外の例外として読める
- [ ] 答え帯が1枚目の答案の芯と矛盾しない
- [ ] `q1-1.png` `q1.png` 未変更

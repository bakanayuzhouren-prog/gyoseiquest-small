# 行訴法・処分性の聞き分け（表3）

- 保存先: assets/images/deepdive/learn/gyosho/shobunsei-kikiwake.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 姉妹: `codex-gyosho-shobunsei-ari.md`／`codex-gyosho-shobunsei-nashi.md`

## PRE-GENERATE-CHECK（Cursor確認済み）

対比は正本どおり。同じ「指導・条例・計画」でも結論が分かれる。

| 対 | ○ | × |
|---|---|---|
| 勧告と同意 | 病院開設中止勧告（平17.7.15） | 開発同意拒否（平7.3.23） |
| 条例 | 特定保育所廃止（平21.11.26） | 水道料金の一般改定（平18.7.14）／公立小学校廃止を当然の処分としない |
| 都市計画 | 区画整理事業計画（平20.9.10） | 用途地域指定（昭57.4.22） |
| 給付・人事 | 労災就学の支給・不支給（平15.9.4） | 採用内定取消（昭57.5.27） |
| 指定の形 | 二項道路の一括指定（平14.1.17） | 「一括＝立法」として非処分にする読み |

公立小学校廃止条例に保護者の教育を受けさせる権利があるから処分性あり、は誤り（既存 quiz 正本）。この表では「小学校廃止条例を当然○としない」と書く。処分性なしと断定しすぎない（事案による）ので、結論欄は「当然○ではない」。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. PAGE 3 of 行訴法・処分性. Comparison only. No 原告適格 rows.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「処分性は、名前ではなく中身で分かれる」
Chip:「指導・条例・計画・一括でも、法的地位が動くか」

Left panel heading 論点:
病院の勧告は？ → ○（実質の不利益）
開発の同意拒否は？ → ×
特定保育所の廃止条例は？ → ○

Right panel heading ひっかけ:
勧告は常に指導だから非処分
条例は常に処分
区画整理はいまも青写真
一括指定は立法

MAIN: one clean table. Columns: 対比 | ○になる側 | ×／原則側
Header navy. Data rows white / light gray alternating (row zebra).
Do not invent extra pairs.

Rows EXACT:
勧告と同意 | 病院開設中止勧告 ○（平17.7.15） | 開発同意の拒否 ×（平7.3.23）
条例 | 特定の保育所廃止 ○（平21.11.26） | 水道料金の一般改定 ×（平18.7.14）
都市計画 | 区画整理の事業計画 ○（平20.9.10） | 用途地域の指定 ×（昭57.4.22）
給付と内定 | 労災就学の支給・不支給 ○ | 採用内定の取消 ×
指定の形 | 二項道路の一括指定 ○ | 一括＝立法として非処分にするのは誤り
学校・保育 | 特定保育所の廃止条例 ○ | 小学校廃止条例を当然○としない

Exactly 6 data rows. No seventh row. Do not print English notes on the image.

Small metaphor: two doors, one labeled 取消訴訟, one labeled 乗らない. Do not cover letters.

Bottom three cards:
判断軸: 特定の者の法的地位が、後続処分を待たず直接動くか
ひっかけ: 指導・条例・計画・一括というラベルで結論を決めない
暗記: 病院勧告○／開発同意×。保育廃止○／水道改定×。区画整理○／用途地域×

Answer bar EXACT:
「名前が指導でも条例でも、特定の法的地位を直接動かすなら処分になり得る。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 病院勧告と開発同意が逆になっていない
- [ ] 小学校廃止を保育所と同じ○にしていない
- [ ] 「Wait」や英語のメモが画像に出ていない（プロンプト指示の迷い行は生成に出さない）

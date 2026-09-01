# 行訴法・原告適格の聞き分け（表3）

- 保存先: assets/images/deepdive/learn/gyosho/genkoku-kikiwake.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 姉妹: `codex-gyosho-genkoku-ari.md`／`codex-gyosho-genkoku-nashi.md`

## PRE-GENERATE-CHECK（Cursor確認済み）

同じ処分でも、立つ人が変わると結論が分かれる。処分性の○×をこの表に書かない。

| 対 | ○ | × |
|---|---|---|
| 場外車券（平21.10.15） | 病院等の開設者 | 周辺住民 |
| 一般廃棄物（平26.1.28） | 同じ業種の許可業者 | 業種が違う事業者 |
| 開発許可 | 生命身体に直接の被害のおそれ（区域外でも） | 区域外であるというだけ |
| 距離規制 | 公衆浴場の既存業者 | 風俗制限区域の居住者 |
| 小田急 | 高架の事業認可で健康被害を受ける周辺住民（平17.12.7） | 運賃認可の単なる利用者（平元.4.13） |
| 長沼 | 一定範囲の住民に適格（昭57.9.9） | 適格と訴えの利益を同一視する読み |

長沼の「代替施設で危険解消」は訴えの利益。適格×と書かない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. PAGE 3 of 行訴法・原告適格. Same act, different person. Do not draw 処分性 of the act.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「原告適格は、同じ処分でも人で分かれる」
Chip:「誰の、どの利益を、どの法令が守るか」

Left panel heading 論点:
車券施設は？ → 病院等の開設者YES／周辺住民NO
ごみ処理業は？ → 同業種YES／他業種NO
長沼は？ → 適格と訴えの利益は別

Right panel heading ひっかけ:
周辺住民は常にYES
区域外は常にNO
競争者は常にYES
適格がなくなれば訴えの利益も同じ

MAIN: one clean table. Columns: 場面 | ○の立場 | ×の立場
Header navy. Data rows white / light gray alternating (row zebra).
Mark ○ green and × red inside the cells, short text only.

Rows EXACT:
場外車券施設の設置 | 近隣の病院等の開設者 ○ | 周辺住民 ×
一般廃棄物処理業の許可 | 同じ業種の許可・更新業者 ○ | 業種が違う事業者 ×
開発許可 | 生命身体に直接の被害のおそれがある者 ○（区域外でも） | 区域外であるというだけ ×
距離規制 | 公衆浴場の既存業者 ○ | 風俗制限区域の居住者 ×
小田急 | 高架事業認可で健康被害を直接受ける周辺住民 ○ | 運賃認可の単なる利用者 ×
長沼ナイキ | 一定範囲の住民に適格 ○ | 適格と訴えの利益を同じものとみる読み ×

Exactly 6 data rows.

Small metaphor: one document, two people. Left person has a pass, right person does not. Labels: 病院開設者（静穏を守りたい） / 周辺住民（生活上の不便を止めたい）. Never write だれが.

Bottom three cards:
判断軸: 同じ処分でも、根拠法令がその人の個別利益を保護しているか
ひっかけ: 近い住民は常に○。同業なら業種不問。長沼は適格も消える
暗記: 車券は病院○住民×。ごみは同業○他業×。小田急は高架○運賃×

Answer bar EXACT:
「原告適格は、処分の名前ではなく、その人の利益を法令が個別に保護しているかで見る。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 車券の○×が逆でない
- [ ] 長沼を適格×にしていない
- [ ] 処分性の行がない
- [ ] 行ゼブラ

# Codex用 — 裁判所の第一審・控訴・大法廷

01 型OK後に1枚。ADR・法源ピラミッドは載せない。裁判員の深掘りは既存 `kenshin-vs-saibanin.png` があるので、この1枚ではチップ1行まで。

- 保存先: `assets/images/deepdive/learn/kiso/saibansho.png`
- 画像キー: `learn/kiso/saibansho`

## 法律の芯（崩すな）

- **法令違憲**: 原則**大法廷**（裁判所法10条）。同趣旨の大法廷先例があれば**小法廷可**。
- **罰金以下**の罪の第一審は原則**簡裁**（地裁ではない）。
- **簡裁民事**の控訴＝**地裁**。**簡裁刑事**の控訴＝**高裁**。
- **人事訴訟**第一審＝**家裁**。控訴＝高裁、上告＝最高裁。
- **認定司法書士**: 法務大臣の認定＋簡裁＋訴額**140万円以下**。

**書かない**: 罰金以下の第一審＝地裁。「控除審」＝控訴審の聞き間違いを正しい語として出さない（控訴審と書く）。あっせん人数と混ぜない。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 簡裁刑事の控訴は高裁 / 民事の控訴は地裁 |
| 中央メタファー | 裁判所の建物マップ（簡裁・地裁・家裁・高裁・最高裁） |
| 判断軸 | 第一審はどこか。控訴先が民刑で違う |
| ひっかけ | 罰金以下＝地裁／簡裁刑事の控訴＝地裁／違憲はいつも小法廷 |
| 暗記 | 罰金以下は簡裁。簡裁刑事の控訴は高裁。人事は家裁。違憲は原則大法廷 |
| 役割 | 刑事被告人（簡裁から高裁へ）／人事の当事者（家裁から高裁へ） |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 第一審と控訴先. Do not add ADR, 法源, or 裁判員 as a main topic.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Left heading 論点. Right heading ひっかけ.
Q&A answers are YES, NO, or a short legal phrase. Do not use GO or STOP.
Labels: Left「刑事被告人（簡裁から高裁へ）」Right「人事の当事者（家裁から高裁へ）」

Title:「第一審と控訴先」
Chip:「簡裁の民と刑で控訴先が違う」

Center ONLY: one table. Header navy. Row zebra white / light gray, horizontal not columns.
Columns: 事件 | 第一審 | 控訴
Rows:
罰金以下の罪 | 簡裁 | 高裁
簡裁の民事 | 簡裁 | 地裁
人事訴訟 | 家裁 | 高裁
法令違憲の審判 | 原則大法廷（裁判所法10条） | 同趣旨の先例があれば小法廷可
Caption:「認定司法書士は法務大臣の認定、簡裁、訴額140万円以下」

Left 論点:
1. 罰金以下の第一審は？ → 簡裁
2. 簡裁民事の控訴は？ → 地裁
3. 簡裁刑事の控訴は？ → 高裁
4. 人事訴訟の第一審は？ → 家裁
5. 法令違憲は？ → 原則大法廷

Right ひっかけ:
- 罰金以下の第一審は地裁
- 簡裁刑事の控訴も地裁
- 法令違憲はいつも小法廷
- 人事訴訟の第一審は地裁

Bottom:
- 判断軸:「第一審はどこか。簡裁の控訴先は民刑で分かれる」
- ひっかけ:「罰金以下＝地裁。簡裁刑の控訴＝地裁」
- 暗記:「罰金以下は簡裁。簡裁刑の控訴は高裁。人事は家裁。違憲は原則大法廷」
Answer:「罰金以下は簡裁。簡裁の民事控訴は地裁、刑事控訴は高裁。人事は家裁。法令違憲は原則大法廷。」

Guide: ONE ちゃちゃロット only, SMALL bottom-right, 指し棒 to 暗記. Cream face, independent pale-sky-blue smiling hat, green lecturer jacket, white shirt, green trousers, shoes. No nameplate. No logos or watermarks.
```

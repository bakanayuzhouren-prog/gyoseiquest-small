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
Topic: Japanese court first instance and appeals — 簡裁 / 地裁 / 家裁 / 高裁 / 大法廷.
Learning goal: 罰金以下 first instance = 簡裁. Civil appeal from 簡裁 = 地裁. Criminal appeal from 簡裁 = 高裁.
人事訴訟 first instance = 家裁. Constitutional invalidity of statutes = Grand Bench as a rule.

Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center metaphor,
bottom 判断軸 / ひっかけ / 暗記, warm off-white, large Japanese, 16:9.

STRICT: Left「論点」Q&A (no GO/STOP). Right「ひっかけ」. Never「だれが」「問が聞くこと」「（聞かない）」.
Labels: Left「刑事被告人（簡裁から高裁へ）」Right「人事の当事者（家裁から高裁へ）」

Title:「裁判所 — 第一審と控訴先」
Chip:「簡裁の民と刑で控訴先が違う」

Center ONLY: a simple building map (not a second scene):
簡裁 → 民事控訴は地裁 / 刑事控訴は高裁
家裁（人事第一審）→ 高裁 → 最高裁
最高裁: 法令違憲は原則大法廷（先例あれば小法廷可）
Tiny badge: 認定司法書士＝法務大臣の認定＋簡裁＋140万以下
Do not add ADR 4 windows or 法源 pyramid.
Optional tiny note: 裁判員は2009〜・事実認定と量刑（do not make it the hero).

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
- 認定司法書士に140万制限はない
- 人事訴訟の第一審は地裁

Bottom:
- 判断軸:「第一審はどこか。控訴先が民刑で違う」
- ひっかけ:「罰金以下＝地裁／簡裁刑の控訴＝地裁」
- 暗記:「罰金以下は簡裁。簡裁刑の控訴は高裁。人事は家裁。違憲は原則大法廷」
Answer:「罰金以下は簡裁。簡裁の民事控訴は地裁、刑事控訴は高裁。人事は家裁。違憲は原則大法廷。」

Guide: ちゃちゃロット SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png.
Not bear/owl/cat. No nameplate.

Do NOT write 控除審. Use 控訴審. Do NOT generate other topics.
```

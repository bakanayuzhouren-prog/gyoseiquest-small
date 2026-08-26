# Codex用 — 取引上の社会通念（同じ文言、三つの仕事）

てらしぃがこのファイルを Codex に渡す。Cursor は画像を作らない。

保存先（生成後）: `assets/images/deepdive/minpou-joshiki/shakai-tsunen.png`  
参照: レイアウト＝`approved-shusaisha-kyoka.png`／案内役＝`chachalot.png` ＋ `approved-smiling-hat-mascot.png`  
正本: `data/knowledge/canonical/minpou-joshiki/09-torihiki-shakai-tsunen.md`

## 法律（守る）

- 415条1項ただし書: 社会通念は**帰責（責められるか）**。図に「不能の定義」と書かない（不能は412条の2。別）。
- 562条本文に「取引上の社会通念」と**書かない**。不適合は「契約の内容」。社会通念は契約の内容を埋める。損害賠償は564→415。
- 400条: 社会通念は善管注意の**厚さ**。483条の現状引渡しと混ぜない。
- 400は「債権の発生原因」、415は「債務の発生原因」。図で取り違えない。

## 禁止

- GO と YES 混在禁止
- 「だれが」「問が聞くこと」「（聞かない）」禁止
- くま化しない
- 95条錯誤・541条軽微を主戦場にしない（ひっかけ側の小さくなら可）

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 取引上の社会通念 — 責め / 約束 / 注意 |
| 中央メタファー | 同じ看板「社会通念」が三つの窓口に刺さる。窓口名は責め・約束・注意 |
| 判断軸 | 場の普通で切る。全国一律の常識ではない。条文の仕事を先に読む |
| ひっかけ | 562本文に文言あり／不適合＝当然損賠／特定物は現状渡しだけ／一律の世間常識 |
| 暗記 | 415は責め。562は約束。400は注意の厚さ。社会通念は場の普通。 |
| 配置 | minpou-joshiki/shakai-tsunen.png |

## 役割

- 左: **債権者（責めたい／直してほしい）**
- 右: **債務者（場の普通で守りたい）**

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
16:9 warm off-white, navy title, left green / right orange, center one metaphor, bottom 判断軸 / ひっかけ / 暗記, answer capsule. Large Japanese, no overlap.

Match LAYOUT of approved sample「主宰者の許可」.
Guide: ちゃちゃロット (Chachalot). SMALL bottom-right owl slot only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses, not a bear/owl/cat).

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点: Q&A only. NO GO/STOP. Do not mix GO and YES.
- Never write「だれが」.
- Do not print「取引上の社会通念」inside 民法562条 as if the statute quotes it.
- Do not write that 契約不適合 automatically means 損害賠償.

Title:「取引上の社会通念 — 責め / 約束 / 注意」
Chip:「同じ文言・仕事は三つ」

Center: one signboard「社会通念」pointing to three small windows:
「415 責め（帰責）」
「562 約束（契約の内容）」
「400 注意（善管の厚さ）」
A used car / jewel box as one metaphor for "the deal's ordinary".
Labels:
「債権者（責めたい／直してほしい）」
「債務者（場の普通で守りたい）」

Left 論点:
1. 415の社会通念は？ → 責められるか（帰責）
2. 562の本文は？ → 契約の内容に適合するか
3. 400の社会通念は？ → 善管注意の厚さ
4. 不適合の損害賠償は？ → 564条から415へ

Right ひっかけ:
- 社会通念＝全国一律の常識
- 562条本文に「取引上の社会通念」と書いてある
- 不適合なら帰責なしでも当然に損害賠償
- 特定物は現状渡しが原則で善管注意は不要
- 旧・隠れた瑕疵が今も要件

Bottom:
- 判断軸:「場の普通で切る。条文が聞いている仕事（責め／約束／注意）を先に読む」
- ひっかけ:「562に文言あり／当然損賠／現状渡しだけ／一律常識」
- 暗記:「415は責め。562は約束。400は注意の厚さ。社会通念は場の普通。」
- 答え帯:「同じ四字でも仕事が違う」

Japanese only. No watermark. No extra mascots.
```

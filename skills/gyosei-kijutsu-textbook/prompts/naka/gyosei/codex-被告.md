# Codex用 — 被告

てらしぃが**このファイルだけ**を Codex に渡す。1論点・1枚。Cursor は画像を作らない。  
既存 `q10.png`（教示）は上書きしない。

- 保存: `assets/images/deepdive/textbook/gyosei-kijutsu/q10-2.png`
- キー: `textbook/gyosei-kijutsu/q10-2`
- 配置: 行政法記述 Q10-2 の問の下

## 法律（守る）

- 所属する行政庁の処分 → **国又は公共団体**が被告（11条1項）
- **所属しない**庁 → **当該行政庁自身**（11条2項）
- 定番: **弁護士会**・**土地区画整理組合**
- 大臣・知事個人でも、いつも国でもない
- 義務付け・差止めも38条で同じ切り方。この図の主役は2項
- 教示（被告となるべき者及び出訴期間）はQ10。混ぜない

## 禁止

- GO と YES 混在／だれが／問が聞くこと／（聞かない）
- 住民訴訟4号の被告（現職市長）を主役にしない（別ファイル）

## 役割

- 弁護士（懲戒を取り消したい）
- 弁護士会（被告になる）

## GPT Image プロンプト（このまま生成）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし. ONE TOPIC ONLY: 取消訴訟の被告 (行訴11条). Do not add 住民訴訟 or 処分等の求め.

Match LAYOUT of「主宰者の許可」: navy title, left green「論点」, right orange「ひっかけ」, ONE center metaphor, bottom 判断軸 / ひっかけ / 暗記, navy answer bar. 16:9 warm off-white. Large Japanese. No overlap.

Guide: ちゃちゃロット SMALL bottom-right owl slot, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not bear/owl/cat.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses).

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点: Q&A only. NO GO/STOP. Do not mix GO and YES.
- Never write「だれが」.

Title:「取消訴訟の被告 — 所属しない庁は自分」
Chip:「大臣個人でも国でもない」

Center: two boxes. 「国・公共団体に所属」→ defendant is the state or public body. 「所属しない」→ 弁護士会 and 土地区画整理組合 themselves.
Labels MUST be:
「弁護士（懲戒を取り消したい）」
「弁護士会（被告になる）」

Left 論点:
1. 所属する行政庁の処分 → 国又は公共団体が被告
2. 所属しない庁 → 当該行政庁自身
3. 定番は？ → 弁護士会・区画整理組合

Right ひっかけ:
- いつも国が被告
- 知事個人が被告
- 教示の話に逃げる

Bottom:
- 判断軸:「11条1項か2項か。所属しなければ庁自身」
- ひっかけ:「国／個人／教示」
- 暗記:「弁護士会・組合は当該行政庁を被告」
Answer EXACT:
「弁護士会や土地区画整理組合は国又は公共団体に所属しないので、当該行政庁を被告とする。」
```

## 目視

- [ ] 2項の庁自身が結論
- [ ] q10.png を上書きしていない

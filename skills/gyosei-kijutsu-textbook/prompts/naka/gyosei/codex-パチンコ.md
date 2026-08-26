# Codex用 — パチンコ

てらしぃが**このファイルだけ**を Codex に渡す。1論点・1枚。Cursor は画像を作らない。  
既存 `q24.png`（事情判決）は上書きしない。

- 保存: `assets/images/deepdive/textbook/gyosei-kijutsu/q24-2.png`
- キー: `textbook/gyosei-kijutsu/q24-2`
- 配置: 行政法記述 Q24-2 の問の下

## 法律（守る）

- 狭義の訴えの利益＝まだ争う実益があるか
- 最判平27.3.3: 営業停止期間が満了しても、**公にされた処分基準**で先行処分を理由に後行の量定を加重する定めがあるときは、その加重期間内は**なお取消しの利益あり**
- **非公表**の基準では、この「なお利益あり」は使えない（ひっかけ）
- 利益なし＝**却下**。事情判決（違法宣言＋棄却）と棚が違う

## 禁止

- GO と YES 混在／だれが／問が聞くこと／（聞かない）
- 事情判決をこの図の正解にしない

## 役割

- 営業者（停止が明けても取り消したい）

## GPT Image プロンプト（このまま生成）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし. ONE TOPIC ONLY: 狭義の訴えの利益 (パチンコ営業停止). Do not make 事情判決 or 狸の森 the main story.

Match LAYOUT of「主宰者の許可」: navy title, left green「論点」, right orange「ひっかけ」, ONE center metaphor, bottom 判断軸 / ひっかけ / 暗記, navy answer bar. 16:9 warm off-white. Large Japanese. No overlap.

Guide: ちゃちゃロット SMALL bottom-right owl slot, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not bear/owl/cat.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses).

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点: Q&A only. NO GO/STOP. Do not mix GO and YES.
- Never write「だれが」.

Title:「狭義の訴えの利益 — パチンコの加重期間」
Chip:「非公表の基準では足りない」

Center: expired 営業停止 calendar, but a published 処分基準 book still adds weight. Stamp「なお利益あり」. A closed unlabeled book tagged「非公表」with caution (wrong path).
Labels MUST be:
「営業者（停止が明けても取り消したい）」

Left 論点:
1. 期間満了で利益消滅？ → 原則は消える
2. 公表された基準で後行が加重？ → その期間は利益あり
3. 利益なしの判決は？ → 却下

Right ひっかけ:
- 満了＝必ず却下
- 非公表の基準でも利益が残る
- 事情判決（違法宣言＋棄却）
- 区画整理の工事完了と同じ

Bottom:
- 判断軸:「まだ争う実益があるか。公表された加重の定めが残っていれば残る」
- ひっかけ:「満了で終わり／非公表でも残る／事情判決」
- 暗記:「公表基準で後行が重くなる間は利益あり」
Answer EXACT:
「公にされた処分基準で後行処分の量定が加重される期間内は、なお訴えの利益がある。」
```

## 目視

- [ ] 「公にされた」が条件になっている
- [ ] 事情判決を正解にしていない
- [ ] q24.png を上書きしていない

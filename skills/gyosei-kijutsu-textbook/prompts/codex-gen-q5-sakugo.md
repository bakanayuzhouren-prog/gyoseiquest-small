# 1から生成：民法記述Q5（95条3項・錯誤の例外）

**既存図は捨てる。** タイトル「要る2つ」が①かつ②に読める誤誘導のため、局所修正せず新規作成。

## 誤表記（旧図）

「重過失でも取消せる例外（要る2つ）」→ 両方必要に読める。  
正: 95条3項は **①又は②のいずれか**（除き＝例外が一つでも当たれば取消し可）。

## 正しい知識

表意者に重大な過失があるときは原則取消せない（95条3項本文）。  
例外（3項ただし書）:

- 一 相手方が錯誤を知り、又は重大な過失によって知らなかったとき
- 二 相手方が表意者と同一の錯誤に陥っていたとき

答案の芯:
`相手方が錯誤を知り若しくは重過失で知らなかったとき、又は双方同一の錯誤のとき。`

## 登場人物

- 表意者A（取消したい）
- 相手方B（契約の相手）

## GPT Image プロンプト（CREATE FROM SCRATCH）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Do not reuse the old title「要る2つ」. Never imply BOTH exceptions are required.

Match Q1 heading style:
- Left「論点」as Q&A. Never「問が聞くこと」. NO GO badges on 論点. Never mix GO and YES.
- Right「ひっかけ」. Never「（聞かない）」.
- Labels:「表意者（取消したい）」／「相手方（契約の相手）」. Never「だれが」.
- （95条）in body rows.
- Bottom 判断軸 / ひっかけ / 暗記 + answer capsule.
- 16:9 warm off-white, navy title, large Japanese, no overlap.
- Guide: smiling-hat mascot from approved-smiling-hat-mascot.png
  (hat not ears, cream face, equal circle eyes, four cheek marks, no glasses, not a bear/owl).

Title:「錯誤95条 — 重過失でも取消せる例外（①又は②）」
Chip:「両方必要ではない」

Left 論点 Q&A (no GO):
1. 重過失でも取消せる？ → YES（例外①又は②）
2. 例外①は？ → 相手方が知り又は重過失で知らなかった（3項一）
3. 例外②は？ → 双方同一の錯誤（3項二）

Center: STOP gate「表意者の重大な過失」then two OR-doors labeled 例外① and 例外②.
Big badge「①又は②」（not かつ, not 要る2つ）.

Right ひっかけ:
- 動機錯誤の話に逃げる
- 「重過失＝即アウト」だけで終わる

People labels:
- 表意者（取消したい）
- 相手方（契約の相手）

Bottom:
- 判断軸:「表意者に重過失でも、例外①又は②なら取消し可（95条3項）」
- ひっかけ:「動機錯誤・表示や『重過失＝即アウト』に引っ張られるな」
- 暗記:「知り／重過失で知らなかった　又は　双方同一錯誤」
Answer:
「相手方が錯誤を知り若しくは重過失で知らなかったとき、又は双方同一の錯誤のとき。」
```

保存: `assets/images/deepdive/textbook/minpou-kijutsu/q5.png`

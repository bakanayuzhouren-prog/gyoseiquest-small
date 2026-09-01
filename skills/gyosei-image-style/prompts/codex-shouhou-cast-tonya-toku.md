# Codex用・商法教科書（問屋554条・555条）

てらしぃ指示: 自己の名だからこその特則。指値の差額負担と介入権。履行責任（553条）とは別枚。

- 配置予定（生成後・Cursor）: 商法教科書 `/textbook/shouhou` 第8章、問屋の論点⑤の下
- 保存先: `assets/images/deepdive/textbook/shouhou/cast-tonya-toku.png`
- 画像キー案: `textbook/shouhou/cast-tonya-toku`
- 見て聞いて覚える（生成後・Cursor）: 551条・554条・555条カードのB列に `[[image:textbook/shouhou/cast-tonya-toku]]`
- 前提: SKILL.md / 見本PNG / ちゃちゃロット正本
- 範囲: **この1枚の画像生成まで**

## 法律の芯（崩すな）

商法554条: 問屋が委託者の**指定した金額より低い価格で販売**をし、又は**高い価格で買入れ**をした場合において、**自らその差額を負担するとき**は、その販売又は買入れは**委託者に対してその効力を生ずる**。

商法555条1項: 問屋は、**取引所の相場がある物品**の販売又は買入れの委託を受けたときは、**自ら買主又は売主となることができる**。売買の代価は、問屋が買主又は売主となったことの**通知を発した時**における取引所の相場によって定める。

商法555条2項: 前項の場合においても、問屋は委託者に対して**報酬を請求することができる**。

混ぜない:

- 553条の担保責任（相手方不履行）はこの1枚の主題にしない
- 「どんな物でも介入できる」は不可。要件は**取引所の相場がある物品**
- 代価の基準時は「通知を発した時」。契約締結時・履行時と取り違えない
- 介入しても報酬は消えない（555条2項）
- 554条は「差額を負担すれば、指定を外しても委託者に効力が立つ」。負担しなければこの条文では効力は書かない（負担しない場合の効果を断定しない）

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| タイトル | 問屋の特則 — 差額負担で効力／相場ある物は介入可 |
| 左右パネル | 左＝554（指値）／右＝555（介入）でも、見出しは「論点」「ひっかけ」 |
| 判断軸 | 指定金額を外したか、取引所の相場がある物品の介入か |
| ひっかけ | 差額負担なしでも当然有効／相場がなくても介入／介入したら報酬なし |
| 暗記 | 指定を外したら差額負担で委託者に効力。相場ある物は自ら相手方になれる |
| 配置先 | textbook/shouhou/cast-tonya-toku |

## 論点Q&A（GOなし）

- 指定より安く売っても効力は？ → 差額を自ら負担すれば、委託者に効力（554条）
- 介入できる物は → 取引所の相場がある物品（555条）
- 介入しても報酬は → 請求できる（555条2項）

行1に YES を無理に付けない。短答にする。

## 役割

- **問屋（自己の名で売買する）**
- **委託者（金額を指定した／計算の主人）**
- 介入の段: **問屋（自ら買主又は売主となる）**

## GPT Image プロンプト（このまま生成）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: 問屋の自己名義特則 — 554条（指定金額との差額負担）and 555条（介入権）.
Learning goal: Off-price deals bind the principal if the commission agent bears the difference (554).
介入権 is only for goods with an exchange quotation (555). Price = quotation when notice is sent.
報酬 still claimable (555②).

Match「主宰者の許可」: left header MUST be「論点」, right header MUST be「ひっかけ」
(do not title the side panels「554条」「555条」). Center ONE split metaphor.
Bottom 判断軸・ひっかけ・暗記. Warm off-white. 16:9. Large Japanese. No overlap.

STRICT:
- 論点 Q&A. NO GO/STOP. No YES/GO mix. Short answers.
- Never「だれが」.
- Labels:
  「問屋（自己の名で売買する）」
  「委託者（金額を指定した）」
  「問屋（自ら買主又は売主となる）」

Title:「問屋の特則 — 差額負担で効力／相場ある物は介入可」
Chip:「553条の担保責任は別図」

Center metaphor (ONE): split desk, same 問屋.
Left desk「指定金額」: tag 100, actual sale 90, 問屋 pays the 10 gap from own pocket,
arrow to 委託者 labeled「差額負担 → 委託者に効力（554条）」.
Right desk「取引所の相場」: exchange board. 問屋 sits on both sides of a trade as
買主又は売主. Caption「通知を発した時の相場が代価（555条1項）」and「報酬も請求可（555条2項）」.
Do not claim 介入 is allowed for goods without 取引所の相場.

Left 論点:
1. 指定より安く売っても効力は？ → 差額を自ら負担すれば、委託者に効力（554条）
2. 介入できる物は → 取引所の相場がある物品（555条）
3. 介入しても報酬は → 請求できる（555条2項）

Right ひっかけ:
- 指定を外れても、差額負担なしで当然に委託者へ効力
- 相場のない物品でも介入できる
- 自ら相手方になったら報酬は請求できない
- 代価は契約時の相場、と通知時を落とす
- 554条と553条（相手方不履行）を混ぜる

Bottom:
- 判断軸:「指定を外した差額負担か、取引所相場のある物品への介入か」
- ひっかけ:「何でも介入できる／差額負担なしでも当然有効、ではない」
- 暗記:「指定外れは差額負担で効力。相場ある物は自ら相手方。報酬は残る」
Answer capsule:
「問屋が指定金額を外しても、自ら差額を負担するときは委託者に対して効力を生ずる。取引所の相場がある物品については、問屋は自ら買主又は売主となることができ、通知を発した時の相場が代価となり、報酬も請求できる。」

Guide: ちゃちゃロット SMALL bottom-right, green lecturer suit, 指し棒 to 暗記.
Match chachalot.png. No nameplate. Not a bear/owl/cat.
Do not determine the legal effect when 問屋 does not bear the difference — leave it off the answer capsule.
```

## 目視チェック（生成後・必須）

- [ ] 介入の要件に「取引所の相場がある物品」がある
- [ ] 代価が「通知を発した時」になっている
- [ ] 介入したら報酬なし、が正しいルールとして緑になっていない
- [ ] 554で差額負担なしの効果を断定していない
- [ ] ちゃちゃロット緑スーツ。文字かぶりなし

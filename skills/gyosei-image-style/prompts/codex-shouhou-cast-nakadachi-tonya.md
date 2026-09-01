# Codex用・商法教科書（仲立人 vs 問屋）

てらしぃ指示: 登場人物クラスタの4枚目。契約の線と名義。履行担保の細部は次枚。

- 配置予定（生成後・Cursor）: 商法教科書 `/textbook/shouhou` 第8章、図解スロット⑤-2（④⑤を兼ねて1枚で対比）
- 保存先: `assets/images/deepdive/textbook/shouhou/cast-nakadachi-tonya.png`
- 画像キー案: `textbook/shouhou/cast-nakadachi-tonya`
- 前提: SKILL.md / 見本PNG / ちゃちゃロット正本
- 範囲: **この1枚の画像生成まで**

## 法律の芯（崩すな）

商法543条: 仲立人とは、**他人間の商行為の媒介**をすることを業とする者。

商法544条: 仲立人は、その媒介により成立させた行為について、当事者のために**支払その他の給付を受けることができない**。ただし、当事者の別段の意思表示又は別段の慣習があるときは、この限りでない。

（545条は見本保管。代金受領の条文は**544条**。545と取り違えるな。）

商法551条: 問屋とは、**自己の名をもって他人のために**物品の販売又は買入れをすることを業とする者。

商法552条1項: 問屋は、他人のためにした販売又は買入れにより、相手方に対して、**自ら権利を取得し、義務を負う**。

混ぜない（この1枚では書かない）:

- 549条（氏名を示さないときの仲立人の履行責任）
- 553条（問屋の担保責任）
- 555条（介入権）
- 代理商27条（継続的な特定商人のための代理・媒介。仲立は案件ごとの媒介）

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| タイトル | 契約の線は誰と誰か — 仲立は乗らない／問屋は乗る |
| 中央 | 上下2本の契約線 |
| 表の行 | 白／薄いグレー交互 |
| 判断軸 | 媒介か、自己の名で自ら権利義務を負うか |
| ひっかけ | 仲立＝問屋／問屋は当事者にならない／代金受領を545条にする |
| 暗記 | 仲立は媒介。問屋は自己の名で自ら権利義務 |
| 配置先 | textbook/shouhou/cast-nakadachi-tonya |

## 論点Q&A（GOなし）

- 仲立人は契約の当事者か？ → NO（543条）
- 仲立人は代金等を受け取れるか → 原則できない（544条）
- 問屋の対外当事者は → 問屋自身（551条・552条）

## 役割

- 上: **仲立人（他人間の商行為を媒介する）**
- 下: **問屋（自己の名で販売又は買入れをする）**
- 左右: **委託者（計算の主人）**／**相手方（契約の相手）** ※問屋段のみ委託者は裏

## GPT Image プロンプト（このまま生成）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: 仲立人 vs 問屋 — who is on the contract line
（商法543条・544条 vs 551条・552条）.
Learning goal: 仲立人は媒介のみで契約線に乗らない。原則、支払その他の給付を受けられない（544条）.
問屋は自己の名。相手方に対し自ら権利を取得し義務を負う（551条・552条）.

Match「主宰者の許可」: left 論点 / right ひっかけ, center ONE metaphor (two stacked flows
count as one comparison metaphor), bottom 判断軸・ひっかけ・暗記.
Warm off-white. 16:9. Large Japanese. No overlap.

STRICT:
- Left header「論点」. Right header「ひっかけ」.
- 論点 Q&A. NO GO/STOP. YES not required. Row1 is NO.
- Never「だれが」.
- Labels:
  「仲立人（他人間の商行為を媒介する）」
  「問屋（自己の名で販売又は買入れをする）」
  「委託者（計算の主人）」
  「相手方（契約の相手）」

Title:「契約の線 — 仲立は乗らない／問屋は乗る」
Chip:「代金の条文は544条（545条は見本保管）」

Center: TWO horizontal flows stacked (same A and B people).
Top「仲立」: thick contract line A ↔ B. 仲立人 above with dashed lines only. Badge
「当事者にならない（543条）」「給付受領は原則×（544条）」.
Bottom「問屋」: thick contract 問屋 ↔ B. 委託者 A behind a ledger「他人のために（551条）」.
Badge「自己の名」「自ら権利義務（552条）」.

Small table under flows (navy header). Rows alternate white / light gray:
見る場所 / 仲立人 / 問屋
契約の線 / A↔B / 問屋↔相手方
名義 / 媒介（乗らない） / 自己の名
給付の受領 / 原則できない（544条） / 対外当事者として生じ得る

Do NOT draw 支配人 or 代理商. Do NOT explain 介入権 or 氏名不開示の履行責任 on this sheet.

Left 論点:
1. 仲立人は契約の当事者か？ → NO（543条）
2. 仲立人は代金等を受け取れるか → 原則できない（544条）
3. 問屋の対外当事者は → 問屋自身（551条・552条）

Right ひっかけ:
- 仲立人と問屋は同じ（どちらも間に入るだけ）
- 問屋は当事者にならない
- 仲立人が当然に代金を受領できる
- 544条と545条（見本保管）を取り違える

Bottom:
- 判断軸:「契約の線は誰と誰か。自己の名で権利義務を負うのは問屋（552条）」
- ひっかけ:「間に入る＝同じ、ではない。給付受領は544条」
- 暗記:「仲立は媒介。問屋は自己の名で自ら権利義務」
Answer capsule:
「仲立人は他人間の商行為を媒介し、原則として当事者のために給付を受けられない。問屋は自己の名をもって他人のために売買し、相手方に対し自ら権利を取得し義務を負う。」

Guide: ちゃちゃロット SMALL bottom-right, green lecturer suit, 指し棒 to 暗記.
Match chachalot.png. No nameplate. Not a bear/owl/cat.
```

## 目視チェック（生成後・必須）

- [ ] 代金制限が544条（545条になっていない）
- [ ] 問屋が契約線に乗っている。仲立が乗っていない
- [ ] 行ゼブラ。GOなし
- [ ] ちゃちゃロット緑スーツ。文字かぶりなし

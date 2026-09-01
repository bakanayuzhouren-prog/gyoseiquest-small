# Codex用・商法教科書（仲立549条 vs 問屋553条）

てらしぃ指示: 契約線の次枚。どちらも「自ら履行」だが入口が違う。

- 配置予定（生成後・Cursor）: 商法教科書 `/textbook/shouhou` 第8章、仲立／問屋の対比の直後
- 保存先: `assets/images/deepdive/textbook/shouhou/cast-rikou.png`
- 画像キー案: `textbook/shouhou/cast-rikou`
- 見て聞いて覚える（生成後・Cursor）: 549条・553条カードのB列に `[[image:textbook/shouhou/cast-rikou]]`
- 前提: SKILL.md / 見本PNG / ちゃちゃロット正本
- 範囲: **この1枚の画像生成まで**

## 法律の芯（崩すな）

商法548条: 当事者が氏名又は名称を相手方に示してはならない旨を仲立人に命じたときは、仲立人は結約書等に記載できない。

商法549条: 仲立人は、当事者の一方の氏名又は名称をその相手方に**示さなかったとき**は、当該相手方に対して**自ら履行をする責任**を負う。

商法553条: 問屋は、委託者のためにした販売又は買入れにつき**相手方がその債務を履行しないとき**に、**自らその履行をする責任**を負う。ただし、当事者の別段の意思表示又は別段の慣習があるときは、この限りでない。

入口の差（ここが答案の芯）:

- 仲立549: 引き金は**氏名・名称の不開示**（相手方から本人が見えない）
- 問屋553: 引き金は**相手方の不履行**（問屋はもともと対外当事者・552条）

混ぜない:

- 544条（給付受領の制限）と549条を同一視しない
- 545条（見本保管）を出さない
- 555条介入権・554条指値はこの1枚に出さない
- 548条は549条の前提として小さくてよい。549を548と取り違えない

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| タイトル | 自ら履行 — 仲立は氏名不開示／問屋は相手方不履行 |
| 表の行 | 白／薄いグレー交互 |
| 判断軸 | 引き金は何か。不開示か、相手方の不履行か |
| ひっかけ | どちらも同じ／問屋は当事者でないから履行しない／544条と混ぜる |
| 暗記 | 仲立549は示さなかったとき。問屋553は相手方が履行しないとき |
| 配置先 | textbook/shouhou/cast-rikou |

## 論点Q&A（GOなし）

- 仲立人が自ら履行するのは？ → 氏名等を示さなかったとき（549条）
- 問屋が自ら履行するのは？ → 相手方が債務を履行しないとき（553条）
- 553条ただし書は → 別段の意思表示又は慣習があれば負わない

## 役割

- **仲立人（氏名を示さず、自ら履行する）**
- **問屋（相手方不履行のとき自ら履行する）**
- **相手方（履行を求める）**
- **委託者（計算の主人）** ※問屋段のみ小さく

## GPT Image プロンプト（このまま生成）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: Who must perform themselves — 仲立人549条 vs 問屋553条.
Learning goal: Both can end up performing, but the trigger differs.
仲立: 氏名又は名称を相手方に示さなかったとき、その相手方に対し自ら履行（549条）.
問屋: 相手方が債務を履行しないとき、自ら履行（553条）。ただし別段の意思表示又は慣習。

Match「主宰者の許可」: left 論点 / right ひっかけ, center ONE comparison metaphor,
bottom 判断軸・ひっかけ・暗記. Warm off-white. 16:9. Large Japanese. No overlap.

STRICT:
- Left header「論点」. Right header「ひっかけ」.
- 論点 Q&A. NO GO/STOP. Do not put YES on every row. Short answers only.
- Never「だれが」.
- Labels:
  「仲立人（氏名を示さず、自ら履行する）」
  「問屋（相手方不履行のとき自ら履行する）」
  「相手方（履行を求める）」
  「委託者（計算の主人）」

Title:「自ら履行 — 仲立は氏名不開示／問屋は相手方不履行」
Chip:「入口が違う。結論の『自ら履行』だけ見るな」

Center metaphor (ONE): two stacked gates.
Top gate labeled「氏名・名称を示さなかった」（549条）→ 仲立人 stands in for the hidden party
toward 相手方. Face of the hidden party is a blank nameplate.
Bottom gate labeled「相手方が債務を履行しない」（553条）→ 問屋 steps forward to perform
because 問屋 is already the counterparty (do not redraw the whole 551 definition).
Small table, navy header, rows alternate white / light gray:
項目 / 仲立人 / 問屋
引き金 / 氏名等を示さなかった（549条） / 相手方の不履行（553条）
向き / 示されなかった相手方へ / 委託者のためにした売買について
例外 / （この図では触れない） / 別段の意思表示又は慣習（553条ただし書）

Do NOT teach 544条, 545条, 554条, 555条 on this sheet. Tiny note OK:「548条は氏名を示すなという命令。責任の発生は549条」.

Left 論点:
1. 仲立人が自ら履行するのは？ → 氏名等を示さなかったとき（549条）
2. 問屋が自ら履行するのは？ → 相手方が履行しないとき（553条）
3. 553条ただし書は → 別段の意思表示又は慣習

Right ひっかけ:
- 仲立も問屋も、同じ理由で自ら履行する
- 問屋は当事者でないから履行責任はない
- 549条を544条（給付の受領制限）と取り違える
- 549条を548条（記載できない）と取り違える

Bottom:
- 判断軸:「引き金は不開示か、相手方の不履行か」
- ひっかけ:「自ら履行＝同じ条文、ではない」
- 暗記:「仲立549は示さなかったとき。問屋553は相手方が履行しないとき」
Answer capsule:
「仲立人は、当事者の一方の氏名又は名称を相手方に示さなかったときは、その相手方に対して自ら履行をする責任を負う。問屋は、相手方が債務を履行しないときに自ら履行をする責任を負う。」

Guide: ちゃちゃロット SMALL bottom-right, green lecturer suit, 指し棒 to 暗記.
Match chachalot.png. No nameplate. Not a bear/owl/cat.
```

## 目視チェック（生成後・必須）

- [ ] 549の引き金が「相手方不履行」になっていない
- [ ] 553の引き金が「氏名不開示」になっていない
- [ ] 545条が代金の条文として出ていない
- [ ] ちゃちゃロット緑スーツ。文字かぶりなし

# Codex用・商法教科書（締約代理商 vs 媒介代理商）

てらしぃ指示: 登場人物クラスタの5枚目。代理商の中の代理権。仲立人との切れ目まで1行。

- 配置予定（生成後・Cursor）: 商法教科書 `/textbook/shouhou` 第8章、図解スロット③-2
- 保存先: `assets/images/deepdive/textbook/shouhou/cast-teiyaku.png`
- 画像キー案: `textbook/shouhou/cast-teiyaku`
- 前提: SKILL.md / 見本PNG / ちゃちゃロット正本
- 範囲: **この1枚の画像生成まで**

## 法律の芯（崩すな）

商法27条: 代理商は、平常の営業の部類に属する取引の**代理又は媒介**をする者（使用人でない）。

条文は「締約代理商」「媒介代理商」の語を置かない。試験の整理として:

- **代理（締約）**: 本人の代理人として相手方と契約を締結する → 効果は本人へ
- **媒介**: 取引の成立を取り持つ。契約の当事者の代理人として締結しない → 契約線は本人↔相手方

仲立人（543条）も媒介だが、**特定の商人の使用人でない継続的パートナー（代理商）**か、**他人間の商行為を業として媒介する者（仲立人）**かで切る。この枚は代理商の内側が主。仲立との差はひっかけ1行。

混ぜない: 問屋の自己の名、支配人の包括代理。

## 論点Q&A（GOなし）

- 締約型は契約まで代理するか？ → YES（27条の「代理」）
- 媒介型の契約線は → 本人と相手方
- 仲立人との差は → 特定商人のための継続（代理商）か、案件ごとの媒介業（仲立）

## 役割

- 左: **締約代理商（本人の代理人として締結する）**
- 右: **媒介代理商（取引を取り持ち、締結は本人）**

## GPT Image プロンプト（このまま生成）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: 締約代理商 vs 媒介代理商 inside 商法27条（代理又は媒介）.
Learning goal: 契約締結まで代理するのが締約。取持ちまでが媒介。
どちらも使用人でない。仲立人とは、特定商人のための継続か、案件ごとの媒介業かで区別する。

Match「主宰者の許可」: left 論点 / right ひっかけ, center ONE split-screen metaphor,
bottom 判断軸・ひっかけ・暗記. Warm off-white. 16:9. Large Japanese. No overlap.

STRICT:
- Left header「論点」. Right header「ひっかけ」.
- 論点 Q&A. NO GO/STOP. YES only row 1.
- Never「だれが」.
- Labels:
  「締約代理商（本人の代理人として締結する）」
  「媒介代理商（取引を取り持ち、締結は本人）」
  「本人（効果の帰属先）」
  「相手方（契約の相手）」

Title:「代理商の中身 — 代理（締結）か媒介か」
Chip:「条文は『代理又は媒介』（27条）」

Center metaphor (ONE): split-screen shop.
Left: agent stamps / signs a contract with customer; effect arrow to 本人.
Right: agent introduces customer; thick contract is 本人 ↔ 相手方 only.
Shared badge:「どちらも使用人でない／特定商人のため継続」.

Left 論点:
1. 締約型は契約まで代理するか？ → YES（27条の代理）
2. 媒介型の契約線は → 本人と相手方
3. 仲立人との差は → 特定商人への継続か、案件ごとの媒介業か

Right ひっかけ:
- 媒介代理商＝仲立人（同じでよい）
- 代理商なら必ず契約締結までできる
- 支配人と同じ包括的な裁判上の権限

Bottom:
- 判断軸:「27条の『代理』か『媒介』か。契約を誰が締結するか」
- ひっかけ:「媒介代理商を仲立人と同一視するな」
- 暗記:「締約は代理して締結。媒介は取持ち。契約線は本人と相手方」
Answer capsule:
「代理商は平常の営業の部類に属する取引の代理又は媒介をする。締約型は本人の代理人として締結し、媒介型の契約は本人と相手方の間に成立する。」

Guide: ちゃちゃロット SMALL bottom-right, green lecturer suit, 指し棒 to 暗記.
Match chachalot.png. No nameplate. Not a bear/owl/cat. Do not use 口語 as labels.
Legal labels use 契約締結, not slang.
```

## 目視チェック（生成後・必須）

- [ ] 媒介側の契約線が本人↔相手方
- [ ] 仲立人と媒介代理商が「同じ」と緑で書かれていない
- [ ] ちゃちゃロット緑スーツ。文字かぶりなし

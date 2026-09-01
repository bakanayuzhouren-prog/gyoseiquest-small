# Codex用・商法教科書（支配人 vs 代理商）

てらしぃ指示: 登場人物クラスタの3枚目。「代理商＝店長」を潰す。締約／媒介の中身はこの枚では短く、詳細は次枚。

- 配置予定（生成後・Cursor）: 商法教科書 `/textbook/shouhou` 第8章、図解スロット③
- 保存先: `assets/images/deepdive/textbook/shouhou/cast-dairisho.png`
- 画像キー案: `textbook/shouhou/cast-dairisho`
- 既存 `cast-1.png` は同テーマだが答え帯が空・案内役が崩れやすい。**この保存先に新規生成**（上書き判断はてらしぃ）
- 前提: SKILL.md / 見本PNG / ちゃちゃロット正本
- 範囲: **この1枚の画像生成まで**

## 法律の芯（崩すな）

商法20条: 商人は、支配人を選任し、その営業所においてその営業を行わせることができる。

商法21条1項: 支配人は包括的な裁判上・裁判外の代理権（詳細は権限図へ）。

商法27条: 代理商とは、**商人のためにその平常の営業の部類に属する取引の代理又は媒介をする者**で、**その商人の使用人でないもの**。

含意（断定してよい）:

- 代理商は内部の使用人ではない → 店長（支配人）ではない
- 「者」なので個人に限らない（法人もなり得る）
- 代理または媒介 → 締約型と媒介型がある（この枚は一言だけ。詳細は次枚）

混ぜない: 仲立人543条、問屋551条、表見支配人24条の要件表。

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| タイトル | 代理商 ≠ 店長（支配人） |
| 中央 | 店の内側／店の外側 |
| 判断軸 | 使用人か、使用人でない継続パートナーか（27条） |
| ひっかけ | 看板「代理店」＝支配人／代理商は必ず個人／権限は支配人と同じ |
| 暗記 | 店長は支配人。代理商は使用人でない外部の者 |
| 配置先 | textbook/shouhou/cast-dairisho |

## 論点Q&A（GOなし）

- 代理商は商人の使用人か？ → NO（27条）
- 店長に近いのは → 支配人（20条・21条）
- 代理商は法人でもよいか → 可（27条の「者」）

## 役割

- 左: **支配人（営業所の営業を任された使用人）**
- 右: **代理商（使用人でなく、代理又は媒介をする）**

## GPT Image プロンプト（このまま生成）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: 支配人 vs 代理商（商法20条・21条・27条）.
Learning goal: 代理商は店長ではない。使用人でない。個人でも法人でもなり得る。

Match「主宰者の許可」layout: left 論点 / right ひっかけ, center ONE metaphor,
bottom 判断軸・ひっかけ・暗記. Warm off-white. 16:9. Large Japanese. No overlap.

STRICT:
- Left header「論点」. Right header「ひっかけ」.
- 論点 Q&A. NO GO/STOP. YES only if used — this panel uses NO / 支配人 / 可. Do not add GO.
- Never「だれが」.
- Labels MUST be:
  「支配人（営業所の営業を任された使用人）」
  「代理商（使用人でなく、代理又は媒介をする）」

Title:「代理商 ≠ 店長（支配人）」
Chip:「看板の『代理店』に釣られるな」

Center metaphor (ONE): a wall. Inside the shop: 支配人 behind the counter.
Outside: 代理商 at a partner office labeled 販売代理店. Red stamp X on a thought bubble
「代理商＝店長」. Tiny caption under 代理商:「代理または媒介（27条）／法人でも可」.
Do not draw a second full comparison of 仲立人 and 問屋.

Left 論点:
1. 代理商は商人の使用人か？ → NO（27条）
2. 店長に近いのは → 支配人（20条・21条）
3. 代理商は法人でもよいか → 可（27条の「者」）

Right ひっかけ:
- 代理商＝店長、同じ包括代理権
- 代理商は必ず個人
- 「〇〇代理店」の看板＝商法上の支配人

Bottom:
- 判断軸:「店の中の使用人か、使用人でない外部の者か（27条）」
- ひっかけ:「代理店の看板を支配人と読むな」
- 暗記:「店長は支配人。代理商は使用人でない」
Answer capsule:
「代理商は、商人のために平常の営業の部類に属する取引の代理又は媒介をする者で、その商人の使用人ではない。」

Guide: ちゃちゃロット SMALL bottom-right, green lecturer suit (white shirt, trousers, shoes),
指し棒 to 暗記. Match chachalot.png. No nameplate. Hat is a hat, not animal ears.
Not a bear/owl/cat. Do not leave 答え帯 blank.

Legal: 27条 definition only + 支配人 is internal employee. Do not copy mock-exam wording.
```

## 目視チェック（生成後・必須）

- [ ] 答え帯が空でない
- [ ] 代理商が使用人だと読める誤誘導がない
- [ ] ちゃちゃロットが熊・青着ぐるみになっていない。緑スーツ
- [ ] 文字かぶりなし

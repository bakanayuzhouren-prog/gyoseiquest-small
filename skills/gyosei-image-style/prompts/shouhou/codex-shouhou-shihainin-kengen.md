# Codex用 — 商業使用人の権限（支配人だけが裁判上も一切）

商法・会社法の対比1枚。店の中の使用人だけ。代理商は出さない。

- 保存先: `assets/images/deepdive/learn/shouhou/shihainin-kengen.png`
- 画像キー: `learn/shouhou/shihainin-kengen`

配置候補（生成後・Cursor）: 商法・会社法の支配人カード、「もっと深掘る」、質問モード「支配人 裁判上」。教科書第8章の `textbook/shouhou/cast-kengen` とは別ファイル。

## 法律の芯（崩すな）

- 商法21条1項。支配人は、商人に代わってその営業に関する一切の裁判上又は裁判外の行為をする権限を有する。会社法11条1項は「会社に代わってその事業に関する」と同じ構造。
- 商法21条2項／会社法11条2項。支配人は、他の使用人を選任し、又は解任することができる。旧規定の「他の支配人を選任できない」は書かない。
- 商法21条3項／会社法11条3項。支配人の代理権に加えた制限は、善意の第三者に対抗することができない。
- 商法24条／会社法13条。営業所（会社は本店又は支店）の営業（事業）の主任者であることを示す名称を付した使用人は、当該営業所（本店又は支店）の営業（事業）に関し、一切の裁判外の行為をする権限を有するものとみなす。ただし、相手方が悪意であったときは、この限りでない。
- 商法25条1項／会社法14条1項。ある種類又は特定の事項の委任を受けた使用人は、当該事項に関する一切の裁判外の行為をする権限を有する。
- 商法25条2項／会社法14条2項。その代理権に加えた制限も、善意の第三者に対抗することができない。
- 商法26条／会社法15条。物品の販売等を目的とする店舗の使用人は、その店舗に在る物品の販売等をする権限を有するものとみなす。ただし、相手方が悪意であったときは、この限りでない。

**書かない:** 代理商・仲立人・問屋。代表取締役349条（この図の対比ではない）。他の支配人を選任できない。表見支配人に裁判上まである。一部使用人に裁判上の一切。店舗使用人に営業全体の包括代理。図面にブランド名。

用語: 裁判上＝訴えの提起・応訴など。裁判外＝契約・催告・解除など。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 一切できるのは支配人。ほかは行為の範囲が狭い |
| 中央メタファー | 4行の権限表（行ゼブラ） |
| 判断軸 | 何のために置かれた使用人か。裁判上まで渡すのは支配人だけ |
| ひっかけ | 支配人は裁判外だけ／表見＝本物／一部に裁判上／店舗に包括代理 |
| 暗記 | 支配人は両方。表見・一部は裁判外。店舗は店にある物の販売等 |
| 役割 | 支配人（営業所の営業を任された）／一部使用人（特定の事項だけ任された） |

## PRE-GENERATE-CHECK

法律・型・見えやすさ。条文は上表。答え帯は21条1項の結論と矛盾しない。GOとYESを混在させない。` ```text ` にブランド名なし。帽子は独立した薄い水色（耳・ヘルメット禁止）。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
Topic: commercial employees — who may do all judicial and extra-judicial acts.
商法21・24・25・26条。会社法11・13・14・15条は同じ構造。
Learning goal: Only 支配人 may do all 裁判上 and 裁判外 acts for the business.
表見支配人 and 一部使用人 are limited to 裁判外. 店舗使用人 is limited to sales of goods in that store.

Match LAYOUT of「主宰者の許可」: left green 論点 / right orange ひっかけ,
ONE center metaphor (comparison TABLE), bottom 判断軸 / ひっかけ / 暗記,
warm off-white, 16:9, large Japanese gothic, no overlapping text.

STRICT:
- Left heading「論点」. Right heading「ひっかけ」.
- 論点 is Q&A. YES/NO or short words only. No GO/STOP badges.
- Never write「だれが」「問が聞くこと」「（聞かない）」.
- Never print あぷし, @appshi113, Gyosei Quest, or gyoseiquest anywhere on the image.
- Table is CENTER only. Header navy. Data rows alternate WHITE then LIGHT GRAY by ROW (not by column).

Labels under people (role only):
「支配人（営業所の営業を任された）」
「一部使用人（特定の事項だけ任された）」

Title:「商業使用人 — 裁判上まで渡すのは支配人」
Chip:「ほかは行為の範囲が狭い」

Center ONLY: one table. Columns: 誰 | 裁判上 | 裁判外 | 商法
Four data rows, short Japanese:
1. 支配人 | 一切できる | 一切できる | 21条1項
2. 表見支配人 | ない | 一切（みなす。相手方悪意は除外） | 24条
3. 一部・特定事項の使用人 | ない | その事項の一切 | 25条
4. 店舗の使用人 | ない | 店舗に在る物品の販売等（みなす） | 26条
Tiny footnote under table:「会社法は11・13・14・15条。内部制限は善意の第三者に対抗できない（21条3項）。支配人は他の使用人を選任・解任できる（21条2項）」.
Do not add 代理商, 仲立人, 問屋, 代表取締役. Do not write「他の支配人を選任できない」.

Left 論点 ONLY:
1. 支配人は裁判上もできる？ → YES（21条1項）
2. 表見支配人は？ → 裁判外のみ（24条）
3. 一部使用人は？ → その事項の裁判外（25条）
4. 店舗使用人は？ → 店にある物の販売等（26条）

Right ひっかけ ONLY:
1. 支配人の権限は裁判外に限る
2. 表見支配人＝本物の支配人（裁判上まで同じ）
3. 一部使用人に裁判上の一切を含める
4. 店舗使用人に営業全体の包括代理を認める

Bottom:
- 判断軸:「何のために置かれた使用人か。裁判上まで渡すのは支配人だけ（21条）」
- ひっかけ:「表見は裁判外。支配人と同一視するな（24条）」
- 暗記:「支配人は両方。表見・一部は裁判外。店舗は店にある物の販売等」
Answer capsule:「支配人は営業に関する一切の裁判上又は裁判外の行為をする権限を有する。表見支配人および一部使用人の権限は裁判外が基本である。」

Guide: one ちゃちゃロット only, SMALL bottom-right margin, wooden pointer to 暗記.
Green lecturer suit, white shirt, green trousers, shoes. Not a scene character.
No nameplate. Not a bear, owl, cat, or raccoon.
Hat: a SEPARATE thin light-blue hat sitting ON the head. Two round side mounds, lower center mound, long smooth brim. The hat has a smiling closed-eye face. The hat is NOT ears, not an animal head, not a helmet, not a cap, not a triangle hat, not a hood.
No overlapping text. Space between boxes. Large type.
```

## 目視チェック（生成後）

- [ ] 四隅・フッターにブランド名がない
- [ ] 帽子が耳・ヘルメットになっていない
- [ ] 表見・一部に裁判上がある、と読める誤誘導がない
- [ ] 21条2項が「他の支配人は選任できない」になっていない
- [ ] 表は横ゼブラ。代理商が混入していない

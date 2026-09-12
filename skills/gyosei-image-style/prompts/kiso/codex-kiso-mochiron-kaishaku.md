# Codex用 — 勿論解釈（雨水と雪解け水）

LEC公開２・問１の定番例。**絵を見比べれば、規定の趣旨から当然に同じ結論になる**ことが分かる1枚。

- 保存先: `assets/images/deepdive/learn/kiso/mochiron-kaishaku.png`
- 画像キー: `learn/kiso/mochiron-kaishaku`
- 代替テキスト: 雨水と雪解け水を、屋根の雨どいから直接隣地へ注ぐ場面の比較。民法218条の趣旨から、雪解け水の場合も同様に禁止するとする勿論解釈。

## 法律の芯（崩すな）

民法218条：「土地の所有者は、直接に雨水を隣地に注ぐ構造の屋根その他の工作物を設けてはならない。」

- 禁止の対象は、雨や雪そのものではない。**屋根その他の工作物の構造**により、水を隣地へ**直接に注ぐ**こと。
- 条文が明記するのは**雨水**。雪解け水は条文に書いていない。
- 勿論解釈：隣地へ直接注ぐ構造を禁じる**規定の趣旨**から考えれば、雪解け水についても当然に同じ結論（同様に禁止）となる。
- 214条の自然流水（低地へ自然に流れる水）とは別場面。

**書かない／描かない**

- 「大きい方が禁止なら、小さい方も禁止」を勿論解釈の意味として見せる。
- 物の大小・水量の多少を判断基準にする。
- 自動車禁止→原付禁止。車進入禁止→飛行機禁止（この1枚の仕事ではない。既存 `kaishaku-4type` 側）。
- 雪の塊が隣地へ落ちる絵。
- 雨や雪に禁止マークを付ける。
- 雪解け水が条文に書いてあるように見せる（右に「民法218条」を置かない）。
- 問題文・肢の全文。

## この1枚の仕事

同じ2軒の家を、左＝雨の日（条文に書かれた場面）、右＝雪解けの日（当然に同じ結論）。  
家の形・敷地境界・雨どい・隣家の庭は左右で一致。違うのは天候と水の由来だけ。

## レイアウト例外（てらしぃ指定）

あぷし型の論点パネル・ひっかけパネル・底部3カード・表は**使わない**。  
画面の約8割を場面イラストにする。横長。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 勿論解釈 |
| 中央メタファー | 同じ雨どいから隣地へ直接注ぐ水（雨／雪解け） |
| 判断軸（図中には書かない） | 規定の趣旨。直接隣地へ注ぐ構造かどうか |
| ひっかけ（図中には書かない） | 大小比較。雨や雪そのものの禁止。自然流水 |
| 暗記（下部1文） | 明記されていなくても、規定の趣旨から当然に同じ結論となる。 |
| 役割 | 案内役は下余白のちゃちゃロットのみ。人物を置くなら隣家の住人 |

## PRE-GENERATE-CHECK

- 法律：218条の主体は土地の所有者。向きは工作物→隣地。雨水が明文。雪解け水は勿論解釈。214条にしない。OK
- 条番号：218。OK
- タイトルは「勿論解釈」のみ。大小比較に誤誘導しない。OK
- 口語（切る／せいなく）なし。OK
- あぷし型パネル／底部3カード：てらしぃ指定で不使用（意図的例外）
- 案内役：ちゃちゃロット1体。緑スーツ。下余白。排水経路を指す。名札なし
- 文字かぶりなし。指定ラベル以外の文字なし

## 配置方針（生成後・Cursor）

既存画像は置き換えない。関係箇所へ**追加**。

- LEC公開２・問１の「もっと深掘る」（`lec_koukai_moshi_round2_learn_content`）
- 基礎法学の勿論解釈カード（見て聞いて覚える。車→飛行機カードとは別カードまたは同カードへの追加）
- 既存 `learn/kiso/kaishaku-4type` は4類型全体図のまま残す

## GPT Image プロンプト

画像参照: `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study infographic from scratch.
Topic: 勿論解釈. One landscape illustration. About 80 percent of the canvas is the scene.
No table. No 論点 panel. No ひっかけ panel. No bottom three cards. No boxed columns.

Learning goal: The viewer sees that, from the purpose of the rule, the same conclusion follows even when the case is not written. The common point is a structure that pours water directly onto the neighboring land. Weather (rain vs snowmelt) is the only difference.

Style: white-based, friendly textbook illustration, clear outlines, slightly pop, high contrast. Water is blue. Prohibition marks are red. Title is navy. Bold Japanese gothic, large enough to read on a phone. Warm off-white margins. 16:9.

Title at top center, navy:「勿論解釈」
No other title. No brand names anywhere.

ONE scene, split left and right, same two houses.
Left house and right house must match: roof shape, eave, downspout (雨どい) position, lot boundary line, neighboring garden.
A clear property-boundary line runs between the houses. The downspout crosses that line and pours water directly onto the neighbor's garden. A puddle sits in the neighbor's garden. The water path and the boundary must be obvious at a glance.

LEFT (written case):
Rainy day. Rain falls on the roof. The same downspout pours rainwater directly across the boundary into the neighbor's garden. Puddle in that garden.
Red prohibition mark on the drainage path of the downspout, not on the rain clouds and not on raindrops in the sky.
Short labels only:
「雨水」
「隣地へ直接注ぐ構造は禁止」
「民法218条」

RIGHT (same conclusion by 勿論解釈):
Same houses. Snow on the same roof melts under a small sun. Melted water (not falling snow chunks) flows through the same downspout into the same neighboring garden. Same puddle location.
White snow on the roof and a small sun. Same red prohibition mark on the same drainage path.
Short labels only:
「雪解け水」
「同様に禁止」
Do NOT put「民法218条」on the right. Do not make snowmelt look written in the statute.

CENTER: one thick arrow from left scene to right scene.
Beside the arrow, short only:
「規定の趣旨から当然に」

BOTTOM margin, no box, one sentence only:
「明記されていなくても、規定の趣旨から当然に同じ結論となる。」

Guide character: ちゃちゃロット, ONE only, SMALL in the bottom margin.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer.
Point the pointer at the shared drainage path (the downspout crossing the boundary), not at the title and not at the bottom sentence.
Match the approved smiling-hat identity: independent light-blue hat with a nico-nico face sitting ON the head, not ears, not animal head, not hoodie.
Not a scene character. No nameplate. Do not cover water, houses, labels, or the arrow.
If a person appears in the scene, draw only a neighbor in the neighboring garden. Do not add a second guide.

STRICT:
- Do not prohibit rain or snow themselves.
- Do not draw water flowing naturally downhill across bare land (that is a different rule).
- Show a roof-and-downspout STRUCTURE pouring water directly onto the neighboring land.
- Do not use size or volume as the reason (no big vs small comparison).
- Do not draw snow chunks falling.
- Exact on-image Japanese only: 勿論解釈 / 雨水 / 隣地へ直接注ぐ構造は禁止 / 民法218条 / 雪解け水 / 同様に禁止 / 規定の趣旨から当然に / 明記されていなくても、規定の趣旨から当然に同じ結論となる。
- No English labels. No extra captions.
```

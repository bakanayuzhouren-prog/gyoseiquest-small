# Codex用 — 先取特権｜優先弁済の範囲と限界（LEC公開２・問30・1枚目）

既存の `sakidori-kihon` / `sakidori-q30` プロンプト・PNGはなし。新規。記述式の333条図（占有改定）とは別シリーズ。置き換えない。

- 保存先: `assets/images/deepdive/learn/minpo/sakidori-kihon.png`
- 画像キー: `learn/minpo/sakidori-kihon`
- 代替テキスト: 先取特権の定義と、養育費の優先額上限・修理時計の引渡し後行使不能を左右に並べた仕組み図。優先弁済の制限は債権の消滅を意味しない。

## 学習者の状況（図に書かない）

ア・エを正しいと思い、組合せ2を選んだ。正解は4（イ・オ）。イ・ウ・オは理解済みと扱わない。この1枚はア・エの混同を切る。

模試の解説画像は topics に「なし」。解説冊子を確認済みとは書かない。

## 法律の芯（崩すな）

定義（303条）: 先取特権者は、この法律その他の法律の規定に従い、その債務者の財産について、他の債権者に先立って自己の債権の弁済を受ける権利を有する。法定担保物権。抵当権のような設定契約で成立するものではない。

**左＝ア（金額）**

- 一般の先取特権。対象は債務者の総財産（306条。子の監護の費用は3号）。
- 308条の2: 各期の定期金のうち「子の監護に要する費用として相当な額」に限り存在する。相当な額は省令で算定。
- 省令1条（令和7年法務省令第56号）: 一月当たり八万円に、定期金により扶養を受けるべき子の数を乗じた額。施行は令和8年4月1日（現行）。
- 自作例: 子1人、取決め月10万円。優先弁済の対象は月8万円まで。残り2万円の養育費債権は残る。10万円の債権そのものを8万円に減らす絵にしない。
- **法定養育費（766条の3・省令2条の月2万円）は図に出さない。** 8万円と混ぜない。

**右＝エ（引渡し後）**

- 動産の保存の先取特権（320条）。修理代は保存のために要した費用。
- 自作例: 所有者Bが修理業者Aに時計の修理を依頼。修理代未払い。Bが時計を受け戻したあと、買主Cへ売却し引き渡す。Aが時計を留置している場面にしない。留置権を中央に混ぜない。
- 333条: 債務者がその目的である動産をその第三取得者に引き渡した後は、その動産について行使することができない。
- Bに対する修理代債権は残る。優先回収できないことと、代金を請求できないことを分ける。

下部の区別: 債権＝代金や費用の支払を求める権利。先取特権＝法律の定める範囲で優先弁済を受ける権利。

**書かない／描かない**

- 模試の問題文・肢・解説全文。出版社。ブランド。
- 法定養育費・月2万円。債務名義の要否の詳細。
- 留置権。修理業者が時計を預かっている絵。
- 「優先できない＝債権消滅」
- 10万円の棒を8万円一本に縮める絵。

## この1枚の仕事

優先弁済の範囲（いくら）と限界（引渡し後）を、左右の具体例で見せる。5肢表は2枚目。

## レイアウト例外（てらしぃ指定）

論点パネル・ひっかけパネル・底部3カードは**使わない**。国会の権能図と同じく、深い紺の外枠。中央は大きな2場面。下に短い2行表。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 先取特権｜優先弁済の範囲と限界 |
| 中央メタファー | 左＝10万円の棒を8＋2。右＝時計がBからCへ渡る |
| 判断軸（図中の小表） | 債権と先取特権 |
| ひっかけ（図に書かない） | 全額が優先。引渡し後も追える。優先できない＝債権消滅 |
| 暗記 | 優先弁済の制限は、債権の消滅を意味しない。 |
| 役割 | ちゃちゃロット1体。下余白 |

## PRE-GENERATE-CHECK

- 8万円は省令1条・子1人・月額の上限。2万円と混ぜない。OK
- 債権10万円は残る。棒は分割であり縮小ではない。OK
- 333条は引渡し後その動産について行使できない。債権は残る。留置権なし。OK
- 320条＝保存。303条＝定義。OK
- 口語なし。OK
- あぷし型パネル：てらしぃ指定で不使用
- 行背面（小表）: 白／薄いグレー交互
- 案内役：ちゃちゃロット1体。緑スーツ。金額・時計を隠さない
- ```text``` にブランド名なし

## 配置方針（生成後・Cursor）

アプリ編集は今回しない。生成後の順は `sakidori-kihon` → `sakidori-q30`。

- **LEC公開２・問30**「もっと深掘る」: `src/lec_koukai_moshi_round2_learn_content.js`（source: 問30）と `data/moshi/lec-koukai-2026-round2-topics.json` の `leckoukai-r2-q30-先取特権`
- **見て聞いて覚える・民法物権**: 「先取特権の引渡しに占有改定は含まれる」「先取特権は債務者の所有物についてのみ成立する」
- **ぷらす／記述**: 333条・占有改定のカード。この図は「現実の引渡し」例。占有改定は混ぜない

## 出典

- 民法303条・306条3号・308条の2・320条・333条（e-Gov）
- 令和7年法務省令第56号1条（一月当たり八万円×子の数）。施行令和8年4月1日
- 法務省「養育費に関する法務省令の概要」（8万円と法定養育費2万円の区別。図には後者を載せない）
- 法務省動産登記Q&A（333条の説明）
- topics 問30（解説画像なし。問題画像 `PXL_20260911_082130325.jpg` は転載せず）

## GPT Image プロンプト

画像参照: `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape, high resolution, one sheet.
Deep navy outer frame. White interior. Bold Japanese gothic. Wide padding. Thin rules. Soft shadow. Small gold and teal accents only.
No strong glow. No 3D letters. No large ornaments. No brand names. No publisher names. No exam paper copy.

Title, navy, centered:「先取特権｜優先弁済の範囲と限界」

No 論点 panel. No ひっかけパネル. No bottom three cards.

TOP definition box, navy outline, white fill, two lines:
「法律が定める債権について、他の債権者に先立って弁済を受ける権利」
「法定担保物権〔303条〕」

CENTER: two large independent scenes, equal width. Big pictures. Short labels only.

LEFT scene heading (navy bar, white type):「アの理解｜いくらまで優先されるか」
Draw one horizontal bar of 養育費月10万円. Split the SAME bar into two segments. Do not shrink the whole bar to 8万円.
Left segment, about 80 percent, teal:「8万円」「先取特権による優先弁済の対象」
Right segment, about 20 percent, light amber:「2万円」「養育費債権は残る」
Caption under the bar:「子1人・月額」「上限は省令」
Tiny statute line:「306条・308条の2・関係省令」
Do not draw 法定養育費. Do not write 2万円 as the privilege cap.

RIGHT scene heading (navy bar, white type):「エの理解｜引渡し後も追えるか」
Flow left to right, three stations. A clock moves.
1. 修理業者A（修理代未払い）
2. 所有者B（時計を受け戻す）
3. 買主C（第三取得者への引渡し）
Arrow labeled「売却・引渡し」from B to C. The clock is in C's hands at the end.
Conclusion under the flow, navy:「引渡し後、その時計に先取特権を行使できない〔333条〕」
Note:「Bに対する修理代債権は残る」
Tiny statute:「動産保存〔320条〕」
Do not show A keeping the clock. No 留置権. No padlock on A.

BOTTOM small 2-row table. Columns「区別するもの」「意味」. Header navy, white type.
Row1 white:「債権」「代金や費用の支払を求める権利」
Row2 light gray:「先取特権」「法律の定める範囲で優先弁済を受ける権利」

BOTTOM memory line:
「優先弁済の制限は、債権の消滅を意味しない。」

Guide: ちゃちゃロット, ONE only, SMALL in the bottom margin.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer.
Match the approved smiling-hat identity: independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover amounts, the clock, arrows, or the memory line. No nameplate.

Exact on-image Japanese only: title, definition, two headings, bar labels, flow labels, conclusion, note, small table, memory line, and the listed article tags.
No English. No extra captions.
```

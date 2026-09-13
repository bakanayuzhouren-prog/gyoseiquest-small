# Codex用 — 建物収去・土地明渡請求（LEC公開２・問29・1枚目）

既存の同名プロンプト・PNGはなし。新規1枚。表が主役。問20（規制権限の不行使）ではない。

- 保存先: `assets/images/deepdive/learn/minpo/bukken-seikyu-q29.png`
- 画像キー: `learn/minpo/bukken-seikyu-q29`
- 代替テキスト: 建物収去・土地明渡請求の5肢判断表。未登記譲渡の相手方は現所有者。名義だけの者は収去義務なし。物権的請求は独立の消滅時効にかからず、単独譲渡できない。自己の意思で登記した者は名義を残す限り義務を免れない。

## 法律の芯（崩すな）

共通前提（各行は独立した事例。Cの立場は行ごとに違う）:

- A＝土地所有者
- B＝Aの土地に無断で建物を建てた者
- C＝その行だけの第三者

| 肢 | 元の肢の正誤 | 正しい結論 | 理由の芯 | 根拠 |
|---|---|---|---|---|
| 1 | ○ | 相手方はC | 現在の建物所有者はC。未登記という理由だけでBを相手にしない | 176条。最判昭47.12.7。最判平6.2.8の原則（現に建物を所有して土地を占拠する者） |
| 2 | ○ | Cは収去義務を負わない | Cは建物を取得していない単なる登記名義人。収去する権能がない | 名義だけの者と、所有後に名義を残した者は別（肢4と対） |
| 3 | ○ | Bは消滅時効を援用できない | 所有権に基づく物権的請求権は、所有権と独立して消滅時効にかからない | 166条2項は所有権を除外。大判大5.6.23。相手方の取得時効は別問題 |
| 4 | × | **義務を免れない** | Bは建物を所有し、自らの意思で登記した。譲渡後もB名義を残す限り、所有権の喪失を主張して免れない | 最判平6.2.8（民集48巻2号373頁） |
| 5 | ○ | 請求権だけの譲渡はできない | 所有権に基づく物権的請求権は、所有権から切り離して譲渡できない。土地所有権を得た者は自分の所有権に基づいて請求する | 206条の作用。所有権の性質と判例 |

最判平成6年2月8日の裁判要旨（原文に合わせる。削るな）:

「建物を取得し、自らの意思に基づいてその旨の登記を経由した」者は、「引き続き右登記名義を保有する限り」、「建物所有権の喪失を主張して建物収去・土地明渡しの義務を免れることはできない」。

取得時効の「所有の意思」（162条）と混同しない。ここは**自らの意思に基づく登記**。

**書かない／描かない**

- 模試の問題文・肢・解説の全文。出版社名。問番号を図の主役にしない。
- 「未登記なら所有権が移らない」
- 「登記名義人は常に義務を負う／常に負わない」
- 肢4の正しい結論の横に×だけ置くこと
- 修繕と収去の混同
- ブランド名

## この1枚の仕事

5肢の**元の肢の正誤**と、**正しい結論**を同じ表で切る。肢4だけ誤りなので、×は「元の肢」に付ける。

## レイアウト例外（てらしぃ指定）

論点パネル・ひっかけパネル・底部3カードは**使わない**。国会の権能図と同じく、深い紺の外枠＋白い本文表が主役。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 建物収去・土地明渡請求 |
| 副題 | 誰に請求する？ 時効・譲渡は？ |
| 判断軸（図中には書かない） | 現所有者か、名義だけか、自己の意思で登記して名義を残したか |
| ひっかけ（図中には書かない） | 未登記＝Bが相手。名義人は常に義務あり／なし。時効で消える |
| 暗記 | 名義だけの者と、所有後に名義を残した者を区別する。 |
| 役割 | ちゃちゃロット1体。下余白 |

## PRE-GENERATE-CHECK

- 対象は問29。問20ではない。OK
- 正誤は元の肢。肢4は「元の肢：×」「正しい結論：義務を免れない」を分ける。OK
- 平6.2.8の条件フレーズはフル。所有の意思と混ぜない。OK
- 166条2項は所有権除外。すべての物権が時効にかからない、とは書かない。OK
- 口語なし。OK
- あぷし型パネル／底部3カード：てらしぃ指定で不使用（意図的例外）
- 表の行背面：横一列ずつ白／薄いグレー。列ゼブラ禁止
- 案内役：ちゃちゃロット1体。緑スーツ。表を隠さない
- ```text``` にブランド名なし

## 配置方針（生成後・Cursor）

この枚の次に `-2` を置く。既存図は置き換えない。

- **LEC公開２・問29**「もっと深掘る」: `src/lec_koukai_moshi_round2_learn_content.js`（source: 問29）と `data/moshi/lec-koukai-2026-round2-topics.json` の `leckoukai-r2-q29-物権的請求権`。先頭に `[[image:learn/minpo/bukken-seikyu-q29]]`、続けて `-2`。
- **見て聞いて覚える・民法物権**: 「B名義のまま…義務を免れない」「未登記のままCに譲渡…義務を負わない」「現実に土地を占有…Cに建物の収去を求めなくてはならない」
- **ぷらす**: `src/tac_learn_content.js` の「登記名義を残していれば妨害排除請求の相手となり得る」

## 出典

- 民法166条2項・176条・177条・206条（e-Gov）
- 最判平6.2.8・民集48巻2号373頁（裁判所サイト系の裁判要旨）
- 最判昭47.12.7、最判昭35.6.17（未登記譲渡・原則の相手方）
- 大判大5.6.23（所有権に基づく物権的請求の消滅時効）
- `data/moshi/lec-koukai-2026-round2-topics.json` 問29、問題画像 `PXL_20260911_081816355.jpg`（転載せず論点のみ）

## GPT Image プロンプト

画像参照: `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape, high resolution, one sheet.
Deep navy outer frame. White table inside. Bold Japanese gothic. Wide padding. Thin rules. Soft shadow. Small gold and teal accents only.
No strong glow. No 3D letters. No large ornaments. No brand names. No publisher names. No exam paper copy.

Title, navy, centered:「建物収去・土地明渡請求」
Subtitle under the title:「誰に請求する？ 時効・譲渡は？」

No 論点 panel. No ひっかけ panel. No bottom three cards. The table is the main subject.

TOP, one compact premise box, navy outline, white fill:
「共通前提（各行は独立した事例）」
「A＝土地所有者　B＝Aの土地に無断で建物を建てた者　C＝各行の第三者」
「Cの立場は行ごとに違う。固定して読まない。」

One table. Four columns. Header bar navy, white type, thin teal accent:
「肢」「事例・判断対象」「正誤と結論」「理由」
Data rows zebra: row1 white, row2 light gray, then alternate. Do not color whole columns.
Wrap long Japanese. Do not shrink type to cram. Leave gaps between columns.

Row 1 (white):
肢「1」
事例「Bが未登記の建物をCへ譲渡」
正誤と結論「元の肢：○」「正しい結論：相手方はC」
理由「現在の建物所有者はC。未登記という理由だけでBを相手にしない。」

Row 2 (light gray):
肢「2」
事例「建物を取得していないCが、Bとの合意で保存登記の名義人となった」
正誤と結論「元の肢：○」「正しい結論：Cは収去義務を負わない」
理由「Cは単なる登記名義人。建物を収去する権能がない。」

Row 3 (white):
肢「3」
事例「Aが請求できる時から20年経過」
正誤と結論「元の肢：○」「正しい結論：Bは消滅時効を援用できない」
理由「所有権に基づく物権的請求権は、所有権と独立して消滅時効にかからない。」

Row 4 (light gray). Only this row uses red, and only on the original-verdict label:
肢「4」
事例「Bが建物を所有し、自らの意思で登記。その後Cへ譲渡したがB名義を残した」
正誤と結論, two stacked lines:
「元の肢：×」（red, bold）
「正しい結論：義務を免れない」（navy, not red）
Do not put a red × beside「義務を免れない」.
理由「Bは所有権の喪失を主張して、建物収去・土地明渡義務を免れない。」

Row 5 (white):
肢「5」
事例「Aが土地所有権を残したまま、請求権だけをCへ譲渡」
正誤と結論「元の肢：○」「正しい結論：請求権だけの譲渡はできない」
理由「所有権に基づく物権的請求権は、所有権から切り離して譲渡できない。」

BOTTOM, one memory line only:
「名義だけの者と、所有後に名義を残した者を区別する。」

Guide: ちゃちゃロット, ONE only, SMALL in the bottom margin.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer.
Match the approved smiling-hat identity: independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover the table or the memory line. No nameplate.

Exact on-image Japanese only: title, subtitle, premise box, column headers, the five rows as specified, and the memory line.
No English. No extra captions. No article dump. No character names on nameplates.
```

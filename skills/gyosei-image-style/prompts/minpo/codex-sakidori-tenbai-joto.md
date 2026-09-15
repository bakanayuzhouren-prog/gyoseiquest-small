# 転売代金債権の譲渡と先取特権（2／2）

てらしぃ依頼: ① `codex-sakidori-tenbai-butsujodaii.md` の続き。BのCに対する転売代金債権をDへ譲渡したときの優劣。AのBに対する売買代金債権の譲渡ではない。
**生成はてらしぃが Codex に「画像生成して」と言うまでしない。** Cursor は描かない。アプリ実装・正本追記は今回しない。

見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 保存先: `assets/images/deepdive/learn/minpo/sakidori-tenbai-joto.png`
- 画像キー（生成後）: `learn/minpo/sakidori-tenbai-joto`

## 既存との切り分け（重複回避）

`sakidori-q30` のイ行は結論一行のみ。この図は時間軸の上下比較。抵当権物上代位（最判昭59.3.20＝対抗要件後でも抵当権者は差押え可）は**詰め込まない**。

## スロット

| スロット | 陣営 | 法律上の役割 | いまのキャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内役（答え帯を指す）。配置は下余白・小さく | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png` |

A・B・C・Dは文字入りの人物枠。譲受人Dを悪役にしない。名簿外マスコット禁止。場面役の許可キャストも置かない。

### 2枚共通の色と矢印（①と同じ）

- A＝紺「売主」／B＝ティール「買主・転売人」／C＝緑「転買人」
- D＝琥珀「債権譲受人」（②のみ）
- 商品移動＝紺実線。債権＝点線。物上代位＝赤。債権譲渡＝琥珀実線（債権のみ。ノートPCをDへ動かさない）
- 差押え＝紫。ラベルは「物上代位による差押え（差押命令がCに送達）」

## 法律（原典）

- 前提は①。304条1項ただし書。差押えの効力発生を基準。申立日では切らない。必要なら「差押命令がCに送達」。
- 467条1項: 指名債権の譲渡は、譲渡人が債務者に通知し、又は債務者が承諾しなければ、債務者その他の第三者に対抗できない。
- 467条2項: 前項の通知又は承諾は、確定日付のある証書によってしなければ、債務者以外の第三者に対抗できない。
- 通知によるときは、確定日付のある証書による通知が**債務者Cに到達した時**が基準。確定日付の日付だけで優劣を決めない。
- 債権譲渡契約の締結だけでは第三者対抗要件は備わらない。
- 最判平成17年2月22日（民集59巻2号314頁）: 動産売買の先取特権者は、物上代位の目的である債権が譲渡され、第三者に対する対抗要件が備えられた後においては、目的債権を差し押さえて物上代位権を行使することはできない。
- 理由: 動産売買の先取特権には公示方法がなく、債権譲受人等の第三者を保護する必要がある。

確認: e-Gov 304条1項・467条。`codex-sakidori-q30.md` のイの射程。記述q007・q008は抵当権側の混同注意（q008は昭59）。この判決を抵当権に一般化しない。

今回譲渡するのは **BのCに対する転売代金債権**。AのBに対する元の売買代金債権をDに渡す図にしない。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 転売代金債権の譲渡と先取特権 |
| 論点 | 差押えと467条の第三者対抗要件の前後 |
| ひっかけ | 契約しただけ。確定日付の日付だけ。申立日。商品をDへ。AのBに対する債権の譲渡 |
| 暗記（答え帯） | 債権譲渡の第三者対抗要件具備後は、差押えによる物上代位はできない。 |
| 役割 | ちゃちゃロット1体。下余白 |

## PRE-GENERATE-CHECK

- 上段: 差押え（効力発生）が先 → Aは優先権を主張できる。OK
- 下段: 467条の第三者対抗要件が先 → Aは物上代位できない。OK
- 467条は確定日付ある証書による通知（到達）又は承諾。日付印の日だけで切らない。OK
- 差押えは送達等の効力発生。申立日ではない。OK
- 抵当権比較を図に入れない。OK
- 口語なし。ブランド名なし。ちゃちゃロット1体。参照PNGは実在パス。案内役は下余白。OK

判定: このプロンプト範囲では全部通す。生成はてらしぃ指示まで行わない。

## GPT Image プロンプト

画像参照（実在）:
- `assets/images/characters/chachalot.png`
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
- `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study infographic from scratch. Landscape, high resolution, one sheet.
Warm off-white. Navy title. Left green「論点」, right orange「ひっかけ」, large center, bottom 判断軸 / ひっかけ / 暗記, navy answer bar.
Bold Japanese gothic. Wide padding. No overlapping text. No brand names. No English. No publisher names. No exam copy.

This is sheet 2 of 2. Same colors as sheet 1:
A navy「売主」. B teal「買主・転売人」. C green「転買人」. Add D amber「債権譲受人」.
Letter boxes only. Do not cast D as a villain. No extra mascots in the center. Do not move the notebook PC to D.

Title:「転売代金債権の譲渡と先取特権」
Chip:「譲渡するのはBのCに対する転売代金債権。最判平成17年2月22日」

TOP mini-map, small:
A → B → C with the same notebook PC as sheet 1.
Amber arrow from B's claim box to D, labeled「転売代金債権の譲渡」
Caption:「Dが取得するのは債権。商品ではない」
Do NOT draw A assigning A's claim against B.

Left 論点, Q&A, short answers. No GO/STOP:
1. 先に差押えが効力を生じた？ → Aは物上代位による優先権を主張できる
2. 先に467条の第三者対抗要件？ → Aは物上代位できない
3. 467条の方法は？ → 確定日付のある証書による通知又は承諾
4. 通知の基準時は？ → Cへの到達時

Center, most of the sheet, TWO stacked timelines. Row backgrounds if a table is used: white then light gray, alternating by row, not by column.

UPPER band, white:
Time:「Aの物上代位による差押え（差押命令がCに送達）」→ その後「Dへの債権譲渡の第三者対抗要件具備」
Conclusion in navy:「Aは物上代位による優先権を主張できる」

LOWER band, light gray:
Time:「Dへの債権譲渡の第三者対抗要件具備」→ その後「Aが物上代位による差押え」
Conclusion in navy:「Aは物上代位できない」

Side note box「第三者対抗要件（467条）」:
今回は通知・承諾による方法。
・確定日付のある証書による、譲渡人Bから債務者Cへの通知
・又は、確定日付のある証書による債務者Cの承諾
通知による場合は、Cへの到達時が基準。
Do not let the calendar date on the certificate alone decide priority.
Do not treat the assignment contract alone as opposing requirements.
Do not use the filing date of the attachment. Use when the attachment takes effect. Short note:「差押命令がCに送達」

Reason bar:「動産売買の先取特権には公示方法がなく、債権譲受人等の第三者を保護する必要がある。」

Right ひっかけ:
- 債権譲渡契約を結んだだけで第三者対抗要件 → ×
- 確定日付の日付だけで優劣が決まる → ×
- 差押えの申立日で決まる → ×
- ノートPCをDに譲渡した → ×
- 譲渡したのはAのBに対する売買代金債権 → ×
- 抵当権と同じく対抗要件後でも差押え可、と一般化 → ×（図に抵当権の表は置かない）

Bottom cards:
判断軸「先に効力が生じたのは、差押えか、467条の第三者対抗要件か」
ひっかけ「契約のみ。日付印のみ。申立日。商品の譲渡。元の売買代金債権の譲渡」
暗記「債権譲渡の第三者対抗要件具備後は、差押えによる物上代位はできない。」

Navy answer bar, same as 暗記.
Small source:「最判平成17年2月22日」

Guide: ちゃちゃロット. Role: 案内役. Placement: 下余白のみ、小さく1体。中央の登場人物にしない。
Match these existing files:
assets/images/characters/chachalot.png
skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png
skills/gyosei-image-style/assets/approved-chachalot-pointer.png
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer to the answer bar.
Independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover timelines, the 467 box, or the answer bar. No nameplate.

Exact on-image Japanese only as specified.
```

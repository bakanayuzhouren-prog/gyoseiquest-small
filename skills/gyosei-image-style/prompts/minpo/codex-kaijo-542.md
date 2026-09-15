# 民法542条｜催告によらない解除（条文表）

てらしぃ依頼: 解除の問題で使う、542条の①②表を1枚にきれいに描く。元は市販の囲み表。**条文は e-Gov。解説冊子・過去問肢の全文は転載しない。**
**生成はてらしぃが Codex に「画像生成して」と言うまでしない。** Cursor は描かない。アプリ組込みは生成後。

見本レイアウト: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`（密度）。この枚は**条文表型**（国会の権能図・`codex-sakidori-q30.md` と同系）。左右の論点／ひっかけパネルは使わない。中央を表にする。

- 保存先: `assets/images/deepdive/learn/minpo/kaijo-542.png`
- 画像キー（生成後）: `learn/minpo/kaijo-542`

## 既存との切り分け

記述の寄託解除 `codex-q57-kitaku-kaijo.md` とは別。541条の催告解除表は載せない（541は「前条の催告」として名前だけ）。543条は小さな注記のみ。

生成後の配置候補（今回は実装しない）: 問題を解く・債権各論の解除、LEC公開２・問32、見て聞いて覚えるぷらすの解除カード、直前期パック。

## スロット

| スロット | 陣営 | 法律上の役割 | いまのキャラ | 参照（実在パス） |
|---|---|---|---|---|
| 案内 | いい役 | 案内役。答え帯を指す。下余白・小さく1体 | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png` |

中央に場面役は置かない。表を隠さない。

## 法律（e-Gov・現行）

541条（前条）: 相当の期間を定めた催告＋期間内に履行がないときに解除。軽微な不履行は不可。

542条1項: 次に掲げる場合には、債権者は、前条の催告をすることなく、直ちに**契約の解除**をすることができる。
- 一 債務の全部の履行が不能であるとき。
- 二 債務者がその債務の全部の履行を拒絶する意思を明確に表示したとき。
- 三 債務の一部の履行が不能である場合又は債務者がその債務の一部の履行を拒絶する意思を明確に表示した場合において、**残存する部分のみでは契約をした目的を達することができないとき。**
- 四 契約の性質又は当事者の意思表示により、特定の日時又は一定の期間内に履行をしなければ契約をした目的を達することができない場合において、債務者が履行をしないでその時期を経過したとき。
- 五 前各号に掲げる場合のほか、債務者がその債務の履行をせず、債権者が前条の催告をしても契約をした目的を達するのに足りる履行がされる見込みがないことが明らかであるとき。

542条2項: 次に掲げる場合には、債権者は、前条の催告をすることなく、直ちに**契約の一部の解除**をすることができる。
- 一 債務の一部の履行が不能であるとき。
- 二 債務者がその債務の一部の履行を拒絶する意思を明確に表示したとき。

切り分け: 一部不能・一部拒絶でも、残部では目的を達せないときは**1項3号＝契約の解除**。目的を達し得る残部があるときの一部解除は**2項**。2項に「目的を達することができない」は付かない。

543条: 債務の不履行が債権者の責めに帰すべき事由によるものであるときは、債権者は、541条・542条の解除をすることができない。

判例帯（条文表の上。冊子の文章は写さない。結論だけ）:
- 付随義務の不履行にとどまるときは、原則として解除権は生じない（大判昭13.9.30）。契約目的の達成に重大な影響を与えるときは解除が認められることがある（最判昭43.2.23）。
- 同一当事者間の複数の契約であっても、目的が密接に関連し、いずれか一方の履行だけでは契約をした目的全体を達せないと認められるときは、一方の債務の不履行を理由に、他方の契約も解除できる（最判平8.11.12）。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 催告によらない解除（542条） |
| 判断軸 | 催告なし。1項＝契約の解除。2項＝契約の一部の解除。一部不能・一部拒絶では、残部で目的を達せないときだけ1項3号（契約の解除）。残部で目的を達し得るときは2項（契約の一部の解除） |
| ひっかけ | 一部不能なのに常に全部解除。2項にも目的不達成を足す。全部拒絶なのに催告必須。債権者帰責でも解除可 |
| 暗記（答え帯） | 催告なし。1項は契約の解除。2項は契約の一部の解除。 |
| 役割 | ちゃちゃロット1体。下余白 |

## PRE-GENERATE-CHECK

- 1項柱書＝契約の解除。2項柱書＝契約の一部の解除。OK
- 1項3号に「残存する部分のみでは契約をした目的を達することができないとき」をフルで残す。短くして核を落とさない。OK
- 1項5号は全文。前各号に掲げる場合のほか、債務者がその債務の履行をせず、債権者が前条の催告をしても契約をした目的を達するのに足りる履行がされる見込みがないことが明らかであるとき。不履行の要件を落とさない。OK
- 一部不能・一部拒絶の区別は1項3号と2項。1項の全号が目的不達成を要すると読ませない。OK
- 複合契約は同一当事者間であること、一方の債務の不履行を理由に他方を解除できることを落とさない。OK
- 541の催告解除の要件表を同居させない。OK
- 過去問肢（建物焼失など）を図に写さない。OK
- 口語なし。```text``` にブランド名なし。ちゃちゃロットは下余白。参照は実在パス。OK
- 表の行背面は横一列ずつ白／薄いグレー。列ゼブラ禁止。OK
- あぷし型左右パネル: てらしぃ指定の条文表のため不使用。OK

判定: このプロンプト範囲では全部通す。生成はてらしぃ指示まで行わない。

## GPT Image プロンプト

画像参照（実在）:
- `assets/images/characters/chachalot.png`
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
- `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape, high resolution, one sheet.
Deep navy outer frame. White interior. Bold Japanese gothic. Wide padding. Thin rules. No overlapping text.
No brand names. No English. No publisher names. No exam-question reprint. No handwritten circles.

Title, navy, centered:「催告によらない解除（542条）」
Chip:「前条の催告をすることなく、直ちに」

TOP, two compact navy-outline cards, not a wall of prose:
付随義務「原則は解除しない（大判昭13.9.30）。目的達成に重大な影響があるときは解除し得る（最判昭43.2.23）」
複合契約「同一当事者間の複数契約。目的が密接に関連し、いずれか一方の履行だけでは目的全体を達せないときは、一方の債務の不履行を理由に他方の契約も解除できる（最判平8.11.12）」

MAIN: two tables stacked. Header bars navy, white type.
Zebra data rows: first data row white, second light gray, then alternate by ROW. Never color by column. Wrap Japanese. Do not shrink type. Keep every 号 phrase complete.

UPPER table heading:「① 542条1項｜契約の解除」
Columns:「号」「要件」
Row 柱書 (navy tint allowed only on this header-like row): 要件「債権者は、前条の催告をすることなく、直ちに契約の解除をすることができる」
Row 一 (white): 全部の履行不能
Row 二 (light gray): 全部の履行を拒絶する意思を明確に表示
Row 三 (white): 一部の履行不能又は一部の履行拒絶の意思の明確な表示 ＋ 残存する部分のみでは契約をした目的を達することができないとき
  Make 残存する部分のみでは契約をした目的を達することができないとき red.
Row 四 (light gray): 特定の日時又は一定の期間内に履行しなければ目的を達することができない場合に、履行しないでその時期を経過したとき
Row 五 (white): 前各号に掲げる場合のほか、債務者がその債務の履行をせず、債権者が前条の催告をしても契約をした目的を達するのに足りる履行がされる見込みがないことが明らかであるとき
  Do not omit 債務者がその債務の履行をせず or 前各号に掲げる場合のほか.

LOWER table heading:「② 542条2項｜契約の一部の解除」
Same columns.
Row 柱書: 要件「債権者は、前条の催告をすることなく、直ちに契約の一部の解除をすることができる」
  Make 契約の一部の解除 red.
Row 一 (white): 債務の一部の履行が不能であるとき
Row 二 (light gray): 債務者がその債務の一部の履行を拒絶する意思を明確に表示したとき
Do NOT add 目的を達することができない to ② rows.

Small comparison strip between the two tables:
「一部不能・一部拒絶でも、残部では目的を達せない → ①三号（契約の解除）。残部で目的を達し得る → ②（契約の一部の解除）」

Tiny note, not a second statute dump:「543条 債権者の責めに帰すべき事由による不履行では、541条・542条の解除はできない」

BOTTOM answer bar:
「催告なし。1項は契約の解除。2項は契約の一部の解除。」

Guide: ちゃちゃロット. Role: 案内役. Placement: 下余白のみ、小さく1体。中央の登場人物にしない。
Match these existing files:
assets/images/characters/chachalot.png
skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png
skills/gyosei-image-style/assets/approved-chachalot-pointer.png
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer to the answer bar.
Independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover the tables or the answer bar. No nameplate.

Exact on-image Japanese only as specified.
```

# 動産売買の先取特権と物上代位（1／2）

てらしぃ依頼: ①で先取特権と物上代位の基本。②は `codex-sakidori-tenbai-joto.md`。A・B・Cの枠色と矢印の意味は2枚で同じ。
**生成はてらしぃが Codex に「画像生成して」と言うまでしない。** Cursor は描かない。アプリ実装・正本追記は今回しない。

見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 保存先: `assets/images/deepdive/learn/minpo/sakidori-tenbai-butsujodaii.png`
- 画像キー（生成後）: `learn/minpo/sakidori-tenbai-butsujodaii`

## 既存との切り分け（重複回避）

| 既存 | 仕事 |
|---|---|
| `codex-sakidori-kihon.md` | 優先弁済の範囲と限界（監護費用・保存先取特権） |
| `codex-sakidori-q30.md` | LEC問30の5肢表。イに平17を一行だけ |
| `codex-fudosan-chintai-sakidori-q30-u.md` | 不動産賃貸の先取特権。対象は賃借人の動産 |
| **この図** | 動産売買。A→B→C。商品と転売代金債権を分ける |

PNGを `sakidori-kihon` / `sakidori-q30` に上書きしない。抵当権の物上代位（最判昭59.3.20）は書かない。

## スロット

| スロット | 陣営 | 法律上の役割 | いまのキャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内役（答え帯を指す）。配置は下余白・小さく | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png` |

A・B・Cは**文字入りの人物枠**。売主・買主だからといって善悪の配役にしない。カチャドクロ系・名簿外を置かない。ぴっちゅ等の場面役もこの2枚では使わない（枠の色を固定するため）。

### 2枚共通の色と矢印

- A＝紺枠「売主」
- B＝ティール枠「買主・転売人」
- C＝緑枠「転買人」
- 商品の移動＝太い紺の実線。ラベル「ノートPCの売却／転売（引渡し）」
- 担保される債権＝点線。ラベル「AのBに対する売買代金債権」
- 物上代位の対象＝橙の点線。ラベル「BのCに対する転売代金債権」
- 物上代位＝赤い矢印。**Aから「BのCに対する転売代金債権」へ**。AからCへの代金請求の矢印は置かない

## 法律（原典）

- 311条5号: 動産の売買によって生じた債権を有する者は、債務者の特定の動産について先取特権を有する。
- 321条: 動産の売買の先取特権は、動産の代金及びその利息に関し、その動産について存在する。
- 304条1項: 目的物の売却等によって債務者が受けるべき金銭その他の物に対しても行使できる。ただし、払渡し又は引渡しの前に差押えをしなければならない。差押えは先取特権者自身がする。
- 333条: 債務者がその目的である動産をその第三取得者に引き渡した後は、**その動産について**行使することができない。転売代金債権への物上代位（304条）とは別ルート。
- この図の事実: BはAに未払い。CもBに転売代金未払い（払渡し前）。商品は同一のノートPC。

確認: e-Gov 民法304条1項・311条5号・321条・333条。`data/knowledge/quiz/記述/民法/q007.md`（311・321・333・物上代位）。平17の詳細は②。canonical の333条判例は大判大6.7.26（占有改定）。この図は引渡し後の商品追及と物上代位の区別まで。昭32を333条に付けない。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 動産売買の先取特権と物上代位 |
| 論点 | 先取特権はどの債権・どの物か。物上代位はどの債権か。差押えはいつか |
| ひっかけ | AがCに代金請求。引渡し後も商品に行使。差押えなし／払渡し後でも可 |
| 暗記（答え帯） | 転売代金債権に物上代位できる。ただし、払渡し前の差押えが必要。 |
| 役割 | ちゃちゃロット1体。下余白 |

## PRE-GENERATE-CHECK

- 担保される債権＝AのBに対する売買代金。物上代位の対象＝BのCに対する転売代金。向き逆転なし。OK
- AからCへ通常の代金請求権がある図にしない。OK
- 333条は商品自体。304条は転売代金債権。混ぜない。OK
- 差押えは払渡し前。A自身。OK
- Bの役割は「Aに代金未払い。Cに対する転売代金債権を持つ」。CがBに未払いであり、BがCに未払いではない。OK
- 口語なし。```text``` にブランド名なし。ちゃちゃロット1体。参照PNGは実在パス。案内役は下余白。本文を隠さない。OK
- 論点はQ&A。YESとGOを混在させない。人物枠は `役割（何をしたいか）`。OK

判定: このプロンプト範囲では全部通す。生成はてらしぃ指示まで行わない。

## GPT Image プロンプト

画像参照（実在）:
- `assets/images/characters/chachalot.png`
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
- `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study infographic from scratch. Landscape, high resolution, one sheet.
Warm off-white. Navy title. Left green panel「論点」, right orange panel「ひっかけ」, large center scene, bottom 判断軸 / ひっかけ / 暗記, navy answer bar.
Bold Japanese gothic. Wide padding. No overlapping text. No brand names. No English. No publisher names. No exam copy.

This is sheet 1 of 2. Same A・B・C colors as sheet 2.
A navy box「売主」. B teal box「買主・転売人」. C green box「転買人」.
Do not paint A as hero-villain or C as villain. Letter boxes with Japanese role labels only. No extra mascots in the center.

Title:「動産売買の先取特権と物上代位」
Chip:「同一のノートPC。未払いのまま転売」

Left 論点, Q&A, short answers only. No GO/STOP:
1. Aの先取特権は？ → 売買代金と利息を、売った動産で担保（311条5号・321条）
2. 転売後、商品そのものへ？ → 引渡し後は行使できない（333条）
3. 代わりに何へ？ → BのCに対する転売代金債権へ物上代位（304条1項）
4. 条件は？ → 払渡し前に、A自身が差押え

Center, most of the sheet:
Same notebook PC moves: A → B → C.
Navy solid arrows labeled「ノートPCの売却（引渡し）」「ノートPCの転売（引渡し）」.
Under A: 役割（代金を優先回収したい）
Under B: 役割（Aに代金未払い。Cに対する転売代金債権を持つ）
Under C: 役割（転買人。転売代金は未払い）
Facts in two red notes:「BはAに代金未払い」「CはBに転売代金未払い」

Two claim boxes, visually separate from the PC:
Dotted navy:「担保される債権＝AのBに対する売買代金債権」
Dotted orange:「物上代位の対象＝BのCに対する転売代金債権」
Thick red arrow from A to the orange claim box, labeled「物上代位（304条1項）」
Do NOT draw any arrow from A to C labeled 代金請求 or 売買代金.

Small split under the PC:
左「商品そのもの」333条。Cへ引渡し後は、その動産について行使できない。
右「商品に代わる転売代金債権」304条。払渡し前の差押えが必要。

Right ひっかけ:
- AがCに代金を請求できる → ×
- 引渡し後もノートPC自体に先取特権を行使できる → ×
- 差押えなしで物上代位できる → ×
- 払渡し後でも物上代位できる → ×
- 物上代位の対象はAのBに対する代金債権 → ×

Bottom cards:
判断軸「担保される債権と、物上代位の対象債権を分ける。差押えは払渡し前」
ひっかけ「A→Cの代金請求。商品追及と物上代位の混同」
暗記「転売代金債権に物上代位できる。ただし、払渡し前の差押えが必要。」

Navy answer bar, same sentence as 暗記.

Guide: ちゃちゃロット. Role: 案内役. Placement: 下余白のみ、小さく1体。中央の登場人物にしない。
Match these existing files:
assets/images/characters/chachalot.png
skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png
skills/gyosei-image-style/assets/approved-chachalot-pointer.png
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer to the answer bar.
Independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover panels, arrows, claim labels, or the answer bar. No nameplate.

Exact on-image Japanese only as specified.
```

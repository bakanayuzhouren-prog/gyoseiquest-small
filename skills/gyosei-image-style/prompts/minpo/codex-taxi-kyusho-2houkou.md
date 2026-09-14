# Codex 画像プロンプト：使用者の求償は相手で基準が違う

**保存先:** `assets/images/deepdive/learn/minpo/taxi-kyusho-2houkou.png`

生成は Cursor では行わない。てらしぃが Codex に「画像生成して」と言う。

既存の `codex-q53-gyaku-kyusho.md` は被用者から使用者への逆求償。この図は**使用者が払ったあと、誰にどれだけ戻すか**。上書きしない。

## この1枚で見せること

タクシー会社（使用者）が被害者に損害賠償をしたあと、求償の相手が二人いる。

| 相手 | 基準 | 根拠 |
|---|---|---|
| 他の共同不法行為者 | 過失割合に応じた負担部分 | 民法719条。内部求償は過失の割合（通説・判例） |
| 被用者 | 信義則上相当と認められる限度 | 民法715条3項。最判昭51.7.8 |

全額をどちらにも同じ基準で求償できる、ではない。

中央の場面に必ず書く: 業務中の自社運転者と他車運転者の双方の過失による事故で、会社が被害者に全額賠償した。

## PRE-GENERATE-CHECK

- 答案の芯: 共同不法行為者へは過失割合。被用者へは信義則上相当の限度。OK
- 715条1項（使用者責任）・715条3項（被用者への求償を妨げない）・719条。OK
- 最判昭51.7.8は被用者への求償の限度。共同不法行為者側に載せない。OK
- 向き: 使用者→共同不法行為者／使用者→被用者。被用者→使用者（逆求償）はこの図に書かない。OK
- 右パネルは「当然に全額求償できる？ → NO」。短い「全額か」は使わない。OK
- 中央キャプションは上記の事故・全額賠償の一文。OK
- 口語なし。帰責事由・信義則。OK
- 対比2語: 左は共同不法行為者だけ。右は被用者だけ。ひっかけは底部。OK
- 表があれば行ゼブラ。OK
- 案内役: ちゃちゃロット1体。緑スーツ。OK
- ```text``` にブランド名なし。OK

判定: このプロンプト範囲では全部OK。生成はてらしぃ指示まで行わない。

## 配置方針（生成後・Cursor）

- 見て聞いて覚える・債権各論「共同不法行為者に対しては過失割合に応じて求償できる。」
- 同「被用者に対しては信義則上相当と認められる限度で求償できる。」
- 既存の使用者責任カードがあれば同じ図を共有してよい

## GPT Image プロンプト

画像参照: `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape, high resolution, one sheet.
Navy and white base. Bold Japanese gothic. Wide padding. Thin rules. Soft shadow.
Left panel cool blue. Right panel warm amber. Center scene cream.
No brand names. No publisher names. No exam paper copy. No English.

Title, navy, centered:「使用者の求償｜相手で基準が違う」

LEFT panel, heading:「論点（共同不法行為者）」
Do not mention 被用者 or 信義則 in this panel.
Role under a small face: 他車の運転者（内部で負担を分ける）
Q&A only, conclusions YES or short words:
求償できる？ → YES
基準は → 過失割合
条文は → 民法719条
負担の分け方は → 各自の過失の割合

RIGHT panel, heading:「論点（被用者）」
Do not mention 共同不法行為者 or 過失割合 in this panel.
Role under a small face: 自社の運転者（使用者が求償する相手）
Q&A only:
求償できる？ → YES
妨げられない根拠は → 民法715条3項
限度は → 信義則上相当と認められる限度
判例は → 最判昭51.7.8
当然に全額求償できる？ → NO

CENTER: one company building labeled タクシー会社（使用者・被害者に賠償した）
One victim icon labeled 被害者（賠償を受けた）
Under the center scene, exact caption, readable, not overlapping people or arrows:
「業務中の自社運転者と他車運転者の双方の過失による事故で、会社が被害者に全額賠償した」
Navy arrow from company to victim:「損害賠償（715条1項）」
Two outgoing arrows from the company, after the payment:
Teal arrow to the left person:「求償」
Amber arrow to the right person:「求償」
Do not draw an arrow from the employee back to the company.

BOTTOM strip, three cards:
判断軸「誰に求償するかで、過失割合か信義則上相当の限度かが分かれる。」
ひっかけ「どちらにも同じ基準で全額を求償できる」
暗記「他の共同不法行為者には過失割合。被用者には信義則上相当の限度。」

Guide: ちゃちゃロット, ONE only, SMALL in the bottom margin.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer.
Independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover panels, arrows, or the memory line. No nameplate.

Exact on-image Japanese only as specified. No extra captions.
```

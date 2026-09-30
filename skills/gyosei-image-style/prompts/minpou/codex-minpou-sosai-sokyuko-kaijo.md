# 民法・相殺の遡及効と賃貸借の解除

- 保存先: assets/images/deepdive/learn/minnpou/sosai-sokyuko-kaijo.png
- 画像キー: learn/minnpou/sosai-sokyuko-kaijo
- 生成は Codex。Cursor は描かない。
- 見せ方は時系列の3場面。左右パネルと中央表は使わない。底部3カードは置く。
- 根拠: 民法505条1項、506条1項・2項、最判昭和32年3月8日（民集11巻3号513頁）。

## PRE-GENERATE-CHECK

- 相殺の相手は、賃借人の賃料債務と、賃借人が賃貸人に対して持つ同種の金銭債権（505条1項）。解除は債務ではない。解除と賃料債務のあいだに相殺の矢印を引かない。
- 506条2項でさかのぼるのは、その二つの債務の消滅。解除の効力は失われない（最判昭和32年3月8日）。
- 解除の意思表示の時に、不払いは現実にある。その事実を消す矢印は禁止。
- 解除より前に相殺の意思表示があれば、不払いは消え、その不払いを理由とする解除はできない。この順は時刻1の注記だけ。時刻2を「解除できない」にしない。
- 例の金額は40万円同士。45万円と50万円の事例は使わない。
- 比喩の「乗る」「乗らない」は使わない。失われない、効力を生じる、で書く。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 相殺で消えるのは二つの債務で、解除は残る.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Layout is a left-to-right timeline of THREE moments. No left-right doctrine panels. No center comparison table.

Title exactly:「相殺で消えるのは二つの債務。解除は残る」
Chip:「505条・506条」

Moment 1, heading「1. 相殺できる状態」:
Two facing coins of the same amount.
Left coin:「賃料債務 40万円」
Right coin:「反対の金銭債権 40万円」
A double arrow between only these two coins. Label:「同種の債務。ここで相殺の意思表示をすれば、不払いは消える（505条1項）。」
No termination paper in this moment.

Moment 2, heading「2. 解除の意思表示」:
The rent coin is still unpaid. A sealed paper stands apart from the coins.
Paper title:「解除」
Paper body:「不払いは現実にある。賃貸借を終わらせる意思表示。」
No arrow from the opposing claim into this paper.
Caption:「相殺の意思表示は、まだない。」

Moment 3, heading「3. その後の相殺」:
The two coins fade together. A curved arrow goes back only to moment 1.
Arrow label:「二つの債務の消滅だけが、相殺適状の時にさかのぼる（506条2項）。」
The termination paper stays solid and separate.
Caption under the paper, exact:「解除の効力は失われない（最判昭和32年3月8日）。」
A short blocked mark between the coins and the paper. Words:「解除には届かない。」

Bottom three cards:
判断軸:「差し引きの相手は同種の債務か。解除の意思表示は、相殺の意思表示より前か」
ひっかけ:「試験で『解除と賃料債務とを相殺した』と書いてあったら×」
暗記:「相殺は賃料債務と反対の金銭債権。解除は債務ではない。解除後の相殺は、解除を失わせない。」

Roles, fixed:
ぴっちゅ = 賃借人（反対の金銭債権で相殺したい）。Near the opposing-claim coin。参照 assets/images/characters/pitchi.png
タスク亀 = 賃貸人（不払いを理由に解除したい）。Near the termination paper in moment 2。参照 assets/images/characters/task_turtle.png
カチャドクロ = ひっかけ（解除と賃料債務を相殺したと言う）。Small, inside the bottom ひっかけ card only。参照 assets/images/characters/kachadokuro.png
Labels under ぴっちゅ and タスク亀 are the roles above. Never write だれが.
ONE ちゃちゃロット only, small, bottom margin, wooden pointer toward 暗記 without covering letters.
Cream face. Independent pale-sky-blue hat: two round side peaks, low center peak, long brim, closed smiling eyes. The hat is not ears, not a cap, not a hood.
Green lecturer suit including green trousers and shoes, white shirt.
No nameplate. No logos, no watermarks, no brand names.
No owl, bear, tanuki, cat, or unnamed human.
```

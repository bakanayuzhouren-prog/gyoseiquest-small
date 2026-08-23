# 民法記述・第3バッチ画像プロンプト（Q22〜Q31・10問）

てらしぃ向け: **このファイルを Codex に渡す。** 各 ` ```text ` ブロックを **1問ずつ** 生成。Q1-1〜Q21（枝番込み）はアプリ配線済。

- 答案正本: `content/textbook/app/民法記述/01-joubun-jun-shutudai.md`
- 旧 `codex-batch-q12-q21.md` は使わない。
- 参照: レイアウト=`skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png` ／ 顔=`assets/images/characters/chachalot.png` ＋ `approved-smiling-hat-mascot.png` ／ ポーズ=`approved-chachalot-pointer.png` ／ 見出し見本=`codex-q1-126-ronten.md`
- 保存: `assets/images/deepdive/textbook/minpou-kijutsu/q{N}.png`（**既存 q1〜q21 を上書きしない**）
- 生成後X禁止。誤情報チェックは `_image-legal-check.md`。
- 生成後（Cursor）: MDに `[[image:textbook/minpou-kijutsu/q{N}]]` → `npm run generate:deepdive-images` → `npm run bundle:db-textbooks`

| # | 問 | 保存 | 注意 |
|---|----|------|------|
| 1 | Q22 根抵当消滅 | `q22.png` | 確定後＝極度額の払渡し**又は**供託。超過人的債務はひっかけ |
| 2 | Q23 妨害排除 | `q23.png` | 平17.3.10。請求は妨害排除。自己への明渡はひっかけ |
| 3 | Q24 種類債権の特定 | `q24.png` | **取立債務**。分離＋準備完了＋通知。持参債務はひっかけ |
| 4 | Q25 集合動産譲渡担保 | `q25.png` | 種類・所在場所・量的範囲。対抗はひっかけ |
| 5 | Q26 過失相殺 | `q26.png` | 一体関係。418/722ラベル争いはひっかけ |
| 6 | Q27 代位の転用 | `q27.png` | 所有者の妨害排除を代位。占有回収はひっかけ |
| 7 | Q28 連帯と相殺 | `q28.png` | **負担部分限度**。全額免除禁止 |
| 8 | Q29 時効の承認 | `q29.png` | 完成前。主→保証○／保証→主×。完成後は別問 |
| 9 | Q30 第三者弁済 | `q30.png` | 債務者意思反＋**債権者不知**なら有効 |
| 10 | Q31 外観弁済 | `q31.png` | 478。外観＋善意無過失。対抗先後はひっかけ |

次々バッチ: Q32〜Q41。

---

## 全問共通STRICT

- 左見出しは二字「論点」。右「ひっかけ」。論点に **GO／STOP 禁止**。GOとYES混在禁止。「だれが」「問が聞くこと」「（聞かない）」禁止。
- 人物下は `役割（何をしたいか）`。説明中に（〇条）。
- 答え帯は答案の芯と **一字一句同じ**（字数括弧は図に出さない）。
- 日本語はプロンプトの文字列をそのまま。
- **ちゃちゃロット**は従来のフクロウと同じ枠だけ:
  - 下の余白に小さく立つ。**指し棒**で暗記を指す。
  - 中央の登場人物にしない。名札は図に書かない。
  - 顔=`chachalot.png`。ポーズ=`approved-chachalot-pointer.png`。帽子は耳ではない。熊化禁止。
- 16:9 暖色オフホワイト。文字は大きく、重ねない。

各ブロック末尾の CHACHALOT 行は同じ（コピー済）。

---

## Q22 根抵当権の消滅〔398条の22〕

保存: `q22.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q22 (Civil Code 398-22 root mortgage extinction).
16:9 warm off-white. Left header exactly「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP on 論点. Never「だれが」. Copy Japanese exactly.
CHACHALOT: SAME slot as the green owl. SMALL, bottom-right only, wooden 指し棒 pointing at 暗記. Match chachalot.png and approved-chachalot-pointer.png. Not a scene character. No nameplate. Not a bear.

Title:「根抵当の消滅 — 確定後は極度額を払う／供託」
Chip:「超過の人的債務は別」

Left 論点:
1. 確定前の枠内取引の話か？ → NO。問は確定後の消滅
2. 土地を守るには？ → 極度額に相当する金額を払い渡し又は供託（398条の22）
3. 1億3000万を全部払う？ → NO。極度額（1億）で足りる

Center: land with stamp「根抵当 極度額1億」. Coin/safe「払渡し／供託」unlocks the stamp. Small leftover tag「超過3000万＝人的」off to the side.
Labels:「物上保証人（土地を守りたい）」／「債権者（回収したい）」

Right ひっかけ:
- 確定前の枠内取引に逃げる
- 1億3000万全額を土地から払う
- 超過分の人的債務まで消える、と書く

Bottom:
- 判断軸:「確定後。極度額相当を払い渡し又は供託」
- ひっかけ:「超過債務の人的責任は別。問は土地を守る消滅」
- 暗記:「確定後に極度額を払い渡し又は供託すれば消滅できる」
Answer EXACT:
「元本確定後に極度額に相当する金額を払い渡し又は供託すれば、根抵当権を消滅できる。」
```

---

## Q23 抵当権に基づく妨害排除〔最判平17.3.10〕

保存: `q23.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q23 (mortgagee's claim to exclude interference; Saiko Heisei 17.3.10).
The claim to write is 妨害排除. Do NOT make 自己への明渡し the main answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「抵当権の妨害排除 — 不法占有者に請求」
Chip:「自己への明渡は別条件」

Left 論点:
1. 物上代位が事実上困難なとき？ → 妨害排除の場面になり得る
2. 何を請求？ → 抵当権に基づく妨害排除請求
3. 常に自己へ明け渡せ？ → NO。問は妨害排除

Center: mortgaged building with a low-rent tenant blocking 物上代位; mortgagee holds stamp「妨害排除」. Small side tag「自己への明渡＝適切な維持管理が期待できないとき」as trap, not the main road.
Labels:「抵当権者（妨害を止めたい）」／「賃借人（低額賃料で占有）」

Right ひっかけ:
- 自己への明渡しが常に認められる、と書く
- 物上代位の差押だけで終わる

Bottom:
- 判断軸:「不法占有者へ、抵当権に基づく妨害排除」
- ひっかけ:「自己への明渡要件まで広げすぎない」
- 暗記:「不法占有者に対して抵当権に基づく妨害排除請求」
Answer EXACT:
「抵当権者は不法占有者Cに対して抵当権に基づく妨害排除請求をすればよいのである。」
```

---

## Q24 種類債権の特定〔取立債務〕

保存: `q24.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q24 (specification of generic goods; debtor's collection duty).
This Q is 取立債務. Do NOT use 持参債務 timing as the main rule.
Keep three steps: 分離 / 引渡しの準備完了 / 債権者に通知.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「種類物の特定 — 取立債務は分離・準備・通知」
Chip:「持参債務と混ぜるな」

Left 論点:
1. 特定物の現状引渡しか？ → NO。問は種類物の特定
2. いつ特定？ → 目的物を分離し引渡しの準備を完了し、債権者に通知（取立債務）
3. 持参債務と同じ時期？ → NO

Center: warehouse. Goods separated on a pallet「分離」+ stamp「準備完了」+ envelope「通知」. Gate labeled「特定」.
Labels:「売主（取立債務の準備）」／「買主（通知を受ける）」

Right ひっかけ:
- 持参債務の特定時期で書く
- 中等の品質の話だけで終わる

Bottom:
- 判断軸:「取立債務＝分離＋準備完了＋通知」
- ひっかけ:「持参債務の特定時期と混同するな」
- 暗記:「分離し準備を完了したうえ、債権者に通知したとき」
Answer EXACT:
「目的物を分離し引渡しの準備を完了したうえ、これを債権者に通知したときである。」
```

---

## Q25 集合物の譲渡担保

保存: `q25.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q25 (revolving bulk movable assignment-security).
Main point is 範囲の特定 (種類・所在場所・量的範囲). 占有改定/対抗 is a trap, not the answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「集合動産の譲渡担保 — 範囲が特定されれば足りる」
Chip:「対抗要件に逃げるな」

Left 論点:
1. 構成部分が変動すると無効？ → NO。範囲が特定されれば足りる
2. 何で特定？ → 種類・所在場所・量的範囲の指定
3. 問は対抗要件か？ → NO。問は設定できるときの範囲特定

Center: warehouse of changing inventory. Three tags「種類」「所在場所」「量的範囲」lock a frame around the pile.
Labels:「設定者（在庫を担保にしたい）」／「金融機関（範囲の特定を求める）」

Right ひっかけ:
- 占有改定による対抗の話で終わる
- 個別動産の譲渡担保に逃げる

Bottom:
- 判断軸:「種類・所在場所・量的範囲で目的物の範囲が特定されたか」
- ひっかけ:「対抗要件の話に逃げない。問は範囲の特定」
- 暗記:「種類・所在場所・量的範囲の指定などにより範囲が特定」
Answer EXACT:
「種類・所在場所・量的範囲の指定などにより目的物の範囲が特定されたときである。」
```

---

## Q26 過失相殺〔一体関係〕

保存: `q26.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q26 (comparative negligence; close relationship).
Victim B has no fault. The axis is whether driver A is in 身分上・生活関係上の一体関係 with B.
Do not make 418 vs 722 the main answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「過失相殺 — 一体関係なら同乗者側に考慮できる」
Chip:「418と722のラベル争いにするな」

Left 論点:
1. B本人に過失が必要？ → NO。Bに過失がなくても足りる場面がある
2. いつAの過失をB側に考慮？ → 身分上ないし生活関係上一体をなすとみられる関係
3. 問は418か722か？ → NO。問は一体関係

Center: car crash. Driver A and passenger B inside one circle「一体関係」. Court scale pulling A's fault onto B's side.
Labels:「被害者（相殺を争う）」／「運転者（密接な関係）」

Right ひっかけ:
- 418と722の適用ラベル争いで終わる
- 被害者本人の過失が必須、と書く

Bottom:
- 判断軸:「身分上・生活関係上の一体関係か」
- ひっかけ:「418/722のラベル争いに引っ張られるな」
- 暗記:「身分上ないし生活関係上一体をなすとみられる関係」
Answer EXACT:
「Aが被害者と身分上ないし生活関係上一体をなすとみられるような関係にあるときである。」
```

---

## Q27 債権者代位の転用〔423条〕

保存: `q27.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q27 (subrogation used for lessee without possession).
B has no 対抗要件 and no possession. B uses A's ownership-based 妨害排除 by 債権者代位.
Do NOT make 占有回収 the answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「代位の転用 — 所有者の妨害排除を借りる」
Chip:「占有回収と混ぜるな」

Left 論点:
1. 自分の賃借権で足りる？ → NO。対抗要件も占有もない
2. 何をする？ → Aの所有権に基づく妨害排除請求権を債権者代位で行使
3. 占有回収か？ → NO

Center: land occupied by a third party. Lessee B cannot push with 賃借権. Arrow from owner A’s 妨害排除 through B’s hand labeled「代位（423条）」.
Labels:「賃借人（まだ占有していない）」／「所有者（妨害排除の権利者）」

Right ひっかけ:
- 占有回収の訴えで書く
- 賃貸人への債務不履行責任だけで終わる

Bottom:
- 判断軸:「自分の賃借権では足りない→所有者の妨害排除を代位」
- ひっかけ:「占有回収や債務不履行は別。問は代位」
- 暗記:「Aの所有権に基づく妨害排除請求権を債権者代位により行使」
Answer EXACT:
「BはAの所有権に基づく妨害排除請求権を債権者代位により行使すればよいのである。」
```

---

## Q28 連帯債務と相殺〔439条〕

保存: `q28.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q28 (joint and several debt + set-off).
A may refuse performance ONLY up to C's 負担部分 (100万). NEVER write 全額免除.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「連帯と相殺 — 拒めるのは負担部分まで」
Chip:「全額免除と書くな」

Left 論点:
1. 相殺はC本人しかできない？ → それだけでは終わらない。Aの履行拒絶が問題
2. Aは全額払わなくてよいか？ → 負担部分の限度で拒める
3. 限度は？ → Cの負担部分100万円

Center: three shares 100+100+100. C holds opposite claim 300. A blocks only one share「100万まで拒絶」. Other two shares still due.
Labels:「連帯債務者（履行を拒みたい）」／「債権者（全額を求める）」

Right ひっかけ:
- 全額免除と書く
- 相殺はC本人しかできない、で止まる

Bottom:
- 判断軸:「拒めるのは他の連帯債務者の負担部分の限度」
- ひっかけ:「全額免除と書くな」
- 暗記:「Cの負担部分100万円を限度に履行を拒むことができる」
Answer EXACT:
「Aは連帯債務者Cの負担部分である１００万円を限度に履行を拒むことができるのである。」
```

---

## Q29 時効の承認と保証〔457条〕

保存: `q29.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q29 (acknowledgment of prescription before completion; surety).
THIS is 完成前. Do not put 完成後承認／信義則 on 論点 (that is a later Q).
Direction: 主債務者の承認 → 保証人に及ぶ. 保証人の承認 → 主債務に及ばない.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「時効の承認 — 完成前の効力の向き」
Chip:「完成後の世界に踏み込むな」

Left 論点:
1. 完成後の承認・援用の話か？ → NO。問は完成前
2. 主債務者の承認は保証人へ？ → 及ぶ
3. 保証人の承認は主債務へ？ → 及ばない

Center: one-way arrow 主債務者の承認 → 保証人 (green). Reverse arrow 保証人の承認 → 主債務 with STOP (orange).
Labels:「保証人（効力の向きを知りたい）」／「主債務者（完成前に承認した）」

Right ひっかけ:
- 完成後の承認・援用の世界に踏み込む
- どちら向きも同じ、と書く

Bottom:
- 判断軸:「誰の承認か。完成前の効力の向き」
- ひっかけ:「完成後の世界に踏み込まない」
- 暗記:「主への更新は保証人にも及ぶが、保証人の承認は主に及ばない」
Answer EXACT:
「主債務者に対する時効更新の効力は保証人にも及ぶが、保証人の承認は主債務に及ばない。」
```

---

## Q30 第三者弁済〔474条〕

保存: `q30.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q30 (third-party performance).
Axis: debtor's will is opposed, but if the creditor did NOT know that, performance is valid.
Do not mix 債権者の意思に反する型 or 利害関係人型 as the main answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「第三者弁済 — 債務者意思反でも債権者不知なら有効」
Chip:「誰の意思に反するか」

Left 論点:
1. 債務者の意思に反すると常に無効？ → NO
2. 有効になるのは？ → 債権者が債務者の意思に反することを知らなかったとき
3. 利害関係人の弁済の話か？ → NO。問はこの型

Center: third party X paying creditor B. Debtor A says STOP. B has a thought bubble「知らなかった」opening a gate「有効」.
Labels:「第三者（弁済したい）」／「債権者（反対の事実を知らない）」

Right ひっかけ:
- 債権者の意思に反する型と混同
- 利害関係人なら常に有効、で終わる

Bottom:
- 判断軸:「債務者意思反＋債権者がそのことを知らなかったか」
- ひっかけ:「債権者意思反・利害関係人の別型と混同するな」
- 暗記:「債権者が債務者の意思に反することを知らなかったときは有効」
Answer EXACT:
「債権者が債務者の意思に反することを知らなかったときは、第三者弁済は有効である。」
```

---

## Q31 受領権者としての外観への弁済〔478条〕

保存: `q31.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q31 (Civil Code 478 payment to apparent obligee).
Both wheels: 社会通念上の外観 ＋ 善意かつ無過失. Do not end with 対抗要件の到達の先後.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「478条 — 外観の受領権者へ善意無過失で弁済」
Chip:「対抗の先後だけで終わるな」

Left 論点:
1. 真の債権者からの請求を常に払う？ → NO。免責の場面
2. 何が要る？ → 社会通念に照らし受領権者としての外観＋善意かつ過失なく信じた
3. 対抗要件の到達先後の話か？ → NO。問は弁済の効力

Center: debtor A paying a person with badge「受領権者の外観」. Two stamps「外観」「善意無過失」AND-joined. Side trap sign「通知の先後」.
Labels:「債務者（免責されたい）」／「真の債権者（重ねて請求する）」

Right ひっかけ:
- 債権譲渡の通知の到達の先後だけで終わる
- 外観か善意無過失の片方だけ書く

Bottom:
- 判断軸:「社会通念上の外観＋善意無過失が両輪」
- ひっかけ:「対抗要件の先後だけで終わらせない」
- 暗記:「受領権者としての外観を有し、善意かつ過失なく信じたとき」
Answer EXACT:
「社会通念に照らし受領権者としての外観を有し、善意かつ過失なく信じたときである。」
```

---

## 生成後（Cursor）

1. 目視: 論点GO／だれが／又は・かつ／ちゃちゃロットが中央に出ていない／指し棒が暗記向き
2. `q1`〜`q21` を上書きしていない
3. MD配線 → `npm run generate:deepdive-images` → `npm run bundle:db-textbooks`
4. Xは誤情報チェック通過＋てらしぃ目視OKまで禁止

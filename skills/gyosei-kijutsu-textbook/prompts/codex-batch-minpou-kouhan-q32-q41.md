# 民法記述・第4バッチ画像プロンプト（Q32〜Q41・10問）

てらしぃ向け: **このファイルを Codex に渡す。** 各 ` ```text ` ブロックを **1問ずつ** 生成。

- 答案正本: `content/textbook/app/民法記述/01-joubun-jun-shutudai.md`
- **生成対象**: 本ファイルの Q32〜Q41 のみ。量産3（Q22〜Q31）の PNG はアプリ配線済。再生成しない。
- 旧 `codex-batch-q12-q21.md` は使わない。
- 参照: レイアウト=`skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png` ／ 顔=`assets/images/characters/chachalot.png` ＋ `approved-smiling-hat-mascot.png` ／ ポーズ=`approved-chachalot-pointer.png` ／ 見出し見本=`codex-q1-126-ronten.md`
- 保存: `assets/images/deepdive/textbook/minpou-kijutsu/q{N}.png`（**既存 q1〜q21 を上書きしない**。q22〜q31 も上書きしない）
- 生成後X禁止。誤情報チェックは `_image-legal-check.md`。
- 生成後（Cursor）: MDに `[[image:textbook/minpou-kijutsu/q{N}]]` → `npm run generate:deepdive-images` → `npm run bundle:db-textbooks`

| # | 問 | 保存 | 注意 |
|---|----|------|------|
| 1 | Q32 弁済の提供と供託 | `q32.png` | 問は**供託で債務消滅**。口頭提供＝責任免除はひっかけ |
| 2 | Q33 差押えと相殺 | `q33.png` | 差押**前**の自働債権取得 **かつ** 相殺適状。自働債権差押はひっかけ |
| 3 | Q34 契約不適合 | `q34.png` | 知った時から**１年通知＋追完**。解除・減額はひっかけ |
| 4 | Q35 賃貸人たる地位 | `q35.png` | 家賃請求＝**所有権移転登記**。賃借権対抗はひっかけ |
| 5 | Q36 敷金と交替 | `q36.png` | **新賃貸人・明渡後・残額**。旧賃貸人／明渡前はひっかけ |
| 6 | Q37 転貸借の終了 | `q37.png` | 合意解除＝対抗○／法定解除＝対抗×。返還時期はひっかけ |
| 7 | Q38 請負の解除 | `q38.png` | 完成前＋損害賠償＝いつでも。完成後・不適合解除はひっかけ |
| 8 | Q39 寄託 | `q39.png` | 免責＝不知無過失 **又は** 受寄者既知。原則賠償だけで終わらない |
| 9 | Q40 緊急事務管理 | `q40.png` | 善意かつ**無重過失**なら責任なし。有益費・善管はひっかけ |
| 10 | Q41 転用物訴権 | `q41.png` | 対価関係**なし**のとき。常に請求可は禁止 |

次々バッチ: Q42〜Q51。

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

## Q32 弁済の提供と供託〔492条〜495条〕

保存: `q32.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q32 (Civil Code 492-495 tender and deposit).
The answer is 供託 that extinguishes the debt. Do NOT make 口頭の提供 the main answer (that only excuses delay/liability).
16:9 warm off-white. Left header exactly「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP on 論点. Never「だれが」. Copy Japanese exactly.
CHACHALOT: SAME slot as the green owl. SMALL, bottom-right only, wooden 指し棒 pointing at 暗記. Match chachalot.png and approved-chachalot-pointer.png. Not a scene character. No nameplate. Not a bear.

Title:「供託 — 受領拒否なら履行地の供託所へ」
Chip:「口頭提供では債務は消えない」

Left 論点:
1. 口頭の提供だけで債務は消える？ → NO。責任の免除にとどまる（492条）
2. 債務そのものから逃れるには？ → 供託（494条・495条）
3. どこへ供託？ → 債務履行地の供託所

Center: rent envelope blocked by landlord stamp「受領拒否」; a path to a building「供託所」unlocks「債務消滅」. Small side tag「口頭提供＝責任免除だけ」as trap, not the main road.
Labels:「賃借人（債務から免れたい）」／「賃貸人（値上げ額しか受け取らない）」

Right ひっかけ:
- 口頭提供だけで債務消滅、と書く
- 提供と供託を同じ効果にする
- 供託所を履行地以外にする

Bottom:
- 判断軸:「受領拒否を理由に、履行地の供託所へ供託」
- ひっかけ:「口頭提供は責任免除。問は債務消滅の供託」
- 暗記:「受領を拒んだら、履行地の供託所に供託する」
Answer EXACT:
「Bが家賃の受領を拒んだことを理由とし、家賃を債務履行地の供託所に供託すればよい。」
```

---

## Q33 差押えと相殺〔511条〕

保存: `q33.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q33 (Civil Code 511 set-off after attachment).
BOTH are required: acquired the active claim BEFORE attachment, AND both claims are in a set-off-ready state (相殺適状).
Do NOT make「自働債権が差し押さえられた型」the main answer (that is the trap; opposite orientation).
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「差押え対相殺 — 差押前取得かつ適状」
Chip:「自働債権差押は別型」

Left 論点:
1. 差し押さえられたのは？ → 受働債権（預金）。問はこの型
2. 差押債権者に対抗できる？ → 差押え前に自働債権を取得していること（511条）
3. 取得だけで足りる？ → NO。受働債権と自働債権が相殺適状にあることも要る

Center: bank stamp「自働＝貸付」meets a deposit bag stamped「差押」; a checklist with two boxes「差押前取得」「相殺適状」both checked unlocks「対抗可」. Side tag「自働債権が差押＝不可寄り」as trap.
Labels:「銀行（相殺で対抗したい）」／「差押債権者（預金を押さえたい）」

Right ひっかけ:
- 自働債権側が差し押さえられた型と混ぜる
- 差押前取得だけで足りる、と書く（適状を落とす）
- 差押後に取得した自働債権でも対抗できる、と書く

Bottom:
- 判断軸:「差押前の自働債権取得 かつ 相殺適状」
- ひっかけ:「向きを逆にしない。問は受働債権差押」
- 暗記:「差押前に取得し、かつ相殺適状なら対抗できる」
Answer EXACT:
「差押え前に自働債権を取得し、かつ受働債権と自働債権が相殺適状にあるときである。」
```

---

## Q34 契約不適合責任〔562条〜566条〕

保存: `q34.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q34 (Civil Code 562-566 non-conformity; first remedy is 追完).
The answer is notice within 1 year from knowledge PLUS 追完請求. Do NOT make 解除 or 代金減額 the main answer.
Seller's knowledge / gross negligence exception is a trap, not the asked point.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「契約不適合 — １年通知のうえ追完」
Chip:「解除・減額は後段」

Left 論点:
1. まず何をする？ → 追完請求（562条）
2. 種類・品質の不適合で必要な手続は？ → 知った時から１年以内の通知（566条）
3. 解除や減額から入る？ → NO。問は通知＋追完

Center: broken water heater with a calendar stamp「知った時から１年」and a wrench stamp「追完」. Side tags「解除」「代金減額」are smaller and off the main road.
Labels:「買主（直してほしい）」／「売主（追完を求められている）」

Right ひっかけ:
- 解除・代金減額から書き始める
- １年通知を落とす
- 売主が知っていた例外に逃げる

Bottom:
- 判断軸:「知った時から１年以内に通知し、追完請求」
- ひっかけ:「解除・減額は問が聞いていない」
- 暗記:「知った時から１年以内に通知して追完請求」
Answer EXACT:
「買主は契約不適合を知った時から１年以内に通知をし、追完請求をすればよいのである。」
```

---

## Q35 賃貸人たる地位の移転〔605条の2〕

保存: `q35.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q35 (Civil Code 605-2 transfer of lessor status).
C needs 所有権の移転登記 to claim rent. Do NOT make the tenant's 対抗要件 the main answer (that is a different question: whether B can assert the lease).
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「家賃請求 — 新所有者は移転登記」
Chip:「賃借権対抗は別問」

Left 論点:
1. 土地が売れた。地位は移る？ → 原則、対抗要件を備えた譲受人へ（605条の2）
2. CがBに家賃を請求するには？ → 所有権の移転登記
3. Bの建物対抗要件で足りる？ → NO。それは賃借権主張の話

Center: land sold from A to C; C holds an empty registry book then a stamp「所有権移転登記」unlocks「家賃請求」. Side tag「Bの対抗要件＝賃借権主張」as trap.
Labels:「新所有者（家賃を取りたい）」／「賃借人（誰に払うか）」

Right ひっかけ:
- 賃借権の対抗要件と家賃請求要件を取り違える
- 登記なしでも家賃請求できる、と書く

Bottom:
- 判断軸:「新所有者の家賃請求＝所有権移転登記」
- ひっかけ:「Bが主張できるかは別。問はCの請求」
- 暗記:「家賃を取るには所有権の移転登記が要る」
Answer EXACT:
「新所有者Cが家賃を請求するには、所有権の移転登記を備えなければならないのである。」
```

---

## Q36 敷金と賃貸人・賃借人の交替〔605条の2・622条の2〕

保存: `q36.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q36 (deposit / 敷金 after lessor change).
THREE points together: claim against the NEW lessor, AFTER surrender, for the remainder after deducting debts. Missing any one is wrong.
Do NOT make 旧賃貸人 or 明渡前 the main answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「敷金返還 — 新賃貸人・明渡後・残額」
Chip:「明渡前は請求できない」

Left 論点:
1. 誰に請求？ → 新賃貸人（敷金は地位とともに移る）
2. いつ？ → 建物明渡後（622条の2）
3. いくら？ → 敷金から未払債務を控除した残額

Center: key handed back to new landlord C; a deposit box minus a chip「未払債務」equals「残額」. Side tags「旧賃貸人A」「明渡前」crossed as traps.
Labels:「賃借人（敷金を返してほしい）」／「新賃貸人（承継した相手）」

Right ひっかけ:
- 旧賃貸人に請求する
- 明渡前に請求できる、と書く
- 敷金返還債権が新賃借人へ当然に移る、と書く

Bottom:
- 判断軸:「新賃貸人に、明渡後、控除後の残額」
- ひっかけ:「相手・時期・額のどれかを落とさない」
- 暗記:「新賃貸人・明渡後・債務控除後の残額」
Answer EXACT:
「新賃貸人に対し、建物明渡後に、敷金から債務を控除した残額を請求できるのである。」
```

---

## Q37 転貸借の終了〔合意解除と法定解除〕

保存: `q37.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q37 (sublease after head-lease termination).
Split clearly: 合意解除 → subtenant CAN assert; 法定解除 → CANNOT assert the sublease against the owner.
Do NOT make the timing of 返還請求 the main answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「転貸の終了 — 合意は守る／法定は守れない」
Chip:「解除の種類で結論が分かれる」

Left 論点:
1. 合意解除のとき転借人は対抗できる？ → YES
2. 債務不履行の法定解除のとき？ → NO。転借権をもって対抗できない
3. 返還請求の時期が本題？ → NO。問は対抗の可否

Center: two doors. Green door「合意解除」protects subtenant C. Orange door「法定解除」does not. Owner A and tenant B at the head lease.
Labels:「転借人（居続けたい）」／「賃貸人（明け渡してほしい）」

Right ひっかけ:
- 合意も法定も同じ結論にする
- 法定解除でも転借人は常に対抗できる、と書く
- 返還請求の時期に逃げて、対抗の差を書かない

Bottom:
- 判断軸:「合意解除＝対抗可。法定解除＝対抗不可」
- ひっかけ:「時期論に逃げない。問は対抗の差」
- 暗記:「合意なら対抗できるが、法定解除では対抗できない」
Answer EXACT:
「合意解除では転借人は対抗できるが、法定解除では転借権をもって対抗できないのである。」
```

---

## Q38 請負の解除〔642条〕

保存: `q38.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q38 (Civil Code 642 orderer's termination of a contract for work).
Answer: while the work is NOT completed, the orderer may terminate ANY TIME by paying damages. No contractor default is required.
Do NOT make 完成後解除 or 契約不適合解除 the main answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「請負の解除 — 完成前なら損害を払っていつでも」
Chip:「相手の不履行は不要」

Left 論点:
1. 仕事は完成している？ → NO。問は完成前（642条）
2. 注文者は解除できる？ → YES。いつでも。ただし損害を賠償する
3. 請負人の債務不履行が要る？ → NO。通常の催告解除とは別

Center: unfinished building / unfinished suit; orderer places a coin「損害賠償」on a stamp「解除」. Side tags「完成後」「不適合解除」as traps.
Labels:「注文者（都合でやめたい）」／「請負人（完成前に止められる）」

Right ひっかけ:
- 債務不履行がないと解除できない、と書く
- 完成後の解除や不適合解除と混ぜる

Bottom:
- 判断軸:「完成しない間は、損害を賠償していつでも解除可」
- ひっかけ:「541条型の催告解除と取り違えない」
- 暗記:「完成前なら、損害を賠償していつでも解除できる」
Answer EXACT:
「請負人が仕事を完成しない間は、注文者はいつでも損害を賠償して契約を解除できる。」
```

---

## Q39 寄託〔661条〕

保存: `q39.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q39 (Civil Code 661 depositor liability for dangerous/defective goods).
The ASKED point is the EXCEPTION (no liability): depositor without negligence did not know the defect, OR the depositary already knew.
Do NOT stop at the principle「原則賠償」as if that were the whole answer. Use 又は (OR), never かつ for the two exception limbs.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「寄託物の瑕疵 — 原則賠償、免責は不知無過失又は既知」
Chip:「又は。かつ禁止」

Left 論点:
1. 原則は？ → 寄託者は損害を賠償する（661条本文）
2. 免責になる？ → 過失なく瑕疵を知らなかったとき
3. もう一つの免責は？ → 受寄者がこれを知っていたとき（又は）

Center: smelly goods in a warehouse; two escape gates labeled「不知・無過失」and「受寄者既知」with a big「又は」between them. Principle stamp「賠償」in the background, not as the answer bar.
Labels:「寄託者（免責されたい）」／「受寄者（他の保管物が壊れた）」

Right ひっかけ:
- 原則賠償だけ書いて終わる
- 二つの免責を「かつ」でつなぐ
- 過失の有無を無視する

Bottom:
- 判断軸:「免責＝不知無過失 又は 受寄者既知」
- ひっかけ:「原則側だけ書いて問に答えたつもりにならない」
- 暗記:「知らなかった（無過失）とき、又は受寄者が知っていたとき」
Answer EXACT:
「寄託者が過失なく瑕疵を知らなかったとき、又は受寄者がこれを知っていたときである。」
```

---

## Q40 事務管理・緊急事務管理〔697条・698条〕

保存: `q40.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q40 (Civil Code 698 emergency negotiorum gestio).
The asked point is NO damages liability when the manager is in good faith and without gross negligence. Label it 緊急事務管理.
Do NOT make 有益費償還 or ordinary 善管注意義務 the main answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「緊急事務管理 — 善意かつ無重過失なら責任なし」
Chip:「有益費は通常の話」

Left 論点:
1. 通常の事務管理の費用論か？ → NO。問は緊急時の責任（698条）
2. 責任を負わないのは？ → 善意で、重大な過失がないとき
3. 重過失があれば？ → 免責されない

Center: passerby giving emergency aid; a shield stamp「善意・無重過失」blocks a claim balloon「損害賠償」. Side tags「有益費」「善管注意」as ordinary-management traps.
Labels:「管理者（急迫の危害を免れさせたい）」／「相手（傷害の賠償を求める）」

Right ひっかけ:
- 通常の事務管理の有益費に逃げる
- 善管注意義務の話にすり替える
- 重過失があっても免責、と書く

Bottom:
- 判断軸:「緊急事務管理。善意かつ無重過失なら責任なし」
- ひっかけ:「費用償還は別問。問は損害賠償の阻却」
- 暗記:「緊急なら、善意で無重過失であれば責任を負わない」
Answer EXACT:
「緊急事務管理といい、管理者が善意で無重過失であれば損害賠償責任を負わないのである。」
```

---

## Q41 転用物訴権〔703条〕

保存: `q41.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q41 (転用物訴権 / unjust enrichment 703 when improvement benefits the owner).
The contractor C can claim against owner A only when, looking at the lease as a whole, A received a benefit WITHOUT a corresponding 対価関係.
Do NOT write「常に請求できる」. Do NOT make 必要費償還 or 留置権 the main answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「転用物訴権 — 対価関係がない利益のとき」
Chip:「常に請求可と書かない」

Left 論点:
1. 建物が客観的に改良された。常にC→A？ → NO
2. 認められるのは？ → 賃貸借を全体としてみて、Aが対価関係なしに利益を受けたとき（703条）
3. 必要費・留置で足りる？ → NO。問は転用物訴権の成否

Center: remodeler C, insolvent tenant B, owner A; a scale labeled「対価関係」. When the scale is empty「なし」, an arrow C→A「不当利得」opens. When the scale is full, the arrow is blocked.
Labels:「請負人（報酬を取りたい）」／「所有者（対価関係を主張）」

Right ひっかけ:
- 常に所有者へ請求できる、と断定する
- 必要費償還や留置権に逃げる
- 対価関係の有無を書かない

Bottom:
- 判断軸:「賃貸借全体を見て、対価関係なしの利益か」
- ひっかけ:「改良された＝当然に転用物訴権、ではない」
- 暗記:「対価関係なしに利益を受けたと認められるとき」
Answer EXACT:
「賃貸借契約を全体としてみて、Aが対価関係なしに利益を受けたと認められるときである。」
```

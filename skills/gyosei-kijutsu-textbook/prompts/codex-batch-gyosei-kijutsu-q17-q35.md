# 行政法記述・第3バッチ画像プロンプト（Q17〜Q35・19問）

てらしぃ向け: **このファイルを Codex に渡す。** 各 ` ```text ` ブロックを **1問ずつ** 生成。

民法正本は Q53 が最後、行政法正本は **Q35 が最後**。次の20問枠に対し残りは **19問**。足りない1問のために新Qは作らない。この19問を一気に出す。

- 答案正本: `content/textbook/app/行政法記述/01-joubun-jun-shutudai.md`
- 先行: `codex-batch-gyosei-kijutsu-q1-q8.md`／`codex-batch-gyosei-kijutsu-q7-q16.md`（PNG済。**再生成・上書きしない**）
- **生成対象**: Q17〜Q35 のみ
- **上書き禁止**: 民法 `minpou-kijutsu/q1〜q53`（`q1-1` `q11-2` 含む）／行政法 `gyosei-kijutsu/q1〜q16`（`q1-2` `q2-2` 含む）
- 参照: レイアウト=`skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png` ／ 顔=`chachalot.png` ＋ `approved-smiling-hat-mascot.png` ／ ポーズ=`approved-chachalot-pointer.png`
- 保存: `assets/images/deepdive/textbook/gyosei-kijutsu/q{N}.png`
- 生成後X禁止。誤情報チェックは `_image-legal-check.md`
- MDタグは既に入っている。生成後（Cursor）: `npm run generate:deepdive-images` → `npm run bundle:db-textbooks`

| # | 問 | 保存 | 注意 |
|---|----|------|------|
| 1 | Q17 非申請型義務付け | `q17.png` | 重大損害＋補充性。申請型の併合はひっかけ |
| 2 | Q18 差止め | `q18.png` | 重大損害＋避けるため他に方法なし。取消・執行停止で足りるなら落ちる |
| 3 | Q19 争点訴訟 | `q19.png` | 起業者を被告に所有権確認。無効確認に逃げるな |
| 4 | Q20 実質的当事者訴訟 | `q20.png` | 国を被告に地位確認又は給料。無効確認に逃げるな |
| 5 | Q21 違法性の承継 | `q21.png` | 後続取消の中で先行違法を主張。先行単体取消はひっかけ |
| 6 | Q22 訴えの変更 | `q22.png` | 口頭弁論終結まで＋請求の基礎に変更なし |
| 7 | Q23 職権証拠調べ | `q23.png` | 職権可＋**結果について当事者の意見を聴く** |
| 8 | Q24 事情判決 | `q24.png` | 違法宣言＋棄却。利益なし却下と混ぜるな |
| 9 | Q25 民衆訴訟 | `q25.png` | 自己の法律上の利益にかかわらない資格。住民訴訟ラベル禁止 |
| 10 | Q26 国賠前置不要 | `q26.png` | 取消・無効確認の判決は不要。不服審査前置と混ぜるな |
| 11 | Q27 外形標準 | `q27.png` | 1条の職務関連性。2条に広げるな |
| 12 | Q28 代執行 | `q28.png` | 困難＋著しく公益に反。手続・費用で終わらない |
| 13 | Q29 長の再議 | `q29.png` | 予算は**送付を受けた日**から10日＋**出席議員**2／3。議決の日・過半数はひっかけ |
| 14 | Q30 町村総会 | `q30.png` | 条例で議会を置かず選挙権者の総会。現存例は不要 |
| 15 | Q31 住民訴訟 | `q31.png` | 監査先行＋**現職**市長被告。元職を被告にするな |
| 16 | Q32 随意契約 | `q32.png` | 当然無効ではない／特段の事情で**無効**。有効と逆に書くな |
| 17 | Q33 解職請求 | `q33.png` | **所属選挙区**・40万以下は1／3。50分の1（条例・監査）と混ぜるな |
| 18 | Q34 機関訴訟 | `q34.png` | 国地方係争処理委員会→なお不服なら高裁。団体同士ルートは別 |
| 19 | Q35 執行罰 | `q35.png` | 予告＋反復過料。秩序罰・刑罰と混ぜるな |

行政法正本は Q35 が最後。次の行政法図はない。

---

## 全問共通STRICT

- 左見出しは二字「論点」。右「ひっかけ」。論点に **GO／STOP 禁止**。GOとYES混在禁止。「だれが」「問が聞くこと」「（聞かない）」禁止。
- 人物下は `役割（何をしたいか）`。説明中に（〇条）。
- 答え帯は答案の芯と **一字一句同じ**（字数括弧は図に出さない）。
- 日本語はプロンプトの文字列をそのまま。
- **ちゃちゃロット**は下の余白に小さく、**指し棒**で暗記を指す。中央の登場人物にしない。名札禁止。熊化禁止。
- 16:9 暖色オフホワイト。文字は大きく、重ねない。

---

## Q17 非申請型義務付け訴訟〔行訴法37条の2〕

保存: `q17.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q17 (non-application mandamus, Administrative Case Litigation Act 37-2).
Asked point: serious damage from non-disposition PLUS no other suitable means (supplementarity). Trap: application-type mandamus that must be joined with revocation.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「非申請型義務付け — 重大損害と補充性」
Chip:「申請型の併合は別」

Left 論点:
1. 申請型（取消と併合）か？ → NO。申請権のない非申請型
2. 損害は？ → 一定の処分がされないことによる重大な損害のおそれ
3. もう一本は？ → 他に適当な方法がないこと（補充性）

Center: neighbors asking agency to issue a regulation; two stamps「重大損害」and「他に方法なし」. Side tag「申請型＝併合」as trap.
Labels:「近隣住民（規制処分を求めたい）」／「行政庁（処分しない）」

Right ひっかけ:
- 申請型義務付け（取消等との併合）と取り違える
- 重大損害だけ書いて補充性を落とす
- 償うことのできない損害（仮の義務付け）に逃げる

Bottom:
- 判断軸:「されないことによる重大損害＋他に適当な方法がない」
- ひっかけ:「申請型の併合要件は別問。問は37条の2」
- 暗記:「重大な損害のおそれがあり、他に適当な方法がないこと」
Answer EXACT:
「一定の処分がされないことにより重大な損害を生ずるおそれがあり、他に適当な方法がないこと。」
```

---

## Q18 差止めの訴え〔行訴法37条の4〕

保存: `q18.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q18 (injunction, Administrative Case Litigation Act 37-4).
Asked point: risk of serious damage PLUS no other suitable means to avoid it. Trap: revocation or stay of execution would suffice.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「差止め — まだ処分がない入口」
Chip:「取消・執行停止で足りるなら落ちる」

Left 論点:
1. すでに処分があるか？ → NO。まだ処分前＝差止めの入口
2. 損害は？ → 重大な損害を生ずるおそれ
3. 補充性は？ → その損害を避けるため他に適当な方法がないこと

Center: clock before a disposition stamp; two gates「重大損害」and「他に方法なし」. Side stamp「取消・執行停止」with X as trap.
Labels:「名あて人予定者（処分を止めたい）」／「行政庁（これから処分する）」

Right ひっかけ:
- 取消訴訟・執行停止で間に合うのに差止めと書く
- 非申請型義務付け（されないことによる損害）と取り違える
- 重大損害だけ書いて「避けるため他に方法なし」を落とす

Bottom:
- 判断軸:「重大損害のおそれ＋避けるため他に適当な方法がない」
- ひっかけ:「取消・執行停止で足りるなら補充性で落ちる」
- 暗記:「重大な損害のおそれがあり、他に適当な方法がないこと」
Answer EXACT:
「重大な損害を生ずるおそれがあり、その損害を避けるため他に適当な方法がないこと。」
```

---

## Q19 争点訴訟〔行訴法45条関連〕

保存: `q19.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q19 (collateral / 争点訴訟: civil ownership confirmation against the project operator).
Asked point: sue the project operator for confirmation of ownership (so-called 争点訴訟). Trap: invalidity confirmation or formal party litigation.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「争点訴訟 — 起業者を被告に所有権確認」
Chip:「無効確認に逃げるな」

Left 論点:
1. 無効確認か？ → NO。民事で足りるなら無効確認は不可寄り
2. 被告は？ → 起業者
3. 訴えは？ → 所有権確認（いわゆる争点訴訟）

Center: land after expropriation award; civil court file「所有権確認」pointing at project operator, not an admin invalidity stamp.
Labels:「土地所有者（所有を守りたい）」／「起業者（工事に入った）」

Right ひっかけ:
- 無効等確認の訴えに逃げる
- 形式的当事者訴訟と取り違える
- 行政庁を被告にする

Bottom:
- 判断軸:「起業者を被告とする所有権確認＝争点訴訟」
- ひっかけ:「取消・無効確認・形式的当事者訴訟で終わらない」
- 暗記:「起業者を被告として所有権確認（争点訴訟）を提起する」
Answer EXACT:
「起業者を被告として所有権確認の訴え（いわゆる争点訴訟）を提起すればよいのである。」
```

---

## Q20 実質的当事者訴訟〔行訴法4条〕

保存: `q20.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q20 (substantive party litigation: status or salary against the State).
Asked point: sue the State for confirmation of civil-servant status OR salary payment. Trap: invalidity confirmation after missing the revocation deadline.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「実質的当事者訴訟 — 地位確認又は給料」
Chip:「無効確認に逃げるな」

Left 論点:
1. 出訴期間徒過→無効確認か？ → NO。現在の法律関係で足りる
2. 被告は？ → 国
3. 求めは？ → 公務員の地位確認又は給料支払

Center: calendar stamped「出訴期間徒過」; two doors「地位確認」「給料支払」to the State, side stamp「無効確認」with X.
Labels:「公務員（地位・給料を守りたい）」／「国（被告になる）」

Right ひっかけ:
- 無効等確認に逃げる
- 取消訴訟の出訴期間の話だけで終わる
- 被告を行政庁個人にする

Bottom:
- 判断軸:「国を被告に、地位確認又は給料支払」
- ひっかけ:「無効確認は別メニュー。問は実質的当事者訴訟」
- 暗記:「国を被告として地位確認又は給料支払を求める」
Answer EXACT:
「国を被告として、公務員の地位確認又は給料支払を求める訴えを提起すればよいのである。」
```

---

## Q21 違法性の承継〔判例〕

保存: `q21.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q21 (succession of illegality: attack the prior act inside the later revocation suit).
Asked point: file revocation of the subsequent disposition and argue the prior disposition's illegality in that suit. Trap: sue only to revoke the prior act after its filing period expired.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「違法性の承継 — 後続取消の中で先行違法」
Chip:「先行処分だけ取り消すな」

Left 論点:
1. 先行処分単体の取消か？ → NO。出訴期間経過が前提
2. 訴えの対象は？ → 後続処分の取消訴訟
3. 中で何を主張？ → 先行処分の違法性（一連手続・同一効果）

Center: two-step admin process「安全認定→建築確認」; arrow from later act into court, carrying the earlier illegality. Side tag「先行だけ取消」as trap.
Labels:「近隣住民（後続を取り消したい）」／「行政庁（独自違法なしと主張）」

Right ひっかけ:
- 先行処分だけを取り消そうとする
- 後続に独自の違法が必要、と決めつける
- 承継の鍵（一連手続・同一効果）を落とす

Bottom:
- 判断軸:「後続の取消訴訟の中で先行の違法を主張する」
- ひっかけ:「先行単体取消にこだわらない」
- 暗記:「後続取消の中で先行処分の違法性を主張する」
Answer EXACT:
「後続処分の取消訴訟を提起し、その中で先行処分の違法性を主張すればよいのである。」
```

---

## Q22 訴えの変更〔行訴法〕

保存: `q22.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q22 (amendment of claims: until close of oral argument, if the basis of the claim is unchanged).
Asked point: petition to change the action by the close of oral argument, so long as the basis of the claim does not change. Trap: must always file a separate suit.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「訴えの変更 — 口頭弁論終結まで」
Chip:「別訴必須と決めつけるな」

Left 論点:
1. 別訴しかないか？ → NO。係属中の変更があり得る
2. いつまで？ → 口頭弁論の終結まで
3. 条件は？ → 請求の基礎に変更がない限り

Center: pending revocation case switching toward state-compensation claim; clock labeled「口頭弁論終結」. Side tag「別訴のみ」as trap.
Labels:「原告（請求を切り替えたい）」／「裁判所（変更を審理する）」

Right ひっかけ:
- 別訴提起しかない、と決めつける
- 口頭弁論終結の時期を落とす
- 請求の基礎の同一性を落とす

Bottom:
- 判断軸:「口頭弁論終結まで。請求の基礎に変更なし」
- ひっかけ:「別訴必須ではない。問は訴えの変更」
- 暗記:「口頭弁論終結までに、基礎が同じなら変更を申し立てる」
Answer EXACT:
「口頭弁論の終結までに、請求の基礎に変更がない限り、訴えの変更を申し立てるのである。」
```

---

## Q23 職権証拠調べ〔行訴法24条〕

保存: `q23.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q23 (ex officio examination of evidence, Art. 24).
Asked point: the court MAY examine evidence ex officio when necessary, BUT must hear the parties on the result. Trap: stopping at "ex officio is allowed".
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「職権証拠調べ — できるが、意見を聴く」
Chip:「職権可だけで終わるな」

Left 論点:
1. 職権で調べられるか？ → YES。必要があるとき（24条）
2. それで終わりか？ → NO。結果について当事者の意見を聴く
3. 弁論主義だけか？ → 職権の例外がある。問は制約まで

Center: judge taking evidence on own motion; microphone to both parties labeled「意見聴取」. Side tag「職権だけ」as incomplete trap.
Labels:「裁判所（必要があると判断）」／「当事者（結果について意見を述べたい）」

Right ひっかけ:
- 職権可だけで意見聴取を落とす
- 職権証拠調べは一切できない、と書く
- 民事の弁論主義だけで終わる

Bottom:
- 判断軸:「必要なら職権可。ただし結果につき意見を聴く」
- ひっかけ:「職権可だけで答案を閉じない」
- 暗記:「職権で調べられるが、結果について意見を聴く」
Answer EXACT:
「必要があるときは職権で証拠調べができるが、結果につき当事者の意見を聴かなければならない。」
```

---

## Q24 事情判決〔行訴法31条〕

保存: `q24.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q24 (judgment in consideration of circumstances: declare illegality in the main text THEN dismiss the claim).
Asked point: 事情判決 = illegal + public welfare → declare illegality and dismiss. Trap: no standing / no interest → 却下.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「事情判決 — 違法宣言のうえで棄却」
Chip:「利益なし却下と混ぜるな」

Left 論点:
1. 訴えの利益なし＝却下か？ → それは別。本件は利益あり＋公共の福祉
2. 主文で何をする？ → 処分が違法であることを宣言する
3. 請求は？ → 棄却するのが事情判決

Center: completed land-readjustment works; stamp「違法宣言」plus stamp「棄却」. Side trash「却下＝利益なし」as trap.
Labels:「原告（取り消してほしい）」／「裁判所（公共の福祉で棄却する）」

Right ひっかけ:
- 訴えの利益なしとして却下する
- 違法宣言を落とす（棄却だけ書く）
- 認容して取り消す、と書く

Bottom:
- 判断軸:「違法を主文で宣言したうえで請求を棄却する」
- ひっかけ:「利益なし却下と事情判決を混ぜない」
- 暗記:「違法宣言のうえで棄却するのが事情判決」
Answer EXACT:
「処分が違法であることを主文で宣言したうえで、請求を棄却するのが事情判決である。」
```

---

## Q25 民衆訴訟〔行訴法5条〕

保存: `q25.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q25 (popular action / 民衆訴訟).
Asked point: it is called 民衆訴訟, brought in a capacity unrelated to one's own legal interest (e.g. elector). Trap: label it 住民訴訟.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「民衆訴訟 — 自己の利益にかかわらない資格」
Chip:「住民訴訟とラベルを混ぜるな」

Left 論点:
1. 主観訴訟（自己の法律上の利益）か？ → NO。客観訴訟
2. 何という？ → 民衆訴訟
3. 資格は？ → 選挙人たる資格その他自己の法律上の利益にかかわらない資格

Center: ballot box / elector filing suit; label「客観訴訟」. Side stamp「住民訴訟」with X as trap.
Labels:「選挙人（選挙の効力を争いたい）」／「選挙管理委員会（効力を争われる）」

Right ひっかけ:
- 住民訴訟とラベルを取り違える
- 自己の法律上の利益で提起する、と書く
- 民衆訴訟という語を落とす

Bottom:
- 判断軸:「民衆訴訟。自己の法律上の利益にかかわらない資格」
- ひっかけ:「住民訴訟（242条の2）は別問」
- 暗記:「民衆訴訟といい、自己の利益にかかわらない資格で提起する」
Answer EXACT:
「民衆訴訟といい、選挙人たる資格その他自己の法律上の利益にかかわらない資格で提起する。」
```

---

## Q26 取消判決なしの国家賠償〔国賠法1条・判例〕

保存: `q26.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q26 (state compensation without prior revocation/invalidity judgment).
Asked point: no need to obtain revocation or confirmation of invalidity first. Trap: confusing with administrative-appeal exhaustion.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「国賠 — 取消・無効確認の前置は不要」
Chip:「不服審査前置と混ぜるな」

Left 論点:
1. 先に取消訴訟が必要か？ → NO
2. 無効等確認判決が必要か？ → NO
3. いきなり国賠できるか？ → YES。あらかじめ判決を得る必要はない

Center: taxpayer going straight to damages claim; two locked doors「取消判決」「無効確認」with X. Side tag「不服審査前置」as trap.
Labels:「納税者（損害の賠償を求めたい）」／「国・公共団体（前置を主張）」

Right ひっかけ:
- 取消判決を先に得なければならない、と書く
- 不服審査前置と混同する
- 無効確認を経ないと国賠できない、と書く

Bottom:
- 判断軸:「国賠に取消・無効確認の判決は不要」
- ひっかけ:「不服審査前置は別制度。問は国賠の入口」
- 暗記:「あらかじめ取消し又は無効等確認の判決を得る必要はない」
Answer EXACT:
「国賠請求にあたりあらかじめ行政処分の取消し又は無効等確認の判決を得る必要はない。」
```

---

## Q27 外形標準〔国賠法1条〕

保存: `q27.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q27 (objective appearance of official duty for Art. 1).
Asked point: if the act objectively has the appearance of performing official duties, it is a public-duty-related act. Trap: Art. 2 public-structure liability.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「外形標準 — 職務執行の外形があれば足りる」
Chip:「2条に広げるな」

Left 論点:
1. 2条（営造物）か？ → NO。問は1条の職務関連性
2. 主観（私事）で切るか？ → NO。客観的外形
3. 認められるのは？ → 職務執行の外形を備えていれば公務関連行為

Center: officer-looking act with outer shell stamp「外形」; inner thought「私事」faded. Side tag「2条・無過失」as trap.
Labels:「私人（1条で賠償されたい）」／「公務員（職務の外形で動いた）」

Right ひっかけ:
- 2条の営造物責任に広げる
- 故意過失の要否だけで終わる
- 主観的に職務でなければ足りない、と書く

Bottom:
- 判断軸:「客観的に職務執行の外形を備えていれば足りる」
- ひっかけ:「2条は別。問は1条の外形標準」
- 暗記:「職務執行の外形があれば公務関連行為と認められる」
Answer EXACT:
「客観的に職務執行の外形を備えている行為であれば、公務関連行為と認められるのである。」
```

---

## Q28 代執行の要件〔行政代執行法2条〕

保存: `q28.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q28 (administrative vicarious execution: difficulty of other means PLUS leaving nonperformance seriously contrary to public interest).
Asked point: the two-part statutory requirement. Trap: ending with caution/order procedure or cost collection.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「代執行 — 困難かつ著しく公益に反する」
Chip:「手続・費用で終わるな」

Left 論点:
1. 手続（戒告・令書）が本題か？ → NO。問は要件
2. 一本目は？ → 他の手段では履行確保が困難
3. 二本目は？ → 不履行を放置することが著しく公益に反するとき

Center: unperformed alternative duty; two keys「困難」and「著しく公益に反する」unlocking 代執行. Side tags「戒告→令書」「費用＝国税滞納の例」as not-the-question.
Labels:「行政庁（代執行したい）」／「義務者（履行しない）」

Right ひっかけ:
- 戒告・令書の手続だけで答案を閉じる
- 費用徴収（国税滞納処分の例）で終わる
- 「困難」か「公益」の片方を落とす

Bottom:
- 判断軸:「他の手段では困難＋放置が著しく公益に反する」
- ひっかけ:「手続・費用は別。問は2条の要件」
- 暗記:「履行確保が困難で、放置が著しく公益に反するとき」
Answer EXACT:
「他の手段では履行確保が困難で、不履行を放置することが著しく公益に反するとき。」
```

---

## Q29 長の再議〔地方自治法176条〕

保存: `q29.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q29 (budget reconsideration: 10 days from receipt of the sent resolution; 2/3 of members present).
Asked point: for a budget vote, within 10 days from the day the mayor received the sent resolution, show reasons, confirm by 2/3 or more of members present. Trap: 10 days from the vote day; ordinary majority.
Copy the fraction exactly as 2／3 (fullwidth slash).
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「長の再議 — 送付から10日以内、2／3で確定」
Chip:「議決の日・過半数と混ぜるな」

Left 論点:
1. いつまでに？ → 予算の送付を受けた日から10日以内
2. どう付す？ → 理由を示して再議に付す
3. 確定は？ → 再議で出席議員の2／3以上で確定する

Center: mayor vs assembly on a budget amendment; calendar「10日」and stamp「2／3」. Side stamp「過半数」with X.
Labels:「長（再議に付したい）」／「議会（修正議決した）」

Right ひっかけ:
- 一般議決の過半数確定と混ぜる
- 10日・理由提示を落とす
- 3分の2を落とす

Bottom:
- 判断軸:「送付を受けた日から10日以内。確定は出席議員2／3」
- ひっかけ:「議決の日起算・過半数確定と混ぜない」
- 暗記:「送付から10日以内に理由を示し、出席議員2／3で確定する」
Answer EXACT:
「送付を受けた日から10日以内に理由を示して再議に付し、出席議員の2／3以上で確定する。」
```

---

## Q30 町村総会〔地方自治法94条〕

保存: `q30.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q30 (town/village general meeting of electors instead of an assembly, by ordinance).
Asked point: a town or village MAY, by ordinance, not have an assembly and establish a meeting of persons with suffrage. Trap: whether current examples exist is not the answer.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「町村総会 — 条例で議会に代わる総会」
Chip:「現存例の有無は答案に書くな」

Left 論点:
1. 市もできるか？ → 問は町村（94条）
2. 何で設ける？ → 条例で
3. 何を設ける？ → 議会を置かず、選挙権を有する者の総会

Center: small village replacing the assembly hall with a meeting of electors; ordinance scroll. Side tag「現存例？」as trap.
Labels:「町村（議会の代わりを置きたい）」／「選挙権者（総会で決める）」

Right ひっかけ:
- 現存例の有無を答案の芯にする
- 条例を落とす
- 市にも同じ制度がある、と広げる

Bottom:
- 判断軸:「条例で議会を置かず、選挙権者の総会を設けられる」
- ひっかけ:「現存例は芯ではない。問は94条の制度」
- 暗記:「町村は条例で議会を置かず選挙権者の総会を設けられる」
Answer EXACT:
「町村は、条例で議会を置かず、選挙権を有する者の総会を設けることができるのである。」
```

---

## Q31 住民訴訟〔地方自治法242条の2〕

保存: `q31.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q31 (residents' suit: audit first, then sue the incumbent mayor to claim damages against X).
Asked point: after residents' audit request, sue the incumbent mayor as defendant seeking damages against former mayor X. Trap: sue X personally as defendant.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「住民訴訟 — 監査先行、現職を被告」
Chip:「元職を被告にするな」

Left 論点:
1. いきなり訴訟か？ → NO。住民監査請求を経る
2. 被告は元市長Xか？ → NO。現職市長（執行機関）
3. 求めは？ → Xへの損害賠償請求

Center: resident → audit → court; defendant chair labeled「現職市長」; former mayor X aside as the target of the damages claim, not the defendant. Side tag「X個人を被告」with X.
Labels:「住民（返還させたい）」／「現職市長（被告になる）」

Right ひっかけ:
- 悪さをした元職を被告にする
- 監査請求を飛ばす
- 民衆訴訟とラベルを取り違える

Bottom:
- 判断軸:「監査先行。被告は現職。Xへの賠償を求める」
- ひっかけ:「元職被告は禁止。問は現職を被告」
- 暗記:「監査を経て、現職市長を被告にXへの賠償を求める」
Answer EXACT:
「住民監査請求を経たうえで、現職市長を被告として、Xへの損害賠償請求を求める。」
```

---

## Q32 随意契約〔地方自治法234条・判例〕

保存: `q32.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q32 (negotiated contract: not void ipso jure; void ONLY if special circumstances warrant invalidity — 最判昭62.5.19).
Asked point: it is called 随意契約; not automatically void in private law; void only when special circumstances that require invalidity are found. Trap: always void; OR writing that it is valid only with special circumstances (reversed).
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「随意契約 — 特段の事情がある場合のみ無効」
Chip:「当然無効と断定するな」

Left 論点:
1. 名称は？ → 随意契約（原則は一般競争入札）
2. 私法上当然無効か？ → NO
3. 無効になるのは？ → 無効とすべき特段の事情がある場合に限り

Center: half-price sale of city land to a familiar company; stamp「随意契約」and scale「無効とすべき特段の事情」. Side stamp「当然無効」with X.
Labels:「市長（知り合いに売りたい）」／「住民（無効だと主張）」

Right ひっかけ:
- 当然無効と断定する
- 名称（随意契約）を落とす
- 「特段の事情があれば有効」と逆に書く

Bottom:
- 判断軸:「随意契約。違法でも当然無効ではない。特段の事情で無効」
- ひっかけ:「特段の事情は有効条件ではなく、無効とする条件」
- 暗記:「無効とすべき特段の事情がある場合に限り無効」
Answer EXACT:
「随意契約といい、私法上当然無効ではなく、無効とすべき特段の事情がある場合に限り無効となる。」
```

---

## Q33 議員の解職請求〔地方自治法〕

保存: `q33.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q33 (recall of a member: Art. 80 — constituency electors, 1/3 if 400,000 or fewer, to the election commission).
Asked point: if electors in the member's constituency are 400,000 or fewer, joint signatures of 1/3 or more, filed with the election administration commission. Trap: 1/50 for ordinance/audit; flat 1/3 even over 400,000.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「議員の解職請求 — 選挙区40万以下は1／3」
Chip:「50分の1と混ぜるな」

Left 論点:
1. 基準となる総数は？ → 所属選挙区の選挙権者（80条）
2. 40万以下なら？ → その3分の1以上の連署
3. 請求先は？ → 選挙管理委員会

Center: residents with a recall petition; two gates「1／3 解職」vs「50分の1 条例・監査」with the latter marked trap. Arrow to 選管.
Labels:「住民（議員を解職させたい）」／「選挙管理委員会（請求を受ける）」

Right ひっかけ:
- 条例制定・監査請求と混同する
- 40万超も一律1／3と書く
- 議会に請求すると書く

Bottom:
- 判断軸:「基準は所属選挙区の選挙権者。なければ団体全体」
- ひっかけ:「40万超は段階計算。一律1／3ではない」
- 暗記:「40万以下：所属選挙区の3分の1以上 → 選管へ」
Answer EXACT:
「所属選挙区の選挙権者が40万以下なら、3分の1以上の連署で選挙管理委員会に解職請求する。」
```

---

## Q34 国の関与・機関訴訟〔地自法・行訴法6条〕

保存: `q34.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q34 (national involvement dispute: Central and Local Government Dispute Management Council, then high-court organ suit).
Asked point: apply for review to 国地方係争処理委員会, and if still dissatisfied, file an organ action in the high court. Trap: local-to-local dispute route (Minister of Internal Affairs / 自治紛争処理委員).
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「機関訴訟 — 係争委のあと高裁」
Chip:「団体同士ルートと混ぜるな」

Left 論点:
1. いきなり訴訟か？ → NO。審査の申出が先
2. どこへ申出？ → 国地方係争処理委員会
3. なお不服なら？ → 高裁に機関訴訟を提起する

Center: city organ vs national involvement; first stop「係争処理委員会」then arrow「高裁・機関訴訟」. Side path「総務大臣・自治紛争処理委員」as local-to-local trap.
Labels:「市の行政機関（国の関与を争いたい）」／「国（関与をした）」

Right ひっかけ:
- 団体同士の紛争処理ルートと取り違える
- 審査の申出を飛ばしていきなり訴訟
- 地裁に提起する、と書く

Bottom:
- 判断軸:「国相手＝係争委に申出→なお不服なら高裁の機関訴訟」
- ひっかけ:「団体同士ルートは総務大臣側。問は国の関与」
- 暗記:「係争処理委員会に申出をし、なお不服なら高裁に機関訴訟」
Answer EXACT:
「国地方係争処理委員会に審査の申出をし、なお不服なら高裁に機関訴訟を提起する。」
```

---

## Q35 執行罰〔砂防法等〕

保存: `q35.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q35 (enforcement penalty / 執行罰: prior notice, psychological pressure, repeatable non-penal fine until the duty is performed).
Asked point: give notice in advance, apply psychological pressure, and impose a non-penal fine repeatedly until the duty is fulfilled. Trap: 秩序罰 (past-facing) or criminal administrative penalty.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「執行罰 — 予告し、果たすまで反復過料」
Chip:「秩序罰・刑罰と混ぜるな」

Left 論点:
1. 秩序罰（過去の違反）か？ → NO。将来向きに履行を促す
2. どう圧迫する？ → あらかじめ予告して心理的圧迫
3. 過料は？ → 義務を果たすまで反復して科すことができる

Center: non-substitutable duty; warning notice then repeating「過料」stamps until compliance. Side tags「秩序罰」「行政刑罰」as traps.
Labels:「行政庁（履行させたい）」／「義務者（非代替的作為を負う）」

Right ひっかけ:
- 秩序罰（過去向き）と取り違える
- 行政刑罰と同一視して反復できない、と書く
- 予告を落とす

Bottom:
- 判断軸:「予告して心理的圧迫。果たすまで反復過料」
- ひっかけ:「秩序罰は過去、執行罰は将来向き」
- 暗記:「あらかじめ予告し、果たすまで反復して過料を科す」
Answer EXACT:
「あらかじめ予告して心理的圧迫を与え、義務を果たすまで反復して過料を科すことができる。」
```

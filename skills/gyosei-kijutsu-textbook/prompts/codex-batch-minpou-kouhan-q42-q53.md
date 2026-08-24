# 民法記述・第5バッチ画像プロンプト（Q42〜Q53・12問）

てらしぃ向け: **このファイルを Codex に渡す。** 各 ` ```text ` ブロックを **1問ずつ** 生成。次の20問パックの民法側。行政法側は `codex-batch-gyosei-kijutsu-q1-q8.md`。

- 答案正本: `content/textbook/app/民法記述/01-joubun-jun-shutudai.md`
- **生成対象**: Q42〜Q53 のみ。**q1〜q41 を上書きしない**
- 参照: レイアウト=`skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png` ／ 顔=`assets/images/characters/chachalot.png` ＋ `approved-smiling-hat-mascot.png` ／ ポーズ=`approved-chachalot-pointer.png` ／ 見出し見本=`codex-q1-126-ronten.md`
- 保存: `assets/images/deepdive/textbook/minpou-kijutsu/q{N}.png`
- 生成後X禁止。誤情報チェックは `_image-legal-check.md`
- 生成後（Cursor）: MDに `[[image:textbook/minpou-kijutsu/q{N}]]` → `npm run generate:deepdive-images` → `npm run bundle:db-textbooks`

| # | 問 | 保存 | 注意 |
|---|----|------|------|
| 1 | Q42 安全配慮義務 | `q42.png` | **債務不履行**構成。709の時効論はひっかけ |
| 2 | Q43 未成年者不法行為 | `q43.png` | 714原則出ない＋監督義務違反の**別ルート** |
| 3 | Q44 使用者責任の免責 | `q44.png` | 715の免責二類型。717・718はひっかけ |
| 4 | Q45 特別養子 | `q45.png` | 請求時15歳未満・申立て・審判・実親関係消滅 |
| 5 | Q46 利益相反 | `q46.png` | 特別代理人。『子のため』主観はひっかけ |
| 6 | Q47 権利能力なき社団 | `q47.png` | **総有**。個人持分禁止。登記は代表者個人又は全員共有 |
| 7 | Q48 特定財産承継遺言 | `q48.png` | **超過部分**だけ対抗要件。分内まで登記必須は禁止 |
| 8 | Q49 配偶者居住権 | `q49.png` | 無償居住＋遺産分割等。短期居住権はひっかけ |
| 9 | Q50 遺留分侵害額 | `q50.png` | 知った時1年 **又は** 開始時10年。物権的返還禁止 |
| 10 | Q51 完成後承認 | `q51.png` | 放棄**ではない**＋信義則上援用不可。完成前更新はひっかけ |
| 11 | Q52 使用者→被用者求償 | `q52.png` | **信義則上**相当限度。全額禁止。逆向きはQ53 |
| 12 | Q53 被用者→使用者逆求償 | `q53.png` | **明文なし**＋相当限度。**信義則上を付けない** |

民法正本は Q53 が最後。次の民法図はない。

---

## 全問共通STRICT

- 左見出しは二字「論点」。右「ひっかけ」。論点に **GO／STOP 禁止**。GOとYES混在禁止。「だれが」「問が聞くこと」「（聞かない）」禁止。
- 人物下は `役割（何をしたいか）`。説明中に（〇条）。
- 答え帯は答案の芯と **一字一句同じ**（字数括弧は図に出さない）。
- 日本語はプロンプトの文字列をそのまま。
- **ちゃちゃロット**は従来のフクロウと同じ枠だけ: 下の余白に小さく、**指し棒**で暗記を指す。中央の登場人物にしない。名札禁止。顔=`chachalot.png`。帽子は耳ではない。熊化禁止。
- 16:9 暖色オフホワイト。文字は大きく、重ねない。

---

## Q42 不法行為時効と安全配慮義務〔709条・724条〕

保存: `q42.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q42 (safety consideration duty vs tort 709).
The asked point is a 債務不履行 claim against the employer, NOT a 709 tort claim and NOT the limitation-period numbers.
16:9 warm off-white. Left header exactly「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP on 論点. Never「だれが」. Copy Japanese exactly.
CHACHALOT: SAME slot as the green owl. SMALL, bottom-right only, wooden 指し棒 pointing at 暗記. Match chachalot.png and approved-chachalot-pointer.png. Not a scene character. No nameplate. Not a bear.

Title:「安全配慮 — 使用者への債務不履行」
Chip:「709の時効に逃げるな」

Left 論点:
1. 709の不法行為で書く？ → NO。問は安全配慮義務違反
2. 誰に、何の請求？ → 使用者Aへの損害賠償
3. 構成は？ → 安全配慮義務の債務不履行（契約上の付随義務）

Center: workplace accident; employee B holds a contract stamp「安全配慮」pointing at employer A, not a tort stamp「709」. Side tag「時効の数字」as trap.
Labels:「被用者（Aに請求したい）」／「使用者（安全を確保すべき）」

Right ひっかけ:
- 709の時効（知った時等）から書き始める
- 同僚個人への請求に逃げる
- 労災保険で終わる

Bottom:
- 判断軸:「使用者の安全配慮義務の債務不履行」
- ひっかけ:「時効論は別。問は請求の構成」
- 暗記:「安全配慮義務違反は債務不履行で請求する」
Answer EXACT:
「被用者は使用者Aの安全配慮義務の債務不履行に基づく損害賠償を請求すればよい。」
```

---

## Q43 未成年者の不法行為〔712条〜714条〕

保存: `q43.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q43 (minor's tort; 712-714).
A 15-year-old WITH responsibility capacity: 714 supervisory liability does NOT arise as a rule. The asked point is the SEPARATE route: supervisory-duty breach PLUS adequate causation.
Do NOT stop at「714は原則出ない」as if that were the whole answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「未成年者不法行為 — 714原則なし、別ルートあり」
Chip:「責任能力あり＝本人可」

Left 論点:
1. 15歳に責任能力がある？ → YES。本人への712は原則可
2. 714の監督義務者責任は？ → 原則出てこない
3. 親権者が負う別ルートは？ → 監督義務違反と損害との相当因果関係

Center: 15-year-old A and victim; parent with a side door labeled「監督義務違反＋因果関係」not the main 714 stamp. 714 stamp is crossed as「原則出ない」.
Labels:「被害者（親にも請求したい）」／「親権者（監督義務の有無）」

Right ひっかけ:
- 714が原則出ない、で終わって答案を書かない
- 責任能力があるのに714が当然に出る、と書く

Bottom:
- 判断軸:「714は原則なし。別ルートは義務違反＋因果関係」
- ひっかけ:「原則論だけで答案を終わらせない」
- 暗記:「監督義務違反と結果との相当因果関係があるとき」
Answer EXACT:
「監督義務者の義務違反と、損害結果との間に相当の因果関係が認められるときである。」
```

---

## Q44 使用者責任の免責〔715条〕

保存: `q44.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q44 (employer liability exemption, Civil Code 715).
TWO exemption types joined by 又は: (1) due care in appointment OR supervision of the business, (2) even with care the damage would have occurred.
Do NOT make 717 landowner / 718 animal the main answer. Do NOT mix 国賠.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「使用者責任の免責 — 相当の注意、又は不可避」
Chip:「717・718は別」

Left 論点:
1. 715の使用者責任の話か？ → YES。被用者の事業執行
2. 免責の一つ目は？ → 選任又は事業の監督につき相当の注意（715条1項ただし書）
3. もう一つは？ → 注意をしても損害が生じたとき（又は）

Center: employer A and employee B; two escape gates「相当の注意」and「注意しても発生」with a big「又は」. Side tags「717工作物」「718動物」as traps.
Labels:「使用者（免責されたい）」／「被害者（使用者に請求）」

Right ひっかけ:
- 717・718の責任に広げる
- 国賠・公務員の重過失求償に逃げる
- 二つの免責を落とす

Bottom:
- 判断軸:「相当の注意 又は 注意しても損害が生じたとき」
- ひっかけ:「工作物・動物は問が聞いていない」
- 暗記:「選任監督に相当の注意、又は注意しても生じたとき」
Answer EXACT:
「選任又は事業の監督につき相当の注意をしたとき、又は注意しても損害が生じたときである。」
```

---

## Q45 特別養子縁組〔817条の2以下〕

保存: `q45.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q45 (special adoption).
FOUR points in one sentence: under 15 at request, adoptive parents petition, family-court trial, legal relation with birth parents ends. Ordinary adoption (relation remains) is the trap.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「特別養子 — 審判で実親関係が切れる」
Chip:「普通養子と切る」

Left 論点:
1. 年齢は？ → 請求時１５歳未満
2. 誰が申し立て？ → 養親となる者
3. 成立の仕方と実親は？ → 家庭裁判所の審判。実親との関係が消滅

Center: couple X・Y and a child; family-court stamp「審判」cuts a ribbon labeled「実親関係」. Side tag「普通養子＝実親残る」as trap.
Labels:「養親（縁組を成立させたい）」／「実親（法的関係が切れる）」

Right ひっかけ:
- 普通養子と混ぜて実親関係が残る、と書く
- 審判なしで成立する、と書く
- 同意例外（虐待等）の細部に逃げる

Bottom:
- 判断軸:「１５歳未満・養親申立て・審判・実親関係消滅」
- ひっかけ:「同意例外の細部は問が聞いていない」
- 暗記:「審判により実親との関係が消滅する」
Answer EXACT:
「請求時１５歳未満で養親が申し立て、家庭裁判所の審判により実親との関係が消滅する。」
```

---

## Q46 利益相反行為〔826条〕

保存: `q46.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q46 (conflict of interest, Civil Code 826).
Objective conflict (mortgage on child's land for parent's debt) requires a special agent appointed by the family court. Subjective「子のため」does NOT save it.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「利益相反 — 特別代理人を家裁に請求」
Chip:「子のため、では免責されない」

Left 論点:
1. 外形は子の学費でも、客観は？ → 親の債務の担保。利益相反になり得る（826条）
2. 親権者だけで進めてよい？ → NO
3. どうする？ → 子のために特別代理人の選任を家庭裁判所に請求する

Center: parent A putting a mortgage stamp on child B's land; blocked path, open path to family court「特別代理人」. Side tag「子の学費のため」crossed.
Labels:「親権者（融資を通したい）」／「子（利益を守る必要がある）」

Right ひっかけ:
- 『子のため』の主観で免責する
- 家裁への請求なしで有効、と書く

Bottom:
- 判断軸:「客観的相反なら特別代理人」
- ひっかけ:「目的が子のためでも免責にならない」
- 暗記:「特別代理人の選任を家庭裁判所に請求する」
Answer EXACT:
「親権者はBのために特別代理人の選任を家庭裁判所に請求しなければならないのである。」
```

---

## Q47 権利能力なき社団〔総有・登記〕

保存: `q47.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q47 (unincorporated association; collective ownership 総有).
TWO points: belongs to all members as 総有 (NO individual shares), AND registration in the representative's personal name OR all members as co-owners.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「権利能力なき社団 — 総有、登記は代表者か全員」
Chip:「持分がある、と書くな」

Left 論点:
1. 各自の持分がある？ → NO。構成員全員に総有的に帰属
2. 登記名義は？ → 代表者個人名義、又は構成員全員の共有名義
3. 社団名のみで登記？ → 問の答案は上の二つの名義

Center: circle of members around land「総有」; two registry books「代表者個人」「全員共有」. Side tag「各自の持分」crossed.
Labels:「代表者（登記名義を決めたい）」／「構成員（持分があると主張）」

Right ひっかけ:
- 個人持分があるように書く
- 総有を落とす
- 登記名義を一つに決めつけて「だけ」と書く（又はを残す）

Bottom:
- 判断軸:「帰属は総有。登記は代表者個人又は全員共有」
- ひっかけ:「持分があるかのように書かない」
- 暗記:「総有で帰属し、代表者個人又は全員共有で登記」
Answer EXACT:
「構成員全員に総有的に帰属し、代表者個人名義又は構成員全員の共有名義で登記する。」
```

---

## Q48 特定財産承継遺言〔899条の2〕

保存: `q48.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q48 (will that designates specific property to an heir; 899-2).
ONLY the part exceeding the statutory share needs registration (or other opposability) against a third party. The portion within the statutory share does NOT require registration.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「相続させる遺言 — 超過部分は登記が要る」
Chip:「分内まで登記必須と書くな」

Left 論点:
1. 遺言があれば全部勝てる？ → NO。法定相続分を超える部分が問題
2. 超過部分は？ → 登記なくして第三者に対抗できない（899条の2）
3. 分内は？ → 登記は不要寄り。問は超過部分

Center: land given to heir B; pie split「法定相続分内」vs「超過」. Only the excess slice needs a registry stamp against third party C.
Labels:「相続人（遺言で土地を取りたい）」／「第三者（対抗を争う）」

Right ひっかけ:
- 分内まで登記必須、と書く
- 遺言がある以上、登記なしで全部勝てる、と書く

Bottom:
- 判断軸:「超過部分だけ対抗要件」
- ひっかけ:「分内と超過を一塊にしない」
- 暗記:「超える部分は、登記なくして第三者に対抗できない」
Answer EXACT:
「法定相続分を超える部分については、登記なくして第三者に対抗することができない。」
```

---

## Q49 配偶者居住権〔1028条〕

保存: `q49.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q49 (spousal residence right 1028).
Asked point: lived there for free at succession opening, AND acquired the right by heritage division etc. Do NOT make 短期居住権 the main answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「配偶者居住権 — 無償居住＋分割等で取得」
Chip:「短期居住権は別」

Left 論点:
1. 入口は？ → 相続開始時に無償で居住していたこと
2. 本権の取得は？ → 遺産分割等により配偶者居住権を取得
3. 短期居住権で足りる？ → NO。問は本権の取得場面

Center: surviving spouse S in a house; two stamps「無償居住」and「遺産分割等」unlock「配偶者居住権」. Side tag「短期居住権」as trap.
Labels:「配偶者（住み続けたい）」／「他の相続人（分割の相手）」

Right ひっかけ:
- 短期居住権と混同する
- 無償居住だけで本権が当然に発生する、と書く

Bottom:
- 判断軸:「無償居住が入口。本権は分割等で取得」
- ひっかけ:「短期の『遅い方まで』に逃げない」
- 暗記:「無償で居住し、遺産分割等により取得したとき」
Answer EXACT:
「相続開始時に無償で居住し、遺産分割等により配偶者居住権を取得したときである。」
```

---

## Q50 遺留分侵害額請求〔1048条〕

保存: `q50.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q50 (infringement-of-reserved-share money claim, 1048).
TWO periods with 又は: 1 year from knowledge of infringement, OR 10 years from opening of succession. It is a MONEY claim, not in-kind recovery of the thing.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「遺留分侵害額 — 知った時１年又は開始時１０年」
Chip:「物の返還ではない」

Left 論点:
1. 物を返せ、が答え？ → NO。金銭の遺留分侵害額請求
2. 期間の一つは？ → 侵害を知った時から１年
3. もう一つは？ → 相続開始時から１０年（又は）

Center: calendar with two clocks「知った時→１年」and「開始時→１０年」joined by「又は」. Coin icon「金銭」, crossed house icon「物権的返還」.
Labels:「遺留分権利者（額を請求したい）」／「受遺者（侵害を争う）」

Right ひっかけ:
- 物権的返還と書く
- 「なにを知った時から」を落とす
- １年と１０年の一方だけ書く

Bottom:
- 判断軸:「知った時１年 又は 開始時１０年。中身は金銭」
- ひっかけ:「物を返せ、は改正前の発想」
- 暗記:「知った時から１年又は相続開始時から１０年」
Answer EXACT:
「遺留分侵害を知った時から１年又は相続開始時から１０年以内に遺留分侵害額を請求する。」
```

---

## Q51 時効完成後の債務承認と信義則

保存: `q51.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q51 (acknowledgment after limitation has run; 信義則).
TWO halves MUST both appear: (1) not knowing completion means it is NOT a waiver 放棄, (2) but 信義則 bars invoking the limitation. Do NOT write「放棄になる」. Pre-completion interruption / guarantor is the trap (that is Q29).
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「完成後の承認 — 放棄ではないが援用できない」
Chip:「完成前の更新は別問」

Left 論点:
1. 完成を知らずに承認＝放棄？ → NO。放棄にはならない
2. では援用できる？ → NO。信義則上、援用できない
3. 完成前の更新の話か？ → NO。問は完成後・不知の承認

Center: debtor B saying「必ず払う」after a clock stamped「時効完成」; split stamp「放棄ではない」and a red bar「信義則→援用不可」. Side tag「完成前・保証人」as trap.
Labels:「債務者（あとで援用したい）」／「債権者（承認で安心した）」

Right ひっかけ:
- 放棄になる、と書く
- 完成前の更新・保証人の効力に逃げる
- 知って承認したケース（真の放棄）と混ぜる

Bottom:
- 判断軸:「不知の承認＝放棄ではない。ただし信義則上援用不可」
- ひっかけ:「完成前の世界に踏み込まない」
- 暗記:「放棄にはならないが、信義則上援用できない」
Answer EXACT:
「時効完成を知らずに債務を承認しても放棄にはならないが、信義則上援用できない。」
```

---

## Q52 使用者の被用者に対する求償〔715条3項〕

保存: `q52.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q52 (employer's reimbursement against employee).
Direction: employer A → employee B. Phrase MUST include 信義則上 and 相当と認められる限度. NEVER 全額. The reverse direction (no 信義則上) is Q53 — keep it as a trap, not the answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「使用者→被用者 — 信義則上、相当限度」
Chip:「全額求償と書くな」

Left 論点:
1. 向きは？ → 使用者が先に賠償した → 被用者へ求償（715条3項）
2. 全額か？ → NO。損害の公平な分担
3. 範囲の言い方は？ → 信義則上相当と認められる限度（Q53とは語が違う）

Center: money arrow A→C then A→B with a limiter bar「相当限度」and a small label「信義則上」. Reverse arrow B→A tagged「Q53」as trap.
Labels:「使用者（求償したい）」／「被用者（落ち度の分担を主張）」

Right ひっかけ:
- 全額求償できる、と書く
- 逆求償（被用者→使用者）と混ぜる
- 国・公共団体の重過失求償に逃げる

Bottom:
- 判断軸:「公平な分担。信義則上、相当限度」
- ひっかけ:「向きを逆にしない。問は使用者→被用者」
- 暗記:「信義則上相当と認められる限度で求償できる」
Answer EXACT:
「損害の公平な分担という見地から、信義則上相当と認められる限度で求償ができる。」
```

---

## Q53 被用者から使用者への逆求償

保存: `q53.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q53 (employee's reverse reimbursement against employer).
Direction: employee B → employer A. MUST say 明文はないが. Range is 相当と認められる限度. Do NOT insert 信義則上 (that phrase is Q52 only). Do not deny the claim just because there is no statute.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「被用者→使用者 — 明文なし、相当限度（信義則なし）」
Chip:「信義則上、を付けるな」

Left 論点:
1. 条文にある？ → NO。明文はないが認められる
2. 向きは？ → 被用者が先に賠償 → 使用者へ
3. 範囲は？ → 損害の公平な分担の見地から相当と認められる限度（信義則上は付けない）

Center: money arrow B→C then B→A with limiter「相当限度」. A crossed tag「信義則上」and a note「それはQ52」. Statute book empty「明文なし」.
Labels:「被用者（逆求償したい）」／「使用者（条文がないと主張）」

Right ひっかけ:
- 条文がないから認められない、と書く
- 「信義則上」を付けてQ52と同じ文にする
- 使用者→被用者の型と混ぜる

Bottom:
- 判断軸:「明文なし。公平な分担の相当限度。信義則という語は使わない」
- ひっかけ:「向きと標識（信義則の有無）でQ52と切る」
- 暗記:「明文はないが、相当と認められる限度で求償できる」
Answer EXACT:
「明文はないが、損害の公平な分担という見地から相当と認められる限度で求償できる。」
```

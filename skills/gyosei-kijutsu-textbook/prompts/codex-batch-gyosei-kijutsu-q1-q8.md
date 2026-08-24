# 行政法記述・第1バッチ画像プロンプト（Q1〜Q6・枝番込み8問）

てらしぃ向け: **このファイルを Codex に渡す。** 各 ` ```text ` ブロックを **1問ずつ** 生成。次の20問パックの行政法側。民法側は `codex-batch-minpou-kouhan-q42-q53.md`（12問）。合計20問。

- 答案正本: `content/textbook/app/行政法記述/01-joubun-jun-shutudai.md`
- **生成対象**: 下表の8スロットのみ。民法 `minpou-kijutsu/q1〜q41` は触らない
- 参照: レイアウト=`skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png` ／ 顔=`chachalot.png` ＋ `approved-smiling-hat-mascot.png` ／ ポーズ=`approved-chachalot-pointer.png`
- 保存: `assets/images/deepdive/textbook/gyosei-kijutsu/q{スロット}.png`（枝番は `q1-2` `q2-2`）
- 生成後X禁止。誤情報チェックは `_image-legal-check.md`
- 生成後（Cursor）: 行政法MDに `[[image:textbook/gyosei-kijutsu/q{スロット}]]` → `npm run generate:deepdive-images` → `npm run bundle:db-textbooks`

| # | 問 | 保存 | 注意 |
|---|----|------|------|
| 1 | Q1 理由の提示 | `q1.png` | **書面で同時に**。趣旨の二本柱はQ1-2 |
| 2 | Q1-2 理由提示の趣旨 | `q1-2.png` | 慎重・恣意抑制 **および** 不服申立の便宜 |
| 3 | Q2 聴聞でできること | `q2.png` | 意見＋証拠＋**主宰者の許可を得て**質問 |
| 4 | Q2-2 出頭できないとき | `q2-2.png` | 期日まで陳述書及び証拠。出頭者の権利はQ2 |
| 5 | Q3 取消と撤回 | `q3.png` | 事後違反＝**撤回・将来**。不正取得の取消はひっかけ |
| 6 | Q4 理由不備の治癒 | `q4.png` | 裁決で理由を足しても**治癒されない** |
| 7 | Q5 指導の中止等の求め | `q5.png` | 申出書。処分等の求め（36条の3）はひっかけ |
| 8 | Q6 行服の義務的執行停止 | `q6.png` | 公共福祉等がない限り停止**しなければならない**。行訴はひっかけ |

次の行政法バッチ: Q7〜。

---

## 全問共通STRICT

- 左見出しは二字「論点」。右「ひっかけ」。論点に **GO／STOP 禁止**。GOとYES混在禁止。「だれが」「問が聞くこと」「（聞かない）」禁止。
- 人物下は `役割（何をしたいか）`。説明中に（〇条）。
- 答え帯は答案の芯と **一字一句同じ**（字数括弧は図に出さない）。
- **ちゃちゃロット**は下の余白に小さく、**指し棒**で暗記を指す。中央の登場人物にしない。名札禁止。熊化禁止。
- 16:9 暖色オフホワイト。文字は大きく、重ねない。

---

## Q1 不利益処分の理由の提示〔行手法14条〕

保存: `q1.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q1 (Administrative Procedure Act 14 reason-giving).
Asked point: when making an adverse disposition, show the reasons IN WRITING and AT THE SAME TIME. Purpose of the rule is Q1-2 (do not put 趣旨 as the answer). Hearing / emergency exception are traps.
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「理由の提示 — 書面で、同時に」
Chip:「趣旨は別問」

Left 論点:
1. 聴聞の要否が本題？ → NO。問は処分時の理由提示（14条）
2. 方法は？ → 書面
3. いつ示す？ → 同時に

Center: agency handing a written notice and a reasons sheet together to addressee A. Side tags「聴聞」「例外で後出し」as traps.
Labels:「行政庁（不利益処分をする）」／「名あて人（理由を知りたい）」

Right ひっかけ:
- 聴聞の要否から書く
- 差し迫った必要の例外に逃げる
- 口頭で足りる、と書く

Bottom:
- 判断軸:「不利益処分。書面で、同時に理由を示す」
- ひっかけ:「趣旨の二本柱はQ1-2」
- 暗記:「書面で同時にその理由を示さなければならない」
Answer EXACT:
「不利益処分の名あて人に対し、書面で同時にその理由を示さなければならないのである。」
```

---

## Q1-2 理由提示の趣旨〔行手法14条〕

保存: `q1-2.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q1-2 (purpose of reason-giving).
TWO pillars MUST both appear: (1) careful judgment / curb arbitrary power, (2) convenience for appeals. Procedure (writing + same time) is Q1, not this answer.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「理由提示の趣旨 — 慎重と不服申立の便宜」
Chip:「書面・同時はQ1」

Left 論点:
1. 手続の書き方（書面・同時）が本題？ → NO。それはQ1
2. 一本目は？ → 行政庁の判断の慎重を担保し、恣意を抑制
3. 二本目は？ → 不服申立てに便宜を与える

Center: two pillars labeled「慎重・恣意抑制」and「不服申立の便宜」holding up a disposition document. Side tag「聴聞を経たから不要」crossed.
Labels:「名あて人（争う準備をしたい）」／「行政庁（理由を省略したい）」

Right ひっかけ:
- 書面・同時の手続だけ書いて終わる
- 聴聞を経たから理由不要、と書く
- 二本柱の一方を落とす

Bottom:
- 判断軸:「慎重・恣意抑制 と 不服申立の便宜」
- ひっかけ:「例外・聴聞不要はトラップ」
- 暗記:「判断の慎重を担保し、不服申立てに便宜を与える」
Answer EXACT:
「行政庁の判断の慎重を担保して恣意を抑制し、不服申立てに便宜を与えるためである。」
```

---

## Q2 聴聞期日に出頭した当事者〔行手法20条・21条〕

保存: `q2.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q2 (what a party who APPEARS at a hearing may do).
THREE acts: state opinion, submit documentary evidence etc., AND ask questions WITH the hearing examiner's permission. 弁明の機会の付与 is a trap. Cannot-appear (21) is Q2-2.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「聴聞でできること — 意見・証拠・許可を得て質問」
Chip:「弁明と混ぜるな」

Left 論点:
1. 出頭した当事者の話か？ → YES（20条）
2. できることは？ → 意見を述べ、証拠書類等を提出する
3. 質問は？ → 主宰者の許可を得て質問できる

Center: hearing room; party A at a mike, evidence papers, and a stamp「主宰者の許可」unlocking「質問」. Side door「出頭できない→Q2-2」.
Labels:「当事者（聴聞で防御したい）」／「主宰者（許可を出す）」

Right ひっかけ:
- 弁明の機会の付与と混同する
- 質問に許可が不要、と書く
- 出頭できないときの陳述書に逃げる

Bottom:
- 判断軸:「意見＋証拠＋主宰者の許可を得た質問」
- ひっかけ:「出頭できない型はQ2-2」
- 暗記:「意見を述べ、証拠を出し、許可を得て質問できる」
Answer EXACT:
「意見を述べ、及び証拠書類等を提出し、並びに主宰者の許可を得て質問をすることができる。」
```

---

## Q2-2 聴聞期日に出頭できないとき〔行手法21条〕

保存: `q2-2.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q2-2 (party who CANNOT appear).
Substitute: submit a written statement AND documentary evidence etc. to the examiner BY the hearing date. Do NOT give them the same oral-question rights as a party who appeared (that is Q2).
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「出頭できないとき — 期日まで陳述書等」
Chip:「質問権は出頭者の話」

Left 論点:
1. 出頭した人と同じことができる？ → NO。問は出頭に代わる手段（21条）
2. 誰に出す？ → 主宰者に対し
3. いつ、何を？ → 聴聞の期日までに、陳述書及び証拠書類等

Center: empty hearing chair; mailbox to examiner with papers「陳述書」「証拠書類等」and a clock「期日まで」. Side tag「意見陳述・質問」as Q2 trap.
Labels:「当事者（出頭できない）」／「主宰者（書類を受け取る）」

Right ひっかけ:
- 出頭者と同じく質問できる、と書く
- 弁明の機会の付与にすり替える
- 期日後でもよい、と書く

Bottom:
- 判断軸:「出頭に代えて、期日まで、陳述書及び証拠書類等」
- ひっかけ:「できることのメニューをQ2と取り違えない」
- 暗記:「主宰者に、期日までに陳述書及び証拠書類等を提出できる」
Answer EXACT:
「出頭に代えて主宰者に対し、聴聞の期日までに陳述書及び証拠書類等を提出できる。」
```

---

## Q3 許可の取消と撤回

保存: `q3.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q3 (revocation vs withdrawal of a permit).
THIS case is violation AFTER the permit: call it 撤回, effect is prospective (将来), legal basis often said unnecessary. Trap: fraudulently obtained permit → 取消 and retroactive.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「事後違反 — 撤回、将来に向かって消滅」
Chip:「不正取得の取消と切る」

Left 論点:
1. 許可のときから瑕疵（不正取得）か？ → NO。許可後の法令違反
2. 用語は？ → 撤回
3. 効果は？ → 将来に向かって効力を消滅。法律の根拠は不要とされる

Center: timeline: permit stamp, then later violation, then scissors labeled「撤回」cutting only the future. Past remains. Side stamp「取消＝遡及」as trap for a different case.
Labels:「行政庁（効力を失わせたい）」／「事業者（許可を守りたい）」

Right ひっかけ:
- 不正取得の取消（遡及）と取り違える
- 撤回なのに遡及する、と書く
- 根拠が必ず要る、と書く

Bottom:
- 判断軸:「事後違反＝撤回。効果は将来効。根拠不要」
- ひっかけ:「取消と撤回を用語ごと混ぜない」
- 暗記:「撤回といい、将来に向かって効力を消滅させる」
Answer EXACT:
「許可等の撤回といい、将来に向かって効力を消滅させ、法律の根拠は不要とされる。」
```

---

## Q4 理由不備と瑕疵の治癒

保存: `q4.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q4 (defect in reason-attachment is NOT cured by later reasons in the appeal decision).
Core: because the taxpayer could not argue sufficient reasons at the original 更正処分 stage. Trap:「裁決で理由が付いた＝治癒」.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「理由不備 — 裁決で足しても治癒されない」
Chip:「裁決＝治癒、はトラップ」

Left 論点:
1. 更正処分に理由がなかった？ → YES。後の裁決書ではじめて理由
2. 瑕疵は治癒される？ → NO
3. なぜ？ → 更正処分の段階で十分な理由を主張できないから

Center: empty reasons box on 更正処分; later 裁決書 filling reasons, but a red stamp「治癒されない」. Arrow back to the first stage「主張できなかった」.
Labels:「納税者（処分段階で争いたい）」／「行政庁（裁決で直したと主張）」

Right ひっかけ:
- 裁決で理由を足した＝治癒、と書く
- 趣旨論（慎重・便宜）だけ書いて治癒の結論を落とす

Bottom:
- 判断軸:「処分段階で十分な理由を主張できたか」
- ひっかけ:「後出し理由で瑕疵が消えると思わない」
- 暗記:「更正処分で主張できない以上、瑕疵は治癒されない」
Answer EXACT:
「更正処分で十分な理由を主張できない以上、理由附記の不備の瑕疵は治癒されない。」
```

---

## Q5 行政指導の中止等の求め〔行手法36条の2〕

保存: `q5.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q5 (request to stop administrative guidance, APA 36-2).
File a written request with the agency that gave the guidance, seeking cessation or other necessary measures. Trap: 処分等の求め (36-3) — different procedure.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「指導の中止等の求め — 申出書をその行政機関へ」
Chip:「処分等の求めは別」

Left 論点:
1. 処分等の求め（36条の3）か？ → NO。行政指導の中止等（36条の2）
2. 誰に？ → 行政指導をした行政機関
3. 何を？ → 申出書を提出し、中止その他必要な措置を求める

Center: guidance paper from agency; business A returns a「申出書」. Side door labeled「処分等の求め」blocked. Stamp「中止その他必要な措置」.
Labels:「事業者（指導を止めたい）」／「行政機関（指導をした側）」

Right ひっかけ:
- 処分等の求めと混同する
- 口頭申出で足りる、と書く
- 申出の相手を別の庁にする

Bottom:
- 判断軸:「指導をした行政機関へ、申出書で中止等を求める」
- ひっかけ:「36条の3に逃げない」
- 暗記:「申出書を提出し、中止その他必要な措置を求める」
Answer EXACT:
「行政指導をした行政機関に対し、申出書を提出し、中止その他必要な措置を求めることができる。」
```

---

## Q6 執行停止（行服法・義務的停止）〔25条〕

保存: `q6.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q6 (mandatory stay of execution under Administrative Appeal Act).
Reviewing agency MUST stay unless e.g. serious harm to public welfare. Trap: Administrative Case Litigation Act stay (different test), or discretionary/ex officio stay by type of agency.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「行服の執行停止 — 原則、停止しなければならない」
Chip:「行訴の執行停止は別」

Left 論点:
1. 行訴法の執行停止か？ → NO。問は行服法の義務的停止（25条）
2. 審査庁はどうする？ → 執行停止しなければならない
3. 例外は？ → 公共の福祉に重大な影響を及ぼすおそれ等があるとき、その限りでない

Center: scales; default green path「停止しなければならない」; orange exception gate「公共の福祉に重大な影響等」. Side tag「行訴」as trap.
Labels:「審査請求人（執行を止めたい）」／「審査庁（停止する義務）」

Right ひっかけ:
- 行訴の執行停止要件に逃げる
- 職権停止の可否（審査庁の種類）に逃げる
- 原則を「停止できる」程度に弱める

Bottom:
- 判断軸:「公共福祉等の除外がなければ、停止しなければならない」
- ひっかけ:「行訴と行服の執行停止を一塊にしない」
- 暗記:「おそれ等がない限り、執行停止しなければならない」
Answer EXACT:
「公共の福祉に重大な影響を及ぼすおそれ等がない限り、執行停止しなければならない。」
```

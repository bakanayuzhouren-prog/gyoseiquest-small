# 行政法記述・第2バッチ画像プロンプト（Q7〜Q16・10問）

てらしぃ向け: **このファイルを Codex に渡す。** 各 ` ```text ` ブロックを **1問ずつ** 生成。

- 答案正本: `content/textbook/app/行政法記述/01-joubun-jun-shutudai.md`
- 先行バッチ: `codex-batch-gyosei-kijutsu-q1-q8.md`（Q1〜Q6・枝番。PNG未着手でも再生成しない／上書きしない）
- **生成対象**: Q7〜Q16 のみ。民法 `minpou-kijutsu/q1〜q41` は触らない
- 参照: レイアウト=`skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png` ／ 顔=`chachalot.png` ＋ `approved-smiling-hat-mascot.png` ／ ポーズ=`approved-chachalot-pointer.png`
- 保存: `assets/images/deepdive/textbook/gyosei-kijutsu/q{N}.png`
- 生成後X禁止。誤情報チェックは `_image-legal-check.md`
- 生成後（Cursor）: 行政法MDに `[[image:textbook/gyosei-kijutsu/q{N}]]` → `npm run generate:deepdive-images` → `npm run bundle:db-textbooks`

| # | 問 | 保存 | 注意 |
|---|----|------|------|
| 1 | Q7 審理員意見書 | `q7.png` | 遅滞なく意見書＋事件記録。執行停止意見はひっかけ |
| 2 | Q8 認容の効果 | `q8.png` | いずれでもない庁＝**取消のみ**。変更は処分庁・上級庁 |
| 3 | Q9 再審査の棄却 | `q9.png` | 原裁決がダメでも**当初処分が適法なら棄却** |
| 4 | Q10 取消訴訟の教示 | `q10.png` | 被告となるべき者＋出訴期間を**書面**で |
| 5 | Q11 主張制限 | `q11.png` | 適格○でも関係ない違法は**棄却**（却下ではない） |
| 6 | Q12 第三者再審 | `q12.png` | 知った日から**30日**の再審。参加手続で終わらない |
| 7 | Q13 釈明処分の特則 | `q13.png` | 処分庁へ資料の**提出**求め。送付嘱託は別 |
| 8 | Q14 無効確認の補充性 | `q14.png` | 現在の法律関係の訴えで目的達成**不可**のときに限り |
| 9 | Q15 条例の処分性 | `q15.png` | 処分を待たず・**特定の者に直接**。原則却下で止まらない |
| 10 | Q16 仮の義務付け | `q16.png` | 取消＋義務付け**併合**と仮の義務付け。執行停止だけでは不足 |

次バッチ: Q17〜Q35（19問）→ `codex-batch-gyosei-kijutsu-q17-q35.md`。Q7〜Q16 の PNG は再生成・上書きしない。

---

## 全問共通STRICT

- 左見出しは二字「論点」。右「ひっかけ」。論点に **GO／STOP 禁止**。GOとYES混在禁止。「だれが」「問が聞くこと」「（聞かない）」禁止。
- 人物下は `役割（何をしたいか）`。説明中に（〇条）。
- 答え帯は答案の芯と **一字一句同じ**（字数括弧は図に出さない）。
- **ちゃちゃロット**は下の余白に小さく、**指し棒**で暗記を指す。中央の登場人物にしない。名札禁止。熊化禁止。
- 16:9 暖色オフホワイト。文字は大きく、重ねない。

---

## Q7 審理員意見書〔行服法42条〕

保存: `q7.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q7 (Administrative Appeal Act 42 hearing examiner's opinion).
Asked point: without delay, prepare the opinion AND submit it WITH the case record to the reviewing agency. Trap: stay-of-execution opinion (25-7).
16:9 warm off-white. Left「論点」. Right「ひっかけ」. Bottom 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「審理員意見書 — 遅滞なく、記録とともに」
Chip:「執行停止意見は別」

Left 論点:
1. 執行停止についての意見か？ → NO。問は審理終結後の42条
2. 何を作る？ → 審理員意見書
3. どう提出？ → 遅滞なく、事件記録とともに審査庁へ

Center: examiner desk; two stacks「意見書」and「事件記録」arrow to reviewing agency. Side tag「25条7項」as trap.
Labels:「審理員（意見を出す）」／「審査庁（裁決の前段階）」

Right ひっかけ:
- 執行停止意見（25条7項）と混同する
- 事件記録を落とす
- 遅滞なく、を落とす

Bottom:
- 判断軸:「遅滞なく意見書＋事件記録を審査庁へ」
- ひっかけ:「執行停止意見は別条。問は42条」
- 暗記:「遅滞なく意見書を作り、記録とともに提出する」
Answer EXACT:
「遅滞なく審理員意見書を作成し、事件記録とともに審査庁に提出しなければならない。」
```

---

## Q8 審査請求容認の効果〔行服法46条〜49条〕

保存: `q8.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q8 (effect of granting an appeal; reviewing agency that is NEITHER the original agency NOR a superior agency).
Can revoke in whole or part. CANNOT modify. Trap: modification power of the original / superior agency.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「いずれでもない審査庁 — 取消はできる、変更はできない」
Chip:「誰が審査庁かで分岐」

Left 論点:
1. 審査庁は処分庁？上級行政庁？ → NO。いずれでもない行政庁
2. 認容すると？ → 処分の全部又は一部を取り消すことができる
3. 変更できる？ → NO。変更することはできない

Center: three doors「処分庁」「上級庁」「いずれでもない」. Only the third door has stamp「取消○／変更×」. Other doors tagged「変更もあり得る」as trap.
Labels:「審査請求人（認容してほしい）」／「審査庁（裁決の中身）」

Right ひっかけ:
- 処分庁・上級庁の変更裁決と取り違える
- 取消も変更もできない、と書く
- 全部取消しか書けず「一部」を落とす

Bottom:
- 判断軸:「いずれでもない庁＝取消のみ。変更不可」
- ひっかけ:「誰が審査庁かで結論が変わる」
- 暗記:「全部又は一部を取り消せるが、変更はできない」
Answer EXACT:
「当該処分の全部又は一部を取り消すことができるが、変更することはできないのである。」
```

---

## Q9 再審査請求の棄却〔行服法64条3項〕

保存: `q9.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q9 (dismissal of re-appeal).
Even if the original decision (原裁決) is illegal/unjust, dismiss when the INITIAL disposition is NOT illegal/unjust. Trap: grant just because 原裁決 is bad.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「再審査の棄却 — 見るのは当初処分」
Chip:「原裁決がダメ＝認容、ではない」

Left 論点:
1. 見るべきは原裁決の瑕疵だけ？ → NO。当初処分の当否
2. 原裁決が違法でも？ → 当初処分が違法でも不当でもなければ棄却
3. 認容すべき？ → そのときは棄却する

Center: two stamps「原裁決＝瑕疵あり」and「当初処分＝適法」. Arrow to「棄却」. Side path「原裁決ダメ→認容」crossed.
Labels:「再審査請求人（認容してほしい）」／「再審査庁（当初処分を見る）」

Right ひっかけ:
- 原裁決の瑕疵だけで認容する
- 当初処分の当否を書かない

Bottom:
- 判断軸:「当初処分が適法・妥当なら、原裁決に瑕疵があっても棄却」
- ひっかけ:「原裁決だけ見て認容しない」
- 暗記:「原裁決が違法でも、当初処分が適法なら棄却する」
Answer EXACT:
「原裁決が違法又は不当でも、当初処分が違法又は不当でないときは棄却するのである。」
```

---

## Q10 取消訴訟等の教示〔行訴法46条〕

保存: `q10.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q10 (instruction about cancellation suit).
TWO contents in writing: who should be the defendant, AND the period for filing. Trap: oral is enough; or mix with instruction about administrative appeal.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「取消訴訟の教示 — 被告と出訴期間を書面で」
Chip:「不服申立の教示と切る」

Left 論点:
1. 不服申立ての教示が本題？ → NO。取消訴訟についての教示
2. 何を教示？ → 被告となるべき者、及び出訴期間
3. 方法は？ → 書面

Center: disposition notice with two written lines「被告となるべき者」「出訴期間」. Oral bubble crossed. Side tag「不服申立の教示」as trap.
Labels:「行政庁（処分をする）」／「名あて人（どこに・いつまでに訴えるか）」

Right ひっかけ:
- 不服申立の教示と混同する
- 口頭で足りる、と書く
- 被告か出訴期間の一方を落とす

Bottom:
- 判断軸:「被告となるべき者＋出訴期間を、書面で」
- ひっかけ:「口頭処分の例外に逃げて原則を落とさない」
- 暗記:「被告となるべき者及び出訴期間を書面で教示する」
Answer EXACT:
「取消訴訟の被告となるべき者及び出訴期間を、書面で教示しなければならないのである。」
```

---

## Q11 自己の法律上の利益に関係のない違法〔行訴法10条〕

保存: `q11.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q11 (Art. 10 restriction on asserting unrelated illegality).
Standing EXISTS. The claim is DISMISSED on the merits (棄却), not 却下 for lack of standing. Trap: confuse 却下 and 棄却.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「主張制限 — 適格があっても棄却」
Chip:「却下と棄却を混ぜるな」

Left 論点:
1. 原告適格はある？ → YES。適格欠如の却下ではない
2. 主張は？ → 自己の法律上の利益に関係のない違法だけ
3. 判決は？ → 取消を求められないので、請求を棄却する（10条）

Center: door「適格○」open; inside a stamp「関係のない違法」leads to「棄却」not「却下」. Side bin labeled「却下＝適格なし」as trap.
Labels:「原告（取消したい）」／「裁判所（主張制限で落とす）」

Right ひっかけ:
- 適格なしとして却下する
- 棄却と却下を取り違える

Bottom:
- 判断軸:「適格○。関係ない違法では取消不可→棄却」
- ひっかけ:「10条は適格があっても落ちる条項」
- 暗記:「関係のない違法では取消を求められず、請求を棄却する」
Answer EXACT:
「自己の法律上の利益に関係のない違法では取消を求められないため、請求を棄却する。」
```

---

## Q12 第三者の再審〔行訴法22条・34条〕

保存: `q12.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q12 (third-party retrial after a final cancellation judgment).
Asked point: within 30 days from learning of the final judgment, file a retrial. Trap: stop at intervention procedure (22).
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「参加できなかった第三者 — 知った日30日の再審」
Chip:「参加手続で終わらせない」

Left 論点:
1. 訴訟参加の申立てが本題？ → NO。判決確定後の不服
2. いつまで？ → 確定判決を知った日から30日以内
3. 何で争う？ → 再審の訴えをもって不服の申立て（34条）

Center: calendar「知った日→30日」and a stamp「再審」. Side door「参加・職権」as trap not the answer.
Labels:「第三者（攻防を尽くせなかった）」／「確定判決（効力が及ぶ）」

Right ひっかけ:
- 参加手続の話で終わる
- 期間を出訴期間の3か月などと混ぜる

Bottom:
- 判断軸:「知った日から30日以内に再審」
- ひっかけ:「責めに帰さない・攻防不能は要件だが、問は30日の再審」
- 暗記:「知った日から30日以内に、再審の訴えで不服申立て」
Answer EXACT:
「確定判決を知った日から30日以内に、再審の訴えをもって不服の申立てをすることができる。」
```

---

## Q13 釈明処分の特則〔行訴法23条の2〕

保存: `q13.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q13 (special measure for clarification).
Toward the disposing agency: may request submission of all or part of materials the agency holds. Trap: 送付嘱託 to other agencies.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「釈明処分の特則 — 処分庁に資料提出を求める」
Chip:「送付嘱託は別」

Left 論点:
1. その他の行政庁への送付嘱託か？ → NO。問は処分庁
2. 何を求める？ → 行政庁が保有する資料の全部又は一部の提出
3. 義務か？ → 求めることができる（義務と断定しない）

Center: court pointing at disposing agency's file cabinet「提出」. Side arrow to another agency「送付嘱託」as trap.
Labels:「裁判所（資料の偏在を是正したい）」／「処分庁（資料を持っている）」

Right ひっかけ:
- 送付嘱託側と混同する
- 必ず提出させなければならない、と義務化する

Bottom:
- 判断軸:「処分庁に対し、保有資料の全部又は一部の提出を求める」
- ひっかけ:「相手が処分庁か、その他の庁かで手段が違う」
- 暗記:「処分庁に、保有資料の全部又は一部の提出を求めることができる」
Answer EXACT:
「処分庁に対し、行政庁が保有する資料の全部又は一部の提出を求めることができる。」
```

---

## Q14 無効等確認の訴えと補充性〔行訴法36条〕

保存: `q14.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q14 (supplementarity of invalidity confirmation).
May file ONLY if the purpose cannot be achieved by an action concerning the present legal relation. Trap: always available after missing cancellation period.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「無効確認 — 現在の法律関係の訴えで足りないときに限り」
Chip:「民事で足りるなら落ちる」

Left 論点:
1. 出訴期間徒過なら常に無効確認？ → NO。補充性が要る（36条）
2. 門は？ → 現在の法律関係に関する訴えによって目的を達することができないものに限り
3. 民事差止め等で足りる？ → そのときは無効確認は落ちる

Center: two paths. Path A「現在の法律関係の訴え」if enough, stop. Path B only if A cannot achieve the purpose →「無効等確認」.
Labels:「周辺住民（無効確認したい）」／「事業者（民事で足りると主張）」

Right ひっかけ:
- 期間徒過＝当然に無効確認、と書く
- 補充性の文言を落とす

Bottom:
- 判断軸:「現在の法律関係の訴えで目的達成不可のときに限り」
- ひっかけ:「民事で足りるなら無効確認は使えない」
- 暗記:「現在の法律関係の訴えで目的を達せないものに限り提起できる」
Answer EXACT:
「現在の法律関係に関する訴えによって目的を達することができないものに限り提起できる。」
```

---

## Q15 条例制定行為の処分性

保存: `q15.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q15 (dispositive character of an ordinance abolishing nursery schools).
Exception: effect arises without waiting for a further disposition, and it directly affects specific enrolled children etc. Trap: stop at the principle「立法に処分性なし」.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「条例の処分性 — 処分を待たず、特定の者に直接」
Chip:「原則却下で止まるな」

Left 論点:
1. 立法行為は原則処分性なし？ → YES。原則は却下
2. 例外は？ → 施行により処分を待たず廃止の効果が生じる
3. 誰に？ → 特定の入所児童等に直接影響するから、処分性あり

Center: ordinance stamp abolishing a nursery; no extra「処分」wait; arrow hits specific children. Principle tag「立法＝却下」small, exception is the main road.
Labels:「保護者（取消訴訟をしたい）」／「市（立法だと主張）」

Right ひっかけ:
- 原則却下だけで答案を終わる
- 「特定の者に直接」を落とす

Bottom:
- 判断軸:「処分を待たず効果が生じ、特定の者に直接影響するか」
- ひっかけ:「原則論だけで例外を書かない」
- 暗記:「処分を待たず廃止の効果が生じ、特定の入所児童等に直接影響する」
Answer EXACT:
「施行により処分を待たず廃止の効果が生じ、特定の入所児童等に直接影響するからである。」
```

---

## Q16 仮の義務付け〔行訴法37条の5〕

保存: `q16.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest 行政法記述 Q16 (temporary mandamus / 仮の義務付け).
Need BOTH: join cancellation suit AND mandamus, AND file for 仮の義務付け. Trap: only 執行停止, or only the merits suits without the provisional petition.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: owl slot only. SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png. Not a scene character. No nameplate.

Title:「仮の義務付け — 取消と義務付けを併合し、申立て」
Chip:「執行停止だけでは足りない」

Left 論点:
1. 本案判決を待てるか？ → NO。償うことのできない損害のおそれ（入園時期）
2. 本案は？ → 取消訴訟と義務付けの訴えを併合提起
3. 仮の救済は？ → 仮の義務付けの申立て

Center: checklist of three boxes all checked「取消」「義務付け」「仮の義務付け」. Side stamp「執行停止」as insufficient trap.
Labels:「保護者（今すぐ入園させたい）」／「行政庁（不許可処分）」

Right ひっかけ:
- 本案だけ・執行停止だけで終わる
- 取消と義務付けの併合を落とす
- 公共の福祉の除外に逃げて手段を書かない

Bottom:
- 判断軸:「取消＋義務付けを併合し、仮の義務付けを申し立てる」
- ひっかけ:「執行停止は別メニュー。問は仮の義務付け」
- 暗記:「取消と義務付けを併合提起し、仮の義務付けを申し立てる」
Answer EXACT:
「取消訴訟と義務付けの訴えを併合提起し、仮の義務付けの申立てをすればよいのである。」
```

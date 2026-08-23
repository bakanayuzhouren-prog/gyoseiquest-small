# 民法記述・前半 全問画像プロンプト（Q1-1〜Q21）

範囲: **総則〜物権の前半**（Q22 根抵当から後半）。枝番込み **23問**。  
旧バッチ（`codex-batch-q2-q11.md` / `codex-batch-q12-q21.md`）は見出しが古いので **使わない**。本ファイルが正本。

参照: レイアウト=`approved-shusaisha-kyoka.png`／案内役=**ちゃちゃロット**（`chachalot.png`＋`approved-smiling-hat-mascot.png`）／見出し見本=`codex-q1-126-ronten.md`／Q1-1型=`codex-q1-1-13-hosanin.md`  
保存: `assets/images/deepdive/textbook/minpou-kijutsu/q{スロット}.png`  
生成: **1問ずつ**。量産禁止。e-Govチェック済み答案を答え帯にそのまま使う。X投稿は誤情報チェック前禁止。

| 優先 | 問 | 保存 | メモ |
|------|----|------|------|
| 済 | Q1-1 | `q1-1.png` | 再生成しない（てらしぃ完成済） |
| 任意 | Q1-2 | `q1.png` | 論点から「土地売買は取り消せる？」を外す改稿。上書きは期間図だけ |
| **要1から** | Q4 | `q4.png` | 走者は **C vs D**（Aは買主にしない） |
| **要1から** | Q5 | `q5.png` | **①又は②**。「要る2つ」禁止 |
| **要1から** | Q9 | `q9.png` | 145＝援用／代位＝**423** |
| **要1から** | Q11 | `q11.png` | 無過失は推定されない |
| 新規 | Q11-2 | `q11-2.png` | 何を立証するか。`q11.png`を上書きしない |
| 他 | Q2–Q3, Q6–Q8, Q10, Q12–Q21 | `q{N}.png` | 法律OKでも本プロンプトで作り直してよい（てらしぃが生成したとき） |

各ブロックは **そこから末尾までをCodexに1問分として渡す**。

---

## 全問共通STRICT（各プロンプトに既に埋め込み済み）

- 左見出し「論点」。右「ひっかけ」。GOとYES混在禁止。論点にGO/STOP禁止。「だれが」「問が聞くこと」「（聞かない）」禁止。
- 人物下は `役割（何をしたいか）`。（〇条）を本文行に書く。
- 案内役は **ちゃちゃロット**。従来のフクロウと同じ：下の余白に小さく、指し棒で暗記を指すだけ。中央の登場人物にしない。名札は図に書かない。`chachalot.png` を参照。帽子は耳ではない。熊化禁止。
- 16:9 暖色オフホワイト。答え帯は答案の芯と一字一句同じ（字数括弧は図に出さない）。

---

## Q1-1 保佐の同意〔13条・120条〕 — 済

保存: `q1-1.png`（**`q1.png` 禁止**）  
詳細正本: `codex-q1-1-13-hosanin.md`  
再生成しない。

---

## Q1-2 保佐の取消し期間〔126条〕

保存: `q1.png`（Q1-1の `q1-1.png` を触らない）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q1-2 (Civil Code 126).
Do NOT save as q1-1.png. This is the PERIOD question only.
16:9 warm off-white, navy title, left green「論点」/ right orange「ひっかけ」, center one scene,
bottom 判断軸 / ひっかけ / 暗記, answer capsule. Large Japanese, no overlap.
NO GO/STOP on 論点. Never mix GO and YES. Never「だれが」. Never「問が聞くこと」. Never「（聞かない）」.

Title:「保佐の取消し期間 — いつから・いつまで (126条)」
Chip:「自転車の取消可否は別問（13条）」

Left 論点 Q&A (no GO):
1. ５年の起算は？ → 追認することができる時（126条）
2. ２０年の起算は？ → 行為の時（126条）
3. 期間は？ → ５年または２０年（126条）
Do NOT put「土地売買は取り消せる？ → YES」on 論点 (that is Q1-1).

Center: two people by a land sign「甲土地」.
Labels:「保佐人（契約を取り消したい）」／「相手方（売買の相手）」

Right ひっかけ:
- 自転車の日常購入（取消可否は別問）
- 詐術の有無
- Bの善意
- 起算を行為の時だけにする（５年まで行為の時にしない）

Bottom:
- 判断軸:「５年は追認できる時から。２０年は行為の時から（126条）」
- ひっかけ:「自転車・詐術・善意に釣られるな。問は甲土地の期間だけ」
- 暗記:「追認できる時から５年／行為の時から２０年」
Answer:
「Xは追認できる時から５年又は行為の時から２０年以内に取消権を行使すればよい。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses, not a bear/owl/cat).
```

---

## Q2 詐術〔21条〕

保存: `q2.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q2 (Civil Code 21).
16:9 warm off-white, navy title, left「論点」Q&A / right「ひっかけ」, one center metaphor,
bottom 判断軸 / ひっかけ / 暗記, answer capsule. NO GO on 論点. Never mix GO and YES. Never「だれが」.

Title:「詐術21条 — 黙秘でも当たるとき」
Chip:「黙秘＝即詐術は×」

Left 論点:
1. 黙秘だけで詐術？ → NO
2. 当たるのは？ → 信じさせるため＋他の言動とあいまって（21条・判例）
3. 結果は？ → 誤信させ又は誤信を強めた

Center: wall「黙秘」with a side gate「他の言動とあいまって」opening to「詐術」.
Labels:「未成年者（取り消したい）」／「相手方（誤信した側）」

Right ひっかけ:
- 黙秘しただけで詐術
- 別店の文房具購入
- 店員が顔を知っているだけ

Bottom:
- 判断軸:「黙秘単体？否。他の言動とあいまって誤信させ／強めたか」
- ひっかけ:「黙秘＝直ちに詐術、に釣られるな」
- 暗記:「信じさせるため＋他の言動とあいまって＋誤信させ又は強めた」
Answer:
「信じさせるため、他の言動とあいまって、相手方を誤信させ又は誤信を強めたときである。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q3 心裡留保〔93条〕

保存: `q3.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q3 (Civil Code 93).
NO GO badges on 論点. Never mix GO and YES. Never「だれが」.

Title:「心裡留保93条 — 原則有効／いつ無効」
Chip:「94条と入口を混ぜるな」

Left 論点:
1. 原則の効力は？ → 有効（93条1項）
2. 無効になるのは？ → 相手方が真意でないことを知り又は知ることができたとき
3. 94条の虚偽表示か？ → NO。入口が違う

Center: fork. One road「原則・有効」. One gate「相手の悪意・過失 → 無効」.
Labels:「表意者（冗談のつもり）」／「相手方（真意でないことを知り得た）」

Right ひっかけ:
- 通謀虚偽表示（94条）の話に逃げる
- 別友人への冗談
- 未登記担保の噂

Bottom:
- 判断軸:「誰の認識？相手方。真意でないことを知り又は知り得た」
- ひっかけ:「虚偽表示（94）や冗談エピソードに逃げるな」
- 暗記:「原則有効。相手が知り／知り得たとき無効」
Answer:
「意思表示は原則有効だが、相手方が真意でないことを知り又は知ることができたときは無効となる。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q4 通謀虚偽表示〔94条・177条〕※1から

保存: `q4.png`  
走者は **買主C vs 買主D**。Aを買主と書かない。

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q4 (Civil Code 94 and 177).
Never write「買主A」. A is the sham transferor (owner), not a buyer.
NO GO on 論点. Never「だれが」.

Title:「通謀虚偽表示 — 善意同士は登記勝負」
Chip:「物置・地役権はトラップ」

Left 論点:
1. CはDに勝てる？ → YES（条件つき）
2. 善意？ → 虚偽表示につき善意（94条2項）
3. 登記？ → Dより先に対抗要件（177条）

Center: two-lane race to arch「登記」.
Green racer「買主C（先に登記したい）」
Orange racer「買主D（未登記の買主）」
Tiny off-track: A＝仮装の所有者 / B＝通謀相手. NEVER label A as 買主.

Right ひっかけ:
- 当事者間の無効だけで終わる
- 物置・地役権の枝葉

Bottom:
- 判断軸:「善意？＋先に登記を備えたか（177条）」
- ひっかけ:「無効だから負け、と早とちりするな」
- 暗記:「善意＋先に登記」
Answer:
「虚偽表示につき善意であり、Dより先に対抗要件としての登記を備えたときである。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q5 錯誤〔95条3項〕※1から

保存: `q5.png`  
**①又は②**。「要る2つ」「かつ」禁止。

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q5 (Civil Code 95(3)).
Never use title「要る2つ」. Never imply BOTH exceptions are required. Use「①又は②」.
NO GO on 論点. Never mix GO and YES. Never「だれが」.

Title:「錯誤95条 — 重過失でも取消せる例外（①又は②）」
Chip:「両方必要ではない」

Left 論点:
1. 重過失でも取消せる？ → YES（例外①又は②）
2. 例外①は？ → 相手方が知り又は重過失で知らなかった（3項一）
3. 例外②は？ → 双方同一の錯誤（3項二）

Center: STOP gate「表意者の重大な過失」then two OR-doors「例外①」「例外②」.
Big badge「①又は②」（not かつ, not 要る2つ）.
Labels:「表意者（取消したい）」／「相手方（契約の相手）」

Right ひっかけ:
- 動機錯誤の話に逃げる
- 「重過失＝即アウト」だけで終わる

Bottom:
- 判断軸:「表意者に重過失でも、例外①又は②なら取消し可（95条3項）」
- ひっかけ:「動機錯誤・表示や『重過失＝即アウト』に引っ張られるな」
- 暗記:「知り／重過失で知らなかった　又は　双方同一錯誤」
Answer:
「相手方が錯誤を知り若しくは重過失で知らなかったとき、又は双方同一の錯誤のとき。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q6 代理権の濫用〔107条〕

保存: `q6.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q6 (Civil Code 107).
NO GO on 論点. Never「だれが」.

Title:「代理権の濫用107条 — 無権代理みなし／追認拒絶」
Chip:「乙土地・損害賠償はトラップ」

Left 論点:
1. どう扱われる？ → 無権代理とみなす（107条）
2. 本人は何をする？ → 相手方に追認を拒絶する
3. 相手の認識は？ → 知り又は知り得たとき

Center: agent handing a deed aside while the principal holds a stamp「追認拒絶」.
Labels:「本人（効力を否定したい）」／「相手方（濫用を知り得た）」／「代理人（着服目的）」

Right ひっかけ:
- 乙土地の別件交渉
- 損害賠償だけで終わる
- 代理権の範囲内だから有効、で止まる

Bottom:
- 判断軸:「相手が知り／知り得た→無権代理みなし。追認拒絶で否定」
- ひっかけ:「範囲内だから有効、に釣られるな。答案に追認拒絶を書く」
- 暗記:「無権代理とみなすので追認を拒絶すれば足りる」
Answer:
「無権代理とみなされるので、本人Aは相手方Cに対し追認を拒絶すれば足りるのである。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q7 自己契約〔108条〕

保存: `q7.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q7 (Civil Code 108).
NO GO on 論点. Never「だれが」.

Title:「自己契約108条 — 無権代理みなし／事前許諾は除く」
Chip:「口頭の『安ければ誰でも』は許諾ではない」

Left 論点:
1. 自己契約はどう扱われる？ → 代理権を有しない者がした行為とみなす（108条）
2. 例外は？ → あらかじめ許諾した行為は除く
3. 双方代理の噂で結論が変わる？ → NO。問は自己契約

Center: one person wearing two hats (seller-agent / buyer) with a small exception ticket「事前許諾」.
Labels:「本人（売却を依頼した）」／「代理人（自ら買主になった）」

Right ひっかけ:
- 双方代理の別話に逃げる
- 口頭の曖昧な許可を許諾と書く

Bottom:
- 判断軸:「原則＝代理権なし。例外は事前許諾」
- ひっかけ:「双方代理や口頭の曖昧な許可に引っ張られるな」
- 暗記:「みなし無権。ただしあらかじめ許諾した行為は除く」
Answer:
「代理権を有しない者がした行為とみなされる。ただし、あらかじめ許諾した行為は除く。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q8 無権代理の追認〔116条等〕

保存: `q8.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q8 (unauthorized agency ratification).
NO GO on 論点. Never「だれが」.
Do NOT write 5年/20年/126 on 論点 (not this question).

Title:「無権代理の追認 — 効力は行為の時に遡及」
Chip:「制限行為能力の追認と混ぜるな」

Left 論点:
1. 追認すると？ → 本人に対して効力を生ずる
2. いつの効力？ → 行為の時に遡及（116条）
3. 取消しができなくなる話か？ → NO。問は遡及効

Center: clock rewinding from「追認」back to「行為の時」with a valid-stamp on the contract.
Labels:「本人（追認する）」／「相手方（契約の相手）」

Right ひっかけ:
- 制限行為能力の取消し・追認
- 相手方の取消し
- 「有効化」と「取消不可」の取り違え

Bottom:
- 判断軸:「無権代理の追認＝効力＋行為時に遡及」
- ひっかけ:「制限行為能力の追認と混同するな」
- 暗記:「追認により効力を生じ、行為の時に遡及して生ずる」
Answer:
「追認により本人に対して効力を生じ、その効果は行為の時に遡及して生ずるのである。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q9 時効援用の代位〔145条・423条〕※1から

保存: `q9.png`  
**145＝援用。代位＝423。** 「145条（債権者代位権）」禁止。

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q9.
Never write「145条（債権者代位権）」. 145＝援用. 代位＝423条.
NO GO on 論点. Never「だれが」.

Title:「時効援用 — 代位で本人の援用をする」
Chip:「差押・口頭約束はトラップ」

Left 論点:
1. 完成だけで足りる？ → NO。援用が要る（145条）
2. 本人が援用しないとき？ → 債権者代位で援用（423条）
3. 145条は代位か？ → NO。145＝援用／代位＝423条

Center: door「時効の効果」opened by key「援用（145条）」.
A second arm「債権者代位（423条）」turns the SAME key.
Banner: 完成 → 援用 → 効果. Keep 145 and 423 on separate labels.
Labels:「債権者（時効を援用したい）」／「債務者（援用しない）」／「第三者（時効の相手）」

Right ひっかけ:
- 差押だけで足りる
- 口頭の約束で援用できる
- 本人以外が勝手に援用できる

Bottom:
- 判断軸:「時効は援用して初めて効く。代位(423)で本人の援用(145)」
- ひっかけ:「完成＝自動消滅と思うな。差押や口頭約束は援用ではない」
- 暗記:「代位により消滅時効を援用すれば足りる」
Answer:
「Aは債権者代位権によってXのYに対する当該債務の消滅時効を援用すれば足りる。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q10 協議を行う旨の合意〔151条〕

保存: `q10.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q10 (Civil Code 151).
NO GO on 論点. Never「だれが」.

Title:「協議合意151条 — 書面又は電磁的記録で完成猶予」
Chip:「催告6か月と混ぜるな」

Left 論点:
1. 口頭の話し合いで足りる？ → NO
2. 何が要る？ → 協議を行う旨の合意を書面又は電磁的記録で（151条）
3. 効果は？ → 時効の完成が猶予される

Center: document/tablet stamp「書面／電磁的記録」pausing an hourglass「時効」.
Labels:「債権者（完成を猶予したい）」／「債務者（協議の相手）」

Right ひっかけ:
- 催告すれば6か月猶予、のルートで書く
- 口頭合意で足りる
- 保証人Cの話に逃げる

Bottom:
- 判断軸:「協議合意は書面又は電磁的記録。催告ルートと使い分ける」
- ひっかけ:「催告6か月／口頭合意に釣られるな」
- 暗記:「協議を行う旨の合意を書面又は電磁的記録で」
Answer:
「協議を行う旨の合意を書面又は電磁的記録ですれば、時効の完成が猶予されるのである。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q11 取得時効の推定〔186条〕※1から

保存: `q11.png`（**`q11-2.png` にしない**）  
タイトルに「占有の証明で足りるか」を使わない。

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q11.
Do not use title「なぜ占有の証明で足りるか」. That reads as if possession alone is enough.
NO GO on 論点. Never「だれが」.

Title:「取得時効 — 186条推定（無過失は推定されない）」
Chip:「占有だけで足りる、ではない」

Left 論点:
1. 占有だけで足りる？ → NO
2. 186条が推定するのは？ → 所有意思・善意・平穏・公然（186条1項）
3. 無過失は？ → 推定されない（自分で示す）←立証の中身は別問Q11-2

Center: shield「186条の推定」with four icons: 所有意思 / 善意 / 平穏 / 公然.
Separate bubble「無過失は別」（NOT inside the shield).
Labels:「占有者（取得時効を主張したい）」／「所有者（争う側）」

Right ひっかけ:
- 無過失まで推定される、と誤解
- 乙土地の短期間占有

Bottom:
- 判断軸:「推定で足りるものは？所有意思・善意・平穏公然（186条）」
- ひっかけ:「無過失も推定、と思い込むな」
- 暗記:「所有意思をもって善意で平穏かつ公然と占有すると推定」
Answer:
「占有者は所有の意思をもって善意で平穏にかつ公然と占有するものと推定されるからである。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q11-2 取得時効の立証〔162条2項〕※新規

保存: **`q11-2.png`**（`q11.png` を上書きしない）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q11-2 (what to prove).
Do NOT save over q11.png. That file is the WHY (186 presumption).
NO GO on 論点. Never「だれが」.

Title:「10年の取得時効 — 何を立証するか」
Chip:「なぜ足りるかは別問（186条）」

Left 論点:
1. 所有意思・善意・平穏・公然は？ → 推定（186条）なので自分で示さなくてよい
2. 無過失は？ → 推定されない。占有開始時の無過失を立証（162条2項）
3. ほかに要るのは？ → 十年間占有した事実

Center: checklist with two ticks「10年の占有」「開始時の無過失」and a grayed row「所有意思・善意・平穏・公然＝推定」.
Labels:「占有者（立証したい）」／「所有者（争う側）」

Right ひっかけ:
- 所有意思まで全部自分で立証する
- 乙土地の短期間占有
- なぜ足りるか（186）の説明で終わる

Bottom:
- 判断軸:「10年なら占有の事実＋開始時の無過失。善意は推定」
- ひっかけ:「全部自分で証明、と思い込むな。無過失は落とすな」
- 暗記:「十年間占有した事実と、自己の物と信じるについて無過失」
Answer:
「十年間占有した事実と、自己の物と信じるについて無過失であることを立証すれば足りる。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q12 混同と地上権〔179条〕

保存: `q12.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q12 (Civil Code 179).
NO GO on 論点. Never「だれが」.

Title:「混同179条 — 第三者の権利の目的なら消滅しない」
Chip:「銀行の担保を落とすな」

Left 論点:
1. 地上権と所有権が同一人に？ → 原則は混同で消滅し得る
2. 例外は？ → 第三者の権利の目的となっているとき（179条）
3. このとき地上権は？ → 混同によっても消滅しない

Center: land「甲土地」with a surface-right stake pinned by bank stamp「Cの抵当」so it cannot vanish.
Labels:「地上権者（所有権も取得した）」／「抵当権者（担保を残したい）」

Right ひっかけ:
- 混同＝常に消滅
- 建物の別抵当Eで結論を変える
- 相続人Dの「消えるはず」主張

Bottom:
- 判断軸:「第三者の権利の目的か？→混同でも地上権は残る」
- ひっかけ:「混同したら担保も消える、と思い込むな」
- 暗記:「第三者の権利の目的→混同によっても消滅しない」
Answer:
「地上権が第三者の権利の目的となっているときは、混同によっても消滅しないのである。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q13 指図による占有移転〔184条・192条〕

保存: `q13.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q13 (Civil Code 184 and 192).
NO GO on 論点. Never「だれが」. 「かつ」を落とさない.

Title:「指図184条 — 手元になくても即時取得」
Chip:「占有改定と混ぜるな」

Left 論点:
1. 現実の引渡しがないと即時取得不可？ → NO
2. 何が要る？ → BがDに以後Cのため占有することを命じ、かつCが承諾（184条）
3. 占有改定と同じ？ → NO

Center: warehouse D turning an arrow from B to C; gate「Cの承諾」.
Labels:「譲受人（即時取得したい）」／「倉庫業者（保管している）」

Right ひっかけ:
- 現実の引渡しがないから即時取得不可
- 占有改定（売主が持ち続ける）の話

Bottom:
- 判断軸:「指図＋承諾＝占有移転。手元に物がなくても足りる」
- ひっかけ:「現実の引渡し必須／占有改定、に逃げるな」
- 暗記:「以後Cのため占有せよ＋Cが承諾」
Answer:
「BがDに以後Cのために占有することを命じ、かつCがこれを承諾したときである。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q14 占有改定と先取特権〔333条〕※横断入口

保存: `q14.png`  
答案はQ20と同じ。図の主役は **333では占有改定＝引渡し**. 192はひっかけ。根拠は **大判大6.7.26**（昭32は192）。

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q14 (Civil Code 333).
NO GO on 論点. Never「だれが」.
Do NOT cite 最判昭32 or 昭35 as the basis for 333. Those are 192 (immediate acquisition).
333 basis: 大判大6.7.26.

Title:「占有改定と先取特権333 — 引渡しになるから行使できない」
Chip:「192の話を333に持ち込むな」

Left 論点:
1. 占有改定は引渡しか（333）？ → YES（大判大6）
2. 先取特権は行使できる？ → NO
3. 192条と同じ結論？ → NO。192では占有改定は引渡しにならない

Center: seller still holding goods with stamp「占有改定＝引渡し（333）」; padlock「先取特権」falls off.
Labels:「先取特権者（差し押さえたい）」／「第三取得者（占有改定で買った）」

Right ひっかけ:
- 即時取得（192）では占有改定×、を333にコピー
- 昭和32・35年判例を333の根拠にする

Bottom:
- 判断軸:「占有改定は333では引渡し→行使不可」
- ひっかけ:「192＝×を333にコピーするな（根拠は大判大6.7.26）」
- 暗記:「占有改定＝引渡し→先取特権を行使できない」
Answer:
「占有改定といい、これは引渡しにあたるから、Xは先取特権を行使できないのである。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q15 盗品・遺失物の回復〔193条〕

保存: `q15.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q15 (Civil Code 193).
NO GO on 論点. Never「だれが」.

Title:「盗品・遺失物193条 — 2年で回復請求」
Chip:「占有回収の1年と混ぜるな」

Left 論点:
1. 即時取得で所有が移ったら回復不能？ → NO。193条の回復がある
2. 起算と期間は？ → 盗難又は遺失の時から２年間
3. 誰に？ → 占有者に対してその物の回復を請求

Center: painting moving to a new possessor; calendar「2年」route「193条回復」beside a smaller wrong sign「1年」.
Labels:「被害者（取り戻したい）」／「占有者（即時取得した）」

Right ひっかけ:
- 即時取得で所有が移ったから回復不能
- 占有回収の訴え（1年）と混同

Bottom:
- 判断軸:「起算は盗難・遺失の時。期間は2年。相手は占有者」
- ひっかけ:「即時取得で終わり／占有回収1年、に釣られるな」
- 暗記:「盗難又は遺失の時から2年、占有者に回復請求」
Answer:
「盗難又は遺失の時から２年間、占有者に対してその物の回復を請求すればよいのである。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q16 占有回収の訴え〔200条〕

保存: `q16.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q16 (Civil Code 200).
NO GO on 論点. Never「だれが」.

Title:「占有回収200条 — 侵奪時から1年」
Chip:「所有権返還と混ぜるな」

Left 論点:
1. いつまでに？ → 占有を侵奪された時から１年以内
2. 何の訴え？ → 占有回収の訴え
3. 何を請求？ → 返還及び損害賠償

Center: clock「侵奪時」→ gate「1年」→ claims「返還＋損害賠償」.
Labels:「貸主（占有を取り戻したい）」／「侵奪者（盗んだ側）」

Right ひっかけ:
- 所有権に基づく返還請求の期間で書く
- 193条の2年回復と混同
- 特定承継の追及で終わる

Bottom:
- 判断軸:「起算＝侵奪時。期間＝1年。請求＝返還及び損害賠償」
- ひっかけ:「所有権の話／2年回復と取り違えるな」
- 暗記:「侵奪時から1年以内に回収の訴え＋返還及び損害賠償」
Answer:
「占有を侵奪された時から１年以内に占有回収の訴えを提起し、返還及び損害賠償を請求できる。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q17 動産の付合〔243条・248条〕

保存: `q17.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q17 (Civil Code 243 and 248).
NO GO on 論点. Never「だれが」. This Q is 主従あり only.

Title:「動産の付合 — 主従ありは単独所有＋償金」
Chip:「主従なし共有は別型」

Left 論点:
1. 主従が明らかなとき所有は？ → 主たる動産の所有権に帰属（243条）
2. 従前の所有者は？ → 不当利得の規定により償金を請求（248条）
3. 加工・混和と同じ？ → NO

Center: two objects fused; the larger one wears a crown「主」; coin「償金」goes to the former owner of the smaller.
Labels:「主物の所有者（帰属する）」／「従物の旧所有者（償金を求める）」

Right ひっかけ:
- 主従なし→価格割合の共有（244条）で書く
- 加工・混和に逃げる

Bottom:
- 判断軸:「主従あり→単独所有＋償金。問はこちら」
- ひっかけ:「主従なし共有や加工・混和に広げない」
- 暗記:「主たる動産に帰属し、不当利得により償金を請求」
Answer:
「主たる動産の所有権に帰属し、従前の所有者は不当利得の規定により償金を請求できる。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q18 地役権の時効取得〔283条〕

保存: `q18.png`  
**かつ** を落とさない。

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q18 (Civil Code 283).
NO GO on 論点. Never「だれが」. Keep「かつ」. Do not write 又は between 継続 and 外形.

Title:「地役権の時効取得283条 — 継続かつ外形認識」
Chip:「通常の取得時効要件だけでは不足」

Left 論点:
1. 所有権の取得時効と同じで足りる？ → NO
2. 特別の要件は？ → 継続的に行使され、かつ外形上認識することができるもの
3. 「又は」で足りる？ → NO。「かつ」

Center: visible path across a neighboring lot with two stamps「継続」「外形認識」AND-joined.
Labels:「要役地側（時効取得したい）」／「承役地所有者（争う）」

Right ひっかけ:
- 162条の要件だけで足りる
- 継続と外形を「又は」でつなぐ

Bottom:
- 判断軸:「継続的行使 かつ 外形上認識できるものに限る」
- ひっかけ:「通常の取得時効要件だけで足りると書くな」
- 暗記:「継続的に行使され、かつ外形上認識することができるものに限り」
Answer:
「継続的に行使され、かつ外形上認識することができるものに限り時効取得できるのである。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q19 留置権と必要費〔295条〕

保存: `q19.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q19 (Civil Code 295).
NO GO on 論点. Never「だれが」.

Title:「留置権 — 必要費なら明渡しを拒める」
Chip:「敷金では留置できない」

Left 論点:
1. 修理代（必要費）で留置できる？ → YES（295条）
2. 被担保債権は？ → 必要費償還請求権
3. 効果は？ → 明渡しを拒むことができる

Center: leaking roof repaired; tenant holding the key until coin「必要費」is paid. Small rejected tag「敷金」.
Labels:「賃借人（明渡しを拒みたい）」／「新賃貸人（明渡しを求める）」

Right ひっかけ:
- 敷金返還請求で留置する
- 有益費（相当期限の許与）の話で終わる

Bottom:
- 判断軸:「牽連性。必要費償還請求権を被担保債権とする留置」
- ひっかけ:「敷金や有益費に釣られるな。問は必要費の留置」
- 暗記:「必要費償還請求権を被担保債権とする留置権で明渡しを拒む」
Answer:
「必要費償還請求権を被担保債権とする留置権を主張して、明渡しを拒むことができる。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q20 動産先取特権と占有改定〔333条〕

保存: `q20.png`  
Q14と同答案。図は **333単体**（192はひっかけ一言だけ）。

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q20 (Civil Code 333).
NO GO on 論点. Never「だれが」.
Do NOT cite 昭32 as 333. 333 = 大判大6.7.26. 192 = 占有改定は引渡しにならない.

Title:「333条 — 占有改定は引渡しだから先取特権を行使できない」
Chip:「占有改定は引渡しに当たらない、は誤り」

Left 論点:
1. 占有改定は引渡しか（333）？ → YES
2. 先取特権は行使できる？ → NO
3. 根拠判例を昭32にしてよい？ → NO（それは192）

Center: goods staying with the seller; stamp「占有改定＝引渡し」; privilege mark X'd out.
Labels:「先取特権者（行使したい）」／「第三取得者（占有改定で取得）」

Right ひっかけ:
- 占有改定は引渡しに当たらないから先取特権は残る
- 192条の結論をコピー

Bottom:
- 判断軸:「333の引渡し＝占有改定○。行使できない」
- ひっかけ:「192条の結論を持ち込まない。根拠は大6」
- 暗記:「占有改定といい、これは引渡しにあたるから行使できない」
Answer:
「占有改定といい、これは引渡しにあたるから、Xは先取特権を行使できないのである。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## Q21 抵当権の順位変更〔374条〕

保存: `q21.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q21 (Civil Code 374).
NO GO on 論点. Never「だれが」.

Title:「抵当権の順位変更374条 — 合意＋利害関係人＋登記」
Chip:「債務者・保証人の同意は不要寄り」

Left 論点:
1. 何が要る？ → 各抵当権者の合意
2. 転抵当のDは？ → 利害関係人の承諾が要る
3. あと何か？ → 順位変更の登記

Center: three ranked medals swapping order; a lock「Dの承諾」and a registry stamp.
Labels:「抵当権者（順位を変えたい）」／「転抵当権者（利害関係人）」

Right ひっかけ:
- 債務者E・保証人Fの同意が必須、と書く
- 登記不要

Bottom:
- 判断軸:「合意＋利害関係人承諾＋登記。転抵当は利害関係人」
- ひっかけ:「債務者・保証人の同意は不要寄り。問は合意＋利害関係人＋登記」
- 暗記:「各抵当権者の合意及び利害関係人の承諾のうえ登記」
Answer:
「各抵当権者の合意及び利害関係人であるDの承諾を得たうえで、順位変更の登記をする。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
```

---

## 生成後（Cursor）

1. 目視: 論点GO混在／だれが／又は・かつ／起算／条番号の取り違え
2. 枝番ファイルを取り違えない（`q1`≠`q1-1`、`q11`≠`q11-2`）
3. MDの `[[image:]]` と `npm run generate:deepdive-images` → `bundle:db-textbooks`
4. Xは誤情報チェック通過まで禁止

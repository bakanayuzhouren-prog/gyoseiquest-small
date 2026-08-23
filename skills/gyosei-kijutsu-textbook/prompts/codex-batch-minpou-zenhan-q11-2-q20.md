# 民法記述・第2バッチ画像プロンプト（Q11-2〜Q20・10問）

てらしぃ向け: **このファイルを Codex に渡す。** 各 ` ```text ` ブロックを **1問ずつ** 生成。Q2〜Q11は済。本バッチは次の10問。

- 正本の中身は `codex-batch-minpou-zenhan-q1-q21.md` と同じ答案。本ファイルは **量産2用の渡し方**（帽子強化・ファイル取り違え防止）。
- 旧 `codex-batch-q12-q21.md` は使わない。
- 参照: レイアウト=`skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png` ／ 案内役=**ちゃちゃロット**（`assets/images/characters/chachalot.png` ＋ `approved-smiling-hat-mascot.png`） ／ 見出し見本=`codex-q1-126-ronten.md` ／ 完成済レイアウト=`assets/images/deepdive/textbook/minpou-kijutsu/q1-1.png`
- 保存: `assets/images/deepdive/textbook/minpou-kijutsu/q{スロット}.png`
- **`q11.png` は上書き禁止**（Q11・186推定は済）。本バッチ先頭は **`q11-2.png`**。
- **Q14 と Q20 は答案が同じ。図の主役を変える。** Q14＝横断（192はひっかけ）／Q20＝333単体。
- 生成後X禁止。誤情報チェックは `_image-legal-check.md`。
- 生成後（Cursor）: MDに `[[image:]]`（Q11-2〜Q20は未配線）→ `npm run generate:deepdive-images` → `npm run bundle:db-textbooks`

| # | 問 | 保存 | 注意 |
|---|----|------|------|
| 1 | Q11-2 立証 | `q11-2.png` | **新規。`q11.png` 禁止** |
| 2 | Q12 混同 | `q12.png` | 第三者の権利の目的 |
| 3 | Q13 指図 | `q13.png` | **かつ**（命じ＋承諾） |
| 4 | Q14 占有改定横断 | `q14.png` | 333＝大判大6。昭32は192 |
| 5 | Q15 盗品回復 | `q15.png` | 2年。占有回収1年と混ぜるな |
| 6 | Q16 占有回収 | `q16.png` | 侵奪時から1年 |
| 7 | Q17 付合 | `q17.png` | 主従ありのみ。共有はひっかけ |
| 8 | Q18 地役権時効 | `q18.png` | 継続**かつ**外形。又は禁止 |
| 9 | Q19 留置 | `q19.png` | 必要費。敷金はひっかけ |
| 10 | Q20 333単体 | `q20.png` | Q14と同答案。図は333だけ |

Q21（順位変更）は次々バッチ。Q1-2改稿・Q3「心裡」局所修正は本ファイル外。

---

## 全問共通STRICT（各ブロックに埋め込み済み・Q2〜Q11再発防止）

- 左見出しは二字「論点」。右「ひっかけ」。論点に **GO／STOP バッジ禁止**。GOとYES混在禁止。「だれが」「問が聞くこと」「（聞かない）」禁止。
- 人物下は `役割（何をしたいか）`。説明中に（〇条）。
- 答え帯は答案の芯と **一字一句同じ**（字数括弧は図に出さない）。
- 日本語はプロンプトの文字列をそのまま。勝手な漢字にしない（例: 猶予≠優予）。
- 案内役は **ちゃちゃロット**。従来のフクロウと同じ枠だけ:
  - 下の余白に小さく立つ。**指し棒**で暗記を指す。中央の登場人物にしない。名札は図に書かない。
  - 視覚正本: `assets/images/characters/chachalot.png` と `approved-smiling-hat-mascot.png`（顔）／役割見本は主宰者許可図のフクロウ位置。
  - 帽子は耳ではない。熊・猫・フクロウ化禁止。
- 16:9 暖色オフホワイト。文字は大きく、重ねない。

---

## Q11-2 取得時効の立証〔162条2項〕※新規

保存: **`q11-2.png`**（`q11.png` を触らない）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q11-2 (what to prove for 10-year acquisitive prescription).
Do NOT save as q11.png. q11.png is the WHY (186 presumption) and is already finished.
16:9 warm off-white. Navy title. Left green header exactly「論点」. Right orange header exactly「ひっかけ」.
Center one metaphor. Bottom cards 判断軸 / ひっかけ / 暗記. Navy answer bar.
NO GO/STOP badges on 論点. Never mix GO and YES. Never「だれが」. Never「問が聞くこと」. Never「（聞かない）」.
Large readable Japanese. No overlapping text. Copy Japanese strings exactly.

CHACHALOT: SAME slot as the green owl. SMALL, bottom-right margin only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「10年の取得時効 — 何を立証するか」
Chip:「なぜ足りるかは別問（186条）」

Left 論点 Q&A (no GO):
1. 所有意思・善意・平穏・公然は？ → 推定（186条）なので自分で示さなくてよい
2. 無過失は？ → 推定されない。占有開始時の無過失を立証（162条2項）
3. ほかに要るのは？ → 十年間占有した事実

Center: checklist. Two ticked rows「10年の占有」「開始時の無過失」. One grayed row「所有意思・善意・平穏・公然＝推定」.
Labels under people:「占有者（立証したい）」／「所有者（争う側）」

Right ひっかけ:
- 所有意思まで全部自分で立証する
- 乙土地の短期間占有
- なぜ足りるか（186）の説明で終わる

Bottom:
- 判断軸:「10年なら占有の事実＋開始時の無過失。善意は推定」
- ひっかけ:「全部自分で証明、と思い込むな。無過失は落とすな」
- 暗記:「十年間占有した事実と、自己の物と信じるについて無過失」
Answer capsule EXACT (no 字 count):
「十年間占有した事実と、自己の物と信じるについて無過失であることを立証すれば足りる。」
```

---

## Q12 混同と地上権〔179条〕

保存: `q12.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q12 (Civil Code 179 merger / superficies).
16:9 warm off-white. Left「論点」/ right「ひっかけ」. NO GO on 論点. Never「だれが」. Copy Japanese exactly.
CHACHALOT: SAME slot as the green owl. SMALL, bottom-right margin only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

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
Answer EXACT:
「地上権が第三者の権利の目的となっているときは、混同によっても消滅しないのである。」
```

---

## Q13 指図による占有移転〔184条・192条〕

保存: `q13.png`  
**かつ** を落とさない（命じ＋承諾）。

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q13 (Civil Code 184 instruction + 192).
Keep「かつ」between the order and the consent. Do not replace with 又は.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: SAME slot as the green owl. SMALL, bottom-right margin only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

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
Answer EXACT:
「BがDに以後Cのために占有することを命じ、かつCがこれを承諾したときである。」
```

---

## Q14 占有改定の横断〔333条入口〕

保存: `q14.png`  
答案はQ20と同じ。図の主役は **333では占有改定＝引渡し**。192はひっかけ。根拠は **大判大6.7.26**（昭32は192）。

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q14 (possessory revision across 333 vs 192).
Do NOT cite 最判昭32 or 昭35 as the basis for 333. Those are 192 (immediate acquisition).
333 basis: 大判大6.7.26.
This is the CROSS chart. Q20 is the 333-only twin with the SAME answer text. Make Q14 show the contrast 333○ / 192×.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: SAME slot as the green owl. SMALL, bottom-right margin only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「占有改定と先取特権333 — 引渡しになるから行使できない」
Chip:「192の話を333に持ち込むな」

Left 論点:
1. 占有改定は引渡しか（333）？ → YES（大判大6）
2. 先取特権は行使できる？ → NO
3. 192条と同じ結論？ → NO。192では占有改定は引渡しにならない

Center: seller still holding goods with stamp「占有改定＝引渡し（333）」; padlock「先取特権」falls off.
Small side tag「192では×」as trap, not as the main rule.
Labels:「先取特権者（差し押さえたい）」／「第三取得者（占有改定で買った）」

Right ひっかけ:
- 即時取得（192）では占有改定×、を333にコピー
- 昭和32・35年判例を333の根拠にする

Bottom:
- 判断軸:「占有改定は333では引渡し→行使不可」
- ひっかけ:「192＝×を333にコピーするな（根拠は大判大6.7.26）」
- 暗記:「占有改定＝引渡し→先取特権を行使できない」
Answer EXACT:
「占有改定といい、これは引渡しにあたるから、Xは先取特権を行使できないのである。」
```

---

## Q15 盗品・遺失物の回復〔193条〕

保存: `q15.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q15 (Civil Code 193 stolen/lost goods recovery).
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: SAME slot as the green owl. SMALL, bottom-right margin only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

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
Answer EXACT:
「盗難又は遺失の時から２年間、占有者に対してその物の回復を請求すればよいのである。」
```

---

## Q16 占有回収の訴え〔200条〕

保存: `q16.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q16 (Civil Code 200 possessory recovery action).
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: SAME slot as the green owl. SMALL, bottom-right margin only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.
Do NOT put 193's 2 years on 論点.

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
Answer EXACT:
「占有を侵奪された時から１年以内に占有回収の訴えを提起し、返還及び損害賠償を請求できる。」
```

---

## Q17 動産の付合〔243条・248条〕

保存: `q17.png`  
この問は **主従あり** だけ。主従なし共有はひっかけ。

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q17 (Civil Code 243 and 248 accession of movables).
This Q is 主従あり only. Do not make co-ownership the main conclusion.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: SAME slot as the green owl. SMALL, bottom-right margin only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

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
Answer EXACT:
「主たる動産の所有権に帰属し、従前の所有者は不当利得の規定により償金を請求できる。」
```

---

## Q18 地役権の時効取得〔283条〕

保存: `q18.png`  
**かつ** を落とさない。継続と外形を「又は」でつながない。

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q18 (Civil Code 283 prescription of easement).
Keep「かつ」. NEVER write 又は between 継続 and 外形.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: SAME slot as the green owl. SMALL, bottom-right margin only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

Title:「地役権の時効取得283条 — 継続かつ外形認識」
Chip:「通常の取得時効要件だけでは不足」

Left 論点:
1. 所有権の取得時効と同じで足りる？ → NO
2. 特別の要件は？ → 継続的に行使され、かつ外形上認識することができるもの
3. 「又は」で足りる？ → NO。「かつ」

Center: visible path across a neighboring lot with two stamps「継続」「外形認識」AND-joined (not OR).
Labels:「要役地側（時効取得したい）」／「承役地所有者（争う）」

Right ひっかけ:
- 162条の要件だけで足りる
- 継続と外形を「又は」でつなぐ

Bottom:
- 判断軸:「継続的行使 かつ 外形上認識できるものに限る」
- ひっかけ:「通常の取得時効要件だけで足りると書くな」
- 暗記:「継続的に行使され、かつ外形上認識することができるものに限り」
Answer EXACT:
「継続的に行使され、かつ外形上認識することができるものに限り時効取得できるのである。」
```

---

## Q19 留置権と必要費〔295条〕

保存: `q19.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q19 (Civil Code 295 lien for necessary expenses).
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: SAME slot as the green owl. SMALL, bottom-right margin only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

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
Answer EXACT:
「必要費償還請求権を被担保債権とする留置権を主張して、明渡しを拒むことができる。」
```

---

## Q20 動産先取特権と占有改定〔333条〕※Q14の双子

保存: `q20.png`  
答案はQ14と同一。図は **333単体**（192はひっかけ一言だけ）。`q14.png` を上書きしない。

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q20 (Civil Code 333 only).
Do NOT save over q14.png. Same answer text as Q14, but this drawing is 333-only (192 is one trap line, not a comparison chart).
Do NOT cite 昭32 as 333. 333 = 大判大6.7.26. 192 = 占有改定は引渡しにならない.
16:9. Left「論点」/ right「ひっかけ」. NO GO. Never「だれが」. Copy Japanese exactly.
CHACHALOT: SAME slot as the green owl. SMALL, bottom-right margin only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear.

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
Answer EXACT:
「占有改定といい、これは引渡しにあたるから、Xは先取特権を行使できないのである。」
```

---

## 生成後（Cursor）

1. 目視: 論点GO／だれが／又は・かつ／起算／333と192／`q11`≠`q11-2`／`q14`≠`q20`
2. MD（未配線）: `content/textbook/app/民法記述/01-joubun-jun-shutudai.md` の各Qの **出題の型** 末尾に  
   `[[image:textbook/minpou-kijutsu/q11-2]]` … `q20`
3. `npm run generate:deepdive-images` → `npm run bundle:db-textbooks`
4. Xは誤情報チェック通過＋てらしぃ目視OKまで禁止

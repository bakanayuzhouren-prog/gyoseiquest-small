# 民法記述・解説画像プロンプト（Q2〜Q11・10問バッチ）

**廃止。** 正本は `codex-batch-minpou-zenhan-q1-q21.md`（論点GO混在・Q5「要る2つ」など旧見出しあり）。

- 前提: Q1（保佐取消し期間）承認済み → 同型で横展開
- レイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`（構造のみ。フクロウはコピーしない）
- 案内役正本: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`（必須・画像参照）
- 画風: あぷし型（左「論点」Q&A＝YES/NO/短答のみ・GO混在禁止／右「ひっかけ」／人物下は `役割（何をしたいか）`・「だれが」禁止／説明中に（〇条）／底部3カード＋にっこり帽子）
- 見出し禁止: 「問が聞くこと」「（聞かない）」「だれが」。論点に GO+YES を混ぜない。
- 見本: `codex-q1-126-ronten.md`
- 保存先: `assets/images/deepdive/textbook/minpou-kijutsu/q{N}.png`
- MD: `**出題の型**` 末尾に `[[image:textbook/minpou-kijutsu/q{N}]]`
- 生成後: `npm run generate:deepdive-images` → `npm run bundle:db-textbooks`

## 全問共通フッター（各プロンプト末尾に付ける）

```text
GUIDE: Use approved-smiling-hat-mascot.png as identity. Bottom-right margin, pointer to 暗記.
Preserve pale-sky-blue smiling hat (NOT ears), cream face, equal perfect-circle eyes/highlights,
four cheek marks/side, coral mouth, navy outlines, soft cel shading.
NO owl/cat/bear/dog, no whiskers/glasses. Layout density like 主宰者許可 sample.
Canvas 16:9 warm off-white, large Japanese, no overlap, no watermark.
```

---

## Q2 制限行為能力者と詐術〔21条〕

**メタファー:** 黙秘の壁 vs 「他の言動とあいまって」誤信ゲート  
**ファイル:** `q2.png`

```text
Japanese legal-study infographic, Gyosei Quest / あぷし.
Title:「詐術21条 — 黙秘でも当たるとき」
Chip:「黙秘＝即詐術は×」
Left GREEN「論点」Q&A（GOなし。YESは可否の行だけ）:
- 黙秘でも詐術になる場合
- 信じさせるため
- 他の言動とあいまって誤信／誤信を強めた
Right ORANGE「ひっかけ」注意:
- 黙秘しただけで詐術
- 別店の文房具購入
- 店員が顔を知っているだけ
Center: wall labeled「黙秘」with a teal side gate「他の言動とあいまって」opening to「詐術」
Bottom:
- 判断軸:「黙秘単体？否。他の言動とあいまって誤信させ／強めたか」
- ひっかけ:「黙秘＝直ちに詐術、に釣られるな」
- 暗記:「信じさせるため＋他の言動とあいまって＋誤信させ又は強めた」
Answer:「信じさせるため、他の言動とあいまって、相手方を誤信させ又は誤信を強めたときである。」
(+ common guide footer)
```

---

## Q3 心裡留保〔93条〕

**メタファー:** 原則有効の道 vs 相手の悪意・過失で無効の分岐  
**ファイル:** `q3.png`

```text
Title:「心裡留保93条 — 原則有効／いつ無効」
Chip:「94条と入口を混ぜるな」
Left GREEN「原則」GO: 意思表示は原則有効
Right ORANGE「例外で無効」:
- 相手方が真意でないことを知っていた
- 又は知ることができた（過失）
Center: fork「原則・有効」vs gate「相手の悪意・過失 → 無効」
Bottom:
- 判断軸:「誰の認識？相手方。真意でないことを知り又は知り得た」
- ひっかけ:「虚偽表示（94）や冗談エピソードに逃げるな」
- 暗記:「原則有効。相手が知り／知り得たとき無効」
Answer:「意思表示は原則有効だが、相手方が真意でないことを知り又は知ることができたときは無効となる。」
(+ common guide footer)
```

---

## Q4 通謀虚偽表示〔94条・177条〕

**メタファー:** 当事者間無効の雲 → 善意第三者の土俵で登記レース  
**ファイル:** `q4.png`

```text
Title:「通謀虚偽表示 — 善意同士は登記勝負」
Chip:「物置・地役権はトラップ」
Left GREEN「論点」Q&A（GOなし。YESは可否の行だけ）:
- 虚偽表示につき善意
- Dより先に対抗要件（登記）
Right ORANGE「ひっかけ」:
- 当事者間の無効だけの話で終わる
- 物置・地役権の枝葉
Center: two buyers racing to「登記」finish; label「善意同士の後続争い」
Bottom:
- 判断軸:「善意？＋先に登記を備えたか（177）」
- ひっかけ:「無効だから負け、と早とちりするな」
- 暗記:「善意＋先に登記」
Answer:「虚偽表示につき善意であり、Dより先に対抗要件としての登記を備えたときである。」
(+ common guide footer)
```

---

## Q5 錯誤〔95条3項〕

**メタファー:** 重過失ゲート＋例外ドア2つ（既存Q5プロンプトと同芯）  
**ファイル:** `q5.png`  
**正本詳細:** `codex-q5-sakugo-image.md` を優先。要約↓

```text
Title:「錯誤95条 — 重過失でも取消せる例外（要る2つ）」
Left「原則ストップ」: 表意者の重大な過失 → 取消しできない
Right「例外GO」: ①相手方知り／重過失で知らなかった ②双方同一の錯誤
Center: gate「重大な過失」+ doors 例外①②
Bottom:
- 判断軸:「表意者に重過失でも、例外①②なら取消し可」
- ひっかけ:「動機錯誤・表示や重過失＝即アウトに逃げるな」
- 暗記:「知り／重過失で知らなかった　又は　双方同一錯誤」
Answer:「相手方が錯誤を知り若しくは重過失で知らなかったとき、又は双方同一の錯誤のとき。」
(+ common guide footer; NO owl)
```

---

## Q6 代理権の濫用〔107条〕

**メタファー:** 外形は代理のまま → 相手の悪意／過失で無権代理みなし → 追認拒絶  
**ファイル:** `q6.png`

```text
Title:「代理権濫用107条 — 無権代理みなし→追認拒絶」
Chip:「乙土地・損賠はトラップ」
Left GREEN「問の一点」GO:
- 無権代理とみなされる
- 本人は追認を拒絶すれば足りる
Right ORANGE「ひっかけ」:
- 乙土地の別件交渉
- 損害賠償だけで済ます
- 範囲内だから有効、で終わる
Center: agent with dark motive stamp; path splits to「有効」vs「無権代理みなし→追認拒絶」
Bottom:
- 判断軸:「相手が知り又は知り得た？→無権代理みなし→追認拒絶」
- ひっかけ:「範囲内＝常に有効、と思い込むな」
- 暗記:「無権代理みなし＋追認拒絶」
Answer:「無権代理とみなされるので、本人Aは相手方Cに対し追認を拒絶すれば足りるのである。」
(+ common guide footer)
```

---

## Q7 自己契約・双方代理〔108条〕

**メタファー:** 禁止ゲート「自己契約」＋例外カード「あらかじめ許諾」  
**ファイル:** `q7.png`

```text
Title:「自己契約108条 — 原則みなし無権／許諾は除く」
Chip:「双方代理の話に逃げるな」
Left GREEN「原則」: 代理権を有しない者がした行為とみなす
Right TEAL「例外」GO: あらかじめ許諾した行為は除く
Center: one person wearing two hats at a desk labeled「自己契約」; side stamp「事前許諾OK」
Bottom:
- 判断軸:「自己契約？原則みなし無権。事前許諾あれば除く」
- ひっかけ:「口頭の曖昧な許可や双方代理ネタに釣られるな」
- 暗記:「みなし無権。ただしあらかじめ許諾は除く」
Answer:「代理権を有しない者がした行為とみなされる。ただし、あらかじめ許諾した行為は除く。」
(+ common guide footer)
```

---

## Q8 追認の横断〔113〜122・126〕

**メタファー:** 追認スイッチ → 効力発生＋行為時へ遡及の矢印  
**ファイル:** `q8.png`

```text
Title:「追認 — 効力が生じ、行為の時に遡及」
Chip:「取消不可と混同するな」
Left GREEN「問」GO:
- 本人に対して効力を生ずる
- 効果は行為の時に遡及
Right ORANGE「ひっかけ」:
- 制限行為能力の取消し話
- 相手方取消し
- 「取消しできなくなる」だけ書く
Center: timeline arrow from「行為時」←「追認」labeled「遡及」
Bottom:
- 判断軸:「追認の効果は？効力発生＋行為時遡及」
- ひっかけ:「分野の違う追認を混ぜるな」
- 暗記:「効力生じ、行為の時に遡及」
Answer:「追認により本人に対して効力を生じ、その効果は行為の時に遡及して生ずるのである。」
(+ common guide footer)
```

---

## Q9 時効援用の債権者代位〔145・423〕

**メタファー:** 時効の扉は「援用」で開く → 代位で本人の鍵を使う  
**ファイル:** `q9.png`

```text
Title:「時効援用 — 代位で本人の援用をする」
Chip:「差押・口頭約束はトラップ」
Left GREEN「問」GO:
- 債権者代位権によって
- XのYに対する債務の消滅時効を援用
Right ORANGE「ひっかけ」:
- 差押だけで足りる
- 口頭の約束
- 本人以外が勝手に援用できる、と誤解
Center: locked door「時効の効果」opened by key「援用」held via「代位」
Bottom:
- 判断軸:「時効は援用して初めて効く。代位で本人の援用」
- ひっかけ:「完成＝自動消滅と思うな」
- 暗記:「代位により消滅時効を援用すれば足りる」
Answer:「Aは債権者代位権によってXのYに対する当該債務の消滅時効を援用すれば足りる。」
(+ common guide footer)
```

---

## Q10 協議を行う旨の合意〔151条〕

**メタファー:** 書面／電磁的記録のスタンプで時効完成が猶予される砂時計  
**ファイル:** `q10.png`

```text
Title:「協議合意151条 — 書面で完成猶予」
Chip:「催告ルートと混ぜるな」
Left GREEN「問」GO:
- 協議を行う旨の合意
- 書面又は電磁的記録
- 時効の完成が猶予
Right ORANGE「ひっかけ」:
- 口頭合意だけ
- 催告→6か月ルートと混同
Center: hourglass paused by stamp「書面／電磁的記録」
Bottom:
- 判断軸:「協議合意は書面等？→完成猶予」
- ひっかけ:「催告の話に逃げない」
- 暗記:「書面又は電磁的記録で協議合意→完成猶予」
Answer:「協議を行う旨の合意を書面又は電磁的記録ですれば、時効の完成が猶予されるのである。」
(+ common guide footer)
```

---

## Q11 取得時効〔162・186条〕

**メタファー:** 推定の盾（所有意思・善意・平穏・公然）vs 無過失は自分で示す  
**ファイル:** `q11.png`

```text
Title:「取得時効 — なぜ占有の証明で足りるか」
Chip:「乙土地・過失細部はトラップ」
Left GREEN「推定される」GO:
- 所有の意思
- 善意
- 平穏かつ公然
Right ORANGE「ひっかけ／自分で示す側」:
- 無過失まで推定される、と誤解
- 乙土地の短期間占有
Center: shield「186条推定」covering four badges; small note「無過失は別」
Bottom:
- 判断軸:「推定で足りるものは？所有意思・善意・平穏公然」
- ひっかけ:「無過失も推定、と思い込むな」
- 暗記:「所有意思をもって善意で平穏かつ公然と占有すると推定」
Answer:「占有者は所有の意思をもって善意で平穏にかつ公然と占有するものと推定されるからである。」
(+ common guide footer)
```

---

## 生成オペ手順（じゃんじゃん進めるとき）

1. 各Qnにつき上記プロンプト＋共通フッター＋2枚の承認PNG参照で生成
2. `assets/images/deepdive/textbook/minpou-kijutsu/q{N}.png` に保存
3. MDの当該Qの出題の型末尾に `[[image:textbook/minpou-kijutsu/q{N}]]`
4. 10問終わったら一括: `npm run generate:deepdive-images && npm run bundle:db-textbooks`
5. 品質が落ちたら量産を止め、1問に戻して型を直す（AGENTS準拠）

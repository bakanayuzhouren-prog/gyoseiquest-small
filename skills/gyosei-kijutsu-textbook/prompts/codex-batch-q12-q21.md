# 民法記述・解説画像プロンプト（Q12〜Q21・第2バッチ）

**廃止。** 正本は `codex-batch-minpou-zenhan-q1-q21.md`。

- 前提: Q2〜Q11バッチの続き。10問ずつ（AGENTS）
- レイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`（構造のみ。フクロウはコピーしない）
- 案内役正本: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`（必須・画像参照）
- 画風: あぷし型（左「論点」Q&A＝YES/NO/短答のみ・GO混在禁止／右「ひっかけ」／人物下は `役割（何をしたいか）`・「だれが」禁止／説明中に（〇条）／底部3カード＋にっこり帽子）
- 見出し禁止: 「問が聞くこと」「（聞かない）」「だれが」。論点に GO+YES を混ぜない。
- 見本: `codex-q1-126-ronten.md`
- 保存先: `assets/images/deepdive/textbook/minpou-kijutsu/q{N}.png`
- MD: `**出題の型**` 末尾に `[[image:textbook/minpou-kijutsu/q{N}]]`
- 生成後: 誤情報チェック（答案の芯・起算・又は／かつ）→ OKなら `npm run generate:deepdive-images` → `bundle:db-textbooks`
- 次バッチ: Q22〜Q31

## 全問共通フッター（各プロンプト末尾に付ける）

```text
GUIDE: Use approved-smiling-hat-mascot.png as identity. Bottom-right margin, pointer to 暗記.
Preserve pale-sky-blue smiling hat (NOT ears), cream face, equal perfect-circle eyes/highlights,
four cheek marks/side, coral mouth, navy outlines, soft cel shading.
NO owl/cat/bear/dog, no whiskers/glasses. Layout density like 主宰者許可 sample.
Canvas 16:9 warm off-white, large Japanese, no overlap, no watermark.
Legal: match the answer capsule exactly; do not flip 又は/かつ; do not drop 起算点.
```

---

## Q12 混同と地上権〔179条〕

**メタファー:** 混同で消える地上権 vs 第三者の担保が刺さっていると消えない杭  
**ファイル:** `q12.png`

```text
Japanese legal-study infographic, Gyosei Quest / あぷし.
Title:「混同179条 — 第三者の権利の目的なら消滅しない」
Chip:「銀行の担保を落とすな」
Left GREEN「論点」Q&A（GOなし。YESは可否の行だけ）:
- 地上権と所有権が同一人に
- 第三者の権利の目的となっているとき
- 混同によっても消滅しない
Right ORANGE「ひっかけ」注意:
- 混同＝常に消滅
- 建物の別抵当Eで結論を変える
- 相続人Dの「消えるはず」主張
Center: land「甲土地」with surface right stake; bank stamp「Cの抵当」pins the stake so it cannot vanish
Bottom:
- 判断軸:「第三者の権利の目的か？→混同でも地上権は残る」
- ひっかけ:「混同したら担保も消える、と思い込むな」
- 暗記:「第三者の権利の目的→混同によっても消滅しない」
Answer:「地上権が第三者の権利の目的となっているときは、混同によっても消滅しないのである。」
(+ common guide footer)
```

---

## Q13 指図による占有移転と即時取得〔184・192〕

**メタファー:** 倉庫Dが向きを変える矢印（B→C）＋Cの承諾ゲート  
**ファイル:** `q13.png`

```text
Title:「指図184条 — 手元になくても即時取得」
Chip:「占有改定と混ぜるな」
Left GREEN「問」GO:
- BがDに、以後Cのために占有することを命じた
- かつCが承諾した
- これで引渡し（指図による占有移転）
Right ORANGE「ひっかけ」:
- 現実の引渡しがないから即時取得不可
- 占有改定（売主が持ち続ける）の話
Center: warehouse D turning an arrow from B to C; gate labeled「Cの承諾」
Bottom:
- 判断軸:「指図＋承諾＝占有移転。手元に物がなくても足りる」
- ひっかけ:「現実の引渡し必須／占有改定、に逃げるな」
- 暗記:「以後Cのため占有せよ＋Cが承諾」
Answer:「BがDに以後Cのために占有することを命じ、かつCがこれを承諾したときである。」
(+ common guide footer)
```

---

## Q14 占有改定の横断〔178・192・333・345〕※答案は333

**メタファー:** 占有改定スタンプ＝引渡し → 先取特権の鍵が外れる  
**ファイル:** `q14.png`  
注: Q20と同答案。この図は横断の入口として「333では引渡しになる」を主役にする。192はひっかけ側。

```text
Title:「占有改定と先取特権333 — 引渡しになるから行使できない」
Chip:「192の話を333に持ち込むな」
Left GREEN「問」GO:
- 占有改定という
- これは引渡しにあたる
- 先取特権を行使できない
Right ORANGE「ひっかけ」:
- 即時取得（192）では占有改定は引渡しにならない、を333に当てる
- 昭和32・35年判例を333の根拠にする
Center: seller still holding the goods with stamp「占有改定＝引渡し」; padlock「先取特権」unlocks/falls off
Bottom:
- 判断軸:「占有改定は333では引渡し→行使不可」
- ひっかけ:「192＝×を333にコピーするな（根拠は大判大6.7.26）」
- 暗記:「占有改定＝引渡し→先取特権を行使できない」
Answer:「占有改定といい、これは引渡しにあたるから、Xは先取特権を行使できないのである。」
(+ common guide footer)
```

---

## Q15 盗品・遺失物の回復〔193〜196〕

**メタファー:** 即時取得で所有は移っても、2年の回復ルートが残る  
**ファイル:** `q15.png`

```text
Title:「盗品・遺失物193条 — 2年で回復請求」
Chip:「占有回収の1年と混ぜるな」
Left GREEN「問」GO:
- 盗難又は遺失の時から２年間
- 占有者に対して
- その物の回復を請求
Right ORANGE「ひっかけ」:
- 即時取得で所有が移ったから回復不能
- 占有回収の訴え（1年）と混同
Center: stolen bike moving to a new possessor; calendar「2年」route labeled「193条回復」beside a smaller wrong sign「1年」
Bottom:
- 判断軸:「起算は盗難・遺失の時。期間は2年。相手は占有者」
- ひっかけ:「即時取得で終わり／占有回収1年、に釣られるな」
- 暗記:「盗難又は遺失の時から2年、占有者に回復請求」
Answer:「盗難又は遺失の時から２年間、占有者に対してその物の回復を請求すればよいのである。」
(+ common guide footer)
```

---

## Q16 占有訴権〔198〜200条〕

**メタファー:** 奪われた占有を1年以内に取り返すゲート  
**ファイル:** `q16.png`

```text
Title:「占有回収200条 — 侵奪時から1年」
Chip:「所有権返還と混ぜるな」
Left GREEN「問」GO:
- 占有を侵奪された時から１年以内
- 占有回収の訴えを提起
- 返還及び損害賠償を請求
Right ORANGE「ひっかけ」:
- 所有権に基づく返還請求の期間で書く
- まだ占有していない賃借人が回収する
Center: clock「侵奪時」→ gate「1年」→ claims「返還＋損害賠償」
Bottom:
- 判断軸:「起算＝侵奪時。期間＝1年。請求＝返還及び損害賠償」
- ひっかけ:「所有権の話／2年回復と取り違えるな」
- 暗記:「侵奪時から1年以内に回収の訴え＋返還及び損害賠償」
Answer:「占有を侵奪された時から１年以内に占有回収の訴えを提起し、返還及び損害賠償を請求できる。」
(+ common guide footer)
```

---

## Q17 動産の付合〔243・244・248〕

**メタファー:** 主物が従物を飲み込む → 所有は主、旧主は償金  
**ファイル:** `q17.png`

```text
Title:「動産付合 — 主従ありは単独所有＋償金」
Chip:「主従なし共有と混ぜるな」
Left GREEN「問」GO:
- 主たる動産の所有権に帰属
- 従前の所有者は
- 不当利得の規定により償金を請求
Right ORANGE「ひっかけ」:
- 主従なし→付合時の価格割合の共有、をこの問に書く
- 加工・混和の結論を持ってくる
Center: big machine swallowing a small part; label「主物に帰属」; coin arrow「償金」to former owner
Bottom:
- 判断軸:「主従あり？→主の所有＋償金（248）」
- ひっかけ:「共有になる、と即答するな（それは主従なし）」
- 暗記:「主たる動産の所有権に帰属＋償金請求」
Answer:「主たる動産の所有権に帰属し、従前の所有者は不当利得の規定により償金を請求できる。」
(+ common guide footer)
```

---

## Q18 地役権の時効取得〔283条〕

**メタファー:** 二つの関門「継続」かつ「外形認識」  
**ファイル:** `q18.png`

```text
Title:「地役権の時効取得283条 — 継続かつ外形認識」
Chip:「かつを落とすな」
Left GREEN「問」GO:
- 継続的に行使され
- かつ外形上認識することができるもの
- に限り時効取得できる
Right ORANGE「ひっかけ」:
- 通常の取得時効要件（162・186）だけで足りる
- 「継続」だけ／「外形」だけで足りる（かつを落とす）
Center: two gates in a row labeled「継続」「外形認識」with AND badge「かつ」
Bottom:
- 判断軸:「継続かつ外形認識。通常の取得時効要件だけでは不足」
- ひっかけ:「162条だけで地役権も時効取得、と書くな」
- 暗記:「継続的に行使＋外形上認識できるものに限り」
Answer:「継続的に行使され、かつ外形上認識することができるものに限り時効取得できるのである。」
(+ common guide footer)
```

---

## Q19 留置権と必要費〔295・600・301〕

**メタファー:** 必要費の鎖で明渡しを止める（敷金の鎖は繋がらない）  
**ファイル:** `q19.png`

```text
Title:「留置権 — 必要費なら明渡しを拒める」
Chip:「敷金では留置できない」
Left GREEN「問」GO:
- 必要費償還請求権を被担保債権とする
- 留置権を主張して
- 明渡しを拒むことができる
Right ORANGE「ひっかけ」:
- 敷金返還請求で留置
- 有益費（相当期限の許与）の話に逃げる
Center: tenant holding a chain「必要費」on the house door; broken chain labeled「敷金」
Bottom:
- 判断軸:「牽連性ある必要費か？→留置して明渡し拒否可」
- ひっかけ:「敷金でも留置できる、と思うな」
- 暗記:「必要費償還請求権を被担保債権とする留置権で明渡し拒否」
Answer:「必要費償還請求権を被担保債権とする留置権を主張して、明渡しを拒むことができる。」
(+ common guide footer)
```

---

## Q20 動産先取特権と占有改定〔333条〕※Q14と同答案・根拠を強調

**メタファー:** 大判大6の旗 vs 昭和32（192）の偽物旗  
**ファイル:** `q20.png`

```text
Title:「333条 — 占有改定は引渡し（根拠は大6）」
Chip:「昭32は192の話」
Left GREEN「問」GO:
- 占有改定という
- 引渡しにあたる（333）
- 先取特権を行使できない
Right ORANGE「ひっかけ」:
- 最判昭32.6.27／昭35.2.11を333の根拠にする
- 192条では占有改定≠引渡し、を333に持ち込む
Center: two flags; teal「大判大6.7.26＝333」standing; red X on「昭32＝192」
Bottom:
- 判断軸:「333の引渡しに占有改定は含まれる→行使不可」
- ひっかけ:「即時取得の判例を先取特権に貼るな」
- 暗記:「占有改定＝引渡し→先取特権を行使できない」
Answer:「占有改定といい、これは引渡しにあたるから、Xは先取特権を行使できないのである。」
(+ common guide footer)
```

---

## Q21 抵当権の順位変更〔374条〕

**メタファー:** 順位の並び替えスイッチ＝合意＋利害関係人承諾＋登記  
**ファイル:** `q21.png`

```text
Title:「順位変更374条 — 合意・利害関係人・登記」
Chip:「債務者・保証人の同意は要らない」
Left GREEN「問」GO:
- 各抵当権者の合意
- 利害関係人（転抵当のDなど）の承諾
- 順位変更の登記
Right ORANGE「ひっかけ」:
- 債務者の同意が必要
- 保証人の同意が必要
Center: three mortgage badges swapping order; stamps「合意」「Dの承諾」「登記」
Bottom:
- 判断軸:「誰の承諾？抵当権者の合意＋利害関係人。登記までして効力」
- ひっかけ:「債務者・保証人まで同意が要る、と足すな」
- 暗記:「各抵当権者の合意＋利害関係人の承諾＋登記」
Answer:「各抵当権者の合意及び利害関係人であるDの承諾を得たうえで、順位変更の登記をする。」
(+ common guide footer)
```

---

## 生成オペ手順

1. 各Qnを上記＋共通フッター＋承認PNG2枚参照で生成
2. `q{N}.png` に保存
3. 投稿前に `_image-legal-check.md`（答案の芯・起算・かつ／又は）
4. MDに `[[image:textbook/minpou-kijutsu/q{N}]]`
5. 10問終わったら `npm run generate:deepdive-images && npm run bundle:db-textbooks`
6. 品質が落ちたら1問に戻す

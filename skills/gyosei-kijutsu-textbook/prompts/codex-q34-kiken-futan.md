# Codex用 — 危険負担（買い主を守る・落雷）／受領遅滞

てらしぃがこのファイルを **Codex** に渡す。Cursor は画像を作らない。  
1枚に詰め込まない。**2コマ・2PNG・2プロンプト**。既存の `q34.png`（1年通知）は上書きしない。

参照（生成前に必ず開く）:
- `skills/gyosei-image-style/SKILL.md`
- `skills/gyosei-image-style/references/visual-guidelines.md`
- `skills/gyosei-image-style/references/avatar-guidelines.md`
- レイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 案内役: `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`

正本:
- 民法記述 **Q34-3**／**Q34-2**（`content/textbook/app/民法記述/01-joubun-jun-shutudai.md`）
- `data/knowledge/canonical/minpou-joshiki/01-kiken-futan.md`
- `utils/chatTopicBriefsNakaMinpouYama.ts`（受領遅滞と危険負担）

ブランド: あぷし / X @appshi113  
範囲: **画像生成と配置方針まで**。MD埋め込み・マップ再生成は Cursor へ渡す。

---

## 法律（守る・誤情報禁止）

- **536条1項**は反対給付を**拒める**（履行拒絶）。危険負担は**債務の消滅原因ではない**。契約が当然に消える、と図に書かない。
- 口の「支払義務が消滅」は**口の言い方**としてチップにだけ置いてよい。論点の結論は **拒める**。
- **債務を消すなら解除。** 履行不能なら催告なし（**542条1項1号**）。売主に過失がなくても可。
- **543条は解除の根拠ではない。** 債権者帰責なら解除**不可**の条文。引渡前・双方に帰責事由がない場合の解除に543を付けない。
- 損害賠償は売主帰責がないと不可（415条1項ただし書）。今回の答え帯に損賠を入れない。
- **受領遅滞**中の滅失 → 代金を**拒めない**＋**解除権消滅**（567条2項。経路は413条の2第2項で債権者帰責とみなす→543条）。
- てらしぃの「3つできなくなる」＝**追完・減額・解除**。条文は損賠も含め4つだが、図の3つは損賠を入れない。
- 旧**534条債権者主義は廃止**。「今も買主が払え」を正しいルールとして緑にしない。
- 引渡**後**・双方に帰責事由なしは567条1項（拒めない・解除できない）。コマ2の主戦場は受領遅滞。引渡後はひっかけ側に小さく置いてよい。

## 禁止（記述図・再発防止）

- GO と YES を論点パネルに混在させない。論点に GO／STOP バッジを置かない
- 「だれが」「問が聞くこと」「（聞かない）」禁止
- ちゃちゃロットを中央の登場人物にしない。名札禁止。くま化・フクロウ化しない
- 1枚に落雷と受領遅滞を両方の表で詰め込まない（コマ分割済み）
- 長い段落・模試の問題文コピー禁止

---

## 図1 Q34-3 危険負担（買い主を守る・落雷）

| 欄 | 内容 |
|----|------|
| タイトル対比 | 危険負担 — 買い主を守る / 消すなら解除 |
| 保存 | `assets/images/deepdive/textbook/minpou-kijutsu/q34-3.png` |
| キー | `textbook/minpou-kijutsu/q34-3` |
| 配置 | 民法記述 Q34-3 の**問の下** |
| 中央メタファー | 引渡前の家に落雷。鍵はまだ売主。買主が代金袋をガード |
| 判断軸 | まだ渡していない落雷は売主側。拒める。消すなら解除 |
| ひっかけ | 危険負担で契約当然消滅／旧債権者主義で払え／不可抗力なら解除もできない |
| 暗記 | 渡す前の落雷は拒める。消すなら解除 |
| 答え帯 | 引渡し前に双方に帰責事由なく家が滅失したときは、買主は代金の支払を拒むことができる。 |
| 役割 | 買主（代金を払いたくない）／売主（当然消滅だと言いたい） |

### GPT Image プロンプト（Q34-3・このまま生成）

画像参照として必ず渡す:
1. `approved-shusaisha-kyoka.png`（レイアウト密度のみ。フクロウはコピーしない）
2. `chachalot.png` ＋ `approved-smiling-hat-mascot.png`（案内役 identity）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし 民法記述 Q34-3.
Match LAYOUT density of approved sample「主宰者の許可」: navy title, left green「論点」, right orange「ひっかけ」, ONE center metaphor, bottom three cards 判断軸 / ひっかけ / 暗記, navy answer bar. 16:9 warm off-white. Large Japanese. No overlap. No tiny paragraphs.

Guide: ちゃちゃロット (Chachalot) in the SAME slot as the green owl: SMALL bottom-right margin only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear/owl/cat.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses).

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点: Q&A only. NO GO/STOP badges. Do not mix GO and YES.
- Never write「だれが」.
- Do NOT write that 危険負担 extinguishes the contract automatically. Legal conclusion is 代金を拒める (536).
- Do NOT cite 543条 as the source of 解除. 解除 is 542条1項1号.
- Do NOT revive 旧534条債権者主義 as a correct rule.
- This frame is 引渡前・落雷 ONLY. Do not explain 受領遅滞 on this image.

Title:「危険負担 — 買い主を守る / 消すなら解除」
Chip top-right:「口：支払義務が消滅　条文：拒める」

Center metaphor: lightning striking a house BEFORE handover. House keys still with seller. Buyer shields a money bag labeled「代金」. Seller wrongly stamps「当然消滅」on a contract paper — that stamp is the WRONG idea (put it on the ひっかけ side of the scene, small, with a caution mark). One visual only: 落雷＋未引渡し.
Labels MUST be:
「買主（代金を払いたくない）」
「売主（当然消滅だと言いたい）」

Left 論点 (short answers, not GO):
1. 代金は拒める？ → YES（536条1項）
2. 契約は当然消える？ → NO
3. 消すなら → 解除（542条1項1号）

Right ひっかけ (注意 stamps OK):
- 危険負担で契約が当然消滅
- 旧債権者主義で買主が払え
- 不可抗力なら解除もできない
- 引渡前なのに567条

Bottom:
- 判断軸:「まだ渡していない落雷は売主側。拒める。契約を消すなら解除」
- ひっかけ:「当然消滅／旧債権者主義／不可抗力なら解除不可」
- 暗記:「渡す前の落雷は拒める。消すなら解除」
Answer EXACT:
「引渡し前に双方に帰責事由なく家が滅失したときは、買主は代金の支払を拒むことができる。」
```

---

## 図2 Q34-2 受領遅滞（３つのできなくなる）

| 欄 | 内容 |
|----|------|
| タイトル対比 | 受領遅滞 — 拒めない / 解除権も消える |
| 保存 | `assets/images/deepdive/textbook/minpou-kijutsu/q34-2.png` |
| キー | `textbook/minpou-kijutsu/q34-2` |
| 配置 | 民法記述 Q34-2 の**問の下** |
| 中央メタファー | 売主が車（または家の鍵）を差し出したのに買主が受け取らない。その後火災。解除の鍵が消える |
| 判断軸 | 受領遅滞があれば危険は買主。拒めず、解除権も消滅 |
| ひっかけ | 536条で拒めると切る／3つに損賠を混ぜる／解除だけ残る |
| 暗記 | 受け取りグズグズは拒めず解除も×。３つ＝追完・減額・解除 |
| 答え帯 | 引渡し後又は受領遅滞中に滅失したときは、追完・減額・解除ができず代金も拒めない。 |
| 役割 | 売主（引渡しを提供した）／買主（置き場所がないと拒んだ） |

### GPT Image プロンプト（Q34-2・このまま生成）

画像参照は図1と同じ2枚。

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし 民法記述 Q34-2.
Match LAYOUT density of approved sample「主宰者の許可」: navy title, left green「論点」, right orange「ひっかけ」, ONE center metaphor, bottom three cards 判断軸 / ひっかけ / 暗記, navy answer bar. 16:9 warm off-white. Large Japanese. No overlap. No tiny paragraphs.

Guide: ちゃちゃロット (Chachalot) in the SAME slot as the green owl: SMALL bottom-right margin only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear/owl/cat.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses).

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点: Q&A only. NO GO/STOP badges. Do not mix GO and YES.
- Never write「だれが」.
- てらしぃ's 3 impossibles are 追完・減額・解除 ONLY. Do NOT put 損害賠償 in the "3つ".
- Do NOT say the buyer can refuse payment under 536条 in this scene. This is 受領遅滞.
- 解除権の消滅 is mandatory (543 via 413条の2第2項; also 567条2項).
- This frame is 受領遅滞中の滅失. Do not retell the 引渡前・落雷 story as the main scene.

Title:「受領遅滞 — 拒めない / 解除権も消える」
Chip top-right:「口：受領地帯＝受領遅滞」

Center metaphor: seller holds out car keys (or a house key) to buyer. Buyer turns away with a sign「置き場所がない」. Behind them the object burns. A small key labeled「解除」vanishes or is stamped ×. One visual only: 提供したのに受け取らない→滅失.
Labels MUST be:
「売主（引渡しを提供した）」
「買主（置き場所がないと拒んだ）」

Left 論点 (short answers, not GO):
1. 代金は拒める？ → NO（567条2項）
2. 解除はできる？ → NO（解除権消滅）
3. 追完・減額は？ → できない

Right ひっかけ (注意 stamps OK):
- 536条で代金を拒めると切る
- 解除だけは残る
- ３つに損害賠償を混ぜる
- 引渡前の落雷と同じだと思う

Bottom:
- 判断軸:「受領遅滞があれば危険は買主。拒めず、解除権も消滅（413条の2第2項→543条）」
- ひっかけ:「536で拒める／解除は残る／３つに損賠を混ぜる」
- 暗記:「受け取りグズグズは拒めず解除も×。３つ＝追完・減額・解除」
Answer EXACT:
「引渡し後又は受領遅滞中に滅失したときは、追完・減額・解除ができず代金も拒めない。」
```

---

## 目視チェック（生成後・必須）

- [ ] フクロウがいない。帽子が耳／動物になっていない
- [ ] 左右「論点／ひっかけ」＋底部3カード＋答え帯がある
- [ ] 図1が「当然消滅」を正しいルールとして緑にしていない
- [ ] 図1の解除根拠が542（543を解除の根拠にしていない）
- [ ] 図2の3つが追完・減額・解除（損賠を3つ目にしていない）
- [ ] 図2で買主が536条で拒める、と読んで取れない
- [ ] `q34.png` を上書きしていない

## Codex 完了時の報告フォーマット

- Purpose / Placement / 生成ファイルパス（q34-3.png と q34-2.png）
- Alt summary（各1文）
- 目視: レイアウト見本との構造一致＋ちゃちゃロット identity＋上記法律チェック
- Cursor 引き継ぎ: MDに `[[image:textbook/minpou-kijutsu/q34-3]]` を Q34-3 の問の下、`[[image:textbook/minpou-kijutsu/q34-2]]` を Q34-2 の問の下。deepdive画像マップ再生成

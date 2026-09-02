# Codex用 — 損失補償の言葉分け（正当／相当な価格／合理的算出／国賠）

表主役。4語の漢字が似て中身が違う。行の論点の真上にゴロ（振り仮名型）。

- 保存先: `assets/images/deepdive/learn/kenpou/sonshitsu-hoshou-yogo.png`
- 画像キー: `learn/kenpou/sonshitsu-hoshou-yogo`

## 法律の芯（崩すな）

- 憲法29条3項の「正当な補償」は原則。額の型は場面で分かれる（完全補償か相当補償か）。
- 土地収用法71条の「相当な価格」は近傍類地の取引価格が基。通常の収用では**完全補償**（同等の財産を買い直せる時価。最判昭48.10.18）。
- 「合理的に算出された相当な額」は農地改革の**相当補償**（最大判昭28.12.23）。通常の土地収用に使わない。
- 国賠の「相当な損害」は違法な行為・営造物の瑕疵の損害賠償。損失補償（適法な特別犠牲）ではない。
- ゴロ（暗記一行）: **正当は場合、収用は時価、農地は相当、国賠は違法**
- 振り仮名ゴロ（論点の真上・小さくても読める）:
  - 正当な補償 → `せいとうは ばあい`
  - 相当な価格 → `しゅうようは じか`
  - 合理的に算出された相当な額 → `のうかは そうとう`
  - 相当な損害 → `こくばいは いほう`

**書かない**: 正当な補償は常に合理的に算出された相当な額。収用法の相当な価格＝相当補償説。国賠＝損失補償。農地改革＝完全補償。通常の収用＝相当補償。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 相当の字が似ても棚が違う |
| 中央メタファー | 4行の言葉表。論点上にゴロ。行は色分け＋行ゼブラ |
| 判断軸 | 憲法の原則か。通常の収用か。農地改革か。違法か |
| ひっかけ | 合理的に算出で常に足りる。相当な価格＝相当補償 |
| 暗記 | 正当は場合、収用は時価、農地は相当、国賠は違法 |
| 役割 | 収用される土地所有者（買い直しを受ける）／国（税でならす） |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: 損失補償の用語の聞き分け（憲法29条3項・土地収用法71条・農地改革・国家賠償）.
Learning goal: 「相当」が付いても中身は違う. 通常の収用は完全補償（時価）. 合理的に算出された相当な額は農地改革だけ.

Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center metaphor (comparison TABLE),
bottom 判断軸 / ひっかけ / 暗記, warm off-white, large Japanese, 16:9.

STRICT: Left heading「論点」. Right heading「ひっかけ」. Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP.
Table is CENTER only. Labels: Left「土地所有者（買い直しを受ける）」Right「国（税でならす）」

Title:「損失補償 — 相当の字に釣られるな」
Chip:「正当は場合。収用は時価」

Center ONLY: one table, 4 data rows. Header navy: ゴロ付き論点 | 場面 | 中身
Row zebra (horizontal, NOT columns): data row1 white, row2 light gray, row3 white, row4 light gray.
PLUS color-code the left 論点 cell with a left color bar (not column zebra on the whole table):
1. navy bar — 正当な補償
2. teal bar — 相当な価格
3. amber bar — 合理的に算出された相当な額
4. red bar — 相当な損害

CRITICAL ゴロ: In EACH 論点 cell, put SMALL ruby-like gothic text DIRECTLY ABOVE the legal term (like furigana). Readable, not microscopic, not overlapping the 論点 kanji.
Ruby ゴロ (exact):
1. せいとうは ばあい
   正当な補償
2. しゅうようは じか
   相当な価格
3. のうかは そうとう
   合理的に算出された相当な額
4. こくばいは いほう
   相当な損害

Data rows (short Japanese):
1. 正当な補償 | 憲法29条3項 | 場面で完全か相当かが分かれる
2. 相当な価格 | 土地収用法71条 | 取引価格。完全補償
3. 合理的に算出された相当な額 | 農地改革（昭28.12.23） | 相当補償。通常の収用ではない
4. 相当な損害 | 国家賠償 | 違法の損害賠償。損失補償ではない
A thin caption:「通常の収用の正当な補償＝同等の財産を買い直せる時価（最判昭48.10.18）」

Left 論点 ONLY:
1. 通常の収用の額は？ → 時価（完全補償）
2. 合理的に算出は？ → 農地改革だけ
3. 国賠は損失補償？ → 違う（違法）

Right ひっかけ ONLY:
1. 正当な補償は常に合理的に算出した相当な額
2. 収用法の相当な価格＝相当補償説
3. 国賠の相当な損害＝損失補償

Bottom:
- 判断軸:「憲法の原則か。通常の収用か。農地改革か。違法か」
- ひっかけ:「合理的に算出で足りる。相当な価格は相当補償。国賠も補償」
- 暗記:「正当は場合、収用は時価、農地は相当、国賠は違法」
Answer:「通常の土地収用の正当な補償は完全補償である。合理的に算出された相当な額は農地改革の相当補償である。」

Guide: ちゃちゃロット SMALL bottom-right, 指し棒 to 暗記. Match chachalot.png.
Green lecturer suit, white shirt, green trousers, shoes. Not bear/owl/cat. No nameplate.
No overlapping text. Large gothic Japanese. Ruby ゴロ must not collide with 論点 kanji.
```

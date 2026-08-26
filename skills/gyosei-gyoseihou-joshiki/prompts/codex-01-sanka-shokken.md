# Codex用 — 第三者参加・職権証拠・執行停止（3コマ）

1枚に全部盛るとごちゃつくので分割。各コマはあぷし型・シンプル。**コマごとに別プロンプト必須。**

**準用の表専用は別ファイル** → `codex-01-junyo.md`（`junyo-22-24.png`）

保存先:
- コマ1: `assets/images/deepdive/行政法/sanka-kaihatsu.png`
- コマ2: `assets/images/deepdive/行政法/shokken-junyo.png`（24条本体。準用表は載せない）
- コマ3: `assets/images/deepdive/行政法/shikkou-teishi-taihikou.png`

正本: `data/knowledge/canonical/行政法/01-sanka-shokken-shoko.md`  
配置: `data/knowledge/canonical/行政法/01-PLACEMENT.md`  
参照: `approved-shusaisha-kyoka.png`／案内役=`chachalot.png`＋`approved-smiling-hat-mascot.png`

## 法律（守る）

- 22条: 当事者若しくはその第三者の申立て **又は職権**。
- 24条: **職権**で証拠調べ。当事者の申立て（証拠申出）も可。結果は意見聴取。職権探知と書かない。
- **てらしぃ芯: 22も24も、職権でも申立てでも動ける。**
- **25条執行停止は申立て必須・職権不可。** 22・24と対比。
- 準用の詳細表は `codex-01-junyo.md` 側。ここでは「準用あり／なし」を深く書かない。

## コマ分け

| コマ | 1枚の仕事 | ファイル |
|------|-----------|----------|
| 1 | 開発許可たとえ＋22条 | sanka-kaihatsu |
| 2 | 24条本体（意見聴取） | shokken-junyo |
| 2b | **準用表（てらしぃ芯）** | **junyo-22-24**（別MD） |
| 3 | 22・24 vs 25（職権・申立ての対比） | shikkou-teishi-taihikou |

---

## コマ1 プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
16:9 warm off-white, navy title, left green / right orange, ONE simple center metaphor, bottom 判断軸 / ひっかけ / 暗記. Large Japanese, no overlap. Keep SIMPLE — one topic only.

Match LAYOUT of approved sample「主宰者の許可」.
Guide: ちゃちゃロット SMALL bottom-right only, wooden 指し棒 to 暗記. Match chachalot.png. Not bear/owl/cat. No nameplate.

STRICT: Left「論点」Q&A only (no GO/STOP mix). Right「ひっかけ」. Never「だれが」「問が聞くこと」「（聞かない）」.

Title:「第三者の訴訟参加 — 開発許可」
Chip:「行訴法22条 / 32条」

Center ONLY: prefecture permit stamp, neighboring residents vs related developer/company. Arrow「取消判決は第三者にも効く（32）」. Company label「関連業者（権利を害されうる）」.

Left 論点:
1. 関連業者は参加できる？ → YES（22条）
2. 誰が申立て？ → 当事者・その第三者
3. 業者が知らないとき？ → 職権でも参加させられる
4. なぜ？ → 取消判決の第三者効（32）

Right ひっかけ:
- 第三者自身は申立てできない
- 申立てがなければ職権でも呼べない
- 判決は当事者だけの効力

Bottom:
- 判断軸:「権利を害されうるなら参加。知らないなら職権」
- ひっかけ:「第三者は申立て不可／職権不可」
- 暗記:「業者は参加できる。知らないなら職権（22）。理由は第三者効（32）」
- 答え帯:「置き去りにするな」

Japanese only. No watermark.
```

---

## コマ2 プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
16:9 warm off-white, navy title, left green / right orange, ONE simple center metaphor, bottom 判断軸 / ひっかけ / 暗記. Large Japanese, no overlap. Keep SIMPLE — one topic only.

Match LAYOUT of approved sample「主宰者の許可」.
Guide: ちゃちゃロット SMALL bottom-right only, wooden 指し棒 to 暗記. Match chachalot.png. Not bear/owl/cat. No nameplate.

STRICT: Left「論点」Q&A only (no GO/STOP mix). Right「ひっかけ」. Never「だれが」「問が聞くこと」「（聞かない）」.
Do NOT claim 当事者訴訟に22条が準用される.

Title:「職権証拠調べ」
Chip:「24条」

Center ONLY: judge with magnifying glass (職権証拠調べ). Small badge「結果は意見聴取」. Do NOT fill the center with a big 準用 table (準用は別図 junyo-22-24).

Left 論点:
1. 職権証拠調べは職権できる？ → YES（24）
2. 申立て（証拠申出）も？ → YES
3. 調べたあと？ → 当事者の意見をきく
4. 職権探知？ → NO（未主張事実まで判決の基礎にしない）

Right ひっかけ:
- 結果について意見不要
- 職権探知で未主張事実まで判決の基礎にできる
- 24は職権だけ／申立てだけ

Bottom:
- 判断軸:「必要があるとき職権。結果は意見」
- ひっかけ:「意見不要／職権探知」
- 暗記:「24は職権＋意見。職権探知ではない」
- 答え帯:「調べたら聞け」

Japanese only. No watermark.
```

---

## コマ3 プロンプト（執行停止との対比）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
16:9 warm off-white, navy title, left green / right orange, ONE simple center metaphor, bottom 判断軸 / ひっかけ / 暗記. Large Japanese, no overlap. Keep SIMPLE — one topic only.

Match LAYOUT of approved sample「主宰者の許可」.
Guide: ちゃちゃロット SMALL bottom-right only, wooden 指し棒 to 暗記. Match chachalot.png. Not bear/owl/cat. No nameplate.

STRICT: Left「論点」Q&A only (no GO/STOP mix). Right「ひっかけ」. Never「だれが」「問が聞くこと」「（聞かない）」.
Do NOT write that 執行停止 can be done 職権で.

Title:「職権・申立て — 22・24 vs 25」
Chip:「混ぜるな」

Center ONLY: three switch cards side by side:
「22 参加 → 職権○ 申立て○」
「24 証拠 → 職権○ 申立て○」
「25 執行停止 → 職権× 申立てのみ」
Big red stamp on 25「職権不可」.

Left 論点:
1. 22・24は？ → 職権でも申立てでも動ける
2. 25執行停止は？ → 申立て必須。職権ではできない
3. なぜ対比？ → 試験がここを混ぜる
4. 意見聴取は？ → 22・24・25いずれも結果／決定前に意見をきく場面あり（詳細は条文）

Right ひっかけ:
- 執行停止も職権でできる
- 22・24は申立てだけ／職権だけ
- 差止め訴訟でも執行停止（仮の差止めと混ぜる）

Bottom:
- 判断軸:「参加と証拠は双方向。停止だけ申立て一方通行」
- ひっかけ:「25も職権／22・24は片方だけ」
- 暗記:「22・24＝職権も申立ても。25＝申立てのみ」
- 答え帯:「停止だけ待たせる」

Japanese only. No watermark.
```

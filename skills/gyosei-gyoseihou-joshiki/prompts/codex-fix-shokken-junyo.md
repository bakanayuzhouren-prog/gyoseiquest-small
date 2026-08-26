# Codex修正 — 職権証拠調べ図（見た目＋答え帯）

対象: `assets/images/deepdive/行政法/shokken-junyo.png`  
正本: `data/knowledge/canonical/行政法/01-sanka-shokken-shoko.md`  
参照 identity: `skills/gyosei-image-style/assets/chachalot.png` ＋ `approved-smiling-hat-mascot.png`  
見本レイアウト: `approved-shusaisha-kyoka.png`

## てらしぃ報告

- **内容（論点表）は概ねよい**が、中央の人物が**強面・ガラ悪い**印象（あぷしブランドと合わない）。
- **答え帯が誤誘導**: 「25条（執行停止）だけ申立て必須」は**コマ3の話**。この図の答え帯にしてはいけない。
- 右下案内役が**くま寄り**になりがち → ちゃちゃロット（にっこり帽子）に戻す。

## 直すこと（局所修正・全体作り直し禁止）

1. **中央メタファーを柔らかく**  
   - 強面の裁判官アップをやめる。  
   - 代わり: 穏やかな裁判官（微笑み寄り）＋虫眼鏡、または人物顔を小さくして「職権証拠調べ」スタンプ＋虫眼鏡＋書類を主役にする。  
   - ヤクザ・強面・怒顔・威圧感禁止。学習アプリ向けの柔らかい線。

2. **答え帯をこの図の芯に合わせる**（必須・法律）  
   - 現行NG: `25条（執行停止）だけ申立て必須`  
   - 正解帯: **`当事者訴訟は22だけ外す`** または **`抗告は38。当事者は22なし`**  
   - 25条の文言は一切出さない（別図の担当）。

3. **タイトル**  
   - 準用の本命は別図 `junyo-22-24` 予定。この図は24本体中心でよい。  
   - タイトル案: `職権証拠調べ`（「と準用」を外してもよい）。中央の小さな準用スタンプ表は残してよい（法律どおりなら）。

4. **ちゃちゃロット**  
   - 右下小さく。木の指し棒で暗記を指す。  
   - `chachalot.png` / `approved-smiling-hat-mascot.png` に合わせる。くま・ふくろう・猫禁止。名札禁止。

5. **法律は変えない**（残す）  
   - 24＝職権○／申立て○／結果は意見  
   - 抗告→22・24準用（38）／当事者→24○・22×（41）  
   - ひっかけ: 意見不要・職権探知・当事者にも22・職権だけ／申立てだけ

## Codexプロンプト

```text
LOCAL EDIT only of the existing Japanese legal-study infographic「職権証拠調べ」(shokken-junyo). Do NOT redesign the whole layout. Keep left green 論点 / right orange ひっかけ / bottom 判断軸・ひっかけ・暗記 cards / navy answer bar. Keep all CORRECT legal text about 24・38・41.

FIX A — center character vibe (てらしぃ: ガラ悪い):
Replace the stern/rough/angry-looking judge close-up with a SOFT educational metaphor: gentle smiling judge (small face) OR mainly magnifying glass + evidence documents + stamp「職権証拠調べ」. No thuggish face, no intimidation, no yakuza vibe. Soft lines, warm off-white, あぷし style.

FIX B — answer bar (legal error):
REMOVE any text about 25条 or 執行停止.
Set answer bar to exactly:「当事者訴訟は22だけ外す」

FIX C — guide mascot:
Bottom-right SMALL ちゃちゃロット only: round cream face, light-blue hat with ear-like shapes, green blazer, wooden pointer to 暗記. Match chachalot.png / smiling-hat mascot. NOT a bear, owl, or cat. No nameplate.

Keep Japanese only. No watermark. Do not change the legal Q&A conclusions.
```

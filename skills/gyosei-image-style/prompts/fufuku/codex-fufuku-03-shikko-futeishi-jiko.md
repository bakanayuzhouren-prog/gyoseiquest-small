# Codex用 — 行服法（03）執行不停止と18条期間

- 保存先: `assets/images/deepdive/fufuku/shikko-futeishi-jiko.png`
- 画像キー: `fufuku/shikko-futeishi-jiko`
- 草稿: `../fufuku-shikko-futeishi-jikou.md`

## 法律の芯（崩すな）

25条1項: 審査請求は処分の**効力、処分の執行又は手続の続行を妨げない**（自動停止しない）。  
止めるのは25条2項以下の**執行停止**。行服の執行停止は行訴と向きが違う。
- 2項: 処分庁の上級行政庁又は処分庁である審査庁は、**申立てにより又は職権で**できる。
- 3項: それ以外の審査庁は**申立てのみ**（処分庁の意見を聴取）。
- 6項: 効力の停止は、それ以外の措置で目的を達することができるときはできない（補充性。行訴25条2項ただし書と同型）。

18条は**審査請求期間**（除斥）。民法の消滅時効ではない。
- 1項: 処分があったことを**知った日の翌日から三月**（再調査をしたときは決定を知った日の翌日から一月）
- 2項: 処分が**あった日の翌日から一年**（再調査をしたときは決定があった日の翌日から一年）

**書かない**: 請求＝自動停止／18条＝消滅時効／行服の執行停止は職権不可（それは行訴25条）／「処分の翌日から」だけ書いて「があった日」を落とす。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 審査請求は執行不停止。止め方は行服25条2項以下。18条は審査請求期間.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center metaphor, bottom 判断軸 / ひっかけ / 暗記.

Left heading 論点. Right heading ひっかけ.
Q&A answers are YES, NO, or a short legal phrase. Do not use GO or STOP.
Labels: Left「審査請求人（処分を争う）」Right「審査庁（執行停止を見る）」

Title:「請求しても止まらない」
Chip:「25条1項・18条」

Center ONLY: two parallel lanes.
Lane A still moving:「効力、執行又は手続の続行を妨げない」（25条1項）
Lane B calendar:「知った日の翌日から三月／処分があった日の翌日から一年」（18条）
Caption:「止めるのは25条2項以下。上級庁・処分庁である審査庁は申立て又は職権。それ以外の審査庁は申立てのみ。効力の停止は補充的（25条6項）。18条は除斥期間」

Left 論点:
1. 審査請求で執行は止まるか？ → NO
2. 上級庁である審査庁は職権で止められるか？ → YES
3. 18条は消滅時効か？ → NO

Right ひっかけ:
- 請求すれば自動停止する
- 行服の執行停止は職権ではできない
- 18条は民法の消滅時効である

Bottom:
- 判断軸:「不停止が原則か。誰が職権で止められるか」
- ひっかけ:「請求＝停止。行服も職権不可。18条＝時効」
- 暗記:「審査請求だけでは止まらない。上級庁・処分庁である審査庁は職権可。18条は除斥期間」
Answer:「審査請求は処分の効力、処分の執行又は手続の続行を妨げない。上級行政庁又は処分庁である審査庁は、申立てにより又は職権で執行停止をすることができる。18条は審査請求期間であり、消滅時効ではない。」

Guide: ONE ちゃちゃロット only, SMALL bottom-right, 指し棒 to Lane A. Cream face, independent pale-sky-blue smiling hat, green lecturer jacket, white shirt, green trousers, shoes. No nameplate. No logos or watermarks.
```

## 目視チェック

- [ ] 「失効不停止」と誤記していない
- [ ] 行服の執行停止を職権不可と書いていない
- [ ] 18条を「処分の翌日から」と省略していない

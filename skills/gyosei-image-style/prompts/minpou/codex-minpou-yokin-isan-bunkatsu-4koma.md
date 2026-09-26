# Codex用 — 預貯金は、死亡と同時に半分ずつにならない（4コマ）

4コマ。当然分割ではないこと、遺産分割の対象であること、909条の2の払戻しが例外であることを描く。左右パネルと中央表は使わない。

- 保存先: `assets/images/deepdive/learn/minnpou/yokin-isan-bunkatsu-4koma.png`
- 画像キー: `learn/minnpou/yokin-isan-bunkatsu-4koma`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。アプリ載せは生成後。

## 法律

預貯金債権は、相続開始と同時に法定相続分に応じて当然に分割されない。遺産分割の対象である（最大決平成28年12月19日）。遺産分割が終わるまで、共同相続人の準共有である。相続人の1人が、法定相続分だから半分を払え、と銀行へ当然には言えない。

理由は、家は一方、預金は他方、という調整や、特別受益との公平に、預貯金を使えるようにするためである。

例外は、遺産分割前の払戻し（民法909条の2）。各共同相続人は、他の相続人の同意なしに、相続開始時の債権額の3分の1に、その人の法定相続分を乗じた額まで、単独で行使できる。預貯金債権の債務者ごとに150万円が上限である。同一の金融機関ごとであり、支店ごとではない。権利を行使した分は、その相続人が遺産の一部の分割により取得したものとみなす。

例。預金1000万円、子2人で法定相続分は各2分の1。計算は1000万円×3分の1×2分の1。上限があるので、その金融機関から単独で払戻しを受けられるのは150万円まで。

試験で「預貯金は、相続開始と同時に法定相続分で当然に分割される」と書いてあったら×。
試験で「遺産分割が終わるまで、1円も払い戻せない」と書いてあったら×。
試験で「払戻しの上限は、支店ごとに150万円」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 兄 | いい役 | 相続人（家を継ぎ、預金の分け方を決めたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 1〜4コマの左 |
| 弟 | いい役 | 相続人（法定相続分を、今すぐ銀行から受け取りたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 1〜4コマの右 |
| 誤った主張 | 悪い役 | 誤った主張をする側（死亡と同時に半分ずつ、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 1コマの吹き出しと、底部のひっかけだけ |
| 案内 | いい役 | 案内（暗記帯を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

銀行員は人物にしない。窓口の札だけ。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。ぴっちゅは pitchi_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study 4-panel comic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four panels left to right, numbered 1 to 4. No left-right debate panels. No center table. No brand name, account name, or app name. No human bank clerk. Only a bank-counter sign.
Title: 預貯金は、死亡と同時に半分ずつにならない
Subtitle: 遺産分割の対象（最大決平成28年12月19日）
タスク亀 on the left of each panel, label 相続人（家を継ぎ、預金の分け方を決めたい）.
ぴっちゅ on the right of each panel, label 相続人（法定相続分を、今すぐ銀行から受け取りたい）.

Panel 1. 死亡と、1000万円の預金
A passbook showing 1000万円. Two children. ぴっちゅ says: 子2人だから、今すぐ500万円ずつ払って。
Small カチャドクロ bubble, label 誤った主張（死亡と同時に半分ずつ、とする）: 法定相続分で当然に分割される。 Put a red X on that bubble.

Panel 2. 当然には分割されない
The passbook stays one claim, marked 準共有. Speech from タスク亀: 死亡と同時には分かれない。誰がいくら取るかは、遺産分割が決める。
Caption: 半分だから払え、と銀行へ当然には言えない。

Panel 3. なぜ遺産分割の対象か
A house on one side and the passbook on the other. Speech: 家は一方、預金は他方、と調整できる。特別受益との公平にも、預金を使える。当然に分かれると、その調整ができない。

Panel 4. 例外は、分割前の払戻し（909条の2）
ぴっちゅ receives one small bag marked 150万円. Not the whole 1000万円.
Text: 同意は要らない。相続開始時の額×3分の1×法定相続分。この例は1000万円×3分の1×2分の1。同一の金融機関につき150万円が上限。支店ごとではない。行使した分は、遺産の一部の分割で取得したものとみなす。

Bottom trap strip, amber, カチャドクロ only in this strip:
試験で「預貯金は、相続開始と同時に法定相続分で当然に分割される」と書いてあったら×。
試験で「遺産分割が終わるまで、1円も払い戻せない」と書いてあったら×。
試験で「払戻しの上限は、支店ごとに150万円」と書いてあったら×。
Bottom memory band, pointed by ちゃちゃロット. One mascot only, bottom-right margin. Green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. Not a cap. The pointer must not cover the memory text.
Memory text: 預貯金は当然分割ではない。遺産分割の対象。例外の払戻しは、額の3分の1×法定相続分。金融機関ごとに150万円まで。
Do not cover the panel text with characters or speech balloons.
```

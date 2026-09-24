# Codex用 — 設立時発行株式と発行可能株式総数（誰の同意か）

てらしぃの気づき: 募集設立でも設立時発行株式の数は全員の同意。
1枚の仕事は **設立時発行株式は発起設立でも募集設立でも発起人全員。発行可能株式総数だけ、募集設立は創立総会**。
既存の `setsuritsu-hokki-boshu.png`（引受けの対比）と `setsu-2.png` は上書きしない。

- 保存先: `assets/images/deepdive/learn/shouhou/setsuritsu-hakko-doi.png`
- 画像キー: `learn/shouhou/setsuritsu-hakko-doi`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・会社法の「もっと深掘る」。アプリ載せは生成後。

## PRE-GENERATE-CHECK（会社法32・37・58・98）

**設立時発行株式**＝設立のときに実際に出す株式。種類・数、払込金額、資本金等は、定款に定めがないとき**発起人全員の同意**（32条）。発起設立・募集設立の両方。全員は**発起人**（頭数）。引受人全員ではない。定款に既にあるときは、重ねて同意を要しない。

**設立時発行株式の募集事項**＝募集設立だけ。定めようとするときは**発起人全員の同意**（58条2項）。発起設立にはこの行がない。

**発行可能株式総数**＝定款に書く上限（出せる枠）。設立時発行株式の数とは別。
- 発起設立の定め・変更は**発起人全員の同意**（37条1項・2項）
- 募集設立は**創立総会の決議**（98条）。発起人全員の同意ではない

**書かない:** 募集設立の発行可能も発起人全員。設立時発行株式の数は創立総会。引受人全員の同意。57条3項（募集事項は58条2項）。口語。ブランド名。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 設立時発行株式は発起人全員。発行可能は募集だと創立総会 |
| 中央 | 3行表。発起設立／募集設立。行ゼブラ |
| 判断軸 | 出す株か、定款の上限か。募集設立か |
| ひっかけ | 発行可能も募集設立は全員。設立時発行株式は創立総会。引受人全員 |
| 暗記 | 出す株は両方とも発起人全員。上限は募集だと創立総会 |
| 役割 | 発起人（出す株の数を全員で決めたい）／誤った主張をする側（募集設立の上限も発起人全員だとする） |

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 発起人 | いい役 | 発起人（出す株の数を全員で決めたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` |
| 誤った主張 | 悪い役 | 誤った主張をする側（募集設立の上限も発起人全員だとする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` |
| 案内 | いい役 | 案内（暗記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |

## GPT Image プロンプト

```text
参照必須: 場面役はポーズシート pitchi_sheet.png と kachadokuro_sheet.png を照合する。ちゃちゃロットは全身指し棒正本 approved-chachalot-pointer.png。制度の意味を先に示し、条文番号は括弧で後から付ける。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 設立のときに実際に出す株式は発起設立でも募集設立でも発起人全員の同意。定款の上限である発行可能株式総数だけ、募集設立は創立総会の決議.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas/background: fully opaque solid warm off-white across 100% of the entire 16:9 canvas, including all four corners. No transparency, checkerboard, or unpainted margin.
Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Do not print brand names anywhere on the image.

Left heading 論点. Right heading ひっかけ.
Q&A answers are YES, NO, or a short legal phrase. Do not use GO or STOP.
Labels: Left「発起人（出す株の数を全員で決めたい）」Right「誤った主張をする側（募集設立の上限も発起人全員だとする）」

Title:「出す株は発起人全員。上限は募集だと創立総会」
Chip:「会社法32条・37条・58条・98条」

Center ONLY: one table. Header navy. Row zebra white / light gray, horizontal not columns.
Columns: 決めること | 発起設立 | 募集設立
Rows:
設立時発行株式の種類・数、払込金額、資本金等 | 発起人全員の同意（32条） | 発起人全員の同意（32条）
設立時発行株式の募集事項 | ない | 発起人全員の同意（58条2項）
発行可能株式総数（定款の上限） | 発起人全員の同意（37条） | 創立総会の決議（98条）
Caption:「全員は発起人の頭数。引受人全員ではない。定款に既にある事項は、32条の同意を重ねない」

Left 論点:
1. 出す株の数は募集設立でも全員か？ → YES（32条。発起人）
2. 募集事項は？ → 発起人全員（58条2項）
3. 発行可能株式総数は募集設立でも全員か？ → NO（創立総会・98条）

Right ひっかけ:
- 募集設立の発行可能株式総数も発起人全員
- 設立時発行株式の数は創立総会
- 同意が要るのは引受人全員
- 出す株と定款の上限は同じもの

Bottom:
- 判断軸:「出す株か。定款の上限か。募集設立か」
- ひっかけ:「発行可能も募集設立は全員。設立時発行株式は創立総会。引受人全員」
- 暗記:「出す株は両方とも発起人全員。上限は募集だと創立総会」
Answer:「設立時発行株式は発起設立でも募集設立でも発起人全員の同意。発行可能株式総数は、発起設立は発起人全員の同意、募集設立は創立総会の決議。」

Guide: ONE ちゃちゃロット only, SMALL bottom-right margin, wooden 指し棒 pointing at 暗記. Cream face, independent pale-sky-blue smiling hat with three rounded hills and a long brim (not ears, not a hood), closed smiling eyes, green lecturer jacket, white shirt, green trousers, shoes. No nameplate. Do not stand on the answer band.
Scene cast SMALL, do not cover the table: ぴっちゅ left, カチャドクロ right. Do not swap roles. No owl, bear, cat, raccoon.
```

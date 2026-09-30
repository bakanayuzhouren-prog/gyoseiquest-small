# Codex用 — 転付命令は、裁判所が債権を付け替える命令

1枚。横に4コマ。上から条文番号で始めない。A・B・銀行の関係を先に見せ、そのあと命令と効果。左右のdebateパネルと中央の比較表は使わない。競合（159条3項）と、給料等の4週間（159条6項）は、この図に描かない。別図候補。

- 保存先: `assets/images/deepdive/learn/minnpou/tenpu-meirei-ticket.png`
- 画像キー: `learn/minnpou/tenpu-meirei-ticket`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。アプリ載せは生成後。
- 人物: 無名の人間は置かない。Aはぴっちゅ、Bはタスク亀。銀行は建物のアイコン。裁判官の人物は置かない。案内はちゃちゃロット1体。

## PRE-GENERATE-CHECK

民事執行法159条1項。執行裁判所は、差押債権者の申立てにより、支払に代えて券面額で差し押さえられた金銭債権を差押債権者に転付する命令を発することができる。

159条2項。転付命令は、債務者及び第三債務者に送達しなければならない。

159条5項。転付命令は、確定しなければその効力を生じない。

160条。転付命令が効力を生じた場合においては、差押債権者の債権及び執行費用は、転付命令に係る金銭債権が存する限り、その券面額で、転付命令が第三債務者に送達された時に弁済されたものとみなす。

この図の80万円は、預金債権が存するときの券面額。存在しない債権にまで弁済の効果を書かない。裁判所が銀行の現金をAへ渡す図にしない。移るのは預金債権。

残り20万円は、貸金100万円から券面額80万円を引いた例。160条は執行費用も券面額で弁済されたものとみなす。図の計算は執行費用を除いた貸金だけの例、と1行添える。

159条3項（送達前の他の債権者の差押え等があると効力を生じない）と、159条6項（給料等は確定に加え4週間）は、この預金の例の本筋ではない。図に置かない。

試験で「銀行から現実に80万円を受け取った時に、Bの債務が80万円減る」と書いてあったら×。
試験で「転付命令は確定前から効力を生じる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| A | いい役 | A（差押債権者。貸した100万円を回収したい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 1コマと3コマと4コマ。矢印と計算を隠さない |
| B | いい役 | B（債務者。100万円を借りている） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 1コマと2コマ。矢印を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（現実の入金で債務が減る、確定前に効力が生ずると言う） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。4コマの計算を隠さない |
| 案内 | いい役 | 案内（4コマの流れを指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

銀行は、人物ではない建物アイコン。ラベルは「銀行（第三債務者）」。過去の辻さんと代さんは置かない。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは assets/images/characters/pitchi_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。ちゃちゃロットは skills/gyosei-image-style/assets/approved-chachalot-pointer.png と approved-smiling-hat-mascot.png。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。緑の講師スーツは白シャツ、ズボン、靴まで。1体だけ。下余白の右。指し棒は計算式と答え帯に重ねない。

Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. 16:9. Four panels in one horizontal row, then a bottom strip. No left-right debate panels. No comparison table.

Title: 転付命令＝裁判所が債権を付け替える特別チケット

Panel 1 heading: 1. 貸付け
ぴっちゅ labeled A（差押債権者。貸した100万円を回収したい）
Arrow to タスク亀 labeled B（債務者。100万円を借りている）
Arrow label: 100万円の貸金債権

Panel 2 heading: 2. Bの財産
タスク亀 B, arrow to a bank building icon. The bank is not a person.
Arrow label: 80万円の預金債権
Under the building: 銀行（第三債務者）

Panel 3 heading: 3. 裁判所の転付命令
A courthouse icon labeled 執行裁判所 hands ぴっちゅ a formal court-order sheet with a gold border. The sheet is a court order, with these words:
転付命令（裁判所の命令）
預金債権80万円をAへ付け替える
差し押さえた金銭債権を、支払いに代えて券面額でAへ移す
Small lines under the sheet:
差押えのあとに発する（159条1項）
債務者と銀行へ送達する（159条2項）
確定しなければ効力を生じない（159条5項）
Caption under ぴっちゅ: A（差押債権者。貸した100万円を回収したい）

Panel 4 heading: 4. 効果
Arrow from the bank building to ぴっちゅ: 80万円の預金債権が移転
Do not show cash moving from the court to A. The thing that moves is the deposit claim.
Lines:
預金債権が存する限り、券面額80万円で弁済されたものとみなす（160条）
弁済の効果は、銀行への送達時に生じたものとみなす
100万円 − 80万円 ＝ 残り20万円
残り20万円は、執行費用を除いた貸金の例

Bottom strip:
ひっかけ: 試験で「銀行から現実に80万円を受け取った時に、Bの債務が80万円減る」と書いてあったら×
ひっかけ: 試験で「転付命令は確定前から効力を生じる」と書いてあったら×
カチャドクロ stands beside these two lines and does not cover them.
暗記: 取立ては回収した分。転付は債権そのものを券面額で受け取る。

Navy answer bar:
転付命令は、差し押さえた金銭債権を、支払いに代えて券面額で差押債権者へ移転させる裁判所の命令。

One ちゃちゃロット only, bottom-right cream margin above the answer bar. Characters, the courthouse icon, and the bank icon do not cover arrows, the gold-bordered order, the subtraction, or the answer bar.
```

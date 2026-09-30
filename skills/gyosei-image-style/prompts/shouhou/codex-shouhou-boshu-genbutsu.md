# Codex用 — 募集設立でも、現物出資ができるのは発起人だけ

比較表。発起人は1株以上引き受け、金銭の全額払込みか、金銭以外の財産の全部給付ができる。設立時募集株式の引受人は、払込金額の全額の払込みだけである。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/shouhou/boshu-genbutsu.png`
- 画像キー: `learn/shouhou/boshu-genbutsu`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・会社法の「もっと深掘る」。アプリ載せは生成後。

## 法律

会社法25条2項。各発起人は、株式会社の設立に際して、設立時発行株式を少なくとも1株以上引き受けなければならない。募集設立でも同じである。

会社法34条1項。発起人は、設立時発行株式の引受け後遅滞なく、その引き受けた設立時発行株式につき、その出資に係る金銭の全額を払い込み、又はその出資に係る金銭以外の財産の全部を給付しなければならない。この給付が現物出資である。

会社法63条1項。設立時募集株式の引受人は、発起人が定めた銀行等の払込みの取扱いの場所において、それぞれの設立時募集株式の払込金額の全額の払込みを行わなければならない。現物出資はできない。

会社法28条1号。金銭以外の財産を出資する者の氏名又は名称、当該財産及びその価額、並びにその者に対して割り当てる設立時発行株式の数は、定款に記載し、又は記録しなければ、その効力を生じない。原則として検査役の調査が要る。

試験で「募集設立では、発起人は株式を引き受けなくてよい」と書いてあったら×。
試験で「募集設立では、発起人は現物出資できない」と書いてあったら×。
試験で「設立時募集株式の引受人も、現物出資できる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（募集設立では発起人は現物出資できない、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（現物出資ができるのは発起人、を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅとタスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One comparison table. No left-right debate panels. No three cards at the bottom.
Title: 募集設立でも、現物出資ができるのは発起人だけ
Subtitle: 引受人は、金銭の全額払込みだけ
Header, navy: 比べること / 発起人 / 設立時募集株式の引受人
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Row: 株式の引受け / 各人が1株以上引き受ける（25条2項） / 募集に応じて引き受ける
Row: 出資の履行 / 金銭の全額払込み、または金銭以外の財産の全部給付（34条1項） / 払込金額の全額の払込みだけ（63条1項）
Row: 現物出資 / できる / できない
Bottom note under the table: 現物出資は、定款に記載しなければ効力を生じない（28条1号）。原則として検査役の調査が要る。
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（募集設立では発起人は現物出資できない、とする）:
試験で「募集設立では、発起人は株式を引き受けなくてよい」と書いてあったら×。
試験で「募集設立では、発起人は現物出資できない」と書いてあったら×。
試験で「設立時募集株式の引受人も、現物出資できる」と書いてあったら×。
ちゃちゃロット stands only in the bottom-right margin, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the cell 現物出資ができる and does not cover the letters.
Do not print any brand name, account name, or app name. Do not cover the table with characters or the pointer.
```

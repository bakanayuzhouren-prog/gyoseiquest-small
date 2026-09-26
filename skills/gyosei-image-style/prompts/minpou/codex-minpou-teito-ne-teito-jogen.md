# Codex用 — 後順位者を守る上限（普通抵当と根抵当）

比較表1枚。左右パネルと底部3カードは使わない。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。

- 保存先: `assets/images/deepdive/learn/minnpou/teito-ne-teito-jogen.png`
- 画像キー: `learn/minnpou/teito-ne-teito-jogen`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。アプリ載せは生成後。

## 法律

後順位者を守る上限は、担保の種類で違う。

普通抵当権。元本は、期間で切らない。利息その他の定期金は、原則として、満期となった最後の2年分についてのみ、抵当権を行使できる（民法375条1項）。債務不履行による損害賠償も、最後の2年分である。利息その他の定期金と通算して、2年分を超えることができない（375条2項）。満期後に特別の登記をした以前の定期金は、その登記の時から行使できる（375条1項ただし書）。図の原則欄には、このただし書を「原則」として書かない。

根抵当権。確定した元本、利息その他の定期金、および債務不履行による損害賠償の全部について、極度額を限度として根抵当権を行使できる（398条の3第1項）。利息だけを最後の2年分に限るルールではない。元本も極度額の中に入る。

試験で「普通抵当権の元本も、最後の2年分だけ」と書いてあったら×。
試験で「普通抵当権の損害金は、利息と別に全額取れる」と書いてあったら×。
試験で「根抵当権の利息も、満期となった最後の2年分に限る」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（根抵当の利息も2年分、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 底部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（普通抵当の行を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

タスク亀とぴっちゅは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One comparison table. No left-right debate panels. No three cards at the bottom.
Title: 後順位者を守る上限
Subtitle: 普通抵当は最後の2年分。根抵当は極度額
Header, navy: 担保 / 後順位者を守る上限
Row 1, white: 普通抵当権 / 元本は期間で切らない。利息その他の定期金は、原則、満期となった最後の2年分（375条1項）。損害金も最後の2年分で、利息と通算して2年分を超えない（375条2項）
Row 2, light gray: 根抵当権 / 元本・利息・損害金を合計して、極度額まで（398条の3第1項）。利息だけを最後の2年分には限らない
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（根抵当の利息も2年分、とする）:
試験で「普通抵当権の元本も、最後の2年分だけ」と書いてあったら×。
試験で「普通抵当権の損害金は、利息と別に全額取れる」と書いてあったら×。
試験で「根抵当権の利息も、満期となった最後の2年分に限る」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. Not a cap.
Note text: 普通抵当の2年分は、利息などの話。根抵当は、元本も入れて極度額まで。
Do not print any brand name, account name, or app name. Do not cover the table with characters or the pointer.
```

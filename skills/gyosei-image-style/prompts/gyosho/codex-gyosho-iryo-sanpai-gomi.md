# Codex用 — 医師は適格がない。ごみ収集の同業者はある。産廃は住民

1枚の3行の表。産廃の行だけ、争う人が住民である。業者同士の話にしない。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/gyosho/iryo-sanpai-gomi.png`
- 画像キー: `learn/gyosho/iryo-sanpai-gomi`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政事件訴訟法の「もっと深掘る」。アプリ載せは生成後。

## 法律

医療法。最判平19.10.19。医療法7条は、医療の適正な配置という公益が目的である。既存の医療機関の競争上の利益を個別に保護しない。既存の同種の病院の医師は、他の病院の開設許可の取消しを求める原告適格を有しない。

一般廃棄物処理業。最判平26.1.28。廃棄物処理法7条は需給調整の趣旨を含む。同じ種類の許可又はその更新を受けている者は、他者のその種類の許可の取消しを求める原告適格を有し得る。収集運搬の許可だけの業者が、中間処理や最終処分の許可を争うなど、種類が異なれば適格はない。近所の住民の話ではない。

産業廃棄物。最判平26.7.29。産業廃棄物の最終処分場から有害な物質が排出された場合に、大気や土壌の汚染、水質の汚濁、悪臭により、健康又は生活環境に係る著しい被害を直接的に受けるおそれのある周辺住民は、その処分場を事業の用に供する施設としてされた処分業の許可の取消し等を求める原告適格を有する。近くに住む全員ではない。その事件では、中心から約1.8キロメートル以内で生活環境の調査対象地域に住む者はあり、約20キロメートル離れた者はない。同業の処理業者の話ではない。

試験で「医師も競争者だから、適格がある」と書いてあったら×。
試験で「一般廃棄物は、近所の住民に適格がある」と書いてあったら×。
試験で「産廃は、同業の処理業者に適格がある」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（産廃は同業の処理業者に適格がある、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（産廃の行の「周辺住民」を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅとタスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One three-row table is the figure. No left-right debate panels. No three cards at the bottom.
Title: 医師は適格がない。ごみ収集の同業者はある。産廃は住民
Subtitle: 産廃は、業者同士の話ではない
Header, navy: 誰が争うか / 適格 / 法令が守るもの
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white. Not by column.
Give the third row a thin amber outline so the eye sees that the person is a resident.
Row: 既存の同種の病院の医師が、他の病院の開設許可を争う / ない / 医療の適正な配置という公益（医療法7条、平19.10.19）
Row: 一般廃棄物の同じ種類の許可を持つ業者が、他者の許可を争う / ある / 需給調整による営業上の利益（平26.1.28）。種類が違えばない
Row: 産廃の最終処分場で、健康又は生活環境に著しい被害を直接受けるおそれのある周辺住民 / ある / 大気、土壌、水質、悪臭（平26.7.29）。近くに住む全員ではない
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（産廃は同業の処理業者に適格がある、とする）:
試験で「医師も競争者だから、適格がある」と書いてあったら×。
試験で「一般廃棄物は、近所の住民に適格がある」と書いてあったら×。
試験で「産廃は、同業の処理業者に適格がある」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: ごみ収集だけの業者が、処分業の許可を争うのは、種類が違うのでない。
Do not print any brand name, account name, or app name. Do not cover the table with characters or the pointer.
```

# 他の病院、ごみの許可、産廃の処分場。誰に訴える資格がある？

3行の表が本体。産廃の行は、周辺住民が争う。

- 状態: 上書き生成
- 上書き対象: `assets/images/deepdive/learn/gyosho/iryo-sanpai-gomi.png`
- 保存先: `assets/images/deepdive/learn/gyosho/iryo-sanpai-gomi.png`
- 画像キー: `learn/gyosho/iryo-sanpai-gomi`
- 生成は Codex。Cursor は描かない。

## PRE-GENERATE-CHECK

確認日 2026-10-21。

- 医療法。最判平19.10.19。医療法7条は医療の適正な配置という公益。既存の同種の病院の医師は、他の病院の開設許可の取消しを求める資格を有しない。
- 一般廃棄物。最判平26.1.28。同じ種類の許可を持つ業者は、他者のその種類の許可の取消しを求める資格を有し得る。種類が違えばない。近所の住民の話ではない。
- 産業廃棄物。最判平26.7.29。最終処分場について、大気、土壌、水質、悪臭により健康又は生活環境に係る著しい被害を直接的に受けるおそれのある周辺住民に資格がある。近くに住む全員ではない。同業の処理業者の話ではない。

書かない。医師も競争者だから資格がある。一般廃棄物は近所の住民に資格がある。産廃は同業の処理業者に資格がある。タイトルを「産廃は住民」だけにすること。ブランド名。左右の欄。底部の3枚。案内役の説明文。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（産廃は同業の処理業者に資格がある、とする） | カチャドクロ | `kachadokuro.png` | 表の下。表を隠さない。せりふは足さない |

案内役は置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One three-row table is the figure. No side panels. No bottom cards.
Title, one short question: 他の病院、ごみの許可、産廃の処分場。誰に訴える資格がある？
Header, navy: 誰が、何の許可を争うか | 訴える資格 | 法令が守るもの
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white. Not by column.
Rows:
既存の同種の病院の医師が、他の病院の開設許可を争う | ない | 医療の適正な配置という公益（医療法7条、平19.10.19）
同じ種類の一般廃棄物の許可を持つ業者が、他者のその許可を争う | ある | 需給調整による営業上の利益（平26.1.28）。種類が違えばない
産廃の最終処分場で、健康又は生活環境の著しい被害を直接受けるおそれのある周辺住民 | ある | 大気、土壌、水質、悪臭（平26.7.29）。近くに住む全員ではない
Under the table, small カチャドクロ, label 誤った主張（産廃は同業の処理業者に資格がある、とする）. No speech balloon.
Three lines only, beside or under that label, not repeated in the title:
試験で「医師も競争者だから、資格がある」と書いてあったら×。
試験で「一般廃棄物は、近所の住民に資格がある」と書いてあったら×。
試験で「産廃は、同業の処理業者に資格がある」と書いてあったら×。
Do not print any brand name, account name, or app name.
```

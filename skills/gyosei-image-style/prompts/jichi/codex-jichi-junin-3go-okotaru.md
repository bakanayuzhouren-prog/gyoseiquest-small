# Codex用 — 3号訴訟は、公金の賦課・徴収又は財産の管理を怠る事実の違法確認

上は、公金の賦課・徴収をせず、財産の管理を怠っている場面。下は出訴期間の表。申請に対して処分をしない不作為とは別である。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/jichi/junin-3go-okotaru.png`
- 画像キー: `learn/jichi/junin-3go-okotaru`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・地方自治法の「もっと深掘る」。アプリ載せは生成後。

## 法律

地方自治法242条1項。怠る事実とは、違法若しくは不当に公金の賦課若しくは徴収若しくは財産の管理を怠る事実である。

地方自治法242条の2第1項3号。住民訴訟の3号は、執行機関又は職員に対する、当該怠る事実の違法確認の請求である。徴収せよ、と命ずる訴えではない。

行政事件訴訟法3条5項の不作為は、行政庁が法令に基づく申請に対し、相当の期間内に何らかの処分又は裁決をすべきであるにかかわらず、これをしないことである。建築確認の申請に答えないことは、こちらである。3号の怠る事実ではない。

地方自治法242条の2第2項・第3項。住民訴訟の出訴期間は、次のとおりであり、不変期間である。

- 監査の結果又は勧告に不服があるとき。その通知の日から30日以内。
- 勧告を受けた措置に不服があるとき。その通知の日から30日以内。
- 請求の日から60日を経過しても監査も勧告もしないとき。その60日を経過した日から30日以内。
- 勧告に示された期間を経過しても措置をしないとき。その期間を経過した日から30日以内。

行訴法の不作為の違法確認には、取消訴訟のような出訴期間はない。住民訴訟3号には、上記の出訴期間がある。

試験で「3号は不作為の違法確認なので、出訴期間はない」と書いてあったら×。
試験で「建築確認の申請に答えないのも、3号の怠る事実である」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（3号は不作為なので出訴期間はない、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。場面と表を隠さない |
| 案内 | いい役 | 案内（出訴期間は30日、を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。場面の中には入れない |

ぴっちゅとタスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One scene on top, one period table below. No left-right debate panels. No three cards at the bottom.
Title: 3号訴訟は、公金の賦課・徴収又は財産の管理を怠る事実の違法確認
Subtitle: 申請に答えない不作為ではない。出訴期間は30日
Upper scene: public money left uncollected and a public building left unmanaged. Tax bills stacked and ignored. Coins and a property key left on the desk. No people applying for a permit. Large label on the scene: 公金の賦課・徴収、財産の管理を怠る事実（242条1項）
Arrow from the scene to a stamp: 3号は、この怠る事実が違法であることの確認（242条の2第1項3号）
Small line: 徴収せよ、と命ずる訴えではない。
Amber box beside the stamp: 申請に対して、相当の期間内に処分も裁決もしないこと。これは行訴法の不作為（3条5項）。3号ではない。
Table heading: 住民訴訟の出訴期間（242条の2第2項）。不変期間（3項）
Header, navy: どのとき / いつまで
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Row: 監査の結果または勧告に不服 / 通知の日から30日以内
Row: 勧告を受けた措置に不服 / 通知の日から30日以内
Row: 請求から60日を経過しても、監査も勧告もしない / その日から30日以内
Row: 勧告の期間を過ぎても措置をしない / その日から30日以内
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（3号は不作為なので出訴期間はない、とする）:
試験で「3号は不作為の違法確認なので、出訴期間はない」と書いてあったら×。
試験で「建築確認の申請に答えないのも、3号の怠る事実である」と書いてあったら×。
ちゃちゃロット stands only in the bottom-right margin, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates 30日 and does not cover the letters.
Do not print any brand name, account name, or app name. Do not cover the scene or the table with characters or the pointer.
```

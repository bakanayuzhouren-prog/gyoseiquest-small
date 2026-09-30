# Codex用 — 過失相殺は、債務不履行では責任と額、不法行為では額

比較表が本体。債務不履行は、裁判所が責任の有無と額の両方を定める。不法行為は、裁判所が額を定めることができる。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/minnpou/kashitsu-sousai-418-722.png`
- 画像キー: `learn/minnpou/kashitsu-sousai-418-722`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。アプリ載せは生成後。

## 法律

民法418条。債務の不履行又はこれによる損害の発生若しくは拡大に関して債権者に過失があったときは、裁判所は、これを考慮して、損害賠償の責任及びその額を定める。

民法722条2項。被害者に過失があったときは、裁判所は、これを考慮して、損害賠償の額を定めることができる。

418条は必要的である。責任をなくすことも、額を減らすこともある。722条2項は裁量的である。条文上は額の算定である。

722条2項の被害者の過失は、損害の発生にも、拡大にも及ぶ。被害者本人に加え、被害者と身分上ないし生活関係上一体をなすとみられるような関係にある者の過失も、被害者側の過失として考慮できる。夫婦で夫が運転し、妻が同乗していたときは、これに当たる。近所の通行人は、この関係に入らない。

被害者本人の過失として相殺するには、事理弁識能力が要る。３歳児にはない。責任能力までは不要である。

試験で「不法行為でも、責任の有無まで定める」と書いてあったら×。
試験で「債務不履行は、額だけを裁量で減らせる」と書いてあったら×。
試験で「近所の通行人も、被害者側の過失になる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（不法行為でも責任の有無まで定める、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（418条は責任及び額、を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅとタスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One comparison table. No left-right debate panels. No three cards at the bottom.
Title: 過失相殺は、債務不履行では責任と額、不法行為では額
Subtitle: 裁判所が動かす範囲が違う
Header, navy: 比べること / 債務不履行（418条） / 不法行為（722条2項）
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Row: 裁判所がすること / 責任及びその額を定める / 額を定めることができる
Row: 効果 / 必要的。責任をなくすことも、額を減らすこともある / 裁量的。条文上は額
Row: 考慮する過失 / 債務の不履行、またはこれによる損害の発生若しくは拡大についての債権者の過失 / 被害者の過失。発生にも拡大にも及ぶ
Row: 誰の過失か / 債権者 / 被害者本人、および被害者と身分上ないし生活関係上一体をなすとみられるような関係にある者
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（不法行為でも責任の有無まで定める、とする）:
試験で「不法行為でも、責任の有無まで定める」と書いてあったら×。
試験で「債務不履行は、額だけを裁量で減らせる」と書いてあったら×。
試験で「近所の通行人も、被害者側の過失になる」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 被害者本人の過失として相殺するには、事理弁識能力が要る。３歳児にはない。責任能力までは不要。
Do not print any brand name, account name, or app name. Do not cover the table with characters or the pointer.
```

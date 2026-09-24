# Codex用 — 場外車券の1000メートルと納骨堂のおおむね300メートル

1枚の仕事は、距離の数字があっても、原告適格の人が違うこと。
左は場外車券（最判平21.10.15・位置基準）。右は納骨堂（最判令5.5.9）。ひっかけは底部。

てらしぃの「1000メートル以内に住む者」「医療関係者だけ」は、条文・判決と違う。図では次のとおり書く。
- 1000メートルは、申請の見取図に書く範囲。敷地の周辺から千メートル以内の学校その他の文教施設と、病院その他の医療施設の位置と名称（自転車競技法施行規則。現行も見取図の項）。
- 位置基準は「文教上又は保健衛生上著しい支障を来すおそれがない場所」（現行15条1項1号）。
- 適格があり得るのは、設置・運営に伴い著しい業務上の支障が生ずるおそれがあると位置的に認められる区域の、文教施設又は医療施設の**開設者**。医療の職員一般ではない。文教の開設者も含む。1000メートル以内なら常に、ではない。
- 周辺に住む者、医療施設等以外の事業を営む者、医療施設等の利用者は、位置基準では適格がない。
- 納骨堂は墓埋法10条の経営許可。大阪市の細則が、学校・病院・人家の敷地からおおむね300メートル以内を原則として許可しない。最判令5.5.9は、そのおおむね300メートル以内の人家に住む者に、平穏な日常生活の利益として原告適格を認めた。300メートルは法律本体の数字ではない。

車券側で、位置基準以外の周辺環境調和基準まで断定しない。医療法の他病院を争う医師（平19.10.19・適格なし）と混ぜない。

- 保存先: `assets/images/deepdive/learn/gyosho/shaken-1000-nokotsu-300.png`
- 画像キー: `learn/gyosho/shaken-1000-nokotsu-300`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政事件訴訟法の「もっと深掘る」。既存の `genkoku-ari.png` 等は上書きしない。アプリ載せは生成後。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 車券側 | いい役 | 開設者（業務上の支障を避けたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 左の下。表を隠さない |
| 納骨堂側 | いい役 | 人家の居住者（平穏な日常生活を守りたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 右の下。表を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（1000メートル以内の居住者はみな適格、医療関係者だけ、300メートルの居住者は適格なし、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 底部ひっかけの脇。答え帯に乗らない |
| 案内 | いい役 | 案内（暗記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体だけ |

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。制度の意味を先に示し、条文番号と判決日は括弧で後から付ける。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 場外車券発売施設の1000メートルと、納骨堂のおおむね300メートルでは、原告適格を持つ人が違う.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas/background: fully opaque solid warm off-white across 100% of the entire 16:9 canvas. No transparency or unpainted margin.
Match LAYOUT of「主宰者の許可」but split the two topics left and right. Left panel is only 場外車券. Right panel is only 納骨堂. Do not put both conclusions in one panel. Bottom cards are 判断軸 / ひっかけ / 暗記. A small center scene may sit between the panels and must not cover text.

Do not print brand names anywhere on the image.
Scene people are only ぴっちゅ, タスク亀, カチャドクロ, and one ちゃちゃロット. No other people. No 辻さん. No 代さん.

Left heading: 論点（場外車券）. Right heading: 論点（納骨堂）.
Q&A answers are YES, NO, or a short legal phrase. Do not use GO or STOP.
Labels: ぴっちゅ「開設者（業務上の支障を避けたい）」タスク亀「人家の居住者（平穏な日常生活を守りたい）」カチャドクロ「誤った主張をする側（住む人はみな適格とする）」

Title:「距離の中にいるだけでは、適格は決まらない」
Chip:「原告適格」

Left 論点（場外車券） only. Do not mention 納骨堂 here.
1. 1000メートル以内に住む者は適格か？ → NO
2. 誰があり得るか？ → 文教施設・医療施設の開設者
3. 開設者は常にか？ → NO（著しい業務上の支障のおそれがある位置）
Small note under the Q&A:「1000メートルは、見取図に書く文教施設と医療施設の範囲（平21.10.15・位置基準）」

Right 論点（納骨堂） only. Do not mention 場外車券 here.
1. おおむね300メートル以内の人家居住者は適格か？ → YES
2. 何を守るか？ → 平穏な日常生活
3. 300メートルは法律本体の数字か？ → NO（大阪市の細則）
Small note under the Q&A:「墓埋法10条の納骨堂経営許可（令5.5.9）」

Center, small, between the panels: two circles that do not cover the Q&A.
Left circle labeled「1000メートル」with a small hospital and a small school inside, and a house outside the standing mark. Caption under the circle:「住むだけではなし」
Right circle labeled「おおむね300メートル」with small houses inside. Caption under the circle:「人家の居住者はあり」

Bottom:
- 判断軸:「その数字は、誰の、どの利益を個別に守るか。住んでいるだけか。施設を開設しているか」
- ひっかけ:「1000メートル以内の居住者はみな適格。医療関係者だけ。開設者は距離内なら常に。300メートルの人家居住者は適格なし」
- 暗記:「車券の1000メートルは見取図。開設者はあり得る。住むだけではなし。納骨堂の300メートルの人家はあり」
Answer:「場外車券の1000メートルは見取図の範囲で、適格は開設者に限られ得る。納骨堂のおおむね300メートル以内の人家居住者には適格がある。」

If a small comparison table is used under the circles, header navy, and data rows zebra white then light gray, horizontal not by column. Columns: 数字の意味 | 適格があり得る人 | 住むだけ. Two data rows only:
1000メートルは文教・医療施設の見取図 | 著しい業務上の支障のおそれがある位置の開設者 | なし
おおむね300メートルは人家等を原則避ける細則 | その人家に住む者 | あり
Do not add a third case.

Guide: ONE ちゃちゃロット only, SMALL bottom-right margin, wooden 指し棒 pointing at 暗記. Cream face, independent pale-sky-blue smiling hat with three rounded hills and a long brim (not ears, not a hood), closed smiling eyes, green lecturer jacket, white shirt, green trousers, shoes. No nameplate. Do not stand on the answer band.
ぴっちゅ SMALL under the left panel. タスク亀 SMALL under the right panel. カチャドクロ SMALL beside the ひっかけ card. Do not cover panels, circles, or the answer band. No owl, bear, cat, raccoon.
```

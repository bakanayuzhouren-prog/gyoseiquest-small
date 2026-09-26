# Codex用 — 後順位者は、先順位がどこまで取るかを見ている

16:9の比較図。中央に後順位抵当権者。左は普通抵当（期間で区切る）。右は根抵当（金額で区切る）。共通メタファーは、先順位の取り分を囲う柵。左右の対決パネルと中央の表は使わない。古い利息を消す図にしない。根抵当に最後の2年分を適用しない。極度額の減額でも必ず後順位者の承諾、と断定しない。

- 保存先: `assets/images/deepdive/learn/minnpou/koujun-teito-ne-teito.png`
- 画像キー: `learn/minnpou/koujun-teito-ne-teito`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。アプリ載せは生成後。

## 法律

普通抵当権は、後順位者との関係で、利息その他の定期金について、原則として満期となった最後の2年分だけ抵当権を行使できる（民法375条1項）。2年より前の利息債権が消滅するのではない。制限されるのは、抵当権による優先弁済の範囲である。損害金も最後の2年分で、利息その他の定期金と通算して2年分を超えることができない（375条2項）。

根抵当権は、確定した元本、利息その他の定期金、損害賠償の全部を、極度額の限度で担保する（398条の3）。最後の2年分という制限はない。元本・利息・損害金を合計した極度額が、先順位者の優先枠の上限になる。

極度額の変更は、利害関係を有する者の承諾がなければできない（398条の5）。増額は後順位抵当権者の取り分を減らすので、後順位抵当権者が典型である。減額では、後順位抵当権者ではなく、被担保債権の差押債権者などが利害関係人となり得る。すべての変更に後順位者の承諾が要る、とは書かない。

被担保債権の範囲の変更は、極度額が変わらない。後順位抵当権者その他の第三者の承諾は要しない（398条の4）。

元本確定後、根抵当権設定者が極度額の減額を請求するとき、現に存する債務の額に加える「以後2年間の利息等」は、398条の21である。375条の「満期となった最後の2年分」とは別制度である。

試験で「根抵当権の利息も、最後の2年分だけ担保される」と書いてあったら×。
試験で「極度額は、後順位抵当権者の承諾なく増額できる」と書いてあったら×。
試験で「被担保債権の範囲を変更するにも、後順位抵当権者の承諾が必要」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 後順位 | いい役 | 後順位抵当権者（残る担保価値を知りたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 中央。本文を隠さない |
| 先順位 | いい役 | 先順位担保権者（登記された優先枠から弁済を受けたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 左右の上部に小さく。本文を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（極度額は自由に変えられる、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | ひっかけ欄だけ |
| 案内 | いい役 | 案内（暗記帯を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。濃緑スーツ |

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic, 16:9 landscape, from scratch. Warm off-white background. Thick navy outlines, large gothic type, clear gaps. A comparison with a fence metaphor, not a text-only table. No brand name, account name, or app name.
Title: 後順位者は、先順位がどこまで取るかを見ている
Subtitle: 普通抵当＝利息は原則2年／根抵当＝全部入れて極度額まで
Center: ぴっちゅ, label 後順位抵当権者（残る担保価値を知りたい）. Speech: 先順位はいくらまで取るの？ 残りを見て、融資するか決めたい。
Small タスク亀 at the top of each side, label 先順位担保権者（登記された優先枠から弁済を受けたい）.
Shared metaphor: a fence around what the senior creditor can take first.

Left panel, blue. Heading: 普通抵当権＝期間で膨張を止める
Draw principal as one box, and interest stacking year by year. Do not erase the old interest slips. Place the old interest outside the priority fence.
Text: 利息が無制限に優先すると、後順位者は残額を予測できない。そこで、利息その他の定期金は、原則として満期となった最後の2年分だけ優先（375条）。
Red short line: 古い利息が消えるのではない
Note: 制限されるのは、抵当権による優先弁済の範囲。損害金も最後の2年分で、利息と通算して2年分を超えない（375条2項）。
Catchphrase: 普通抵当権は、時間で区切る

Right panel, green. Heading: 根抵当権＝金額で膨張を止める
A large safe or frame. Front label: 極度額1000万円
Inside: 元本 / 利息 / 損害金
A red stop line on any amount that spills outside the safe. Do not let principal, interest, or damages take priority beyond the maximum amount. Do not write that the last two years also apply to a revolving mortgage.
Text: 元本・利息・損害金の全部を、極度額まで担保する（398条の3）。最後の2年分という制限はない。極度額が、先順位者の優先枠の上限。
Catchphrase: 根抵当権は、金額で区切る

Lower center example. Property value 3000万円.
Before: 先順位根抵当権　極度額1000万円 / 後順位者が期待できる残り　最大2000万円
After: 極度額を2500万円へ増額 / 後順位者に残るのは最大500万円
Draw the wide 2000万円 space shrinking to 500万円. Only this shrinking part is red. ぴっちゅ looks surprised but does not cover the numbers.
Conclusion: 極度額の増額は、後順位者が信頼した担保余力を奪う。だから、後順位抵当権者の承諾が必要（398条の5）。

Trap strip, amber, カチャドクロ only here, label 誤った主張（極度額は自由に変えられる、とする）:
試験で「根抵当権の利息も、最後の2年分だけ担保される」と書いてあったら×。
試験で「極度額は、後順位抵当権者の承諾なく増額できる」と書いてあったら×。
試験で「被担保債権の範囲を変更するにも、後順位抵当権者の承諾が必要」と書いてあったら×。

Small accuracy note: 398条の5は、極度額の変更について利害関係を有する者の承諾を要求する。増額では後順位抵当権者が典型。減額では被担保債権の差押債権者などが問題となる。
Separate-rule note: 元本確定後の減額請求で加算する「以後2年間の利息等」（398条の21）は、375条の「最後の2年分」とは別。

Bottom memory band, pointed by ちゃちゃロット. One mascot only, bottom-right margin. Dark green lecturer suit, white shirt, green trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. Not a cap. The face has round black pupils, each with a large white circular highlight of the same size. The pointer must not cover the memory text.
Memory text: 普通抵当は、利息を2年で制限。根抵当は、全部入れて極度額で制限。極度額を増やすなら後順位者の承諾。
Do not cover the text with characters, the pointer, or amount labels.
```

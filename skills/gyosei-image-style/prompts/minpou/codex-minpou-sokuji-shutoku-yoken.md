# Codex用 — 即時取得は、無権利者からの取引で、動産の占有を始めたとき

上は成立する要件。下は成立しない場合の表。無過失は188条で推定される。過失は、争う側が立証する。占有改定は、即時取得では占有を始めたに当たらない。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/minnpou/sokuji-shutoku-yoken.png`
- 画像キー: `learn/minnpou/sokuji-shutoku-yoken`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。既存の `syutokujikou-sokujisyutoku.png` は上書きしない。アプリ載せは生成後。

## 法律

民法192条。取引行為によって、平穏に、かつ、公然と動産の占有を始めた者は、善意であり、かつ、過失がないときは、即時にその動産について行使する権利を取得する。

前主は、その動産を処分する権限を持たない者である。権限がある者からの取得は、通常の取得であり、即時取得ではない。

占有の開始に当たるのは、現実の引渡し、簡易の引渡し、指図による占有移転である。占有改定は、外観が変わらないので、192条の「占有を始めた」に当たらない（最判昭35.2.11。最判昭32.6.27も即時取得）。333条の引渡しには占有改定が含まれる（大判大6.7.26）。即時取得と先取特権を混ぜない。

民法186条1項。占有者は、所有の意思をもって、善意で、平穏に、かつ、公然と占有をするものと推定する。

民法188条。占有者が占有物について行使する権利は、適法に有するものと推定する。即時取得では、これにより無過失が推定される。取得者の過失は、争う側が立証する（最判昭41.6.9）。

相続は取引行為ではない。包括承継なので、即時取得は成立しない。

無権代理人が、本人の代理人として本人の動産を売った場合、その契約は本人に効力が帰属しない。有効な取引を前提とする即時取得は成立しない。代理権があると信じた相手方の保護は、表見代理（109条から112条）である。無権利者が、自分の物であると偽って売った場合は、売買自体は有効なので、192条の他の要件を満たせば即時取得しうる。

不動産は動産ではない。即時取得は成立しない。

盗品又は遺失物は、即時取得が初めから成立しないのではない。被害者又は遺失者は、盗難又は遺失の時から2年間、回復を請求できる（193条）。競売、公の市場、又はその物と同種の物を販売する商人から善意で買い受けたときは、代価を弁償しなければ回復できない（194条）。

試験で「過失がないことは、取得する者が証明する」と書いてあったら×。
試験で「占有改定でも、即時取得できる」と書いてあったら×。
試験で「代理人だと偽って売っても、即時取得できる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（過失がないことは取得する者が証明する、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（無過失は188条で推定される、を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅとタスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One upper checklist and one lower table. No left-right debate panels. No three cards at the bottom.
Title: 即時取得は、無権利者からの取引で、動産の占有を始めたとき
Subtitle: 無過失は188条で推定される。争う側が過失を立証する
Upper box, blue border, heading 成立する要件（192条）:
動産である
取引行為である
前主に、処分する権限がない
平穏に、かつ、公然と占有を始めた
善意であり、かつ、過失がない
Small line under the list: 占有の開始は、現実の引渡し、簡易の引渡し、指図による占有移転。占有改定は入らない。
Small line: 所有の意思、善意、平穏、公然は186条1項で推定される。無過失は188条で推定される。取得者の過失は、争う側が立証する。
Lower heading: 成立しない、または制限される
Header, navy: 場合 / 結論 / 理由
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Row: 占有改定 / 成立しない / 占有を始めたに当たらない。外観が変わらない（最判昭35.2.11）
Row: 相続 / 成立しない / 取引行為ではない。包括承継である
Row: 無権代理（本人の代理人として売却） / 成立しない / 本人に効力が帰属する取引がない。保護は表見代理
Row: 無権利者が、自分の物だと偽って売却 / 成立しうる / 売買自体は有効。他の要件を満たせば192条
Row: 不動産 / 成立しない / 動産ではない
Row: 盗品・遺失物 / 成立したあと、2年間は回復できる / 初めから不成立ではない（193条）。競売、公の市場、同種の商人から善意で買ったときは、代価を弁償しなければ回復できない（194条）
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（過失がないことは取得する者が証明する、とする）:
試験で「過失がないことは、取得する者が証明する」と書いてあったら×。
試験で「占有改定でも、即時取得できる」と書いてあったら×。
試験で「代理人だと偽って売っても、即時取得できる」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 先取特権の333条では、占有改定も引渡しに含まれる。即時取得では含まれない。
Do not print any brand name, account name, or app name. Do not cover the checklist or the table with characters or the pointer.
```

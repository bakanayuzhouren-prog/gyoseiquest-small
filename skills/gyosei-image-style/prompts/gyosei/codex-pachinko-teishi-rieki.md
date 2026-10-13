# 営業停止が終わっても、まだ争える？

- 保存先: `assets/images/deepdive/learn/gyosei/pachinko-teishi-rieki.png`
- 画像キー: `learn/gyosei/pachinko-teishi-rieki`
- 関連: 最判平27.3.3。ぱちんこ店の営業停止。公にされた処分基準で後行の量定が加重される間は、先行処分の取消しの利益が残る。基準と異なる後行は、特段の事情がなければ裁量権の逸脱または濫用。当然に無効ではない。

生成はてらしぃが Codex に「画像生成して」と言うまでしない。Cursor は描かない。

## 法律の芯（崩すな）

確認日 2026-10-12。裁判所掲載の平成26年（行ヒ）第225号、平成27年3月3日第三小法廷判決。

- ぱちんこ店が、風俗営業法26条1項の営業停止を受けた。期間は40日。期間は終わった。
- 公安委員会は、行政手続法12条1項の処分基準を定め、公にしている。過去3年以内の営業停止を理由に、次の営業停止の期間を加重する定めがある。
- 原審は、期間が終わったので取消しによって回復すべき法律上の利益はない、として訴えを却下した。
- 最高裁は、加重を受けるべき3年の期間内は、先行の営業停止の取消しの利益が残る、とした。
- 同じ判決は、公にされた処分基準と異なる後行の取扱いは、特段の事情がない限り、裁量権の範囲の逸脱または濫用に当たる、ともいう。当然に無効、ではない。
- 書かない: 当然に無効が結論。非公表の基準でも利益が残る。40日を3年と取り違える。問題文の全文。ブランド名。

## 見せ方

4コマを左から右。各コマは場面が一つ。キャラは小さく、文字を隠さない。底部カードと案内役は置かない。同じ文をタイトルと4コマで繰り返さない。

## 配役

| 陣営 | キャラ | 役割 | 配置 | 参照 |
|---|---|---|---|---|
| いい役 | ぴっちゅ | 営業者（先行の停止を取り消したい） | 1・2・4コマ | `assets/images/characters/pitchi.png` |
| 悪い役 | カチャドクロ | 公安委員会（期間が終わったので争えないと言いたい） | 2コマ | `assets/images/characters/kachadokuro.png` |

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 営業停止が終わっても、まだ争える？ |
| 1 | 40日の営業停止。期間は終わった |
| 2 | 公安委員会は争えないと言う。店は次が重くなると言う |
| 3 | 公にされた処分基準。過去3年の停止で、次の期間が重くなる（12条1項） |
| 4 | 3年の間は、取消しの利益が残る。基準と違う後行は、特段の事情がなければ逸脱・濫用 |
| 下1行 | 試験で「当然に無効」と書いてあったら× |
| キャラ | ぴっちゅ、カチャドクロ。ちゃちゃロットは置かない |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
Topic: a four-panel story of the Supreme Court judgment of March 3, 2015, about a pachinko parlor business suspension.
Learning goal: after a 40-day suspension ends, the interest to cancel that suspension remains during the 3 years in which a published disposition standard makes the next suspension longer. A later decision that departs from that standard is an abuse of discretion unless special circumstances exist. It is not automatically void.

Simple layout. Warm off-white background. Large gothic Japanese. 16:9. Wide margins.
Four panels in one row, left to right, with space between them. White panels, navy borders. Each panel has a short heading and two short lines. Characters are small at the bottom of a panel and do not cover the letters.
No left panel, no right panel, no bottom three cards, no extra mascot, no brand name, no watermark.

Title, one line: 営業停止が終わっても、まだ争える？

Panel 1 heading: 1. 停止が終わった
ぴっちゅ, small, from assets/images/characters/pitchi.png.
Role under the character: 営業者（先行の停止を取り消したい）
Text: 40日の営業停止
期間は終わった

Panel 2 heading: 2. 言い分
Left, small ぴっちゅ. Right, small カチャドクロ from assets/images/characters/kachadokuro.png.
Role under カチャドクロ: 公安委員会（期間が終わったので争えないと言いたい）
Text: 委員会「争う意味はない」
店「次の停止が重くなる」

Panel 3 heading: 3. 争点
No new character.
Text: 公にされた処分基準
過去3年の停止で、次が重くなる
行政手続法12条1項

Panel 4 heading: 4. 最高裁
Small ぴっちゅ only.
Text: 3年の間は、取消しの利益が残る
基準と違う後行は、特段の事情がなければ逸脱・濫用

One line under the four panels, not a fifth panel:
試験で「当然に無効」と書いてあったら×

Do not write that the later decision is automatically void.
Do not write that an unpublished standard keeps the interest to sue.
Do not swap 40 days and 3 years.
Do not print a brand name.
```

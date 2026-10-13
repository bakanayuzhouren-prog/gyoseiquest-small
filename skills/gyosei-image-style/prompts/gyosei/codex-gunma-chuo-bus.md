# バス免許の却下は、手続の不備で消える？

- 保存先: `assets/images/deepdive/learn/gyosei/gunma-chuo-bus.png`
- 画像キー: `learn/gyosei/gunma-chuo-bus`
- 関連: 最判昭50.5.29。一般乗合旅客自動車運送事業の免許却下。聴聞は補充。公聴会の重大な瑕疵なら取消し。本件は重大とまではいえず、却下は維持。個人タクシー、違法性の承継、違法行為の転換とは別。

生成はてらしぃが Codex に「画像生成して」と言うまでしない。Cursor は描かない。

## 法律の芯（崩すな）

確認日 2026-10-13。裁判所掲載の昭和50年5月29日第一小法廷判決。

- バス会社が、路線の免許を申請した。運輸大臣は却下した。
- 陸運局長の聴聞は補充である。運輸審議会の公聴会が開かれたときは、聴聞の不備だけでは却下を取り消す事由にならない。
- 諮問を経ない処分はもちろん、経た場合でも、答申の過程に諮問を要求した趣旨に反する重大な瑕疵があれば、その処分も違法として取り消される。
- 本件の公聴会は、問題点を具体的に示して資料や反駁の機会を十分に与えたとはいえない。しかし、与えても認定を左右する資料を出せた可能性は認め難い。重大な違法とまではいえず、却下は取り消せない。
- 書かない: 聴聞の不備で却下は常に違法。公聴会の不備は常に取消し。個人タクシーの審査基準。違法性の承継。違法行為の転換。問題文の全文。ブランド名。

## 見せ方

4コマを左から右。各コマは場面が一つ。キャラは小さく、文字を隠さない。底部の判断軸・ひっかけ・暗記は置かない。案内役は置かない。同じ文をタイトルと4コマで繰り返さない。

## 配役

| 陣営 | キャラ | 役割 | 配置 | 参照 |
|---|---|---|---|---|
| いい役 | ぴっちゅ | バス会社（路線の免許がほしい） | 1・2・4コマ | `assets/images/characters/pitchi.png` |
| 悪い役 | カチャドクロ | 運輸大臣（免許を却下したい） | 2コマ | `assets/images/characters/kachadokuro.png` |

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | バス免許の却下は、手続の不備で消える？ |
| 1 | 路線の免許を申請。運輸大臣が却下 |
| 2 | 聴聞に不備。公聴会は開かれた。聴聞は補充 |
| 3 | 公聴会の重大な瑕疵なら、却下も取り消せる |
| 4 | 本件は結論を左右する資料は出せなかった。重大とまではいえず、却下は維持 |
| 下1行 | 聴聞に不備があれば却下は常に違法、と書いてあったら× |
| キャラ | ぴっちゅ、カチャドクロ。ちゃちゃロットは置かない |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
Topic: a four-panel story of the Supreme Court judgment of May 29, 1975, about a bus route license.
Learning goal: 陸運局長の聴聞は補充。運輸審議会の公聴会が開かれたときは、聴聞の不備だけでは却下を取り消せない。公聴会の過程に諮問を要求した趣旨に反する重大な瑕疵があれば、却下も違法として取り消せる。本件は、機会を増やしても認定を左右する資料を出せた可能性は認め難く、重大な違法とまではいえず、却下は維持。

Simple layout. Warm off-white background. Large gothic Japanese. 16:9. Wide margins.
Four panels in one row, left to right, with space between them. White panels, navy borders. Each panel has a short heading and two short lines. Characters are small at the bottom of a panel and do not cover the letters.
No left panel, no right panel, no bottom three cards, no extra mascot, no brand name, no watermark.

Title, one line: バス免許の却下は、手続の不備で消える？

Panel 1 heading: 1. 申請と却下
Small ぴっちゅ from assets/images/characters/pitchi.png.
Role under the character: バス会社（路線の免許がほしい）
Text: 路線の免許を申請した
運輸大臣は、却下した

Panel 2 heading: 2. 二つの手続
Left, small ぴっちゅ. Right, small カチャドクロ from assets/images/characters/kachadokuro.png.
Role under カチャドクロ: 運輸大臣（免許を却下したい）
Text: 聴聞に不備。公聴会は開かれた
聴聞は補充。不備だけでは取り消せない

Panel 3 heading: 3. 争点
No new character.
Text: 公聴会に重大な瑕疵があれば
却下も、違法として取り消せる

Panel 4 heading: 4. 最高裁
Small ぴっちゅ only.
Text: 本件は、結論を左右する資料は出せなかった
重大とまではいえず、却下は維持

One line under the four panels, not a fifth panel:
聴聞に不備があれば却下は常に違法、と書いてあったら×

Do not write that a hearing defect always makes the rejection illegal.
Do not write that every public-hearing defect cancels the rejection.
Do not write about personal taxi licenses, succession of illegality, or conversion of administrative acts.
Do not print a brand name.
```

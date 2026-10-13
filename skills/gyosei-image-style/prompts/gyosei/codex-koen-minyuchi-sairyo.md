# 公園は、民有地にかけてよいか？

- 保存先: `assets/images/deepdive/learn/gyosei/koen-minyuchi-sairyo.png`
- 画像キー: `learn/gyosei/koen-minyuchi-sairyo`
- 関連: 最二小判平18.9.4。都市計画で、国有地ではなく隣の民有地を公園区域にした建設大臣の裁量。原審は樹木への影響を審理せず、逸脱・濫用ではないとした。最高裁は破棄して差し戻した。

生成はてらしぃが Codex に「画像生成して」と言うまでしない。Cursor は描かない。

## 法律の芯（崩すな）

確認日 2026-10-13。最二小判平成18年9月4日（判例時報1948号26頁）。

- 都市施設の区域は、適切な規模で必要な位置に配置される合理性をもって定める。
- 民有地に代えて公有地を利用できるときは、それも合理性を判断する一つの考慮要素である。必ず公有地を使え、ではない。
- 本件は、公園の区域に、隣の国有地（林業試験場）ではなく民有地を入れた。理由は、南門の位置を変えると試験場の樹木に悪影響がある、という建設大臣の判断。
- 民有地を選んだ判断が合理性を欠くときは、特段の事情がない限り、社会通念に照らし著しく妥当を欠き、都市計画決定は裁量権の範囲を超え、または濫用したものとして違法となる。
- 原審は、南門を変えると樹木に悪影響があるか、植え替えで避けられるかを審理せず、逸脱・濫用ではない、とした。最高裁は、その判断には法令違反があるとして、原審を破棄し差し戻した。この判決は、都市計画決定を違法と断じていない。
- 書かない: 公有地があるから必ず国有地。この判決が公園の決定を違法と確定した。問題文の全文。ブランド名。

## 見せ方

4コマを左から右。各コマは場面が一つ。キャラは小さく、文字を隠さない。底部の判断軸・ひっかけ・暗記は置かない。案内役は置かない。同じ文をタイトルと4コマで繰り返さない。

## 配役

| 陣営 | キャラ | 役割 | 配置 | 参照 |
|---|---|---|---|---|
| いい役 | ぴっちゅ | 土地所有者（自分の土地を公園区域から外したい） | 1・2・4コマ | `assets/images/characters/pitchi.png` |
| 悪い役 | カチャドクロ | 建設大臣（民有地を公園区域に定めたい） | 2コマ | `assets/images/characters/kachadokuro.png` |

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 公園は、民有地にかけてよいか？ |
| 1 | 公園区域は民有地。隣は国有地の試験場 |
| 2 | 大臣は南門を動かすと木が傷むと言う。原審は木を審理せず逸脱・濫用ではないとした |
| 3 | 公有地を使えることは、合理性の一つの考慮要素 |
| 4 | 合理性を欠くなら、特段の事情がない限り逸脱・濫用。木を審理しない原審は法令違反。破棄差戻し |
| 下1行 | この判決が公園の決定を違法と断じた、と書いてあったら× |
| キャラ | ぴっちゅ、カチャドクロ。ちゃちゃロットは置かない |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
Topic: a four-panel story of the Supreme Court judgment of September 4, 2006, about a park in an urban plan.
Learning goal: 公有地を使えることは、公園区域の合理性を見る一つの考慮要素。民有地を選んだ判断が合理性を欠くなら、特段の事情がない限り裁量権の逸脱または濫用。樹木への影響を審理せずに逸脱・濫用ではないとした原審は法令違反で、破棄差戻し。この判決は公園の決定を違法と断じていない。

Simple layout. Warm off-white background. Large gothic Japanese. 16:9. Wide margins.
Four panels in one row, left to right, with space between them. White panels, navy borders. Each panel has a short heading and two short lines. Characters are small at the bottom of a panel and do not cover the letters.
No left panel, no right panel, no bottom three cards, no extra mascot, no brand name, no watermark.

Title, one line: 公園は、民有地にかけてよいか？

Panel 1 heading: 1. 公園の区域
Small ぴっちゅ from assets/images/characters/pitchi.png.
Role under the character: 土地所有者（自分の土地を公園区域から外したい）
Text: 公園区域は、民有地
隣は、国有地の試験場

Panel 2 heading: 2. 言い分
Left, small ぴっちゅ. Right, small カチャドクロ from assets/images/characters/kachadokuro.png.
Role under カチャドクロ: 建設大臣（民有地を公園区域に定めたい）
Text: 大臣「南門を動かすと、木が傷む」
原審「木は審理しない。逸脱・濫用ではない」

Panel 3 heading: 3. 争点
No new character.
Text: 公有地を使えることは
合理性の一つの考慮要素
必ず国有地、ではない

Panel 4 heading: 4. 最高裁
Small ぴっちゅ only.
Text: 合理性を欠くなら、特段の事情がない限り逸脱・濫用
木を審理しない原審は法令違反。破棄して差し戻す

One line under the four panels, not a fifth panel:
この判決が公園の決定を違法と断じた、と書いてあったら×

Do not write that public land must always be used.
Do not write that this judgment held the park plan illegal.
Do not print a brand name.
```

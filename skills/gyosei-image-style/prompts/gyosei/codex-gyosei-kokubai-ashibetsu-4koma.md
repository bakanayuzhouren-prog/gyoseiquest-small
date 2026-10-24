# Codex用 — 芦別事件。無罪なら、起訴は違法？

4コマを横一列。左右パネルと中央表は使わない。同じ文をタイトルとコマで繰り返さない。爆発物、火、線路の壊し方は描かない。無罪なら逮捕も起訴も必ず適法、とは書かない。被害者が起訴してくれと国賠する話（平2.2.20）は混ぜない。

- 状態: 未生成
- 保存先: `assets/images/deepdive/learn/gyosei/kokubai-ashibetsu-4koma.png`
- 画像キー: `learn/gyosei/kokubai-ashibetsu-4koma`
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。
- 上書きしない: `assets/images/deepdive/learn/gyosei/kokubai-higai-koso-4koma.png`。あちらは被害者と告訴人。この枚は無罪になった被告人。
- 関連: TAC第1回・問20のウと対になる被告人側。正本は `data/knowledge/canonical/kokubai-koso-higai-hikoku.md`。

## 法律（最判昭53.10.20・第二小法廷・昭和49年（オ）第419号・民集32巻7号1367頁）

通称は芦別事件。裁判所の事件名は国家賠償。

無罪の刑事判決が確定しただけで、その事件の逮捕、勾留、公訴の提起と追行が直ちに違法になるわけではない。逮捕と勾留は、その時点で犯罪の嫌疑に相当な理由があり、必要性があれば適法である。公訴の提起と追行は、その時点の証拠資料を総合し、合理的な判断過程により有罪と認められる嫌疑があれば足りる。起訴時の検察官の心証は、判決時の裁判官の心証と同じであることを要しない。

同じ判決は、公権力の行使に当たる公務員が職務上故意または過失で違法に損害を与えたときは、国が賠償し、公務員個人は賠償責任を負わない、とも判示した。この個人責任の一文は、4コマの下に1行だけ置く。4コマの結論を、この一文で置き換えない。

書かない。線路の壊し方、爆発物、火。無罪だから国賠は必ず認められる、と書くこと。嫌疑がなくても起訴は適法、と書くこと。ブランド名。案内役を本文の上に置くこと。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 起訴された人 | 悪い役 | 起訴された人（無罪だから、逮捕も起訴も違法だと賠償を取りたい） | カチャドクロ | `assets/images/characters/kachadokuro.png` ＋ `kachadokuro_sheet.png` | 2コマだけ。吹き出しは絵の側。説明文には重ねない |
| 裁判所 | いい役 | 裁判所（無罪の時点と、起訴の時点を分けたい） | タスク亀 | `assets/images/characters/task_turtle.png` ＋ `task_turtle_sheet.png` | 3コマだけ。問いと答えを隠さない |
| 案内 | いい役 | 案内（結論を指す。本文を隠さない） | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png` | 4コマの下の余白。1体。緑の講師スーツ |

ぴっちゅは置かない。過去の辻さんと代さんは置かない。名簿外は置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは assets/images/characters/kachadokuro_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。ちゃちゃロットは assets/approved-chachalot-pointer.png と assets/approved-smiling-hat-mascot.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Exactly four comic panels in one horizontal row, then one short footer line. No second row of panels. No comparison table. No explosives, no fire, no blast, no weapon. No brand name, account name, or watermark.

Each panel has two zones with a clear empty gap. Upper zone: picture and one speech bubble. Lower zone: the caption, on its own band. Characters and speech bubbles stay in the upper zone. No words on the props. No second copy of the same sentence.

Title: 芦別事件。無罪なら、起訴は違法？
Subtitle, one line: 最判昭53.10.20

Panel 1 title: まず何が起きた
A person stands in a quiet courtroom after a criminal case has ended. No damage scene, no weapon. No character from the cast list.
Caption, lower band only: 起訴された人が、後に無罪になった。

Panel 2 title: 当事者の言い分
カチャドクロ stands in the upper zone. Speech bubble stays in the upper zone. Label under カチャドクロ, upper zone: 起訴された人（無罪だから、逮捕も起訴も違法だと賠償を取りたい）
Speech bubble: 無罪なんだから、逮捕も起訴も違法だ。
Caption, lower band only: 国に賠償を求めた。

Panel 3 title: 裁判所が見た争点
タスク亀 stands in the upper zone and does not cover the question or the answer. Label under タスク亀: 裁判所（無罪の時点と、起訴の時点を分けたい）
Speech bubble: 無罪なら、起訴の時点でも嫌疑はなかったことになる？
Caption, lower band only: ならない。

Panel 4 title: 判決
No scene character inside this panel. Caption: 無罪だけでは、逮捕・勾留・起訴は直ちに違法にならない。
Next line: 起訴は、その時点の証拠で有罪の嫌疑があれば足りる（国賠1条）。

Footer, one line under the four panels: 公務員個人は賠償しない。国が賠償する。

ちゃちゃロット is one mascot only, in the bottom margin beside the footer, green lecturer suit, white shirt, trousers, and shoes. Wooden pointer toward 直ちに違法にならない. Do not cover that sentence or the footer. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. No nameplate.

Do not print any brand name, account name, or app name. Do not cover captions with characters or the pointer.
```

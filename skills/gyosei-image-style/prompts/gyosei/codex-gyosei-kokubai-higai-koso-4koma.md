# Codex用 — 被害者と公訴。起訴してくれは、国賠になる？

4コマを横一列。左右パネルと中央表は使わない。同じ文をタイトルとコマで繰り返さない。被害者が犯人へ損害賠償できない、とは書かない。捜査の不適正や不起訴以外の国賠まで否定しない。

- 状態: 未生成
- 保存先: `assets/images/deepdive/learn/gyosei/kokubai-higai-koso-4koma.png`
- 画像キー: `learn/gyosei/kokubai-higai-koso-4koma`
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。
- 上書きしない: `assets/images/deepdive/learn/gyosei/kokubai-ashibetsu-4koma.png`。あちらは無罪になった被告人。この枚は被害者と告訴人。
- 関連: TAC第1回・問20・肢ウ。正本は `data/knowledge/canonical/kokubai-koso-higai-hikoku.md`。

## 法律（最判平2.2.20・第三小法廷・平成元年（オ）第825号）

裁判所の事件名は損害賠償。通称は作らない。

犯罪の被害者または告訴人は、捜査が適正を欠くこと、または不起訴が違法であることを理由に、国家賠償法の損害賠償を請求できない。

捜査と公訴は、国家および社会の秩序維持という公益のために行う。被害者の損害回復が目的ではない。告訴は、捜査の端緒を与え、検察官の職権発動を促すものにすぎない。被害者または告訴人が捜査や公訴で受ける利益は、反射的な事実上の利益であり、法律上保護された利益ではない。

書かない。被害者はどんな損害も国に請求できない、と書くこと。被告人の無罪の話（昭53.10.20）をこの4コマに混ぜること。ブランド名。案内役を本文の上に置くこと。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 被害者 | 悪い役 | 被害者（起訴しないことを理由に、賠償を取りたい） | カチャドクロ | `assets/images/characters/kachadokuro.png` ＋ `kachadokuro_sheet.png` | 2コマだけ。吹き出しは絵の側。説明文には重ねない |
| 裁判所 | いい役 | 裁判所（守る利益かどうかを聞きたい） | タスク亀 | `assets/images/characters/task_turtle.png` ＋ `task_turtle_sheet.png` | 3コマだけ。問いと答えを隠さない |
| 案内 | いい役 | 案内（結論を指す。本文を隠さない） | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png` | 4コマの下の余白。1体。緑の講師スーツ |

ぴっちゅは置かない。過去の辻さんと代さんは置かない。名簿外は置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは assets/images/characters/kachadokuro_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。ちゃちゃロットは assets/approved-chachalot-pointer.png と assets/approved-smiling-hat-mascot.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Exactly four comic panels in one horizontal row. No second row. No comparison table. No brand name, account name, or watermark.

Each panel has two zones with a clear empty gap. Upper zone: picture and one speech bubble. Lower zone: the caption, on its own band. Characters and speech bubbles stay in the upper zone. No words on the props. No second copy of the same sentence.

Title: 損害賠償事件。起訴してくれは、国賠になる？
Subtitle, one line: 最判平2.2.20

Panel 1 title: まず何が起きた
A small complaint paper is handed to a prosecutor's desk. No suspect, no weapon, no blood, no body. No character.
Caption, lower band only: 死亡した被害者の子が、親族を保護責任者遺棄の疑いで告訴した。嫌疑不十分で不起訴になった。

Panel 2 title: 当事者の言い分
カチャドクロ stands in the upper zone. Speech bubble stays in the upper zone. Label under カチャドクロ, upper zone: 被害者（起訴しないことを理由に、賠償を取りたい）
Speech bubble: 起訴しないのは違法だ。国に賠償させろ。
Caption, lower band only: 捜査が悪い、不起訴が違法だ、と国を訴えた。

Panel 3 title: 裁判所が見た争点
タスク亀 stands in the upper zone and does not cover the question or the answer. Label under タスク亀: 裁判所（守る利益かどうかを聞きたい）
Speech bubble: 被害者が捜査や公訴で受ける利益は、法律が守る利益？
Caption, lower band only: 守る利益ではない。

Panel 4 title: 判決
No scene character inside this panel. Caption: 反射的な事実上の利益にすぎない。
Next line: 捜査の不適正や不起訴を理由に、国賠はできない（国賠1条）。

ちゃちゃロット is one mascot only, in the bottom margin under panel 4, outside the panel, green lecturer suit, white shirt, trousers, and shoes. Wooden pointer toward 国賠はできない. Do not cover that sentence. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. No nameplate.

Do not print any brand name, account name, or app name. Do not cover captions with characters or the pointer.
```

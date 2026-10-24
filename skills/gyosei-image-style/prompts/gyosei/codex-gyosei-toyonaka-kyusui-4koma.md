# 豊中市給水拒否事件。申込書を返したら、賠償か？

4コマを横一列。違法建築だから給水を最終的に拒める、とは書かない。

- 保存先: `assets/images/deepdive/learn/gyosei/toyonaka-kyusui-4koma.png`
- 画像キー: `learn/gyosei/toyonaka-kyusui-4koma`
- 関連: LEC公開1・問25・ア。最判昭56.7.16。昭和53年（オ）第1386号。通称は豊中市給水拒否事件。
- 上書きしない: `shobunsei-jorei-suidou.png`。あちらは条例の制定の処分性。
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。

## 法律

増築が建築確認を受けていない建物について、市の水道局給水課長が、給水装置新設工事の申込みの受理を事実上拒絶し、申込書を返した。最終的な拒否の意思表示ではない。違反を是正して建築確認を受け、改めて申し込むよう求める一応の勧告である。申込者は1年半余、前の申込みを放置した。その後の申込みは受理された。この事実では、市は、受理の拒否を理由とする不法行為上の損害賠償責任を負わない。上告棄却。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 申込者 | 悪い役 | 申込者（返したことを、最終拒否だと言いたい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 2コマだけ |
| 裁判所 | いい役 | 裁判所（最終拒否かを聞きたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 3コマだけ |
| 案内 | いい役 | 案内（結論を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 4コマの下の余白。1体 |

## GPT Image プロンプト

```text
参照必須: カチャドクロは assets/images/characters/kachadokuro_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。ちゃちゃロットは assets/approved-chachalot-pointer.png と assets/approved-smiling-hat-mascot.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Exactly four comic panels in one horizontal row. No second row. No comparison table.

Each panel has two zones with a clear empty gap. Upper zone: picture and one speech bubble. Lower zone: the caption, on its own band. No words on the props except the paper label 申込書. No second copy of the same sentence.

Title: 豊中市給水拒否事件。申込書を返したら、賠償か？
Subtitle, one line: 最判昭56.7.16

Panel 1 title: まず何が起きた
A clerk returns a paper labeled 申込書 across a counter. A small house is in the far background. No character besides the hands if needed. No character face.
Caption, lower band only: 建築確認のない増築について、給水の新設申込みを受けず、申込書を返した。

Panel 2 title: 当事者の言い分
カチャドクロ stands in the upper zone. Label: 申込者（返したことを、最終拒否だと言いたい）
Speech bubble: 受理を拒否した。市に賠償させろ。
Caption, lower band only: 1年半余、前の申込みを放置したあと、損害賠償を求めた。

Panel 3 title: 裁判所が見た争点
タスク亀 stands in the upper zone. Label: 裁判所（最終拒否かを聞きたい）
Speech bubble: 申込書を返したのは、受理の最終拒否か。
Caption, lower band only: 最終拒否か、改めて申し込めという勧告か。

Panel 4 title: 判決
No scene character inside this panel.
Caption: 最終拒否ではない。違反を直し、建築確認を受けて、改めて申し込めという勧告。
Next line: この事実では、受理拒否を理由とする損害賠償責任は負わない。

ちゃちゃロット is one mascot only, in the bottom margin under panel 4, outside the panel, green lecturer suit, white shirt, trousers, and shoes. Wooden pointer toward 損害賠償責任は負わない. Do not cover that sentence. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. No nameplate. No speech balloon.

Do not print any brand name, account name, or app name.
```

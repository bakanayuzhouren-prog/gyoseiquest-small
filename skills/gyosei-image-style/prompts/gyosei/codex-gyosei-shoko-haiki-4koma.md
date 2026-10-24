# 損害賠償請求事件。所有権を放棄した証拠の廃棄は、国賠になる？

4コマを横一列。犯罪の場面、刃物、血液、衣類の中身は描かない。焼却の手順も描かない。反対意見を結論にしない。

- 保存先: `assets/images/deepdive/learn/gyosei/shoko-haiki-4koma.png`
- 画像キー: `learn/gyosei/shoko-haiki-4koma`
- 関連: 最一小判平17.4.21。平成16年（受）第2030号。事件名は損害賠償請求事件。平2.2.20の捜査の判断を引く。
- 上書きしない: `kokubai-higai-koso-4koma.png`
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。

## 法律

被害者が、自分の証拠物を司法警察職員に任意提出し、所有権を放棄した。鑑定が終わったことを理由に、発生から約6か月後、捜査の継続中に廃棄された。精神的苦痛として県に国家賠償を求めた。上告は棄却。

廃棄は、適正な措置であったとはいい難い。それでも、所有権を放棄した被害者は、廃棄が単に適正を欠くというだけでは、国家賠償を請求できない。被害者が捜査で受ける利益は、反射的にもたらされる事実上の利益であり、法律上保護される利益ではない。泉徳治裁判官の反対意見がある。結論は多数意見。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 被害者 | いい役 | 被害者（廃棄を理由に、賠償を取りたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 裁判所 | いい役 | 裁判所（法律が守る利益かを聞きたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 3コマだけ |
| 案内 | いい役 | 案内（結論を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 4コマの下の余白。1体 |

## GPT Image プロンプト

```text
参照必須: ぴっちゅは assets/images/characters/pitchi_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。ちゃちゃロットは assets/approved-chachalot-pointer.png と assets/approved-smiling-hat-mascot.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Exactly four comic panels in one horizontal row. No second row. No comparison table.

Each panel has two zones with a clear empty gap. Upper zone: picture and one speech bubble. Lower zone: the caption, on its own band. No words on the props. No second copy of the same sentence. Do not draw a crime, a weapon, blood, clothing contents, or a fire.

Title: 損害賠償請求事件。所有権を放棄した証拠の廃棄は、国賠になる？
Subtitle, one line: 最判平17.4.21

Panel 1 title: まず何が起きた
A closed plain box and a paper that says 所有権放棄. No contents visible.
Caption, lower band only: 被害者が証拠物を任意提出し、所有権を放棄した。鑑定のあと、捜査の途中で廃棄された。

Panel 2 title: 当事者の言い分
ぴっちゅ stands in the upper zone. Label: 被害者（廃棄を理由に、賠償を取りたい）
Speech bubble: 適正を欠く廃棄だ。県に賠償させろ。
Caption, lower band only: 精神的苦痛だとして、県に国家賠償を求めた。

Panel 3 title: 裁判所が見た争点
タスク亀 stands in the upper zone. Label: 裁判所（法律が守る利益かを聞きたい）
Speech bubble: 所有権を放棄したあと、廃棄が単に適正を欠くだけでは、国賠になる？
Caption, lower band only: 捜査で受ける利益は、法律が守る利益か。

Panel 4 title: 判決
No scene character inside this panel.
Caption: 反射的な事実上の利益にすぎない。
Next line: 単に適正を欠くだけでは、国賠はできない。反対意見はある。結論はこちら（国賠1条）。

ちゃちゃロット is one mascot only, in the bottom margin under panel 4, outside the panel, green lecturer suit, white shirt, trousers, and shoes. Wooden pointer toward 国賠はできない. Do not cover that sentence. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. No nameplate. No speech balloon.

Do not print any brand name, account name, or app name.
```

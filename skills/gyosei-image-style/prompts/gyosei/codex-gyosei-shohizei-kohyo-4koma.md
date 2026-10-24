# 消費税定価表示事件。解釈の公表は、処分か？

4コマを横一列。違反者の氏名を晒す公表の話にしない。

- 保存先: `assets/images/deepdive/learn/gyosei/shohizei-kohyo-4koma.png`
- 画像キー: `learn/gyosei/shohizei-kohyo-4koma`
- 関連: 最三判平10.12.18。平成6年（行ツ）第136号。公正取引委員会の年次報告が消費税定価表示事件と呼ぶ。
- 上書きしない: `keizai-shouhizei-1989-2019.png`。あちらは税率の年。
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。

## 法律

出版社らが、再販売価格は消費税込みだとする公正取引委員会の公表で、本の定価表示を刷り直す出費を強いられたとして、公表の取消しと国家賠償を求めた。最高裁は上告を棄却した。その公表は、法令の解釈を示すだけで、権利義務に直接影響しない。取消訴訟の処分ではない。違反した特定の人の氏名を制裁として晒す公表とは別である。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 出版社 | 悪い役 | 出版社（解釈の公表を、処分だと言いたい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 2コマだけ |
| 裁判所 | いい役 | 裁判所（権利義務が動くかを聞きたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 3コマだけ |
| 案内 | いい役 | 案内（結論を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 4コマの下の余白。1体 |

## GPT Image プロンプト

```text
参照必須: カチャドクロは assets/images/characters/kachadokuro_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。ちゃちゃロットは assets/approved-chachalot-pointer.png と assets/approved-smiling-hat-mascot.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Exactly four comic panels in one horizontal row. No second row. No comparison table.

Each panel has two zones with a clear empty gap. Upper zone: picture and one speech bubble. Lower zone: the caption, on its own band. No words on the props except a paper titled 公表. No second copy of the same sentence. Do not draw a person's name list.

Title: 消費税定価表示事件。解釈の公表は、処分か？
Subtitle, one line: 最判平10.12.18

Panel 1 title: まず何が起きた
A public notice on a wall that says 再販売価格は消費税込み. A stack of books beside it. No character.
Caption, lower band only: 公正取引委員会が、再販売価格は消費税込みだ、と公表した。出版社は定価表示を刷り直した。

Panel 2 title: 当事者の言い分
カチャドクロ stands in the upper zone. Label: 出版社（解釈の公表を、処分だと言いたい）
Speech bubble: この公表は処分だ。取り消せ。国に賠償させろ。
Caption, lower band only: 公表の取消しと、国家賠償を求めた。

Panel 3 title: 裁判所が見た争点
タスク亀 stands in the upper zone. Label: 裁判所（権利義務が動くかを聞きたい）
Speech bubble: 法令の解釈を公表しただけで、権利義務は動くか。
Caption, lower band only: 取消訴訟の処分か。

Panel 4 title: 判決
No scene character inside this panel.
Caption: 権利義務に直接影響しない。
Next line: 取消訴訟の処分ではない。上告は棄却。氏名を晒す公表とは別。

ちゃちゃロット is one mascot only, in the bottom margin under panel 4, outside the panel, green lecturer suit, white shirt, trousers, and shoes. Wooden pointer toward 処分ではない. Do not cover that sentence. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. No nameplate. No speech balloon.

Do not print any brand name, account name, or app name.
```

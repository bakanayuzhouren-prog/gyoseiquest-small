# Codex用 — 譲渡のあと、差押えできる？

関連: 合格革命第2回・問30。先取特権と抵当権を左右に分ける。LEC公開2問30の `sakidori-q30.png` は5肢の表なので、この対比図にはしない。`butsujo-daii-saiken-joto-4koma.png` は抵当権だけなので、上書きしない。

1枚。左は動産売買の先取特権だけ。右は抵当権だけ。ひっかけは底部。行の表は置かない。

- 保存先: `assets/images/deepdive/learn/minnpou/sakidori-teito-joto.png`
- 画像キー: `learn/minnpou/sakidori-teito-joto`
- 生成は Codex。Cursor は描かない。
- 配置案: 生成後に直前期パックの民法へ。PNGができるまでアプリには付けない。

## 法律

動産売買の先取特権者は、物上代位の目的債権が譲渡され、第三者に対する対抗要件が備えられた後は、その債権を差し押さえて物上代位できない（民法304条、最判平17.2.22）。

抵当権は逆である。抵当権の効力は304条を準用する（372条）。債権譲渡は、304条の払渡し又は引渡しではない。払渡し前に自ら差し押えれば、譲渡の対抗要件の後でも物上代位できる（最判平10.1.30）。

試験で「抵当権も、譲渡の対抗要件が先なら物上代位できない」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 先取特権者 | いい役 | 先取特権者（対抗要件のあとには差押えできない） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 左パネルの下。本文を隠さない |
| 抵当権者 | いい役 | 抵当権者（払渡し前に差押えしたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 右パネルの下。本文を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（抵当権も譲渡で止まると言う） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 底部のひっかけだけ |
| 案内 | いい役 | 案内（暗記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

## GPT Image プロンプト

```text
参照必須: ぴっちゅは assets/images/characters/pitchi_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。ちゃちゃロットは skills/gyosei-image-style/assets/approved-chachalot-pointer.png と approved-smiling-hat-mascot.png。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。緑の講師スーツは白シャツ、ズボン、靴まで。1体だけ。下余白の右。指し棒は暗記に重ねない。

Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. 16:9. Two side panels and a bottom trap card. No center table. No brand name, account name, or app name.

Title: 譲渡のあと、差押えできる？

Left panel heading: 論点（動産売買の先取特権）
Do not write 抵当権 in the left panel.
Question: 対抗要件が付いたあと、差押えできる？
Answer in large type: できない
One line under it: 目的債権の譲渡に対抗要件が備わると、その後の差押えによる物上代位はできない（304条、最判平17.2.22）。
Under the text, ぴっちゅ only, label: 先取特権者（対抗要件のあとには差押えできない）
A small assigned-claim paper with a stamp 対抗要件. A seizure stamp does not land on it.

Right panel heading: 論点（抵当権）
Do not write 先取特権 in the right panel.
Question: 払渡し前なら、差押えできる？
Answer in large type: できる
One line under it: 債権譲渡は払渡しではない。未払いなら、抵当権者は自ら差し押えて物上代位できる（372条・304条、最判平10.1.30）。
Under the text, タスク亀 only, label: 抵当権者（払渡し前に差押えしたい）
A building with 抵当権登記, an unpaid rent bag, and a seizure stamp on the unpaid rent.

Bottom amber trap card. カチャドクロ beside it, not covering the words. Label: 誤った主張（抵当権も譲渡で止まると言う）
試験で「抵当権も、譲渡の対抗要件が先なら物上代位できない」と書いてあったら×

Navy memory bar, not repeating the two panel answers as a second essay:
先取特権は対抗要件のあと不可。抵当権は、払渡し前の差押えで追える。

One ちゃちゃロット only, bottom-right margin. Characters do not cover the questions, the answers, or the memory bar.
```

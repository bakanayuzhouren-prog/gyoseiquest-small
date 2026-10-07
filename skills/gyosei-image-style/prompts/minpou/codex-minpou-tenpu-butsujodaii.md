# Codex用 — 転付が届く前に、差し押さえた？

関連: 合格革命第2回・問30。転付命令の券面額の図（`codex-minpou-tenpu-ticket.md`）とは別。この1枚の仕事は、抵当権の物上代位との期限だけ。

1枚。上に問い。中央は届く前と届いたあとの2場面。底部にひっかけと暗記。左右の制度対比パネルは使わない。

- 保存先: `assets/images/deepdive/learn/minnpou/tenpu-butsujodaii.png`
- 画像キー: `learn/minnpou/tenpu-butsujodaii`
- 生成は Codex。Cursor は描かない。
- 配置案: 生成後に直前期パックの民法へ。PNGができるまでアプリには付けない。

## 法律

転付命令が第三債務者に送達される時までに、抵当権者がその債権を差し押さえていなければ、抵当権者はその債権について抵当権の効力を主張できない（最判平14.3.12）。

この転付は、民法304条の払渡しにあたる。372条で抵当権の物上代位に準用される差押えは、その払渡しより前に要る。

券面額で債権が移る説明、確定前は効力がない説明は、この図に書かない。

試験で「転付命令のあとでも、抵当権者は物上代位を主張できる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 抵当権者 | いい役 | 抵当権者（転付が届く前に差押えしたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 左の場面だけ。書面を隠さない |
| 第三債務者 | いい役 | 第三債務者（転付命令を受け取る） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 右の場面だけ。命令書を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（届いたあとでも主張できると言う） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 底部のひっかけだけ |
| 案内 | いい役 | 案内（暗記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

## GPT Image プロンプト

```text
参照必須: タスク亀は assets/images/characters/task_turtle_sheet.png。ぴっちゅは assets/images/characters/pitchi_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。ちゃちゃロットは skills/gyosei-image-style/assets/approved-chachalot-pointer.png と approved-smiling-hat-mascot.png。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。緑の講師スーツは白シャツ、ズボン、靴まで。1体だけ。下余白の右。指し棒は暗記に重ねない。

Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. 16:9. A title, then two scenes side by side, then a trap card and a memory bar. No comparison table. No brand name, account name, or app name. Do not explain the face amount of a transfer order. Do not explain when a transfer order becomes final.

Title: 転付が届く前に、差し押さえた？

Left scene heading: 届く前に差し押さえた
タスク亀 only in this scene, label: 抵当権者（転付が届く前に差押えしたい）
A seizure paper is stamped before a document labeled 転付命令 reaches a mailbox labeled 第三債務者.
Large answer: 物上代位を主張できる

Right scene heading: 先に転付が届いた
ぴっちゅ only in this scene, label: 第三債務者（転付命令を受け取る）
ぴっちゅ holds a document 転付命令. No seizure stamp is on it.
Large answer: その債権に抵当権を主張できない
One line: 転付は、304条の払渡しにあたる（最判平14.3.12、372条）。

Bottom amber trap card. カチャドクロ beside it, not covering the words. Label: 誤った主張（届いたあとでも主張できると言う）
試験で「転付命令のあとでも、抵当権者は物上代位を主張できる」と書いてあったら×

Navy memory bar:
第三債務者への転付の送達より前に、抵当権者が差し押さえる。

One ちゃちゃロット only, bottom-right margin. Characters do not cover the two answers or the memory bar.
```

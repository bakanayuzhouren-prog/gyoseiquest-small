# 教示は、行審法と行訴法で同じ？

表が本体。略称は行審法と行訴法だけ。

- 状態: 上書き生成
- 上書き対象: `assets/images/deepdive/learn/gyosho/kyoji-hikaku.png`
- 保存先: `assets/images/deepdive/learn/gyosho/kyoji-hikaku.png`
- 画像キー: `learn/gyosho/kyoji-hikaku`
- 生成は Codex。Cursor は描かない。

## PRE-GENERATE-CHECK

確認日 2026-10-22。e-Gov。行政不服審査法82条。行政事件訴訟法46条。

- 書面で処分するとき、相手方への教示は書面でしなければならない。行審法82条1項、行訴法46条1項。
- 口頭で処分したとき、1項ただし書で外れるのは、相手方への通常の教示義務だけ。教示義務の全部ではない。
- 行審法82条2項。口頭の処分でも、利害関係人から求められたときは教示しなければならない。求めの期間の定めはない。3項は、書面を求めたときだけ書面。
- 行訴法46条1項ただし書も、相手方への通常の教示が口頭処分では適用されない、という意味。行訴法に、利害関係人からの求めの規定はない。
- しなかったときの救済（83条）と、誤った教示（22条）は行審法だけ。行訴法に同旨の明文はない。
- 教示の中身の期間は、不服申立ての期間または出訴期間。教示を求めること自体の期間ではない。
- 執行停止ができる旨は、どちらの必要的教示にも入らない。この表には置かない。

書かない。口頭の処分だから、利害関係人から求められても教示しなくてよい。行服法。行服。列名「聞く一点」。行訴法にも利害関係人の求めがある。書面処分でも口頭の教示で足りる。教示は任意。ブランド名。左右の欄。底部の3枚。ちゃちゃロットを消すこと。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（表を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。見本の向きと余白: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch. Landscape, about 3:2, same proportion as the sample. Warm off-white background. Thick outlines, large gothic type, clear gaps. One wide table is the whole figure. No side panels. No bottom cards.
In all Japanese on the image, write 行審法 for the administrative appeal statute and 行訴法 for the administrative case litigation statute. Do not write any other nickname for those statutes.
Title, one short question: 教示は、行審法と行訴法で同じ？
Header, navy: 教示の場面 | 行審法 | 行訴法
Data rows alternate by row. Row 1 white, row 2 light gray, then continue. Not by column. Wrap text inside cells. Do not shrink type to force one line.
Rows:
書面で処分したときの相手方 | 書面で教示しなければならない（82条1項） | 書面で教示しなければならない（46条1項）
口頭処分の相手方への通常の教示 | 義務はない（82条1項ただし書） | 義務はない（46条1項ただし書）
利害関係人からの求め | 口頭の処分でも、求めがあれば教示する（82条2項）。書面の求めだけ書面（3項） | 求めの規定はない
教示をしなかったとき | 83条の救済がある | 同旨の明文はない
誤った教示 | 22条がある | 同旨の明文はない
Under the table, two lines only:
教示に書く期間は、不服申立ての期間または出訴期間である。求めそのものの期間は、条文にない。
試験で「口頭の処分は、求めがあっても教示しなくてよい」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin, one mascot only, in a green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the left column. No speech balloon. Do not cover the table or the lines under the table.
Do not print any brand name, account name, or app name.
```

# 開示するか。そのあとは？

部分開示、公益開示、存否、審査会、相続と理由の追加。請求の入口は別紙。

- 保存先: `assets/images/deepdive/learn/gyosei/joho-kokai-kaiji.png`
- 画像キー: `learn/gyosei/joho-kokai-kaiji`
- 関連: LEC公開1・問26の存否。LEC公開3・問26の部分開示。合格革命第2回・問26の審査会。合格革命第3回・問26の相続と理由追加。
- 上書きしない: なし。未生成。
- 別紙: `joho-kokai-seikyu.png`。裁判所のインカメラ（最決平21.1.15）、公文書管理法、個人情報の本人開示は、この図に描かない。審査会が見るインカメラと、裁判所のインカメラを同じ行に置かない。

生成はてらしぃが Codex に「joho-kokai-kaiji.png を画像生成して」と言うまでしない。Cursor は描かない。

## 法律の芯（崩すな）

行政機関情報公開法、情報公開・個人情報保護審査会設置法。確認日 2026-10-23。

- 不開示情報が記録されている部分を容易に区分して除くことができるときは、その部分を除いた残りを開示しなければならない（6条1項本文）。有意の情報がないと判断するのは、不開示部分そのものではない。不開示部分を除いた残りである。その残りに有意の情報が記録されていないと認められるときは、この限りでない（6条1項ただし書）。
- 公益上特に必要があると認めるときは、不開示情報でも開示することができる（7条）。しなければならない、ではない。対象から除くのは、5条1号の2の情報である。中身は、行政機関等匿名加工情報（個人情報保護法60条3項。同条4項のファイルを構成するものに限る）と、その作成に用いた保有個人情報から削除した記述等・個人識別符号。この情報まで公益開示できる、とは書かない。
- 存否を答えるだけで不開示情報を開示することとなるときは、存否を明らかにしないで、開示請求を拒否することができる（8条）。LEC公開1・問26の正解は、この肢。
- 審査会は総務省に置く。個人情報保護委員会でも、内閣府の公文書管理委員会でもない。答申は、諮問をした行政機関の長を拘束しない。裁決をするのは、その行政機関の長。インカメラで提示させた文書の開示を、何人も審査会に求めることはできない。
- 開示請求権は一身専属で、相続されない（最判平16.2.24）。不開示決定の取消訴訟では、当初の理由以外の追加と差替えができる（最判平11.11.19）。追加すれば、理由付記の不備が治る、ではない。

## PRE-GENERATE-CHECK

- 部分開示の「有意の情報がない」のは、不開示部分を除いた残り。不開示部分そのもの、と書かない。残りに有意の情報が記録されていないときは、この限りでない（6条1項）。
- 公益開示は「できる」。義務にしない。5条1号の2（行政機関等匿名加工情報と、その作成で削除した記述等・個人識別符号）は対象から除く（7条）。この除外を落とさない。
- 存否は、答えるだけで不開示情報になるときだけ、明らかにしないで拒否できる。
- 審査会は総務省。答申は拘束しない。裁判所のインカメラは書かない。
- 相続されない。理由の追加はできる。付記の不備が治る、とは書かない。
- 結論列に×を置かない。試験の×は下の1行。
- 5行。字を縮めない。行は白と薄いグレー。ちゃちゃロットは下余白。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（表を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

見本の密度: `assets/images/deepdive/learn/gyosho/genkoku-nashi.png`。5行。結論列の×は、この図には置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。表の密度は、原告適格なしパターンの見本と同じ。大きい字。5行まで。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One table of exactly 5 data rows. No side panels. No bottom cards.
Title: 開示するか。そのあとは？
Header, navy: 重要ワード | 内容
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white. Not by column.
No × column. Print these words once in large red type, and do not repeat them in black: 除いた残り / この限りでない / 開示することができる / 5条1号の2は除く / 拒否することができる / 拘束しない / 相続されない。
Keep the type large enough to read on a phone. Rows may wrap to two lines. Do not shrink the type to force each cell onto one line.
Exactly these 5 rows:
部分開示 | 区分して除ける不開示部分は除いて開示する。有意の情報がないのは、不開示部分を除いた残りである。その残りに有意の情報が記録されていないときは、この限りでない（6条1項）
公益開示 | 公益上特に必要があると認めるときは、不開示情報でも開示することができる。5条1号の2は除く。中身は、行政機関等匿名加工情報と、その作成で削除した記述等・個人識別符号である（7条）
存否 | 存否を答えるだけで不開示情報を開示することとなるときは、存否を明らかにしないで拒否することができる（8条）
審査会 | 総務省に置く。答申は拘束しない。裁決は行政機関の長。提示させた文書の開示は、何人も求めることができない
相続と理由 | 開示請求権は相続されない（平16.2.24）。不開示理由の追加と差替えはできる（平11.11.19）。理由付記の不備は治らない
Under the table, one line only:
試験で「審査会は内閣府」「答申は拘束する」「開示請求権は相続される」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin, one mascot only, in a green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the table. No speech balloon. Do not cover the table or the line under the table.
Do not print any brand name, account name, or app name.
```

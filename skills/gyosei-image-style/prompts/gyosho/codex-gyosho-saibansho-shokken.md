# 裁判所は、申立てを待たずに動けるか

表が本体。7行。この図から案内役は外さない。ちゃちゃロットは下余白に1体。

- 状態: 生成済み（2026-10-22）。てらしぃがこの画像の修正を言うまで上書きしない
- 保存先: `assets/images/deepdive/learn/gyosho/saibansho-shokken.png`
- 画像キー: `learn/gyosho/saibansho-shokken`
- 生成は Codex。Cursor は描かない。
- 上書きしない: `行政法/shokken-junyo.png` `gyosho/shikko-teishi-shokken-hikaku.png`

## PRE-GENERATE-CHECK

確認日 2026-10-22。e-Gov。行政事件訴訟法。見本は `genkoku-nashi.png`。横長。16:9の9行は、文字が縮むので使わない。

- 22条。第三者の訴訟参加は、当事者若しくはその第三者の申立て、又は職権。
- 23条。参加させられる行政庁は、処分又は裁決をした行政庁以外。当事者若しくはその行政庁の申立て、又は職権。
- 24条。必要があると認めるときは、職権で証拠調べができる。結果について当事者の意見をきく。職権探知ではない。
- 移送の職権は、12条5項と13条。どの移送でも職権、と書かない。
- 23条の2の現行条文に「申立てにより又は職権で」とは書いていない。訴訟関係を明瞭にするため必要があると認めるとき、裁判所がする。第1項は理由資料の提出又は送付の嘱託。第2項は、裁決を経た取消訴訟の事件記録。この中身は表に置かない。試験の×だけ残す。
- 31条の事情判決は、申立てを要件にしていない。違法でも、取り消すことが公共の福祉に適合しないときは棄却でき、主文で違法を宣言する。表に書くのは、申立てが要件ではないことだけ。棄却の中身は、この表の仕事ではない。
- 25条2項の執行停止は、申立てがなければできない。26条は相手方の申立て。15条は原告の申立てで、故意又は重大な過失によらない誤りに限る。
- タイトルを「全部職権」とも「全部申立て」とも読ませない。

書かない。処分庁以外、とだけ書くこと。案内役なし。No characters。16:9。9行。底部の3枚。左右の欄。ブランド名。文字を縮めること。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（表を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。見本の向きと余白: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch. Landscape, about 3:2, same proportion as the sample. Warm off-white background. Thick outlines, large gothic type, clear gaps. One wide table is the whole figure. No side panels. No bottom cards. Exactly 7 data rows. One line per cell where it fits. Wrap instead of shrinking the type.
Title, one short question: 裁判所は、申立てを待たずに動けるか
Header, navy: 制度 | 裁判所の動き
Data rows alternate by row. Row 1 white, row 2 light gray, then continue. Not by column.
Rows:
第三者の訴訟参加（22条） | 申立て又は職権
処分又は裁決をした行政庁以外の行政庁の参加（23条） | 申立て又は職権
証拠調べ（24条） | 必要があるとき職権。結果は当事者の意見を聞く
二つの移送（12条5項・13条） | 申立て又は職権。どの移送でも職権、ではない
釈明処分の特則（23条の2） | 必要があると認めるとき。申立ては条文にない
事情判決（31条） | 申立ては要件ではない
申立てが要るもの | 執行停止は申立て（25条2項）。取消しは相手方の申立て（26条）。被告の変更は原告の申立てで、故意又は重過失のない誤りに限る（15条）
Under the table, one line only:
試験で「23条の2は、申立てにより又は職権でする」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin, one mascot only, in a green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the left column. No speech balloon. Do not cover the table or the line under the table.
Do not print any brand name, account name, or app name.
```

# 処分性ありパターン

取消訴訟の対象になる側。6行。真ん中は○。ちゃちゃロットは下余白に1体。

- 状態: 生成済み（2026-10-21）。てらしぃがこの画像の修正を言うまで上書きしない
- 保存先: `assets/images/deepdive/learn/gyosho/shobunsei-ari.png`
- 画像キー: `learn/gyosho/shobunsei-ari`
- 生成は Codex。Cursor は描かない。
- 上書きしない: `shobunsei-nashi.png` `shobunsei-kikiwake.png` `genkoku-kikiwake.png` `genkoku-nashi.png` `genkoku-ari-v2.png`
- 原告適格の行は混ぜない。

## PRE-GENERATE-CHECK

確認日 2026-10-21。10行を横長1枚に詰めない。見本は `genkoku-ari-v2.png`。横長。1536×1024の比率。真ん中は○。言葉の「なる」は置かない。行訴法3条2項。権利義務を直接具体的に変動させる公権力の行使か。

- 建築確認。建築できる地位を具体化する。用途地域の指定を争うのではなく、この確認を争う。
- 二項道路の指定。一括の指定も含む。敷地に建築制限が及ぶ（最判平14.1.17）。
- 労災就学援護費の支給決定と不支給決定。支給決定で、はじめて請求権が生じる。不支給も処分（最判平15.9.4）。サービスだから対象にならない、とは書かない。
- 病院の開設中止勧告（最判平17.7.15）。医療法上は、任意に従うことを期待する行政指導として定められている。従わないと、相当程度の確実さをもって、病院を開設しても保険医療機関の指定を受けることができなくなる。国民皆保険の下では、実際上、開設自体を断念せざるを得ない。そのため、行訴法3条2項の処分に当たる。「指定を受けられなくなる」と断定しない。通常の行政指導は、なし側。
- 土地区画整理の事業計画の決定。換地を受けるべき地位と、建築制限（最大判平20.9.10）。青写真のまま、とは書かない。
- 特定の公立保育所を廃止する条例。入所中の者の地位を、直接奪う（最大判平21.11.26）。条例の全部が対象になるわけではない。

この1枚から外す。住民票の続柄の記載。第二種市街地再開発の決定・公告。代執行の戒告。文字を縮めずに載らないため。

試験の×は1行。指導、計画、条例、一括指定は、名前だけで対象にならない、と書くこと。

書かない。列名「結論」。真ん中に「なる」。「保険医療機関の指定を受けられなくなる」と、確実に拒否されると断定すること。一括指定は立法だから対象にならない、条例は常に対象にならない、区画整理は今も青写真、と書くこと。文字を縮めること。ちゃちゃロットを消すこと。ブランド名。左右の欄。底部の3枚。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（左の列を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。見本の向きと密度: assets/images/deepdive/learn/gyosho/genkoku-ari-v2.png
Create a NEW Japanese legal-study infographic from scratch. Landscape, about 3:2, same proportion as the sample. Warm off-white background. Thick outlines, large gothic type, clear gaps. One wide table of exactly 6 data rows. No side panels. No bottom cards.
Title: 処分性ありパターン
Header, navy: 行政庁がしたこと | 処分性 | 誰の地位が、直接動くか
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white, row 6 light gray. Not by column.
The middle column is a large green circle mark on every row. Do not write a Japanese word in that column.
Keep the type large enough to read on a phone. Rows may wrap. Do not shrink the type to force each cell onto one line.
Exactly these 6 rows:
建築確認 | ○ | 建築できる地位を具体化する
二項道路の指定。一括の指定も含む | ○ | 敷地に建築制限が及ぶ（平14.1.17）
労災就学援護費の支給決定と不支給決定 | ○ | 支給決定で請求権が生じる。不支給も処分（平15.9.4）
病院の開設中止勧告 | ○ | 従わないと、相当程度の確実さで保険医療機関の指定を受けられず、実際上、開設を断念せざるを得ない（平17.7.15）
土地区画整理の事業計画の決定 | ○ | 換地を受けるべき地位と、建築制限（平20.9.10）
特定の公立保育所を廃止する条例 | ○ | 入所中の者の地位を、直接奪う（平21.11.26）
Under the table, one line only:
試験で「指導、計画、条例、一括指定は、名前だけで取消しの訴えの対象にならない」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin, one mascot only, in a green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the left column. No speech balloon. Do not cover the table or the line under the table.
Do not print any brand name, account name, or app name.
```

# 処分性（対象になる・ならない）

名前が似ていても、処分性は分かれる。右の列は、対象にならない行為だけ。誤った読みは、その列に置かない。ちゃちゃロットは下余白に1体。

- 状態: 生成済み（2026-10-22）。てらしぃがこの画像の修正を言うまで上書きしない
- 保存先: `assets/images/deepdive/learn/gyosho/shobunsei-kikiwake.png`
- 画像キー: `learn/gyosho/shobunsei-kikiwake`
- 生成は Codex。Cursor は描かない。
- 上書きしない: `shobunsei-kikiwake.png` `shobunsei-ari.png` `shobunsei-nashi.png` `genkoku-kikiwake.png`

## PRE-GENERATE-CHECK

確認日 2026-10-21。生成前チェックの不合格（案内役がいない。右の列に「一括指定は立法だから対象にならない」という誤った読みがあり、表の結論と紛らわしい）を直した。見本は `genkoku-nashi.png`。横長。1536×1024の比率。

右の列は、対象にならない行為だけ。読みや、断定できない留保は置かない。

- 病院の開設中止勧告は対象になる（最判平17.7.15）。開発許可の前の同意の拒否は、対象にならない（最判平7.3.23）。
- 特定の公立保育所を廃止する条例は対象になる（最大判平21.11.26）。水道料金を一般的に改定する条例は、対象にならない（最判平18.7.14）。
- 土地区画整理の事業計画の決定は対象になる（最大判平20.9.10）。用途地域・工業地域の指定は、対象にならない（最判昭57.4.22）。
- 労災就学援護費の支給決定と不支給決定は、どちらも対象になる（最判平15.9.4）。公務員の採用内定の取消は、対象にならない（最判昭57.5.27）。
- 二項道路の一括指定は対象になる（最判平14.1.17）。法律の制定そのものは、原則として対象にならない。一括指定を、立法だから対象にならない、と右の列に書かない。その誤った読みは、下の試験の×だけ。

この1枚から外す。小学校の廃止条例。処分になると断定せず、処分にならないとも断定しない。右の列に置かない。

試験の×は1行。二項道路の一括指定は、立法だから対象にならない、と書くこと。

書かない。列名「結論」。右の列に「という読み」。一括指定は対象にならない、と表の中に書くこと。乗る、乗らない。文字を縮めること。ちゃちゃロットを消すこと。ブランド名。左右の欄。底部の3枚。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（左の列を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。見本の向きと密度: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch. Landscape, about 3:2, same proportion as the sample. Warm off-white background. Thick outlines, large gothic type, clear gaps. One wide table of exactly 5 data rows. No side panels. No bottom cards.
Title: 処分性（対象になる・ならない）
Header, navy: 比べる行為 | 対象になる | 対象にならない
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white. Not by column.
Keep the type large enough to read on a phone. Rows may wrap. Do not shrink the type to force each cell onto one line.
The right column is an act that is not a disposition. Do not put a misreading in that column. Exactly these 5 rows:
勧告と、同意の拒否 | 病院の開設中止勧告（平17.7.15） | 開発許可の前の、同意の拒否（平7.3.23）
条例 | 特定の公立保育所を廃止する条例（平21.11.26） | 水道料金を一般的に改定する条例（平18.7.14）
都市計画 | 土地区画整理の事業計画の決定（平20.9.10） | 用途地域・工業地域の指定（昭57.4.22）
給付と、内定 | 労災就学援護費の支給決定と不支給決定（平15.9.4） | 公務員の採用内定の取消（昭57.5.27）
道路の指定と、法規 | 二項道路の一括指定（平14.1.17） | 法律の制定そのもの（原則）
Under the table, one line only:
試験で「二項道路の一括指定は、立法だから対象にならない」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin, one mascot only, in a green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the left column. No speech balloon. Do not cover the table or the line under the table.
Do not print any brand name, account name, or app name.
```

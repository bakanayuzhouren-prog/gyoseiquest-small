# 原告適格の聞き分け

同じ処分を争う人の対比だけ。6行。資格がない人の列は、人だけ。ちゃちゃロットは下余白に1体。

- 状態: 生成済み（2026-10-21）。てらしぃがこの画像の修正を言うまで上書きしない
- 保存先: `assets/images/deepdive/learn/gyosho/genkoku-kikiwake.png`
- 画像キー: `learn/gyosho/genkoku-kikiwake`
- 生成は Codex。Cursor は描かない。
- 上書きしない: `genkoku-nashi.png` `genkoku-ari.png` `genkoku-ari-v2.png` `shobunsei-kikiwake.png`

## PRE-GENERATE-CHECK

確認日 2026-10-21。生成前チェックの不合格（長沼の「ない人」が人ではなく、資格と訴えの利益の混同。同じ許可の表に、別の処分同士の比較が混ざる。案内役がいない）を直した。見本は `genkoku-nashi.png` と `genkoku-ari-v2.png`。横長。1536×1024の比率。

各行は、左の1つの処分を争う人の対比。別の処分を、右と左に並べない。

- 場外車券発売施設の設置許可（最判平21.10.15）。ある人は、文教施設・医療施設の開設者。ない人は、周辺住民。
- 一般廃棄物処理業のその許可（最判平26.1.28）。ある人は、同じ種類の許可業者。ない人は、その許可と種類が違う業者。
- 開発許可（最判平9.1.28）。ある人は、生命・身体に直接の被害が予想される範囲の居住者。ない人は、その範囲に入らない者。区域外、とは書かない。区域外でも、その範囲なら資格があり得る。
- 新潟空港の、定期航空運送事業の免許（最判平元.2.17）。ある人は、著しい騒音障害を受ける周辺の居住者。ない人は、単なる利用者。
- 小田急の高架の、都市計画事業の認可（最大判平17.12.7）。ある人は、健康又は生活環境に著しい被害を直接受けるおそれのある居住者。ない人は、沿線に住むだけの者。近鉄の運賃の認可は、別の処分なので、この行に置かない。
- 長沼の、保安林の指定解除（最一小判昭57.9.9）。ある人は、洪水等の直接の影響を受ける一定範囲の住民。ない人は、基地反対や、跡地の利用の不利益だけを理由にする者。代替施設で危険が解消した話は、訴えの利益。資格がない人の欄に書かない。下の1行だけ。

この1枚から外す。公衆浴場と風俗営業の行（別々の処分）。距離規制という見出し。

試験の×は1行。長沼は、代替施設で危険が解消したから資格がなかった、と書くこと。

書かない。列名「結論」「許可」だけ。資格がない人の欄に、読み・混同・訴えの利益を書くこと。区域外は常に資格がない、と書くこと。文字を縮めること。ちゃちゃロットを消すこと。ブランド名。左右の欄。底部の3枚。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（左の列を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。見本の向きと密度: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch. Landscape, about 3:2, same proportion as the sample. Warm off-white background. Thick outlines, large gothic type, clear gaps. One wide table of exactly 6 data rows. No side panels. No bottom cards.
Title: 原告適格の聞き分け
Header, navy: 争っている処分 | 資格がある人 | 資格がない人
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white, row 6 light gray. Not by column.
Keep the type large enough to read on a phone. Rows may wrap. Do not shrink the type to force each cell onto one line.
The right column is a person on every row. Exactly these 6 rows:
場外車券発売施設の設置許可（平21.10.15） | 文教施設・医療施設の開設者 | 周辺住民
一般廃棄物処理業のその許可（平26.1.28） | 同じ種類の許可業者 | その許可と種類が違う業者
開発許可（平9.1.28） | 生命・身体に直接の被害が予想される範囲の居住者 | その範囲に入らない者
新潟空港の、定期航空運送事業の免許（平元.2.17） | 著しい騒音障害を受ける周辺の居住者 | 単なる利用者
小田急の高架の、都市計画事業の認可（平17.12.7） | 健康又は生活環境に著しい被害を直接受けるおそれのある居住者 | 沿線に住むだけの者
長沼の、保安林の指定解除（昭57.9.9） | 洪水等の直接の影響を受ける一定範囲の住民 | 基地反対や、跡地の利用の不利益だけを理由にする者
Under the table, one line only:
試験で「長沼は、代替施設で危険が解消したから、資格がなかった」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin, one mascot only, in a green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the left column. No speech balloon. Do not cover the table or the line under the table.
Do not print any brand name, account name, or app name.
```

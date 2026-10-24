# 原告適格なしパターン

原告適格がない取消訴訟だけ。5行。列の文は、見出しと同じく、誰が先で、何の取消しが後。真ん中は×。ちゃちゃロットは下余白に1体。

- 状態: 生成済み（2026-10-21）。このPNGが表の合格見本。てらしぃがこの画像の修正を言うまで上書きしない
- 保存先: `assets/images/deepdive/learn/gyosho/genkoku-nashi.png`
- 画像キー: `learn/gyosho/genkoku-nashi`
- 生成は Codex。Cursor は描かない。
- 上書きしない: `genkoku-ari.png` `genkoku-ari-v2.png` `genkoku-kikiwake.png` と、この保存先以外のPNG。

## PRE-GENERATE-CHECK

確認日 2026-10-21。てらしぃの不合格（タイトルが長い。真ん中の「ない」が目に入る。列の順番と文の順番が逆。ちゃちゃロットがいない）を直した。法律の5行は、直前の合格指定のまま。

- 場外車券発売施設の設置許可の取消しを、周辺住民が争う。資格はない（最判平21.10.15）。印字の文は、周辺住民が先。
- 風俗営業の許可の取消しを、制限区域内の居住者が争う。資格はない（最判平10.12.17）。
- 他の病院の開設許可の取消しを、既存の医療施設側が争う。資格はない（最判平19.10.19）。医療法7条は、競争上の利益を守らない。
- 一般廃棄物の処分業の許可更新処分を、収集運搬業だけの既存許可業者が争う。資格はない（最判平26.1.28）。同じ種類の収集運搬業の更新は、資格がある。廃棄物業者は資格がない、と一般化しない。
- 近鉄特急料金の改定認可の取消しを、その特急を使う沿線の居住者が争う。資格はない（最判平元.4.13）。地方鉄道法21条は、個々の利用者の利益を守らない。

表に置かない。ジュース表示事件。建築確認。開発許可。薬局の距離規制と公衆浴場。

試験の×は1行。近くに住む、同業である、というだけで原告適格がある、と書くこと。

書かない。真ん中の列に「ない」。タイトルを長い問いに戻すこと。文を「何の取消しを、誰が争う」の順に戻すこと。5行以外の事件。文字を縮めること。ちゃちゃロットを消すこと。ブランド名。左右の欄。底部の3枚。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（左の列の「誰が」を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One table of exactly 5 data rows. No side panels. No bottom cards.
Title: 原告適格なしパターン
Header, navy: 誰が、何の取消しを争うか | 原告適格 | 個別に保護されない利益
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white. Not by column.
The middle column is a large red × on every row. Do not write a Japanese word in that column.
Keep the type large enough to read on a phone. Rows may wrap. Do not shrink the type to force each cell onto one line.
The left cell starts with the person, then what they dispute. Exactly these 5 rows:
周辺住民が、場外車券発売施設の設置許可の取消しについて争う | × | 周辺住民の生活の利益は守られない。開設者とは別（平21.10.15）
制限区域内の居住者が、風俗営業の許可の取消しについて争う | × | 制限は専ら公益。居住者の生活の利益は守られない（平10.12.17）
既存の医療施設側が、他の病院の開設許可の取消しについて争う | × | 医療法7条は、競争上の利益を守らない（平19.10.19）
収集運搬業だけの既存許可業者が、一般廃棄物の処分業の許可更新処分の取消しについて争う | × | 処分業の許可を受けていない。同じ種類の収集運搬業の更新は、資格がある（平26.1.28）
その特急を使う沿線の居住者が、近鉄特急料金の改定認可の取消しについて争う | × | 地方鉄道法21条は、個々の利用者の利益を守らない（平元.4.13）
Under the table, one line only:
試験で「近くに住む、同業である、というだけで原告適格がある」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin, one mascot only, in a green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the left column. No speech balloon. Do not cover the table or the line under the table.
Do not print any brand name, account name, or app name.
```

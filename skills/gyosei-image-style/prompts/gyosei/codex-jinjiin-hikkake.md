# 人事院のひっかけ

白紙委任、代償措置、判定の裁量、会計検査院は独任制ではない。命令の出し手は下の1行だけ。

- 保存先: `assets/images/deepdive/learn/gyosei/jinjiin-hikkake.png`
- 画像キー: `learn/gyosei/jinjiin-hikkake`
- 関連: 102条の人事院規則。労働基本権の代償措置。経産省トイレ（最判令5.7.11）。会計検査院法2条・11条。LEC公開1・問8の内閣官房令。
- 上書きしない: `jinjiin-shigoto.png` `seirei-shorei-kisoku.png`

生成はてらしぃが Codex に「jinjiin-hikkake.png を画像生成して」と言うまでしない。Cursor は描かない。

## 法律の芯（崩すな）

- 国家公務員法102条1項の人事院規則への委任は、白紙委任ではない。職務の政治的中立性を損なうおそれが実質的に認められる行為類型の具体化（猿払・堀越）。
- 人事院の給与勧告などは、労働基本権制約の代償措置として考慮する。考慮されない、と書かない。
- 人事院の判定も、裁量権の逸脱又は濫用が問題になる。執務階の制限を是認した判定部分は、遅くとも判定時には違法（最判令5.7.11）。常に適法、とも、判定は全部違法、とも書かない。
- 会計検査院は、三人の検査官で構成する検査官会議と事務総局で組織する（会計検査院法2条）。検査報告、会計検査院規則の制定改廃その他、11条の事項は、検査官会議で決する。合議で意思決定する。独任制ではない。合議制機関に含めること自体を誤りと書かない。人事院が合議制ではない、とも書かない。
- 人事院規則は、省令でも内閣府令でもない。内閣官房令はない。政令・省令・規則の3箱は、この図に描かない。

## PRE-GENERATE-CHECK

- 真ん中の列は赤い×だけ。日本語の「ない」を置かない。
- 左は、試験に書いてあったら誤りの文。右は、正しい切り方。
- 4行。字を縮めない。行は白と薄いグレー。
- 試験の×は表の下に1行。命令の3箱は描かない。
- ちゃちゃロットは下余白。せりふで表を繰り返さない。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（×の列を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One table of exactly 4 data rows. No side panels. No bottom cards.
Title: 人事院のひっかけ
Header, navy: 試験の書き方 | 正誤 | 正しい切り方
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray. Not by column.
The middle column is a large red × on every row. Do not write a Japanese word in that column.
Keep the type large enough to read on a phone. Rows may wrap. Do not shrink the type to force each cell onto one line.
Exactly these 4 rows:
102条の委任は、白紙委任である | × | 中立性を損なうおそれが実質的にある行為の具体化。白紙委任ではない
人事院制度は、労働基本権の制約で考慮しない | × | 給与勧告などは、代償措置として考慮する
人事院の判定は、裁量の逸脱が問題にならない | × | 裁量権の逸脱又は濫用が問題になる（令5.7.11）
会計検査院は、独任制である | × | 三人の検査官の検査官会議の合議で、意思決定する（会計検査院法2条・11条）
Under the table, one line only:
試験で「人事院規則は省令」「内閣官房令がある」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin, one mascot only, in a green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the × column. No speech balloon. Do not cover the table or the line under the table.
Do not print any brand name, account name, or app name.
```

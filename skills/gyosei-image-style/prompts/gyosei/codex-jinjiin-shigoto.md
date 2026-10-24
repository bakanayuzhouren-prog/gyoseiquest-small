# 人事院の仕事は？

人事院が定めるもの、報告する先、変更する主体、懲戒する主体。ひっかけの判例は別紙。

- 保存先: `assets/images/deepdive/learn/gyosei/jinjiin-shigoto.png`
- 画像キー: `learn/gyosei/jinjiin-shigoto`
- 関連: LEC公開1・問8イ（人事院規則）。合格革命法制2・問26（報告・懲戒・基礎事項）。既存の `seirei-shorei-kisoku.png` は政令・省令・規則・内閣府令。この図は上書きしない。

生成はてらしぃが Codex に「jinjiin-shigoto.png を画像生成して」と言うまでしない。Cursor は描かない。

## 法律の芯（崩すな）

e-Gov 国家公務員法。確認日 2026-10-23。

- 人事院は、所掌事務について、法律を実施するため、または法律の委任に基づいて、人事院規則を制定し、人事院指令を発し、手続を定める（16条）。いつでも、適宜に、人事院規則を改廃することができる。
- 俸給表が適当かどうかは、人事院が、毎年少なくとも一回、国会と内閣に同時に報告する（28条2項）。100分の5以上の増減が必要なら、その報告にあわせて勧告する。
- 給与、勤務時間その他の勤務条件の基礎事項は、国会が社会一般の情勢に適応するように変更する（28条1項）。人事院は、その変更の勧告を怠らない。試験の「根本基準」は、この基礎事項。
- 懲戒処分は、任命権者が行う（84条1項）。人事院は、この法律の調査を経て、職員を懲戒手続に付することができる（84条2項）。処分の主体を人事院、と書かない。人事院は懲戒に一切関われない、とも書かない。

書かない。内閣官房令。政令・省令・内閣府令の3箱（既存図）。102条。労働基本権。トイレの判定。会計検査院。問題文の全文。

## PRE-GENERATE-CHECK

- 16条の本文は「定める」。改廃の文が「することができる」。制定を「できる」だけにしない。
- 報告の先は国会と内閣。内閣だけにしない。
- 変更するのは国会。人事院は勧告を怠らない。
- 処分は任命権者。84条2項の手続付与は残す。
- 結論列に×を置かない。この表は正しい仕事。試験の×は下の1行。
- 行は白と薄いグレーの交互。字を縮めない。ちゃちゃロットは下余白。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（左の「仕事」を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One table of exactly 4 data rows. No side panels. No bottom cards.
Title: 人事院の仕事は？
Header, navy: 仕事 | 誰が、何をする
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray. Not by column.
No × column. Print the actor in large red type, once in each right cell: 人事院 / 人事院 / 国会 / 任命権者. Do not print a second copy of those red words in black.
Keep the type large enough to read on a phone. Rows may wrap. Do not shrink the type to force each cell onto one line.
Exactly these 4 rows:
人事院規則・人事院指令・手続 | 人事院が、法律を実施するため、または法律の委任に基づいて定める。いつでも、適宜に、改廃できる（16条）
俸給表が適当かどうか | 人事院が、毎年少なくとも一回、国会と内閣へ同時に報告する。100分の5以上の増減なら、その報告にあわせて勧告する（28条2項）
勤務条件の基礎事項の変更 | 国会が変更する。人事院は、その勧告を怠らない（28条1項）
一般職の懲戒 | 任命権者が処分を行う（84条1項）。人事院は、調査のあと懲戒手続に付することができる（84条2項）
Under the table, one line only:
試験で「報告は内閣だけ」「懲戒処分は人事院」「基礎事項の変更は人事院だけ」と書いてあったら×。
ちゃちゃロット stands in the bottom-right margin, one mascot only, in a green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the left column. No speech balloon. Do not cover the table or the line under the table.
Do not print any brand name, account name, or app name.
```

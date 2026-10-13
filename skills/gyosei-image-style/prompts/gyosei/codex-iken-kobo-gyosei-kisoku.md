# 意見公募の対象は、何？

- 保存先: `assets/images/deepdive/learn/gyosei/iken-kobo-gyosei-kisoku.png`
- 画像キー: `learn/gyosei/iken-kobo-gyosei-kisoku`
- 関連: `data/knowledge/canonical/iken-kobo-gyosei-kisoku.md`。行政手続法2条8号・3条2項5号・4条・39条1項。

生成はてらしぃが Codex に「画像生成して」と言うまでしない。Cursor は描かない。

## 法律の芯（崩すな）

確認日 2026-10-12。e-Gov の行政手続法（2026-10-01 時点の条文）。正本は canonical の同ファイル。

- 意見公募の対象は、命令等を定めようとするとき（39条1項）。
- 命令等は4つ（2条8号）。
  1. 法律に基づく命令（処分の要件を定める告示を含む）又は規則
  2. 審査基準
  3. 処分基準
  4. 行政指導指針
- 行政規則は、あとの3つ。制定形式は問わない。通達、訓令、通知でも、内容がこの3つなら命令等に入る。
- 条文が「命令」と略すのは、1だけ（2条8号イ）。2から4は、その横に別に並ぶ。命令等ではある。法律に基づく命令ではない。
- 法規命令だけが対象、は誤り。
- 対象外。給与その他の勤務条件は3条2項5号。組織と会計は4条。通達の全部が対象、ではない。
- 書かない: 給与を4条に入れる。告示の全部を命令等に入れる。通達は一切対象外。問題文の全文。ブランド名。

## 見せ方

箱を左から右へ4つ。1つ目だけ「命令」。右の3つをまとめて「行政規則」。底部の判断軸・ひっかけ・暗記は置かない。案内役は置かない。同じ文をタイトルと箱で繰り返さない。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 意見公募の対象は、何？ |
| 中央 | 命令等の4つ。右の3つが行政規則 |
| 対象外1行 | 給与は3条2項5号。組織と会計は4条 |
| ひっかけ1行 | 通達でも、中身が右の3つなら対象。通達の全部ではない |
| キャラ | なし |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
Topic: what the public comment procedure covers under the Administrative Procedure Act.
Learning goal: 意見公募の対象は命令等の4つ（行政手続法2条8号、39条1項）。右の3つが行政規則。給与その他の勤務条件は3条2項5号、組織と会計は4条で対象外。

Simple layout. Warm off-white background. Large gothic Japanese. 16:9. Wide margins.
No left panel, no right panel, no bottom cards, no mascot, no documents, no arrows that hide text.
Four boxes in one row, left to right. White boxes, navy borders. Space between boxes.
A short label above box 1 only: 命令
A short label above boxes 2, 3, and 4 together: 行政規則
Do not draw a character.

Title, one line: 意見公募の対象は、何？
One short line under the title, not a repeat of the four box names: 命令等を定めようとするとき（39条1項）

Box 1: 法律に基づく命令又は規則
処分の要件を定める告示を含む
2条8号イ

Box 2: 審査基準
Box 3: 処分基準
Box 4: 行政指導指針

One line under the four boxes: 通達や訓令でも、中身が右の3つなら対象（2条8号）
One line under that, not a repeat of the boxes: 給与その他の勤務条件は対象外（3条2項5号）。組織と会計は対象外（4条）

Do not write that only cabinet orders and ministerial ordinances are covered.
Do not put 給与 under article 4.
Do not write that every 告示 is covered.
Do not write that every 通達 is outside the procedure.
Do not print a brand name, a watermark, or a character.
```

関連: 辰巳2026全国公開完全模試・問24・肢4。不信任を議決できない、とした点が誤り。住民の解散請求（76条）はこの図に置かない。

# 不信任のあと、長はどうなる？

チャート。最初の不信任から、10日以内に解散したかで分かれる。しなかった側はそこで失職。した側だけ、解散後初めて招集された議会の不信任へ進む。

- 状態: 上書き待ち（2026-10-25）。左右対比の完成図を、チャートに差し替える
- 上書き対象: assets/images/deepdive/learn/jichi/fushin-saisho-saido.png
- 保存先: assets/images/deepdive/learn/jichi/fushin-saisho-saido.png
- 画像キー: learn/jichi/fushin-saisho-saido
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。

## PRE-GENERATE-CHECK

確認日 2026-10-25。地方自治法178条。正本は `data/knowledge/canonical/tatsumi-2026-zenkoku-koukai.md` の問24肢4。

- 最初の不信任は、議員数の3分の2以上の出席と、出席議員の4分の3以上の同意。長は、通知の日から10日以内に議会を解散できる。義務ではない。解散しなければ、その期間が経過した日に失職する。
- 解散したあとは、解散後初めて招集された議会の不信任だけ。出席は同じく議員数の3分の2以上。同意は出席議員の過半数。通知の日に失職する。再度の解散はできない。178条3項。分母は出席議員。過半数だけでは置かない。
- 出席の3分の2は、出席議員の3分の2ではない。議員数の3分の2以上が出席する。
- 住民の解散請求、再議、議会が自ら解散する特例は、この図に置かない。左右の対比パネルに戻さない。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（解散した矢印を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。箱と試験の×を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one flowchart. Boxes and arrows only. No side-by-side comparison panels. No bottom cards. No answer bar. No speech balloon.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. Wrap long lines.
Canvas: fully opaque warm off-white, landscape 16:9. Wide margins. Leave a bottom margin for one test line and one guide.

Title, one short question: 不信任のあと、長はどうなる？
No subtitle under the title.

Flow left to right, then one branch down.

Box 1, navy outline: 最初の不信任（178条1項）
Two lines inside: 出席は、議員数の3分の2以上 / 同意は、出席議員の4分の3以上

Arrow right into a decision box: 通知の日から10日以内に、議会を解散した？

From the decision, one arrow down. Label on that arrow: しなかった
It ends at one box: 期間が経過した日に失職
This down branch stops there. Do not continue it to the right.

From the decision, one arrow right. Label on that arrow: した
Box 2: 解散後初めて招集された議会の不信任（178条2項）
Two lines inside: 出席は、議員数の3分の2以上 / 同意は、出席議員の過半数

Arrow right from box 2 to the last box: 通知の日に失職
One line under that last box: 再度の解散はできない

Bottom, one line only: 再度の不信任のあと、もう一度議会を解散できる、は×。
Do not repeat that line in the title or in the boxes.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the arrow labeled した. No speech balloon. Do not cover the boxes or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 流れは、最初の不信任から、解散したかで分かれる。左右の対比パネルではない
- [ ] 最初の同意は出席議員の4分の3以上。解散後の同意は出席議員の過半数。過半数だけになっていない
- [ ] しなかった側は、期間が経過した日に失職で終わる
- [ ] した側は、解散後初めて招集された議会の不信任から、通知の日に失職。再度の解散はできない
- [ ] 試験の×は下に1行。住民の解散請求は出ていない
- [ ] 案内役は下余白。帽子は耳ではない。箱を隠さない
- [ ] ブランド印字なし。名簿外なし

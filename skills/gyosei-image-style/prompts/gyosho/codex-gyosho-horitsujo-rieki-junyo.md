# Codex用 — 原告適格に9条を使うのは、どの訴え？

横長の表1枚。9条との関係を、直接適用・2項だけ準用・準用しない、の3区分で見せる。副題は置かない。「準用ではない」を行ごとに繰り返さない。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/gyosho/horitsujo-rieki-junyo.png`
- 画像キー: `learn/gyosho/horitsujo-rieki-junyo`
- 生成は Codex。Cursor は描かない。いまのPNGは上書きしない。`上書き対象` は付けない。
- 配置案: 見て聞いて覚える・行政事件訴訟法の「もっと深掘る」。アプリ載せは、てらしぃが載せると言うまでしない。
- 向き: 既存PNGと同じ横長。3列6行。字は既存の横長の表と同じ大きさ。縮めて1行に詰めない。セルは2行まで折り返してよい。

## 法律

e-Gov（行政事件訴訟法。法令検索。確認日 2026-10-23）。

取消訴訟の原告適格は、9条が直接適用される。1項は、処分又は裁決の取消しを求めるにつき法律上の利益を有する者に限り、提起できる。2項は、相手方以外の者について、その法律上の利益の有無を判断するときの考慮事項である。

「2項だけ準用」は、法律上の利益の有無の判断について、9条2項を準用する、という意味である。9条1項まで準用する、と描かない。

- 非申請型の義務付けは、37条の2第3項が、一定の処分をすべき旨を命ずることを求めるにつき法律上の利益を有する者に限り、と書く。その法律上の利益の有無の判断について、9条2項を準用する（同条第4項）。
- 差止めは、37条の4第3項が、一定の処分又は裁決をしてはならない旨を命ずることを求めるにつき法律上の利益を有する者に限り、と書く。その法律上の利益の有無の判断について、9条2項を準用する（同条第4項）。

無効等確認は、36条が原告適格を定める。9条の準用ではない。36条は、無効等の確認を求めるにつき法律上の利益を有する者であることに加え、処分若しくは裁決の存否又はその効力の有無を前提とする現在の法律関係に関する訴えによって目的を達することができないことを要する。「法律上の利益」という語が9条と共通でも、9条の準用とは別である。図のセルでは、この2点を短く添える。38条1項の準用列挙に9条はない。図に38条は足さない。

申請型の義務付け自体には、9条を準用しない。37条の3第2項は、同条1項各号の法令に基づく申請又は審査請求をした者に限り、提起できる、と書く。申請と審査請求の両方を要する、ではない。

申請型の義務付けに取消訴訟を併合する場面（37条の3第3項2号）では、併合した取消訴訟の原告適格は、別途、取消訴訟として9条の問題になる。この点を、申請型の行へ書き足さない。「申請型の義務付け自体には9条を準用しない」と混ぜない。図に併合の注を置かない。

不作為の違法確認は、37条が、処分又は裁決についての申請をした者に限り、と書く。9条の準用ではない。

試験の×は下に1行だけ。試験で「無効等確認以外は、すべて9条を準用する」と書いてあったら×。旧図の3行（無効等確認は9条の準用、義務付けはすべて9条1項、差止めは9条全体）と同じ趣旨の注は、この1行にまとめて削る。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（表と試験の×を指す。本文を隠さない。せりふで表を繰り返さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

カチャドクロ、ぴっちゅ、タスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは approved-chachalot-pointer.png。横長は、既存の horitsujo-rieki-junyo.png と同じ向きと、同じ文字の大きさ。
Create a NEW Japanese legal-study infographic from scratch. Wide landscape. Warm off-white background. Thick outlines, large gothic type, clear gaps. One comparison table is the figure. No subtitle. No left-right debate panels. No three cards at the bottom. No amber outline on any data row.
Title only: 原告適格に9条を使うのは、どの訴え？
Header, navy, three columns in this order: 9条との関係 / 訴え / 根拠
Six data rows. Alternate by row. Row 1 white, row 2 light gray, and continue. Not by column. Do not shrink type to force one line. A cell may wrap to two lines.
Row 1: 直接適用 | 取消訴訟 | 9条1項・2項
Row 2: 2項だけ準用 | 非申請型の義務付け | 法律上の利益の有無の判断について、9条2項を準用する（37条の2第3項・第4項）
Row 3: 2項だけ準用 | 差止め | 法律上の利益の有無の判断について、9条2項を準用する（37条の4第3項・第4項）
Row 4: 準用しない | 無効等確認 | 36条が原告適格を定める。法律上の利益に加え、現在の法律関係に関する訴えでは目的を達せないこと
Row 5: 準用しない | 申請型の義務付け | 37条の3第2項が、申請又は審査請求をした者に限定
Row 6: 準用しない | 不作為の違法確認 | 37条が、申請をした者に限定
On rows 2 and 3, do not print 9条1項. The quoted 2項 applies only to judging whether a legal interest exists.
On row 4, the words 法律上の利益 are Article 36 itself. Do not add 9条の準用 to that cell.
On row 5, do not add any note about a joined revocation suit. The application-type mandate suit itself does not apply Article 9.
One amber line under the table, and no other note:
試験で「無効等確認以外は、すべて9条を準用する」と書いてあったら×。
ちゃちゃロット stands in the bottom margin, in a green lecturer suit, white shirt, trousers, and shoes, with a pointer. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. Do not cover the table or the line under it. No speech balloon that repeats the table.
Do not print any brand name, account name, or app name.
```

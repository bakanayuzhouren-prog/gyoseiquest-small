# Codex用 — 国の関与の審査申出は3つの入口（250条の13）

定型の左右パネルと中央表は使わない。AGENTSの「見せ方は論点に合わせる」。生成前チェックで左右見出しがないことを理由に止めない。

1枚の仕事は、長その他の執行機関が国地方係争処理委員会へ審査の申出をできる3つの場合。各項を1ブロックにし、下にひっかけと注記。

- 保存先: `assets/images/deepdive/learn/jichi/kuni-kanyo-moushide-3.png`
- 画像キー: `learn/jichi/kuni-kanyo-moushide-3`
- 生成は Codex。Cursor は描かない。
- 既存の `kuni-no-kanyo.png` は上書きしない。
- 配置案: 見て聞いて覚える・地方自治法の「もっと深掘る」。アプリ載せは生成後。

## 法律（250条の13）

申出人は普通地方公共団体の長その他の執行機関。宛先は国地方係争処理委員会。相手方は国の行政庁。文書でする。申出の前に相手方へ通知する（7項）。

1. **1項** 是正の要求、許可の拒否その他の処分その他公権力の行使に当たる関与。関与があった日から30日以内。やむを得ない理由があるときは、その理由がやんだ日から1週間。代執行に関する一定の指示（245条の8）は除く。
2. **2項** 国の不作為。申請等があったのに、相当の期間内に、許可その他の公権力の行使をすべきなのにしない。
3. **3項** 法令に基づく協議の申出をし、団体側の義務は果たしたと認められるのに、協議が調わない。

助言・勧告は公権力の行使に当たらないので、この3つに入らない。30日の起算は1項だけ。なお不服は、委員会の通知があった日から30日以内に高等裁判所（251条の5）。都道府県と市町村の争いは自治紛争処理委員。

幼児言葉は書かない。法律用語は残し、各ブロックの絵の下に、その場面で何が起きたかを一文で置く。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 申出する側 | いい役 | 長（国の関与に不服で、審査の申出をしたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 3ブロックに同じ姿で1体ずつ。本文を隠さない |
| 受付 | いい役 | 委員会（審査の申出を受ける） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 上部の受付口に1体。3ブロックへ分岐する |
| 誤った主張 | 悪い役 | 誤った主張をする側（助言でも申出できる、不作為はできない、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。ブロックの中に置かない |
| 案内 | いい役 | 案内（注記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体だけ |

国の行政庁は人物にしない。是正の要求の書面、許可しない印、空の返信箱、まとまらない協議の書類で見せる。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 地方公共団体の長その他の執行機関が、国の関与について国地方係争処理委員会へ審査の申出をできるのは3つの場合である（地方自治法250条の13）.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas/background: fully opaque solid warm off-white across 100% of the entire 16:9 canvas. No transparency or unpainted margin.

Do NOT use the usual left-panel / right-panel / center-table layout. Do NOT make a comparison table.
Layout: a short title, then ONE reception scene, then THREE equal story blocks side by side, then a bottom strip for ひっかけ and 注記. Each block is a scene plus two short lines, not a table row.

Do not print brand names anywhere on the image.
Scene people are only ぴっちゅ, タスク亀, カチャドクロ, and one ちゃちゃロット. The same ぴっちゅ design appears once in each of the three blocks. No other people. No 辻さん. No 代さん.

Title:「国の関与に不服なら、委員会へ審査の申出」
Chip:「地方自治法」
One line under the title:「申出ができるのは、長その他の執行機関。文書でする。」

Reception, small, above the three blocks: タスク亀 at a doorway labeled「国地方係争処理委員会（審査の申出を受ける）」. Three paths leave the doorway into the three blocks. Label under タスク亀:「委員会（申出を受ける）」. Do not cover the blocks.

Block 1, left. Heading:「1. 公権力の行使が来た」
Scene: a written order「是正の要求」and a stamp「許可しない」arrive. ぴっちゅ holds them and faces the committee path. A small calendar reads「関与の日から30日」.
Role label:「長（申出したい）」
Line:「直せ、と言われた。許可しない、と言われた。」
Legal line:「是正の要求、許可の拒否その他の処分（1項）」
Tiny note inside the block:「代執行の一定の指示は除く」

Block 2, center. Heading:「2. すべき処分をしない」
Scene: ぴっちゅ has placed an application in an out-box. The reply tray is empty. A clock reads「相当の期間」.
Role label:「長（申出したい）」
Line:「申請したのに、相当の期間、公権力の行使をしない。」
Legal line:「国の不作為（2項）」

Block 3, right. Heading:「3. 協議が調わない」
Scene: ぴっちゅ stands beside a checked list「義務は果たした」. Across the desk, two document stacks do not meet.
Role label:「長（申出したい）」
Line:「協議を申し出た。義務は果たした。それでも調わない。」
Legal line:「法令に基づく協議（3項）」

Bottom strip, two areas, not three template cards:
ひっかけ: カチャドクロ SMALL, label「誤った主張をする側」. Text only these wrong claims:「助言でも申出できる」「不作為は申出できない」「30日は3つとも関与の日から」「いきなり高等裁判所へ」
注記:「申出の前に、相手方の国の行政庁へ通知する。助言・勧告は、この3つに入らない。30日は1項だけ。なお不服は、通知の日から30日以内に高等裁判所。」

Guide: ONE ちゃちゃロット only, SMALL at the lower right of the 注記, wooden 指し棒 pointing at the 注記. Cream face, independent pale-sky-blue smiling hat with three rounded hills and a long brim (not ears, not a hood), closed smiling eyes, green lecturer jacket, white shirt, green trousers, shoes. No nameplate. Do not cover the three blocks or the 注記 text.
No owl, bear, cat, raccoon. No table. No zebra rows.
```

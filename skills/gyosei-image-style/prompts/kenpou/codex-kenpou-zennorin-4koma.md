# Codex用 — 全農林警職法事件の4コマ（最大判昭48.4.25）

上書き対象: `assets/images/deepdive/learn/kenpou/zennorin-4koma.png`

定型の左右パネルと中央表は使わない。4コマだけ。AGENTSの「見せ方は論点に合わせる」。4コマの反対意見は「試験で『〇〇』と書いてあったら×」まで書く。

1枚の仕事は、国家公務員の争議禁止とあおり処罰が合憲か。3コマが多数意見（結論）。4コマが色川の反対意見。反対を誤り役にしない。試験の結論は多数意見、と下に1行。

- 保存先: `assets/images/deepdive/learn/kenpou/zennorin-4koma.png`
- 画像キー: `learn/kenpou/zennorin-4koma`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・憲法の「もっと深掘る」。アプリ載せは生成後。

## 法律

最大判昭48.4.25。全農林の幹部が、警職法改正に反対し、勤務時間内の職場大会への参加をあおった。国公法の争議行為禁止と、あおりの処罰の合憲性。

多数意見: 憲法28条は公務員にも及ぶ。それでも、一律の禁止とあおりの処罰は違憲ではない。論拠は、全体の奉仕者、職務の公共性、勤務条件は議会が決める、代償措置がある、の4つ。

反対意見（色川）: 禁止と刑罰を一緒に考えてはいけない。試験で「禁止と刑罰は同じ」と書いてあったら×。試験で「反対意見が判決の結論」と書いてあったら×。

書かない: 猿払（政治的行為）。名古屋中郵。単純参加者は必ず無罪。反対意見が判決の結論。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 呼びかけた側 | いい役 | 組合幹部（勤務中の集会を呼びかけた） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 1コマだけ |
| 多数意見 | いい役 | 多数意見（禁止も処罰も合憲だと言う） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 3コマだけ |
| 反対意見 | いい役 | 反対意見（禁止と刑罰は別だと言う） | ちゃちゃロットは案内に残す。4コマの語りは吹き出しだけ | — | 4コマに裁判官の別人を置かない |
| 案内 | いい役 | 案内（試験の結論を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白。1体 |

4コマにカチャドクロは置かない。反対意見を悪い役にしない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。タスク亀は task_turtle_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 全農林警職法事件。国家公務員の争議の一律禁止と、あおりの処罰は合憲か。多数意見は合憲。色川の反対意見は、禁止と刑罰は別.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas/background: fully opaque solid warm off-white across 100% of the entire 16:9 canvas. No transparency or unpainted margin.

Do NOT use a comparison table. Do NOT use left and right legal panels.
Layout: title, then FOUR equal comic panels in one horizontal row, then one bottom note. Each panel is a big number, one short scene or one speech, and two short lines. Lots of empty space. A beginner can read each panel in one breath.

Do not print brand names anywhere on the image.
Scene people: ぴっちゅ only in panel 1. タスク亀 only in panel 3. ONE ちゃちゃロット only at the bottom note. No person in panel 2 or panel 4. No カチャドクロ. No owl, bear, cat, raccoon. No 辻さん. No 代さん.

Title:「公務員の争議を、一律に禁じてよいか」
Chip:「憲法28条」
Small line:「全農林警職法事件（最大判昭48.4.25）」

Panel 1. Heading:「1. 何が起きた」
ぴっちゅ holds a small placard「警職法の改正に反対」. Label:「組合幹部（勤務中の集会を呼びかけた）」
Line:「勤務時間内の職場大会へ、参加をあおった。」
Do not draw a picket line, tied doors, or a crowd.

Panel 2. Heading:「2. 何が争いか」
No character. One large question:
「公務員の争議を一律に禁じ、あおりを刑罰にしてよいか。」
Small line:「憲法28条は、公務員にも及ぶ。」

Panel 3. Heading:「3. 多数意見（結論は合憲）」
タスク亀, label:「多数意見（禁止も処罰も合憲だと言う）」
Four short lines, not a table:
全体の奉仕者
職務は公共のもの
勤務条件は議会が決める
代償措置がある
Bottom line of this panel:「一律の禁止と、あおりの処罰は、違憲ではない。」

Panel 4. Heading:「4. 反対意見（色川）」
No character. Large line:
「禁止と刑罰を、一緒に考えてはいけない。」
Next line, same panel:「試験で『禁止と刑罰は同じ』と書いてあったら×。」
Do not write 行きすぎ. Do not write 無罪 as the judgment's conclusion.

Bottom note, pointed at by ONE ちゃちゃロット. Green lecturer suit, white shirt, green trousers, shoes, independent pale-sky-blue smiling hat with three rounded hills and a long brim, not ears, not a hood. Wooden 指し棒. No nameplate. Do not cover the panels.
Note text:「試験で書く結論は、多数意見。試験で『反対意見が判決の結論』と書いてあったら×。」
```

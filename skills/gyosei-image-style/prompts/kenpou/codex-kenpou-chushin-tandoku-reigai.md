# 憲法・国会中心立法と国会単独立法の例外

- 保存先: assets/images/deepdive/learn/kenpou/chushin-tandoku-reigai.png
- 画像キー: learn/kenpou/chushin-tandoku-reigai
- 生成は Codex。Cursor は描かない。
- 見せ方は中央の対比表。左を正解、右をひっかけにしない。両方とも原則である。ひっかけは底部カードだけ。
- 根拠: 憲法41条、58条2項、73条6号、77条、94条、95条。地方自治法261条3項・262条1項。国家行政組織法12条1項・3項。

## PRE-GENERATE-CHECK

- 中心立法の例外は、議院規則、最高裁判所の規則、条例。政令と省令は入れない。
- 単独立法の例外は、一の地方公共団体のみに適用される特別法の住民投票（95条）だけ。議院規則、最高裁規則、条例、政令、省令、憲法改正の国民投票は入れない。
- 政令は法律を執行するための命令（73条6号）。罰則は法律の委任がなければ置けない。
- 省令は、法律もしくは政令の施行、または法律もしくは政令の特別の委任で発する（12条1項）。罰則、義務の賦課、権利の制限は、法律の委任がなければ置けない（12条3項）。
- 投票期間は、通知の日から31日以後60日以内（261条3項）。過半数の同意。
- タイトルを「例外は両方とも住民投票」と読ませない。
- 「乗る」「乗らない」は使わない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 国会中心立法の例外と、国会単独立法の例外は別.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Center is ONE comparison table. Do not make the right column a trap panel. Both columns state correct rules.
Header row navy. Data rows alternate white then light gray, by row, never by column.

Title exactly:「誰が法律を作るか」と「議決だけで成立するか」は別
Chip:「41条・95条」

Columns: 項目 | 中心立法 | 単独立法
Rows, exact text:
聞くこと | 誰が法律を作るか | どう成立するか
原則 | 法律を作れるのは国会（41条） | 両議院の議決で成立する。裁可も内閣の許可も要らない
例外 | 議院規則（58条2項）。最高裁判所の規則（77条）。条例（94条） | 一の地方公共団体のみに適用される特別法は、住民投票で過半数の同意がなければ制定できない（95条）
入らない | 政令と省令。法律の下の命令であり、法律そのものではない | 議院規則、最高裁規則、条例、政令、省令、憲法改正の国民投票

Caption under the table, exact:
「政令は法律を執行するために制定する（73条6号）。省令は、法律もしくは政令を施行するため、または法律もしくは政令の特別の委任に基づいて発する（国家行政組織法12条1項）。罰則には法律の委任が要る。白紙委任はできない。」
「住民投票は、通知の日から31日以後60日以内（地方自治法261条3項）。」

Bottom three cards:
判断軸:「誰が法律を作るか。議決だけで成立するか」
ひっかけ:「試験で『政令も省令も単独立法の例外』と書いてあったら×。試験で『議院規則は単独立法の例外』と書いてあったら×」
暗記:「中心の例外は、議院規則、最高裁規則、条例。単独の例外は、95条の住民投票。政令と省令は、どちらの例外でもない。」

Roles, fixed. Keep them in the margin. Do not cover the table or the caption.
タスク亀 = 国会（法律を議決する）。Small, left margin beside 原則。参照 assets/images/characters/task_turtle.png
ぴっちゅ = 住民（特別法に同意する）。Small, right margin beside the 95条 cell。参照 assets/images/characters/pitchi.png
カチャドクロ = ひっかけ（政令を単独立法の例外と言う）。Small, inside the bottom ひっかけ card only。参照 assets/images/characters/kachadokuro.png
Labels are the roles above. Never write だれが.
ONE ちゃちゃロット only, small, bottom margin, wooden pointer toward 暗記 without covering letters.
Cream face. Independent pale-sky-blue hat: two round side peaks, low center peak, long brim, closed smiling eyes. The hat is not ears, not a cap, not a hood.
Green lecturer suit including green trousers and shoes, white shirt.
No nameplate. No logos, no watermarks, no brand names.
No owl, bear, tanuki, cat, or unnamed human.
```

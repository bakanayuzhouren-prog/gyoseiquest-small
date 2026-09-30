# 会社法・出資額、資本金、剰余金

- 保存先: assets/images/deepdive/learn/shouhou/shusshi-shihon-jouyo.png
- 画像キー: learn/shouhou/shusshi-shihon-jouyo
- 生成は Codex。Cursor は描かない。
- 既存の `shihonkin.png` は上書きしない。準備金減少の債権者異議、株式の消却は、この図に入れない。
- 根拠: 会社法445条1項・2項・3項、446条1号、453条、461条。

## PRE-GENERATE-CHECK

- 出資額は、払込みまたは給付をした財産の額（445条1項）。独立の第三の法定科目名として新しく作らない。
- 資本金は原則その額。2分の1を超えない額は資本金として計上しないことができる（445条2項）。計上しない額は資本準備金（445条3項）。全額を資本金にすることもできる。
- 例の100万円を50万円と50万円に分けるのは、2分の1を超えない額の例。ちょうど2分の1は「超えない」に含まれる。
- 剰余金は、資産の額に自己株式の帳簿価額を加え、負債、資本金および準備金、法務省令の勘定を控除した額（446条1号）。結果は、その他資本剰余金とその他利益剰余金の合計。資本準備金は剰余金に入らない。
- 払込直後の例では剰余金は0。払い込んだ100万円を剰余金の箱へ入れる矢印は禁止。
- 配当は剰余金の配当（453条）。できる額は分配可能額の範囲（461条）。資本金の箱から配当の矢印を出さない。
- 445条4項の10分の1、449条の債権者異議、消却は入れない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 出資額、資本金、剰余金は別の額.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Show the money path as three labeled containers. A comparison table may sit under the containers. Header row navy. Data rows alternate white then light gray, by row, never by column.

Title exactly:「払い込んだ額、資本金、配当の原資は別」
Chip:「445条・446条」

Left heading 論点. Short Q and A only:
出資額は？ → 払込み又は給付をした財産の額
資本金は必ずその全額？ → NO（2分の1を超えない額は資本金にしないことができる）
資本金にしなかった額は？ → 資本準備金
剰余金は資本金や資本準備金？ → NO
配当の原資は？ → 剰余金（分配可能額の範囲）

Right heading ひっかけ. Mark these as the wrong answers:
試験で「出資額はすべて資本金になる」と書いてあったら×
試験で「資本準備金は剰余金に含まれる」と書いてあったら×
試験で「資本金から直接、株主へ配当する」と書いてあったら×

Center scene, one example only:
株主が会社へ100万円を渡す。札の見出しは「出資額（払込み又は給付をした財産の額）」。
会社の帳簿が二つの引き出しに分ける。
引き出し1「資本金 50万円」。
引き出し2「資本準備金 50万円」。
Caption under the split, exact:「これは例。全額を資本金にすることもできる。資本金にしないことができるのは、払込額の2分の1を超えない額まで（445条2項・3項）。」
A third container, separate, labeled「剰余金」. Inside text:「その他資本剰余金とその他利益剰余金」.
Small caption:「446条1号の計算の結果。資本金と準備金は控除する。」
The 100万円 arrow ends at 資本金 and 資本準備金. It does not enter 剰余金.
A different small coin enters only 剰余金. Label:「事業で残った額」.
Dividend arrow leaves only 剰余金. Label:「剰余金の配当（453条）。できる額は分配可能額の範囲（461条）。」
No arrow from 資本金 or 資本準備金 to the shareholder.

Bottom three cards:
判断軸:「払い込んだ額か。資本金として計上した額か。資本金と準備金を除いたあとの額か」
ひっかけ:「全額資本金。準備金も剰余金。資本金から配当」
暗記:「2分の1を超えない額は資本金にしないことができる。その額は資本準備金。剰余金は資本金でも準備金でもない。」

Roles, fixed:
ぴっちゅ = 株主（払い込む）。Left of the 100万円。参照 assets/images/characters/pitchi.png
タスク亀 = 会社（資本金と資本準備金に分ける）。At the two drawers。参照 assets/images/characters/task_turtle.png
カチャドクロ = ひっかけ（三つの額を同じと言う）。Small, inside the right panel only。参照 assets/images/characters/kachadokuro.png
Labels under ぴっちゅ and タスク亀 are the roles above. Never write だれが.
ONE ちゃちゃロット only, small, bottom margin, wooden pointer toward 暗記 without covering letters.
Cream face. Independent pale-sky-blue hat: two round side peaks, low center peak, long brim, closed smiling eyes. The hat is not ears, not a cap, not a hood.
Green lecturer suit including green trousers and shoes, white shirt.
No nameplate. No logos, no watermarks, no brand names.
No owl, bear, tanuki, cat, or unnamed human.
```

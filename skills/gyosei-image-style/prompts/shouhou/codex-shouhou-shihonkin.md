# 会社法・資本金と資本準備金

- 保存先: assets/images/deepdive/learn/shouhou/shihonkin.png
- 画像キー: learn/shouhou/shihonkin
- 生成は Codex。Cursor は描かない。
- 根拠: 会社法445条1項〜3項、449条。株式の四変化（消却で発行済が減る）は別図。この図では消却しても資本金は減らない一点だけ触れる。

## PRE-GENERATE-CHECK

- 445条1項: 資本金の額は、設立又は株式の発行に際して株主となる者が払込み又は給付した財産の額とする。
- 445条2項: 払込み又は給付に係る額の2分の1を超えない額は、資本金として計上しないことができる。
- 445条3項: 計上しないこととした額は、資本準備金として計上しなければならない。
- 449条: 準備金の額の減少には債権者異議が原則。準備金を減少して資本金とする場合は異議手続の対象外。
- 禁止: 払込額の全額を必ず資本金にする。消却で資本金が当然に減る。全額を資本金にする振替えにも異議が要る。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 資本金の計上と準備金減少.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Title:「半分以上を資本金。消却では減らない」
Chip:「445条・449条」

Left heading 論点:
払込の全額を必ず資本金？ → NO（2分の1を超えない額は計上しないことができる）
計上しない額は？ → 資本準備金
消却で資本金は減る？ → NO
準備金の全額を資本金にするとき異議は？ → NO

Right heading ひっかけ:
払込額は全額資本金必須
消却すると資本金も当然に減る
全額を資本金にする振替えにも債権者異議が要る
定款の絶対的記載事項は資本金の額

Center ONLY: one table. Header navy. Row zebra white / light gray.
Columns: 条 | 芯
Rows:
445条1項 | 資本金は、払込み又は給付した財産の額
445条2項 | その額の2分の1を超えない額は、資本金として計上しないことができる
445条3項 | 計上しない額は資本準備金
449条 | 準備金の減少は原則として債権者異議。資本金とする場合は異議の対象外
Caption:「消却・併合・分割・無償割当ての増減表は別図」

Roles: 株式会社（資本金と準備金を分ける）／債権者（準備金減少のとき異議を述べ得る）. Never だれが.

Bottom:
- 判断軸:「2分の1を超えない額を準備金に残したか。減少の行き先は資本金か」
- ひっかけ:「全額必須。消却で資本金減少。振替えにも異議」
- 暗記:「2分の1以上を資本金。消却しても資本金は減らない。全額資本金化は異議なし」
Answer:「払込み又は給付した財産の額の2分の1を超えない額は、資本金として計上せず資本準備金とすることができる。株式の消却をしても資本金の額は減少しない。準備金の全額を資本金とする場合、債権者は異議を述べることができない。」

Guide: ONE ちゃちゃロット only. Cream face, independent pale-sky-blue smiling hat (not ears), green blazer, white shirt, green trousers, shoes, wooden 指し棒. SMALL bottom-right. No nameplate. No logos or watermarks.
```

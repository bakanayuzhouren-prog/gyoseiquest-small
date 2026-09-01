# 廃止

ピン用へ移した: `skills/gyosei-image-style/prompts/pin/codex-pin-shido-kyohi-tsuchi.md`

# 行訴・行政指導に応じなかった旨の通知（処分性なし）

- 保存先: assets/images/deepdive/learn/gyosho/shido-kyohi-tsuchi.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 既存表 `shobunsei-nashi` は定番一覧。この枚は最判平17.7.15の**通知**専用。`shobunsei-kikiwake` の「中止勧告○」をこのピンの答えにしない。

配置（生成後・Cursor）: ピン `administrative_guidance_refusal` の関連画像（`shobunsei-nashi` から差し替え）。姉妹ピン `hospital_abolition` は勧告側。

## PRE-GENERATE-CHECK（Cursor確認済み）

根拠: 最判平17.7.15。行訴法3条2項。正本 `data/pin/cases/gyosei/administrative_guidance_refusal.md`／`hospital_abolition.md`。

- 同じ判決で行為が二つ。**中止勧告**は、従わないと保険医療機関の指定を受けられない蓋然性が高く、処分性あり。**勧告に従わなかった旨の通知**は、その事実を知らせるにとどまり、権利義務を形成し又はその範囲を確定する法的効果がないから処分性なし。
- 行政庁は都道府県知事（ピンの「市長」に合わせない）。
- 社会的信用の低下・不利益感だけでは処分にならない。
- 禁止: 切る／切れない。通知を○にしない。勧告と通知を同一結論にしない。模試原文。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE holding: 行政指導に応じなかった旨の通知（最判平17.7.15）. Not the 中止勧告 holding.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「応じなかった旨の通知は、処分ではない」
Chip:「行訴3条2項。事実の通知に法的効果はない」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
通知は処分？ → NO
法的効果は？ → なし（事実の告知）
同じ判決の勧告は？ → YES（保険指定の壁）

Right panel heading ひっかけ:
信用が傷つく＝処分
不利益がある＝処分
同じ日の判例だから通知も処分
行政指導は常に処分ではない（勧告側を落とす）

Center metaphor: hospital building, paper labeled 通知, locked gate labeled 取消訴訟に乗らない. Labels under people: 開設者（通知の取消を求める）／都道府県知事（事実を通知した）. Small stamp 却下. Do not cover text.

Bottom three cards:
判断軸: 権利義務を形成し、又はその範囲を確定する法的効果があるか（行訴3条2項）
ひっかけ: 社会的信用の低下だけで処分にしない。勧告と通知を混ぜない
暗記: 通知は事実の告知で×。中止勧告は保険指定の壁で○になり得る

Answer bar EXACT:
「行政指導に応じなかった旨の通知は、事実を知らせるにとどまり、権利義務を確定する法的効果がないから処分ではない。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 結論は通知＝処分性なし・却下
- [ ] 中止勧告をこの枚の答え帯で○にしていない（論点Qの短答のみ）
- [ ] 市長になっていない（知事）

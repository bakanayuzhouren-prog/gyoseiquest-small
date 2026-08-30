# 記述解説図・民法記述Q1-2（126条）— X最低ライン（q26-2基準）

- 保存先: assets/images/deepdive/textbook/minpou-kijutsu/q1.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png` および `q1-1.png`
- **既存の q1.png を上書きする。** pending 待ちではない。てらしぃが Codex にこのファイルを指定して上書きさせる。
- **生成は Codex。Cursor は描かない。**
- **`q1-1.png` と `q1-1-2.png` は上書きしない**

見出し見本（論点／ひっかけ／役割）は本ファイルに合わせる。以降の記述図も同じ型。

## PRE-GENERATE-CHECK（Cursor確認済み・e-Gov）

民法126条: 取消権は、追認をすることができる時から五年間行使しないときは、時効によって消滅する。行為の時から二十年を経過したときも、同様とする。

答案の芯（変更しない）:
`Xは追認できる時から５年又は行為の時から２０年以内に取消権を行使すればよい。`（38字）

- ５年＝追認をすることができる時から
- ２０年＝行為の時から
- 両方を「行為の時」に揃えない
- 自転車の取消可否は別問（Q1-1・13条）。詐術・Bの善意はひっかけ
- 「切る」禁止。GOとYES混在禁止。「だれが」「問が聞くこと」禁止
- 案内役＝ちゃちゃロットのみ（`approved-chachalot-pointer.png`）。眼鏡禁止

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし 民法記述 Q1-2 (Civil Code 126). OVERWRITE q1.png only. Do NOT touch q1-1.png or q1-1-2.png.
Quality bar: same density and stylish legal Japanese as q26-2.png and q1-1.png.
16:9 warm off-white, slightly POP (thicker outlines, clear colors, large gothic Japanese, generous padding). ZERO overlapping glyphs. Explanation text is the priority.

Match LAYOUT of「主宰者の許可」: navy title, left green「論点」, right orange「ひっかけ」, ONE center metaphor, bottom 判断軸 / ひっかけ / 暗記, navy answer bar.

STRICT:
- Left「論点」Q&A only. NO GO/STOP. Do not mix GO and YES. Only the first row may say YES. Rows 2–3 are short phrases, not YES.
- Right「ひっかけ」. Never「（聞かない）」.
- Never write「だれが」. Never write 切る／切れない.
- Write periods as ５年／２０年 (full-width). Never leave 126条 as a number-only label without the years.
- Do NOT put a red X on「行為の時」(20 years DOES start from the act). The trap is treating BOTH periods as starting from the act.

Title (stylish one point):「追認できる時から５年、行為の時から２０年」
Chip:「自転車の取消可否は別問（13条）」

Left 論点:
1. 土地売買は取り消せる？ → YES（13条1項・120条）
2. ５年の起算は？ → 追認することができるとき（126条）
3. ２０年の起算は？ → 行為の時（126条）

Center: 甲土地 scene. Labels MUST be:
「保佐人（契約を取り消したい）」
「相手方（売買の相手）」
Object tag:「甲土地」

Right ひっかけ:
- 自転車の日常購入（13条・別問）
- 詐術の有無
- Bの善意
- ５年も２０年も「行為の時から」に揃える

Bottom:
- 判断軸:「５年は追認できる時から。２０年は行為の時から（126条）」
- ひっかけ:「自転車・詐術・善意に釣られるな。問は甲土地の期間だけ」
- 暗記:「追認できる時から５年／行為の時から２０年」
Answer EXACT:
「Xは追認できる時から５年又は行為の時から２０年以内に取消権を行使すればよい。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png exactly: cream face, circle eyes, pale-sky-blue HAT (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. SMALL bottom-right cream margin ABOVE navy bar. Optional tiny「ちゃちゃロット」on jacket torso only. Pointer must not cover letters. Never a name tag on the answer bar.
```

## 生成後チェック

- [ ] 答え帯＝答案の芯（追認できる時から５年／行為の時から２０年）
- [ ] ５年と２０年の起算が入れ替わっていない
- [ ] 「切る」なし
- [ ] ちゃちゃロット以外なし・眼鏡なし
- [ ] `q1-1.png` / `q1-1-2.png` 未変更
- [ ] てらしぃ目視でX可否

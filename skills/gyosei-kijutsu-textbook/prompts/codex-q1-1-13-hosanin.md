# 記述解説図・民法記述Q1-1（13条／120条）— X最低ライン（q26-2基準）

- 保存先: assets/images/deepdive/textbook/minpou-kijutsu/q1-1.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- **`q1.png`（Q1-2・126条）は上書きしない**

## 条文（生成前確認済み）

- **13条1項**: 被保佐人が各号の行為をするには保佐人の同意が要る。**ただし書**＝第9条ただし書に規定する行為はこの限りでない。
- **9条ただし書**（13条が参照）: 日用品の購入その他日常生活に関する行為。
- **13条1項三号**: 不動産その他重要な財産に関する権利の得喪を目的とする行為 → 甲土地売買はここ。
- **120条1項**: 行為能力の制限によって取り消すことができる行為は、制限行為能力者又はその代理人、承継人若しくは同意をすることができる者に限り、取り消すことができる。保佐人は取消し得る者。

## 答案の芯（変更しない）

`不動産売買は同意を要する行為だが、自転車購入はこれに当たらないので取り消せない。`

## 切るポイント（図に載せる核）

- 分かれ目は **13条1項各号に当たるか**
- 自転車は各号に当たらず、かつ **日用品の購入その他日常生活に関する行為（9条ただし書＝13条1項ただし書）**
- 未成年者5条と入口を混ぜない（結論ラベルを「5条」にしない）
- 期間（126）・詐術・善意・追認は別／ひっかけ

## 禁止

- 「切る／切れない」禁止
- GO と YES 混在禁止。「だれが」「問が聞くこと」禁止
- フクロウ・クマ・タヌキ・猫禁止。案内役＝ちゃちゃロットのみ（`approved-chachalot-pointer.png`）
- 答え帯に名札を載せない。胴体への極小「ちゃちゃロット」は可
- 126の5年／20年を答え帯・論点のYES/NOに書かない（チップ・ひっかけには具体期間を書く）
- 13条各号の全文表は2枚目（`codex-q1-1-2-13-hyo.md` / `q1-1-2.png`）

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし 民法記述 Q1-1.
Do NOT overwrite q1.png. Quality bar: same density and stylish legal Japanese as q26-2.png.
16:9 warm off-white, slightly POP (thicker outlines, clear colors, large gothic Japanese, generous padding). ZERO overlapping glyphs. Explanation text is the priority.

Match LAYOUT of「主宰者の許可」: navy title, left green「論点」, right orange「ひっかけ」, ONE center metaphor, bottom 判断軸 / ひっかけ / 暗記, navy answer bar.

STRICT:
- Left「論点」Q&A only. NO GO/STOP. Do not mix GO and YES.
- Right「ひっかけ」. Never「（聞かない）」.
- Never write「だれが」. Never write 切る／切れない.
- 答え帯・論点①②のYES/NOに５年／２０年を書かない（答案の芯は同意行為か）。チップとひっかけには、初学者がピンとくるよう **具体期間** を書く。
- Do NOT make the answer label「未成年者5条」. Entry is 保佐・13条. Daily-life is via 13条1項ただし書→9条ただし書. ひっかけでは「5条（未成年の取消し）」と書く。

Title (stylish one point):「自転車購入は、同意を要する行為に当たらない」
Chip:「期間は別問。追認できる時から５年／行為の時から２０年（126条）」

Left 論点:
1. 土地売買は取り消せる？ → YES（13条1項・120条）
2. 自転車購入は取り消せる？ → NO
3. 自転車が取り消せない理由は？ → 各号に当たらず、日用品の購入その他日常生活に関する行為（9条ただし書＝13条1項ただし書）

Center: one VS scene — 甲土地 house vs 自転車. Labels MUST be:
「保佐人（取り消したい）」
「相手方（売買の相手）」
Object tags:「甲土地」「自転車」

Right ひっかけ:
- 取消しの期間 ← 追認できる時から５年、行為の時から２０年（126条・別問）
- 詐術の有無
- Bの善意
- 未成年者5条（未成年の取消し）と入口を混ぜる
- 追認の話で終わる

Bottom:
- 判断軸:「同意を要する行為（13条1項各号）なら取消可。日常生活（9条ただし書）は取消不可」
- ひっかけ:「期間（５年／２０年）・詐術・善意・5条（未成年の取消し）に釣られるな」
- 暗記:「不動産＝同意要。自転車＝日常生活なので取り消せない」
Answer EXACT:
「不動産売買は同意を要する行為だが、自転車購入はこれに当たらないので取り消せない。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png exactly: cream face, circle eyes, pale-sky-blue HAT (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. SMALL bottom-right cream margin ABOVE navy bar. Optional tiny「ちゃちゃロット」on jacket torso only. Pointer must not cover letters. Never a name tag on the answer bar.
```

## 生成後チェック

- [ ] 答え帯＝答案の芯
- [ ] 日常生活フレーズが論点にフルである
- [ ] 「切る」なし
- [ ] ちゃちゃロット以外なし
- [ ] `q1.png` 未変更
- [ ] てらしぃ目視でX可否

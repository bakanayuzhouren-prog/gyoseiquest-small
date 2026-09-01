# 記述解説図・民法記述Q15 2枚目（193条と占有回収の比較表）

- 保存先: assets/images/deepdive/textbook/minpou-kijutsu/q15-2.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- **`q15.png`（1枚目・2年回復）と `q16.png` は上書きしない。**

## PRE-GENERATE-CHECK（e-Gov）

民法193条: 占有物が盗品又は遺失物であるときは、被害者又は遺失者は、盗難又は遺失の時から二年間、占有者に対してその物の回復を請求することができる。
民法200条1項: 占有者がその占有を奪われたときは、占有回収の訴えにより、その物の返還及び損害の賠償を請求することができる。
民法201条3項: 占有回収の訴えは、占有を奪われた時から一年以内に提起しなければならない。

対象: 193条は盗品・遺失物のみ。詐欺・恐喝・横領は盗品・遺失物に当たらない。
占有回収の入口は侵奪。遺失は侵奪ではない。詐欺は自ら引き渡したので侵奪ではない（大判大11.11.27）。

この枚は比較表。1枚目の答案（盗難又は遺失の時から２年間…）と矛盾させない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. This is PAGE 2 of 民法記述 Q15. Save q15-2.png. Do NOT overwrite q15.png or q16.png.
Quality: q26-2.png. 16:9 warm off-white, POP, large gothic Japanese, ZERO overlap.

This page is a COMPARISON TABLE. One point: 193条の対象と200条の侵奪を混ぜない。

LAYOUT: navy title, left「論点」, right「ひっかけ」, MAIN center is one table, bottom 判断軸 / ひっかけ / 暗記, navy answer bar.

Title:「詐欺は193条の外。遺失は占有回収の外」
Chip:「1枚目は2年回復。この表は対象の聞き分け」

Left 論点:
1. 193条の対象は？ → 盗品・遺失物だけ
2. 詐欺は193条か？ → NO
3. 遺失は占有回収か？ → NO（侵奪ではない）

MAIN table. Columns: 離脱 | 193条 | 200条
Data rows EXACT. Row backgrounds alternate by ROW (not by column): first data row white, second light gray, then white, then light gray.
盗品（盗取） | ○ 盗難時から2年 | ○ 侵奪時から1年
遺失 | ○ 遺失時から2年 | × 侵奪ではない
詐欺・恐喝 | × 盗品・遺失物でない | × 侵奪ではない
横領（預けた） | × | × 自ら占有を移した

Right ひっかけ:
- 詐欺でも193条の2年回復ができる
- 遺失でも占有回収の訴えができる
- 起算は占有開始時
- 193条の2年と占有回収の1年を入れ替える

Bottom:
- 判断軸:「盗品・遺失物か。侵奪か」
- ひっかけ:「詐欺を193条に入れない。遺失を占有回収に入れない」
- 暗記:「193条は盗品・遺失物だけ。200条は侵奪だけ」
Answer EXACT:
「詐欺は193条の対象外。遺失は占有回収の対象外。」

Guide: ONE ちゃちゃロット. Green full suit (white shirt, trousers, shoes). Bottom-right cream margin ABOVE the answer bar. No name tag. Do not cover the table or answer bar.
```

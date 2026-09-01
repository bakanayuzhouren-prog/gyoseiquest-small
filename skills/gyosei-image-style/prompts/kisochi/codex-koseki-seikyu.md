# 戸籍法・本人等の請求と第三者請求

- 保存先: assets/images/deepdive/learn/koseki/seikyu.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 戸籍法10条、10条の2

配置（生成後・Cursor）: 見て聞いて覚える・戸籍法の比較カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 戸籍に記載されている者及びその配偶者、直系尊属、直系卑属は謄本等の交付を請求できる（10条）。本人等に市町村長の許可は要らない。
- 第三者は、自己の権利を行使し又は義務を履行する必要がある場合など、法律の定める事由があるときに限り請求できる（10条の2）。
- 禁止: 興味があれば誰でも見られる、本人でも許可が要る、と書く。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 戸籍謄本等の請求権者。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「本人等は10条。第三者は10条の2」
Chip:「戸籍10条／10条の2」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
本人等は当然に請求できる？ → YES
本人に市町村長の許可は要る？ → NO
第三者は自由に見られる？ → NO
第三者に要るのは？ → 法律の定める事由

Right panel heading ひっかけ:
本人でも市町村長の許可が要る
興味があれば誰でも見られる
第三者も10条で当然請求
住基の閲覧と全部同じ

MAIN: one clean table. Columns: 対比 | 本人等（10条） | 第三者（10条の2）
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
誰か | 記載されている者・配偶者・直系尊属・直系卑属 | それ以外
請求 | 当然にできる | 法律の定める事由があるときに限る
許可 | 市町村長の許可は要らない | 事由の有無が芯
ひっかけ | 本人でも許可、と言う | 興味があれば誰でも

Small center metaphor: a family pass labeled 10条 and a gate labeled 10条の2. Do not cover the table.

Bottom three cards:
判断軸: 本人等か第三者か
ひっかけ: 許可と自由閲覧を入れ替える
暗記: 本人等は当然に請求できる。第三者請求は正当理由が要る

Answer bar EXACT:
「戸籍に記載されている者及びその配偶者、直系尊属、直系卑属は謄本等を請求できる。第三者は法律の定める事由があるときに限る。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 10条と10条の2が入れ替わっていない
- [ ] 行ゼブラ

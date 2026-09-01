# 隣地使用・本文と住家

- 保存先: assets/images/deepdive/learn/minnpou/rinchi-sumika.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 民法209条1項本文・ただし書、2項〜4項
- 著作権: 模試の肢の全文は転載しない。

配置（生成後・Cursor）: 見て聞いて覚える・民法物権（TACパック相隣と公開模試・住家）。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 1項本文: 土地の所有者は、境界又はその付近における障壁、建物その他の工作物の築造、収去若しくは修繕、境界標の調査又は測量、233条3項の枝の切除のため必要な範囲内で隣地を使用できる。
- 1項ただし書: 住家については、その居住者の承諾がなければ立ち入れない。
- 承諾なく隣地に入れる、は本文の話。住家にそのまま当てると誤り。
- 禁止: 住家にも承諾不要、隣地使用は常に承諾必須、と答え帯に書く。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 民法209条の隣地使用。本文と住家のただし書を分ける。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「隣地は本文で入れる。住家は居住者の承諾」
Chip:「209条1項」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
隣地に承諾は常に要る？ → NO
住家に承諾は要る？ → YES
通知は要る？ → YES（困難なら事後）
償金は？ → 損害があれば請求可

Right panel heading ひっかけ:
承諾なく土地に入れるから住家にも入れる
隣地使用は常に所有者の承諾が要る
209条と233条の枝切りを同じにする
袋地通行と隣地使用を混ぜる

MAIN: one clean table. Columns: 対比 | 隣地（本文） | 住家（ただし書）
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
入れるか | 法定の目的・必要範囲なら使用できる | 居住者の承諾がなければ立ち入れない
承諾 | 所有者の承諾が常に要るわけではない | 居住者の承諾が必要
手続 | 最少損害の日時場所方法。あらかじめ通知 | 承諾が先。通知だけでは足りない
損害 | 償金の請求ができる（4項） | 住家に無断で入ることはできない

Small center metaphor: a yard labeled 隣地 and a house labeled 住家. Do not cover the table.

Bottom three cards:
判断軸: いま入る場所は隣地か住家か
ひっかけ: 本文の結論を住家へ横流しする
暗記: 隣地は本文。住家は居住者の承諾。通知と償金は別

Answer bar EXACT:
「隣地使用は法定の目的と必要範囲があれば、隣地所有者の承諾がなくてもできる。住家については、その居住者の承諾がなければ立ち入れない。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 本文とただし書が入れ替わっていない
- [ ] 住家は居住者の承諾
- [ ] 行ゼブラ

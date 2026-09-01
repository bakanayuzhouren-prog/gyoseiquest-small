# 戸籍法・創設的届出と報告的届出

- 保存先: assets/images/deepdive/learn/koseki/toushutsu.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: 戸籍法の届出の性質（婚姻等は創設的、出生・死亡は報告的）

配置（生成後・Cursor）: 見て聞いて覚える・戸籍法の比較カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 婚姻届は届出によって効力が生じる創設的届出。縁組・協議離婚も創設的。
- 出生届と死亡届は既に生じた事実を報告する報告的届出。届出で子が生まれるわけではない。
- 禁止: 出生届を出して初めて子が生まれる、と書く。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 創設的届出と報告的届出。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「婚姻は創設。出生と死亡は報告」
Chip:「戸籍の届出の性質」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
婚姻届は？ → 創設的
出生届は？ → 報告的
死亡届は？ → 報告的
縁組・協議離婚は？ → 創設的

Right panel heading ひっかけ:
出生届を出して初めて子が生まれる
死亡も届出で初めて死亡する
婚姻は報告的
創設と報告を全部同じにする

MAIN: one clean table. Columns: 種類 | 効果の生じ方 | 例
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
創設的届出 | 届出によって身分変動の効力が生じる | 婚姻・縁組・協議離婚
報告的届出 | 既に生じた事実を報告する | 出生・死亡
出生を創設にすると | 誤り | 届出前に子は生まれている
届出地の話と混ぜるな | 性質の話である | 本籍地のみ、と横流ししない

Small center metaphor: a stamp labeled 創設 and a report paper labeled 報告. Do not cover the table.

Bottom three cards:
判断軸: 届出で効力が生まれるか、事実の報告か
ひっかけ: 出生を創設にする
暗記: 婚姻は創設。出生死亡は報告

Answer bar EXACT:
「婚姻届は届出によって効力が生じる創設的届出である。出生届と死亡届は既に生じた事実を報告する報告的届出である。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 婚姻＝創設、出生死亡＝報告
- [ ] 行ゼブラ

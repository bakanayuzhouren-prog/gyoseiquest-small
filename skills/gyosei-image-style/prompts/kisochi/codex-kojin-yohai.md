# 個情法・要配慮と個人識別符号

- 保存先: assets/images/deepdive/learn/kojinjoho/yohai.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 個人情報保護法2条1項2号・2項・3項、20条2項、27条2項

配置（生成後・Cursor）: 見て聞いて覚える・個人情報の比較カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 個人識別符号が含まれる情報は、他情報との容易照合を要せず個人情報。クレカ番号は個人識別符号ではない。
- 要配慮は人種・信条・社会的身分・病歴・犯罪の経歴・犯罪被害の事実など。信条本体と寺院訪問・関連書籍購入は分ける。
- 要配慮は原則としてあらかじめ本人の同意なく取得してはならない。オプトアウトによる第三者提供の対象にできない。
- 禁止: 要配慮もオプトアウト可、クレカ番号は符号、と答え帯に書く。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 要配慮個人情報と個人識別符号。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「符号は単体で個人情報。要配慮はオプトアウト不可」
Chip:「2条／20条／27条」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
符号は照合が要る？ → NO
クレカ番号は符号？ → NO
信条本体は要配慮？ → YES
要配慮のオプトアウトは？ → 不可

Right panel heading ひっかけ:
符号でも照合が必要
クレカ番号＝個人識別符号
寺院訪問だけで要配慮
要配慮もオプトアウト可

MAIN: one clean table. Columns: 対比 | 正しい芯 | 誤り
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
個人識別符号 | 単体で個人情報（容易照合不要） | 照合して初めて個人情報
クレカ番号 | 符号ではない（結びつくと個人情報になり得る） | 符号そのもの
要配慮の本体 | 信条・病歴・犯罪経歴など | 訪問・購入だけで自動的に要配慮
取得・提供 | 取得は同意が原則。オプトアウト不可 | 要配慮もオプトアウト可

Small center metaphor: a lock labeled 要配慮 and a chip labeled 符号. Do not cover the table.

Bottom three cards:
判断軸: 符号か要配慮か、本体か周辺か
ひっかけ: クレカと符号、訪問と信条を混ぜる
暗記: 符号は単体で個人情報。要配慮は取得に同意が原則。オプトアウト不可

Answer bar EXACT:
「個人識別符号は単体で個人情報となる。クレジットカード番号は符号ではない。要配慮個人情報はオプトアウトによる第三者提供の対象にできない。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] クレカ番号は符号ではない
- [ ] 要配慮はオプトアウト不可
- [ ] 行ゼブラ

# 個情法・定義の階層

- 保存先: assets/images/deepdive/learn/kojinjoho/teigi.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 個人情報保護法2条・16条

配置（生成後・Cursor）: 見て聞いて覚える・個人情報の比較カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 個人情報＝生存する個人に関する情報で特定の個人を識別できるもの（符号を含む）。
- 個人データ＝個人情報データベース等を構成する個人情報。
- 保有個人データ＝開示・訂正・利用停止等を行う権限を事業者が有する個人データ。
- 個人関連情報＝氏名などと結びついていない閲覧履歴など。すぐ個人データ・匿名加工と言わない。
- 国・地方・独法はここでいう個人情報取扱事業者ではない（別章）。
- 禁止: 保有個人データ＝データベース等そのもの、と書く。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 個人情報／個人データ／保有個人データ。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「識別できるか。権限があるか。階層を混ぜない」
Chip:「2条／16条」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
個人情報の入口は？ → 識別できるか
個人データは？ → データベース等を構成
保有個人データは？ → 開示訂正等の権限あり
国・地方は取扱事業者？ → NO

Right panel heading ひっかけ:
公知だから個情法の外
保有個人データ＝データベース等そのもの
国地方独法＝取扱事業者
氏名がなければ常に対象外

MAIN: one clean table. Columns: 語 | 芯 | ひっかけ
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
個人情報 | 生存する個人を識別できる情報（2条） | 公知・法人そのものは全部外
個人データ | データベース等を構成する個人情報 | 単発のメモ全部が個人データ
保有個人データ | 開示・訂正等の権限がある個人データ | 委託先にも常にある
個人関連情報 | 氏名なし履歴など（すぐ個人データではない） | 匿名加工と同じ

Small center metaphor: three nested boxes labeled 個人情報 then 個人データ then 保有個人データ. Do not cover the table.

Bottom three cards:
判断軸: 識別か、体系か、権限か
ひっかけ: 階層を一語に潰す
暗記: 権限がある側が保有個人データ。行政機関等は取扱事業者ではない

Answer bar EXACT:
「個人情報は識別。個人データはデータベース等。保有個人データは開示訂正等の権限がある側である。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 三階層が入れ替わっていない
- [ ] 行政機関等は取扱事業者ではない
- [ ] 行ゼブラ

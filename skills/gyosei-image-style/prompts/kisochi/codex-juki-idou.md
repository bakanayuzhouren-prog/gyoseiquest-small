# 住基法・転入転居転出

- 保存先: assets/images/deepdive/learn/juki/idou.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 住民基本台帳法22条、23条、24条

配置（生成後・Cursor）: 見て聞いて覚える・住民基本台帳法の異動届カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 転入＝新たに市町村の区域内に住所を定めること（出生による場合を除く）。した日から14日以内（22条）。
- 転居＝一の市町村の区域内において住所を変更すること。した日から14日以内（23条）。
- 転出＝あらかじめ氏名・転出先・転出の予定年月日（24条）。事後14日ではない。1か月ではない。
- 出生の14日（戸籍）と転入の14日を混ぜない。
- 禁止: 切る。転出を事後14日。全部1か月。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 転入・転居・転出.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「転入転居は14日。転出はあらかじめ」
Chip:「22条・23条・24条」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
転入は？ → した日から14日
転居は？ → した日から14日
転出は？ → あらかじめ
1か月で足りる？ → NO

Right panel heading ひっかけ:
転入転居は1か月で足りる
転出も事後14日
転居を他市町村への引越しにする
出生の14日と転入の14日を同じ制度にする

MAIN: one clean table. Columns: 届出 | 意味 | 期限
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
転入（22条） | 新たに市町村の区域内に住所を定める | した日から14日以内
転居（23条） | 同一市町村内で住所を変更する | した日から14日以内
転出（24条） | 他の市町村へ住所を移す | あらかじめ（予定年月日まで）
出生届（戸籍） | 身分の報告 | 14日以内（混ぜない）

Small center metaphor: three moving boxes labeled 転入／転居／転出. Arrow on 転出 says 事前. Do not cover the table.

Bottom three cards:
判断軸: 同一市町村か他市町村か、事前か事後か
ひっかけ: 1か月、転出の事後、戸籍の14日
暗記: 転入転居は14日。転出はあらかじめ

Answer bar EXACT:
「転入と転居はした日から14日以内。転出はあらかじめ届け出る。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 転入22・転居23＝14日、転出24＝あらかじめ
- [ ] 1か月が正解になっていない
- [ ] 行ゼブラ

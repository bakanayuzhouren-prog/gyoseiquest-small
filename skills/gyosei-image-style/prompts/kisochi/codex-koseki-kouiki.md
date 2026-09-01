# 戸籍法・証明書の広域交付と届出地

- 保存先: assets/images/deepdive/learn/koseki/kouiki.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: 戸籍証明書の広域交付、届出地（発生地・所在地・本籍地。死亡は死亡地も可）

配置（生成後・Cursor）: 見て聞いて覚える・戸籍法の比較カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 本人等は本籍地以外の市町村窓口でも戸籍証明書を請求できる場合がある（広域交付）。証明書は本籍地のみ、は古い理解。
- 出生届と死亡届は、届出事件の発生地、届出人の所在地又は本籍地ですることができる。死亡届は死亡地でもできる。
- 禁止: 証明書の話と届出の提出先を一つの「本籍地のみ」に潰す。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 戸籍証明書の広域交付と届出地。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「証明書は広域交付。届出は発生地・所在地・本籍地」
Chip:「請求と届出を分ける」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
証明書は本籍地のみ？ → NO（広域交付あり）
届出は必ず本籍地？ → NO
出生・死亡の届出地は？ → 発生地・所在地・本籍地
死亡届の死亡地は？ → できる

Right panel heading ひっかけ:
証明書は本籍地のみ（古い理解）
届出も広域交付と同じ手続
必ず本籍地
住基の広域交付と全部同じ条文

MAIN: one clean table. Columns: 対比 | 証明書の請求 | 届出の提出
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
本籍地以外 | 本人等は広域交付できる場合がある | 発生地・所在地でもできる
本籍地のみ？ | 古い理解 | 誤り
死亡 | 証明書の話ではない | 死亡地でも届出できる
混ぜるな | 写しを取る話 | 届を出す話

Small center metaphor: a counter window labeled 広域交付 and a mailbox labeled 届出地. Do not cover the table.

Bottom three cards:
判断軸: 今は証明書か届出か
ひっかけ: 本籍地のみに全部を落とす
暗記: 戸籍証明書は広域交付がある。届出は発生地、所在地、本籍地

Answer bar EXACT:
「本人等は本籍地以外でも戸籍証明書を請求できる場合がある。出生届と死亡届は発生地、所在地又は本籍地ですることができる。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 証明書と届出が別列
- [ ] 行ゼブラ

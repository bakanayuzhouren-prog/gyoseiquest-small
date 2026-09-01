# 住基法・閲覧と写し

- 保存先: assets/images/deepdive/learn/juki/etsuran-kofu.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 住民基本台帳法11条、11条の2、12条、12条の4

配置（生成後・Cursor）: 見て聞いて覚える・住民基本台帳法の閲覧・広域交付カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 11条: 国又は地方公共団体の機関は、法令事務の遂行に必要な場合、一部の写しの閲覧を請求できる。
- 11条の2: 公益性の高い調査研究等の申出があり、市町村長が相当と認めるときに閲覧させることができる。営利目的だけでは足りない。3号は営利以外の居住関係確認。
- 12条: 本人等は自己又は同一世帯の住民票の写し・記載事項証明書を請求できる。
- 12条の4: 住所地以外の市町村長へ、自己又は同一世帯の写しの広域交付を請求できる場合がある。個人番号カード等の提示。
- 禁止: 切る。営利なら必ず閲覧。広域交付と一部閲覧を同じにする。11条と11条の2を混ぜて「誰でも閲覧」。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 住基の閲覧と写し交付.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「写しの交付と、台帳の一部閲覧は別物」
Chip:「11条・11条の2・12条・12条の4」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
本人の写しは？ → 請求できる（12条）
広域交付は？ → できる場合がある
民間の閲覧は？ → 相当と認めるとき
営利だけ？ → NO

Right panel heading ひっかけ:
営利目的なら市町村長は必ず閲覧させる
写しは住所地の市町村だけ
一部閲覧＝本人の写し交付
誰でも自由に台帳を見る

MAIN: one clean table. Columns: 制度 | 誰 | 要件
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
機関の閲覧（11条） | 国・地方公共団体の機関 | 法令事務の遂行に必要
民間の閲覧（11条の2） | 申出者 | 公益性のある活動等＋相当と認めるとき
本人等の写し（12条） | 本人・同一世帯 | 住所地の市町村長へ請求
広域交付（12条の4） | 本人・同一世帯 | 住所地以外でも写しを請求できる場合がある

Small center metaphor: a counter window 写し交付 and a locked book 一部閲覧. Do not cover the table.

Bottom three cards:
判断軸: 写しの交付か、台帳の一部閲覧か
ひっかけ: 営利なら当然閲覧、住所地のみ
暗記: 本人の写しは12条。民間閲覧は11条の2で相当性。広域交付は12条の4

Answer bar EXACT:
「本人の写しは請求できる。一部閲覧は相当性。営利目的だけでは足りない。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 11条と11条の2が分かれている
- [ ] 営利がGOになっていない
- [ ] 12条の4が広域交付

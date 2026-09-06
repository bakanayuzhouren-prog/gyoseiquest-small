# 住民票・戸籍の附票・番号

- 保存先: assets/images/deepdive/learn/juki/fuuhyo-bangou.png
- 画像キー: learn/juki/fuuhyo-bangou
- 生成は Codex。Cursor は描かない。
- 根拠: 住民基本台帳法、戸籍法の附票、番号法。閲覧・広域交付の詳細は既存図。

## PRE-GENERATE-CHECK

- 住民票: 住所地の市町村。世帯。現在の住所。
- 戸籍の附票: 本籍地の市町村。戸籍単位。住所の変遷。
- 個人番号は市町村長が個人に指定する（番号法7条）。法人番号は国税庁長官が法人等に指定する。対象と指定権者を混ぜない。
- 公的個人認証: マイナンバーカード等の電子証明書による本人確認。住民基本台帳に記録される外国人住民も対象。
- 禁止: 附票＝住所地が作る。法人番号＝マイナンバー。公的個人認証は日本国籍だけ。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 住民票と戸籍の附票と番号の単位.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Title:「住所地か、本籍地か」
Chip:「住基・戸籍附票・番号法」

Left heading 論点:
住民票の作成は？ → 住所地の市町村
附票の作成は？ → 本籍地の市町村
個人番号は誰に？ → 個人
法人番号は誰に？ → 法人
公的個人認証は外国人住民も？ → YES

Right heading ひっかけ:
附票も住所地が作る
法人にも個人番号を付ける
公的個人認証は日本国籍者だけ
広域交付と附票を同じ制度にする

Center ONLY: one table. Header navy. Row zebra white / light gray.
Columns: 制度 | 作成・指定する者 | 単位・対象
Rows:
住民票 | 住所地の市町村 | 世帯。現在の住所等
戸籍の附票 | 本籍地の市町村 | 戸籍。住所の変遷
個人番号 | 市町村長が指定（番号法7条） | 個人
法人番号 | 国税庁長官が指定 | 法人等。個人番号ではない
公的個人認証 | 機構の電子証明書 | 住基に記録される外国人住民も対象
Caption:「本人等の写し・広域交付の要件表は別図。番号の行は作成主体ではなく指定権者」

Roles: 住民（写しを請求する）／市町村長（台帳を作る）.

Bottom:
- 判断軸:「住所の現在は住民票。変遷は附票。番号は個人と法人で別」
- ひっかけ:「附票＝住所地。法人＝個人番号。認証は国籍者だけ」
- 暗記:「附票は本籍地。法人番号は法人。公的個人認証は外国人住民も」
Answer:「住民票は住所地の市町村が世帯単位で作る。戸籍の附票は本籍地の市町村が戸籍単位で住所の変遷を記載する。法人番号は個人番号ではない。」

Guide: ONE ちゃちゃロット only. Cream face, independent pale-sky-blue smiling hat (not ears), green blazer, white shirt, green trousers, shoes, wooden 指し棒. SMALL bottom-right. No nameplate. No logos or watermarks..
```

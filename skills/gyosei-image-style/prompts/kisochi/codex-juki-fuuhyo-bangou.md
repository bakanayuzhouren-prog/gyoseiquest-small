# 住民票と戸籍の附票

- 保存先: assets/images/deepdive/learn/juki/fuuhyo-bangou.png
- 画像キー: learn/juki/fuuhyo-bangou
- 生成は Codex。Cursor は描かない。
- 根拠: e-Gov 住民基本台帳法6条・16条。番号法は本図に置かない。

## PRE-GENERATE-CHECK

本図は住基法の2制度だけ。個人番号・法人番号・公的個人認証を表にも論点にも書くな。

- 6条1項: 市町村長は、**個人を単位**とする住民票を**世帯ごとに編成**して、住民基本台帳を作成しなければならない。住所地。
- 6条2項: 適当と認めるときは、住民票の全部又は一部につき世帯を単位とすることができる。
- 16条1項: 市町村長は、その市町村の区域内に**本籍を有する者**につき、その**戸籍を単位**として、戸籍の附票を作成しなければならない。根拠は住基法。戸籍法ではない。

禁止: 住民票＝世帯単位だけ（個人を単位を落とす）。附票＝住所地。附票＝戸籍法。番号行を足す。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 住民票（住基法6条）と戸籍の附票（住基法16条）.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Title:「住所地か、本籍地か」
Chip:「住基法6条・16条」

Left heading 論点:
住民票は誰が作るか？ → 住所地の市町村長
住民票の単位は？ → 個人を単位とし、世帯ごとに編成（6条1項）
附票は誰が作るか？ → 本籍地の市町村長
附票の根拠は戸籍法か？ → NO（住基法16条）

Right heading ひっかけ:
附票も住所地が作る
附票の根拠は戸籍法である
住民票は最初から世帯単位だけである
広域交付と附票を同じ制度にする

Center ONLY: one table. Header navy. Row zebra white / light gray.
Columns: 制度 | 作成 | 単位
Rows:
住民票（6条） | 住所地の市町村長 | 個人を単位。世帯ごとに編成
戸籍の附票（16条） | 本籍地の市町村長（区域内に本籍を有する者） | 戸籍を単位。住所の変遷
Caption:「6条2項は、適当と認めるときは世帯を単位とすることができる。番号法は本図に置かない」

Roles: 住民（写しを請求する）／市町村長（台帳を作る）.

Bottom:
- 判断軸:「現在の住所は住民票か。住所の変遷は附票か。作成地は住所地か本籍地か」
- ひっかけ:「附票＝住所地。附票＝戸籍法。住民票＝最初から世帯単位だけ」
- 暗記:「住民票は住所地。個人を単位とし世帯ごとに編成。附票は本籍地。戸籍単位。どちらも住基法」
Answer:「市町村長は、個人を単位とする住民票を世帯ごとに編成して住民基本台帳を作成する。戸籍の附票は、区域内に本籍を有する者につき、戸籍を単位として本籍地の市町村長が作成する。」

Guide: ONE ちゃちゃロット only. Cream face, independent pale-sky-blue smiling hat (not ears), green blazer, white shirt, green trousers, shoes, wooden 指し棒. SMALL bottom-right. No nameplate. No logos or watermarks.
```

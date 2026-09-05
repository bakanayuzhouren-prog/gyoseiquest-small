# 検閲と事前抑制

- 保存先: assets/images/deepdive/learn/kenpou/kenetsu-jizen.png
- 画像キー: learn/kenpou/kenetsu-jizen
- 生成は Codex。Cursor は描かない。
- 根拠: 憲法21条2項。検閲の定義は最高裁（税関検査・北方ジャーナルの枠）。集会・公の施設の利用拒否はひっかけ側へ短く。

## PRE-GENERATE-CHECK

- 検閲: 行政権が主体。発表前。網羅的一般的に。発表を禁止。憲法上禁止。
- 事前抑制: 司法の仮処分等も含み得るが、原則として厳格。例外があり得る（北方ジャーナル）。
- 税関検査は検閲に当たらない、が定番（最判）。図に「税関＝検閲」と書かない。
- 禁止: 事前の差止めは全部検閲。検閲は司法もする。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 検閲と事前抑制の聞き分け.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Title:「行政の事前禁止か」
Chip:「21条2項」

Left heading 論点:
検閲の主体は？ → 行政権
時点は？ → 発表前
効果は？ → 発表の禁止
憲法上は？ → 禁止

Right heading ひっかけ:
裁判所の仮処分は全部検閲
税関検査は検閲である
事前抑制は常に合憲
公の施設の利用拒否は検閲そのもの

Center ONLY: one table. Header navy. Row zebra white / light gray.
Columns: | 検閲 | 事前抑制
Rows:
主体 | 行政権 | 司法の仮処分等も含み得る
時点 | 発表前 | 発表前の抑制全般
効果 | 網羅的・一般的な発表禁止 | 個別の差止め等
憲法 | 禁止（21条2項） | 原則として許されないが、例外の枠がある
Caption:「税関検査を検閲と即断しない。集会・庁舎利用は公共施設の利用関係として別軸」

Roles: 表現者（発表したい）／行政庁（事前に禁止しない）. Never だれが.

Bottom:
- 判断軸:「行政権が発表前に網羅的に禁止するか」
- ひっかけ:「司法の差止め＝検閲。税関＝検閲」
- 暗記:「検閲は行政の事前禁止。事前抑制は原則ダメだが検閲そのものではない」
Answer:「検閲は、行政権が発表前に網羅的一般的に発表を禁止することであり、憲法上禁止される。裁判所による事前抑制は検閲そのものではない。」

Guide: ONE ちゃちゃロット only. Cream face, independent pale-sky-blue smiling hat (not ears), green blazer, white shirt, green trousers, shoes, wooden 指し棒. SMALL bottom-right. No nameplate. No logos or watermarks..
```

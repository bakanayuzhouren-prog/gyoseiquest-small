# 仮名加工情報と匿名加工情報

- 保存先: assets/images/deepdive/learn/kojinjoho/kamei-tokumei.png
- 画像キー: learn/kojinjoho/kamei-tokumei
- 生成は Codex。Cursor は描かない。
- 根拠: 個人情報保護法2条。定義の階層図（teigi）とは別仕事。

## PRE-GENERATE-CHECK

- 仮名加工情報: 他の情報と照合しない限り特定の個人を識別できないよう加工。内部利用向き。復元し得る前提を残す。
- 匿名加工情報: 特定の個人を識別できず、当該個人情報を復元できないよう加工。第三者提供時は項目の公表と、匿名加工情報である旨の明示。
- 技術的にあらゆる復元可能性をゼロにせよ、は過剰（既存カード）。
- 氏名なし閲覧履歴はすぐ匿名加工と言わない（個人関連情報）。
- 禁止: 復元できない＝仮名。仮名を他社へ自由販売。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 仮名加工と匿名加工.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Title:「照合か、復元できないか」
Chip:「個情法2条」

Left heading 論点:
仮名は？ → 照合しない限り識別できないよう加工
匿名は？ → 識別できず復元できないよう加工
仮名を他社へ自由に売る？ → NO（原則）
氏名なし履歴はすぐ匿名？ → NO（個人関連情報）

Right heading ひっかけ:
復元できないようにしたのが仮名加工
仮名加工は第三者提供が自由
匿名は技術的にあらゆる復元可能性をゼロにせよ
閲覧履歴は常に個人データ

Center ONLY: one table. Header navy. Row zebra white / light gray.
Columns: | 仮名加工情報 | 匿名加工情報
Rows:
加工の芯 | 他の情報と照合しない限り特定の個人を識別できない | 識別できず、当該個人情報を復元できない
使い方 | 内部利用を想定 | 第三者提供もあり得る
提供時 | 原則として個人データに近い規律 | 項目の公表と、匿名加工情報である旨の明示
Caption:「個人情報／個人データ／保有個人データの階層は別図」

Roles: 取扱事業者（加工の種類を選ぶ）／本人（識別されないことを求める）. Never だれが.

Bottom:
- 判断軸:「照合で戻るか。復元できないか」
- ひっかけ:「復元不可＝仮名。仮名は外部販売が自由」
- 暗記:「仮名は照合。匿名は復元できない。履歴はすぐ匿名にしない」
Answer:「仮名加工情報は、他の情報と照合しない限り特定の個人を識別できないよう加工したものである。匿名加工情報は、識別できず復元できないよう加工したものである。」

Guide: ONE ちゃちゃロット only. Cream face, independent pale-sky-blue smiling hat (not ears), green blazer, white shirt, green trousers, shoes, wooden 指し棒. SMALL bottom-right. No nameplate. No logos or watermarks..
```

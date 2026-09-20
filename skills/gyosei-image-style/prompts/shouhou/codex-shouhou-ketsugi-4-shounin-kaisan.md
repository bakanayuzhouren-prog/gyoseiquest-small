# 株主総会決議④-2 自己株式・譲渡承認・解散・継続

正本: `data/knowledge/canonical/kabunushi-sokai-ketsugi-hikaku.md`。模試名は図に出さない。生成は Codex。Cursor は描かない。

1枚目（募集・割当て）は `codex-shouhou-ketsugi-4-kabushiki.md`。この枚に199条の表を再掲しない。

- 保存先: `assets/images/deepdive/learn/shouhou/ketsugi-4-shounin-kaisan.png`
- 画像キー（生成後）: `learn/shouhou/ketsugi-4-shounin-kaisan`
- 連作: ④-2。今回は実装しない。

## 法律（この枚だけ）

- 特定の株主からの自己株式の有償取得: 取得事項は特別決議（160条、309条2項）。市場取引等は156条・165条。165条2項は**取締役会設置会社**が、市場取引等による取得を取締役会の決議で定められる旨を**定款**で定められる型。公開会社に限定されない。定款なしに「取締役会設置会社なら足りる」とは書かない。
- 譲渡制限株式の譲渡承認: 取締役会設置会社は取締役会、非設置は株主総会。特別決議ではない（139条）。全部の株式に譲渡制限を設ける定款変更は特殊決議（309条3項）。承認と混ぜない。
- 解散: 471条3号の株主総会の決議は特別決議（309条2項11号）。
- 会社継続（473条）: **471条1号から3号**。**472条1項のみなし解散を含む**（みなし解散後**3年以内**）。清算結了まで。継続は特別決議（309条2項11号）。合併・破産手続開始・解散を命ずる裁判は対象外。

## PRE-GENERATE-CHECK

- 165条2項は取締役会設置会社の定款。公開会社に限定しない。
- 譲渡の承認は特別決議ではない。309条3項と混ぜない。
- 473条は1号から3号。みなし解散は3年以内。
- 募集・割当ての4行をこの枚に載せない。
- 説明行に（〇条）。生成本文にポーズシートと全身指し棒正本。

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート（pitchi_sheet.png / task_turtle_sheet.png / kachadokuro_sheet.png / subeton_sheet.pngのうち使うもの）を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch. ONE job: 自己株式・譲渡承認・解散・会社継続の決議だけ.
Landscape, high resolution. Warm off-white. Slightly POP. Large gothic Japanese. ZERO overlapping glyphs.
Navy title, left green 論点, right orange ひっかけ, ONE center TABLE (4 data rows only), bottom 判断軸 / ひっかけ / 暗記, navy answer bar.
Do not print brand names, watermarks, file names, exam names, or production notes.

Title:「承認は特別ではない。継続は1号から3号」
Chip:「160条・139条・471条・473条」

Left heading 論点. Every explanation row MUST include（〇条）:
譲渡の承認は特別決議か？ → NO（139条）
特定株主からの自己株式取得は？ → 特別決議（160条）
165条2項は公開会社限定か？ → NO（取締役会設置会社の定款）
473条の継続対象は満了と定款事由だけか？ → NO（471条1号から3号）

Right heading ひっかけ:
譲渡の承認＝特別決議
165条2項は公開会社だけ
定款なしで取締役会だけで自己株式を取得できる
継続は満了と定款事由だけ

Center: ONE table. Navy header. Rows alternate white / light gray horizontally.
Columns: 場面｜手続（〇条）
Rows:
特定株主からの自己株式の有償取得｜特別決議で取得事項（160条）
譲渡制限株式の譲渡承認｜取締役会または株主総会。特別決議ではない（139条）
解散｜特別決議が事由の一つ（471条3号・309条2項11号）
会社継続｜特別決議（473条）。471条1号から3号。みなし解散は3年以内
Caption:「全部の株式に譲渡制限を設ける定款変更は特殊決議（309条3項）。承認手続とは別。合併・破産開始・解散命令は473条の対象外。165条2項は取締役会設置会社の定款。公開会社に限らない」
Do not add 募集 or 株主割当て rows.

Scene cast SMALL, do not cover table:
- Good role, left: タスク亀. Match assets/images/characters/task_turtle.png and ポーズシート assets/images/characters/task_turtle_sheet.png. Label「株主（継続を決議したい）」
- Bad role, right: カチャドクロ. Match assets/images/characters/kachadokuro.png and ポーズシート assets/images/characters/kachadokuro_sheet.png. Label「誤った主張をする側（承認も特別決議だとする）」
Do not swap these roles. No owl, bear, cat, raccoon.

Bottom:
- 判断軸:「承認か取得か。継続は471条何号か（139条・160条・473条）」
- ひっかけ:「承認＝特別。継続は満了と定款だけ。165条2項は公開会社限定」
- 暗記:「承認は特別ではない（139条）。継続は1号から3号。みなし解散は3年以内（473条）」
Answer:「譲渡制限株式の譲渡承認は特別決議ではない（139条）。特定の株主からの自己株式の有償取得の取得事項は特別決議である（160条）。165条2項は取締役会設置会社が定款で定められる型であり、公開会社に限定されない。株式会社の継続は、471条1号から3号の解散（472条1項のみなし解散を含む）について、清算結了まで特別決議ですることができる。みなし解散は3年以内に限る。」

Guide: ちゃちゃロット SMALL bottom-right margin only, wooden 指し棒 pointing at 暗記. Match assets/images/characters/chachalot.png, skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png, and 全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body only. No nameplate. Not a scene character. Do not stand on the answer bar.
```

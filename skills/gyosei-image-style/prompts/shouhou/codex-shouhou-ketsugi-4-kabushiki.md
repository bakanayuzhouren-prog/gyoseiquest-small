# 株主総会決議④ 募集・株主割当て・有利発行

正本: `data/knowledge/canonical/kabunushi-sokai-ketsugi-hikaku.md`。模試名は図に出さない。生成は Codex。Cursor は描かない。

1枚に詰めない。自己株式・譲渡承認・解散・継続は **2枚目** `codex-shouhou-ketsugi-4-shounin-kaisan.md`。

- 保存先: `assets/images/deepdive/learn/shouhou/ketsugi-4-kabushiki.png`
- 画像キー（生成後）: `learn/shouhou/ketsugi-4-kabushiki`
- 連作: ④-1／募集。今回は実装しない。

## 法律（この枚だけ）

- 非公開会社の募集事項（株主割当て以外）: 株主総会の特別決議（199条2項、309条2項5号）。
- 非公開会社の株主割当て: 原則は株主総会の特別決議（202条3項4号、309条2項5号）。**必ず特別ではない**。定款で取締役の決定（取締役会非設置。1号）または取締役会の決議（2号）にできる。202条5項により199条2項は適用しない。
- 公開会社の株主割当て: 取締役会の決議（202条3項3号）。総会特別が常に要るわけではない。
- 特に有利な金額での募集: 公開会社でも株主総会の特別決議（199条3項、201条1項、309条2項）。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内（暗記を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |
| いい役 | いい役 | 正しい機関で決めたい | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` |
| 悪い役 | 悪い役 | 必ず特別だとする | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` |

## PRE-GENERATE-CHECK

- 非公開の株主割当てを「必ず特別」と書かない。
- 公開の株主割当てを特別にしない。
- 有利発行は公開でも特別（199条3項）。表の行にはせずキャプション1行。
- 自己株式・139条・473条をこの枚に載せない。
- 口語なし。ブランド名なし。行ゼブラ。説明行に（〇条）。生成本文にポーズシートと全身指し棒正本。

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート（pitchi_sheet.png / task_turtle_sheet.png / kachadokuro_sheet.png / subeton_sheet.pngのうち使うもの）を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch. ONE job: 募集と株主割当ての機関だけ.
Landscape, high resolution. Warm off-white. Slightly POP. Large gothic Japanese. ZERO overlapping glyphs.
Navy title, left green 論点, right orange ひっかけ, ONE center TABLE (3 data rows only), bottom 判断軸 / ひっかけ / 暗記, navy answer bar.
Do not print brand names, watermarks, file names, exam names, or production notes.

Title:「公開と非公開で機関が変わる」
Chip:「199条・202条・309条2項」

Left heading 論点. Every explanation row MUST include（〇条）:
非公開の株主割当ては必ず特別か？ → NO（202条3項）
公開の株主割当ては？ → 取締役会（202条3項3号）
株主割当て以外の非公開募集は？ → 特別決議（199条2項）

Right heading ひっかけ:
非公開の株主割当ては必ず特別
非公開の株主割当ては定款なしで取締役会で足りる
公開の株主割当てにも必ず特別決議

Center: ONE table. Navy header. Rows alternate white / light gray horizontally.
Columns: 場面｜手続（〇条）
Rows:
非公開の募集（株主割当て以外）｜株主総会の特別決議（199条2項）
非公開の株主割当て｜原則は総会特別（202条3項4号）。定款で取締役（会）にできる
公開会社の株主割当て｜取締役会の決議（202条3項3号）
Caption:「特に有利な金額での募集は公開会社でも特別決議（199条3項）。202条5項により、株主割当てでは199条2項を適用しない」
Do not add 自己株式, 譲渡承認, 解散, 会社継続, or a fourth table row.

Scene cast SMALL, do not cover table:
- Good role, left: ぴっちゅ. Match assets/images/characters/pitchi.png and ポーズシート assets/images/characters/pitchi_sheet.png. Label「株主（正しい機関で決めたい）」
- Bad role, right: カチャドクロ. Match assets/images/characters/kachadokuro.png and ポーズシート assets/images/characters/kachadokuro_sheet.png. Label「誤った主張をする側（割当ては必ず特別だとする）」
Do not swap these roles. No owl, bear, cat, raccoon.

Bottom:
- 判断軸:「株主割当てか、それ以外の募集か。公開か非公開か（199条・202条）」
- ひっかけ:「非公開の割当ては必ず特別。公開の割当てまで特別」
- 暗記:「非公開の割当ては原則特別（202条3項4号）。定款で取締役（会）。公開の割当ては取締役会」
Answer:「非公開会社の株主割当ては原則として特別決議（202条3項4号）だが、定款で取締役（会）にできる。株主割当て以外の募集事項は特別決議（199条2項）。公開会社の株主割当ては取締役会（202条3項3号）。」

Guide: ちゃちゃロット SMALL bottom-right margin only, wooden 指し棒 pointing at 暗記. Match assets/images/characters/chachalot.png, skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png, and 全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body only. No nameplate. Not a scene character. Do not stand on the answer bar.
```

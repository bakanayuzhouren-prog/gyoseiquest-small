# 裁決の義務付け（37条の3第7項）① 許可がほしい

- 保存先: `assets/images/deepdive/learn/gyosho/saiketsu-gimetsuke-1.png`
- 画像キー: `learn/gyosho/saiketsu-gimetsuke-1`（生成後。いまはアプリにタグを置かない）
- 連作: ①→④の1枚目。スマホ縦読み。生成は Codex。Cursor は描かない。
- 根拠: 行政事件訴訟法3条6項二号、37条の3第1項。申請に対する行政庁の判断は処分。

## PRE-GENERATE-CHECK

- 芯: 申請への応答は処分。不許可は拒否処分の一例。不許可の当否はこのコマでは断定しない。
- このコマでは裁決の義務付け・第7項の結論を出さない。
- 画像内文言は処分と裁決の区別だけ。制作指示（悪役にする、このコマで断定するか、同じ建物にする）は印字しない。
- 禁止: 審査請求しないと裁判できない。不許可は違法と断定。カチャドクロ等を行政庁にする。ブランド名・ファイル名・制作指示の印字。
- 判定: このプロンプト範囲では通す。生成はてらしぃ指示まで行わない。

## 配役（①〜④で固定）

| スロット | キャラ | 参照PNG | 役割（何をしたいか） | 配置 |
|---|---|---|---|---|
| いい役・場面 | ぴっちゅ | `assets/images/characters/pitchi.png` ＋ `assets/images/characters/pitchi_sheet.png` | 申請者（営業許可を求める） | 左〜中央。本文を隠さない |
| 案内役 | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png` | 案内（処分と裁決の入口を示す） | 下余白・小さく1体。指し棒は暗記へ |
| 申請先 | 建物・窓口・通知書のみ | なし | 申請先の行政庁（申請を判断する） | 右。人物マスコットを置かない |

生成指示のみ（画像に印字しない）: 行政庁を悪役に描かない。不許可の当否を断定する見出しを置かない。

## 確定セリフ（画像に出してよい学習文）

- ぴっちゅ:「営業許可をください」
- 通知書見出し:「不許可」（本文に違法と書かない）
- 短注:「申請への行政庁の判断＝処分」

## GPT Image プロンプト

画像参照（実在・生成本文にも同じパスを書く）:
- `assets/images/characters/pitchi.png`
- `assets/images/characters/pitchi_sheet.png`
- `assets/images/characters/chachalot.png`
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
- `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study comic panel from scratch. ONE job: 申請への判断は処分.
Portrait 3:4, smartphone reading. Warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
This is panel 1 of 4. Title:「① 許可がほしい」 Chip:「1/4・処分」
Do not print brand names, watermarks, file names, or production notes.
Do not print director notes, casting notes, or layout orders on the artwork. Print only legal study Japanese listed below.

Layout: navy title bar. Center is ONE comic scene, not a dense statute dump. Small left green 論点 and right orange ひっかけ. Bottom 判断軸 / ひっかけ / 暗記. Large speech bubbles.

Cast (fixed for the series). Match these files exactly:
- Scene: ぴっちゅ. Match `assets/images/characters/pitchi.png` (icon) and `assets/images/characters/pitchi_sheet.png` (pose sheet). Label under character:「申請者（営業許可を求める）」. Never write だれが.
- Guide: ONE ちゃちゃロット only, SMALL bottom-right margin. Match `assets/images/characters/chachalot.png`, `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`, and `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`. Cream face, independent pale-sky-blue smiling hat (not ears), green lecturer jacket, white shirt, green trousers, shoes, wooden 指し棒 to 暗記. No nameplate.
- Agency: a building and a counter labeled「申請先の行政庁」. A notice paper labeled「不許可」. No extra mascots, no skulls, no owls, no unnamed people. Do not draw the agency as a villain; this is generation-only, not printed text.

Speech (print these learning lines only):
- ぴっちゅ:「営業許可をください」
- Notice:「不許可」
- Caption:「申請への行政庁の判断＝処分」

Left heading 論点 (print only):
申請への応答は？ → 処分
不許可は拒否処分の一例か？ → YES
いま裁決の話か？ → NO

Right heading ひっかけ (print only):
不許可だから直ちに違法
不作為と拒否処分を混ぜる
いま裁決だと早合点する

Bottom (print only):
- 判断軸:「申請先の行政庁が申請を判断する。それが処分」
- ひっかけ:「不許可を直ちに違法とする。処分と裁決を同じ語にする」
- 暗記:「申請への判断は処分。次のコマで審査庁の裁決へ」
Answer:「法令に基づく営業許可の申請に対する不許可は、申請先の行政庁の処分である。」

No logos, watermarks, nameplates, or product names on the artwork.
```

## 代替テキスト

申請者が営業許可を申請し、申請先の行政庁から不許可の通知を受けた場面。申請への行政庁の判断は処分である。不許可の当否は断定しない。

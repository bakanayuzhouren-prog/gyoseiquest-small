# 裁決の義務付け（37条の3第7項）② 行政に見直しを求める

- 保存先: `assets/images/deepdive/learn/gyosho/saiketsu-gimetsuke-2.png`
- 画像キー: `learn/gyosho/saiketsu-gimetsuke-2`（生成後。いまはアプリにタグを置かない）
- 連作: ①→④の2枚目。スマホ縦読み。生成は Codex。Cursor は描かない。
- 根拠: 行政事件訴訟法3条5項・6項二号、37条の3第1項一号。審査請求への判断は裁決。相当の期間内に裁決がない状態。審査庁は処分庁と同一の場合もある（行政不服審査法）。**この連作は別の行政庁が審査する事例**であり、一般論として必ず別だと教えない。

## PRE-GENERATE-CHECK

- 芯: 審査請求への判断は裁決。この事例では申請先の行政庁とは別の行政庁が審査庁である。常に別だと断定しない。
- 相当の期間が経過しても裁決がない。第7項の可否はまだ出さない。
- 画像内文言は処分・裁決・義務付けの区別。制作指示（同じ建物にする、悪役にする）は印字しない。
- 禁止: 審査請求をすれば必ず裁決の義務付けが使える。審査請求しないと裁判できない。審査庁を悪役キャラにする。申請先と審査庁は必ず別だと一般化する。ブランド印字。
- 判定: このプロンプト範囲では通す。生成はてらしぃ指示まで行わない。

## 配役（①と同じ）

| スロット | キャラ | 参照PNG | 役割（何をしたいか） | 配置 |
|---|---|---|---|---|
| いい役・場面 | ぴっちゅ | `assets/images/characters/pitchi.png` ＋ `assets/images/characters/pitchi_sheet.png` | 申請者（不許可の見直しを求める） | 左 |
| 案内役 | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png` | 案内（処分と裁決を分ける） | 下余白・小さく1体 |
| 申請先 | 建物のみ | なし | 申請先の行政庁（すでに不許可を出した） | 奥または小 |
| 審査庁 | 別建物・窓口 | なし | 審査庁（審査請求を審理する） | 右。時計や空欄の裁決書で「裁決なし」 |

生成指示のみ（画像に印字しない）: この事例では審査庁を申請先とは別の建物にする。常に別だと見出しに書かない。審査庁を悪役にしない。

## 確定セリフ（画像に出してよい学習文）

- ぴっちゅ:「この不許可を見直してください」
- 短注:「審査請求への判断＝裁決」
- 時計・札:「相当の期間が経過しても裁決がない」
- 事例札:「この事例では、別の行政庁が審査する」

## GPT Image プロンプト

画像参照（実在・生成本文にも同じパスを書く）:
- `assets/images/characters/pitchi.png`
- `assets/images/characters/pitchi_sheet.png`
- `assets/images/characters/chachalot.png`
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
- `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study comic panel from scratch. ONE job: 審査請求への判断は裁決.
Portrait 3:4, smartphone reading. Warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
This is panel 2 of 4. Title:「② 行政に見直しを求める」 Chip:「2/4・裁決」
Do not print brand names, watermarks, file names, or production notes.
Do not print director notes, casting notes, or layout orders on the artwork. Print only legal study Japanese listed below.

Layout: navy title bar. Center ONE comic scene. Two buildings with different labels because THIS CASE uses a reviewing agency that is a different administrative organ from the original deciding agency. Do not teach as a universal rule that they are always different. Small left 論点 / right ひっかけ. Bottom 判断軸 / ひっかけ / 暗記.

Cast (same as panel 1). Match these files exactly:
- ぴっちゅ at left. Match `assets/images/characters/pitchi.png` (icon) and `assets/images/characters/pitchi_sheet.png` (pose sheet). Label:「申請者（不許可の見直しを求める）」
- ONE ちゃちゃロット SMALL bottom-right. Match `assets/images/characters/chachalot.png`, `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`, and `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`. Green lecturer suit, independent pale-sky-blue smiling hat, 指し棒 to 暗記. No nameplate.
- Buildings only: left-back small「申請先の行政庁」. right large「審査庁」. Empty ruling paper or clock:「相当の期間が経過しても裁決がない」. Case chip:「この事例では、別の行政庁が審査する」. No extra characters. Do not draw the reviewing agency as a villain.

Speech (print these learning lines only):
- ぴっちゅ:「この不許可を見直してください」
- Caption:「審査請求への判断＝裁決」

Left heading 論点 (print only):
審査請求を審理する行政庁は？ → 審査庁
審査庁の判断の名は？ → 裁決
申請先の判断の名は？ → 処分

Right heading ひっかけ (print only):
審査請求をすれば必ず裁決の義務付けが使える
審査請求をしないと裁判できない
申請先と審査庁は常に別である

Bottom (print only):
- 判断軸:「処分は申請先の行政庁の判断。裁決は審査庁の判断。この事例では審査庁は別の行政庁」
- ひっかけ:「審査請求＝直ちに義務付け。審査庁は常に別だと一般化する」
- 暗記:「見直しの判断は裁決。まだ裁判所の入口ではない」
Answer:「不許可処分についての審査請求に対する判断は裁決である。この事例では、申請先の行政庁とは別の行政庁が審査庁である。」

No logos, watermarks, nameplates, or product names on the artwork.
```

## 代替テキスト

申請者が不許可について審査庁へ見直しを求めたが、相当の期間が経過しても裁決がない。審査請求への判断は裁決である。この事例では申請先の行政庁とは別の行政庁が審査するが、審査庁が常に別であるとは限らない。

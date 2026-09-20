# 株主総会決議② 特殊決議・創立総会・総株主の同意

正本: `data/knowledge/canonical/kabunushi-sokai-ketsugi-hikaku.md`。普通／特別の二択に押し込まない。生成は Codex。Cursor は描かない。

- 保存先: `assets/images/deepdive/learn/shouhou/ketsugi-2-tokushu.png`
- 画像キー（生成後）: `learn/shouhou/ketsugi-2-tokushu`
- 連作: ②／4。今回は実装しない。
- 既存PNG: タイトルが読めない不合格。同じ保存先へ上書き再生成する（生成は Codex。今回は描かない）。

## 法律（条・条件を表・暗記・答え帯で同じにする）

- 309条3項: 行使できる株主の**半数以上（頭数）であって**、当該株主の**議決権の3分の2以上**。出席2/3ではない。典型: 全部の株式に譲渡制限を設ける定款変更。号一覧は印字しない。
- 309条4項: 頭数の半数以上＋議決権の**4分の3以上**。3項より重い。典型は属人的定めのうち重いもの。表に「対象の号は図に書かない」と印字しない。
- 73条1項: 行使できる設立時株主の**議決権の過半数であって**、**出席した当該設立時株主の議決権の3分の2以上**。総議決権の過半数も要る。309条2項（過半数を有する株主が出席＋出席の2/3）と同一視しない。「特別決議に相当」と書かない。
- 73条2項: 全部の株式に譲渡制限を設ける定款変更は、設立時株主の半数以上＋議決権の3分の2。1項より重い。注記1行。
- 55条・424条: 全部免除は**総株主の同意**（無議決権株主を含む）。普通でも特別でも足りない。425条以下の一部免除は注記1行。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内（暗記を指す） | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png` |

## PRE-GENERATE-CHECK

- 特殊決議の「半数」は頭数。3分の2は当該株主の議決権（総議決権）。出席2/3と書かない。
- 73条1項を「過半数を有する者出席＋出席の2/3」「特別決議に相当」と書かない。総議決権の過半数かつ出席の2/3。
- 総株主の同意を特別決議と書かない。無議決権株主を外さない。
- 表に「対象の号は図に書かない」を印字しない。309条4項は条件（頭数＋議決権4分の3、3項より重い）だけ書く。
- 表・論点・暗記・答え帯が同じ条件。
- タイトル帯は明るいクリーム色。タイトル文字は紺色で大きく。暗い帯に暗い字、低コントラストは不合格。既存PNGはこれに当たらないので再生成対象。
- 口語なし。ブランド名なし。行ゼブラ。

判定: この枚は通す。生成はてらしぃ指示まで行わない。

## GPT Image プロンプト

画像参照（実在・生成本文にも同じパス）:
- `assets/images/characters/chachalot.png`
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
- `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 特殊決議・創立総会・総株主の同意は特別決議ではない.
Landscape, high resolution. Warm off-white. Slightly POP. Large gothic Japanese. ZERO overlapping glyphs.
Title band: bright cream background. Title text: navy, large, high contrast, fully readable. Do not put the title on a dark navy band. Do not use dark-on-dark title. Left green 論点, right orange ひっかけ, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記, navy answer bar.
Do not print brand names, watermarks, file names, or production notes. Print only the legal Japanese listed below.

Title:「特別決議に足さないもの」
Chip:「2/4・309条3項・73条1項・424条」

Left heading 論点:
特殊決議の「半数」は？ → 株主の頭数
特殊決議の3分の2は？ → 当該株主の議決権（総議決権）
創立総会（73条1項）は特別決議と同じか？ → NO
全部免除は特別決議で足りるか？ → NO

Right heading ひっかけ:
特殊決議＝出席議決権の3分の2
創立総会＝過半数を有する者出席＋出席の3分の2
創立総会＝特別決議に相当
全部免除＝特別決議

Center: ONE table. Navy header. Rows alternate white / light gray horizontally.
Columns: 手続｜数え方｜条件
Rows:
特殊決議（309条3項）｜頭数の半数以上かつ当該株主の議決権の3分の2以上｜全部の株式に譲渡制限を設ける定款変更など。出席の2/3では足りない
特殊決議（309条4項）｜頭数の半数以上かつ議決権の4分の3以上｜3項より重い。属人的定めのうち重いものなど
創立総会（73条1項）｜行使できる設立時株主の議決権の過半数であって、出席した当該設立時株主の議決権の3分の2以上｜総議決権の過半数も要る。309条2項と同じではない
総株主の同意（55条・424条）｜議決権の有無を問わない全株主｜普通決議でも特別決議でも足りない

Caption:「73条2項（全部譲渡制限の定款変更）は設立時株主の半数以上＋議決権の3分の2。425条以下の一部免除は別手続。」

Bottom:
- 判断軸:「頭数か、総議決権の過半数か、出席議決権か、全株主か」
- ひっかけ:「創立総会を特別決議と同じ出席2/3だけにする」
- 暗記:「特殊は頭数＋総議決権。創立総会は総議決権の過半数かつ出席の3分の2。全部免除は総株主の同意」
Answer:「特殊決議は株主の頭数と総議決権で数える。創立総会は行使できる設立時株主の議決権の過半数であって、出席した当該設立時株主の議決権の3分の2以上である。任務懈怠責任の全部免除は総株主の同意がなければできない。」

Cast: ONE ちゃちゃロット only, SMALL bottom-right. Match `assets/images/characters/chachalot.png`, `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`, and `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`. Green lecturer suit, independent pale-sky-blue smiling hat, 指し棒 to 暗記. No nameplate.
```

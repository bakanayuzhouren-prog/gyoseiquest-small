# 株主総会決議① 普通・341条特則・特別（要件）

正本: `data/knowledge/canonical/kabunushi-sokai-ketsugi-hikaku.md` の要件表。旧1枚 `codex-shouhou-ketsugi-futsukabetsu.md` より厚い。生成は Codex。Cursor は描かない。

- 保存先: `assets/images/deepdive/learn/shouhou/ketsugi-1-yoken.png`
- 画像キー（生成後）: `learn/shouhou/ketsugi-1-yoken`
- 連作: ①要件 → ②特殊・同意 → ③機関・配当・資本 → ④株式・解散。今回は実装しない。

## 法律（条）

- 308条2項: 自己株式は議決権を有しない。定足・賛成の分母から外す。
- 309条1項: 定款に別段の定めがある場合を除き、行使できる株主の議決権の過半数を有する株主が出席し、出席した当該株主の議決権の過半数。
- 341条: 309条1項にかかわらず、役員の選任または解任は、行使できる株主の議決権の過半数（定款で3分の1以上の割合を定めたときはその割合以上）を有する株主が出席し、出席した当該株主の議決権の過半数（上回る割合を定款で定めたときはその割合以上）。定足の排除不可。3分の1未満への軽減不可。
- 309条2項: 特別決議。定足は議決権の過半数を有する株主の出席（定款で3分の1まで軽減可）。賛成は出席した当該株主の議決権の3分の2以上（上回る割合へ加重可）。頭数要件の追加可。
- 監査役の解任は特別決議（339条1項＋309条2項）。341条の「出席過半数」では足りない。

分母は議決権。株主の頭数ではない。賛成は出席議決権。総議決権の3分の2ではない。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内（暗記を指す） | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png` |

中央は表。場面役を置かない。

## PRE-GENERATE-CHECK

- 普通と特別の定足は、いずれも「議決権の過半数を有する株主の出席」が原則。頭数の過半数ではない。OK
- 普通の賛成＝出席議決権の過半数。特別の賛成＝出席議決権の3分の2以上。総株主の3分の2ではない。OK
- 341条は定足を3分の1未満にできない。普通決議一般の定足排除と混ぜない。OK
- 監査役の解任は特別。表で「役員解任は常に341」と読ませない。OK
- 309条2項の号番号は印字しない。OK
- 口語なし。```text``` にブランド名なし。制作指示を学習文として印字しない。OK
- 表の行背面は横一列ずつ白／薄いグレー。列ゼブラ禁止。OK

判定: この枚は通す。生成はてらしぃ指示まで行わない。

## GPT Image プロンプト

画像参照（実在・生成本文にも同じパス）:
- `assets/images/characters/chachalot.png`
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
- `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 普通決議・341条特則・特別決議の要件.
Landscape, high resolution. Warm off-white. Slightly POP. Large gothic Japanese. ZERO overlapping glyphs.
Match LAYOUT of the approved sample: navy title, left green 論点, right orange ひっかけ, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記, navy answer bar.
Do not print brand names, watermarks, file names, or production notes. Print only the legal Japanese listed below.

Title:「普通決議と特別決議（要件）」
Chip:「1/4・309条・341条」

Left heading 論点:
分母は？ → 行使できる株主の議決権（308条2項）
普通の賛成は？ → 出席議決権の過半数
特別の賛成は？ → 出席議決権の3分の2以上
監査役の解任は341条の過半数で足りる？ → NO

Right heading ひっかけ:
特別＝総株主の議決権の3分の2
定足＝株主の頭数の過半数
役員の解任は常に出席過半数
普通の定足排除と341条を同じにする

Center: ONE table only. Navy header. Data rows alternate white then light gray by ROW, not by column.
Columns: 項目｜普通決議（309条1項）｜役員選任等（341条）｜特別決議（309条2項）
Rows:
定足｜議決権の過半数を有する株主が出席｜同じ。ただし3分の1未満にできない｜議決権の過半数を有する株主が出席。定款で3分の1まで軽減可
賛成｜出席した当該株主の議決権の過半数｜出席した当該株主の議決権の過半数｜出席した当該株主の議決権の3分の2以上
定款｜定足の軽減・排除可｜定足の排除不可。3分の1が下限｜定足は3分の1が下限。賛成は2/3超へ加重可
注記｜一般の普通決議｜監査役の解任には使わない｜監査役の解任はこちら

Caption under table:「自己株式は議決権なし。分母に入れない（308条2項）」

Bottom:
- 判断軸:「賛成は出席議決権。特別だけ3分の2に上がる」
- ひっかけ:「総株主の3分の2。頭数の過半数。監査役解任まで341条」
- 暗記:「どちらも過半数出席。普通は過半数、特別は3分の2。監査役の解任は特別（309条2項）」
Answer:「普通決議は出席議決権の過半数、特別決議は出席議決権の3分の2以上である。定足は議決権の過半数を有する株主の出席が原則である。役員の選任は341条。監査役の解任は特別決議である。」

Cast: ONE ちゃちゃロット only, SMALL bottom-right margin. Match `assets/images/characters/chachalot.png`, `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`, and `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`. Cream face, independent pale-sky-blue smiling hat (not ears), green lecturer jacket, white shirt, green trousers, shoes, wooden 指し棒 to 暗記. No nameplate. Do not hide the table.
```

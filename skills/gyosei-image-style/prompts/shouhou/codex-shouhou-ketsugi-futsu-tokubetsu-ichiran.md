# 株主総会 普通決議と特別決議（対象一覧）

正本: `data/knowledge/canonical/kabunushi-sokai-ketsugi-hikaku.md` の §2（収録で決議種類が出た論点）。既存の `codex-shouhou-ketsugi-1`〜`4` は触らない。新規1枚。生成は Codex。Cursor は描かない。

てらしぃ指定: **左右2列で対象を一目比較**するのが主役。「普通手続き」とは書かない。用語は**普通決議**。あぷし型の論点／ひっかけ／判断軸／暗記／答え帯／中央場面／定足・賛成割合の解説は置かない。要件の盛り込みすぎ禁止。

- 保存先: `assets/images/deepdive/learn/shouhou/ketsugi-futsu-tokubetsu-ichiran.png`
- 画像キー（生成後）: `learn/shouhou/ketsugi-futsu-tokubetsu-ichiran`

## 法律（印字する項目。短い法律日本語）

左・普通決議が必要:

- 監査役の選任
- 取締役の選任
- 取締役の解任（監査等委員を除く）
- 会計参与の選任
- 会計監査人の選任
- 取締役の報酬等（定款または株主総会）
- 金銭の剰余金配当（原則）
- 剰余金の資本金組入れ
- 資本金の減少（定時総会かつ欠損の額以内）

右・特別決議が必要:

- 監査役の解任
- 監査等委員である取締役の解任
- 現物配当（金銭分配請求権を与えない場合）
- 資本金の減少（原則）
- 非公開会社の募集（株主割当て以外）
- 非公開会社の株主割当て（原則）
- 特に有利な金額での募集
- 特定株主からの自己株式取得
- 解散（株主総会の決議）
- 会社継続（471条1号から3号）

2列に混ぜない: 特殊決議、総株主の同意、取締役会決議、創立総会。公開会社の株主割当て、165条2項、447条3項、459条の取締役会、譲渡承認。

脚注（この3行だけ）:

- 金銭配当・非公開の株主割当ては、定款で取締役（会）にできる型あり。この2列に入れない。
- 資本金減少の447条3項（株式発行と同時に減資し、効力発生日後の資本金が同日前を下回らない場合）は取締役（会）。この2列に入れない。
- 会社継続はみなし解散を含む（3年以内）。合併・破産開始・解散命令は対象外。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内（下余白。表を圧迫しない） | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png` |

## PRE-GENERATE-CHECK

てらしぃ指定の2列一覧を、通常のあぷし底部カードより優先。論点／ひっかけ／答え帯は置かない。用語は普通決議（普通手続きと書かない）。

- 収録で決議種類が出た論点だけ。口語なし。
- 現物配当は金銭分配請求権なしのときに限り特別。
- 資本金減少は原則特別。定時総会かつ欠損の額以内だけ普通列。447条3項を普通列に入れない。
- 監査等委員の解任は特別。他の取締役の解任は普通。
- 非公開の株主割当ては原則特別。必ず特別と断定しない。
- 特殊決議・総株主の同意・取締役会を2列に混ぜない。
- 定足・賛成割合を印字しない。長い解説を置かない。
- 1枚。左右は独立した縦リスト。行を無理に対応させない。
- タイトル帯は明るいクリーム色、文字は紺色。項目は大きい。
- 各列内の項目背面は横一列ずつ白／薄いグレー。
- ちゃちゃロットは下余白に小さく1体。緑スーツ。表を隠さない。ブランド名なし。

判定: この枚は通す。生成はてらしぃ指示まで行わない。文字が読めないほど詰まったら、同じ2列のまま分割する（今回は1枚で出す）。

## GPT Image プロンプト

画像参照（実在・生成本文にも同じパス）:
- `assets/images/characters/chachalot.png`
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
- `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: at-a-glance comparison of matters needing ordinary resolution versus special resolution.
Landscape, high resolution. Warm off-white. Slightly POP. VERY LARGE gothic Japanese. ZERO overlapping glyphs. Generous padding. Do not shrink type to cram.
Do NOT use the usual three bottom cards. Do NOT print 論点, ひっかけ, 判断軸, 暗記, or an answer bar. Do NOT print quorum or voting-percentage text. No center scene. No long paragraphs.
Never print 普通手続き. The legal term is 普通決議.

Title band: bright cream background, navy title text, large and readable.
Title:「普通決議と特別決議」
Two equal columns. The lists are the whole figure. Do not force left rows to match right rows.

Left column heading (teal, large):「普通決議が必要」
Left items, one per row, large short legal Japanese. Alternate white / light gray horizontally inside this column only:
監査役の選任
取締役の選任
取締役の解任（監査等委員を除く）
会計参与の選任
会計監査人の選任
取締役の報酬等（定款または株主総会）
金銭の剰余金配当（原則）
剰余金の資本金組入れ
資本金の減少（定時総会かつ欠損の額以内）

Right column heading (orange, large):「特別決議が必要」
Right items, one per row, large. Alternate white / light gray horizontally inside this column only:
監査役の解任
監査等委員である取締役の解任
現物配当（金銭分配請求権を与えない場合）
資本金の減少（原則）
非公開会社の募集（株主割当て以外）
非公開会社の株主割当て（原則）
特に有利な金額での募集
特定株主からの自己株式取得
解散（株主総会の決議）
会社継続（471条1号から3号）

Only these three tiny footnotes at the bottom, still readable:
金銭配当・非公開の株主割当ては、定款で取締役（会）にできる型あり。この2列に入れない。
資本金減少の447条3項（株式発行と同時に減資し、効力発生日後の資本金が同日前を下回らない場合）は取締役（会）。この2列に入れない。
会社継続はみなし解散を含む（3年以内）。合併・破産開始・解散命令は対象外。

Do not print brand names, watermarks, file names, exam names, or production notes.

Cast: ONE ちゃちゃロット only, VERY SMALL bottom-right margin, not covering the lists. Match `assets/images/characters/chachalot.png`, `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`, and `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`. Green lecturer suit, independent pale-sky-blue smiling hat. No nameplate. Do not crowd the lists.
```

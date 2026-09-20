# 株主総会決議③ 機関・配当・資本金（出題仕分け）

正本: `data/knowledge/canonical/kabunushi-sokai-ketsugi-hikaku.md`。模試名は図に出さない。生成は Codex。Cursor は描かない。

- 保存先: `assets/images/deepdive/learn/shouhou/ketsugi-3-kikan-haito.png`
- 画像キー（生成後）: `learn/shouhou/ketsugi-3-kikan-haito`
- 連作: ③／4。今回は実装しない。

## 法律（条・条件を表・暗記・答え帯で同じにする）

- 監査役の選任: 普通（341条）。定足は3分の1未満にできない。
- 監査役の解任: 特別（339条1項、309条2項7号）。選任と一括して過半数としない。
- 監査等委員である取締役の解任: 特別（309条2項7号。累積投票選任は同号の342条3項から5項）。取締役一般の解任（普通）と分けて本行にする。
- 取締役（監査等委員を除く）・会計参与の選任・解任: 普通（341条）。
- 報酬等: 定款または株主総会の決議（361条1項）。普通。額不定は算定方法。
- 金銭の剰余金配当: 原則総会の普通決議（454条1項）。459条の会社は定款で取締役会に任せられる。常に特別ではない。
- 金銭分配請求権を与えない現物配当: 特別（454条4項、309条2項10号）。請求権を与えれば特別にならない。
- 資本金の減少: 原則特別（447条1項、309条2項9号）。例外は次の2つを表・暗記・答え帯に必ず残す。
  1. 定時株主総会で定め、かつ減少額が欠損の額を超えないときは普通決議（309条2項9号イ・ロ）
  2. 株式の発行と同時に減資し、効力発生日後の資本金が同日前を下回らないときは取締役（会）の決定（447条3項）。この適用条件を表・論点・暗記・答え帯に印字する。条番号だけの省略にしない。
- 剰余金を減少して資本金を増加: 普通（450条）。減少と入れ替えない。

累積投票等の解任例外は注記1行。本行の結論にしない。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内（暗記を指す） | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png` |

## PRE-GENERATE-CHECK

- 監査役・監査等委員の解任は特別。その他の取締役の解任は普通。
- 現物配当は金銭分配請求権なしのときに限り特別。
- 資本金減少は原則特別。例外は2種類を混ぜない。定時総会かつ欠損の額以内は普通決議。447条3項は、株式の発行と同時に減資し、効力発生日後の資本金が同日前を下回らないときの取締役（会）の決定であり、普通決議ではない。この適用条件を印字する。条番号だけで済ませない。判断軸・暗記・答え帯でも欠かさない。
- 組入れは普通。
- 口語なし。ブランド名なし。行ゼブラ。

判定: この枚は通す。生成はてらしぃ指示まで行わない。

## GPT Image プロンプト

画像参照（実在・生成本文にも同じパス）:
- `assets/images/characters/chachalot.png`
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
- `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 選任解任・配当・資本金の決議の仕分け.
Landscape, high resolution. Warm off-white. Slightly POP. Large gothic Japanese. ZERO overlapping glyphs.
Navy title, left green 論点, right orange ひっかけ, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記, navy answer bar.
Do not print brand names, watermarks, file names, exam names, or production notes. Print only the legal Japanese listed below.

Title:「選任・配当・資本金はどれか」
Chip:「3/4・341条・454条・447条・450条」

Left heading 論点:
監査役の選任は？ → 普通（341条）
監査役・監査等委員の解任は？ → 特別（309条2項7号）
金銭配当は常に特別か？ → NO
資本金の減少は常に特別か？ → NO（定時総会かつ欠損の額以内は普通決議。株式発行と同時に減資し効力発生日後の資本金が同日前を下回らないときは取締役（会）の決定）

Right heading ひっかけ:
選任と解任を同じ割合で一括する
取締役の解任は常に普通（監査等委員を忘れる）
現物配当は常に特別
資本金の減少は例外なく特別

Center: ONE table. Navy header. Rows alternate white / light gray horizontally.
Columns: 場面｜決議｜条件
Rows:
監査役の選任｜普通（341条）｜定足は3分の1未満にできない
監査役の解任｜特別（309条2項7号）｜選任と同じ過半数では足りない
監査等委員である取締役の解任｜特別（309条2項7号）｜他の取締役の解任と混ぜない
取締役（監査等委員を除く）の選任・解任｜普通（341条）｜
報酬等（361条）｜定款または普通決議｜額不定は算定方法
金銭の剰余金配当｜普通（454条1項）｜459条の会社は定款で取締役会に任せられる
金銭分配請求権なしの現物配当｜特別（454条4項・309条2項10号）｜請求権を与えれば特別にならない
資本金の減少｜原則特別（447条・309条2項9号）｜例外1（普通決議）: 定時総会かつ欠損の額を超えないとき。例外2（取締役（会）の決定）: 株式の発行と同時に減資し、効力発生日後の資本金が同日前を下回らないとき（447条3項）。例外2は普通決議ではない
剰余金の資本金組入れ｜普通（450条）｜減少と入れ替えない

Caption:「累積投票で選任された取締役（監査等委員を除く）の解任も特別（309条2項7号・342条3項から5項）。この表の本行ではない。」

Bottom:
- 判断軸:「監査役・監査等委員の解任と、原則としての資本金減少は特別。減少の例外は2つ。定時総会かつ欠損の額以内は普通決議。株式の発行と同時に減資し、効力発生日後の資本金が同日前を下回らないときは取締役（会）の決定。組入れと金銭配当は普通」
- ひっかけ:「減少は常に特別。減少の例外をすべて普通決議にする。現物なら常に特別。選任も解任も3分の2」
- 暗記:「監査役は選任普通・解任特別。現物は金銭分配請求権なしなら特別。資本金減少は原則特別。定時総会かつ欠損の額以内は普通決議。株式発行と同時の減資で効力発生日後の資本金が同日前を下回らないときは取締役（会）。組入れは普通」
Answer:「監査役および監査等委員である取締役の解任と、金銭分配請求権を与えない現物配当は特別決議である。資本金の減少は原則として特別決議である。例外は、定時株主総会で定めかつ減少額が欠損の額を超えないときの普通決議と、株式の発行と同時に減資し効力発生日後の資本金が同日前を下回らないときの取締役（会）の決定である。監査役の選任、金銭配当、剰余金の資本金組入れは普通決議である。」

Cast: ONE ちゃちゃロット only, SMALL bottom-right. Match `assets/images/characters/chachalot.png`, `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`, and `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`. Green lecturer suit, independent pale-sky-blue smiling hat, 指し棒 to 暗記. No nameplate.
```

# Codex用 — 設けるとき、許可？届出？勧告？

関連: TAC第3回・問22（肢2の許可、肢4の広域連合、肢5の勧告。指定都市・中核市と特別区の法人格は図にない）
関連: 合格革命第1回・問24（一部事務組合の許可と連携協約の届出。出席・監査・法令の解釈は図にない）
関連: 辰巳2026全国公開完全模試・問22（許可の切り分け。財産区と指定都市は図にない）

- 保存先: `assets/images/deepdive/learn/gyosei/kyoka-todokede-kankoku.png`
- 画像キー: `learn/gyosei/kyoka-todokede-kankoku`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・地方自治法。PNGができてから載せる。`[[image:]]` は付けない。
- 上書きしない。PNGは生成済み。てらしぃがこの画像のやり直しを言うまで描き直さない。

## PRE-GENERATE-CHECK

表が本体。左右パネルも底部3カードも置かない。同じ文をタイトルと表で繰り返さない。

- 一部事務組合を設けるのも、広域連合を設けるのも、許可（284条）。市町村・特別区だけなら都道府県知事。都道府県が加入するなら総務大臣。
- 連携協約を結ぶのは届出。告示もする（252条の2）。先の切り方は許可と同じ。都道府県が締結するなら総務大臣。その他は都道府県知事。
- 設けるべき勧告（285条の2第1項）は、許可でも届出でもない。知事が、関係のある市町村と特別区に、一部事務組合または広域連合を設けるよう勧告できる。条文は「勧告することができる」だけ。従わなければならないとは書いていない。応じるかは相手方。
- 勧告の行の右端セルは「対象外」。数県にまたがる組合では総務大臣が勧告する（293条）が、その説明は図に足さない。無条件に「勧告者は総務大臣ではない」とも書かない。
- 書かない: 従う義務がある。勧告者は総務大臣ではない。認可。協議会・委託・解散。数県またぎの説明。指定都市・中核市・財産区・特別区の法人格。模試名。ブランド名。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（勧告の行の「従う義務はない」を指す） | ちゃちゃロット | `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png` | 表の下の余白に1体。指し棒は勧告の行を指し、文字に重ねない |

場面役は置かない。ちゃちゃロットは1体。緑の講師スーツ（白シャツ、緑のズボン、靴）。帽子は頭とは別の薄い水色で、左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。名札は書かない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic. ONE job: a comparison table of how local governments set up joint bodies.
16:9, warm off-white, slightly POP, large gothic Japanese, generous margins, ZERO overlapping glyphs.
No left panel. No right panel. No bottom cards. No arrows between rows. The table is the whole lesson.

Title, one short question:「設けるとき、許可？届出？勧告？」

One table under the title. Header row is a navy band with white text. Data rows alternate by row: row 1 white, row 2 light gray, row 3 white, row 4 light gray. Not column stripes.

Columns: 何をするか | 性質 | 市町村・特別区だけ | 都道府県が入る・結ぶ

Row 1: 一部事務組合を設ける | 許可 | 都道府県知事 | 総務大臣
Row 2: 広域連合を設ける | 許可 | 都道府県知事 | 総務大臣
Row 3: 連携協約を結ぶ | 届出。告示もする | 都道府県知事 | 総務大臣
Row 4: 設けるよう勧告する | 従う義務はない | 知事が勧告する。応じるかは相手方 | 対象外

Keep every cell on one or two lines. Do not shrink the type to add notes.

Guide, one only, in the bottom margin, small: the smiling-hat mascot from the reference PNGs. Green lecturer suit including jacket, white shirt, green trousers, and shoes. The hat is a separate pale-blue cap on the head: two round side peaks, a low center peak, a long brim, and a smile with two closed eyes. Pointer toward the words 従う義務はない, without covering any cell. No name tag.

Do not print a logo, watermark, account name, or product name. Do not add more rows.
```

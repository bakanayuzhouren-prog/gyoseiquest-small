# Codex用 — 期間と知らせ方は、公開会社でない株式会社で変わる

1枚の表。招集通知を「いつも1週間」にしない。設立無効と資本金の額の減少は、この表の1年に入れない。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/shouhou/hikoukai-kikan.png`
- 画像キー: `learn/shouhou/hikoukai-kikan`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・商法の「もっと深掘る」。アプリ載せは生成後。
- 前: `hikoukai-teikan.png`、`hikoukai-6kagetsu.png`

## 法律

299条1項。株主総会の招集通知は、原則、株主総会の日の2週間前まで。公開会社でない株式会社は1週間前。298条1項3号又は4号（書面による議決権行使、電磁的方法による議決権行使）を定めたときは、この1週間を使わない。取締役会設置会社以外の公開会社でない株式会社は、定款で1週間を下回る期間にできる。

325条の4。電子提供措置をとるときは、299条1項の括弧を外し、公開会社でない株式会社も2週間前とする。

828条1項2号。成立後の株式の発行の無効の訴えは、効力が生じた日から6か月。公開会社でない株式会社は1年。
828条1項3号。自己株式の処分の無効の訴えも、6か月。公開会社でない株式会社は1年。
828条1項4号。新株予約権の発行の無効の訴えも、6か月。公開会社でない株式会社は1年。
828条1項1号の設立の無効は、成立の日から2年。公開会社かどうかで変わらない。
828条1項5号の資本金の額の減少の無効は、効力が生じた日から6か月。公開会社でない株式会社の1年はない。

426条3項。定款の定めによる役員等の責任免除は、公告し、又は株主に通知する。426条4項。公開会社でない株式会社は、株主に通知する。公告は要らない。

849条5項。責任追及等の訴えを提起したとき、又は訴訟告知を受けたときは、公告し、又は株主に通知する。849条9項。公開会社でない株式会社等は、株主に通知する。公告は要らない。

113条3項。次のときは、変更後の発行可能株式総数は、効力が生じた時の発行済株式の総数の4倍を超えることができない。1号は、公開会社が定款を変更して発行可能株式総数を増加する場合。2号は、公開会社でない株式会社が定款を変更して公開会社となる場合。非公開だけの上限ではない。

試験で「公開会社でない株式会社の招集通知は、いつも1週間」と書いてあったら×。
試験で「設立無効の訴えも、公開会社でない株式会社は1年」と書いてあったら×。
試験で「資本金の額の減少の無効も、1年」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（招集通知はいつも1週間、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（電子提供措置は2週間、を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅとタスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One comparison table is the figure. No left-right debate panels. No three cards at the bottom.
Title: 期間と知らせ方は、公開会社でない株式会社で変わる
Subtitle: 招集通知は、いつも1週間ではない
Header, navy: 場面 / 公開会社 / 公開会社でない株式会社 / 条
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Row: 株主総会の招集通知 / 2週間前 / 1週間前。書面投票又は電子投票を定めたときは2週間。取締役会を置かない会社は、定款でさらに短くできる / 299条1項
Row: 電子提供措置をとるときの招集通知 / 2週間前 / 1週間にはならない。2週間前 / 325条の4
Row: 成立後の株式の発行の無効の訴え / 効力が生じた日から6か月 / 1年 / 828条1項2号
Row: 自己株式の処分の無効の訴え / 6か月 / 1年 / 828条1項3号
Row: 新株予約権の発行の無効の訴え / 6か月 / 1年 / 828条1項4号
Row: 定款による役員等の責任免除を知らせる / 公告し、又は株主に通知 / 株主に通知。公告は要らない / 426条4項
Row: 責任追及等の訴えを起こしたことを知らせる / 公告し、又は株主に通知 / 株主に通知。公告は要らない / 849条9項
Row: 発行可能株式総数の上限 / 公開会社が増やすとき、発行済株式の総数の4倍まで / 公開会社になるとき、同じく4倍まで / 113条3項1号・2号
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（招集通知はいつも1週間、とする）:
試験で「公開会社でない株式会社の招集通知は、いつも1週間」と書いてあったら×。
試験で「設立無効の訴えも、公開会社でない株式会社は1年」と書いてあったら×。
試験で「資本金の額の減少の無効も、1年」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 1年になるのは、株式の発行、自己株式の処分、新株予約権の発行。設立は2年のまま。
Do not print any brand name, account name, or app name. Do not cover the table with characters or the pointer.
```

# Codex用 — 公開会社でない株式会社だけ、定款でできる

1枚の表。条文の言い方は「公開会社を除く」ではなく「公開会社でない株式会社」。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/shouhou/hikoukai-teikan.png`
- 画像キー: `learn/shouhou/hikoukai-teikan`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・商法の「もっと深掘る」。アプリ載せは生成後。
- 続き: `hikoukai-6kagetsu.png`（6か月）、`hikoukai-kikan.png`（期間と知らせ方）

## 法律

109条2項。公開会社でない株式会社は、105条1項各号の権利について、株主ごとに異なる取扱いを定款で定められる。

331条2項本文。株式会社は、取締役が株主でなければならない旨を定款で定めることができない。同項ただし書。公開会社でない株式会社においては、この限りでない。

332条2項。公開会社でない株式会社（監査等委員会設置会社及び指名委員会等設置会社を除く。）は、定款で、取締役の任期を選任後十年以内に終了する事業年度のうち最終のものに関する定時株主総会の終結の時まで伸長できる。原則の任期は332条1項の2年。監査等委員会設置会社の取締役（監査等委員を除く）と指名委員会等設置会社の取締役は1年（332条3項・6項）。10年の伸長の対象外。

336条2項。公開会社でない株式会社は、定款で、監査役の任期を選任後十年以内に終了する事業年度のうち最終のものに関する定時株主総会の終結の時まで伸長できる。原則は336条1項の4年。332条2項のような委員会型の除外はない。

389条。公開会社でない株式会社（監査役会設置会社及び会計監査人設置会社を除く。）は、監査役の監査の範囲を会計に関するものに限定する旨を定款で定められる。

328条は逆向き。大会社（公開会社でないもの、監査等委員会設置会社及び指名委員会等設置会社を除く。）は、監査役会及び会計監査人を置かなければならない。公開会社を除く条文ではない。この表の行にしない。

試験で「公開会社を除く、と条文にある」と書いてあったら×。
試験で「監査等委員会設置会社でも、取締役の任期を10年にできる」と書いてあったら×。
試験で「監査役会設置会社でも、監査範囲を会計に限定できる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（公開会社を除く、と条文にある、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（10年と会計限定の除外を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅとタスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One comparison table is the figure. No left-right debate panels. No three cards at the bottom.
Title: 公開会社でない株式会社だけ、定款でできる
Subtitle: 条文は「公開会社を除く」とは書かない
Header, navy: 定款でできること / 条 / さらに除く会社
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Row: 株主ごとに、異なる取扱い / 109条2項 / なし
Row: 取締役は株主でなければならない、と定める / 331条2項ただし書 / なし
Row: 取締役の任期を、選任後10年以内に終了する事業年度の定時株主総会まで伸長 / 332条2項 / 監査等委員会設置会社、指名委員会等設置会社
Row: 監査役の任期を、同じく10年まで伸長 / 336条2項 / なし
Row: 監査役の監査の範囲を、会計に関するものに限定 / 389条 / 監査役会設置会社、会計監査人設置会社
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（公開会社を除く、と条文にある、とする）:
試験で「公開会社を除く、と条文にある」と書いてあったら×。
試験で「監査等委員会設置会社でも、取締役の任期を10年にできる」と書いてあったら×。
試験で「監査役会設置会社でも、監査範囲を会計に限定できる」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 10年と会計限定は、公開会社でない株式会社でも、除外の会社には使えない。
Do not print any brand name, account name, or app name. Do not cover the table with characters or the pointer.
```

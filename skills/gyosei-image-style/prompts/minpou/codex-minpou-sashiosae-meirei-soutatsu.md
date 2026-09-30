# Codex用 — 差押命令が届くと、第三債務者は債務者へ弁済できなくなる

1枚。上に差押命令の定義。中央は送達で弁済が止まる場面。下に、優劣を比べる2行の表。左右のdebateパネルは使わない。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。`butsujo-daii-saiken-joto-4koma.png` は債権譲渡の別図なので、このファイルでは描かない。

- 保存先: `assets/images/deepdive/learn/minnpou/sashiosae-meirei-soutatsu-toki.png`
- 画像キー: `learn/minnpou/sashiosae-meirei-soutatsu-toki`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。アプリ載せは生成後。

## 法律

差押命令は、執行裁判所が発する命令である。債務者に対し、その債権の取立てその他の処分を禁止し、かつ、第三債務者に対し、債務者への弁済を禁止する（民事執行法145条1項）。差押えの効力は、差押命令が第三債務者に送達された時に生ずる（同条5項）。

債務者は、第三債務者から見れば自己の債権者である。送達後、第三債務者はその債権者へ弁済できない。

一般債権者の債権差押えと、抵当権者の物上代位に基づく差押えが競合したとき、優劣は二つの差押命令の送達の先後では決まらない。一般債権者の差押命令が第三債務者に送達された時と、抵当権設定登記の先後で決まる（最判平成10年3月26日、民集52巻2号483頁）。抵当権を第三者に対抗するには抵当権設定登記を要する（民法177条）。物上代位の優先は、登記された抵当権から来る。

送達が登記より先なら、抵当権者は配当を受けられない。登記が先なら、抵当権者の物上代位が優先する。登記が先でも、払渡し又は引渡しの前の差押えは別に必要である（民法304条1項ただし書、372条で抵当権に準用）。

試験で「物上代位の差押命令の送達と、一般債権者の差押命令の送達の先後で決まる」と書いてあったら×。
試験で「第三債務者に送達されても、債務者へは払ってよい」と書いてあったら×。
試験で「登記が先なら、払渡し前の差押えは不要」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 第三債務者 | いい役 | 第三債務者（送達されたら、自分の債権者へ弁済できない） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 中央。差押命令の書面を受け取る。お金の矢印を隠さない |
| 抵当権者 | いい役 | 抵当権者（登記で物上代位の優先を持ちたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 表の「抵当権設定登記」の側。表を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（二つの差押命令の送達の先後で決まると言う） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 表の下のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（送達で弁済が止まることを指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

過去の辻さんと代さんは置かない。名簿外の人物を置かない。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。

## GPT Image プロンプト

```text
参照必須: タスク亀は assets/images/characters/task_turtle_sheet.png。ぴっちゅは assets/images/characters/pitchi_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。ちゃちゃロットは skills/gyosei-image-style/assets/approved-chachalot-pointer.png と approved-smiling-hat-mascot.png。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。緑の講師スーツは白シャツ、ズボン、靴まで。1体だけ。下余白の右。指し棒は答え帯に重ねない。

Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. 16:9. One definition card on top, one center scene, then one two-row comparison table. No left-right debate panels.

Title: 差押命令が第三債務者に届くと、債務者へは弁済できなくなる
Small chip: 物上代位との優劣は、抵当権設定登記とその送達の先後

Definition card:
差押命令とは、執行裁判所の命令（民事執行法145条1項）
債務者には、債権の取立てその他の処分を禁止する
第三債務者には、債務者への弁済を禁止する
効力は、第三債務者に送達された時に生ずる（145条5項）

Center scene: タスク亀 receives a document labeled 差押命令. A money arrow toward a label 債務者（第三債務者の債権者） is stopped.
Caption under タスク亀: 第三債務者（送達されたら、自分の債権者へ弁済できない）
Scene line: 送達されると、第三債務者は、自己の債権者である債務者へ弁済できなくなる

Table. Header row is a navy band. Data row 1 background white. Data row 2 background light gray. Do not stripe by column.
Columns: 比べる時点 / 先だったとき
Row 1 white: 抵当権設定登記（民法177条） / 抵当権者の物上代位が優先。払渡し前の差押えは別に必要（304条）
Row 2 light gray: 一般債権者の差押命令の第三債務者への送達（145条5項） / 抵当権者は配当を受けられない
ぴっちゅ stands by the registration row.
Caption under ぴっちゅ: 抵当権者（登記で物上代位の優先を持ちたい）

Under the table, one trap line with カチャドクロ beside it, not covering the words:
試験で「物上代位の差押命令の送達と、一般債権者の差押命令の送達の先後で決まる」と書いてあったら×

Navy answer bar:
優劣は、抵当権設定登記と、一般債権者の差押命令の第三債務者への送達の先後で決まる。

One ちゃちゃロット only, bottom-right cream margin above the answer bar. Characters do not cover the definition, the stopped arrow, the table, or the answer bar.
```

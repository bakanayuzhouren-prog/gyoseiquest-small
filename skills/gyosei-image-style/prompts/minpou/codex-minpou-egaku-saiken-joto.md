# Codex用 — 自分の肖像を描いてもらう債権は、人を代えて譲渡できない

1枚。上に466条1項。中央は、Aの肖像を描く仕事と、Cへの譲渡が止まる場面。下に2行の比較表。左右のdebateパネルは使わない。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。

芸術家という職業が理由、とは書かない。描かれる人がAからCに変わる、と書く。466条1項ただし書に、許可があれば譲渡できる、とは書かない。条文にその例外はない。

- 保存先: `assets/images/deepdive/learn/minnpou/egaku-saiken-joto.png`
- 画像キー: `learn/minnpou/egaku-saiken-joto`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。アプリ載せは生成後。

## PRE-GENERATE-CHECK

民法466条1項。債権は、譲り渡すことができる。ただし、その性質がこれを許さないときは、この限りでない。

466条2項。当事者が債権の譲渡を禁止し、又は制限する旨の意思表示をしたときであっても、債権の譲渡は、その効力を妨げられない。性質上の制限とは別。この図の答えは1項ただし書。

Aが、Bに、A自身の肖像を描いてもらう債権を有する。この債権をCへ譲渡すると、Bが描く内容はAの肖像からCの肖像に変わる。債権者が代わると給付の内容が変わるので、性質が譲渡を許さない。

貸金のように、債権者が代わっても給付の内容が変わらない債権は、1項本文で譲り渡すことができる。

風景画を完成して渡すだけの債権は、この図の例にしない。描かれる人が替わらない仕事は、このただし書の説明に使わない。

試験で「芸術家なので、その許可がなければ譲渡できない」と書いてあったら×。
試験で「譲渡を禁止する特約があるときと同じで、譲渡自体は有効」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 注文者 | いい役 | A（注文者。自分の肖像を描いてもらいたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 中央の左。キャンバスを隠さない |
| 請負人 | いい役 | B（請負人。Aの肖像を描く） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | キャンバスの手前。絵と矢印を隠さない |
| 譲受人 | 悪い役 | C（譲受人。Aの肖像を描かせる債権を受け取りたい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 止まった矢印の先。条文と表を隠さない |
| 案内 | いい役 | 案内（止まった矢印を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

過去の辻さんと代さんは置かない。名簿外の人物を置かない。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは assets/images/characters/pitchi_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。ちゃちゃロットは skills/gyosei-image-style/assets/approved-chachalot-pointer.png と approved-smiling-hat-mascot.png。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。緑の講師スーツは白シャツ、ズボン、靴まで。1体だけ。下余白の右。指し棒は条文と答え帯に重ねない。

Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. 16:9. One statute card on top, one center scene, then one two-row comparison table. No left-right debate panels.

Title: 自分の肖像を描いてもらう債権は、人を代えて譲渡できない

Statute card, this sentence:
債権は、譲り渡すことができる。ただし、その性質がこれを許さないときは、この限りでない。（民法466条1項）

Center: タスク亀 paints a canvas that shows ぴっちゅ's face. Caption under ぴっちゅ: A（注文者。自分の肖像を描いてもらいたい）. Caption under タスク亀: B（請負人。Aの肖像を描く）.
An arrow from A toward カチャドクロ is stopped. Caption under カチャドクロ: C（譲受人。Aの肖像を描かせる債権を受け取りたい）.
Scene line: 債権者がCに代わると、描かれる人がAからCに変わる。

Table. Header row is a navy band. Data row 1 background white. Data row 2 background light gray. Do not stripe by column.
Columns: 債権 / 譲渡できるか
Row 1 white: 貸金債権 / 譲り渡すことができる（466条1項本文）
Row 2 light gray: Aの肖像を描いてもらう債権 / 性質が許さない（466条1項ただし書）

Under the table:
試験で「芸術家なので、その許可がなければ譲渡できない」と書いてあったら×
試験で「譲渡を禁止する特約があるときと同じで、譲渡自体は有効」と書いてあったら×
Small line: 譲渡を禁止する意思表示をしても、譲渡の効力は妨げられない（466条2項）。性質上の制限とは別。

暗記: 描かれる人が代わると、給付の内容が変わる。
Navy answer bar:
Aの肖像を描いてもらう債権は、債権者が代わると描く内容が変わるので、その性質が譲渡を許さない。

One ちゃちゃロット only, bottom-right cream margin above the answer bar. Characters do not cover the statute, the canvas, the stopped arrow, the table, or the answer bar.
```

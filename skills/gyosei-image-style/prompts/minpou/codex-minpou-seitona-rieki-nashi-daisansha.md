# Codex用 — 正当な利益のない第三者の弁済

- 関連: LEC公開3・問32・肢1。代位に債権者の承諾は要らない。対抗は500条・467条。

定型の左右パネルと中央表と底部3カードは使わない。左から右へ、弁済、代位、対抗の3箱。同じ文をタイトルと答え帯で繰り返さない。

- 保存先: `assets/images/deepdive/learn/minnpou/seitona-rieki-nashi-daisansha.png`
- 画像キー: `learn/minnpou/seitona-rieki-nashi-daisansha`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・債権総論の「もっと深掘る」。アプリ載せは生成後。
- 保証人・物上保証人・求償の範囲・501条は、この枚に入れない。

## PRE-GENERATE-CHECK

民法499条。債務者のために弁済をした者は、債権者に代位する。債権者の承諾は要件ではない。

民法500条。467条は、正当な利益を有する者が代位する場合を除き、499条の代位に準用される。

民法467条。譲渡人が債務者に通知をし、又は債務者が承諾をしなければ、債務者その他の第三者に対抗することができない。準用では、通知をするのは債権者。承諾をするのは債務者。債権者の承諾ではない。

民法474条2項。正当な利益を有しない第三者は、債務者の意思に反して弁済することができない。債権者がその意思に反することを知らなかったときは、弁済できる。これは代位の承諾とは別。474条3項の委託は、この枚に入れない。

試験の×は、代位に債権者の承諾が要る、とすること。
試験の×は、対抗に要るのも債権者の承諾だ、とすること。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 第三者 | いい役 | 第三者（債務者のために弁済したい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 左の箱の上。お金と矢印を隠さない |
| 債権者 | いい役 | 債権者（弁済を受け、債務者へ通知したい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 左の箱の右。通知の矢印の起点。本文を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（代位に債権者の承諾が要る、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部の試験の×だけ。1体 |
| 案内 | いい役 | 案内（対抗の箱を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。指し棒は文字に重ねない |

債務者は人物にしない。右の箱の書類にする。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは assets/images/characters/pitchi_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。ちゃちゃロットは skills/gyosei-image-style/assets/approved-chachalot-pointer.png と approved-smiling-hat-mascot.png。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。緑の講師スーツは白シャツ、ズボン、靴まで。1体だけ。下余白の右。指し棒は文字に重ねない。

Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. 16:9. Three boxes in one horizontal row, left to right. No comparison table. No left-right debate panels. No bottom three-card row.

Title: 正当な利益のない第三者が弁済した。債権者の承諾は要る？

One line under the title: 保証人でも、物上保証人でもない第三者。

Above the first box, one short note: 債務者の意思に反する弁済は、原則できない。債権者がその反対を知らなければ、弁済できる（474条2項）。

Box 1, left: 弁済する
ぴっちゅ hands money to タスク亀. Label under ぴっちゅ: 第三者（債務者のために弁済したい）. Label under タスク亀: 債権者（弁済を受け、債務者へ通知したい）.

Arrow to box 2.
Box 2: 代位する（499条）
債権者の承諾は要らない。

Arrow to box 3.
Box 3: 債務者その他の第三者に対抗する（500条、467条）
債権者が債務者に通知する。または、債務者が承諾する。
A document stands for the debtor. Label on the document: 債務者（通知を受けるか、承諾する）.

Under box 3 only: 正当な利益がある者は、この通知も、債務者の承諾も要らない。

Bottom amber strip, カチャドクロ only here, label 誤った主張（代位に債権者の承諾が要る、とする）:
試験の×は、代位に債権者の承諾が要る、とすること。
試験の×は、対抗に要るのも債権者の承諾だ、とすること。

Navy answer bar:
代位は、債権者の承諾なしに生じる。対抗は、債権者から債務者への通知、または債務者の承諾。

One ちゃちゃロット only, bottom-right cream margin. The pointer aims at box 3 from outside the box. No speech bubble. Characters do not cover the title, the three boxes, the amber strip, or the answer bar.
Do not print any brand name, account name, or app name.
```

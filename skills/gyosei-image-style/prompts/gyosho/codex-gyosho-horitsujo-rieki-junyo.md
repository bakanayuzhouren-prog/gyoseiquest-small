# Codex用 — 法律上の利益は、9条の準用か、その訴訟の条文か

1枚の表。無効等確認は36条の独自規定で、9条の準用ではない、を一番はっきり書く。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/gyosho/horitsujo-rieki-junyo.png`
- 画像キー: `learn/gyosho/horitsujo-rieki-junyo`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政事件訴訟法の「もっと深掘る」。アプリ載せは生成後。

## 法律

取消訴訟の原告適格は、9条1項が本体。処分又は裁決の取消しを求めるにつき法律上の利益を有する者に限り、提起できる。

無効等確認は、36条自身の一文。続く処分により損害を受けるおそれのある者その他、無効等の確認を求めるにつき法律上の利益を有する者で、処分若しくは裁決の存否又はその効力の有無を前提とする現在の法律関係に関する訴えによって目的を達することができない者に限る。9条の準用ではない。9条2項の準用でもない。

非申請型の義務付けは、37条の2第3項自身が「法律上の利益を有する者に限り」と書く。9条全体の準用ではない。法律上の利益の有無の判断についてだけ、9条2項を準用する（37条の2第4項）。

差止めは、37条の4第3項自身が「法律上の利益を有する者に限り」と書く。9条全体の準用ではない。判断についてだけ、9条2項を準用する（37条の4第4項）。

申請型の義務付けは、37条の3第2項。法律上の利益とは書かない。申請又は審査請求をした者に限る。9条の準用ではない。

不作為の違法確認は、37条。法律上の利益とは書かない。申請をした者に限る。9条の準用ではない。

試験で「無効等確認の原告適格は、9条の準用」と書いてあったら×。
試験で「義務付けは、すべて9条1項が準用される」と書いてあったら×。
試験で「差止めは、9条全体の準用」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（無効確認も9条の準用、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（36条の行を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅとタスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One comparison table is the figure. No left-right debate panels. No three cards at the bottom.
Title: 法律上の利益は、9条の準用か
Subtitle: 無効等確認だけは、36条の独自の一文。準用ではない
Header, navy: 訴訟 / 条 / 法律上の利益の出方 / 9条との関係
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Highlight the 無効等確認 row with a thin amber outline so it is the row the eye hits. Do not color the whole row red.
Row 取消訴訟: 9条1項 / この条が本体。取消しを求めるにつき法律上の利益を有する者 / 準用ではない。本体
Row 無効等確認: 36条 / 続く処分で損害を受けるおそれがある者その他、法律上の利益を有する者で、現在の法律関係の訴えでは目的を達せない者 / 9条の準用ではない。9条2項の準用でもない
Row 非申請型の義務付け: 37条の2第3項 / 条文自身が、法律上の利益を有する者に限り、と書く / 9条全体の準用ではない。判断の仕方だけ9条2項を準用（第4項）
Row 差止め: 37条の4第3項 / 条文自身が、法律上の利益を有する者に限り、と書く / 9条全体の準用ではない。判断の仕方だけ9条2項を準用（第4項）
Row 申請型の義務付け: 37条の3第2項 / 法律上の利益とは書かない。申請又は審査請求をした者 / 9条の準用ではない
Row 不作為の違法確認: 37条 / 法律上の利益とは書かない。申請をした者 / 9条の準用ではない
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（無効確認も9条の準用、とする）:
試験で「無効等確認の原告適格は、9条の準用」と書いてあったら×。
試験で「義務付けは、すべて9条1項が準用される」と書いてあったら×。
試験で「差止めは、9条全体の準用」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 36条は、法律上の利益に加え、現在の法律関係の訴えでは目的を達せないことまで書く。
Do not print any brand name, account name, or app name. Do not cover the table with characters or the pointer.
```

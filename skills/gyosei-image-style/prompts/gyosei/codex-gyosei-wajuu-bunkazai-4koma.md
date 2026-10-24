# Codex用 — 輪中堤事件。歴史の価値は、補償に足す？

4コマを横一列。左右パネルと中央表は使わない。同じ文をタイトルとコマで繰り返さない。全部を壊した、とは書かない。訴え全部の棄却、とは書かない。88条を畑の人だけ、とは書かない。図の印字は下の4場面だけ。離作料、通常受ける損失の説明、農業・営業・家賃の例は図に書かない。歴史の価値は、どんな場合も補償しない、とは書かない。

- 状態: 印字を短くした。画像はまだ生成しない
- 保存先: `assets/images/deepdive/learn/gyosei/wajuu-bunkazai-4koma.png`
- 上書き対象: `assets/images/deepdive/learn/gyosei/wajuu-bunkazai-4koma.png`
- 画像キー: `learn/gyosei/wajuu-bunkazai-4koma`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政法。アプリ載せは生成後。生成前は `[[image:]]` を付けない。
- 関連: TAC第3回・問21・肢2。LEC当たる第3回・問21の輪中堤も同じ図。正当な補償の言葉の図 `sonshitsu-hoshou-yogo.png` は上書きしない。

## 法律（最判昭63.1.21・名古屋地判昭53.4.28の事実）

江戸時代初期から、村落を水害から守ってきた輪中堤。長良川の改修で、その堤を縦断する新しい堤防が造られた。昭和48年1月19日当時、古い輪中堤は新しい堤防の東側に一部残っていた。

争いは、占用許可の取消に伴う補償に、歴史的・社会的・学術的価値を上乗せするか。土地収用法（改正前）88条の「通常受ける損失」は、客観的社会的にみて収用により当然に受ける経済的・財産的な損失。現行88条も、離作料、営業上の損失、建物の移転による賃貸料の損失その他、通常受ける損失を補償する。

歴史的・学術的価値は、土地の取引価格を上げないので、上乗せしない。敷地の不動産としての価格は、別で支払う。書画・刀剣のように文化財的価値が取引価格に乗るときは、その価格で補償する。この88条の切り分けは、プロンプト本文に残す。図には書かない。

図の印字は次だけ。1「むかしから、村を水から守る堤があった。」2「工事で、古い堤の一部がこわされた。」と当事者「長い歴史の分も、お金を払ってほしい！」3 裁判所「その歴史で、土地を売るときの値段は上がる？」と答え「この堤では、上がらない。」4「土地の値段は別に払う。歴史の分のお金は足さない。」小さな注記「古い絵など、歴史の価値で売る値段が上がるものは、その値段で補償する。」

試験で「堤防の土地の代金まで出ない」と書いてあったら×。
試験で「文化財的価値は、すべて補償しない」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 村落 | いい役 | 村落の人（水害から守られたい） | ぴっちゅ | `assets/images/characters/pitchi.png` ＋ `pitchi_sheet.png` | 1コマだけ。堤と本文を隠さない |
| 占用者 | 悪い役 | 占用者（歴史の分も払ってほしい） | カチャドクロ | `assets/images/characters/kachadokuro.png` ＋ `kachadokuro_sheet.png` | 2コマだけ。吹き出しは絵の側。説明文には重ねない |
| 裁判所 | いい役 | 裁判所（売る値段が上がるかを聞きたい） | タスク亀 | `assets/images/characters/task_turtle.png` ＋ `task_turtle_sheet.png` | 3コマだけ。問いの吹き出しと答えの行を隠さない |
| 案内 | いい役 | 案内（判決を指す。本文を隠さない） | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png` | 4コマの下の余白。1体。緑の講師スーツ |

過去の辻さんと代さんは置かない。名簿外は置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは assets/images/characters/pitchi_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。ちゃちゃロットは assets/approved-chachalot-pointer.png と assets/approved-smiling-hat-mascot.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Exactly four comic panels in one horizontal row. No second row of panels. No comparison table. No left essay column. No right essay column. No brand name, account name, or watermark.

Each panel has two zones with a clear empty gap between them. Upper zone: picture and one speech bubble only. Lower zone: the caption, on its own band. Characters, the levee, the excavator, and speech bubbles stay in the upper zone. No character, pointer, or bubble touches the lower band. No words written on the levee or the machine. No second copy of the same sentence.

Title: 輪中堤事件。歴史の価値は、補償に足す？
Subtitle, one line: 最判昭63.1.21。上乗せするかが争い

Panel 1 title: まず何が起きた
An old earthen levee protects a small village from water. ぴっちゅ stands small beside the village, inside the upper zone, not covering the levee or the caption. Label under ぴっちゅ, still inside the upper zone: 村落の人（水から守られたい）
Caption, lower band only: むかしから、村を水から守る堤があった。

Panel 2 title: 当事者の言い分
Construction has broken part of the old levee. Some of the old levee is still there. No extra labels on the levee. カチャドクロ stands in the upper zone. The speech bubble stays in the upper zone and does not enter the caption band. Label under カチャドクロ, upper zone: 占用者（歴史の分も払ってほしい）
Speech bubble: 長い歴史の分も、お金を払ってほしい！
Caption, lower band only: 工事で、古い堤の一部がこわされた。

Panel 3 title: 裁判所が見た争点
タスク亀 stands in the upper zone, not covering the question or the answer. No law-book paragraph. Label under タスク亀, upper zone: 裁判所（売る値段が上がるかを聞きたい）
Speech bubble, upper zone only: その歴史で、土地を売るときの値段は上がる？
Caption, lower band only: この堤では、上がらない。

Panel 4 title: 判決
No scene character inside this panel. Caption: 土地の値段は別に払う。歴史の分のお金は足さない。
One short note under that caption, still large enough to read, with a gap: 古い絵など、歴史の価値で売る値段が上がるものは、その値段で補償する。

ちゃちゃロット is one mascot only, in the bottom margin under panel 4, outside the panel, green lecturer suit, white shirt, trousers, and shoes. Wooden pointer toward the sentence 歴史の分のお金は足さない。 Do not cover that sentence or the note. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. No nameplate.

Do not print any brand name, account name, or app name. Do not cover captions with characters or the pointer.
```

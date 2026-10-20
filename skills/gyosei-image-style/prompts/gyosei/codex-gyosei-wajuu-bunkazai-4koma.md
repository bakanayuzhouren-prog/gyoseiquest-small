# Codex用 — 輪中堤事件。歴史の価値は、補償に足す？

4コマを横一列。左右パネルと中央表は使わない。同じ文をタイトルとコマで繰り返さない。全部を壊した、とは書かない。訴え全部の棄却、とは書かない。88条を畑の人だけ、とは書かない。

- 保存先: `assets/images/deepdive/learn/gyosei/wajuu-bunkazai-4koma.png`
- 画像キー: `learn/gyosei/wajuu-bunkazai-4koma`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政法。アプリ載せは生成後。生成前は `[[image:]]` を付けない。
- 関連: TAC第3回・問21・肢2。LEC当たる第3回・問21の輪中堤も同じ図。正当な補償の言葉の図 `sonshitsu-hoshou-yogo.png` は上書きしない。

## 法律（最判昭63.1.21・名古屋地判昭53.4.28の事実）

江戸時代初期から、村落を水害から守ってきた輪中堤。長良川の改修で、その堤を縦断する新しい堤防が造られた。昭和48年1月19日当時、古い輪中堤は新しい堤防の東側に一部残っていた。

争いは、占用許可の取消に伴う補償に、歴史的・社会的・学術的価値を上乗せするか。土地収用法（改正前）88条の「通常受ける損失」は、客観的社会的にみて収用により当然に受ける経済的・財産的な損失。現行88条も、離作料、営業上の損失、建物の移転による賃貸料の損失その他、通常受ける損失を補償する。

歴史的・学術的価値は、土地の取引価格を上げないので、上乗せしない。敷地の不動産としての価格は、別で支払う。書画・刀剣のように文化財的価値が取引価格に乗るときは、その価格で補償する。

試験で「堤防の土地の代金まで出ない」と書いてあったら×。
試験で「文化財的価値は、すべて補償しない」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 村落 | いい役 | 村落の人（水害から守られたい） | ぴっちゅ | `assets/images/characters/pitchi.png` ＋ `pitchi_sheet.png` | 1コマだけ。堤と本文を隠さない |
| 占用者 | 悪い役 | 占用者（歴史の価値も補償してほしい） | カチャドクロ | `assets/images/characters/kachadokuro.png` ＋ `kachadokuro_sheet.png` | 2コマだけ。吹き出しの外に置く |
| 裁判所 | いい役 | 裁判所（88条の損失の形を見たい） | タスク亀 | `assets/images/characters/task_turtle.png` ＋ `task_turtle_sheet.png` | 3コマだけ |
| 案内 | いい役 | 案内（判決を指す。本文を隠さない） | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png` | 4コマの下の余白。1体。緑の講師スーツ |

過去の辻さんと代さんは置かない。名簿外は置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは assets/images/characters/pitchi_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。ちゃちゃロットは assets/approved-chachalot-pointer.png と assets/approved-smiling-hat-mascot.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Exactly four comic panels in one horizontal row. No second row of panels. No comparison table. No left essay column. No right essay column. No brand name, account name, or watermark.

Title: 輪中堤事件。歴史の価値は、補償に足す？
Subtitle, one line: 最判昭63.1.21。上乗せするかが争い

Panel 1 title: まず何が起きた
An old earthen levee has protected a small village from flood water since the early Edo period. ぴっちゅ stands small beside the village, not covering the levee. Label under ぴっちゅ: 村落の人（水害から守られたい）
Caption: 江戸時代初期から、村落を水害から守ってきた輪中堤があった。長良川の改修が始まった。

Panel 2 title: 当事者の言い分
A new levee cuts across part of the old levee. Part of the old levee remains on the east side. カチャドクロ stands beside the scene, speech bubble outside the caption. Label under カチャドクロ: 占用者（歴史の価値も補償してほしい）
Caption: 輪中堤の一部を壊し、横切る新しい堤防を造った。古い堤は一部残った。占用許可が取り消された。
Speech bubble: 先祖が築き、村落を守ってきた。この価値も損失だ。補償せよ。

Panel 3 title: 裁判所が見た争点
タスク亀 looks at Article 88, not a winner's flag. Label under タスク亀: 裁判所（88条の損失の形を見たい）
Caption: その歴史的・学術的価値は、88条の通常受ける損失か。
Next line: 通常受ける損失は、離作料、営業上の損失、移転で失う賃貸料など、ふつう失う経済的・財産的な損失。
Next line: 歴史的・学術的価値は、土地の取引価格を上げない。

Panel 4 title: 判決
No scene character inside this panel. Caption: 文化財的価値の上乗せは、補償しない。
Next line: 敷地の不動産としての価格は、別で支払う。
Next line: 取引価格に乗る文化財的価値は、その価格で補償する。
Small line, once: 試験で「土地の代金まで出ない」と書いてあったら×。

ちゃちゃロット is one mascot only, in the bottom margin under panel 4, green lecturer suit, white shirt, trousers, and shoes. Wooden pointer toward the sentence 文化財的価値の上乗せは、補償しない。Do not cover that sentence. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. No nameplate.

Do not print any brand name, account name, or app name. Do not cover captions with characters or the pointer.
```

# Codex用 — 差押え後の弁済と、損害の限度（481条）

生成済み。再生成しない。

問題文を上に置く。その下で、A・B・Cが誰かを固定する。損害は、CがBへ払った全額ではない。Aが差押えで取れなくなった額。左右パネルと中央表は使わない。

- 保存先: `assets/images/deepdive/learn/minnpou/sashiosae-songai-481.png`
- 画像キー: `learn/minnpou/sashiosae-songai-481`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・債権総論の「もっと深掘る」。アプリ載せは生成後。

## 法律（481条）

差押えを受けた債権の第三債務者が、自己の債権者に弁済をしたときは、差押債権者は、その受けた損害の限度で、さらに弁済すべき旨を第三債務者に請求できる。

この文の「債務者」は、差押えを受けた人ではない。差し押さえた債権を支払う義務がある人、つまり第三債務者。

具体額で固定する。

- Aは差押債権者。Bに対して60万円の債権がある。取り立てのため、BがCに持っている100万円の債権を差し押さえた。
- Bは債務者。Aに60万円を負い、Cに対して100万円の債権を持っている。差し押さえたのは、この債権。
- Cは第三債務者。Bに100万円を払う義務がある。Cにとっての自己の債権者はB。

差押えのあと、CがBへ100万円を払った。Aが取れなくなったのは60万円。これが損害。Cは、Aに対してさらに60万円を払う責任を負う。100万円全部ではない。二重に払うのはBではなくC。

試験で「CがBに払った100万円全部が、Aの損害である」と書いてあったら×。
試験で「もう一度払うのはB」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 差押債権者 | いい役 | A（60万円を、差押えで取りたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 左。本文を隠さない |
| 第三債務者 | いい役 | C（Bに払ってしまい、Aへもう一度払うことになる） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 右 |
| 債務者 | 悪い役 | B（差し押さえたはずの100万円を、自分で受け取りたい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 中央。金の行き先 |
| 案内 | いい役 | 案内（損害は60万円、と指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。ぴっちゅは pitchi_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. No left-right debate panels. No center table.

Title: 差押えのあと、もう一度払うのは誰か（481条）

Problem box at the top, full sentence:
差押えを受けた債権について、自己の債権者に弁済をした債務者は、差押債権者が受けた損害の限度において、さらに差押債権者に対しても弁済すべき責任を負う。

Lead line: この文の「債務者」は、差押えを受けた人ではない。第三債務者Cのこと。

Three labeled people in one row.
Left, タスク亀, name plate A, label 差押債権者（Bへの60万円を、差押えで取りたい）.
Center, カチャドクロ, name plate B, label 債務者（Cへの100万円の債権を持っている。差押えのあと、その100万円を自分で受け取った）.
Right, ぴっちゅ, name plate C, label 第三債務者（自己の債権者はB。Bへ100万円払った）.
Arrow from A to the claim between B and C: 差し押さえた債権は、BのCに対する100万円。
Small note: Cにとっての自己の債権者はB。Aではない。

Second row, the money after seizure. Show two amounts, do not merge them.
ぴっちゅ（C）is on the right. カチャドクロ（B）is on the left. The 100万円 bill and the arrow both move from right to left, from C to B. Do not point this arrow from B toward C.
Label on that arrow: CがBへ100万円を支払った（誤った弁済）. B holds the received 100万円.
Separate bill of 60万円 is what A could not collect. Caption: 損害は、CがBへ払った100万円ではない。Aが差押えで取れなくなった60万円。
Arrow of 60万円 from C back to A. Caption: Cは、Aに対してさらに60万円を払う。100万円全部ではない。

Bottom trap strip, amber:
試験で「CがBに払った100万円全部が、Aの損害である」と書いてあったら×。
試験で「もう一度払うのはB」と書いてあったら×。

Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 損害は、Aが差押えで取れなくなった額。この例では60万円。

Do not print any brand name, account name, or app name. Do not cover the names A, B, C or the amounts with characters or the pointer.
```

# Codex用 — 免責的債務引受と取消権（4コマ）

4コマで、472条の2の場面を見せる。左右パネルと中央表は使わない。問題文は上の短い自作事例。模試の問題文は載せない。

- 保存先: `assets/images/deepdive/learn/minnpou/menseki-torikeshi-4koma.png`
- 画像キー: `learn/minnpou/menseki-torikeshi-4koma`
- 生成は Codex。Cursor は描かない。
- `heizon-mensekiteki-hikiuke.png` と `hosho-rentai-hikiuke.png` は上書きしない。
- 配置案: 見て聞いて覚える・債権総論の「もっと深掘る」。アプリ載せは生成後。

## 法律（この枚の芯）

債権者は、債務者を欺いて絵を100万円で売った。債務者は詐欺を理由に取り消せる（96条）。取り消せば、代金債務はなくなる。取り消す前に、引受人が免責的債務引受をした。債務者はもう100万円を負わない。引受人が負う（472条）。

債務者は既に免れているので、取り消す実益が薄い。引受人は売買の当事者ではないので、債務者の取消権を自分では行使できない。このままでは、取り消せたはずの100万円を引受人が払う。

472条の2は、引受人に取消権を渡さない。引受がなければ、取消によって債務者が免れることができた限度で、引受人は履行を拒める。この例では100万円全部。

試験で「引受人は、債務者の取消権を自分で行使できる」と書いてあったら×。
試験で「免責的債務引受が、取消を禁止する」と書いてあったら×。

## 配役（この枚で固定）

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| だました側 | 悪い役 | 債権者（詐欺で絵を売り、代金を取りたい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 1コマと3コマ。本文を隠さない |
| だまされた側 | いい役 | 債務者（詐欺を取り消して、代金債務をなくしたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 1コマと3コマ |
| 引き受けた側 | いい役 | 引受人（100万円の履行を拒みたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 2コマと4コマ |
| 案内 | いい役 | 案内（注記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 4コマの外、下余白の右。1体。緑の講師スーツ |

過去の辻さんと代さんは置かない。キングカチャドクロとプリンセスカチャドクロは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ぴっちゅは pitchi_sheet.png。タスク亀は task_turtle_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. A short problem box on top, then four comic panels in one row. No comparison table. No left-right debate panels.

Title: 免責的債務引受のあと、取消権はどうなるか（472条の2）

Problem box:
債権者が、債務者を欺いて絵を100万円で売った。債務者は詐欺を理由に取り消せる。取り消せば、代金債務はなくなる。取り消す前に、引受人が免責的債務引受をした。

Lead line under the problem box: この状況は、次のとおり。

Panel 1 title: 詐欺で売った
カチャドクロ hands a painting to ぴっちゅ. Price tag 100万円. Label under カチャドクロ: 債権者（詐欺で代金を取りたい）. Label under ぴっちゅ: 債務者（取り消して代金債務をなくしたい）. Caption: 取り消せば、代金債務はなくなる（96条）。

Panel 2 title: 取り消す前に、免責的債務引受
タスク亀 takes a new debt document for 100万円. ぴっちゅ's debt document is crossed out. No カチャドクロ in this panel. Label under タスク亀: 引受人（債務を引き受けた）. Caption: 債務者はもう負わない。引受人が負う（472条）。

Panel 3 title: 債務者は、もう取り消す実益が薄い
ぴっちゅ stands aside, already released. カチャドクロ demands 100万円 from an empty space where the debtor was. Caption: 引受人は売買の当事者ではない。債務者の取消権は、自分では行使できない。

Panel 4 title: 引受人は、履行を拒める
タスク亀 holds up a hand and refuses the 100万円 bill. カチャドクロ is not in this panel. Caption: 引受がなければ免れることができた限度で、履行を拒める（472条の2）。この例では100万円全部。取消権そのものは渡されない。
Small line in panel 4: 試験で「引受人が自分で取り消せる」と書いてあったら×。

Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only, outside the four panels. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 引受は、取消を禁止しない。債務者が先に外れるので、取り消して免れる実益が本人から薄くなる。

Do not print any brand name, account name, or app name. Do not cover the captions with characters or the pointer.
```

# Codex用 — 賃料を先に譲渡しても、なぜ抵当権が届くのか（4コマ）

16:9の横長4コマ。1コマ1仕事。左右パネルと中央表は使わない。抵当権が常に勝つ、とは書かない。対抗要件の日付勝負にもしない。

- 保存先: `assets/images/deepdive/learn/minnpou/butsujo-daii-saiken-joto-4koma.png`
- 画像キー: `learn/minnpou/butsujo-daii-saiken-joto-4koma`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。アプリ載せは生成後。

## 法律

抵当権の効力は、先取特権の物上代位（304条）を準用する（372条）。目的物の賃貸によって債務者が受けるべき金銭にも及ぶ。ただし、払渡し又は引渡しの前に差押えをしなければならない（304条1項ただし書）。

先に登記された建物抵当権のあと、建物所有者が将来の賃料債権を譲渡し、確定日付のある通知で対抗要件を備えても、債権譲渡は304条1項の「払渡し又は引渡し」に含まれない（最判平成10年1月30日）。賃料がまだ弁済されていなければ、抵当権者は物上代位による差押えで、その未払い賃料に届く。譲渡の対抗要件が差押えより先でも、同じである。

境目は、実際の弁済だ。差押命令が第三債務者（賃借人）へ送達される前に、第三債務者が譲受人へ弁済した部分は消滅し、抵当権者は追えない。まだ弁済されていなければ、抵当権者が差し押さえて物上代位できる。差押え自体と、差押命令の第三債務者への送達を混ぜない。

理由は三つ。抵当権の効力は登記で公示されている。譲渡だけでは担保価値は消えない。譲渡による物上代位逃れを防ぐ。

試験で「債権譲渡の対抗要件が先なら、常に譲受人が優先する」と書いてあったら×。
試験で「債権譲渡は、304条の払渡し又は引渡しに当たる」と書いてあったら×。
試験で「抵当権者は、賃料債権を差し押さえなくても物上代位できる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 抵当権者 | いい役 | 抵当権者（建物の担保価値を確保したい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 1コマと3コマだけ |
| 譲渡する側 | いい役 | 建物所有者（賃料債権を譲渡したい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 誤った主張 | 悪い役 | 誤った主張をする側（確定日付が先なら必ず譲受人が勝つ、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 底部ひっかけだけ |
| 案内 | いい役 | 案内（暗記帯を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

賃借人は人物にしない。部屋のドアと賃料袋だけ。4コマにちゃちゃロットを重ねない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。ぴっちゅは pitchi_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study 4-panel comic, 16:9 landscape, from scratch. Warm off-white background. Thick navy outlines, large gothic type, clear gaps. Four panels left to right, numbered 1 to 4. One job per panel. No left-right debate panels. No center table. No brand name, account name, or app name.
Title: 賃料を先に譲渡しても、なぜ抵当権が届くのか
Subtitle: 対抗要件の早い者勝ちではない
Do not write that the mortgage always wins. Do not draw this as a simple race of dates between the assignment and the mortgage registration.

Panel 1. 先に抵当権を登記
A building with a sign 抵当権登記. タスク亀 only in this panel, label 抵当権者（建物の担保価値を確保したい）.
Text: 建物に抵当権を設定し、登記した。抵当権の効力は、物上代位によって賃料債権にも及び得る（372条・304条）。

Panel 2. あとから賃料債権を譲渡
ぴっちゅ only in this panel, label 建物所有者（賃料債権を譲渡したい）. A claim-assignment contract and a sign 確定日付ある通知.
Text: 建物所有者が、将来の賃料債権を第三者へ譲渡。債権譲渡は、確定日付ある通知により対抗要件を備えた。
Small question: 通知が差押えより先なら、譲受人が勝つ？

Panel 3. 債権譲渡は「払渡し」ではない
タスク亀 puts a sign 物上代位による差押え on unpaid rent. No ぴっちゅ in this panel.
Text: 債権譲渡は、304条の「払渡し又は引渡し」に含まれない。そのため、譲渡の対抗要件が先でも、抵当権者は未払い賃料を差し押さえられる。
Three short signs: 抵当権の効力は登記で公示 / 譲渡だけで担保価値は消えない / 譲渡による物上代位逃れを防ぐ
Large conclusion: 未払い賃料には、抵当権が届く

Panel 4. 境目は、実際の弁済
No person as the tenant. Only a room door and a rent bag.
Text: 差押命令の送達前に、賃借人が譲受人へ弁済済みなら、その分は抵当権者も追えない。まだ弁済されていなければ、抵当権者が差し押さえて物上代位できる。
Large split: 弁済済み → 抵当権者は追えない / 未払い＋差押え → 抵当権者が物上代位
Do not treat the seizure itself and the service of the seizure order on the third-party debtor as the same moment.

Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（確定日付が先なら必ず譲受人が勝つ、とする）:
試験で「債権譲渡の対抗要件が先なら、常に譲受人が優先する」と書いてあったら×。
試験で「債権譲渡は、304条の払渡し又は引渡しに当たる」と書いてあったら×。
試験で「抵当権者は、賃料債権を差し押さえなくても物上代位できる」と書いてあったら×。

Bottom memory band, pointed by ちゃちゃロット. One mascot only, bottom-right margin. Green lecturer suit, white shirt, green trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. Not a cap. The face has round black pupils, each with a white circular highlight of the same size. The pointer must not cover the memory text.
Memory text: 登記済み抵当権＋未払い賃料＋差押え。譲渡だけでは、抵当権の物上代位を止められない。
Do not cover the panel text with characters or speech balloons.
```

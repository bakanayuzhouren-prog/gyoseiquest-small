# Codex用 — 併存的債務引受と免責的債務引受の成立

定型の左右パネル＋中央表＋底部3カードは使わない。左右に分けるのは、併存と免責の2類型だから。各側の中は、契約の相手が2通りあることだけを積む。

- 保存先: `assets/images/deepdive/learn/minnpou/heizon-mensekiteki-hikiuke.png`
- 画像キー: `learn/minnpou/heizon-mensekiteki-hikiuke`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・債権総論の「もっと深掘る」。アプリ載せは生成後。
- 保証人・連帯保証人はこの枚に入れない。

## 法律（470条・472条）

引受人は、どちらも、債務者と同一内容の債務を負担する。違いは、元の債務者が残るか、いつ効力が生じるか。

**併存的債務引受（470条）** 引受人は債務者と連帯して負担する。債務者は免れない。

1. 債権者と引受人の契約。この契約で効力が生じる。債務者への通知は要らない。
2. 債務者と引受人の契約もできる。効力は、債権者が引受人に対して承諾をした時。

**免責的債務引受（472条）** 引受人が同一内容を負担し、債務者は自己の債務を免れる。

1. 債権者と引受人の契約によってすることができる。効力は、債権者が債務者に対して、その契約をした旨を通知した時。通知だけで成立するのではない。
2. 債務者と引受人が契約をし、債権者が引受人に対して承諾をすることでもできる。この経路の効力発生は通知ではない。

試験で「併存的債務引受は、債権者と引受人の契約でしかできない」と書いてあったら×。
試験で「免責的債務引受は、通知だけで成立する」と書いてあったら×。
試験で「免責的で、債務者と引受人の契約なら、債務者への通知で効力が生じる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 引受人 | いい役 | 引受人（債務を引き受けたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 左右の境の下に1体。本文を隠さない |
| 債権者 | いい役 | 債権者（承諾または通知をしたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 免責側の「債務者への通知」の横に1体 |
| 誤った主張 | 悪い役 | 誤った主張をする側（通知だけで免責が成立する、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ |
| 案内 | いい役 | 案内（注記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

債務者は人物にしない。残る債務の書類、消える債務の書類で見せる。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Two columns only. No center table. No bottom three-card row.
Title: 併存的債務引受と免責的債務引受は、どちらも契約が2通り
Subtitle: 通知だけで成立するのは、どちらでもない

Left column, teal, title: 併存的債務引受（470条）
Effect line: 引受人は債務者と連帯して負担する。債務者は免れない。
Route 1: 債権者と引受人の契約。この契約で効力が生じる。債務者への通知は要らない。
Route 2: 債務者と引受人の契約もできる。効力は、債権者が引受人に承諾をした時。
Small picture: two debt documents remain side by side.

Right column, navy, title: 免責的債務引受（472条）
Effect line: 引受人が同一内容を負担し、債務者は自己の債務を免れる。
Route 1: 債権者と引受人の契約。効力は、債権者が債務者に、その契約をした旨を通知した時。
Route 2: 債務者と引受人の契約に、債権者が引受人へ承諾をした時。この経路は通知ではない。
Small picture: the original debt document is crossed out, and one new debt document remains. タスク亀 stands beside the notice, label 債権者（債務者へ、契約した旨を通知したい）.

ぴっちゅ once, between the columns at the lower edge of the two columns, label 引受人（債務を引き受けたい）. Do not repeat ぴっちゅ.

Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（通知だけで免責が成立する、とする）:
試験で「併存的債務引受は、債権者と引受人の契約でしかできない」と書いてあったら×。
試験で「免責的債務引受は、通知だけで成立する」と書いてあったら×。
試験で「免責的で、債務者と引受人の契約なら、債務者への通知で効力が生じる」と書いてあったら×。

Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 免責の通知は、債権者と引受人の契約のあと、債権者から債務者へ。効力が生じる時期であり、成立方法そのものではない。

Do not print any brand name, account name, or app name. Do not cover the text with characters or the pointer.
```

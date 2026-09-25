# Codex用 — 保証・連帯保証・債務引受の聞き分け

比較の切り口は表が一番伝わる。左右パネルと底部3カードは使わない。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。

- 保存先: `assets/images/deepdive/learn/minnpou/hosho-rentai-hikiuke.png`
- 画像キー: `learn/minnpou/hosho-rentai-hikiuke`
- 生成は Codex。Cursor は描かない。
- 既存の `heizon-mensekiteki-hikiuke.png` は上書きしない。成立の2通りは、表の1行に短く書くだけ。
- 配置案: 見て聞いて覚える・債権総論の「もっと深掘る」。アプリ載せは生成後。

## 法律

元の債務者は、保証・連帯保証・併存的債務引受では残る。免責的債務引受だけで免れる（472条）。

催告の抗弁（452条）と検索の抗弁（453条）があるのは、普通の保証だけ。連帯保証人にはない（454条）。債務引受の引受人は、保証人ではないので、催告の抗弁も検索の抗弁もない。

成立の入口。保証と連帯保証は、債権者と保証人の契約で、書面または電磁的記録が要る（446条2項・3項）。併存的債務引受は470条、免責的債務引受は472条。どちらも、債権者と引受人の契約、または債務者と引受人の契約に債権者の承諾、の2通り。免責で債権者と引受人が契約したときの効力は、債権者が債務者へその旨を通知した時。通知だけで成立するのではない。

求償。免責的債務引受の引受人は、債務者に対して求償権を取得しない（472条の3）。保証・連帯保証は、委託があれば求償できる。併存的債務引受は、「求償権を取得しない」とは書かれていない。

取消権。保証人も引受人も、債務者の取消権を自分では行使できない。履行を拒めるだけ。

- 保証・連帯保証: 主たる債務者が取消権を行使すれば免れるべき限度で、履行を拒める（457条3項）。
- 併存的債務引受: 債務者が免れるべき限度で、履行を拒める（471条）。債務者はまだ債務を負っているので、自分で取り消せる。
- 免責的債務引受: 引受がなければ、取消権の行使によって債務者が免れることができた限度で、履行を拒める（472条の2）。債務者は引受で既に免れている。取り消して免れる実益が、債務者側からは薄い。引受人は契約当事者ではないので、自分では取り消せない。放っておくと、取り消せた債務を引受人が払う。それを止めるのが、この履行拒絶。

試験で「引受人は、債務者の取消権を自分で行使できる」と書いてあったら×。
試験で「連帯保証人には、催告の抗弁がある」と書いてあったら×。
試験で「免責的債務引受の引受人は、債務者に求償できる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 引受人 | いい役 | 引受人（取り消せた債務を、自分では取り消せず、履行を拒みたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 表の外、免責の列の下に1体。表を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（引受人が自分で取り消せる、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ |
| 案内 | いい役 | 案内（注記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

タスク亀は、この枚には置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, wide gaps. One comparison table is the whole figure. No left-right debate panels. No three cards at the bottom.
Title: 保証・連帯保証・債務引受は、誰が残るかで分ける
Subtitle: 取消権は、自分で行使できない。履行を拒めるだけ

Table header, navy: 保証 / 連帯保証 / 併存的債務引受 / 免責的債務引受
Data rows alternate by row, not by column. Row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white.

Row 元の債務者: 残る / 残る / 残る。引受人と連帯（470条） / 免れる（472条）
Row 催告・検索: 両方ある（452条・453条） / 両方ない（454条） / ない。保証ではない / ない。債務者は既に免れている
Row 成立: 債権者と保証人の契約。書面または電磁的記録（446条） / 保証と同じ / 契約が2通り（470条） / 契約が2通り（472条）。通知は、債権者と引受人の契約の効力発生だけ
Row 求償: 委託があればできる / 保証と同じ / 条文は、求償権を取得しない、とは書いていない / 債務者に対して求償権を取得しない（472条の3）
Row 取消権: 自分では取り消せない。免れるべき限度で履行を拒む（457条3項） / 保証と同じ / 自分では取り消せない。免れるべき限度で履行を拒む（471条） / 自分では取り消せない。引受がなければ免れることができた限度で、履行を拒む（472条の2）

ぴっちゅ once, below the 免責的債務引受 column, outside the table, label 引受人（取り消せた債務を、履行だけ拒みたい）.

Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（引受人が自分で取り消せる、とする）:
試験で「引受人は、債務者の取消権を自分で行使できる」と書いてあったら×。
試験で「連帯保証人には、催告の抗弁がある」と書いてあったら×。
試験で「免責的債務引受の引受人は、債務者に求償できる」と書いてあったら×。

Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 免責のあと、債務者はもう免れている。取り消して免れる実益は、債務者側からは薄い。引受人が払わされるのを止めるのが、472条の2の履行拒絶。

Do not print any brand name, account name, or app name. Do not cover the table with characters or the pointer.
```

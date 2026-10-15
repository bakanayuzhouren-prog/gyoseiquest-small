# Codex用 — 税金の信頼は、いつ守られるか？

左右は対比2語。左は信義則だけ。右は遡及立法だけ。中央の表は置かない。底部3カードは置かない。同じ文をタイトルと左右とフッターで繰り返さない。

- 保存先: `assets/images/deepdive/learn/gyosei/zeimu-shingi-sokyu.png`
- 画像キー: `learn/gyosei/zeimu-shingi-sokyu`
- 生成は Codex。Cursor は描かない。
- 既存の `assets/images/deepdive/learn/kisochi/sozei-sogo.png` は上書きしない。あちらは、課税は法律か、という84条の一般論。
- 配置案: 行政法総論。TAC第1回・問8。PNGができてから Cursor が載せる。生成前は `[[image:]]` を付けない。

## 法律（崩すな）

確認日 2026-10-15。

左。最判昭和62年10月30日。租税法規に適合する課税処分を、信義則で取り消せるのは、納税者間の平等と公平を犠牲にしても、その信頼を守らなければ正義に反する特別の事情があるときに限る。税務署の過去の言動と違う、というだけでは足りない。信義則が一切及ばない、でもない。

右。最一小判平成23年9月22日。不利益な遡及立法は、常に憲法84条違反ではない。長期譲渡の損益通算の廃止を、施行日の4月1日より前、同年1月1日以後の譲渡にも当てた附則は、84条の趣旨に反しない。変えたのは、すでに成立した納税義務そのものではなく、損失を他の所得と通算できるという期待である。遡及は約3か月。

書かないこと。官が言ったから常に勝てる。不利益な遡及は常に違憲。問題文の全文。ブランド名。酒屋や青色申告の固有の物語は、この図に書かない。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 納税者 | いい役 | 納税者（過去の扱いを守りたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 左。本文を隠さない |
| 誤った言い切り | 悪い役 | 誤答（常に勝てる、常に違憲、と言いたい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | フッターの左。本文を隠さない |
| 案内 | いい役 | 案内（右の結論を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

タスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Two columns side by side. No comparison table. No bottom trio of cards.

Title: 税金の信頼は、いつ守られるか？

Left column heading: 論点（信義則）
Do not write 遡及 in this column.
ぴっちゅ holds an old tax notice.
Label under ぴっちゅ: 納税者（過去の扱いを守りたい）
Q&A, short:
過去の言動と違う課税は、取り消せる？ → 特別の事情があるときだけ
特別の事情とは？ → 平等を犠牲にしても、守らなければ正義に反するとき（最判昭和62年10月30日）

Right column heading: 論点（遡及立法）
Do not write 信義則 in this column.
No character in this column. A short calendar: 1月1日 to 4月1日.
Q&A, short:
不利益な遡及は、常に違憲？ → 違う
年初から当てた通算廃止は？ → 憲法84条の趣旨に反しない（最一小判平成23年9月22日）
何を変えた？ → 通算できるという期待。成立済みの納税義務そのものではない

Footer, two short lines:
試験で「官が言ったから、課税は常に取り消せる」と書いてあったら×。
試験で「不利益な遡及立法は、常に憲法84条に違反する」と書いてあったら×。

Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only, outside the columns. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
カチャドクロ is small at the footer left, not covering the lines.
Label under カチャドクロ: 誤答（常に、と言いたい）
Note text: 左は処分のやり直し。右は法律を過去の取引に当てること。

Do not print any brand name, account name, or app name. Do not cover the Q&A or the footer with characters or the pointer. Do not draw a liquor store or a blue tax form story.
```

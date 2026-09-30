# Codex用 — 内閣が総辞職してから、新しい内閣ができるまで

1枚の縦の流れ。入口は3つ。不信任の枝だけ、解散するかどうかで分かれる。そのあとは1本に合流する。左右パネルと底部3カードは使わない。表を使う場合の行背面は、横一列で白と薄いグレーを交互にする。

- 保存先: `assets/images/deepdive/learn/kenpou/soujishoku-nagare.png`
- 画像キー: `learn/kenpou/soujishoku-nagare`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・憲法の「もっと深掘る」。アプリ載せは生成後。

## 法律

憲法69条。内閣は、衆議院で不信任の決議案を可決し、又は信任の決議案を否決したときは、十日以内に衆議院が解散されない限り、総辞職をしなければならない。解散は、内閣の助言と承認による天皇の国事行為（7条3号）。衆議院が自ら解散するのではない。

解散されたときは、解散の日から四十日以内に衆議院議員の総選挙を行い、その選挙の日から三十日以内に国会を召集する（54条1項）。衆議院議員総選挙の後に初めて国会の召集があったときは、内閣は総辞職する（70条）。同じ人がのちに再び指名されても、この総辞職はする。

憲法70条。内閣総理大臣が欠けたときも、内閣は総辞職する。欠けたときは、死亡、辞任、国会議員の資格の喪失。病気、入院、海外出張は、内閣法9条の事故のあるときであり、この流れに入れない。欠けたときは、あらかじめ指定する国務大臣が臨時に内閣総理大臣の職務を行う（内閣法9条）。臨時代理があっても、総辞職はする。

憲法71条。69条又は70条の場合には、内閣は、新たに内閣総理大臣が任命されるまで引き続きその職務を行う。

憲法67条1項。内閣総理大臣は、国会議員の中から国会の議決で指名する。この指名は、他のすべての案件に先立って行う。

憲法67条2項。衆議院と参議院が異なった指名の議決をしたとき、両議院の協議会を開いても意見が一致しないとき、又は衆議院が指名の議決をした後、国会休会中の期間を除いて十日以内に参議院が指名の議決をしないときは、衆議院の議決を国会の議決とする。

憲法6条。天皇は、国会の指名に基づいて、内閣総理大臣を任命する。天皇は指名しない。

憲法68条1項。内閣総理大臣は、国務大臣を任命する。過半数は、国会議員の中から選ばれなければならない。天皇は、国務大臣の任免を認証する（7条5号）。天皇は任命しない。

試験で「不信任のあと、直ちに総辞職」と書いてあったら×。
試験で「総辞職した日に、職務が終わる」と書いてあったら×。
試験で「天皇が総理を指名する」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（天皇が総理を指名する、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。流れを隠さない |
| 案内 | いい役 | 案内（指名と任命の違いを指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅとタスク亀は置かない。天皇をキャラで描かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One vertical flow. No left-right debate panels. No three cards at the bottom. Do not draw the Emperor as a character.
Title: 内閣が総辞職してから、新しい内閣ができるまで
Subtitle: 指名は国会。任命は天皇
Top, three entry boxes in one row:
Box 不信任・信任否決（69条）: 衆議院で不信任を可決、または信任を否決
Box 総理が欠けたとき（70条）: 死亡、辞任、議員資格の喪失。病気は入れない
Box 総選挙後の初召集（70条）: 同じ人が再び指名されても、いったん総辞職する
From the 不信任 box only, a two-way fork:
Arrow 10日以内に衆議院が解散される: 解散の日から40日以内に総選挙。選挙の日から30日以内に国会を召集（54条1項）。初めての召集で総辞職（70条）。この矢印は初召集の箱へつなぐ
Arrow 解散されなければ: 総辞職
From the 欠けたとき box, one arrow 総辞職. Small note on that arrow: 指定の国務大臣が臨時に職務を行う（内閣法9条）。総辞職はする
The three paths join one bar: 総辞職しても、新しい総理が任命されるまで職務を続ける（71条）
Then four steps downward, one box each:
国会が、国会議員の中から指名する。他の案件より先（67条1項）
両院の指名が違うとき、協議会でも一致しない、または休会を除き10日以内に参議院が議決しないと、衆議院の指名が国会の指名になる（67条2項）
天皇が、国会の指名に基づいて任命する。天皇は指名しない（6条）
総理が国務大臣を任命する。過半数は国会議員。天皇は認証する。天皇は任命しない（68条1項、7条5号）
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（天皇が総理を指名する、とする）:
試験で「不信任のあと、直ちに総辞職」と書いてあったら×。
試験で「総辞職した日に、職務が終わる」と書いてあったら×。
試験で「天皇が総理を指名する」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 指名は国会。総理の任命は天皇。国務大臣の任命は総理、天皇は認証。
Do not print any brand name, account name, or app name. Do not cover the flow with characters or the pointer.
```

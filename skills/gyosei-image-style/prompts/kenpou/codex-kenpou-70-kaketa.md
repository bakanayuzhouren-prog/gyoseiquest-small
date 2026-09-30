# Codex用 — 総理が欠けたときとは、死亡・辞任・議員資格の喪失

1枚の表。行は提示の5つだけ。病気・入院・海外出張と、死亡未確認の消息不明は、欠けたときに入れない。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。左右パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/kenpou/souridaijin-kaketa.png`
- 画像キー: `learn/kenpou/souridaijin-kaketa`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・憲法の「もっと深掘る」。アプリ載せは生成後。

## 法律

憲法70条。内閣総理大臣が欠けたとき、又は衆議院議員総選挙の後に初めて国会の召集があったときは、内閣は、総辞職をしなければならない。

欠けたときに当たるのは、死亡、辞任、国会議員の資格の喪失（除名、当選無効など）。憲法67条1項は、内閣総理大臣を国会議員の中から指名する。

病気、入院、海外出張は、内閣法9条の事故のあるとき。あらかじめ指定した国務大臣が、臨時に内閣総理大臣の職務を行う。総辞職しない。

死亡が確認される前の消息不明も、まだ欠けていない。事故のあるときと同じく、臨時代理。

衆議院の解散又は任期満了で議員でなくなっても、欠けたときにしない。憲法71条により、新たに内閣総理大臣が任命されるまで、内閣は引き続き職務を行う。この行は表に足さない。ひっかけにだけ書く。

試験で「病気の入院は、欠けたとき」と書いてあったら×。
試験で「解散で議員でなくなったら、欠けたとき」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（病気も欠けたとき、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（当たらない2行を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅとタスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One simple two-column table is the whole figure. No left-right debate panels. No three cards at the bottom. No extra rows.
Title: 総理が欠けたときとは、死亡・辞任・議員資格の喪失
Subtitle: 病気は事故。内閣は総辞職しない（内閣法9条）
Header, navy: 事実 / 欠けたとき
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Row: 死亡 / 当たる
Row: 辞任 / 当たる
Row: 議員資格の喪失（除名、当選無効など） / 当たる
Row: 病気、入院、海外出張 / 当たらない
Row: 死亡が確認される前の消息不明 / 当たらない
The two 当たらない cells use amber text. Do not paint those whole rows red.
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（病気も欠けたとき、とする）:
試験で「病気の入院は、欠けたとき」と書いてあったら×。
試験で「解散で議員でなくなったら、欠けたとき」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 当たる3つで内閣は総辞職する（70条）。解散や任期満了で議員でなくなっても、新しい総理が任命されるまで職務は続く（71条）。
Do not print any brand name, account name, or app name. Do not cover the table with characters or the pointer.
```

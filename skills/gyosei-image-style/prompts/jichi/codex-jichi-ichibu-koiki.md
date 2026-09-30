# Codex用 — 一部事務組合は共同処理。広域連合は広域計画

1枚の表。左右パネルと底部3カードは使わない。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。`tokubetsu-dantai.png` は上書きしない。

- 保存先: `assets/images/deepdive/learn/jichi/ichibu-jimu-koiki-rengo.png`
- 画像キー: `learn/jichi/ichibu-jimu-koiki-rengo`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・地方自治の「もっと深掘る」。アプリ載せは生成後。

## 法律

地方公共団体の組合は、一部事務組合と広域連合である（地方自治法284条1項）。どちらも特別地方公共団体。一部事務連合という制度はない。

設ける主体は、普通地方公共団体と特別区。許可権者は同じで、都道府県が加入すれば総務大臣、その他は都道府県知事。広域連合を総務大臣が許可するときは、国の関係行政機関の長に協議する（284条4項）。

一部事務組合は、事務の一部を共同処理するために設ける（284条2項）。広域計画を作る定めも、国または都道府県の事務を処理させる定めも、直接請求の準用もない。

広域連合は、広域にわたり処理することが適当な事務について、広域計画を作成し、連絡調整を図り、事務の一部を広域にわたり総合的かつ計画的に処理するために設ける（284条3項）。設置後速やかに、議会の議決を経て広域計画を作成しなければならない（291条の7）。

国は、法律またはこれに基づく政令で、広域連合の事務に関連する事務を広域連合が処理することとできる（291条の2第1項）。都道府県は、加入しない広域連合について、条例で、関連する事務を処理させることができる（同条2項）。

直接請求は広域連合に準用される。条例の制定改廃、事務の監査、議会の解散、議員または長などの解職である（291条の6第1項）。区域内の有権者は、規約の変更を構成団体へ要請するよう、広域連合の長に請求することもできる（同条2項）。

試験で「一部事務連合という制度がある」と書いてあったら×。
試験で「一部事務組合も、広域計画を作らなければならない」と書いてあったら×。
試験で「国の事務を処理させられるのは、一部事務組合」と書いてあったら×。
試験で「直接請求の準用があるのは、一部事務組合」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 共同処理 | いい役 | 構成団体（事務の一部を共同処理したい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 一部事務組合の列見出しの下。表を隠さない |
| 広域計画 | いい役 | 構成団体（広域計画に沿って処理したい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 広域連合の列見出しの下。表を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（一部事務連合がある、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（広域計画の行を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

過去の辻さんと代さんは置かない。名簿外の人物を置かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。ぴっちゅは pitchi_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One comparison table is the figure. No left-right debate panels. No three cards at the bottom.
Title: 一部事務組合は共同処理。広域連合は広域計画
Subtitle: どちらも地方公共団体の組合。一部事務連合という制度はない
Header, navy: 比べる点 / 一部事務組合 / 広域連合
Under the 一部事務組合 header, small タスク亀. Label: 構成団体（事務の一部を共同処理したい）
Under the 広域連合 header, small ぴっちゅ. Label: 構成団体（広域計画に沿って処理したい）
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Row: 目的 / 事務の一部を共同処理する（284条2項） / 広域計画を作り、連絡調整し、計画的に処理する（284条3項）
Row: 広域計画 / 作る定めはない / 設置後速やかに、議会の議決を経て作る（291条の7）
Row: 国と都道府県の事務 / 処理させる定めはない / 国は法律又は政令で処理させられる（291条の2第1項）。県が加入しない連合は、県が条例で処理させられる（同条2項）
Row: 直接請求 / 準用の定めはない / 条例の改廃、監査、議会の解散、解職。規約変更の要請請求もある（291条の6）
Caption under the table: 許可権者は同じ。都道府県が加入すれば総務大臣。その他は都道府県知事。広域連合を総務大臣が許可するときは、国の関係行政機関の長に協議する（284条4項）。
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（一部事務連合がある、とする）:
試験で「一部事務連合という制度がある」と書いてあったら×。
試験で「一部事務組合も、広域計画を作らなければならない」と書いてあったら×。
試験で「国の事務を処理させられるのは、一部事務組合」と書いてあったら×。
試験で「直接請求の準用があるのは、一部事務組合」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 組合は共同処理。連合は広域計画。国や県の事務と直接請求は、広域連合。
Do not print any brand name, account name, or app name. Do not cover the table with characters or the pointer.
```

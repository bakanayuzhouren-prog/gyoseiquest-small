# Codex用 — 条例で議決を足すとき、政令の除外は法定受託事務だけ

1枚。上に96条2項の全文。下に自治事務と法定受託事務の比較表。左右のdebateパネルと底部3カードは使わない。行の背面は横一列で白と薄いグレーを交互にする。列ゼブラは禁止。`ichibu-jimu-koiki-rengo.png` は別の図なので、このファイルでは描かない。

- 保存先: `assets/images/deepdive/learn/jichi/giketsu-tsuika-96.png`
- 画像キー: `learn/jichi/giketsu-tsuika-96`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・地方自治の「もっと深掘る」。アプリ載せは生成後。

## 法律

地方自治法96条2項。

前項に定めるものを除くほか、普通地方公共団体は、条例で普通地方公共団体に関する事件（法定受託事務に係るものにあつては、国の安全に関することその他の事由により議会の議決すべきものとすることが適当でないものとして政令で定めるものを除く。）につき議会の議決すべきものを定めることができる。

読み方。1項で議決が義務の事件は、この項の外に置く。それ以外の、普通地方公共団体に関する事件を、条例で議決事件に足すことができる。括弧は、法定受託事務に係るものにだけかかる。かかる中身は、法定受託事務から、政令が議決に適当でないと定めたものを引く、という除外である。自治事務には、この括弧はかからない。

政令の中身は、地方自治法施行令121条の3。武力攻撃事態等における国民の保護のための措置に関する法律に基づき地方公共団体が処理する事務。災害救助法施行令3条2項により、同令18条の都道府県等が処理する事務。

試験で「自治事務にも、国の安全の政令除外がある」と書いてあったら×。
試験で「法定受託事務は、条例で議決事件に足せない」と書いてあったら×。
試験で「除外は、法定受託事務の全部」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 自治事務 | いい役 | 自治事務（条例で議決事件を足す） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 自治事務の列見出しの下。条文と表を隠さない |
| 法定受託事務 | いい役 | 法定受託事務（政令の除外を確認する） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 法定受託事務の列見出しの下。条文と表を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（自治事務にも国の安全の除外がある、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。表を隠さない |
| 案内 | いい役 | 案内（括弧は法定受託事務だけ、を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

過去の辻さんと代さんは置かない。名簿外の人物を置かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。ぴっちゅは pitchi_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One statute quote on top, then one comparison table. No left-right debate panels. No three cards at the bottom.
Title: 条例で議決を足すとき、政令の除外は法定受託事務だけ
Subtitle: 96条2項の括弧は、法定受託事務にだけかかる
Quote box, full article, large type:
地方自治法96条2項
前項に定めるものを除くほか、普通地方公共団体は、条例で普通地方公共団体に関する事件（法定受託事務に係るものにあっては、国の安全に関することその他の事由により議会の議決すべきものとすることが適当でないものとして政令で定めるものを除く。）につき議会の議決すべきものを定めることができる。
Callout under the quote, amber border, one sentence: 括弧の中は、法定受託事務から引く一覧。自治事務には、この括弧はかからない。
Header, navy: 比べる点 / 自治事務 / 法定受託事務
Under 自治事務, small タスク亀. Label: 自治事務（条例で議決事件を足す）
Under 法定受託事務, small ぴっちゅ. Label: 法定受託事務（政令の除外を確認する）
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Row: 条例で足せるか / 足せる。1項で義務の事件以外 / 足せる。政令が議決に適当でないと定めたものを引いた残り
Row: 括弧の除外 / かからない / かかる
Row: 政令の中身（施行令121条の3） / この条の除外一覧はない / 国民保護法に基づき地方公共団体が処理する事務。災害救助法施行令3条2項により都道府県等が処理する事務
Caption under the table: 96条1項の事件は、どちらも最初から議決が義務。2項は、それ以外を条例で足す定め。
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（自治事務にも国の安全の除外がある、とする）:
試験で「自治事務にも、国の安全の政令除外がある」と書いてあったら×。
試験で「法定受託事務は、条例で議決事件に足せない」と書いてあったら×。
試験で「除外は、法定受託事務の全部」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 足せるのは両方。引く一覧があるのは、法定受託事務だけ。
Do not print any brand name, account name, or app name. Do not cover the statute quote or the table with characters or the pointer.
```

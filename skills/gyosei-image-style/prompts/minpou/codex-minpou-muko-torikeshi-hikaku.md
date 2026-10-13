# Codex用 — はじめから無かった？ あとから無かったことにする？

無効と取消しの聞き分け。市販の比較表の行名・行順・原状回復の説明文は写さない。条文の語は残す。追認を先に置く。返し方は下の帯に分離する。左右の討論パネルと底部3カードは使わない。

- 保存先: `assets/images/deepdive/learn/minnpou/muko-torikeshi-hikaku.png`
- 画像キー: `learn/minnpou/muko-torikeshi-hikaku`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・民法の「もっと深掘る」。アプリ載せは生成後。PNGができるまで `[[image:]]` は付けない。

## 法律

民法119条。無効な行為は、追認によっても、その効力を生じない。ただし、当事者がその行為が無効であることを知って追認をしたときは、新たな行為をしたものとみなす。

民法121条本文。取り消された行為は、初めから無効であったものとみなす。

民法126条。取消権は、追認をすることができる時から5年間行使しないときは、時効によって消滅する。行為の時から20年を経過したときも、同様とする。

民法120条。制限行為能力による取消しは、制限行為能力者又はその代理人、承継人若しくは同意をすることができる者に限り、取り消すことができる。錯誤、詐欺又は強迫による取消しは、瑕疵ある意思表示をした者又はその代理人若しくは承継人に限り、取り消すことができる。

民法122条。取り消すことができる行為は、120条に規定する者が追認したときは、以後、取り消すことができない。

民法3条の2。意思表示をした時に意思能力を有しなかったときは、その法律行為は無効とする。この無効を主張できるのは、原則として表意者である。

民法93条。心裡留保は、原則として有効である。相手方がその意思表示が表意者の真意ではないことを知り、又は知ることができたときは、その意思表示は無効とする。

民法94条1項。通謀虚偽表示は、無効とする。

民法90条。公序良俗に反する法律行為は、無効とする。

民法121条の2。無効な行為に基づく債務の履行として給付を受けた者は、相手方を原状に復させる義務を負う。無効な無償行為で、給付の当時その行為が無効であることを知らなかった者は、現に利益を受けている限度において返還する。行為の時に意思能力を有しなかった者、および行為の時に制限行為能力者であった者も、現に利益を受けている限度において返還する。

試験で「無効と知って追認すると、元の行為が効力を生じる」と書いてあったら×。
試験で「心裡留保は、常に無効」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（無効と知って追認すると、元の行為が効力を生じる、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下のひっかけ帯だけ。表を隠さない |
| 案内 | いい役 | 案内（119条のただし書を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅとタスク亀は置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One comparison table plus one return strip under it. No left-right debate panels. No three cards at the bottom.
Title: はじめから無かった？ あとから無かったことにする？
Header, navy: 聞くこと / 無効 / 取消し
Data rows alternate by row. Row 1 white, row 2 light gray, and continue. Not by column.
Row: 追認できるか / 追認によっても、その効力を生じない。ただし、無効であることを知って追認したときは、新たな行為をしたものとみなす（119条） / 追認をすることができる。追認したときは、以後、取り消すことができない（122条）
Row: 誰が言えるか / 原則、誰でも。意思能力がなかったことを理由とする無効は、原則として表意者だけ / 制限行為能力は、本人、代理人、承継人、同意をすることができる者。錯誤、詐欺、強迫は、瑕疵ある意思表示をした者、代理人、承継人（120条）
Row: いつまで言えるか / 期間の定めはない / 追認をすることができる時から5年。行為の時から20年（126条）
Row: 何が起きるか / はじめから効力を生じない / 取り消された行為は、初めから無効であったものとみなす（121条）
Under the table, one full-width strip titled 受け取ったものは、どこまで返すか（121条の2）. Do not use an example story.
Line: 給付を受けた者は、相手方を原状に復させる義務を負う。
Line: 無償で、給付の当時に無効であることを知らなかった者は、現に利益を受けている限度において返還する。
Line: 行為の時に意思能力がなかった者、および行為の時に制限行為能力者であった者も、現に利益を受けている限度において返還する。
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（無効と知って追認すると、元の行為が効力を生じる、とする）:
試験で「無効と知って追認すると、元の行為が効力を生じる」と書いてあったら×。
試験で「心裡留保は、常に無効」と書いてあったら×。
ちゃちゃロット stands in the lower-right margin, one only, in a green lecturer suit, white shirt, trousers, and shoes. The pointer indicates the 119条 proviso in the first data row. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. Do not cover the table, the return strip, or the trap line.
Do not print any brand name, account name, or app name.
```

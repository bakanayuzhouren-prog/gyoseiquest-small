# Codex用 — 上級が下級の権限を行使するとは、下級の処分を自分で出すこと

上下2場面。上は指揮監督。下級に命じて、処分は下級が出す。下は、下級に与えられた許可を上級が自ら出す。後者には法令の特別の根拠が要る。左右パネルと底部3カードと中央表は使わない。

- 保存先: `assets/images/deepdive/learn/gyosei/joukyu-kengen-koushi.png`
- 画像キー: `learn/gyosei/joukyu-kengen-koushi`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政法総論の「もっと深掘る」。アプリ載せは生成後。

## 法律

指揮監督は、上級行政庁が下級行政庁を指揮し、監督することである。下級行政庁に命じて、処分の名で出すのは下級行政庁、という形もその中に含まれる。訓令・通達（国家行政組織法14条2項）は、その手段の一つであり、指揮監督の全部ではない。特別の法令がなくてもできる。

下級行政庁の権限の行使は、法令が下級行政庁に与えた権限に基づく処分を、上級行政庁が自らすることである。これには、上級行政庁がその権限を行う旨の法令の特別の根拠が要る。根拠がなければ、上級行政庁は下級行政庁の許可を自分で出すことはできない。

権限を委任した後も、指揮監督は残る。

地方自治法179条の専決処分は、議会が議決できないときの長の処分であり、この図のテーマではない。

試験で「指揮監督があるから、上級は下級の許可を自分で出せる」と書いてあったら×。
試験で「委任すると、指揮監督も消える」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 下級行政庁 | いい役 | 下級行政庁（命じられて許可を出す） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 上の場面の下段だけ。許可書の文字を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（指揮監督だけで下級の許可を自分で出せる、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。場面を隠さない |
| 案内 | いい役 | 案内（法令の特別の根拠が要る、を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。場面の中には入れない |

ぴっちゅは置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Two stacked scenes, then one answer band. No comparison table. No left-right debate panels. No three cards at the bottom.
Title: 上級が下級の権限を行使するとは、下級の処分を自分で出すこと
Subtitle: 命じるだけでは、権限の行使にならない
Upper scene, blue border, heading 指揮監督（特別の根拠は不要）:
Top desk labeled 上級行政庁. An order slip reads この許可処分をせよ. Small line beside the slip: 訓令・通達は手段の一つ。手段はこれだけではない。
Arrow down to the lower desk.
Lower desk labeled 下級行政庁. タスク亀 beside this desk only, role text 下級行政庁（命じられて許可を出す）. The permit is stamped at this desk. Caption: 命じるのも指揮監督。処分を出すのは下級行政庁。
Lower scene, amber border, heading 下級の権限の行使（法令の特別の根拠が要る）:
The same permit is now stamped at the upper desk labeled 上級行政庁. The lower desk is empty. Caption: 下級行政庁に与えられた許可を、上級行政庁が自ら出す。
Small line in this scene: その旨の法令がなければ、できない。
Answer band:
指揮監督は、上級が下級を指揮し、監督すること。特別の根拠は不要。訓令・通達は、その手段の一つ。
下級の権限の行使は、その権限に基づく処分を上級行政庁が自らすること。法令の特別の根拠が要る。
権限を委任した後も、指揮監督は残る。
Trap lines, カチャドクロ only here, label 誤った主張（指揮監督だけで下級の許可を自分で出せる、とする）:
試験で「指揮監督があるから、上級は下級の許可を自分で出せる」と書いてあったら×。
試験で「委任すると、指揮監督も消える」と書いてあったら×。
ちゃちゃロット stands only in the bottom-right margin, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates 法令の特別の根拠が要る and does not cover the letters.
Do not print any brand name, account name, or app name. Do not cover the scenes or the answer band with characters.
```

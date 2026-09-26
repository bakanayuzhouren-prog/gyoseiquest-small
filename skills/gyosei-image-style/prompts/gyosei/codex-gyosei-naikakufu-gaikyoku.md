# Codex用 — 内閣府に何を置くか（外局の組織）

組織図1枚。64条の委員会と庁、48条の宮内庁、外局ではない庁を分ける。左右パネルと底部3カードは使わない。表にするなら行の背面は白と薄いグレーの交互。列ゼブラは禁止。

- 保存先: `assets/images/deepdive/learn/gyosei/naikakufu-gaikyoku.png`
- 画像キー: `learn/gyosei/naikakufu-gaikyoku`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政法総論の「もっと深掘る」。アプリ載せは生成後。

## 法律

内閣府の長は内閣総理大臣。外局として委員会及び庁を置くことができる（内閣府設置法49条）。設置及び廃止は法律で定める。

64条の表の委員会は、公正取引委員会、国家公安委員会、個人情報保護委員会、カジノ管理委員会、サイバー通信情報監理委員会。
64条の表の庁は、金融庁、消費者庁、こども家庭庁。

宮内庁は内閣府に置く（48条）。64条の表の外局ではない。
警察庁は国家公安委員会の下であり、内閣府の外局の庁ではない。
デジタル庁、復興庁、国税庁、特許庁、観光庁は、内閣府の外局ではない。

試験で「内閣府に外局は置けない」と書いてあったら×。
試験で「宮内庁は、64条の表の外局である」と書いてあったら×。
試験で「デジタル庁・国税庁・特許庁は、内閣府の外局である」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った主張 | 悪い役 | 誤った主張をする側（デジタル庁を内閣府の外局に入れる、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。組織図を隠さない |
| 案内 | いい役 | 案内（宮内庁は48条、の札を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

機関の箱にキャラを入れない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One organization chart. No left-right debate panels. No three cards at the bottom.
Title: 内閣府には、何を置くか
Top box, navy: 内閣総理大臣（内閣府の長）
Under it, three groups with arrows down from the top box.
Group A, white: 宮内庁（内閣府設置法48条）。札: 64条の表の外局ではない
Group B, light gray band titled 外局の委員会（49条・64条）: 公正取引委員会 / 国家公安委員会 / 個人情報保護委員会 / カジノ管理委員会 / サイバー通信情報監理委員会
Small box under 国家公安委員会 only: 警察庁は、国家公安委員会の下。内閣府の外局の庁ではない
Group C, white band titled 外局の庁（49条・64条）: 金融庁 / 消費者庁 / こども家庭庁
Separate red-outline box, not connected as a child of 内閣府: 外局ではない。デジタル庁、復興庁、国税庁（財務省）、特許庁（経済産業省）、観光庁（国土交通省）
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（デジタル庁を内閣府の外局に入れる、とする）:
試験で「内閣府に外局は置けない」と書いてあったら×。
試験で「宮内庁は、64条の表の外局である」と書いてあったら×。
試験で「デジタル庁・国税庁・特許庁は、内閣府の外局である」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. Not a cap.
Note text: 外局は委員会と庁。宮内庁は48条。警察庁は国家公安委員会の下。
Do not print any brand name, account name, or app name. Do not cover the chart with characters or the pointer.
```

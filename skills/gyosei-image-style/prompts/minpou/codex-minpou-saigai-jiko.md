# 詐害行為取消・転得者（424条の5）

- 保存先: assets/images/deepdive/learn/minnpou/saigai-jiko.png
- 画像キー: learn/minnpou/saigai-jiko
- 生成は Codex。Cursor は描かない。
- 根拠: e-Gov 民法424条の5。自己への支払（424条の9）は本図に置かない。

## PRE-GENERATE-CHECK

本図は424条の5だけ。被告・金銭の自己請求・価額償還を表に置くな。

条文どおり:
- 前提: 受益者に対して詐害行為取消請求をすることができる場合
- 1号: 受益者から転得した者は、転得の当時、債務者がした行為が債権者を害することを知っていたとき
- 2号: 他の転得者から転得した者は、その転得者及びその前に転得した全ての転得者が、それぞれの転得の当時、害することを知っていたとき

禁止: 受益者善意でも転得者悪意なら可（改正前判例）。転得者は善意でも可。424条の9を中央に置く。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 民法424条の5（転得者に対する詐害行為取消請求）.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Title:「受益者にできるときだけ」
Chip:「424条の5」

Left heading 論点:
前提は？ → 受益者に対して詐害行為取消請求をすることができる場合
受益者からの転得は？ → 転得の当時の悪意
再転得は？ → 前の転得者も全て、それぞれの当時悪意

Right heading ひっかけ:
受益者が善意でも転得者が悪意なら取り消せる
転得者は善意でも常に取り消せる
途中に善意の転得者がいても後の悪意者へ請求できる

Center ONLY: one table. Header navy. Row zebra white / light gray.
Columns: 区分 | 芯
Rows:
本文の前提 | 受益者に対して詐害行為取消請求をすることができる場合
1号（受益者から転得） | 転得の当時、債務者がした行為が債権者を害することを知っていたとき
2号（他の転得者から転得） | その転得者及びその前に転得した全ての転得者が、それぞれの転得の当時悪意
Caption:「金銭の自己への支払（424条の9）と被告（424条の7）は本表に置かない」

Roles: 債権者（転得者へ取り消す）／転得者（転得時の善意を主張する）.

Bottom:
- 判断軸:「受益者にできるか。転得の当時に害することを知っていたか」
- ひっかけ:「受益者善意でも転得者悪意なら可。途中の善意を無視する」
- 暗記:「転得者へは、受益者にできる場合に限り、転得ごとの悪意が要る」
Answer:「転得者に対する詐害行為取消請求は、受益者に対して詐害行為取消請求をすることができる場合に限り、転得の当時に害することを知っていたときにすることができる。」

Guide: ONE ちゃちゃロット only. Cream face, independent pale-sky-blue smiling hat (not ears), green blazer, white shirt, green trousers, shoes, wooden 指し棒. SMALL bottom-right. No nameplate. No logos or watermarks.
```

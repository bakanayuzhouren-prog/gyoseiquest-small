# Codex用 — 行服法 審理員意見書の渡し先（横流れ）

- 保存先: `assets/images/deepdive/fufuku/shomon-umu-saiketsu.png`
- 上書き対象: `assets/images/deepdive/fufuku/shomon-umu-saiketsu.png`
- てらしぃ指示: 2026-10-10。手書きのように、手続きを左から右へ流す。イラストは少し。小学生が見づらい密度にしない。この1枚だけ描き直す。
- 既存の `shomon-flow.png` は上書きしない。
- 配置: 生成後に Cursor。PNGの差し替えまで `[[image:]]` を付けない。

## 法律の芯（崩すな）

- 審理員が、意見書と事件記録を審査庁へ提出する（42条2項）。
- 諮問するときは、審査会等へ写しを添える（43条2項）。審査会等から審査請求人へは送らない。
- 諮問しないときは、裁決書に意見書を添付する（50条2項）。
- 審査請求人へは送達（51条1項）。参加人と、審査庁以外の処分庁等へは送付（51条4項）。

図に書かないもの: 答申が審査庁を拘束するか。底部カード。案内役。同じ文の繰り返し。受け手を4人に増やさない。

## GPT Image プロンプト（このまま生成）

```text
Japanese legal-study infographic. 16:9 landscape. Warm off-white. Huge Japanese type. Wide empty space. A child can follow the arrows without reading a paragraph. No mascot. No bottom cards. No answer banner. No English. No logo. No second flowchart.

Title, one line, top left:
審理員意見書、誰から誰へ？

Draw one horizontal flow, left to right, like a clean handwritten flowchart. Thick arrows. Few boxes.

Left box: 審理員
Two small circles under the name only: 事　意
One small paper drawing beside this box, labeled 意見書. Do not add more papers here.

Arrow right to the center box: 審査庁
Arrow label: 提出（42条2項）

From 審査庁, one short arrow upward to a circle: 審査会
Label: 諮問するとき、写し（43条2項）
A large red × next to 審査会. One line beside the ×: 請求人へは送らない
No arrow from 審査会 to any person.

From 審査庁, one arrow right to three large names in a row:
審査請求人　送達（51条1項）
参加人　送付（51条4項）
処分庁等　送付（51条4項）
処分庁等 is the office that is not the 審査庁. Do not draw a fourth name.

One small paper drawing above those three names only, labeled 裁決書.
One orange line under the three names, and nowhere else:
諮問しないとき、意見書を添付（50条2項）

Stop. Do not repeat any sentence. Do not write 拘束. Do not cover the arrows with drawings.
```

## 目視チェック

- [ ] 流れは左から右。審理員、審査庁、受け手の順
- [ ] 審査会は上の枝で、請求人への矢印がない
- [ ] 送達は審査請求人だけ。参加人と処分庁等は送付
- [ ] 添付の一文は、諮問しないときだけ
- [ ] 紙の絵は意見書と裁決書の2枚だけ。底部カードも案内役もない

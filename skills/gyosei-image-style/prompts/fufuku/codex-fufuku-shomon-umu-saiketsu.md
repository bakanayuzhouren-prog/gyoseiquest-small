# Codex用 — 行服法 諮問するときの書類の流れ

- 保存先: `assets/images/deepdive/fufuku/shomon-umu-saiketsu.png`
- 上書き対象: `assets/images/deepdive/fufuku/shomon-umu-saiketsu.png`
- 関連: 諮問しない場合は別枚 `shomon-nashi-saiketsu.png`。この枚に混ぜない。
- てらしぃ指示: 2026-10-10。諮問ありだけ。左から右。人物も案内役も置かない。書類を大きく。
- 既存の `shomon-flow.png` は上書きしない。
- 配置: 生成後に Cursor。PNGの差し替えまで `[[image:]]` を付けない。

## 法律の芯（崩すな）

- 審理員は、審理員意見書を事件記録とともに、速やかに審査庁へ提出する（42条2項）。
- 審査庁は、審理員意見書の写しと事件記録の写しを添えて、行政不服審査会等へ諮問する（43条2項）。
- 同じとき、審査庁は審理関係人へ、諮問した旨を通知し、審理員意見書の写しを送付する（43条3項）。事件記録の写しは送らない。受け手は、審査請求人、参加人、審査庁とは別の処分庁等。
- 行政不服審査会等は審査庁へ答申する。答申のあと、審査庁が裁決する（44条）。
- 裁決書の謄本は、審査請求人へ送達し（51条1項・2項）、参加人と審査庁とは別の処分庁等へ送付する（51条4項）。
- この経路では、裁決書に審理員意見書を添付しない。その一文は図の一箇所だけ。

## 生成前チェック

- [x] 諮問なしの経路は、この枚に入れない
- [x] 42条2項は、審理員意見書と事件記録の両方
- [x] 43条2項は、行政不服審査会等へ両方の写し
- [x] 43条3項は、審査庁から審理関係人へ、諮問した旨の通知と審理員意見書の写し
- [x] 裁決書の謄本。審査請求人は送達。参加人と別の処分庁等は送付
- [x] 添付しない、は一箇所だけ。人物も案内役も置かない
- [x] 左右パネルは使わない。横流れが本業

## GPT Image プロンプト（このまま生成）

```text
Japanese legal-study infographic. Wide 16:9. Warm off-white. One horizontal flow, left to right. Huge Japanese type. Large document drawings are the subject. No people. No mascot. No bottom cards. No answer banner. No English. No logo.

Title, one line:
諮問するとき、どの書類が誰へ渡る？

Five stations in one row. Thick arrows between them. Document titles sit on the papers. Arrow words sit in the gap, never on a paper. Do not abbreviate any document name. Do not repeat a sentence.

Station 1, box 審理員. Two large papers side by side:
審理員意見書
事件記録
Arrow right to station 2, label only: 速やかに提出（42条2項）

Station 2, box 審査庁.
From here, one arrow right to station 3, box 行政不服審査会等.
On that arrow, two large papers marked 写し:
審理員意見書の写し
事件記録の写し
Arrow label: 写しを添えて諮問（43条2項）

At the same moment, a second arrow from 審査庁 down to three recipient names in one group:
審査請求人
参加人
審査庁とは別の処分庁等
Two large papers on that arrow only:
諮問した旨の通知
審理員意見書の写し
Arrow label: 通知・送付（43条3項）
Do not send 事件記録の写し on this arrow.
Do not draw any arrow from 行政不服審査会等 to these three people.

Station 4, arrow from 行政不服審査会等 back is not used. Draw one arrow from 行政不服審査会等 to 審査庁, with one large paper:
答申書
Arrow label: 答申
One small line under that arrow only: 答申後に裁決（44条）

Station 5, arrow from 審査庁 to the right, one large paper:
裁決書の謄本
Three recipients:
審査請求人　送達（51条1項・2項）
参加人　送付（51条4項）
審査庁とは別の処分庁等　送付（51条4項）
One line under this station only, and nowhere else:
この場面では、裁決書に審理員意見書を添付しない。

Do not draw a 諮問なし path. Do not clip an opinion sheet onto the written decision. Do not write 通知書. Do not write 審査会 alone. Do not cover papers with arrow text.
```

## 目視チェック

- [ ] 諮問ありだけ。諮問なしの箱がない
- [ ] 審理員意見書と事件記録が、提出の段で両方見える
- [ ] 行政不服審査会等へは、両方の写し
- [ ] 審理関係人へは、諮問した旨の通知と審理員意見書の写し。審査会等からの矢印はない
- [ ] 裁決書の謄本。送達は審査請求人だけ
- [ ] 添付しない、は一箇所。文字が書類と重なっていない

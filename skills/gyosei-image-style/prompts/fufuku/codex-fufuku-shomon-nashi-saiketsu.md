# Codex用 — 行服法 諮問しないときの書類の流れ

- 保存先: `assets/images/deepdive/fufuku/shomon-nashi-saiketsu.png`
- 関連: 諮問する場合は別枚 `shomon-umu-saiketsu.png`。この枚に混ぜない。
- てらしぃ指示: 2026-10-10。諮問なしだけ。左から右。人物も案内役も置かない。書類を大きく。
- 配置: 生成後に Cursor。PNGができるまで `[[image:]]` を付けない。

## 法律の芯（崩すな）

- 審理員は、審理員意見書を事件記録とともに、速やかに審査庁へ提出する（42条2項）。
- この枚は、行政不服審査会等へ諮問しない場合だけ。審査会等の箱、諮問の矢印、諮問した旨の通知は描かない。
- 諮問を要しないときは、裁決書に審理員意見書を添付する（50条2項）。事件記録は添付しない。
- 送る本体は、裁決書の謄本（51条2項・4項）。審査請求人へは送達（51条1項・2項）。参加人と、審査庁とは別の処分庁等へは送付（51条4項）。

## 生成前チェック

- [x] 諮問ありの経路は、この枚に入れない
- [x] 42条2項は、審理員意見書と事件記録の両方
- [x] 43条2項・43条3項の書類は描かない
- [x] 添付は審理員意見書だけ。事件記録は裁決書に付けない
- [x] 裁決書の謄本。審査請求人は送達。参加人と別の処分庁等は送付
- [x] 人物も案内役も置かない
- [x] 左右パネルは使わない。横流れが本業

## GPT Image プロンプト（このまま生成）

```text
Japanese legal-study infographic. Wide 16:9. Warm off-white. One horizontal flow, left to right. Huge Japanese type. Large document drawings are the subject. No people. No mascot. No bottom cards. No answer banner. No English. No logo.

Title, one line:
諮問しないとき、どの書類が誰へ渡る？

Three stations only. Thick arrows. Document titles sit on the papers. Arrow words sit in the gap, never on a paper. Do not abbreviate any document name. Do not repeat a sentence.

Station 1, box 審理員. Two large papers side by side:
審理員意見書
事件記録
Arrow right, label only: 速やかに提出（42条2項）

Station 2, box 審査庁.
Under the box, one short label only: 諮問なし
Do not draw 行政不服審査会等. Do not draw a consultation arrow. Do not draw 諮問した旨の通知.

Station 3, arrow from 審査庁 to the right. One clipped bundle of two papers, held by one clip:
裁決書の謄本
添付：審理員意見書
One heading above the bundle, and nowhere else:
諮問しないときは、裁決書に審理員意見書を添付（50条2項）
Do not put 事件記録 in the clip.

Three recipients under the bundle:
審査請求人　送達（51条1項・2項）
参加人　送付（51条4項）
審査庁とは別の処分庁等　送付（51条4項）

Do not draw a 諮問あり path. Do not write 通知書. Do not write 審査会. Do not cover papers with arrow text.
```

## 目視チェック

- [ ] 諮問なしだけ。行政不服審査会等の箱がない
- [ ] 審理員意見書と事件記録が、提出の段で両方見える
- [ ] 諮問した旨の通知がない
- [ ] クリップは、裁決書の謄本と審理員意見書。事件記録は入っていない
- [ ] 送達は審査請求人だけ。参加人と別の処分庁等は送付
- [ ] 文字が書類と重なっていない

# Codex用 — 大阪国際空港。一定の限度を超える供用は、瑕疵？

1枚。4コマにはしない。中央は、壊れていない空港と、飛ぶ飛行機と、音が届く家。結論は下の3つの結果だけ。同じ文をタイトルと結果で繰り返さない。壁、タイル、滑走路を崩して描かない。

- 状態: 未生成
- 保存先: `assets/images/deepdive/learn/gyosei/osaka-kuko-kuyo-kashi.png`
- 画像キー: `learn/gyosei/osaka-kuko-kuyo-kashi`
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。
- 関連: 最大判昭56.12.16。正本は `data/knowledge/canonical/osaka-kuko-sosho.md`。

## 法律（最大判昭56.12.16）

大阪国際空港の周辺住民が、国に三つの請求をした。

供用関連瑕疵。国家賠償法2条1項の設置または管理の瑕疵は、建物や滑走路が壊れていることだけではない。供用の態様と程度が一定の限度を超え、飛行機の離着陸との関連で、利用者または周辺の第三者に危害を生ずる危険がある状態も含む。うるさいだけでは足りない。過去の慰謝料は、この瑕疵を前提に認めた。

毎日午後9時から翌日午前7時までの離着陸を、民事の差止めで止めさせる請求は、訴えとして不適法。空港の供用は航空行政権と不可分。行政訴訟で差止めができるかは、判断していない。

口頭弁論終結後の将来の賠償も、訴えとして不適法。事情が動き、損害をあらかじめ確定できない。

書かない。壁が崩れている、と描くこと。建物が壊れているから瑕疵、と書くこと。うるさいだけで瑕疵、と書くこと。危害が及べば足りる、として「一定の限度を超える」を落とすこと。民事の差止めができる、と書くこと。行政訴訟の差止めもできない、と書くこと。将来の賠償が出る、と書くこと。ブランド名。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 周辺住民 | いい役 | 周辺住民（夜も静かに暮らしたい） | ぴっちゅ | `assets/images/characters/pitchi.png` ＋ `pitchi_sheet.png` | 家のそば。小さく。家と飛行機を隠さない |
| 国 | 悪い役 | 国（建物は壊れていない、と言いたい） | カチャドクロ | `assets/images/characters/kachadokuro.png` ＋ `kachadokuro_sheet.png` | 空港の脇。吹き出しは建物に重ねない |
| 案内 | いい役 | 案内（下の結果を指す。本文を隠さない） | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

タスク亀は置かない。過去の辻さんと代さんは置かない。名簿外は置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは assets/images/characters/pitchi_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。ちゃちゃロットは assets/approved-chachalot-pointer.png と assets/approved-smiling-hat-mascot.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One sheet, 16:9. One scene, not four comic panels. No comparison table as the main picture. No brand name, account name, or watermark.

Title: 大阪国際空港。一定の限度を超える供用は、瑕疵？
Subtitle, one line: 最大判昭56.12.16

Center scene, left to right. An intact airport terminal and an intact runway. No cracks, no falling tiles, no broken walls. One airplane has just taken off. Curved sound lines travel from the airplane to a row of houses. ぴっちゅ stands small beside a house, hands near the ears, not covering the house or the airplane. Label under ぴっちゅ: 周辺住民（夜も静かに暮らしたい）
カチャドクロ stands small beside the terminal, not covering the building. Speech bubble, away from the building: 建物も滑走路も壊れていない。
Label under カチャドクロ: 国（建物は壊れていない、と言いたい）

One sentence under the scene, large type: 供用の態様と程度が一定の限度を超え、利用者または周辺住民に危害が及ぶ危険があれば、国賠2条の瑕疵。

Three result boxes in one horizontal row under that sentence. Navy headings. Data rows alternate only if a box has two lines; here each box is one result. White, light gray, white.
Box 1: 過去の賠償は出る
Box 2: 午後9時から午前7時の飛行を、民事で止める請求は不適法
Box 3: 将来の賠償の請求は不適法

ちゃちゃロット is one mascot only, in the bottom margin at the right, green lecturer suit, white shirt, trousers, and shoes. Wooden pointer toward 国賠2条の瑕疵. Do not cover that sentence or the three boxes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. No nameplate.

Do not print any brand name, account name, or app name. Do not cover the scene or the results with characters or the pointer.
```

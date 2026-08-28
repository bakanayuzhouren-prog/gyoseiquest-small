# 行服法：執行不停止（25条1項）と18条期間・時効の関係 画像プロンプト

> **Codex用正本**: `prompts/fufuku/codex-fufuku-03-shikko-futeishi-jiko.md`（一括は `prompts/fufuku/README.md`）

## 目的

「審査請求＝自動停止」と「18条＝時効」の取り違えを防ぐ。25条1項（妨げない）と18条（除斥期間）を並列で固定。

## 配置候補

- 見て聞いて覚える【合格革命・執行不停止・期間】深掘り `[[image:fufuku/shikko-futeishi-jiko]]`
- 深掘り画像: `assets/images/deepdive/fufuku/shikko-futeishi-jiko.png`（生成後）

## チェックリスト

| 要素 | 内容 |
|---|---|
| 対比タイトル | **請求だけでは止まらない**／**期間は別（時効≠18条）** |
| 論点（左） | 請求すれば効力停止？→NO（25条1項）／止めるには？→執行停止（2項〜）／18条は？→除斥期間 |
| ひっかけ（右） | 請求＝自動停止／18条＝消滅時効／期間中は時効中断 |
| 判断軸 | **不停止**と**執行停止**と**18条期間**は別レーン |
| 暗記 | 25条1項＝妨げない。18条＝3か月・1年。時効と別 |

## GPT Image プロンプト（あぷし型・1枚）

```
Japanese administrative law study infographic, warm off-white background, 16:9 landscape.

Title banner (navy): 「行服法：執行不停止と18条期間（時効と別）」
Subtitle: 審査請求 ≠ 自動停止

LEFT PANEL header 「論点」 (teal), Q&A:
「審査請求で効力・執行は止まる？」 → NO（25条1項 妨げない）
「止めたいときは？」 → 執行停止を別途（25条2項〜）
「18条は時効？」 → NO 審査請求期間（除斥）

RIGHT PANEL header 「ひっかけ」 (amber):
× 請求すれば自動停止
× 18条＝民法の消滅時効
× 請求中は18条期間が止まる

CENTER: two parallel tracks (like train lanes):
Lane A (red arrow still moving): 25条1項 — 効力・執行・手続続行 → 止まらない
Lane B (calendar): 18条 — 知った日翌日3か月 / 処分翌日1年 → 徒過→45条却下
Small note: 時効中断効 原則なし

BOTTOM THREE CARDS:
判断軸: 不停止・執行停止・18条は別
ひっかけ: 失効不停止と混同しない（効力不停止）
暗記: 請求だけでは止まらない。18条は時効と別

Bottom-right: Chachalot pointing at Lane A. Clean Japanese labels.
Style: approved-shusaisha-kyoka layout, no watermark.
```

## 参照

- e-Gov 行政不服審査法 25条1項、18条1項・2項、45条1項

## 検証メモ

- 「失効不停止」と誤記していないか（正：執行不停止／効力等を妨げない）
- 18条を消滅時効と同一視していないか

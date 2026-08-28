# 地方自治法の「執行機関」× 行政法総論の「執行機関」比較図

てらしぃ指示：行政法総論との比較プロンプト。生成は Cursor `GenerateImage`（あぷし型）または「コーデックスで」明示時のみ Codex GPT Image。

## 保存先
`assets/images/deepdive/gyouseihou/chihou/jichi-shikko-kikan-hikaku.png`

## 論点（法律の芯・誤情報禁止）

| | 地方自治法の「執行機関」 | 行政法総論の「執行機関」 |
|---|---|---|
| 意味 | 長のほか、法律で置く**委員会・委員**（138条の4①）。事務を管理・執行する機関の総称 | 代執行・強制執行など**実力を行使**する機関 |
| 例 | 知事・市長、教育委員会、選管、監査委員、公安委員会 等 | 実力行使の現場機関イメージ |
| 含めない定番 | **補助機関**（副知事・副市町村長・会計管理者）／**附属機関**（審議会等） | （総論では補助・諮問と別棚） |
| 対比軸 | 議会（議決） vs 執行機関 | 行政庁・補助・諮問・参与・執行 |

**ひっかけ**: 語が同じなので「副市長＝執行機関」「総論の実力行使＝自治法の執行機関」と混ぜる。

**暗記一行**: 自治法の執行機関＝長＋委員会・委員。総論の執行機関＝実力行使。棚が違う。

## あぷし型レイアウト指示

- 左パネル見出し「論点」：Q&A
  - 自治法の執行機関は？ → 長＋委員会・委員（138の4）
  - 副知事は？ → 補助機関（執行機関×）
  - 総論の執行機関は？ → 実力行使
- 右パネル見出し「ひっかけ」：語が同じで棚が違う／副市長＝執行機関×
- 中央：左右に「自治法」と「総論」の看板を持つ案内役。矢印で「同じ語・別棚」
- 底部3カード：判断軸／ひっかけ／暗記
- ちゃちゃロット（帽子）を余白で指し棒
- 見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- スキル: `skills/gyosei-image-style/SKILL.md`

## GPT Image プロンプト（日本語可）

```
Japanese administrative-law study infographic, warm off-white background, navy/teal/green palette, amber for caution, red only for wrong traps. Left panel titled「論点」with Q&A: 自治法の執行機関は？→長＋委員会・委員（138条の4）／副知事は？→補助機関／総論の執行機関は？→実力行使. Right panel titled「ひっかけ」: 同じ語で棚が違う／副市長＝執行機関は誤り. Center metaphor: two labeled boards「自治法」and「総論」with a cheerful green character pointing that the same word means different shelves. Bottom three cards: 判断軸＝長＋委員会か実力行使か／ひっかけ＝語の混同／暗記＝自治法＝長＋委員会・委員、総論＝実力行使. Include chacha-rot mascot with hat and pointer in bottom margin. Dense readable Japanese text, no English, no purple glow, educational poster style matching approved gyosei-quest diagrams.
```

## アプリ配置（Cursor）

- 見て聞いて覚える・地方自治法「執行機関」カードの deepdive に `[[image:gyouseihou/chihou/jichi-shikko-kikan-hikaku]]`（生成後）
- `node scripts/generateDeepdiveImages.js` でマップ再生成

# 行服法：不服申立期間比較（54条｜18条｜62条）画像プロンプト

> **Codex用正本**: `prompts/fufuku/codex-fufuku-05-shinsa-kikan-hikaku.md`（一括は `prompts/fufuku/README.md`）

## 目的

**再調査・審査請求・再審査**の期間（3か月／1か月・1年）と、**不作為＝期間なし**を一表で固定。18条と62条の「1か月差」をひっかけ対策。

## 配置候補

- 見て聞いて覚える【合格革命・審査請求期間比較】 `[[image:fufuku/shinsa-kikan-hikaku]]`
- 深掘り画像: `assets/images/deepdive/fufuku/shinsa-kikan-hikaku.png`（生成後）

## チェックリスト

| 要素 | 内容 |
|---|---|
| 対比タイトル | **再審査だけ1か月**／不作為は期間なし |
| 論点 | 再調査54条＝3か月・1年／審査請求18条＝同型（再調査後1か月）／再審査62条＝**1か月**・1年 |
| ひっかけ | 再審査も3か月／不作為に18条／再調査に1か月 |
| 判断軸 | **どのルートか**で条番号と月数 |
| 暗記 | 3-3-**1**（主観の月数） |

## GPT Image プロンプト（あぷし型・1枚）

```
Japanese administrative law study infographic, warm off-white background, 16:9 landscape.

Title banner (navy): 「行服法：不服申立期間の比較」
Subtitle: 54条・18条・62条 ＋ 不作為は期間なし

LEFT PANEL header 「論点」 (teal):
再調査54条 → 知って3か月 / 1年
審査請求18条 → 知って3か月（再調査後1か月）/ 1年
再審査62条 → 知って1か月 / 1年
不作為 → 18条の期間制限なし

RIGHT PANEL header 「ひっかけ」 (amber):
× 再審査も3か月
× 不作為に18条3か月
× 再調査は1か月

CENTER: comparison table 4 rows × 4 columns:
| | 再調査54条 | 審査請求18条 | 再審査62条 |
| 主観 | 3か月 | 3か月（再調査後1か月） | 1か月 ★highlight |
| 客観 | 1年 | 1年 | 1年 |
| 不作為 | 不可 | 期間なし | — |
| 却下形式 | 決定 | 裁決 | 裁決 |

Small calendar icons. Highlight "1か月" cell in red.

BOTTOM THREE CARDS:
判断軸: ルートで条番号を見る
ひっかけ: 再審査だけ主観1か月
暗記: 3-3-1（主観）。不作為＝期間なし

Bottom-right: Chachalot pointing at 1か月 cell.
Style: approved-shusaisha-kyoka layout, readable Japanese.
```

## 参照

- e-Gov 行政不服審査法 18条、54条、62条、19条2項・3項

## 検証メモ

- 再審査62条1項が1か月であること
- 不作為は18条期間なし（49条相当期間却下は別）

# 行服法26条 vs 行訴法26・27条：執行停止の取消し 比較画像プロンプト

> **Codex用正本**: `prompts/fufuku/codex-fufuku-04-shikko-teishi-torikeshi-26.md`（一括は `prompts/fufuku/README.md`）

## 目的

取消しの**できる／しなければならない**、**職権／申立て**、**理由語句**（明らか＋事情変更 vs 理由消滅＋事情変更）を行服・行訴で並べて固定。

## 配置候補

- 見て聞いて覚える深掘り / 比較ガイド `[[image:fufuku/shikko-teishi-torikeshi-26]]`
- 深掘り画像: `assets/images/deepdive/fufuku/shikko-teishi-torikeshi-26.png`（生成後）

## チェックリスト

| 要素 | 内容 |
|---|---|
| 対比タイトル | **取消しの「できる」vs「しなければならない」** |
| 論点 | 行服26＝審査庁・職権・明らか＋事情・**ことができる** |
| 比較 | 行訴26＝確定後・相手方申立て・理由消滅＋事情・**ことができる** |
| ひっかけ | 行訴26＝職権／しなければならない → **27条異議**が義務 |
| 暗記 | 行服26＝職権・できる。行訴26＝申立て・できる。27条異議＝しなければならない |

## GPT Image プロンプト（あぷし型・1枚）

```
Japanese administrative law study infographic, warm off-white background, 16:9 landscape.

Title banner (navy): 「執行停止の取消し：行服26条 vs 行訴26・27条」
Subtitle: できる？ しなければならない？

LEFT PANEL header 「論点」 (teal):
行服26条 — 審査庁 — 職権 — 公共の福祉への重大影響が明らか ＋ 事情変更 → 取り消すことができる

RIGHT PANEL header 「ひっかけ」 (amber):
× 行訴26条は職権で取消
× 行訴26条は取り消さなければならない
○ 行訴27条 総理大臣異議 → 取り消さなければならない（別条）

CENTER: comparison table 3 rows:
| 行服法26条 | 行訴法26条1項 | 行訴法27条 |
| 審査庁 | 裁判所 | 裁判所 |
| 職権（申立て不要） | 相手方申立て必須 | 総理大臣異議 |
| 明らか＋事情変更 | 理由消滅＋事情変更（確定後） | 異議あり |
| 取り消すことができる | 取り消すことができる | 取り消さなければならない |

Highlight last row: できる vs できる vs しなければならない

BOTTOM THREE CARDS:
判断軸: 主体・申立て・義務語句
ひっかけ: 27条異議と26条取消を混同しない
暗記: 行服26＝職権・できる。行訴26＝申立て。27条＝義務

Bottom-right: Chachalot pointing at "しなければならない" cell (27条).
Style: approved-shusaisha-kyoka layout, readable Japanese.
```

## 参照

- e-Gov 行政不服審査法 26条
- e-Gov 行政事件訴訟法 26条1項、27条1項

## 検証メモ

- 行訴26条に「しなければならない」を付していないか（それは27条）
- 行服26条に「相手方申立て」を付していないか

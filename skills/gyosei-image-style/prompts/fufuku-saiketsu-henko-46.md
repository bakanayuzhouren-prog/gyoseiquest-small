# 行服法：46条裁決の変更権（3区分）画像プロンプト

> **Codex用正本**: `prompts/fufuku/codex-fufuku-02-saiketsu-henko-46.md`（一括は `prompts/fufuku/README.md`）

## 目的

裁決で**処分を変更**できる審査庁を、上級／処分庁／いずれでもないの3区分で一読固定。46条1項ただし書の定番ひっかけ対策。

## 配置候補

- 見て聞いて覚える【合格革命・46条・変更権】深掘り `[[image:fufuku/saiketsu-henko-46]]`
- 深掘り画像: `assets/images/deepdive/fufuku/saiketsu-henko-46.png`（生成後）

## チェックリスト

| 要素 | 内容 |
|---|---|
| 対比タイトル | **変更**できるのは上級か処分庁審査庁だけ |
| 論点（左・Q&A） | 上級審査庁は変更可？→YES／処分庁審査庁は？→YES／いずれでもないは？→NO（ただし書） |
| ひっかけ（右） | 第三者も変更可／いずれでもない＝取消も不可／48条不利益変更可 |
| 判断軸 | **審査庁が誰か**で変更権の有無 |
| 暗記 | 変更＝上級か処分庁。いずれでもない＝変更NG |

## GPT Image プロンプト（あぷし型・1枚）

```
Japanese administrative law study infographic, warm off-white background, 16:9 landscape.

Title banner (navy): 「行服法46条：裁決で変更できる審査庁は？」
Subtitle: 取消し ≠ 変更

LEFT PANEL header 「論点」 (teal), Q&A rows:
「上級行政庁が審査庁？」 → YES 変更可
「処分庁が審査庁？」 → YES 変更可
「いずれでもない審査庁？」 → NO 変更不可（1項ただし書）

RIGHT PANEL header 「ひっかけ」 (amber):
× 第三者審査庁も変更できる
× いずれでもない＝取消も不可
× 48条 不利益変更OK

CENTER: three-column comparison table with icons (judge gavel / building):
Column1 上級行政庁審査庁 — 取消○ 変更○ — 2項: 命ずる
Column2 処分庁審査庁 — 取消○ 変更○ — 2項: 自ら処分
Column3 いずれでもない — 取消○ 変更× — ただし書

BOTTOM THREE CARDS:
判断軸: 審査庁の身分で変更権を見る
ひっかけ: ただし書は「変更不可」だけ
暗記: 変更＝上級か処分庁のみ

Bottom-right: Chachalot mascot pointing at Column3 "変更×". Do not cover text.
Style: clean flat illustration, readable Japanese, approved-shusaisha-kyoka layout density.
```

## 参照

- e-Gov 行政不服審査法 46条1項・2項、48条
- `skills/gyosei-image-style/prompts/fufuku-shomon-consultation-flow.md`（レイアウト）

## 検証メモ

- いずれでもない審査庁でも**取消**は可能と書いていないか（取消○を明示）
- 48条不利益変更禁止を落としていないか

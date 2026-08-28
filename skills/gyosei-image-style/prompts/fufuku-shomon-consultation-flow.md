# 行服法：審理→意見書→諮問→裁決（全体像）画像プロンプト

> **Codex用正本**: `prompts/fufuku/codex-fufuku-01-shomon-flow.md`（一括は `prompts/fufuku/README.md`）

## 目的

審査請求の審理手続から裁決までの**順番**を一読で固定する。特に「29条直ちに写し」「42条意見書→審査庁」「43条諮問」の順序ひっかけ対策。

## 配置候補

- 見て聞いて覚える【合格革命・問15】深掘り `[[image:fufuku/shomon-flow]]`
- 深掘り画像: `assets/images/deepdive/fufuku/shomon-flow.png`（生成後）

## チェックリスト（日本語確定）

| 要素 | 内容 |
|---|---|
| 対比タイトル | 審理員意見書は**審査庁**→**その後**諮問 |
| 論点（左・Q&A） | 直ちに写しはいつ？→29条1項／意見書はどこへ？→42条2項審査庁／諮問はいつ？→43条1項 |
| ひっかけ（右） | 意見書をいきなり審査会へ／33条＝意見書／直ちに＝諮問 |
| 判断軸 | **段階**で見る（開始→審理→終結→意見書→諮問→裁決） |
| 暗記 | 意見書は審査庁、その後諮問 |

## フロー（図の中央・左→右または上→下）

1. **審理員指名**（9条）
2. **29条1項** 直ちに → 審査請求書・録取書の**写し** → **処分庁等**（審査庁＝処分庁ならスキップ）
3. **29条2項** 弁明書提出を求める
4. **30条** 反論書・意見書（参加人）
5. **31条** 口頭意見陳述（申立てあれば）
6. **33〜36条** 職権調査（物件・鑑定・検証・質問）
7. **41条** 審理手続**終結**
8. **42条2項** **審理員意見書**＋事件記録 → **審査庁**（★ここが定番ひっかけ）
9. **43条1項** 審査庁 → **行政不服審査会等へ諮問**（例外あり）
10. **44条** 答申後 **裁決**

## GPT Image プロンプト（あぷし型・1枚）

```
Japanese administrative law study infographic, warm off-white background, 16:9 landscape.

Title banner (navy): 「行服法：意見書→諮問→裁決の順番」
Subtitle (smaller): 29条直ちに ≠ 諮問

LEFT PANEL header 「論点」 (teal), Q&A rows only:
「直ちに写しはいつ？」 → YES 29条1項・指名直後
「意見書の提出先は？」 → 審査庁（42条2項）
「諮問はいつ？」 → 意見書提出後（43条1項）

RIGHT PANEL header 「ひっかけ」 (amber):
× 意見書をいきなり行政不服審査会へ
× 33条＝意見書提出
× 直ちに＝諮問

CENTER: horizontal timeline with 10 numbered steps as a journey path with simple icons:
(1)指名 → (2)直ちに写し→処分庁 → (3)弁明書 → (4)反論 → (5)口頭意見 → (6)職権調査 → (7)終結41条 → (8)★意見書→審査庁 → (9)諮問43条 → (10)裁決44条
Highlight step 8 in red circle “ここ！”

BOTTOM THREE CARDS:
判断軸: 段階で順番を見る
ひっかけ: 意見書の提出先を審査会と入れ替えない
暗記: 意見書は審査庁、その後諮問

Bottom-right corner: small guide character Chachalot (smiling hat mascot from reference), pointing at step 8 only. Do not cover text.

Style: clean flat illustration, readable Japanese labels, no watermark, high contrast, generous whitespace, no cluttered manga panels.
Reference layout density: approved-shusaisha-kyoka.png (left/right panels + center scene + bottom 3 cards).
```

## 参照

- `assets/approved-shusaisha-kyoka.png`（レイアウト）
- `assets/images/characters/chachalot.png`（案内役）
- e-Gov 行政不服審査法 29条・41条・42条・43条・44条

## 検証メモ

- 33条を意見書提出と書いていないか
- 29条1項の「直ちに」が諮問と誤解されないか
- 42条と43条の矢印順序が逆になっていないか

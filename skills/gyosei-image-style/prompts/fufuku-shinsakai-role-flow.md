# 行服法：行政不服審査会の役割・組織・手続（深掘り）画像プロンプト

> **Codex用正本**: `prompts/fufuku/codex-fufuku-06-shinsakai-role.md`（一括は `prompts/fufuku/README.md`）

## 目的

「そもそも行政不服審査会は何をしている人か」を一読で固定する。審理員との役割分担、9人・3人合議、74条調査・75条口頭、答申≠裁決のひっかけ対策。

## 配置候補

- 見て聞いて覚える【合格革命・審査会深掘り】深掘り `[[image:fufuku/shinsakai-role]]`
- 深掘り画像: `assets/images/deepdive/fufuku/shinsakai-role.png`（生成後）

## チェックリスト（日本語確定）

| 要素 | 内容 |
|---|---|
| 対比タイトル | **答申するのは審査会／裁決するのは審査庁** |
| 論点（左・Q&A） | 何をする人？→43条諮問後に調査審議→答申／何人？→9人・原則非常勤／どう審議？→72条指名3人合議 |
| ひっかけ（右） | 答申＝裁決×／意見書提出先＝審査会×／口頭意見は31条だけ×／全員常勤× |
| 判断軸 | **審理員＝審査庁側** vs **審査会＝総務省・第三者助言** |
| 暗記 | 9人・3人合議→答申。裁決は審査庁。74条調査・75条口頭 |

## フロー（図の中央）

```
審理員（9条）審理 → 42条意見書→審査庁
         ↓
43条 審査庁→諮問→ 行政不服審査会（67条・総務省）
         ↓
72条 指名3人合議体で調査審議
74条 資料・陳述・鑑定等
75条 口頭意見（審査関係人申立て）
         ↓
79条 答申 → 44条 審査庁が裁決
```

## GPT Image プロンプト（あぷし型・1枚）

```
Japanese administrative law study infographic, warm off-white background, 16:9 landscape.

Title banner (navy): 「行服法：行政不服審査会は何をする人？」
Subtitle (smaller): 答申≠裁決

LEFT PANEL header 「論点」 (teal), Q&A rows only:
「そもそも何をする？」 → 43条諮問→調査審議→答申（79条）
「委員は何人？」 → 9人（68条・原則非常勤）
「どう審議？」 → 指名3人合議体（72条）

RIGHT PANEL header 「ひっかけ」 (amber):
× 答申＝裁決（裁決は44条・審査庁）
× 意見書提出先＝審査会（42条は審査庁）
× 口頭意見は31条だけ（75条もある）
× 委員は全員常勤（3人以内は常勤可）

CENTER: two-lane comparison metaphor:
LEFT lane label 「審理員（審査庁側）」 with steps: 審理→意見書→審査庁
RIGHT lane label 「審査会（総務省・第三者）」 with steps: 諮問→3人合議→74条調査→75条口頭→答申
Arrow down to 「44条 裁決＝審査庁」 in red emphasis box

Three small role cards under center:
「69条 委員」= 公正判断・法律行政の識見
「74条」= 資料・陳述・鑑定
「75条」= 口頭意見（審査関係人申立て）

BOTTOM THREE CARDS:
判断軸: 審理員＝審査庁側／審査会＝諮問後の第三者助言
ひっかけ: 答申と裁決を混同しない
暗記: 9人・3人合議→答申。裁決は審査庁

Bottom-right: small green owl mascot (ちゃちゃロット style) pointing at 「答申≠裁決」 box. Do not cover text.
Clean Japanese typography, no watermark, educational poster style.
```

## 条文メモ（生成後チェック用）

- 67条1項 総務省に置く
- 68条 9人・原則非常勤（3人以内常勤可）
- 69条 両議院同意・総務大臣任命
- 72条 指名3人合議（全員合議も可）
- 74条 主張書面・資料・陳述・鑑定
- 75条 口頭意見（審査関係人申立て）
- 79条 答申書送付・公表
- 44条 答申後裁決（審査庁）

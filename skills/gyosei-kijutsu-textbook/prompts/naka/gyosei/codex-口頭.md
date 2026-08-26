# Codex用 — 口頭

てらしぃが**このファイルだけ**を Codex に渡す。1論点・1枚。Cursor は画像を作らない。  
記述Q新設なし。⑤質問する用。

- 保存: `assets/images/deepdive/naka/gyosei/koto-iken.png`
- キー: `naka/gyosei/koto-iken`
- 正本: `N・C/行政法記述/2026-口頭意見陳述.md`

## 法律（守る）

| | 誰が口頭にするか |
|--|------------------|
| 口頭意見陳述（行服31条） | **請求人／参加人の申立て**（あれば審理員は与える義務。困難なとき例外） |
| 口頭審査請求（19条） | **法律・条例の定め**。なければ書面 |
| 弁明（行手29条） | **行政庁が認めるとき**（裁量）。原則書面 |
| 聴聞 | 制度が口頭。証拠書類提出可 |

- 利害関係人は許可→参加人→申立て。いきなりは不可
- 4つをぎゅうぎゅうの表にしない。短いチケット4枚

## 禁止

- GO と YES 混在／だれが／問が聞くこと／（聞かない）
- ちゃちゃロットを中央にしない

## 役割

- 審査請求人（口頭で意見したい）

## GPT Image プロンプト（このまま生成）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし. ONE TOPIC ONLY: 口頭でできる？ (意見陳述 / 審査請求 / 弁明 / 聴聞). Do not add 処分等の求め or 住民訴訟.

Match LAYOUT of「主宰者の許可」: navy title, left green「論点」, right orange「ひっかけ」, ONE center metaphor, bottom 判断軸 / ひっかけ / 暗記, navy answer bar. 16:9 warm off-white. Large Japanese. No overlap.

Guide: ちゃちゃロット SMALL bottom-right owl slot, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not bear/owl/cat.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses).

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点: Q&A only. NO GO/STOP. Do not mix GO and YES.
- Never write「だれが」.

Title:「口頭でできる？ — 誰が口頭にするか」
Chip:「利害関係人はいきなり不可」

Center: four small tickets, not a dense table:
1. 意見陳述＝申立て
2. 審査請求＝法律・条例の定め
3. 弁明＝行政庁の裁量
4. 聴聞＝制度が口頭
Labels MUST be:
「審査請求人（口頭で意見したい）」

Left 論点:
1. 口頭意見陳述は？ → 請求人・参加人の申立て（31条）
2. 利害関係人は？ → 許可→参加人→申立て
3. 弁明の口頭は？ → 行政庁が認めたとき

Right ひっかけ:
- 利害関係人がいきなり申立て
- 弁明も申立てれば必須
- 意見陳述と口頭審査請求を混ぜる

Bottom:
- 判断軸:「誰が口頭にするかを先に見る」
- ひっかけ:「いきなり／弁明必須／混ぜる」
- 暗記:「意見陳述は申立て。審査請求の口頭は法律・条例。弁明は裁量」
Answer EXACT:
「口頭意見陳述は請求人または参加人の申立て。弁明の口頭は行政庁の裁量。」
```

## 目視

- [ ] 4つの入口が読み取れる（詰め込み表になっていない）
- [ ] いきなり申立てを正解にしていない

# Codex用 — 行服法（01）意見書→諮問→裁決の順番

- 保存先: `assets/images/deepdive/fufuku/shomon-flow.png`
- 画像キー: `fufuku/shomon-flow`
- 配置（生成後・Cursor）: 【合格革命・諮問フロー】等の深掘り
- 草稿: `../fufuku-shomon-consultation-flow.md`
- 前提: 同フォルダ `README.md` の見本PNG・スキルを必ず開く
- **禁止**: フクロウ・横展開。アプリ埋め込み（Cursor へ）

## 法律の芯（崩すな）

審理の流れ: 指名(9条) → **29条1項 直ちに写し→処分庁等** → 弁明・反論・口頭(31)・職権調査 → 41条終結 → **42条2項 意見書→審査庁** → **43条1項 諮問→行政不服審査会等** → 44条 答申後裁決。

**書かない**: 意見書をいきなり審査会へ／33条＝意見書提出／29条直ちに＝諮問。

## GPT Image プロンプト（このまま生成）

画像参照: `approved-shusaisha-kyoka.png`, `chachalot.png`

```text
Create a NEW Japanese legal-study infographic for Gyosei Quest / あぷし.
Topic: 行服法 — order of 意見書 → 諮問 → 裁決.
Left header「論点」. Right header「ひっかけ」. NO「問が聞くこと」. NO GO badges on 論点.

Title:「行服法：意見書→諮問→裁決の順番」
Subtitle: 29条直ちに ≠ 諮問

LEFT 論点 (Q&A):
「直ちに写しはいつ？」 → 29条1項・指名直後
「意見書の提出先は？」 → 審査庁（42条2項）
「諮問はいつ？」 → 意見書提出後（43条1項）

RIGHT ひっかけ:
× 意見書をいきなり行政不服審査会へ
× 33条＝意見書提出
× 直ちに＝諮問

CENTER: horizontal timeline 10 steps:
(1)指名 → (2)直ちに写し→処分庁 → (3)弁明書 → (4)反論 → (5)口頭意見 → (6)職権調査 → (7)終結41条 → (8)★意見書→審査庁 → (9)諮問43条 → (10)裁決44条
Highlight step 8 red circle「ここ！」

BOTTOM:
判断軸: 段階で順番を見る
ひっかけ: 意見書の提出先を審査会と入れ替えない
暗記: 意見書は審査庁、その後諮問

Chachalot bottom-right, pointing at step 8. Warm off-white, 16:9, readable Japanese, no watermark.
```

## 目視チェック

- [ ] 42条→43条の順が逆になっていない
- [ ] 33条を意見書と書いていない
- [ ] ちゃちゃロット identity OK

## Codex 完了報告

Purpose / 保存パス / 目視結果 / Cursor: `generateDeepdiveImages.js` + `[[image:fufuku/shomon-flow]]`

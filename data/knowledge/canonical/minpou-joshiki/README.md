---
id: canonical/minpou-joshiki
title: 民法・常識で切る知識ベース
type: canonical
validationStatus: ok
---

# 民法・常識で切る知識ベース

てらしぃが口頭で足した「常識で切る」論点の正本。`data/knowledge/quiz/` と `learn/` は上書きされるので、**手編集はここだけ**。

## 何をする場所か

1. てらしぃが論点を話す → このフォルダに知識を足す（条文は e-Gov で根拠づけ）。
2. 「〇〇についてまとめて」→ 正本から比較表を組み、**Codex用画像プロンプト**を出す。
3. Codex が画像を作る → Cursor がアプリ（見て聞いて覚える／もっと深掘る／X）へ載せる。

Cursor は画像を直接作らない。流れは従来どおり。

## 切り方（てらしぃ確定）

民法は**常識で答えさせる**問題が多い。まず「空白期間はおかしくないか」「自分で選んだ人の欠点を後から文句言うか」「かわいそうな人に損を残すか」を口に出し、そのあと条文名を載せる。

詳細: `00-method.md`

受け渡し一覧（民法＋行政法）: `../常識で切る-HANDOFF.md`

## 「〇〇についてまとめて」の手順

1. `INDEX.md` で対象論点を拾う。足りなければ e-Gov を先に当たってから新規MDを足す。
2. 比較表を組む（4パターン以上・正反対の効果なら必須）。
3. `skills/gyosei-minpou-joshiki/SKILL.md` に沿い、Codexプロンプトを `skills/gyosei-minpou-joshiki/prompts/` に置く。
4. てらしぃが Codex に渡す。生成後、Cursor が配置する。

## 触らないもの

- `src/learn.js` / `src/questions.js` の手直し（同期で消える）
- Codex なしの画像生成
- 未確認判例の断定

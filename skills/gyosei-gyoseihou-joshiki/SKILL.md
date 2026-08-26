---
name: gyosei-gyoseihou-joshiki
description: >-
  Administrative-law "common-sense first" knowledge base（行政法フォルダ）. Use when
  てらしぃ adds 行政法の常識論点, asks to まとめて for 処分性・原告適格・手続・不服・行訴・国賠 etc.,
  or wants Codex prompts for explanation images. Put new notes only in
  data/knowledge/canonical/行政法/.
---

# 行政法・常識で切る（行政法フォルダ）

## いつ使う

- てらしぃが行政法の論点を口頭で足したとき
- 「〇〇についてまとめて」と言ったとき（行政法）
- 民法の常識ベースと同じ流れで画像プロンプトを出すとき

**正本は必ず** `data/knowledge/canonical/行政法/`。  
民法は `minpou-joshiki/`。混ぜない。

画像そのものは Cursor では作らない。Codex → てらしぃ渡し → 生成後に Cursor がアプリへ。

## 正本

`data/knowledge/canonical/行政法/`

- 手編集はここだけ。`learn.js` / `questions.js` は触らない。
- 新規論点は `NN-slug.md` を足し、`INDEX.md` に1行足す。
- 切り方は `00-method.md`。常識 → 結論 → e-Gov／判例 → 短い例外。
- 受け渡し一覧: `data/knowledge/canonical/常識で切る-HANDOFF.md`

## 新規論点の手順

1. てらしぃの常識の芯を1文で書く。
2. 関係法を e-Gov で確認（行手法・行服法・行訴法・国賠法・自治法など）。日付を frontmatter の `e-gov` に残す。
3. 判例が芯なら裁判所サイト等の公開判旨。未確認は断定しない。
4. ネット予備校は補助。条文・判旨と矛盾したら捨てる。
5. 4パターン以上の並列表、または正反対の効果なら、実装前に比較表案を出す。
6. 「まとめて」が来たら Codex プロンプトを `skills/gyosei-gyoseihou-joshiki/prompts/` に書く。

## 画像

- 画風: `skills/gyosei-image-style/SKILL.md` と `references/visual-guidelines.md`
- 見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 案内役: **ちゃちゃロット**（くま化禁止）
- 保存予定: `assets/images/deepdive/行政法/<slug>.png`
- アプリ載せは生成後・誤情報チェック後

### Codexプロンプトをどんどん足す（てらしぃ方針）

論点を正本に書いたら、**まとめて依頼を待たず** `prompts/codex-NN-*.md` を切ってよい（てらしぃが「プロンプト作って」と言った流れ）。各コマ別プロンプト必須。配置計画は `NN-PLACEMENT.md` に残す。

### アプリ配置（教科書以外の関連問題も含む）

1. **明示タグ**: 常識カード／ボーナスの deepdive に `[[image:行政法/<slug>]]`
2. **キーワード差し込み**: `src/joshikiDeepdiveImageMap.ts` にルール追加 → `app/deepdive.tsx` / `app/result.tsx` が「もっと深掘る」本文へ先頭差し込み（PNG未登録キーは無視）
3. PNG配置後: `node scripts/generateDeepdiveImages.js`
4. 記述教科書は該当Q指定時のみ `[[image:]]`（勝手に全埋めしない）

### コマ分割ルール（民法・行政法共通・てらしぃ確定）

説明が長い／1枚に盛ると資料として見づらいときは、**無理に1枚にしない**。

- **2〜4コマ**に分割してよい（上限は原則4）。各コマは**一つの仕事だけ**（シンプル）。
- コマごとに **別ファイル・別Codexプロンプト**を書く。プロンプト漏れ禁止。
- 判例4コマ（事実→主張→争点→着地）と混同しない。こちらは**情報量のための分割**。
- 詳細の共通ルールは `skills/gyosei-image-style/SKILL.md` の「コマ分割」節。

## 完了条件（知識追加）

- 該当 MD と INDEX がある
- 常識の芯・条文／判例・例外・暗記がある
- e-Gov（または判例出典）確認日がある
- 「まとめて」依頼なら Codex プロンプトがある（画像はまだなくてよい）
- 画像がある論点は PLACEMENT＋joshiki マップ（関連問題用）まで考える
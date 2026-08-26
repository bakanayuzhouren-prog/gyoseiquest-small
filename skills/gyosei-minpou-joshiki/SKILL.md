---
name: gyosei-minpou-joshiki
description: >-
  Civil-law "common-sense first" knowledge base (minpou-joshiki). Use when
  てらしぃ adds 民法の常識論点, asks to まとめて, or wants Codex prompts for explanation
  images of 危険負担, 借家滅失, 720条, 保証人指名, 認知の遡及, 嫡出推定・再婚禁止, 取引上の社会通念, or similar fairness doctrines.
---

# 民法・常識で切る（minpou-joshiki）

## いつ使う

- てらしぃが民法の論点を口頭で足したとき
- 「〇〇についてまとめて」と言ったとき
- そのまとめから解説画像の **Codexプロンプト** を出すとき

画像そのものは Cursor では作らない。Codex → てらしぃ渡し → 生成後に Cursor がアプリへ載せる。従来どおり。

## 正本

`data/knowledge/canonical/minpou-joshiki/`

- 手編集はここだけ。`learn.js` / `questions.js` は触らない。
- 新規論点は `NN-slug.md` を足し、`INDEX.md` に1行足す。
- 切り方は `00-method.md`。常識 → 結論 → e-Gov → 短い例外。

## 新規論点の手順

1. てらしぃの常識の芯を1文で書く。
2. e-Gov（民法 `https://laws.e-gov.go.jp/law/129AC0000000089`）で条・項・ただし書を確認。日付を frontmatter の `e-gov` に残す。
3. 判例が芯なら裁判所サイト等の公開判旨。未確認は断定しない。
4. ネット予備校は補助。e-Gov と矛盾したら捨てる。
5. 4パターン以上の並列表、または正反対の効果なら、実装前に比較表案を出し、てらしぃが断らなければ比較図にする。
6. 「まとめて」が来たら Codex プロンプトを `skills/gyosei-minpou-joshiki/prompts/` に書く。

## 画像

- 画風: `skills/gyosei-image-style/SKILL.md` と `references/visual-guidelines.md`
- 見本レイアウト: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 案内役: **ちゃちゃロット**（`chachalot.png` ＋ `approved-smiling-hat-mascot.png`）
- 左「論点」Q&A（GOとYES混在禁止）。右「ひっかけ」（「聞かない」禁止）。人物下は `役割（何をしたいか）`
- 保存予定: `assets/images/deepdive/minpou-joshiki/<slug>.png`
- アプリ載せは、Codex 生成後・誤情報チェック後に限る

### コマ分割ルール（民法・行政法共通・てらしぃ確定）

説明が長い／1枚に盛ると見づらいときは **2〜4コマ**に分割してよい。各コマは一つの仕事だけ。コマごとに別プロンプト必須。詳細は `skills/gyosei-image-style/SKILL.md`。

## 完了条件（知識追加）

- 該当 MD と INDEX がある
- 常識の芯・条文・例外・暗記がある
- e-Gov 確認日がある
- 「まとめて」依頼なら Codex プロンプトがある（画像ファイルはまだなくてよい）

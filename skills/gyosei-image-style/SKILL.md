---
name: gyosei-image-style
description: >-
  Create consistent GPT Image prompts and placement plans for Gyosei Quest
  learning visuals. Prefer the あぷし-approved layout (主宰者の許可 sample) and the
  ちゃちゃロット (niconico-hat / Chachalot) as the guide character. Use for textbook/deep-dive
  diagrams, Codex image prompts, character generation, and X (@appshi113) study posts.
---

# Gyosei Image Style

Use this skill whenever image generation or visual design consistency matters in Gyosei Quest.

## Brand

- Product / poster: **あぷし**（行政書士受験生）
- X: https://x.com/appshi113 （@appshi113）
- 承認済み教材図レイアウト見本: `assets/approved-shusaisha-kyoka.png`（主宰者の許可 — 要る３つ / 要らないもの）
- 承認済み案内役: **ちゃちゃロット**（にっこり帽子）
  - アプリ: `assets/images/characters/chachalot.png`
  - 教材図 identity: `assets/approved-smiling-hat-mascot.png`
- プロフィール参考: `assets/x-profile-apushi.png`

### 参照画像の役割

- **ちゃちゃロット**: 新規教材図の**標準案内役**。従来のフクロウと**同じ枠**（下の余白・小さく・指し棒だけ）。中央の登場人物にしない。名札は図に書かない。
- **`approved-shusaisha-kyoka.png`**: 教材図の**レイアウト・情報密度**の見本として引き続き使う（左右色分け・中央場面・底部3カード）。図内のフクロウは配置・指示棒の役割見本であり、新規生成のキャラ正本ではない。
- **旧画像のフクロウ**: 明示された移行作業まで**一括置換しない**。

てらしぃが「過去に投稿した図を参考に」と言ったら、**必ず見本PNGを開き**、同型のプロンプト骨格で書く。

## Core Workflow

1. Identify the learning purpose: doctrine map, comparison table, process flow, case timeline, calculation diagram, avatar, or UI-support image.
2. Read the relevant reference:
   - For legal learning diagrams: `references/visual-guidelines.md`（**あぷし承認レイアウト**節を最優先）
   - For recurring characters and avatars: `references/avatar-guidelines.md`
   - Open `assets/approved-shusaisha-kyoka.png` as the **layout** gold standard
   - When generating a character or a diagram that includes the guide: **必ず** `references/avatar-guidelines.md` と `chachalot.png` ＋ `approved-smiling-hat-mascot.png` を開く（無名の熊化・猫・フクロウ防止）
3. Fill the **Prompt Crafting Checklist** in visual-guidelines（タイトル対比・左右・行リスト・判断軸・ひっかけ・暗記）before writing English/Japanese GPT prompts.
4. Preserve legal accuracy before decoration. If a concept is uncertain, mark it for confirmation instead of inventing.
4b. **Write the prompt only after** checking statutes and case holdings. X minimum quality is `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`. Do not wait for てらしぃ to supply stylish wording or the full legal test phrase.
5. Generate GPT Image prompts that specify layout, typography, style, colors, whitespace, and prohibited elements — **match the approved sample density**. Pass **ちゃちゃロット** identity PNGs (`chachalot.png` ＋ `approved-smiling-hat-mascot.png`) whenever the guide appears. Name the character in the prompt.
6. After generating an image, decide its app placement: `もっと深掘る`, `君の教科書`, `見て聞いて覚える`, bonus, textbook 問の下, or X投稿.
   - For DB textbook / 記述カード: place the figure **under the question（問の下）**. Follow `skills/gyosei-kijutsu-textbook/SKILL.md`.
7. Verify the finished image visually against the layout sample and, if the guide is present, against the ちゃちゃロット identity checklist before calling the work complete.

## 解説文が本命。ちゃちゃロットは二の次（てらしぃ確定）

案内役を入れる新規図は、**解説文（答え帯・論点・ひっかけ・暗記）が読めない／法律が違うなら不合格**。ちゃちゃロットの帽子・耳・顔の細部だけで不合格にしない（てらしぃ確定・AGENTS.md）。本文を隠す／裸は直す。ブランド完全一致のために解説文を犠牲にして作り直すな。

次のどれか1つでも当たれば不合格:

- 熊・猫・フクロウ・犬・カエル・青い着ぐるみ・耳付きフード
- 名札・吹き出しに「ちゃちゃロット」「チャチャロット」「シャカロット」「Chachalot」など（名札は書かない）
- 帽子が耳・動物の頭として描かれている
- 参照PNG（`chachalot.png` ＋ `approved-smiling-hat-mascot.png`）と別人
- 中央の登場人物になっている／本文を隠している
- **裸・肌色むき出しの胴体・スーツなし・パンツなし・下着だけ**（緑ブレザー＋白シャツ＋緑ズボン＋靴が必須）
- 白抜き切り抜きの二重貼り、名札「ちゃちゃロット」
- **文字かぶり**（タイトル・パネル・答え帯・指し棒が文字の上）

解説文NG＝不合格。ちゃちゃロットの細部だけで不合格にしない。既存フクロウ図の移行作業は対象外。

## コマ分割（てらしぃ確定・科目共通）

民法・行政法を問わず、解説画像は**なるべく1枚をシンプルに**仕上げる。

次のときは1枚に詰め込まず、**2コマ・3コマ・4コマ（上限は原則4）**に分割する:

- 説明が長くなり、1枚だと読み切れない
- 論点が複数で、1枚にすると資料としてごちゃごちゃする
- 手続の段階（例: 係争委→機関訴訟）や比較軸が並びすぎる

ルール:

1. **各コマ＝一つの仕事**（例: 「参加の理由」と「準用表」を別コマ）。
2. **コマごとに別PNG・別Codexプロンプト**を書く。プロンプト漏れ禁止。
3. ファイル名は `<slug>.png` / `<slug>-2.png` または意味のある別名（`sanka-kaihatsu` / `shokken-junyo`）。
4. 判例ストーリーの文章4コマ（`AGENTS.md` の「判例4コマ」）とは別物。こちらは**情報量のための分割**。
5. deepdive ではコマ順に `[[image:...]]` を並べる。

## Required Output For Image Tasks

When creating or planning an image, include:

- Purpose: what the learner should understand faster after seeing it.
- Placement: exact screen/data target（and X投稿するか）
- Prompt: GPT Image prompt using the **あぷし型** skeleton in visual-guidelines
- Checklist filled: 判断軸 / ひっかけ / 暗記 の日本語確定文
- Guide character: **ちゃちゃロット**（`chachalot.png` ＋ `approved-smiling-hat-mascot.png`）※既存フクロウ図の移行でない限り新規はこちら
- Alt summary: short text fallback for the app
- Verification notes: text overlap, readability, legal accuracy risk, mascot identity checks, and file size

## Default GPT Image Prompt Skeleton

Use the full **あぷし型** skeleton in `references/visual-guidelines.md`. Short form:

```text
Create a Japanese legal-study infographic for Gyosei Quest / あぷし.
Match approved layout sample「主宰者の許可 — 要る３つ / 要らないもの」:
left green / right orange panels, center scene, bottom 判断軸・ひっかけ・暗記 cards, warm off-white, large Japanese, navy title.
Guide character: ちゃちゃロット (Chachalot) in the SAME slot as the green owl: SMALL, bottom-right margin only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate. Not a bear/owl/cat.
Topic: [...]. Learning goal: [...].
Exact labels: [...].
Avoid tiny text, dense paragraphs, mock-exam copy, clutter.
```

For character-only or character-heavy jobs, also use the **ちゃちゃロット** standard prompt in `references/avatar-guidelines.md`.

## Project Rules

- Do not reproduce third-party mock exam pages, answer explanations, or screenshots verbatim.
- Use source material only to extract short, original learning points.
- Keep generated images lightweight enough for the app; prefer compressed PNG/WebP after visual verification.
- If replacing an existing image, preserve all active references or update the image map in the same change.
- Do not ship a legal diagram that is only a title, paragraphs, and a table. Apply the Exciting Learning Diagram System + **あぷし承認レイアウト**.
- Choose one visual metaphor, and always include 判断軸・ひっかけ・暗記.
- Descriptive textbook figures: left **論点** (Q&A; YES/NO or short answer only; never mix GO+YES; never「問が聞くこと」), right **ひっかけ** (never「（聞かない）」), character labels `役割（何をしたいか）` (never「だれが」), statutes as（〇条）in body rows. Gold: 民法記述Q1. 次の20問: `../gyosei-kijutsu-textbook/prompts/codex-batch-next-20.md`（民法Q42〜Q53＋行政法Q1〜Q8。民法q1〜q41上書き禁止）。
- For **new** diagrams, use the approved smiling-hat guide (not the owl), warm off-white background, and semantic colors (green GO / orange need-permit / red stamp).
- Do **not** bulk-replace owls in existing learning images unless てらしぃ explicitly requests a migration pass.
- For restyling, keep the original asset key and legal structure while removing source filenames and production notes.
- When improving prompt skill from てらしぃ's X posts, save new approved samples under `assets/` and describe the extracted pattern in visual-guidelines / avatar-guidelines.

## Codex：「画像生成して」（てらしぃ確定）

プロンプト作成は **Cursor**。Codex は一言 **「画像生成して」** で未生成だけ、**古い順**に作る。

1. **探索**: `npm run list:codex-images-pending`（`scripts/listPendingCodexImages.mjs`）
2. **手順正本**: `prompts/CODEX-IMAGE-BATCH.md`
3. **生成前チェック（必須）**: `prompts/PRE-GENERATE-CHECK.md`。おかしい点があれば描かない
4. **触るな**: `codex-fix-*` / `codex-batch-*` / 本文「廃止」
5. Cursor が書く新規 `codex-*.md` は必ず `- 保存先: assets/images/deepdive/...png`。書く前にも同じチェック

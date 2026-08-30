# Codex 教材画像：「画像生成して」

てらしぃが Codex に次の一言だけ言ったとき、**この手順だけ**動く。

> 画像生成して

同趣旨（「未生成を作って」「pending を生成して」）も同じ。

## 役割分担（てらしぃ確定）

| 役 | やること |
|---|---|
| **Cursor** | Codex 用 `codex-*.md` を作る。`保存先:` を書く。**画像は描かない。** アプリ載せは生成後 |
| **Codex** | 未生成 PNG だけ、**古いプロンプトから順に** GPT Image で作る |

Codex はプロンプトを新規作成しない。実装・sync・X予約もしない。

## Codex が最初にやること（必須）

1. 未生成一覧（**古い順**）:

```bash
node scripts/listPendingCodexImages.mjs
```

JSON:

```bash
node scripts/listPendingCodexImages.mjs --json
```

特定フォルダ:

```bash
node scripts/listPendingCodexImages.mjs --folder fufuku
```

2. **`pending` が 0 件**なら「未生成なし」と報告して終了。
3. **`pending` がある**なら、一覧の **上から（mtime 古い順）** 1ファイルずつ開く。
4. **生成する前に** `PRE-GENERATE-CHECK.md` を通す。おかしい点があれば **その枚は生成しない**（てらしぃへ報告。修正前ファイルは直さない。次の pending へ進んでよい）。
5. チェック全OKのときだけ、そのファイルの GPT Image プロンプトで **1枚**生成する。型が崩れたら次に進まない。

## 絶対に触らない（修正前）

スクリプトが除外済み。Codex も手で開かない。

- ファイル名 `codex-fix-*`（局所Edit・修正前）
- ファイル名 `codex-batch-*`（束ね指示）
- 本文先頭が **廃止**、または `retired: true` / `doNotGenerate: true`

`codex-gen-*` は新規1枚プロンプト。PNG が無いときだけ pending に載る。

## 生成前に毎回開く

- `skills/gyosei-image-style/prompts/PRE-GENERATE-CHECK.md`（**必須。通るまで描かない**）
- `skills/gyosei-image-style/SKILL.md`
- `skills/gyosei-image-style/references/visual-guidelines.md`
- `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- `assets/images/characters/chachalot.png` ＋ `approved-smiling-hat-mascot.png`

## 生成ルール

| やる | やらない |
|---|---|
| チェックOKの pending だけ生成する | おかしいプロンプトから描く／修正前ファイルを開く・直す |
| **保存先**は `保存先:` / `保存:` / `コマN:` のパス通り | アプリコード・learn・sync の編集 |
| **1枚ずつ**。古い順 | 6枚同時一括 |
| 生成後 **目視**（ちゃちゃロット崩壊は不合格） | X 予約投稿 |
| 完了報告に promptFile → outputRel | `generateDeepdiveImages.js`（Cursor へ） |

## Cursor がプロンプトを書くとき

新規は必ず次を入れる（これがないと pending に載らない）:

```markdown
# （題名）

- 保存先: assets/images/deepdive/{科目}/{slug}.png

## GPT Image プロンプト

```text
Create a NEW ...
```
```

- 名前は `codex-<slug>.md` または `codex-gen-<slug>.md`
- **`codex-fix-*` に新規を書かない**（修正前扱い・検出されない）
- 廃止にした旧ファイルは先頭を `# 廃止` にする。中身は触らない

## Codex 完了報告テンプレ

```
## 生成完了
- pending 開始: N 件 → チェック落ち（未生成）: S 件 → 生成: M 件 → 残: K 件
- 順: 古いプロンプトから

| output | prompt | チェック | 目視 |
|--------|--------|----------|------|
| assets/images/deepdive/...png | codex-....md | OK | OK |
| （未生成） | codex-....md | NG：理由 | — |

## Cursor 引き継ぎ
- PNG 配置済みパス一覧
- チェック落ちプロンプト（Cursor が直す。codex-fix-* は使わない）
- node scripts/generateDeepdiveImages.js
```

---

**てらしぃ向け:** Codex には「画像生成して」だけ。プロンプト作成は Cursor。

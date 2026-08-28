# Codex 教材画像：未生成プロンプトの自動探索と一括生成

てらしぃが次のように言ったとき、**Codex（GPT Image）がこの手順どおり動く**。

> 画像生成していないコーデックス用プロンプトを探して、画像生成して  
> （言い換え: 未生成の codex プロンプトを探して画像を作って / pending の codex 画像を生成して）

## Codex が最初にやること（必須）

1. リポジトリで **未生成一覧** を出す:

```bash
node scripts/listPendingCodexImages.mjs
```

JSON が欲しいとき:

```bash
node scripts/listPendingCodexImages.mjs --json
```

特定フォルダだけ（例: 行服法）:

```bash
node scripts/listPendingCodexImages.mjs --folder fufuku
```

2. **`pending` が 0 件**なら「未生成なし」と報告して終了。
3. **`pending` がある**なら、一覧の **上から順に** 各 `promptFile` を開き、**1ファイル＝1枚（またはファイル内の各コマ1枚）** GPT Image で生成する。

## 生成前に毎回開く（共通）

- `skills/gyosei-image-style/SKILL.md`
- `skills/gyosei-image-style/references/visual-guidelines.md`
- `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- `assets/images/characters/chachalot.png` ＋ `approved-smiling-hat-mascot.png`

フォルダ README があれば優先（生成順・禁止事項）:

- `prompts/kiso/README.md`
- `prompts/fufuku/README.md`

## 生成ルール

| やる | やらない |
|---|---|
| 各 codex ファイルの **GPT Image プロンプト** ブロックをそのまま使う | `codex-fix-*` / `codex-batch-*` / `codex-gen-*` を勝手に開く（スクリプトが除外済） |
| **保存先**はファイル先頭の `保存先:` / `保存:` / `コマN:` のパス通り | アプリコード・learn・sync の編集 |
| **1枚ずつ**生成。型が崩れたら次に進まない | 6枚同時一括（品質落ちる） |
| 生成後 **目視チェック**（各 codex ファイル末尾のリスト） | X 予約投稿 |
| 完了報告に **promptFile → outputRel** の対応表 | `generateDeepdiveImages.js`（Cursor へ） |

## バッチフォルダ（生成順）

| フォルダ | 内容 | 件数目安 |
|---|---|---|
| `prompts/kiso/` | 基礎法学 01→11 | README 参照 |
| `prompts/fufuku/` | 行服法 01→06 | README 参照 |
| `prompts/tetsuzuki/` | 行政手続法など | 各 README |
| `skills/gyosei-kijutsu-textbook/prompts/` | 記述教科書 qN | 個別 codex |
| `skills/gyosei-minpou-joshiki/prompts/` | 民法常識 | 個別 codex |
| `skills/gyosei-gyoseihou-joshiki/prompts/` | 行政法常識 | 個別 codex |

`listPendingCodexImages.mjs` が **全 skills 配下の codex-*.md** を走査し、PNG が無いものだけ列挙する。

## Codex 完了報告テンプレ

```
## 生成完了
- pending 開始: N 件 → 生成: M 件 → 残: K 件

| output | prompt | 目視 |
|--------|--------|------|
| assets/images/deepdive/fufuku/shomon-flow.png | codex-fufuku-01-shomon-flow.md | OK |

## Cursor 引き継ぎ
- PNG 配置済みパス一覧
- node scripts/generateDeepdiveImages.js
- 該当 learn deepdive の [[image:...]] 未埋込があれば Cursor が追加
- X予約はてらしぃ目視OK後
```

## てらしぃ向け一言（Codex から）

「`npm run list:codex-images-pending` で未生成を確認できます。今回 M 枚生成、残 K 枚。アプリ載せは Cursor に渡してください。」

## Cursor 側（Codex 完了後）

1. PNG が所定パスにあるか確認
2. `npm run generate:deepdive-images`
3. learn / deepdive の `[[image:...]]` 未埋込を追加
4. 目視チェック（法律・文字切れ・ちゃちゃロット）

---

**新規 codex プロンプトを Cursor が作ったとき**  
必ず `- 保存先: assets/images/deepdive/.../*.png` を先頭付近に書く → 本スクリプトが自動で pending に載る。

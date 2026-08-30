# Codex用プロンプト（行政不服審査法・見て聞いて覚える）

Cursor がプロンプトを置く場所。Codex は **「画像生成して」** で未生成だけ古い順に作る。配置・マップは Cursor。

手順: `../CODEX-IMAGE-BATCH.md`  
`npm run list:codex-images-pending -- --folder fufuku`

**由来**: 行服法固めチャット（合格革命模試復習）で Cursor が作成した草稿  
`skills/gyosei-image-style/prompts/fufuku-*.md` を Codex 一括生成向けに正本化。

**配置先（生成後・Cursor）**: `assets/images/deepdive/fufuku/`  
**深掘りマップ**: `node scripts/generateDeepdiveImages.js`  
**埋め込みキー**: `[[image:fufuku/<slug>]]`

## 生成順（推奨）

1. **先に 01 だけ** Codex に渡す（`codex-fufuku-01-shomon-flow.md`）。型OKなら 02〜06 を **1枚ずつ**。
2. **一括生成**するときも、ファイルを **01→12 の順** で渡す（同時に12枚生成しない）。
3. 途中で品質が落ちたら量産を止め、01 の型に戻す。

### 一括 handoff 用（Codex への最初の1行）

```
skills/gyosei-image-style/prompts/fufuku/README.md と codex-fufuku-01 から 06 までを順に読み、
各ファイルの GPT Image プロンプトで1枚ずつ生成。保存先は各ファイルの「保存先」通り。
アプリ埋め込み・マップ再生成はしない（Cursor 引き継ぎのみ報告）。
```

## 前提（各ファイル共通・生成前に開く）

- `skills/gyosei-image-style/SKILL.md`
- `skills/gyosei-image-style/references/visual-guidelines.md`
- `skills/gyosei-image-style/references/avatar-guidelines.md`
- レイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 案内役: `approved-smiling-hat-mascot.png` ＋ `assets/images/characters/chachalot.png`
- 見出し見本: `skills/gyosei-kijutsu-textbook/prompts/codex-q1-126-ronten.md`

## コマ一覧

| # | ファイル | 1枚の仕事 | 保存 | 草稿（Cursor） |
|---|---------|-----------|------|----------------|
| 01 | `codex-fufuku-01-shomon-flow.md` | 意見書→諮問→裁決の順番 | `shomon-flow.png` | `../fufuku-shomon-consultation-flow.md` |
| 02 | `codex-fufuku-02-saiketsu-henko-46.md` | 46条裁決の変更権3区分 | `saiketsu-henko-46.png` | `../fufuku-saiketsu-henko-46.md` |
| 03 | `codex-fufuku-03-shikko-futeishi-jiko.md` | 執行不停止25条1項 vs 18条期間 | `shikko-futeishi-jiko.png` | `../fufuku-shikko-futeishi-jikou.md` |
| 04 | `codex-fufuku-04-shikko-teishi-torikeshi-26.md` | 執行停止取消 行服26 vs 行訴26・27 | `shikko-teishi-torikeshi-26.png` | `../fufuku-shikko-teishi-torikeshi-26.md` |
| 05 | `codex-fufuku-05-shinsa-kikan-hikaku.md` | 不服申立期間 54・18・62条 | `shinsa-kikan-hikaku.png` | `../fufuku-shinsa-kikan-hikaku.md` |
| 06 | `codex-fufuku-06-shinsakai-role.md` | 行政不服審査会の役割・組織 | `shinsakai-role.png` | `../fufuku-shinsakai-role-flow.md` |
| 07 | `codex-fufuku-07-7jo-ippan-kaku.md` | 一般概括主義と7条適用除外 | `7jo-ippan-kaku.png` | — |
| 08 | `codex-fufuku-08-kyoji-saichosa-misoshiji.md` | 教示・誤教示・59条決定・みなし | `kyoji-saichosa-misoshiji.png` | — |
| 09 | `codex-fufuku-09-chokutini-sokuni-chienaku.md` | 直ちに・速やかに・遅滞なく | `chokutini-sokuni-chienaku.png` | — |
| 10 | `codex-fufuku-10-sankasya-19-23-28.md` | 参加人・19条・23条・28条（行手法比較） | `sankasya-19-23-28.png` | — |
| 11 | `codex-fufuku-11-jijou-saiketsu-4jo.md` | 事情裁決・4条・46条・15条 | `jijou-saiketsu-4jo-15.png` | — |
| 12 | `codex-fufuku-12-shoko-32-36.md` | 証拠提出・留め置き・鑑定・検証立会・質問 | `shoko-32-36.png` | — |

## 比較学習クラスタ（07〜12）

てらしぃ復習メモ（概括主義・7条5/9号・教示83条・59条決定・速度語句）を3枚に分割。生成順は **07→08→09**（07で7条、08で教示フロー、09で速度語句）。

## 共通禁止

- フクロウ・猫・熊・犬。帽子を耳と解釈しない
- 模試・予備校の全文転載
- アプリ埋め込み・マップ再生成（Cursor へ）
- 1枚に複数仕事を詰めない
- ひっかけ側を緑 GO にしない
- 「だれが」「問が聞くこと」「（聞かない）」
- 論点パネルに GO／STOP（YES は原則1行目だけ）

生成後の X 予約はてらしぃ目視 OK 後。誤情報は先にてらしぃへ報告。

## Cursor 引き継ぎ（全枚共通）

1. PNG を `assets/images/deepdive/fufuku/` へ
2. `node scripts/generateDeepdiveImages.js`
3. 該当 learn カード deepdive に `[[image:fufuku/<slug>]]` が未埋込なら追加
4. 目視チェック（各 codex ファイル末尾のリスト）

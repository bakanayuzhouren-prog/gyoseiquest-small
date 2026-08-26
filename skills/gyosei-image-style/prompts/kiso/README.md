# Codex用プロンプト（基礎法学・見て聞いて覚える）

てらしぃが **「コーデックスで」** と明示したときの GPT Image 用。Cursor はこのフォルダを渡すだけで、**画像は作らない**。

正本: `data/knowledge/canonical/tac-moshi-compare-tables.md` §7〜§9  
要約: `data/learn/kiso-hougaku-summary.md`  
配置先（生成後・Cursor）: `assets/images/deepdive/learn/kiso/` → キー `learn/kiso/<slug>`  
深掘りマップ: `node scripts/generateDeepdiveImages.js`

## 生成順（てらしぃ確定の1枚パイロット）

1. **先に 01 だけ** Codex に渡す（`codex-kiso-01-tadachini.md`）。
2. 型（文字密度・ちゃちゃロット・左右見出し）がOKなら、02〜11を **1枚ずつ** 渡す。まとめて横展開しない。
3. 途中で品質が落ちたら、量産を止めて 01 の型に戻す。

前提（各ファイル共通・生成前に開く）:

- `skills/gyosei-image-style/SKILL.md`
- `skills/gyosei-image-style/references/visual-guidelines.md`
- `skills/gyosei-image-style/references/avatar-guidelines.md`
- レイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 案内役: `approved-smiling-hat-mascot.png` ＋ `assets/images/characters/chachalot.png`
- 見出し見本: `skills/gyosei-kijutsu-textbook/prompts/codex-q1-126-ronten.md`

## コマ一覧

| # | ファイル | 1枚の仕事 | 保存 |
|---|---------|-----------|------|
| 01 | `codex-kiso-01-tadachini.md` | 直ちに＞速やかに＞遅滞なく | `tadachini.png` |
| 02 | `codex-kiso-02-kaishaku.md` | 法解釈4類型（＋もちろん） | `kaishaku-4type.png` |
| 03 | `codex-kiso-03-minso-keiso.md` | 民訴の芯（自白・弁論）vs 刑訴 | `minso-keiso.png` |
| 04 | `codex-kiso-04-sonota.md` | その他 vs その他の | `sonota.png` |
| 05 | `codex-kiso-05-kasuru.md` | 課する vs 科する | `kasuru.png` |
| 06 | `codex-kiso-06-houritsu-meirei.md` | 法律／命令＋施行 | `houritsu-meirei.png` |
| 07 | `codex-kiso-07-keihou6.md` | 刑法6条（軽い方） | `keihou6.png` |
| 08 | `codex-kiso-08-sentoku.md` | 先特後普 | `sentoku.png` |
| 09 | `codex-kiso-09-adr.md` | ADR4（調停・和解・仲裁・あっせん） | `adr-4.png` |
| 10 | `codex-kiso-10-hougen.md` | 制定法＞判例・条理・学説 | `hougen.png` |
| 11 | `codex-kiso-11-saibansho.md` | 裁判所の第一審・控訴・大法廷 | `saibansho.png` |

次バッチ（この回では作らない）: 外国人の国外犯、裁判員（既存 `kenshin-vs-saibanin.png` あり）。

## 共通禁止

- フクロウ・猫・熊・犬。帽子を耳と解釈しない
- 模試・予備校の全文転載
- アプリ埋め込み・マップ再生成（Cursorへ）
- 1枚に複数仕事を詰めない
- ひっかけ側を緑GOにしない
- 「だれが」「問が聞くこと」「（聞かない）」
- 論点パネルに GO／STOP。YES は原則1行目だけ

生成後のX予約はてらしぃ目視OK後。誤情報は先にてらしぃへ報告。

# Codex用 — 基礎法学パイロット（直ちに＞速やかに＞遅滞なく）

てらしぃ指示: **1枚だけ試し**。基礎法学・法令用語。型がOKなら 02 以降へ。

- 保存先: `assets/images/deepdive/learn/kiso/tadachini.png`
- 画像キー: `learn/kiso/tadachini`
- 配置（生成後・Cursor）: 見て聞いて覚える・基礎法学の該当カード「もっと深掘る」／要約の法令用語
- 前提: 同フォルダ `README.md` の見本PNG・スキルを必ず開く
- **禁止**: フクロウ・猫・熊。横展開。アプリ埋め込み（Cursorへ）

## 法律の芯（崩すな）

スピードは **直ちに ＞ 速やかに ＞ 遅滞なく**（速い→遅い）。

| 語 | 意味 | 定番例 |
|----|------|--------|
| 直ちに | 即時。正当な遅れは原則ダメ | 交通事故後の救護（道交法）／逮捕後の権利告知（刑訴） |
| 速やかに | できる限り早く | 個人情報取得後の利用目的通知（個情法）／執行停止をするかの決定（行服法） |
| 遅滞なく | 正当理由があれば遅れ可 | 審理員意見書の作成提出（行服法42条） |

**書かない**: 直ちに＞遅滞なく＞速やかに（既存まとめが誤っていた順）。3語を同義にしない。

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| 見本参照 | 主宰者許可図／ちゃちゃロット承認PNG |
| タイトル対比 | 直ちに / 速やかに / 遅滞なく — 速い順 |
| 左右の意味 | 緑＝論点（Q&A）／橙＝ひっかけ |
| 各行＋条文 | Q&A。行服法42条は遅滞なくの例に括弧 |
| 役割ラベル | 審査庁（早く決めたい）／審理員（意見書を出す） |
| 中央メタファー | 表彰台（1位直ちに・2位速やかに・3位遅滞なく） |
| 判断軸 | 速い順は直ちに＞速やかに＞遅滞なく |
| ひっかけ | 遅滞なくと速やかにを入れ替える／全部即時 |
| 暗記 | 直ちにが一番速い。遅滞なくは正当理由あり |
| 案内役 | ちゃちゃロット。下余白・指し棒・暗記 |
| 配置先 | learn/kiso/tadachini |

## 論点Q&A（GOなし）

- 一番速いのは？ → 直ちに
- 正当理由で遅れ可は？ → 遅滞なく
- 速やかにの位置は？ → 真ん中（できる限り早く）

2行目・3行目に YES を付けない。論点に GO／STOP バッジを置かない。

## 役割

- 左寄り: **審査庁（執行停止を早く決めたい）**
- 右寄り: **審理員（意見書を出したい）**
- 中央物: **速さの表彰台**

## GPT Image プロンプト（このまま生成）

画像参照として必ず渡す:

1. `approved-shusaisha-kyoka.png`（レイアウト密度のみ。フクロウはコピーしない）
2. `approved-smiling-hat-mascot.png` および `chachalot.png`（案内役 identity）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: Legal Japanese time-words — 直ちに vs 速やかに vs 遅滞なく.
Pilot image for 基礎法学. Learning goal: After one glance, the learner knows the speed order
直ちに ＞ 速やかに ＞ 遅滞なく (fast to slow) and never swaps 遅滞なく with 速やかに.

Match LAYOUT density of「主宰者の許可 — 要る３つ / 要らないもの」:
left green / right orange panels, center scene, bottom 判断軸・ひっかけ・暗記,
warm off-white, large Japanese, navy title. 16:9 or 1536x1024. No overlap. No tiny text.

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点 panel: Q&A only. NO GO badges, NO STOP badges on 論点. Do NOT mix GO and YES.
- Never write YES on rows 2–3. Never write「だれが」.
- Character labels MUST be:
  Left:「審査庁（執行停止を早く決めたい）」
  Right:「審理員（意見書を出したい）」

Title:「直ちに / 速やかに / 遅滞なく — 速い順」
Small chip top-right:「入れ替え禁止」

Center metaphor (ONE): a 3-step PODIUM race.
1st place gold:「直ちに」（即時）
2nd silver:「速やかに」（できる限り早く）
3rd bronze:「遅滞なく」（正当理由あれば遅れ可）
Do not draw a second metaphor (no clocks wall, no courtroom full scene).

Left 論点 (no GO):
1. 一番速いのは？ → 直ちに
2. 正当理由で遅れ可は？ → 遅滞なく
3. 速やかにの位置は？ → 真ん中

Right ひっかけ (注意 stamps OK, not green GO as the legal rule):
- 直ちに＞遅滞なく＞速やかに（順が逆）
- 3語はだいたい同じ
- 遅滞なく＝即時
- 行服の審理員意見書は「直ちに」

Tiny example chips OK if readable (do not become paragraphs):
直ちに＝救護・権利告知／速やかに＝執行停止の決定／遅滞なく＝審理員意見書（行服法42条）

Bottom (exact Japanese):
- 判断軸:「速い順は直ちに＞速やかに＞遅滞なく」
- ひっかけ:「遅滞なくと速やかにを入れ替えるな」
- 暗記:「直ちにが一番速い。遅滞なくは正当理由あり」
Answer capsule:
「直ちに＞速やかに＞遅滞なく。遅滞なくだけ正当な遅れが許される。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, wooden 指し棒 pointing at 暗記.
Match chachalot.png. Not a scene character. No nameplate.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses, not a bear/owl/cat).

Legal accuracy: NEVER write 直ちに＞遅滞なく＞速やかに as the correct order.
Avoid mock-exam copy, watermarks, filenames, English UI chrome except optional one stamp.
Do NOT generate other topics' images.
```

## 目視チェック（生成後・必須）

- [ ] フクロウがいない。帽子が耳／動物になっていない
- [ ] 左見出しが「論点」、右が「ひっかけ」
- [ ] 論点に GO／STOP がない
- [ ] 表彰台の1位が直ちに、3位が遅滞なく
- [ ] 「直ちに＞遅滞なく＞速やかに」が正しいルールとして緑になっていない
- [ ] 底部3カードと答え帯が読める。文字の重なりなし

誤情報があれば生成を止め、てらしぃへ報告。勝手に順を変えない。

## Codex 完了時の報告

- Purpose / Placement / 生成ファイルパス
- Alt summary（1文）
- 目視結果（レイアウト＋ちゃちゃロット identity＋法律）
- Cursor 引き継ぎ: `tadachini.png` を `learn/kiso/` へ。`node scripts/generateDeepdiveImages.js`。X予約はてらしぃ目視OK後

## てらしぃ確認事項

型（表彰台メタファー、文字密度）がOKなら 02 法解釈へ。NGならこの1枚に戻してプロンプトを直す。

# Codex用・記述解説画像プロンプト（Q5 錯誤・あぷし型＋にっこり帽子）

- 対象: 民法記述 Q5 錯誤〔民法95条〕
- 配置予定: 問の下 `[[image:textbook/minpou-kijutsu/q5]]`
- 保存先: `assets/images/deepdive/textbook/minpou-kijutsu/q5.png`
- 前提（生成前に必ず開く）:
  - `skills/gyosei-image-style/SKILL.md`
  - `skills/gyosei-image-style/references/visual-guidelines.md`
  - `skills/gyosei-image-style/references/avatar-guidelines.md`（Approved Smiling-Hat Instructor）
  - レイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
  - **案内役正本（画像参照必須）**: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
- ブランド: あぷし / X @appshi113
- **禁止**: フクロウ・猫・熊・犬などへの誤変換。帽子を耳と解釈しない。
- 範囲: **画像生成と配置方針まで**。MD埋め込み・マップ再生成は Cursor へ渡す

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| レイアウト見本 | 主宰者の許可図（左右色分け＋中央場面＋底部3カード） |
| 案内役 | **にっこり帽子**（承認PNG）。フクロウ不使用 |
| タイトル対比 | 錯誤95条 — 重過失でも取消せる例外（要る2つ） |
| 左（緑／原則） | 表意者に重大な過失 → 取消しできない（原則ストップ） |
| 右（橙／例外） | ①相手方知り／重過失で知らなかった ②双方同一の錯誤 → 取消し可 |
| 中央メタファー | 重過失ゲート＋例外ドア2つ |
| 判断軸 | 誰の過失？表意者。それでも取消せるのは例外①②だけ |
| ひっかけ | 動機錯誤・表示に逃げる／重過失＝即アウト |
| 暗記 | 知り／重過失で知らなかった　又は　双方同一錯誤 |
| 答案の芯 | 相手方が錯誤を知り若しくは重過失で知らなかったとき、又は双方同一の錯誤のとき。（39字） |
| 配置 | textbook/minpou-kijutsu/q5 |

## GPT Image プロンプト（このまま生成）

画像参照として必ず渡す:
1. `approved-shusaisha-kyoka.png`（レイアウト密度のみ参考。フクロウはコピーしない）
2. `approved-smiling-hat-mascot.png`（案内役の identity 正本）

```text
Create a Japanese legal-study infographic for Gyosei Quest / あぷし exam prep.

LAYOUT reference only: match the structure and information density of「主宰者の許可 — 要る３つ / 要らないもの」
(approved-shusaisha-kyoka.png): left/right color panels, central scene, bottom three cards
(判断軸 / ひっかけ / 暗記), warm off-white background, flat editorial icons, large readable Japanese,
navy title bar, GO vs stamp-style badges. Do NOT copy the owl from that sample.

GUIDE CHARACTER (mandatory identity): use approved-smiling-hat-mascot.png as the authoritative reference.
Place the smiling-hat instructor in the bottom-right margin holding a pointer toward the 暗記 card.
Optional: green lecturer jacket, teal bow tie, small navy textbook.
Preserve exactly: separate pale-sky-blue smiling hat (NOT ears), smooth long brim, wide pale-cream face,
equal perfect-circle navy eyes, equal perfect-circle white highlights in each eye's upper-left,
four short navy cheek marks per side, small oval navy nose, smiling mouth with small coral interior,
smooth intentional navy outlines, restrained cel shading, soft blush.
Do NOT reinterpret the hat as cat/bear/owl/dog ears. No whiskers, muzzle, fur, beak, feathers, paw pads, or glasses.
No distorted eye circles, wobbly outlines, or asymmetric face collapse.

Canvas: 1536x1024 landscape, generous margins, mobile-readable Japanese.

Topic: 民法95条3項（錯誤）— 表意者に重大な過失があっても取消しできる例外.
Learning goal: After one glance, write the 40-character descriptive answer about when cancellation is still allowed despite gross negligence.

Layout:
1) Top navy title:「錯誤95条 — 重過失でも取消せる例外（要る2つ）」
   Small chip top-right:「動機錯誤の話に逃げるな」
2) Center scene: checkpoint gate「表意者の重大な過失」blocking path「取消し」;
   two teal side doors「例外①」「例外②」. Optional stamp「取消し可」on open doors only.
3) Left GREEN panel「原則：取消しできない」
   Icon rows + STOP/block badge:
   - 表意者に重大な過失（95条3項本文）
   - 原則ストップ
4) Right ORANGE panel「例外：それでも取消し可」
   Icon rows + green GO badges:
   - 例外① 相手方が錯誤を知り、又は重大な過失で知らなかった（3項一）
   - 例外② 相手方が同一の錯誤に陥っていた（3項二）
5) Bottom three cards (exact Japanese):
   - 判断軸:「誰の過失？表意者。それでも取消せる条件は例外①②だけ」
   - ひっかけ:「動機錯誤・表示や『重過失＝即アウト』に引っ張られるな」
   - 暗記:「知り／重過失で知らなかった　又は　双方同一錯誤」
6) Smiling-hat guide bottom-right pointing at 暗記（identity from approved PNG). NO owl.

Answer capsule (short):「相手方が錯誤を知り若しくは重過失で知らなかったとき、又は双方同一の錯誤のとき」

Legal accuracy: ONLY Civil Code 95(3) principle + items 1 and 2. No other exceptions. No long statute dump.
Colors: green=GO/exception; orange=exception panel/caution; red=blocked by gross negligence; navy=title.
Avoid: tiny text, dense paragraphs, clutter, heavy gradients, dark photo mood, mock-exam copy, watermarks, filenames,
English UI chrome except one optional stamp, any animal mascot, owl.
Ensure no overlapping labels; keep row spacing like the 主宰者許可 sample.
```

## 目視チェック（生成後・必須）

- [ ] フクロウがいない
- [ ] 帽子が耳／動物になっていない
- [ ] 黒い瞳・白いハイライトが左右同径の真円
- [ ] 頬マーク左右4本
- [ ] 左右パネル＋底部3カードがある
- [ ] 答案の芯（例外①②）が読める

## Codex 完了時の報告フォーマット

- Purpose / Placement / 生成ファイルパス
- Alt summary（1文）
- 目視: レイアウト見本との構造一致＋にっこり帽子 identity
- Cursor 引き継ぎ: MDに `[[image:textbook/minpou-kijutsu/q5]]`、deepdive画像マップ再生成

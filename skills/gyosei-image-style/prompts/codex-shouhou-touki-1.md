# Codex用・商法教科書パイロット図（商業登記・対抗力）

てらしぃ指示: **1問だけ試し**。商法12点教科書・第1章必殺 `touki-1`。

- 対象肢: 「商業登記をすれば、登記後の第三者には常にその事実を対抗できる。」→ **×**
- 配置予定（生成後・Cursor）: 商法教科書 `/textbook/shouhou` 第1章、必殺の解説の下
- 保存先: `assets/images/deepdive/textbook/shouhou/touki-1.png`
- 画像キー案: `textbook/shouhou/touki-1`
- 前提（生成前に必ず開く）:
  - `skills/gyosei-image-style/SKILL.md`
  - `skills/gyosei-image-style/references/visual-guidelines.md`
  - `skills/gyosei-image-style/references/avatar-guidelines.md`
  - レイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`（無ければ `assets/` 側の同名も可）
  - 案内役正本: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `assets/images/characters/chachalot.png`
  - 見出し見本: `skills/gyosei-kijutsu-textbook/prompts/codex-q1-126-ronten.md`
- ブランド: あぷし / X @appshi113
- **禁止**: フクロウ・猫・熊・犬。帽子を耳と解釈しない。模試・予備校の全文転載。横展開（他問の連作）。アプリ埋め込み・deepdiveマップ再生成（Cursorへ）
- 範囲: **この1枚の画像生成と配置方針まで**

## 法律の芯（崩すな）

商法9条（会社は会社法908条が同趣旨）

1. 登記すべき事項は、**登記の後でなければ善意の第三者に対抗できない**
2. **登記の後であっても**、第三者が**正当な事由によってその登記があることを知らなかったとき**は、同様（対抗できない）

正当事由のイメージ: 災害・通信途絶など、**知り得なかったことが正当**な場合。単なる不注意・調べなかったは入らない。

混ぜない: 対抗力 ≠ 効力発生。商号譲渡の登記（対抗要件）はこの図の主題ではない。不実登記の公信もこの1枚では扱わない。

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| 見本参照 | 主宰者許可図／ちゃちゃロット承認PNG |
| タイトル対比 | 商業登記 — 登記後でも例外あり（無敵ではない） |
| 左右の意味 | 緑＝論点（Q&A）／橙＝ひっかけ |
| 各行＋条文 | Q&A＋（商法9条）。会社法908条はタイトルか注1行まで |
| 役割ラベル | 会社（事実を対抗したい）／第三者（正当事由で知らなかった） |
| 中央メタファー | 登記簿シールドに「正当事由」の穴 |
| 判断軸 | 登記後でも、正当事由で知らなかった第三者には対抗不可（商法9条） |
| ひっかけ | 「常に対抗できる」／不注意＝正当事由／効力発生と混ぜる |
| 暗記 | 登記＝無敵ではない。正当事由例外 |
| 案内役 | ちゃちゃロット。下余白・指し棒・暗記を指す |
| 配置先 | textbook/shouhou/touki-1 |

## 論点Q&A（GOなし）

- 登記後は原則対抗できる？ → YES（商法9条）
- 正当事由ある第三者は？ → 対抗できない（商法9条）
- 正当事由の例は → 災害などで知り得ないとき

2行目・3行目に YES を付けない。論点に GO／STOP バッジを置かない。

## 役割

- 左寄り中央: **会社（事実を対抗したい）**
- 右寄り中央: **第三者（正当事由で知らなかった）**
- 中央物: **登記簿（シールド）＋穴**

## GPT Image プロンプト（このまま生成）

画像参照として必ず渡す:

1. `approved-shusaisha-kyoka.png`（レイアウト密度のみ。フクロウはコピーしない）
2. `approved-smiling-hat-mascot.png` および `chachalot.png`（案内役 identity）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: Commercial registration — effect against third parties (商法9条 / 会社法908条).
Pilot image for 商法教科書 必殺 touki-1. Learning goal: After one glance, the learner knows
登記後 is NOT invincible; 正当事由で知らなかった第三者には対抗できない.

Match LAYOUT density of「主宰者の許可 — 要る３つ / 要らないもの」:
left green / right orange panels, center scene, bottom 判断軸・ひっかけ・暗記,
warm off-white, large Japanese, navy title. 16:9 or 1536x1024. No overlap. No tiny text.

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点 panel: Q&A only. NO GO badges, NO STOP badges on 論点. Do NOT mix GO and YES.
- Only row 1 may say YES. Rows 2–3 are short phrases.
- Never write「だれが」.
- Character labels MUST be:
  Left:「会社（事実を対抗したい）」
  Right:「第三者（正当事由で知らなかった）」

Title:「商業登記 — 登記後でも例外あり（無敵ではない）」
Small chip top-right:「『常に』がひっかけ」
Tiny note under title OK:「会社の登記事項は会社法908条も同趣旨」

Center metaphor (ONE): a registry-book SHIELD covering the company; a hole in the shield
labeled「正当事由」. Through the hole, a third party who could not see the registry
(disaster / office closed). Do not draw a second metaphor (no scales, no racetrack).

Left 論点 (no GO):
1. 登記後は原則対抗できる？ → YES（商法9条）
2. 正当事由ある第三者は？ → 対抗できない（商法9条）
3. 正当事由の例は → 災害などで知り得ないとき

Right ひっかけ (注意 stamps OK, not the legal rule as green GO):
- 「常に／どんな第三者にも」対抗できる
- 単なる不注意＝正当事由
- 対抗力と効力発生を混ぜる（社内では登記前でも効力が立つことがある）

Bottom (exact Japanese):
- 判断軸:「登記後でも、正当事由で知らなかった第三者には対抗不可（商法9条）」
- ひっかけ:「『常に』に釣られるな。不注意は正当事由ではない」
- 暗記:「登記＝無敵ではない。正当事由例外」
Answer capsule:
「登記後は原則対抗できるが、正当な事由で知らなかった第三者には対抗できない。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, wooden 指し棒 pointing at 暗記.
Match chachalot.png. Not a scene character. No nameplate.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses, not a bear/owl/cat).

Legal accuracy: ONLY 商法9条 two-step (before registry vs after + 正当事由 exception).
Do NOT teach 商号譲渡の対抗要件, 不実登記, or "malicious third parties" as the main story.
Avoid mock-exam copy, watermarks, filenames, English UI chrome except optional one stamp.
Do NOT generate other questions' images.
```

## 目視チェック（生成後・必須）

- [ ] フクロウがいない。帽子が耳／動物になっていない
- [ ] 左見出しが「論点」、右が「ひっかけ」
- [ ] 論点に GO／STOP がない。YES は1行目だけ
- [ ] 「常に対抗できる」が正しいルールとして緑GOになっていない
- [ ] 商法9条（または会社法908条）が本文行にもある
- [ ] 底部3カードと答え帯が読める。文字の重なりなし
- [ ] 法律: 登記後＋正当事由例外が矛盾していない

誤情報があれば生成を止め、てらしぃへ報告。勝手に商法の結論を変えない。

## Codex 完了時の報告

- Purpose / Placement / 生成ファイルパス
- Alt summary（1文）
- 目視結果（レイアウト＋ちゃちゃロット identity＋法律）
- Cursor 引き継ぎ: `touki-1.png` を商法教科書の必殺解説の下へ。`node scripts/generateDeepdiveImages.js`。X予約はてらしぃ目視OK後

## てらしぃ確認事項

型（シールドの穴メタファー、文字密度）がOKなら、次の10問バッチに進む。NGなら1問に戻してプロンプトを直す。

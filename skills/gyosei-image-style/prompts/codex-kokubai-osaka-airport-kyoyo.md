# Codex用・国賠2条 大阪空港・供用関連瑕疵

てらしぃ指示: **画像生成プロンプト**（まず1枚）。供用関連瑕疵の芯だけ。

- 対象: 最大判昭56.12.16（大阪国際空港）／国賠法2条1項の**供用関連瑕疵**
- 配置予定（生成後・Cursor）:
  - 見て聞いて覚える「国家賠償法」大阪空港カードのもっと深掘る
  - キー案: `gyouseihou/kokubai/kokubai-osaka-kyoyo-kashi`
- 保存先: `assets/images/deepdive/gyouseihou/kokubai/kokubai-osaka-kyoyo-kashi.png`
- 前提（生成前に必ず開く）:
  - `skills/gyosei-image-style/SKILL.md`
  - `skills/gyosei-image-style/references/visual-guidelines.md`
  - `skills/gyosei-image-style/references/avatar-guidelines.md`
  - レイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
  - 案内役正本: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `assets/images/characters/chachalot.png`
  - 見出し見本: `skills/gyosei-kijutsu-textbook/prompts/codex-q1-126-ronten.md`
- **禁止**: フクロウ・猫・熊・犬。模試・予備校の全文転載。差止め／統治行為／将来請求の手続論を本図の主役にしない。アプリ埋め込み・マップ再生成は Cursor へ
- 範囲: **この1枚の画像生成まで**（埋め込みは Cursor）

## 法律の芯（崩すな）

国家賠償法2条1項／最大判昭56.12.16

1. 瑕疵＝営造物が通常有すべき安全性を欠くこと（過失不要）
2. 物的・外形的欠陥**だけではない**
3. **供用目的に沿った利用との関連**で危害を生む危険も含む（騒音等）＝**供用関連瑕疵**
4. 危害は利用者だけでなく**周辺住民（第三者）**も含む
5. 利用が一定限度を超え危険なのに特段の措置・制限なく供用し、現実に危害→予測不能でない限り免責できない

混ぜない: 航空事業免許の取消しと原告適格（別判例棚）。夜間飛行差止めの統治行為論は本図では扱わない（国賠2条の瑕疵概念だけ）。

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| 見本参照 | 主宰者許可図／ちゃちゃロット承認PNG |
| タイトル対比 | 供用関連瑕疵 — 壊れてなくても瑕疵になりうる |
| 左右の意味 | 緑＝論点（Q&A）／橙＝ひっかけ |
| 各行＋条文 | Q&A＋（国賠2条1項） |
| 役割ラベル | 周辺住民（静かな生活を守りたい）／空港管理者（供用を続ける） |
| 中央メタファー | 空港＋騒音の波が家へ。施設は壊れていないが「供用」の矢印が危険 |
| 判断軸 | 物的欠陥だけでなく、供用態様の危険も2条の瑕疵（国賠2条1項） |
| ひっかけ | 「壊れてない＝瑕疵×」「利用者だけが被害者」「物的欠陥だけが瑕疵」 |
| 暗記 | 大阪空港＝供用関連瑕疵。うるさい使い方も瑕疵になりうる |
| 案内役 | ちゃちゃロット。下余白・指し棒・暗記を指す |
| 配置先 | gyouseihou/kokubai/kokubai-osaka-kyoyo-kashi |

## 論点Q&A（GOなし）

- 施設が壊れていなくても瑕疵？ → YES（供用関連）
- 被害者は利用者だけ？ → 周辺住民も含む
- 根拠条文は → 国賠2条1項

論点に GO／STOP バッジを置かない。YES は1行目だけ。

## 役割

- 左寄り中央: **周辺住民（静かな生活を守りたい）**
- 右寄り中央: **空港管理者（供用を続ける）**
- 中央物: **空港（外見は正常）＋騒音の波**

## GPT Image プロンプト（このまま生成）

画像参照として必ず渡す:

1. `approved-shusaisha-kyoka.png`（レイアウト密度のみ。フクロウはコピーしない）
2. `approved-smiling-hat-mascot.png` および `chachalot.png`（案内役 identity）

```text
Create a NEW Japanese legal-study infographic from scratch.
Topic: 国家賠償法2条 — 大阪空港の供用関連瑕疵（最大判昭56.12.16）.
Learning goal: After one glance, the learner knows 瑕疵 is NOT only a broken facility;
供用の仕方（騒音等）で第三者に危害を生む危険も2条の瑕疵になりうる.

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
  Left:「周辺住民（静かな生活を守りたい）」
  Right:「空港管理者（供用を続ける）」

Title:「供用関連瑕疵 — 壊れてなくても瑕疵になりうる」
Small chip top-right:「大阪空港・最大判昭56.12.16」
Tiny note under title OK:「国賠法2条1項」

Center metaphor (ONE): an airport building that looks intact (no cracks), with a jet;
visible SOUND WAVES / noise rings travel from the runway to nearby houses.
A short arrow labeled「供用」 connects airport use to the waves.
Do NOT draw a second metaphor (no scales, no courtroom, no injunction gavel).

Left 論点 (no GO):
1. 施設が壊れていなくても瑕疵？ → YES（供用関連）
2. 被害者は利用者だけ？ → 周辺住民も含む
3. 根拠は → 国賠2条1項

Right ひっかけ (注意 stamps OK, not the legal rule as green GO):
- 「壊れていない＝瑕疵なし」
- 物的・外形的欠陥だけが瑕疵
- 利用者だけが被害者（第三者は対象外）

Bottom (exact Japanese):
- 判断軸:「物的欠陥だけでなく、供用態様の危険も2条の瑕疵（国賠2条1項）」
- ひっかけ:「壊れてないからセーフ、に釣られるな」
- 暗記:「大阪空港＝供用関連瑕疵。うるさい使い方も瑕疵になりうる」
Answer capsule:
「施設が壊れなくても、供用の仕方で第三者に危害を生む危険があれば2条の瑕疵になりうる。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, wooden 指し棒 pointing at 暗記.
Match chachalot.png. Not a scene character. No nameplate.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses, not a bear/owl/cat).

Legal accuracy: ONLY 供用関連瑕疵 (物的欠陥＋供用態様／周辺住民も対象／国賠2条1項).
Do NOT teach 差止め・統治行為・航空事業免許の原告適格 as the main story.
Avoid mock-exam copy, watermarks, filenames, English UI chrome except optional one stamp.
Do NOT generate other questions' images.
```

## 目視チェック（生成後・必須）

- [ ] フクロウがいない。帽子が耳／動物になっていない
- [ ] 左見出しが「論点」、右が「ひっかけ」
- [ ] 論点に GO／STOP がない。YES は1行目だけ
- [ ] 「壊れてない＝瑕疵なし」が正しいルールとして緑GOになっていない
- [ ] 国賠2条1項／供用関連瑕疵が本文に見える
- [ ] 差止め・免許取消しを主役にしていない
- [ ] ちゃちゃロットは下余白のみ

## Cursor 引き継ぎ（生成後）

1. PNG を `assets/images/deepdive/gyouseihou/kokubai/kokubai-osaka-kyoyo-kashi.png` に保存
2. `node scripts/generateDeepdiveImages.js`（または既存の deepdive マップ再生成）
3. `src/kokubai_learn_content.js` の大阪空港カード deepdive 先頭に `[[image:gyouseihou/kokubai/kokubai-osaka-kyoyo-kashi]]`
4. 見て聞いて覚える → 国家賠償法 → 大阪空港 → もっと深掘る で表示確認

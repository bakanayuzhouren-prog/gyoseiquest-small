# Codex用 — 家が壊れた（危険負担・借家・窓割り）

てらしぃがこのファイルを Codex に渡す。Cursor は画像を作らない。

保存先（生成後）: `assets/images/deepdive/minpou-joshiki/ie-ga-kowareta.png`  
参照: レイアウト＝`approved-shusaisha-kyoka.png`／案内役＝`chachalot.png` ＋ `approved-smiling-hat-mascot.png`  
正本: `data/knowledge/canonical/minpou-joshiki/01`〜`03` と `compare-ie-kowareta.md`

## 法律（守る）

- 引渡前・双方無過失の売買 → 買主は代金を**拒める**（536条1項）。旧534条の債権者主義は廃止。図で「今も買主が払え」と書かない。
- 引渡後・受領遅滞は買主がかぶる（567条）。今回の主戦場は引渡前。ひっかけ側に小さく置く。
- 借家が全部使えなくなったら**当然終了**（616条の2）。家賃は払わない。穴は損害賠償。
- 窓割りは民法上**正当防衛（720条1項）**。家主は暴漢へ。図に「緊急避難が成立」と結論を書かない（日常語のサブタイトルなら可）。

## 禁止

- GO と YES を論点パネルに混在させない
- 「だれが」「問が聞くこと」「（聞かない）」禁止
- ちゃちゃロットを中央の登場人物にしない

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 家が壊れた — 払う人 / 払わない人 |
| 左右 | 緑＝論点 Q&A／橙＝ひっかけ |
| 中央メタファー | 壊れた家と3つの矢印（売主が泣く／家賃ストップ／暴漢へ） |
| 判断軸 | かわいそうな人に損を残すな。まだ支配している人か、原因を作った人へ。 |
| ひっかけ | 旧法の債権者主義／家賃は期間中ずっと／襲われた人に請求／民法でも緊急避難 |
| 暗記 | 渡す前は売主。借家全焼は終了。窓は暴漢へ。 |
| 配置 | minpou-joshiki/ie-ga-kowareta.png |

## 役割

- 左: **買主（まだ家を受け取っていない）**
- 中: **賃借人（住めなくなった）**
- 右: **家の所有者（窓を直したい）** ※請求先は暴漢

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
16:9 warm off-white, navy title, left green / right orange, center one metaphor, bottom 判断軸 / ひっかけ / 暗記, answer capsule. Large Japanese, no overlap.

Match LAYOUT of approved sample「主宰者の許可」: color panels, center scene, three bottom cards.
Guide: ちゃちゃロット (Chachalot). SMALL bottom-right owl slot only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses, not a bear/owl/cat).

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点: Q&A only. NO GO/STOP badges. Do not mix GO and YES.
- Never write「だれが」.

Title:「家が壊れた — 払う人 / 払わない人」
Chip:「旧法の債権者主義は廃止」

Center metaphor: one broken house. Three short labeled arrows, not a dense table:
1. 売買・引渡前 → 売主が危険（536条）
2. 借家が全焼 → 契約終了・家賃なし（616条の2）
3. 窓を割って逃げた → 家主は暴漢へ（720条1項）

Character labels under figures:
「買主（まだ受け取っていない）」
「賃借人（住めなくなった）」
「所有者（暴漢に請求したい）」

Left 論点 (short answers, not GO):
1. 引渡前に家が滅失。代金は？ → 払わなくてよい（536条）
2. 借家が全部燃えた。家賃は？ → 払わない。契約は終了（616条の2）
3. 窓を割った人に請求？ → NO。暴漢へ（720条1項）

Right ひっかけ (注意 stamps OK):
- 今も債権者主義で買主が払え
- 引渡前なのに567条
- 家賃は残期間ずっと
- 襲われた人に弁償
- 民法でも緊急避難が成立（正は正当防衛）

Bottom:
- 判断軸:「かわいそうな人に損を残すな。支配している人か、原因を作った人へ」
- ひっかけ:「旧534条・家賃継続・割った人へ請求・緊急避難ラベル」
- 暗記:「渡す前は売主／借家全焼は終了／窓は暴漢へ」
Answer capsule:
「損はかわいそうな人に残さない。売買は売主、借家は終了、窓は暴漢。」

Avoid: tiny text, mock-exam copy, watermarks, filenames, mixing GO+YES, owl/cat/bear mascot.
```

# Codex用 — 保証人指名と認知の遡及

てらしぃがこのファイルを Codex に渡す。Cursor は画像を作らない。

保存先（生成後）: `assets/images/deepdive/minpou-joshiki/hoshonin-ninchi.png`  
参照: レイアウト＝`approved-shusaisha-kyoka.png`／案内役＝`chachalot.png` ＋ `approved-smiling-hat-mascot.png`  
正本: `data/knowledge/canonical/minpou-joshiki/04`・`05` と `compare-hoshonin-ninchi.md`

## 法律（守る）

- 債権者が保証人を指名 → 450条1項・2項は**適用しない**。資力も行為能力も、450条上は問わない。資力喪失後の交代請求も不可。
- 図に「指名しても行為能力は必ず要る」「指名後に資力がなくなったら交代できる」と書かない。
- 認知は**出生の時に遡る**（784条）。空白期間を作らない。ただし書（第三者既得権）はひっかけ側。
- 5条の取消しは別問題、とひっかけに1行。論点の結論は450条。

## 禁止

- GO と YES を論点に混在させない
- 「だれが」「問が聞くこと」「（聞かない）」禁止

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 空白を作るな — 指名と認知 |
| 中央メタファー | 左＝自分が選んだ保証人カード／右＝出生から続く親子の線 |
| 判断軸 | 自分で選んだ欠点を後から問うな。子に親なし期間を作るな。 |
| ひっかけ | 指名後も交代可／行為能力は常に要る／認知した日から子 |
| 暗記 | 指名なら450条は問わない。認知は出生時まで遡る。 |
| 配置 | minpou-joshiki/hoshonin-ninchi.png |

## 役割

- 左: **債権者（保証人を自分で指名した）**
- 右: **父（認知した）**
- 子のラベル: **子（空白期間は要らない）**

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
16:9 warm off-white, navy title, left green / right orange, center one split metaphor, bottom 判断軸 / ひっかけ / 暗記, answer capsule. Large Japanese, no overlap.

Match LAYOUT of approved sample「主宰者の許可」.
Guide: ちゃちゃロット (Chachalot). SMALL bottom-right owl slot only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses, not a bear/owl/cat).

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点: Q&A only. NO GO/STOP. Do not mix GO and YES.
- Never write「だれが」.

Title:「空白を作るな — 指名と認知」
Chip:「450条3項 / 784条」

Center metaphor: two scenes side by side, one story each.
Left: creditor pointing at a guarantor card he himself picked. Label「債権者（自分で指名した）」.
Right: a parent-child timeline from 出生 to 認知 with no gap. Labels「父（認知した）」「子（空白は要らない）」.

Left 論点:
1. 債権者が保証人を指名。資力は？ → 関係ない（450条3項）
2. 行為能力は？ → 450条では問わない（3項）
3. 認知はいつから子？ → 出生の時から（784条）
4. 親なき空白は要る？ → NO

Right ひっかけ (注意 stamps OK):
- 指名後に資力が落ちたら交代できる
- 指名しても行為能力者でなければならない
- 認知した日から初めて子
- 遡及するから第三者の既得権も全部無効
- 450条と未成年者の取消し（5条）を混ぜる

Bottom:
- 判断軸:「自分で選んだ欠点を後から問うな。子に親なし期間を作るな」
- ひっかけ:「交代できる／能力は要る／認知した日から子」
- 暗記:「指名なら450は問わない。認知は出生時まで遡る」
Answer capsule:
「自分で指名した保証人の資力・能力は後から問えない。認知は出生時まで遡り、空白は作らない。」

Avoid: tiny text, mock-exam copy, watermarks, filenames, mixing GO+YES, owl/cat/bear mascot.
```

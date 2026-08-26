# Codex用 — 嫡出推定と再婚禁止（無戸籍をなくす）

てらしぃがこのファイルを Codex に渡す。Cursor は画像を作らない。

保存先（生成後）: `assets/images/deepdive/minpou-joshiki/chakushutsu.png`  
参照: レイアウト＝`approved-shusaisha-kyoka.png`／案内役＝`chachalot.png` ＋ `approved-smiling-hat-mascot.png`  
正本: `data/knowledge/canonical/minpou-joshiki/08-chakushutsu-suitei.md`

## 法律（守る）

- 最大判平27.12.16: **100日を超える部分**が違憲。6ヶ月全部違憲と書かない。趣旨（重複回避）は合理的。
- 現行: **733条削除**。再婚禁止期間はない。
- 再婚後に生まれた子は、前婚解消から300日以内でも **直近の婚姻の夫**（772条3項）。
- 774条: 父または子。母も可。図に「今も夫だけ」と書かない。
- **200日が条文から消えたと書かない。** 772条2項に懐胎時期の推定として残る。消えたのは「200日経たないと現夫の子にならない」旧効果（1項後段で婚姻後出生は現夫）。
- 成立は令和4年12月10日。施行は令和6年4月1日。図に「2026年改正」と書かない。

## 禁止

- GO と YES 混在禁止
- 「だれが」「問が聞くこと」「（聞かない）」禁止
- くま化しない

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 嫡出推定 — 前の夫 / いまの夫 |
| 中央メタファー | 戸籍の窓口。母が届を出せる。旧の「待たされる100日」看板に× |
| 判断軸 | 重複回避は100日で足りた。無戸籍をなくすなら再婚後は新夫。否認は母・子も。 |
| ひっかけ | 6ヶ月全部違憲／いまも100日禁止／200日条文消滅／否認は夫だけ |
| 暗記 | 100日超が違憲。再婚禁止なし。再婚後の子は新夫。否認は父・子・母。 |
| 配置 | minpou-joshiki/chakushutsu.png |

## 役割

- 左: **母（出生届を出したい）**
- 右: **子（戸籍が欲しい）**

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
16:9 warm off-white, navy title, left green / right orange, center one metaphor, bottom 判断軸 / ひっかけ / 暗記, answer capsule. Large Japanese, no overlap.

Match LAYOUT of approved sample「主宰者の許可」.
Guide: ちゃちゃロット (Chachalot). SMALL bottom-right owl slot only, wooden 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate.
(pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses, not a bear/owl/cat).

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点: Q&A only. NO GO/STOP. Do not mix GO and YES.
- Never write「だれが」.
- Do not write「200日ルール削除」as if 772条2項 vanished. Do not write the amendment year as 2026.

Title:「嫡出推定 — 前の夫 / いまの夫」
Chip:「733条削除 / 令6.4.1施行」

Center: family registry desk. Mother submitting birth form. Child with a koseki booklet. A crossed-out sign「再婚禁止100日」. Small timeline: 6ヶ月 → 違憲100日超 → 100日 → 廃止.
Labels:
「母（出生届を出したい）」
「子（戸籍が欲しい）」

Left 論点:
1. 旧6ヶ月のうち違憲は？ → 100日を超える部分（平27）
2. いま再婚禁止は？ → なし（733条削除）
3. 再婚後に生まれた子は？ → いまの夫（772条3項）
4. 嫡出否認できるのは？ → 父・子・母（774条）

Right ひっかけ:
- 6ヶ月全部が違憲
- いまも女性は100日待て
- 200日の文言が条文から消えた
- 否認は今も夫だけ
- 再婚しなくても300日以内は当然に新パートナーの子

Bottom:
- 判断軸:「重複回避は100日で足りた。無戸籍をなくすなら再婚後は新夫。届を出して否認できる」
- ひっかけ:「全部違憲／まだ100日／200日消滅／夫だけの否認」
- 暗記:「100日超が違憲。再婚禁止なし。再婚後の子は新夫。否認は父・子・母」
Answer capsule:
「再婚後に生まれた子は、前婚解消から300日以内でも、現在の夫の子と推定する。」

Avoid: tiny text, mock-exam copy, watermarks, filenames, mixing GO+YES, owl/cat/bear mascot.
```

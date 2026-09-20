# Codex用 — 不可分債権と連帯債権の絶対効／利益の分与

表主役。教材の表は転載しない。結論は民法428・429・432〜435条の2。

- 保存先: `assets/images/deepdive/learn/minnpou/rentai-saiken-zettaiko.png`
- 画像キー: `learn/minnpou/rentai-saiken-zettaiko`
- 生成は Codex。Cursor は描かない。

## 法律の芯（崩すな）

- 不可分債権（428条）: 連帯債権の規定を準用する。ただし**433条と435条は準用しない**。更改・免除は429条。
- 連帯債権（432条）: 性質上可分。各債権者は全員のために全部又は一部を請求できる。債務者は各債権者に履行できる。
- 履行（弁済・代物弁済）: どちらも他の債権者にも効く（全員のために受領・弁済）。
- 相殺（434条。不可分は準用）: 債務者が一人に対する債権で相殺を援用したときは、他の債権者にも効く。
- 請求（432条。不可分は準用）: 一人の請求は全員のための全部請求として効く。
- 混同: **連帯は絶対効**（435条。弁済したとみなす）。**不可分は435条を準用しないので絶対効なし**。
- 更改・免除: **不可分は絶対効なし（×）**（429条。他の債権者はなお全部を請求できる。更改等をした者は、分与されるべき利益を債務者に償還する）。**連帯は△**（433条。分与されるべき利益の部分だけ他の債権者は請求できない。全額消滅ではない）。
- 相対的効力の原則（435条の2。不可分にも準用）: 432条から435条までに定める場合を除き、一人の行為・事由は他に及ばない。ただし、他の連帯債権者の一人及び債務者が別段の意思を表示したときは、その意思に従う。
- 内部関係: **分配の条文はない。** 通説は、履行を受けた債権者は他の債権者に利益を分与する。分与の割合は、別段の定めがなければ平等。433条の「分与されるべき利益」がこの内側の取り分。連帯債務の負担部分・求償と向きを混ぜない。

**書かない:** 伊藤塾。教材表の文言のコピー。免除でも連帯は全額が消える。不可分の混同も絶対効。内部関係が何条かある、と書く。あぷし。Gyosei Quest。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 免除・更改は不可分×／連帯△ |
| 中央メタファー | 事由ごとの絶対効表（行ゼブラ） |
| 判断軸 | 可分か不可分か。免除・更改は連帯だけ利益分 |
| ひっかけ | 不可分と連帯を同じ表で全部○。混同も不可分に絶対効。免除で連帯の全額が消える |
| 暗記 | 免除・更改は不可分×、連帯△。内側は分与 |
| 役割 | 履行を受けた債権者（利益を分与する）／他の債権者（取り分を受ける）／誤った主張をする側（免除で全額が消えるとする） |

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート（pitchi_sheet.png / task_turtle_sheet.png / kachadokuro_sheet.png / subeton_sheet.pngのうち使うもの）を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
Topic: 不可分債権と連帯債権。絶対効の違いと、内側の利益の分与.
Learning goal: 履行・相殺・請求は両方○。混同は連帯だけ○。更改・免除は不可分×、連帯は分与利益の部分だけ.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of the approved「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

STRICT: Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP badges on 論点.
Left heading「論点」. Right heading「ひっかけ」.

Title:「免除・更改は不可分×。連帯は△」
Chip:「428条・429条・432条から435条の2。内側の分与に条文なし」

Left 論点 Q&A ONLY:
1. 履行・相殺・請求は？ → どちらも他の債権者に及ぶ
2. 混同は？ → 連帯だけ弁済とみなす（435条）。不可分は準用しない
3. 更改・免除の絶対効は？ → 不可分は×。連帯は△（分与利益の部分のみ）
4. 受け取った人は？ → 他の債権者に利益を分与する（通説。別段なければ平等）

Right ひっかけ ONLY:
不可分と連帯は絶対効が同じ
不可分の混同も絶対効
連帯の免除で全額が消える
利益の分配が何条かに書いてある
負担部分と利益を同じ向きにする

Center ONLY: one table. Header navy. Row zebra: 1st data row white, 2nd light gray, then white / gray. NOT column colors.
Columns: 事由 | 不可分債権 | 連帯債権
Rows:
履行（弁済・代物弁済） | ○ | ○
相殺（434条） | ○ | ○
請求（432条） | ○ | ○
混同（435条） | × | ○
免除 | × | △
更改 | × | △
Do not write ○ for 不可分の免除 or 不可分の更改.
Caption:「○＝他の債権者にも及ぶ。×＝及ばない。△＝分与されるべき利益の部分のみ。不可分の更改・免除は×なので、他の債権者はなお全部を請求できる（429条）。償還は別問題」

Scene cast SMALL, do not cover table:
- Good role, left: ぴっちゅ. Match assets/images/characters/pitchi.png and ポーズシート assets/images/characters/pitchi_sheet.png. Label「履行を受けた債権者（利益を分与する）」
- Good role, right of table: タスク亀. Match assets/images/characters/task_turtle.png and ポーズシート assets/images/characters/task_turtle_sheet.png. Label「他の債権者（取り分を受ける）」
- Bad role, far right: カチャドクロ. Match assets/images/characters/kachadokuro.png and ポーズシート assets/images/characters/kachadokuro_sheet.png. Label「誤った主張をする側（免除で全額が消えるとする）」
Do not swap these roles. No owl, bear, cat, raccoon.

Bottom:
- 判断軸:「可分か不可分か。免除・更改は不可分×、連帯△」
- ひっかけ:「不可分と連帯を同じにする。混同を不可分にも絶対効。免除で連帯の全額が消える」
- 暗記:「免除・更改は不可分×、連帯△。内側は分与」
Answer:「免除・更改の絶対効は、不可分債権では生じない。連帯債権では、分与されるべき利益に係る部分についてのみ、他の債権者は履行を請求することができない。」

Guide: ちゃちゃロット SMALL bottom-right margin only, wooden 指し棒 pointing at 暗記. Match assets/images/characters/chachalot.png, skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png, and 全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body only. No nameplate. Not a scene character. Do not stand on the answer bar.
No brand letters anywhere. No overlapping text. Large gothic Japanese. Do not copy any prep-school page.
```

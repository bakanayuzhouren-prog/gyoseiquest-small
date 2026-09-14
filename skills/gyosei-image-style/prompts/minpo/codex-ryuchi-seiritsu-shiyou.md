# 留置権｜成立と使用制限

てらしぃ依頼: LEC市販2 問30の2カードを1図にする。
**生成はてらしぃが Codex に「画像生成して」と言うまでしない。** Cursor は描かない。

見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 保存先: `assets/images/deepdive/learn/minpo/ryuchi-seiritsu-shiyou.png`
配置: 見て聞いて覚える・民法物権「留置権は、他人の物を占有し…」と「留置権者は、債務者の承諾がなければ…」の先頭。

## スロット（新キャラはここだけ差し替え）

| スロット | 陣営 | 法律上の役割 | いまのキャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内役（暗記を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |
| 留置権者 | いい役 | 正当な留置権者（弁済まで留置する） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` |
| 無断使用 | 悪い役 | 保存に必要もないのに承諾なく使う者 | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` |
| 時効ひっかけ | 悪い役 | 行使すれば時効が止まると主張する者 | すべとん | `subeton_sheet.png` |

## 法律（原典・e-Gov）

- 295条: 他人の物の占有者は、その物に関して生じた債権の弁済を受けるまで、その物を留置できる。占有が不法行為によって始まったとき、または弁済期が到来していないときは成立しない。
- 296条: 不可分。債権の全部の弁済を受けるまで、留置物の全部について権利を行使できる。
- 297条: 果実を収取し、他の債権者に先立って自己の債権の弁済に充当できる。
- 298条1項: 留置権者は、善良な管理者の注意をもって、留置物を占有しなければならない。
- 298条2項本文: 債務者の承諾を得なければ、留置物を使用し、賃貸し、又は担保に供することができない。
- 298条2項ただし書: その物の保存に必要な使用をすることは、この限りでない。
- 298条3項: 留置権者が前二項の規定に違反したときは、債務者は、留置権の消滅を請求することができる。
- 300条: 留置権の行使は、その担保する債権の消滅時効の進行を妨げない。
- 301条: 債務者は相当の担保を供して留置権の消滅を請求できる。

図に出す表:

| 論点 | 結論 |
|---|---|
| 不法行為による占有開始 | 成立しない（295条） |
| 弁済期未到来 | 成立しない（295条） |
| 行使と消滅時効 | 時効は止まらない（300条） |
| 善管注意義務 | 留置物を保管する（298条1項） |
| 使用・賃貸・担保 | 承諾が要る。保存に必要な使用は可（298条2項） |
| 1項・2項違反 | 債務者は消滅を請求できる（298条3項） |

## PRE-GENERATE-CHECK

- 左パネル＝成立・不可分・時効。右パネル＝使用・果実・消滅請求。左に承諾・果実を書かない。
- 298条の項を取り違えない。1項＝善管注意。2項本文＝使用等の承諾。2項ただし書＝保存に必要な使用。3項＝違反時の消滅請求。
- 表の使用行は「298条2項」。消滅請求は「298条3項」。承諾なく一切使用できない、と書かない。
- 暗記帯は「295成立。296不可分。297果実。298条1項は善管注意、2項は承諾（保存に必要な使用は可）、3項は消滅請求。300時効止まらず。301相当の担保で消滅請求」。
- GPT本文で「時効は止まる」「不法行為占有でも成立」を正しい結論として書かない。
- 口語なし。スロットどおり。ちゃちゃロット1体。表は行ゼブラ。```text``` にブランド名なし。

判定: このプロンプト範囲では全部通す。生成はてらしぃ指示まで行わない。

## GPT Image プロンプト

画像参照: `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` ＋ `task_turtle.png` ＋ `task_turtle_sheet.png` ＋ `kachadokuro.png` ＋ `kachadokuro_sheet.png` ＋ `subeton_sheet.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape, high resolution, one sheet.
Navy and white base. Bold Japanese gothic. Wide padding. Thin rules. Soft shadow.
Left panel cool blue. Right panel warm amber. Center scene cream.
No brand names. No publisher names. No exam paper copy. No English.

Title, navy, centered:「留置権｜成立と使用制限」

LEFT panel, heading:「論点（成立）」
Do not mention 承諾 or 果実 in this panel.
Role under a small face: 正当な留置権者（弁済まで留置する）
Match タスク亀: task_turtle.png and task_turtle_sheet.png. Good side.
Q&A only:
成立する？ → 物に関する債権＋占有（295条）
不法行為で占有開始は？ → NO
弁済期未到来は？ → NO
一部弁済で全部を留置できる？ → YES（296条・不可分）
行使で時効は止まる？ → NO（300条）

RIGHT panel, heading:「論点（使用）」
Do not mention 不法行為占有 in this panel.
Role under a small face: 保存に必要もないのに承諾なく使う者
Match カチャドクロ: kachadokuro.png and kachadokuro_sheet.png. Bad side.
Q&A only:
善管注意義務は？ → YES（298条1項）
使用・賃貸・担保に承諾は？ → 要る（298条2項本文）
保存に必要な使用は？ → 承諾なくしてよい（298条2項ただし書）
1項・2項に違反したら？ → 債務者は消滅を請求できる（298条3項）
相当の担保を供したら？ → 消滅を請求できる（301条）
果実は？ → 収取して優先充当できる（297条）

CENTER: one object labeled 留置物
タスク亀 holds the object. Good side.
カチャドクロ tries to use the object without consent and without preservation need. Bad side.
すべとん near a small stamp「時効が止まる」with a red ×. Match subeton_sheet.png. Bad side. Role: 行使すれば時効が止まると主張する者
Caption:「物に関する債権と占有。298条1項は善管注意。2項は承諾（保存に必要な使用は可）。3項は消滅請求。時効は止まらない」

SMALL TABLE under the caption, navy header, 6 data rows. Zebra by ROW: white / light gray alternate. Never column zebra.
列: 論点｜結論
行1: 不法行為による占有開始｜成立しない（295条）
行2: 弁済期未到来｜成立しない（295条）
行3: 行使と消滅時効｜時効は止まらない（300条）
行4: 善管注意義務｜留置物を保管する（298条1項）
行5: 使用・賃貸・担保｜承諾が要る。保存に必要な使用は可（298条2項）
行6: 1項・2項違反｜債務者は消滅を請求できる（298条3項）

BOTTOM strip, three cards:
判断軸「成立＝物に関する債権と占有。不可分。298条1項は善管注意。2項は承諾（保存に必要な使用は可）。3項は消滅請求。時効は止まらない」
ひっかけ「不法行為占有でも成立／時効は止まる／承諾なく何でも使える／保存に必要な使用も常に不可／1項を使用制限と読む／果実は収取できない」
暗記「295成立。296不可分。297果実。298条1項は善管注意、2項は承諾（保存に必要な使用は可）、3項は消滅請求。300時効止まらず。301相当の担保で消滅請求」

Guide: ちゃちゃロット, ONE only, SMALL in the bottom margin.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer.
Independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover panels, arrows, table, or the memory line. No nameplate.

Exact on-image Japanese only as specified. No extra captions.
```

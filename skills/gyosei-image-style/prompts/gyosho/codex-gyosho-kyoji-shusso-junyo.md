# Codex用 — 行訴法 出訴期間の教示と14条の準用（聞き分け）

表主役。1枚。教材転載なし。結論は行政事件訴訟法14条・40条・43条1項・46条。

- 保存先: `assets/images/deepdive/gyosho/kyoji-shusso-junyo.png`
- 画像キー: `gyosho/kyoji-shusso-junyo`
- 生成は Codex。Cursor は描かない。
- 既存の `kyoji-hikaku.png`（行審法82条 vs 行訴法46条）は上書きしない。

## 法律の芯（崩すな）

**出訴期間の教示（46条）は本則。準用条文ではない。**

| 条 | 何をするか |
|---|---|
| **46条1項** | 取消訴訟を提起できる処分又は裁決をするとき。相手方に、被告とすべき者、**出訴期間**、前置があるときはその旨を**書面**で教示しなければならない。口頭で処分するときはこの限りでない |
| **46条2項** | 裁決に対してのみ取消訴訟を提起できる定めがあるとき。処分をするときに、**その定めがある旨**を書面で教示。出訴期間そのものではない |
| **46条3項** | 形式的当事者訴訟（当事者間の法律関係を確認し又は形成する処分又は裁決に関する訴訟で、法令によりその法律関係の当事者の一方を被告とするもの）を提起できる処分又は裁決をするとき。相手方に、被告とすべき者、**出訴期間**を書面で教示。口頭処分は例外。これは準用ではなく**46条自身の本則** |

46条に4項はない。38条も41条も46条を準用しない。46条は第5章補則。

**出訴期間そのもの（14条）が準用される先（教示とは別棚）**

| 訴訟 | 14条（知った日から6箇月／日から1年） | 46条の出訴期間教示 |
|---|---|---|
| 取消訴訟 | 本則 | 本則（1項） |
| 形式的当事者訴訟 | **準用しない**。法令に出訴期間の定め（40条1項）。正当な理由があれば期間後も可。15条のみ準用（40条2項） | 本則（3項） |
| **民衆訴訟・機関訴訟で処分又は裁決の取消しを求めるもの** | **準用する**（43条1項。9条及び10条1項を除き取消訴訟に関する規定） | **準用しない**。46条は補則。43条の「取消訴訟に関する規定」は第2章第1節 |
| 無効等確認・不作為の違法確認・義務付け・差止め | 14条は38条1項の準用リストにない | なし |
| 民衆・機関で取消・無効以外 | 40条1項は43条3項で除外 | なし |

条件フレーズはフルで載せる:
- 43条1項: 民衆訴訟又は機関訴訟で、処分又は裁決の取消しを求めるものについては、第九条及び第十条第一項の規定を除き、取消訴訟に関する規定を準用する。

**書かない:** 民衆訴訟にも46条教示が準用される。義務付けにも出訴期間の教示がある。形式的当事者に14条が準用される。あぷし。Gyosei Quest。行服法。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 教示は46条／14条の準用は43条1項 |
| 中央メタファー | 訴訟類型×教示／14条の表（行ゼブラ） |
| 判断軸 | 教示か、出訴期間そのものか |
| ひっかけ | 民衆・機関にも46条が準用。形式的当事者に14条準用。義務付けにも教示 |
| 暗記 | 教示は取消と形式的当事者。14条が乗るのは民衆・機関の取消型 |
| 役割 | 行政庁（教示する）／相手方（出訴期間の案内を受ける）／誤った主張をする側（民衆訴訟にも46条が準用されるとする） |

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート（pitchi_sheet.png / task_turtle_sheet.png / kachadokuro_sheet.png / subeton_sheet.pngのうち使うもの）を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
Topic: 行政事件訴訟法。出訴期間の教示（46条）と、出訴期間そのもの（14条）の準用先.
Learning goal: 教示は取消訴訟と形式的当事者訴訟だけ。準用されるのは14条で、先は民衆訴訟・機関訴訟のうち取消しを求めるもの（43条1項）.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of the approved「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

STRICT: Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP badges on 論点.
Left heading「論点」. Right heading「ひっかけ」.

Title:「教示は46条。14条の準用は43条1項」
Chip:「教示と出訴期間を混ぜない」

Left 論点 Q&A ONLY:
1. 出訴期間を教示する本則は？ → 取消訴訟と形式的当事者訴訟（46条1項・3項）
2. 46条は他の訴訟に準用されるか？ → NO
3. 14条が準用される先は？ → 民衆訴訟・機関訴訟で取消しを求めるもの
4. 形式的当事者に14条は準用されるか？ → NO（40条。法令の期間）

Right ひっかけ ONLY:
民衆訴訟にも46条の教示が準用される
形式的当事者に14条が準用される
義務付け・差止めにも出訴期間の教示がある
46条2項が出訴期間の教示である
口頭の処分でも必ず書面で教示する

Center ONLY: one table. Header navy. Row zebra: 1st data row white, 2nd light gray, then white / gray. NOT column colors.
Columns: 訴訟 | 出訴期間の教示（46条） | 14条の出訴期間
Rows:
取消訴訟 | ○ 1項（本則） | ○ 本則
形式的当事者訴訟 | ○ 3項（本則。準用ではない） | ×（40条。法令の定め）
民衆・機関（取消しを求める） | ×（46条は補則。準用なし） | ○（43条1項）
無効確認・義務付け・差止め | × | ×（38条は14条を準用しない）
Caption:「46条2項は、裁決に対してのみ取消訴訟を提起できる旨の教示であり、出訴期間の教示ではない。口頭で処分するときは46条の教示義務なし。」

Scene cast SMALL, do not cover table:
- Good role, left of table: タスク亀. Match assets/images/characters/task_turtle.png and ポーズシート assets/images/characters/task_turtle_sheet.png. Label「行政庁（教示する）」
- Good role, right of table: ぴっちゅ. Match assets/images/characters/pitchi.png and ポーズシート assets/images/characters/pitchi_sheet.png. Label「相手方（出訴期間の案内を受ける）」
- Bad role, far right: カチャドクロ. Match assets/images/characters/kachadokuro.png and ポーズシート assets/images/characters/kachadokuro_sheet.png. Label「誤った主張をする側（民衆訴訟にも46条が準用されるとする）」
Do not swap these roles. No owl, bear, cat, raccoon.

Bottom:
- 判断軸:「教示か、出訴期間そのものか。46条は補則、14条は取消訴訟の章」
- ひっかけ:「民衆・機関に46条準用。形式的当事者に14条準用。義務付けにも教示」
- 暗記:「教示は取消と形式的当事者。14条が乗るのは民衆・機関の取消型」
Answer:「出訴期間の教示は、取消訴訟と形式的当事者訴訟について定められている。民衆訴訟又は機関訴訟で処分又は裁決の取消しを求めるものについては、第九条及び第十条第一項の規定を除き、取消訴訟に関する規定を準用する。」

Guide: ちゃちゃロット SMALL bottom-right margin only, wooden 指し棒 pointing at 暗記. Match assets/images/characters/chachalot.png, skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png, and 全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body only. No nameplate. Not a scene character. Do not stand on the answer bar.
No brand letters anywhere. No overlapping text. Large gothic Japanese. Do not copy any prep-school page.
```

## 目視チェック

- [ ] 民衆・機関に46条教示が○になっていない
- [ ] 形式的当事者の14条が○になっていない
- [ ] 43条1項の除外が9条・10条1項だけと読める
- [ ] 46条2項を出訴期間の教示と書いていない

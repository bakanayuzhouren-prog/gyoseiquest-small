# Codex用 — 行訴法 取消訴訟の被告（11条）の準用

表主役。1枚。教材転載なし。結論は行政事件訴訟法11条・38条1項・41条・43条。

- 保存先: `assets/images/deepdive/gyosho/hikoku-11-junyo.png`
- 画像キー: `gyosho/hikoku-11-junyo`
- 生成は Codex。Cursor は描かない。
- 既存の第三者効準用図・出訴期間教示図は上書きしない。この枚の仕事は**被告（11条）だけ**。

## 法律の芯（崩すな）

**11条（本則・取消訴訟）**  
処分又は裁決をした行政庁が国又は公共団体に所属する場合は、その所属する**国又は公共団体**を被告とする（1項）。所属しないときは**当該行政庁**（2項）。いないときは事務の帰属する国又は公共団体（3項）。訴状には処分庁又は裁決庁を記載する（4項）。処分庁は裁判上の一切の行為をする権限を有する（6項）。

原則の被告は行政庁個人ではない（平成16年改正後）。

**準用**

| 訴訟 | 11条 |
|---|---|
| 取消訴訟 | ○ 本則 |
| 取消訴訟以外の抗告訴訟 | ○（38条1項。11条から13条までを列挙） |
| 当事者訴訟 | **×**（41条に11条なし） |
| 民衆訴訟・機関訴訟で、処分又は裁決の**取消し**を求めるもの | ○（43条1項。除くのは**9条及び10条1項**だけ） |
| 民衆訴訟・機関訴訟で、**無効の確認**を求めるもの | ○（43条2項→無効等確認。38条1項で11条が既に準用） |
| 民衆訴訟・機関訴訟で、前二項以外 | **×**（43条3項は当事者訴訟に関する規定。11条は来ない） |

**当事者訴訟に11条がない理由**  
形式的当事者訴訟は4条どおり、**法令の規定によりその法律関係の当事者の一方を被告とする**。11条の「所属する国又は公共団体」を持ってこない。

**15条は別物**  
出訴期間の定めがある当事者訴訟に準用されるのは、被告を誤ったときの**救済**（15条。40条2項）。被告適格（11条）ではない。

条件フレーズはフル:
- 43条1項: 民衆訴訟又は機関訴訟で、処分又は裁決の取消しを求めるものについては、第九条及び第十条第一項の規定を除き、取消訴訟に関する規定を準用する。

**書かない:** 当事者訴訟にも11条。民衆・機関の全部に11条。43条1項は9条も準用。原則の被告は処分庁個人。あぷし。Gyosei Quest。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 11条は抗告ルート／当事者訴訟にはない |
| 中央メタファー | 訴訟類型×11条の表（行ゼブラ） |
| 判断軸 | 抗告か当事者か。民衆・機関は取消し型か |
| ひっかけ | 当事者にも11条。民衆・機関は全部○。原則は処分庁個人 |
| 暗記 | 11条は抗告。当事者は法令が被告を決める。取消し型の民衆・機関だけ乗せる |
| 役割 | 原告（正しい被告に訴える）／国又は公共団体（所属する被告）／誤った主張をする側（当事者訴訟にも11条があるとする） |

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート（pitchi_sheet.png / task_turtle_sheet.png / kachadokuro_sheet.png / subeton_sheet.pngのうち使うもの）を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 行政事件訴訟法11条の被告は、取消訴訟とその他の抗告訴訟、および民衆訴訟・機関訴訟のうち取消し又は無効確認を求めるものに乗り、当事者訴訟には準用されない.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of the approved「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

STRICT: Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP badges on 論点.
Left heading「論点」. Right heading「ひっかけ」. Labels: Left「論点」Right「ひっかけ」

Title:「11条の被告は抗告ルート」
Chip:「当事者訴訟の41条に11条はない」

Left 論点 Q&A ONLY:
1. 当事者訴訟に11条は準用されるか？ → NO
2. その他の抗告訴訟は？ → YES（38条1項）
3. 民衆・機関で取消しを求めるものは？ → YES（43条1項。除くのは9条と10条1項）
4. 形式的当事者の被告は？ → 法令が定める法律関係の当事者の一方

Right ひっかけ ONLY:
- 当事者訴訟にも11条が準用される
- 民衆訴訟・機関訴訟なら類型を問わず11条がある
- 43条1項は9条の原告適格も準用する
- 原則の被告は処分をした行政庁個人である
- 40条2項の15条が11条の代わりである
Do not write ○ for 当事者訴訟の11条.

Center ONLY: one table. Header navy. Row zebra white / light gray, horizontal not columns.
Columns: 訴訟 | 11条（被告）
Rows:
取消訴訟 | ○ 本則（所属する国又は公共団体）
その他の抗告訴訟 | ○（38条1項）
当事者訴訟 | ×（41条にない）
民衆・機関（取消し） | ○（43条1項）
民衆・機関（取消・無効以外） | ×（43条3項は当事者訴訟）
Caption:「無効確認を求める民衆・機関は、43条2項と38条1項により11条が乗る。形式的当事者の被告は、法令が法律関係の当事者の一方を指定する（4条）。15条は被告を誤ったときの救済であり、11条ではない」

Scene cast SMALL, do not cover table:
- Good role, left: ぴっちゅ. Match assets/images/characters/pitchi.png and ポーズシート assets/images/characters/pitchi_sheet.png. Label「原告（正しい被告に訴える）」
- Good role, center-right: タスク亀. Match assets/images/characters/task_turtle.png and ポーズシート assets/images/characters/task_turtle_sheet.png. Label「国又は公共団体（所属する被告）」
- Bad role, far right: カチャドクロ. Match assets/images/characters/kachadokuro.png and ポーズシート assets/images/characters/kachadokuro_sheet.png. Label「誤った主張をする側（当事者訴訟にも11条があるとする）」
Do not swap these roles. No owl, bear, cat, raccoon.

Bottom:
- 判断軸:「抗告か当事者か。民衆・機関は取消し型か」
- ひっかけ:「当事者にも11条。民衆・機関は全部○。原則は処分庁個人」
- 暗記:「11条は抗告。当事者は法令が被告を決める。取消し型の民衆・機関だけ乗せる」
Answer:「取消訴訟の被告は、処分又は裁決をした行政庁が国又は公共団体に所属するときは、その国又は公共団体である。第十一条は取消訴訟以外の抗告訴訟に準用する。当事者訴訟には準用しない。民衆訴訟又は機関訴訟で処分又は裁決の取消しを求めるものについては、第九条及び第十条第一項を除き、取消訴訟に関する規定を準用する。」

Guide: ちゃちゃロット SMALL bottom-right margin only, wooden 指し棒 pointing at 暗記. Match assets/images/characters/chachalot.png, skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png, and 全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body only. No nameplate. Not a scene character. Do not stand on the answer bar.
No brand letters anywhere. No overlapping text. Large gothic Japanese. Do not copy any prep-school page.
```

## 目視チェック

- [ ] 当事者訴訟の11条を○にしていない
- [ ] 民衆・機関を類型無視で全部○にしていない
- [ ] 原則の被告が「処分庁個人」になっていない
- [ ] 43条1項の除外が9条・10条1項だけと読める
- [ ] 行ゼブラ。許可キャスト以外がいない。あぷし印字なし

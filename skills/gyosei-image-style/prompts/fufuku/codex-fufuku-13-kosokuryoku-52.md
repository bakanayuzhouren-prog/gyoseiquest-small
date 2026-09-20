# Codex用 — 行服法 裁決の拘束力（52条）3手続

表主役。1枚。教材転載なし。結論は行政不服審査法52条・61条・66条。

- 保存先: `assets/images/deepdive/fufuku/kosokuryoku-52.png`
- 画像キー: `fufuku/kosokuryoku-52`
- 生成は Codex。Cursor は描かない。
- 行訴法33条（取り消す判決）は図の主役にしない。ひっかけ1行だけ。

## 法律の芯（崩すな）

**52条1項** 裁決は、関係行政庁を拘束する。同じ判断に反する再処分は許されない（反復禁止）。

**52条2項** 次のときは、処分庁は裁決の趣旨に従い、改めて申請に対する処分をしなければならない。
- 申請に基づいてした処分が、手続の違法若しくは不当を理由として裁決で取り消されたとき
- 申請を却下し、若しくは棄却した処分が裁決で取り消されたとき

**52条3項** 公示されていた処分が取り消され、又は変更されたときは、処分庁はその旨を公示しなければならない。
**52条4項** 相手方以外の利害関係人に通知されていた処分が取り消され、又は変更されたときは、その者（審査請求人及び参加人を除く）に通知しなければならない。

**形成力との切り分け** 認容裁決による取消しは、裁決の時に処分の効力を消す。処分庁が改めて「取り消します」とする必要はない。拘束力は、消えたあとの関係行政庁の行動を縛る。

**3手続**
- 審査請求: 52条本則。
- 再調査の請求: 61条は51条（効力発生）と53条（返還）を準用する。**52条は準用しない**。決定をするのは処分庁自身。認容は59条で自ら取り消し、又は変更する。
- 再審査請求: 66条で52条を準用。やり直しの相手は裁決庁等。却下し、若しくは棄却した原裁決等を取り消したときは、申請に対する処分又は審査請求に対する裁決をやり直す。

**51条** 裁決（再調査では決定）は、送達された時に効力を生ずる。再調査にも乗る。拘束力と混ぜるな。

**書かない:** 再調査にも52条。取消しは処分庁のハンコが必要。事実なしで取り消されても同じ事実で再処分できる。51条も再調査にない。あぷし。Gyosei Quest。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 拘束力は再調査にない／効力発生は乗る |
| 中央メタファー | 3手続の○×表（行ゼブラ） |
| 判断軸 | 52条か51条か。決定をするのは誰か |
| ひっかけ | 再調査にも拘束力。取消しは処分庁が押し直す。事実なしでも再処分可 |
| 暗記 | 拘束力は裁決。再調査の決定には52条なし。効力発生は51条 |
| 役割 | 審査庁（裁決で関係行政庁を拘束する）／処分庁（趣旨に従い改めて処分する）／誤った主張をする側（再調査にも52条があるとする） |

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート（pitchi_sheet.png / task_turtle_sheet.png / kachadokuro_sheet.png / subeton_sheet.pngのうち使うもの）を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 行政不服審査法52条の拘束力は、審査請求と再審査請求にあり、再調査の請求にはない.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of the approved「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

STRICT: Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP badges on 論点.
Left heading「論点」. Right heading「ひっかけ」. Labels: Left「論点」Right「ひっかけ」

Title:「拘束力は再調査にない」
Chip:「52条。51条の効力発生とは別」

Left 論点 Q&A ONLY:
1. 再調査の決定に52条はあるか？ → NO
2. 再審査の裁決に拘束力はあるか？ → YES
3. 取消しに処分庁の再度の取消しは要るか？ → NO（形成力）
4. 手続の違法で取り消された申請処分は？ → 趣旨に従い改めて処分（52条2項）

Right ひっかけ ONLY:
- 再調査の決定にも52条がある
- 再審査には拘束力がない
- 認容裁決のあと、処分庁が改めて取り消す
- 事実がないとして取り消されても、同じ事実で再処分できる
- 51条の効力発生も再調査にない
Do not write ○ for 再調査の52条.

Center ONLY: one table. Header navy. Row zebra white / light gray, horizontal not columns.
Columns: 規定 | 審査請求 | 再調査 | 再審査
Rows:
拘束力（52条1項） | ○ | × | ○
やり直し（52条2項） | ○ | × | ○（裁決庁等）
公示・通知（52条3項4項） | ○ | × | ○
効力発生（51条） | ○ | ○ | ○
Caption:「○＝規定がある。×＝61条に52条なし。認容の取消しは裁決の時に効力が消える。拘束力は関係行政庁のその後の行動を縛る」

Scene cast SMALL, do not cover table:
- Good role, left: ぴっちゅ. Match assets/images/characters/pitchi.png and ポーズシート assets/images/characters/pitchi_sheet.png. Label「審査庁（裁決で関係行政庁を拘束する）」
- Good role, center-right: タスク亀. Match assets/images/characters/task_turtle.png and ポーズシート assets/images/characters/task_turtle_sheet.png. Label「処分庁（趣旨に従い改めて処分する）」
- Bad role, far right: カチャドクロ. Match assets/images/characters/kachadokuro.png and ポーズシート assets/images/characters/kachadokuro_sheet.png. Label「誤った主張をする側（再調査にも52条があるとする）」
Do not swap these roles. No owl, bear, cat, raccoon.

Bottom:
- 判断軸:「52条か51条か。決定をするのは処分庁自身か」
- ひっかけ:「再調査にも拘束力。取消しは処分庁が押し直す。事実なしでも再処分できる」
- 暗記:「拘束力は裁決。再調査の決定には52条なし。効力発生は51条」
Answer:「裁決は関係行政庁を拘束する。再調査の請求には第五十二条を準用しない。申請に基づく処分が手続の違法若しくは不当により取り消され、又は申請を却下し若しくは棄却した処分が取り消されたときは、処分庁は裁決の趣旨に従い、改めて申請に対する処分をしなければならない。」

Guide: ちゃちゃロット SMALL bottom-right margin only, wooden 指し棒 pointing at 暗記. Match assets/images/characters/chachalot.png, skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png, and 全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body only. No nameplate. Not a scene character. Do not stand on the answer bar.
No brand letters anywhere. No overlapping text. Large gothic Japanese. Do not copy any prep-school page.
```

## 目視チェック

- [ ] 再調査の52条を○にしていない
- [ ] 51条を再調査×にしていない
- [ ] 形成力（取消しは裁決時）と拘束力（やり直し・反復禁止）が混ざっていない
- [ ] 行ゼブラ。許可キャスト以外がいない。あぷし印字なし

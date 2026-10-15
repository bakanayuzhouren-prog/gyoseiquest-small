# Codex用 — 不作為の審査請求は申請者が始め、第三者は参加する

審査請求を始める資格（3条）と、始まった手続への参加資格（13条）を、1本の流れで分ける。既存の13条の結論図は上書きしない。

- 保存先: `assets/images/deepdive/learn/fufuku/fusakui-sankajin.png`
- 画像キー: `learn/fufuku/fusakui-sankajin`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政不服審査法。PNGができてから Cursor が載せる。生成前は `[[image:]]` を付けない。
- 関連: 未確定。指定は「第2回・問14・肢3」。現行の TAC第2回・問14データは別論点で、原画像の問番号・肢番号は未確認。索引には足さない。

## PRE-GENERATE-CHECK（行政不服審査法3条・13条）

e-Gov（法令番号 平成26年法律第68号）と照合。2026-10-15。

**3条** 法令に基づき行政庁に対して処分についての申請をした者は、当該申請から相当の期間が経過したにもかかわらず、行政庁の不作為がある場合に、当該不作為についての審査請求をすることができる。不作為とは、法令に基づく申請に対して何らの処分をもしないこと。

**13条1項** 利害関係人は、審理員の許可を得て、当該審査請求に参加することができる。利害関係人とは、審査請求人以外の者であって、審査請求に係る処分または不作為に係る処分の根拠となる法令に照らし、当該処分につき利害関係を有するものと認められる者。

**13条2項** 審理員は、必要があると認める場合には、利害関係人に対し、当該審査請求に参加することを求めることができる。この求めは、1項の許可とは別である。

**書かない:** 申請者以外は不作為の審査請求に一切関われない。第三者が不作為の審査請求を始められる。参加には常に許可が必要。13条2項を落とす。31条の口頭意見陳述。問題文・肢・解説の転載。ブランド名。

## 配役（この図で固定）

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 申請者 | いい役 | 申請者（処分を申請し、不作為の審査請求を始める） | ぴっちゅ | `assets/images/characters/pitchi.png` ＋ `assets/images/characters/pitchi_sheet.png` | 上段の①と③。②には立たない |
| 利害関係人 | いい役 | 申請していない利害関係人（始まった手続に参加する） | タスク亀 | `assets/images/characters/task_turtle.png` ＋ `assets/images/characters/task_turtle_sheet.png` | 下から③へ入る枝だけ。①②には立たない |
| 案内 | いい役 | 案内（答え帯を指す。矢印を隠さない） | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png` | 下余白に小さく1体。余白がなければ置かない |

行政庁と審理員は文字ラベルだけ。名簿外のキャラは置かない。ぴっちゅとタスク亀の役割は入れ替えない。

## 印字してよい文字

- タイトル: `不作為の審査請求、第三者は参加できる？`
- ① `申請する` ／ ぴっちゅ `申請者（処分を申請する）`
- ② `処分をしない` ／ ラベル `行政庁`
- ②から③の矢印: `相当の期間が経過（3条）`
- ③ `審査請求する` ／ ぴっちゅ `審査請求人（不作為の審査請求を始める）`
- 下から③へ入る矢印の1行目: `将来の処分につき、根拠法令上の利害関係`
- その矢印の2行目: `自ら参加する場合は審理員の許可（13条1項）`
- その枝の脇に1行: `審理員が必要と認めれば、参加を求める（13条2項）`
- タスク亀: `申請していない利害関係人`
- 答え帯: `審査請求を始めるのは申請者（3条）。第三者は、処分への法令上の利害関係に基づき参加する（13条1項）。`
- ひっかけ1行: `試験で「申請者以外は不作為の審査請求に一切関われない」と書いてあったら×`

「将来の処分」は、まだされていない、不作為に係る処分を指す。申請者以外が審査請求を始める意味ではない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは assets/images/characters/pitchi_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。ちゃちゃロットを置くときは assets/images/characters/chachalot.png と skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png と skills/gyosei-image-style/assets/approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: who may start a review request about administrative inaction, and who may only join a request that has already started.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas: fully opaque warm off-white, entire 16:9. No dark empty corners.

LAYOUT: one question title, then one left-to-right flow of three boxes, then one branch entering the third box from below, then one answer bar, then one trap line. No left essay column. No right essay column. No second table. No bottom judgment cards. Do not repeat the answer bar inside the boxes.

Title, one line:「不作為の審査請求、第三者は参加できる？」

Upper flow, left to right, three large boxes and two arrows:
Box 1:「申請する」. Under it, ぴっちゅ with the label「申請者（処分を申請する）」.
Arrow: plain.
Box 2:「処分をしない」. Text label only:「行政庁」. No new character.
Arrow:「相当の期間が経過（3条）」.
Box 3:「審査請求する」. ぴっちゅ again, same person, label「審査請求人（不作為の審査請求を始める）」.

One branch only, from below into box 3. タスク亀 stands on that branch, label「申請していない利害関係人」. On the joining arrow, two short lines and no more:
「将来の処分につき、根拠法令上の利害関係」
「自ら参加する場合は審理員の許可（13条1項）」
Beside that branch, one short line:「審理員が必要と認めれば、参加を求める（13条2項）」
Text label only for 審理員. No character for 審理員 or 行政庁.

Answer bar, once:「審査請求を始めるのは申請者（3条）。第三者は、処分への法令上の利害関係に基づき参加する（13条1項）。」
Trap line, once:「試験で「申請者以外は不作為の審査請求に一切関われない」と書いてあったら×」

Do not write that a third party may start the request. Do not write that permission is always required. Do not write that participation is impossible. Do not call the future disposition a disposition that has already been made.

Characters: ぴっちゅ only on boxes 1 and 3. タスク亀 only on the lower branch. Roles do not swap. If blank margin remains under the trap line, ONE small ちゃちゃロット in that margin, green lecturer suit including trousers and shoes, white shirt, independent pale-sky-blue smiling hat with three rounded hills and a long brim, not ears, not a hood. Wooden pointer must not cover the answer bar. If the margin is tight, omit ちゃちゃロット. No other people. No owl, bear, cat, raccoon. No nameplate. No brand letters. No watermark.
```

## 目視

- [ ] 審査請求を始めるのは、申請をした者。相当の期間が経過している
- [ ] 第三者は③の手続へ参加する。①の申請者にはなっていない
- [ ] 自ら参加するときは審理員の許可（13条1項）。2項の求めを、許可が常に必要、とは書いていない
- [ ] ひっかけは1行。答え帯と同じ文を箱の中で繰り返していない
- [ ] ブランド印字なし。行政庁と審理員は文字だけ

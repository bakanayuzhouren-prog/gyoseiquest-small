# Codex用 — 口頭の審査請求は、陳述して録取し、読み聞かせて確認する

19条は口頭で述べる事項。20条は、陳述を受けた行政庁がその陳述の内容を録取し、読み聞かせて誤りのないことを確認する。完成した書面の名称は審査請求録取書（21条2項）。陳述書とは書かない。

既存の2枚は上書きしない。

- 既存（20条の録取）: `assets/images/deepdive/fufuku/koto-rokushu-yomikikase.png`
- 既存（19条2項の6事項）: `assets/images/deepdive/fufuku/shinsa-seikyusho-6.png`
- 保存先: `assets/images/deepdive/learn/fufuku/koto-shinsaseikyu-19-20-flow.png`
- 画像キー: `learn/fufuku/koto-shinsaseikyu-19-20-flow`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政不服審査法。上の2枚のあいだをつなぐ流れ。PNGができてから Cursor が載せる。生成前は `[[image:]]` を付けない。
- 関連: 未確定。指定は「第2回・問15・肢2」。現行の TAC第2回・問15データは別論点で、原画像の問番号・肢番号は未確認。索引には足さない。

## PRE-GENERATE-CHECK（行政不服審査法19条・20条・21条2項）

e-Gov（法令番号 平成26年法律第68号）と照合。2026-10-15。

**19条1項** 審査請求は、他の法律（条例に基づく処分については、条例）に口頭ですることができる旨の定めがある場合を除き、審査請求書を提出してしなければならない。

**19条2項（処分。6つ）** 氏名又は名称および住所又は居所。処分の内容。処分（再調査の請求についての決定を経たときは、その決定）があったことを知った年月日。審査請求の趣旨および理由。処分庁の教示の有無およびその内容。審査請求の年月日。

**19条3項（不作為。3つ）** 氏名又は名称および住所又は居所。当該不作為に係る処分についての申請の内容および年月日。審査請求の年月日。

**19条4項** 法人その他の社団若しくは財団、総代、代理人のときは、2項または3項に加え、代表者若しくは管理人、総代または代理人の氏名および住所又は居所。処分にも不作為にも、該当するときだけ。

**19条5項** 処分についての審査請求書に、該当するときだけ追加する。再調査の請求をした年月日。決定を経ない正当な理由。審査請求期間の経過後の正当な理由。不作為の3項には5項を足さない。

**20条** 口頭で審査請求をする場合には、前条2項から5項までに規定する事項を陳述しなければならない。陳述を受けた行政庁は、その陳述の内容を録取し、これを陳述人に読み聞かせて誤りのないことを確認しなければならない。

**21条2項** 審査請求録取書とは、20条後段により陳述の内容を録取した書面。

**書かない:** 処分を録取する。陳述書を作る。押印必須。いつでも口頭で請求できる。2項の6つだけが口頭の全事項。31条の口頭意見陳述。問題文・肢・解説の転載。ブランド名。既存2枚の構図のコピー。

## 配役（この図で固定）

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 陳述する側 | いい役 | 審査請求人（該当事項を陳述する） | ぴっちゅ | `assets/images/characters/pitchi.png` ＋ `assets/images/characters/pitchi_sheet.png` | ①の箱の下。以後も同じ役割 |
| 録取する側 | いい役 | 行政庁（陳述の内容を録取し、読み聞かせて確認する） | タスク亀 | `assets/images/characters/task_turtle.png` ＋ `assets/images/characters/task_turtle_sheet.png` | ②③④の下。途中で役割を変えない |

案内役は置かない。文字を優先する。名簿外のキャラは置かない。

## 印字してよい文字

- タイトル: `口頭の審査請求、何を述べて、誰が確認する？`
- 入口: `他の法律に口頭可の定めがある場合。条例に基づく処分は条例の定め（19条1項）`
- ① `審査請求人が、19条2項から5項の該当事項を陳述する`
- ①の上段: `処分の審査請求（19条2項）：氏名・住所等／処分の内容／処分または再調査の決定を知った年月日／趣旨・理由／教示の有無・内容／審査請求の年月日`
- ①の下段: `不作為の審査請求（19条3項）：氏名・住所等／申請の内容・年月日／審査請求の年月日`
- ①の下: `19条4項・5項は、該当する場合に追加。5項は処分の審査請求だけ`
- ② `陳述を受けた行政庁が、陳述の内容を録取する`
- ③ `同じ行政庁が、録取した内容を陳述人に読み聞かせる`
- ④ `行政庁が、陳述人に誤りのないことを確認する（20条）`
- ④の出口: `審査請求録取書（21条2項）`
- ひっかけ1行: `「録取して終わり」×。読み聞かせ、誤りのないことの確認まで必要。`

## GPT Image プロンプト

```text
参照必須: ぴっちゅは assets/images/characters/pitchi_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: the left-to-right steps of an oral administrative review request, from stating the required matters through reading them back and confirming they are correct.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas: fully opaque warm off-white, entire 16:9. No dark empty corners.

LAYOUT: one question title, one short entry line, then four large boxes in a single left-to-right row, then the document name at the exit of box 4, then one trap line. No left essay column. No right essay column. No bottom judgment cards. No answer bar that repeats the four boxes. No mascot guide. No extra documents.

Title, one line:「口頭の審査請求、何を述べて、誰が確認する？」

Entry, one short line above the flow:「他の法律に口頭可の定めがある場合。条例に基づく処分は条例の定め（19条1項）」

Four boxes, left to right:
Box 1, the widest:「審査請求人が、19条2項から5項の該当事項を陳述する」
Inside box 1, two short tiers, not a second page:
「処分の審査請求（19条2項）：氏名・住所等／処分の内容／処分または再調査の決定を知った年月日／趣旨・理由／教示の有無・内容／審査請求の年月日」
「不作為の審査請求（19条3項）：氏名・住所等／申請の内容・年月日／審査請求の年月日」
Under those tiers, one line:「19条4項・5項は、該当する場合に追加。5項は処分の審査請求だけ」
ぴっちゅ stands under box 1 only, label「審査請求人（該当事項を陳述する）」.

Arrow.
Box 2:「陳述を受けた行政庁が、陳述の内容を録取する」
Arrow.
Box 3:「同じ行政庁が、録取した内容を陳述人に読み聞かせる」
Arrow.
Box 4:「行政庁が、陳述人に誤りのないことを確認する（20条）」
タスク亀 stands under boxes 2, 3, and 4 as the same person, label「行政庁（陳述の内容を録取し、読み聞かせて確認する）」. Do not change this role.

Exit of box 4, one label:「審査請求録取書（21条2項）」

Trap line, once, at the bottom:「「録取して終わり」×。読み聞かせ、誤りのないことの確認まで必要。」

Do not write 陳述書. Do not write that the disposition itself is recorded. Do not write that a seal is required. Do not write that an oral request is always allowed. Do not write that the six items of paragraph 2 are the entire list. Do not add the oral opinion hearing of article 31.

No ちゃちゃロット. No other people. No owl, bear, cat, raccoon. No nameplate. No brand letters. No watermark. If the two tiers inside box 1 would become small, remove decoration before shrinking those tiers.
```

## 目視

- [ ] 入口は、他の法律または条例の定めがあるときに限る
- [ ] ①は2項から5項。2項の6つだけを全事項と書いていない。5項は処分の審査請求だけ
- [ ] 録取するのは陳述の内容。処分を録取、とは書いていない
- [ ] ③の読み聞かせと④の確認がある。録取して終わり、とは書いていない
- [ ] 出口の名称は審査請求録取書。陳述書ではない
- [ ] ブランド印字なし。案内役なし。ぴっちゅは陳述する側、タスク亀は行政庁のまま

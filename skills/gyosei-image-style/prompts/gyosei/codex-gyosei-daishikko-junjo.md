# Codex用 — 代執行は、どの順で進む？

手順は横一列。箱は名前だけ。補足は上下の矢印コメント。折り返さない。片方だけの省略を否定する文は置かない。

- 保存先: `assets/images/deepdive/learn/gyosei/daishikko-junjo.png`
- 上書き対象: `assets/images/deepdive/learn/gyosei/daishikko-junjo.png`（この1枚。納付命令の下コメントだけ。5条の語は納期日。箱の並び、色、ほかの文は維持する。全体の作り直しはしない）
- 画像キー: `learn/gyosei/daishikko-junjo`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政法総論。既存の `daishikko-tetsuzuki.png`（対象と比較）は上書きしない。PNGができてから Cursor が載せる。生成前は `[[image:]]` を付けない。
- 関連: 未指定。索引には足さない。

## PRE-GENERATE-CHECK（行政代執行法1条・2条・3条・4条・5条・6条）

e-Gov（昭和23年法律第43号）と照合。2026-10-20。

**1条** 行政上の義務の履行確保に関しては、別に法律で定めるものを除いては、この法律の定めるところによる。1条の「法律」に、命令・規則・条例を含む括弧はない。

**2条** 対象は、法律（法律の委任に基づく命令、規則及び条例を含む）により直接に命ぜられ、又は法律に基づき行政庁により命ぜられた行為のうち、他人が代わってすることができる行為。義務者が履行しないこと、他の手段によって履行を確保することが困難であること、不履行を放置することが著しく公益に反すると認められること。行政庁が自ら行い、又は第三者をして行わせ、費用を義務者から徴収する。

**3条1項** 相当の履行期限を定め、その期限までに履行されないときは代執行をする旨を、あらかじめ文書で戒告する。

**3条2項** 戒告の期限までに履行しないとき、代執行令書で、代執行をすべき時期、執行責任者の氏名、費用の概算による見積額を通知する。

**3条3項** 非常の場合又は危険切迫の場合において、当該行為の急速な実施について緊急の必要があり、前二項に規定する手続をとる暇がないときは、その手続を経ないで代執行できる。前二項は戒告と通知である。戒告のあと危険が切迫して、残る通知だけを省く場合まで、同項は否定していない。

**4条** 現場の執行責任者は、本人であることを示す証票を携帯し、求めがあるときは示す。

**5条** 実際に要した費用の額及びその納期日を定め、義務者に対し、文書をもって納付を命じる。概算の見積額は3条2項の通知であり、5条の額ではない。

**6条1項** 国税滞納処分の例により徴収することができる。

**6条2項** 先取特権は、国税及び地方税に次ぐ順位。

**書かない:** 片方だけの省略を否定する文。非常なら常に省ける、という暇のない条件の脱落。費用を先に請求してから代執行する順。概算額を、実施後に命じる額と書くこと。民事訴訟で徴収する。不作為義務も対象。委任のない命令、規則、条例も入る、と書くこと。手順を二段に折り返すこと。箱の中へ補足を詰め込むこと。証票と先取特権は、この1枚には置かない。ブランド名。案内役。底部の判断軸・ひっかけ・暗記。同じ文の繰り返し。

## 配役

置かない。箱と矢印で足りる。名簿外の人物も置かない。

## 印字してよい文字

箱は名前だけ。補足は矢印の先の短いコメント。

- タイトル: `代執行は、どの順で進む？`
- タイトルの下: `他の手段による履行確保が困難で、放置が著しく公益に反するとき（2条）`
- 箱: `代替的作為義務` → `不履行` → `戒告` → `通知` → `代執行` → `納付命令` → `徴収`
- 上から代執行へ: `非常の場合、または危険切迫の場合。急速な実施の緊急の必要があり、戒告・通知の手続をとる暇がないときは、その手続を経ずに代執行できる（3条3項）`
- 下から代替的作為義務へ: `他人が代わってできる行為を命ずる（2条）`
- 下から戒告へ: `履行期限と、代執行する旨。あらかじめ文書（3条1項）`
- 下から通知へ: `代執行令書。時期、執行責任者、費用の概算（3条2項）`
- 下から代執行へ: `行政庁が自ら行い、又は第三者にさせる（2条）`
- 下から納付命令へ: `実際に要した額と納期日を、文書で命じる（5条）`
- 下から徴収へ: `国税滞納処分の例（6条1項）`
- 最下段: `別に法律で定めるものを除き、行政上の義務の履行確保は、行政代執行法による（1条）`
- その次: `命ずる根拠の法律には、法律の委任に基づく命令、規則、条例も入る（2条）。1条の除外には、この括弧がない`

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one horizontal row of the substitute-execution steps. Comments sit above and below that row, each with its own arrow. Do not wrap the steps onto a second row.
Quality: slightly POP, VERY LARGE gothic Japanese on the step names, ZERO overlapping glyphs.
Canvas: fully opaque warm off-white, entire 16:9. No dark empty corners.
No people. No mascot. No guide. No left essay column. No right essay column. No bottom judgment cards. No table. No extra documents. No brand name, account name, or watermark.

Title, one line:「代執行は、どの順で進む？」
One short line under the title:「他の手段による履行確保が困難で、放置が著しく公益に反するとき（2条）」

Center: exactly one row of seven boxes. Each box contains only its name. Names are the largest text. Thick navy arrows point only to the right.
「代替的作為義務」→「不履行」→「戒告」→「通知」→「代執行」→「納付命令」→「徴収」
Do not put a second line inside any box. Do not wrap this row.

Above the row, one amber comment only. A thin amber arrow points down to「代執行」. The comment may sit over「戒告」and「通知」, but it must not cover the box names.
「非常の場合、または危険切迫の場合。急速な実施の緊急の必要があり、戒告・通知の手続をとる暇がないときは、その手続を経ずに代執行できる（3条3項）」
Do not add a sentence that partial omission is impossible.

Below the row, six short comments. Each has a thin navy arrow pointing up to its box. Do not turn these comments into a second row of steps.
Arrow to「代替的作為義務」:「他人が代わってできる行為を命ずる（2条）」
Arrow to「戒告」:「履行期限と、代執行する旨。あらかじめ文書（3条1項）」
Arrow to「通知」:「代執行令書。時期、執行責任者、費用の概算（3条2項）」
Arrow to「代執行」:「行政庁が自ら行い、又は第三者にさせる（2条）」
Arrow to「納付命令」: print exactly「実際に要した額と納期日を、文書で命じる（5条）」. The date word is 納期日（納・期・日）. Keep every other box, color, and sentence unchanged.
Arrow to「徴収」:「国税滞納処分の例（6条1項）」
「不履行」has no extra comment.

Bottom, two lines only. Do not retell the seven names.
「別に法律で定めるものを除き、行政上の義務の履行確保は、行政代執行法による（1条）」
「命ずる根拠の法律には、法律の委任に基づく命令、規則、条例も入る（2条）。1条の除外には、この括弧がない」
```

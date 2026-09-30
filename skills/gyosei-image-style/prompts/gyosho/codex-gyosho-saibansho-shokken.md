# 行訴法・裁判所は申立てを待たずに動けるか

- 保存先: assets/images/deepdive/learn/gyosho/saibansho-shokken.png
- 画像キー: learn/gyosho/saibansho-shokken
- 生成は Codex。Cursor は描かない。
- 既存の `行政法/shokken-junyo.png` と `gyosho/shikko-teishi-shokken-hikaku.png` は上書きしない。
- 見せ方は中央の1表。左を正解、右をひっかけにしない。ひっかけは底部カードだけ。
- 根拠: 行政事件訴訟法12条5項、13条、15条、22条、23条、23条の2、24条、25条2項、26条、31条（e-Gov 確認日: 2026-10-01）。

## PRE-GENERATE-CHECK

- 22条は、当事者若しくはその第三者の申立て、又は職権。
- 23条は、処分又は裁決をした行政庁以外。当事者若しくはその行政庁の申立て、又は職権。
- 24条は、必要があるとき職権で証拠調べ。結果について当事者の意見をきく。職権探知ではない。
- 移送の職権は、12条5項と13条。どの移送でも職権、と書かない。
- 23条の2の現行条文に「申立てにより又は職権で」とは書いていない。必要があると認めるとき、裁判所がする。
- 23条の2第1項は、処分又は裁決の理由を明らかにする資料の提出、又は他の行政庁への送付の嘱託。第2項は、審査請求の裁決を経た後の取消訴訟で、その事件の記録。
- 31条は申立てを要件にしていない。違法でも、取り消すことが公共の福祉に適合しないときは棄却でき、主文で違法を宣言する。
- 25条2項の執行停止は申立てがなければできない。26条は相手方の申立て。15条は原告の申立て。故意又は重大な過失によらない誤りのとき。
- タイトルを「全部職権」とも「全部申立て」とも読ませない。
- 「乗る」「乗らない」は使わない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 行政事件訴訟法で、裁判所が申立てを待たずに動けるかを分ける.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Center is ONE comparison table. Do not make a right-side trap panel. Every row states the correct rule.
Header row navy. Data rows alternate white then light gray, by row, never by column. Nine data rows, all readable. Do not shrink the type until letters collide.

Title exactly: 裁判所は、申立てを待たずに動けるか
Chip:「行政事件訴訟法」

Columns: 制度 | 条文 | 裁判所の動き
Rows, exact text:
第三者の訴訟参加 | 22条 | 待たなくてよい。当事者若しくはその第三者の申立て、又は職権
行政庁の訴訟参加 | 23条 | 待たなくてよい。対象は、処分又は裁決をした行政庁以外。申立て、又は職権
職権証拠調べ | 24条 | 必要があるとき職権。結果は当事者の意見。職権探知ではない
移送 | 12条5項・13条 | この二つの移送は、申立て又は職権。どの移送でも職権、ではない
釈明処分の特則 | 23条の2 | 訴訟関係を明瞭にするため必要があると認めるとき。申立ては条文の要件ではない
事情判決 | 31条 | 申立ては要件ではない。違法でも、取り消すことが公共の福祉に適合しないときは棄却できる。主文で違法を宣言する
執行停止 | 25条2項 | 申立てがなければできない
執行停止の取消し | 26条 | 相手方の申立てがなければできない
被告の変更 | 15条 | 原告の申立てがなければできない。故意又は重大な過失によらない誤りに限る

Caption under the table, exact:
「23条の2第1項は、処分又は裁決の理由を明らかにする資料の提出を求め、又は他の行政庁に送付を嘱託する。第2項は、審査請求の裁決を経た後の取消訴訟で、その事件の記録について同様にする。」

Bottom three cards:
判断軸:「条文が職権と書くか。申立てを要件にするか」
ひっかけ:「試験で『23条の2は申立てにより又は職権で』と書いてあったら×。試験で『職権証拠調べがあるから、被告の変更も職権』と書いてあったら×」
暗記:「参加、証拠調べ、12条5項と13条の移送は、申立て又は職権。執行停止と被告の変更は、申立てがなければできない。釈明処分と事情判決は、申立てを要件にしていない。」

Roles, fixed. Keep them in the margin. Do not cover the table, the caption, or the bottom cards.
タスク亀 = 裁判所（必要があるとき証拠を調べる）。Small, left margin beside the 24条 row。参照 assets/images/characters/task_turtle.png
ぴっちゅ = 原告（被告の変更を申し立てる）。Small, right margin beside the 15条 row。参照 assets/images/characters/pitchi.png
カチャドクロ = ひっかけ（23条の2を、申立てにより又は職権で、と言う）。Small, inside the bottom ひっかけ card only。参照 assets/images/characters/kachadokuro.png
Labels are the roles above. Never write だれが.
ONE ちゃちゃロット only, small, bottom margin, wooden pointer toward 暗記 without covering letters.
Cream face. Independent pale-sky-blue hat: two round side peaks, low center peak, long brim, closed smiling eyes. The hat is not ears, not a cap, not a hood.
Green lecturer suit including green trousers and shoes, white shirt.
No nameplate. No logos, no watermarks, no brand names.
No owl, bear, tanuki, cat, or unnamed human.
```

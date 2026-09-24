# Codex用 — 行服法22条 誤教示は速やかに送付（語呂：誤ったのに隅に置けない）

てらしぃ語呂。**誤った**教示と、受け取った庁・処分庁の**速やかに**送付をセットで覚える。
1枚の仕事は **誤教示でも、書面で届いた請求を速やかに正しい庁へ送る（22条）**。

既存の `kyoji-saichosa-misoshiji.png`（82条・83条／行訴46条）は上書きしない。直ちに一覧の `chokutini-sokuni-chienaku.png` も上書きしない。

- 保存先: `assets/images/deepdive/fufuku/ayamatta-sumi-okenai.png`
- 画像キー: `fufuku/ayamatta-sumi-okenai`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政不服審査法の「もっと深掘る」。アプリ載せは生成後。

## PRE-GENERATE-CHECK（行服法22条・e-Gov突合）

誤った教示をした場合の救済。速度は**速やかに**（直ちにではない）。送付されたときは、初めから審査庁となるべき行政庁に審査請求がされたものとみなす（5項）。

| 項 | 誤りの型 | 誰が送るか | どこへ | 通知 |
|---|---|---|---|---|
| **1項** | 審査請求をすべきでない行政庁を、すべき行政庁として教示。**教示された行政庁に書面で審査請求がされたとき** | **教示された行政庁** | 処分庁**又は**審査庁となるべき行政庁 | 審査請求人へ、その旨 |
| **2項** | 1項で処分庁に届いたとき | **処分庁** | 審査庁となるべき行政庁 | 審査請求人へ、その旨 |
| **3項** | 再調査の請求を**できない**処分なのに、できる旨を教示。処分庁に再調査の請求 | **処分庁** | 審査庁となるべき行政庁（請求書又は録取書） | 再調査の請求人へ、その旨 |
| **4項** | 再調査**できる**処分なのに、審査請求できる旨を**教示しなかった**。処分庁に再調査の請求があり、**請求人の申立て**があるとき | **処分庁** | 審査庁となるべき行政庁（請求書又は録取書**及び関係書類その他の物件**） | 送付を受けた庁が、請求人及び参加人へ |

本図の中央は、てらしぃが挙げた **1項・2項・3項**（誤った教示→自動で速やかに送付）。
**4項は申立てが要る**ので、ひっかけ側とキャプションだけ。中央表に4行詰め込まない。

混ぜない: 82条の相手方教示そのもの、83条のみなし（教示しなかったとき処分庁へ提出）、21条2項の経由送付（**直ちに**）。

語呂「誤ったのに、隅に置けない」は**暗記カードと小さな補助吹き出しだけ**。タイトル・論点Q&A・答え帯・判断軸・表見出しは法律日本語（速やかに送付／書面／みなす）。タイトルに語呂を置かない。
答え帯は**1文**。条文の読み上げを載せない。

GPT Image本文（` ```text `）にブランド名を書かない。禁止対象として列挙しても印字される。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 誤教示は、書面が届いたら速やかに送付 |
| 中央 | 誤教示2型＋経由の3列表。1項の行に「書面で審査請求」 |
| 判断軸 | 誤った教示か。書面で届いたか。誰が、どこへ、速やかに送るか |
| ひっかけ | 直ちに。却下して終わり。口頭でも1項が動く。4項も申立てなしで自動 |
| 暗記 | 誤ったのに、隅に置けない。誤教示は速やかに送付（22条） |
| 役割 | 処分庁（誤って教示した）／審査請求人（正しい庁へ届いてほしい） |

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 処分庁 | 悪い役 | 処分庁（誤って教示した） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` |
| 審査請求人 | いい役 | 審査請求人（正しい庁へ届いてほしい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` |
| 案内 | いい役 | 案内（暗記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |

## GPT Image プロンプト

```text
参照必須: 場面役はポーズシート pitchi_sheet.png と kachadokuro_sheet.png を照合する。ちゃちゃロットは全身指し棒正本 approved-chachalot-pointer.png。制度の意味を先に示し、条文番号は括弧で後から付ける。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 誤って審査請求をすべきでない行政庁を教示した場合、その教示された行政庁に書面で審査請求がされたときは、当該行政庁は速やかに審査請求書を処分庁又は審査庁となるべき行政庁に送付する（行政不服審査法22条）.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center TABLE plus a small center scene, bottom 判断軸 / ひっかけ / 暗記.

Left heading 論点. Right heading ひっかけ.
Q&A answers are YES, NO, or a short legal phrase. Do not use GO or STOP.
Labels under characters: Left-center「審査請求人（正しい庁へ届いてほしい）」Right-center「処分庁（誤って教示した）」

Title:「誤教示は、書面が届いたら速やかに送付」
Chip:「行服法22条」

Center scene (small, above the table, do not cover text): a sealed written request moving from a wrong desk to the correct desk. Do not cover the table.

Center ONLY one table. Header navy. Row zebra white / light gray, horizontal not columns.
Columns: 誤りの型 | 誰が送るか | どこへ
Rows:
すべきでない行政庁を教示し、そこに書面で審査請求（1項） | 教示された行政庁 | 処分庁又は審査庁となるべき行政庁
処分庁に届いたあと（2項） | 処分庁 | 審査庁となるべき行政庁
再調査できると誤教示（3項） | 処分庁 | 審査庁となるべき行政庁
Caption:「1項は口頭では足りない。速度は速やかにであり、直ちにではない」

Left 論点:
1. すべきでない行政庁を教示したあと、いつ送付するか？ → 教示された行政庁に書面で審査請求がされたとき
2. 再調査できないのにできると教示した？ → 処分庁が速やかに送付
3. 送付の効果は？ → 初めから審査請求があったものとみなす

Right ひっかけ:
- 直ちに送付する
- 受け取った庁は却下して終わり
- 口頭でも1項の送付義務が生ずる
- 4項も申立てなしで自動送付する

Bottom:
- 判断軸:「誤った教示か。書面で届いたか。誰が、どこへ、速やかに送付するか」
- ひっかけ:「直ちに。却下して終わり。口頭でも1項が動く。4項を申立てなしの自動送付にする」
- 暗記:「誤ったのに、隅に置けない。誤教示は速やかに送付（22条）」
Tiny helper bubble near 暗記 only:「誤った＝速やかに」
Answer:「誤教示先に書面で審査請求がされたときは、請求書を速やかに正しい庁へ送付し、初めから審査請求がされたものとみなす（22条）。」

Guide: ONE ちゃちゃロット only, SMALL bottom-right margin, wooden 指し棒 pointing at 暗記. Cream face, independent pale-sky-blue smiling hat with three rounded hills and a long brim (not ears, not a hood), closed smiling eyes, green lecturer jacket, white shirt, green trousers, shoes. No nameplate. No logos or watermarks. Do not stand on the answer band.
Scene cast: ぴっちゅ is the 審査請求人 on the left of the small scene. カチャドクロ is the 処分庁 on the right of the small scene. Do not hide the table, arrows, or Japanese labels.
```

## 目視チェック

- [ ] 速度は「速やかに」。直ちににしていない
- [ ] 1項に「教示された行政庁に書面で審査請求がされたとき」がある
- [ ] 1項の送付先は「処分庁又は審査庁となるべき行政庁」
- [ ] 3項は「再調査できない処分なのにできると教示」→処分庁が送付
- [ ] 答え帯は1文。条文読み上げの長文ではない
- [ ] 5項のみなし（初めから審査請求）を答え帯に残している
- [ ] 4項を中央の自動送付と同じにしていない
- [ ] 21条2項（直ちに）と混ぜていない
- [ ] タイトルは法律日本語。語呂は暗記／小さな吹き出しだけ
- [ ] GPT Image本文にブランド名がない（禁止列挙も含めない）
- [ ] ちゃちゃロットは緑スーツ。帽子が耳になっていない
- [ ] 行ゼブラ（白／薄いグレー）で、列ゼブラではない

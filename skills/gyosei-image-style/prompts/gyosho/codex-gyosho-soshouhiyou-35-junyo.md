# Codex用 — 行訴法35条 訴訟費用の裁判の効力（当事者訴訟にも準用）

てらしぃ問: 訴訟費用に関する規定は当事者訴訟に準用されるか。
1枚の仕事は **35条は広く準用される。当事者訴訟にも41条1項で準用する**。
11条・22条は当事者訴訟に準用されない。35条と混ぜない。図の文字に「乗る」「乗らない」は使わない。

既存の `hikoku-11-junyo.png` / `daisansha-kou-junyo.png` は上書きしない。

- 保存先: `assets/images/deepdive/gyosho/soshouhiyou-35-junyo.png`
- 画像キー: `gyosho/soshouhiyou-35-junyo`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政事件訴訟法の「もっと深掘る」。アプリ載せは生成後。

## PRE-GENERATE-CHECK（行訴法35・38・41・43・45）

**35条（訴訟費用の裁判の効力）**  
国又は公共団体に所属する行政庁が当事者又は参加人である訴訟における**確定した訴訟費用の裁判**は、当該行政庁が所属する**国又は公共団体に対し、又はそれらの者のために、効力を有する**。

民訴の「誰が費用を負担するか」そのものではなく、行政庁名義の訴訟でも**費用裁判の帰属先は国・公共団体**、という効力規定。

**準用**

| 訴訟 | 35条 | 根拠 |
|---|---|---|
| 取消訴訟 | ○ 本則 | 35条 |
| 取消訴訟以外の抗告訴訟 | ○ | 38条1項（35条を列挙） |
| **当事者訴訟** | **○** | **41条1項**（23・24・33条1項及び**35条**） |
| 民衆・機関（取消し） | ○ | 43条1項（除くのは9条・10条1項だけ） |
| 民衆・機関（無効確認） | ○ | 43条2項→無効等確認→38条1項 |
| 民衆・機関（前二項以外） | ○ | 43条3項→当事者訴訟規定（41条に35条） |
| 争点訴訟 | ○ | 45条4項（訴訟費用の裁判について35条を準用） |

**41条1項（正文）**  
第二十三条、第二十四条、第三十三条第一項及び第三十五条の規定は当事者訴訟について、第二十三条の二の規定は当事者訴訟における処分又は裁決の理由を明らかにする資料の提出について準用する。

**対比（同じ図に書きすぎない。キャプション1行）**  
11条の被告・22条の第三者参加は当事者訴訟に準用されない。35条は準用される。

**書かない:** 当事者訴訟に35条なし。民衆・無効だけ。費用負担の一般ルールを民訴61条の全文にする。直ちに。「乗る」「乗らない」。ブランド名。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 35条は当事者訴訟にも準用される |
| 中央 | 訴訟類型×35条の表（行ゼブラ） |
| 判断軸 | 35条か。抗告か当事者か。11条・22条と混ぜていないか |
| ひっかけ | 当事者訴訟には準用されない。民衆・無効だけ。11条と同じ地図 |
| 暗記 | 35条は広く準用される。当事者訴訟は41条1項。費用裁判は国又は公共団体に及ぶ |
| 役割 | 原告（費用裁判の帰属を知る）／誤った主張をする側（当事者訴訟には35条がないとする） |

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 原告 | いい役 | 原告（費用裁判の帰属を知る） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` |
| 誤った主張 | 悪い役 | 誤った主張をする側（当事者訴訟には35条がないとする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` |
| 案内 | いい役 | 案内（暗記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |

## GPT Image プロンプト

```text
参照必須: 場面役はポーズシート pitchi_sheet.png と kachadokuro_sheet.png を照合する。ちゃちゃロットは全身指し棒正本 approved-chachalot-pointer.png。制度の意味を先に示し、条文番号は括弧で後から付ける。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 行政事件訴訟法35条の訴訟費用の裁判の効力は、取消訴訟の本則であり、その他の抗告訴訟・当事者訴訟・民衆訴訟・機関訴訟・争点訴訟にも準用される.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Do not print brand names anywhere on the image.

Left heading 論点. Right heading ひっかけ.
Q&A answers are YES, NO, or a short legal phrase. Do not use GO or STOP.
Labels: Left「原告（費用裁判の帰属を知る）」Right「誤った主張をする側（当事者訴訟には35条がないとする）」

Title:「35条は、当事者訴訟にも準用される」
Chip:「行訴法35条・41条1項」

Center ONLY: one table. Header navy. Row zebra white / light gray, horizontal not columns.
Columns: 訴訟 | 35条
Rows:
取消訴訟 | ○ 本則
その他の抗告訴訟 | ○（38条1項）
当事者訴訟 | ○（41条1項）
民衆・機関 | ○（43条経由）
争点訴訟 | ○（45条4項）
Caption:「国又は公共団体に所属する行政庁が当事者又は参加人であるとき、確定した訴訟費用の裁判は、その国又は公共団体に対し、又はそれらの者のために効力を有する（35条）。11条の被告と22条の第三者参加は当事者訴訟に準用されない。35条は準用される」

Left 論点:
1. 当事者訴訟に35条は準用されるか？ → YES（41条1項）
2. その他の抗告訴訟は？ → YES（38条1項）
3. 効力の帰属先は？ → 所属する国又は公共団体

Right ひっかけ:
- 当事者訴訟には訴訟費用の規定がない
- 民衆訴訟・無効確認だけに準用される
- 11条と同じく当事者訴訟には準用されない
- 22条も当事者訴訟に準用される

Bottom:
- 判断軸:「35条か。抗告か当事者か。11条・22条と地図を混ぜていないか」
- ひっかけ:「当事者訴訟には準用されない。民衆・無効だけ。11条と同じ地図」
- 暗記:「35条は広く準用される。当事者訴訟は41条1項。費用裁判は国又は公共団体に及ぶ」
Answer:「国又は公共団体に所属する行政庁が当事者又は参加人である訴訟における確定した訴訟費用の裁判は、当該行政庁が所属する国又は公共団体に対し、又はそれらの者のために、効力を有する。第三十五条は、取消訴訟以外の抗告訴訟に準用し、当事者訴訟にも準用する。」

Guide: ONE ちゃちゃロット only, SMALL bottom-right margin, wooden 指し棒 pointing at 暗記. Cream face, independent pale-sky-blue smiling hat with three rounded hills and a long brim (not ears, not a hood), closed smiling eyes, green lecturer jacket, white shirt, green trousers, shoes. No nameplate. No logos or watermarks. Do not stand on the answer band.
Scene cast SMALL, do not cover the table: ぴっちゅ left, カチャドクロ right. Do not swap roles. No owl, bear, cat, raccoon.
```

## 目視チェック

- [ ] 当事者訴訟の35条を×にしていない
- [ ] 11条・22条を「同じく準用されない」と本文で肯定していない（ひっかけ側だけ）
- [ ] 35条の効力先が「国又は公共団体」と読める
- [ ] 41条1項のリストに35条がある
- [ ] 四隅にブランド名がない
- [ ] 行ゼブラ（白／薄いグレー）。列ゼブラではない
- [ ] ちゃちゃロットは緑スーツ。帽子が耳になっていない

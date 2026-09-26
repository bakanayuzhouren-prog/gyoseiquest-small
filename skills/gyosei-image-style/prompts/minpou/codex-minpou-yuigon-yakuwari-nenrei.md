# Codex用 — 遺言の3役と、15歳か成年か

生成済み。証人・立会人の図は再生成しない。てらしぃの修正指示があるまで、このPNGは上書きしない。

定型の左右パネルと中央表は使わない。AGENTSの「見せ方は論点に合わせる」。生成前チェックで左右見出しがないことを理由に止めない。

2枚。1枚目は証人・立会人・遺言執行者。2枚目は、15歳で足りるか、成年（18歳）が要るか。混ぜない。

- 保存先: `assets/images/deepdive/learn/minnpou/yuigon-shonin-tachiai-shikkou.png`
- 年齢の図は生成済みで合格。このファイルからは再生成しない。
- 画像キー: `learn/minnpou/yuigon-shonin-tachiai-shikkou` / `learn/minnpou/nenrei-15-ka-seinen`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・家族法の「もっと深掘る」。アプリ載せは生成後。

## 法律（1枚目）

証人も立会人も、遺言をするその場にいる。遺言執行者は、死亡後に内容を実現する。

- 証人: 方式が真正かを確認し、署名押印する。公正証書遺言と秘密証書遺言は2人。危急時遺言は3人。自筆証書遺言には不要（969条・970条・976条）。
- 立会人: 証人とは別の人。成年被後見人が一時回復して遺言するときは医師2人（973条）。隔離者の遺言は、警察官1人と証人1人以上（977条）。在船者の遺言は、船長または事務員1人と証人2人以上（978条）。公正証書の「証人2人以上の立会い」は、証人が立ち会うという意味。証人のほかに立会人は要らない。
- 欠格は証人も立会人も同じ（974条）。未成年者。推定相続人・受遺者と、その配偶者・直系血族。公証人の配偶者、四親等内の親族、書記、使用人。
- 遺言執行者: 必須ではない。遺言で指定するか、家庭裁判所が選任する（1006条・1010条）。相続財産の管理その他、執行に必要な行為をする（1012条）。相続人は執行を妨げる処分ができない（1013条）。なれないのは未成年者と破産者だけ（1009条）。推定相続人や受遺者はなれる。

試験で「公正証書遺言には、証人のほかに立会人が必要」と書いてあったら×。
試験で「推定相続人は遺言執行者になれない」と書いてあったら×。

## 法律（2枚目）

成年は18歳。15歳と成年を、行為ごとに分ける。

- 自分の遺言: 15歳に達すればできる。法定代理人の同意は不要（961条）。15歳以上18歳未満でも、自分の遺言はできる。
- 他人の遺言の証人・立会人: 未成年者はなれない（974条）。15歳では足りず、成年が要る。
- 遺言執行者: 未成年者はなれない（1009条）。15歳で遺言は書けても、執行者にはなれない。破産者もなれない。
- 普通養子: 養子となる者が15歳未満のときは、法定代理人が代わって承諾する（797条）。15歳以上は、本人が承諾する。養親は成年でなければならない（792条）。15歳では養親になれない。
- 特別養子: 養子となる者は、原則として15歳未満（817条の5）。15歳に達する前から引き続き養育され、やむを得ない事由で15歳までに申立てがされなかったときは、18歳に達するまでできる。これが例外。原則を「15歳以上」と書かない。
- 認知: 認知する父または母が未成年者または成年被後見人でも、法定代理人の同意は要らない（780条）。ここが緩い。ただし、成年の子を認知するには、その子の承諾が要る（782条）。胎児を認知するには、母の承諾が要る（783条）。

試験で「15歳なら証人になれる」と書いてあったら×。
試験で「15歳なら遺言執行者になれる」と書いてあったら×。
試験で「未成年者の認知には、法定代理人の同意が必要」と書いてあったら×。
試験で「特別養子は、15歳以上が原則」と書いてあったら×。

## 配役（両枚共通。入れ替えない）

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 正しい行為をする側 | いい役 | 遺言者（自分の遺言を残したい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 1枚目は証人ブロックの外、遺言書の側に1体。2枚目は「自分の遺言は15歳」のブロックに1体。本文を隠さない |
| 成年になって引き受ける側 | いい役 | 成年者（証人または遺言執行者になりたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 1枚目は遺言執行者のブロックに1体。2枚目は「成年が要る」側に1体 |
| 誤った主張 | 悪い役 | 誤った主張をする側（15歳で証人になれる、認知に同意が要る、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。ブロックの中に置かない |
| 案内 | いい役 | 案内（注記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。各枚1体。緑の講師スーツ（白シャツ・ズボン・靴）。帽子は頭の上の独立した薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり |

医師・警察官・船長は人物にしない。聴診器の札、警察官の書類、船の書類で見せる。過去の辻さんと代さんは、この2枚には置かない。

## GPT Image プロンプト（1枚目）

```text
参照必須: ぴっちゅは pitchi_sheet.png。タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps between boxes. No left-right debate panels. No center table.
Title: 証人・立会人・遺言執行者は、別人
Subtitle: 証人の立会いは、立会人ではない
Three horizontal blocks.
Block 1 title: 証人（遺言をするとき）
Text: 方式が真正かを確認し、署名押印する。公正証書と秘密証書は2人。危急時は3人。自筆証書には不要（969条・970条・976条）。
Block 2 title: 立会人（遺言をするとき）
Text: 証人とは別の人。成年被後見人が一時回復して遺言するときは医師2人（973条）。隔離者は警察官1人と証人1人以上（977条）。在船者は船長または事務員1人と証人2人以上（978条）。欠格は証人と同じ（974条）。
Block 3 title: 遺言執行者（死亡したあと）
Text: 内容を実現する。必須ではない。指定または家庭裁判所の選任（1006条）。未成年者と破産者はなれない（1009条）。推定相続人や受遺者はなれる。
Small scene under block 1: a will document and two signature seals. ぴっちゅ stands beside the will, label 遺言者（自分の遺言を残したい）. Do not draw extra people as the witnesses.
Small scene under block 2: a stethoscope card, a police document, and a ship document. No extra characters.
Small scene under block 3: タスク亀 holding a sealed estate folder, label 遺言執行者（死亡後に内容を実現したい）.
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（証人のほかに立会人が要る、とする）:
試験で「公正証書遺言には、証人のほかに立会人が必要」と書いてあったら×。
試験で「推定相続人は遺言執行者になれない」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 公正証書の「証人2人以上の立会い」は、証人が立ち会うこと。
Do not print any brand name, account name, or app name. Do not cover the text with characters, arrows, or the pointer.
```

## GPT Image プロンプト（2枚目）

```text
参照必須: ぴっちゅは pitchi_sheet.png。タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps between boxes. No left-right debate panels. No center table.
Title: 15歳で足りるか、成年が要るか
Subtitle: 成年は18歳。行為ごとに分ける
Four blocks, two by two.
Block 1, teal: 自分の遺言は15歳
Text: 15歳に達すればできる。法定代理人の同意は不要（961条）。15歳以上18歳未満でも、自分の遺言はできる。
ぴっちゅ in this block only, label 遺言者（自分の遺言を残したい）.
Block 2, navy: 証人・立会人・遺言執行者は成年
Text: 未成年者はなれない（974条・1009条）。15歳で遺言は書けても、証人にも執行者にもなれない。執行者は破産者もなれない。
タスク亀 in this block only, label 成年者（証人または執行者になりたい）.
Block 3: 縁組は、15歳で本人か代諾かが分かれる
Text: 普通養子。15歳未満は法定代理人が代わって承諾する（797条）。15歳以上は本人が承諾する。養親は成年（792条）。特別養子の子は、原則15歳未満（817条の5）。例外は、15歳前から養育され、やむを得ず15歳までに申立てがされなかったときで、18歳に達するまで。
Block 4, green: 認知する側は、未成年でも同意不要
Text: 認知する父または母が未成年者または成年被後見人でも、法定代理人の同意は要らない（780条）。成年の子を認知するには、その子の承諾が要る（782条）。胎児を認知するには、母の承諾が要る（783条）。
Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（15歳なら何でもできる、とする）:
試験で「15歳なら証人になれる」と書いてあったら×。
試験で「15歳なら遺言執行者になれる」と書いてあったら×。
試験で「未成年者の認知には、法定代理人の同意が必要」と書いてあったら×。
試験で「特別養子は、15歳以上が原則」と書いてあったら×。
Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 緩いのは、認知する側の同意。される側が成年なら、本人の承諾は要る。
Do not print any brand name, account name, or app name. Do not cover the text with characters, arrows, or the pointer.
```

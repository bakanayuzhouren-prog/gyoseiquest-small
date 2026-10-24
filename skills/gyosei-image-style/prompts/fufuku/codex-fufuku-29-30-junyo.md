# Codex用 — 弁明書は、再調査にもある？

関連: LEC公開3・問42。審査請求の流れそのものは `assets/images/deepdive/learn/gyoseihou/shinriin-nagare.png` にある。この枚は描き直さない。新しい1枚は、29条と30条が再調査と再審査に準用されるか。

横長の表1枚。3行。見本の密度は `genkoku-nashi.png`。試験の×は下に1行。ちゃちゃロットは下余白に1体。せりふは足さない。指し棒は表の中に入れない。

- 保存先: `assets/images/deepdive/learn/gyoseihou/saichousa-saishinsa-shomen.png`
- 画像キー: `learn/gyoseihou/saichousa-saishinsa-shomen`
- 生成は Codex。Cursor は描かない。
- PNGのアプリ載せは、できてからてらしぃが載せるまでしない。

## 法律

e-Gov。行政不服審査法29条、30条、61条、66条1項。確認日 2026-10-24。正本は `data/knowledge/canonical/gyofuku-29-30-junyo.md`。

- 審査請求。29条1項は、写しを直ちに処分庁等へ送る。審査庁が処分庁等なら送らない。29条2項は、相当の期間を定めて弁明書の提出を求める。29条5項は、弁明書を審査請求人および参加人へ送る。30条1項は、審査請求人が反論書を提出できる。30条2項は、参加人が意見書を提出できる。30条3項は、反論書を参加人および処分庁等へ、意見書を審査請求人および処分庁等へ送る。
- 再調査。61条の準用に、29条も30条も入っていない。
- 再審査。66条1項は第2章を準用し、その除外の中に、29条（1項を除く）と30条1項がある。29条1項は準用される。29条2項以下は準用されない。30条1項は準用されない。30条2項と30条3項は準用される。
- 「再審査は29条と30条が全部準用される」と短くしない。

図に書かない。審理員の指名から裁決までの全手順。聴聞の主宰者。語群の番号。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（再調査の行を指す。せりふで表を繰り返さない。指し棒は表に入れない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と試験の×を隠さない |

場面役は置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。見本の密度: assets/images/deepdive/learn/gyosho/genkoku-nashi.png
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 3 data rows. No side panels. No bottom cards. No answer bar. No subtitle.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. A cell may wrap. If a cell needs more than two lines, make that row taller. Do not shrink the type.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one test line for one guide.

Title, one short question: 弁明書は、再調査にもある？
Header, navy: 申立て | 写しを直ちに送る | 弁明書・反論書・意見書
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white. Not by column.
Row 1: 審査請求 | ある。審査庁が処分庁等なら送らない（29条1項） | 弁明書を求め、審査請求人と参加人へ送る（29条2項・5項）。反論書は提出できる（30条1項）。意見書は提出できる（30条2項）。各書面は相手と処分庁等へ送る（30条3項）
Row 2: 再調査の請求 | 準用されない | 29条も30条も、準用されない（61条）
Row 3: 再審査請求 | 準用される（29条1項） | 29条は1項だけ準用される。2項以下は準用されない。30条は1項が準用されず、2項と3項は準用される（66条1項）
Each cell keeps its sentences. Do not shorten row 3 to 「一部を除いて準用」. Do not shrink type. Print 「29条は1項だけ準用される。2項以下は準用されない。30条は1項が準用されず、2項と3項は準用される」 in full.
Under the table, one line only: 試験で「再調査の請求にも、反論書と意見書の規定が準用される」と書いてあったら×。
Do not repeat that line in the title or in the cells.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the 再調査の請求 row from outside the table. The pointer does not enter any cell and does not cross any glyph. No speech balloon. Do not cover the table or the test line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 審査請求は、写しを直ちに送る。審査庁が処分庁等なら送らない。弁明書、反論書、意見書がある
- [ ] 再調査は、29条も30条も準用されない（61条）
- [ ] 再審査は、29条1項と30条2項・3項が準用される。29条2項以下と30条1項は準用されない（66条1項）。「一部準用」だけになっていたら不合格
- [ ] 試験の×は、再調査にも反論書と意見書が準用される
- [ ] 指し棒が表の文字に掛かっていない
- [ ] 文字は縮んでいない。行は白と薄いグレーの交互
- [ ] ブランド印字なし。名簿外なし

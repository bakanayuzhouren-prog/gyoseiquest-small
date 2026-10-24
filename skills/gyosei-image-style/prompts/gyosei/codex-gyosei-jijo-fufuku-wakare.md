# Codex用 — 事情裁決は、どの不服申立てでできる？

横長の表1枚。4行。見本の密度は `genkoku-nashi.png`。横長の構図だけ `jijo-saiketsu-hanketsu.png` を見る。その図の条文番号は写さない。事情裁決の列は○と×の記号だけ。条件は表の下に1回。ちゃちゃロットは下余白に1体。せりふは足さない。

- 状態: 未生成
- 保存先: `assets/images/deepdive/learn/gyosei/jijo-fufuku-wakare.png`
- 画像キー: `learn/gyosei/jijo-fufuku-wakare`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` を付けない。
- 上書きしない: `jijo-saiketsu-hanketsu.png`。このプロンプトに上書き対象は付けない。

## 法律

e-Gov。行政不服審査法（平成26年法律第68号）45条3項、49条3項、58条、59条、60条、61条、64条4項、66条1項。確認日 2026-10-23。正本は `data/knowledge/canonical/jijo-hanketsu-shikko-teishi.md`。

- 処分についての審査請求。処分が違法又は不当でも、取り消し、又は撤廃することにより公の利益に著しい障害を生ずる場合、損害の程度、賠償又は防止の程度及び方法、その他一切の事情を考慮し、処分を取り消し、又は撤廃することが公共の福祉に適合しないと認めるときは、審査請求を棄却することができる（45条3項）。棄却は任意。選んだときは、裁決の主文で、当該処分が違法又は不当であることを宣言しなければならない。宣言は、事情裁決を選んだ場合の義務。
- 不作為についての審査請求。理由があるときは、裁決で、当該不作為が違法又は不当である旨を宣言する（49条3項）。事情裁決による棄却ではない。
- 再調査の請求。不適法なら却下、理由がなければ棄却（58条）。理由があれば、処分は取消し又は変更、事実上の行為は違法又は不当の宣言と撤廃又は変更（59条1項・2項）。60条は決定書。61条の準用列挙に45条はない。事情裁決ではない。
- 再審査請求。原裁決等が違法又は不当でも、取り消し、又は撤廃することが公共の福祉に適合しないと認めるときは、再審査請求を棄却することができる（64条4項）。棄却は任意。選んだときは、裁決の主文で、当該原裁決等が違法又は不当であることを宣言しなければならない。
- 66条1項は、第二章の審理手続を再審査請求に準用する規定である。45条から49条は準用対象から除く。66条に事情裁決の項はない。図のどこにも66条と書かない。

図に書かない。行訴法31条の事情判決。執行停止。46条の認容。65条の再審査の認容。考慮事項の全文の繰り返し。棄却しなければならない、という書き方。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（再審査請求の行を指す。せりふで表を繰り返さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と下の条件を隠さない |

カチャドクロ、ぴっちゅ、タスク亀は置かない。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。見本の密度: assets/images/deepdive/learn/gyosho/genkoku-nashi.png。横長の構図だけ: assets/images/deepdive/learn/gyosei/jijo-saiketsu-hanketsu.png。その図の条文番号は写さない。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: one table, exactly 4 data rows. No side panels. No bottom cards. No answer bar. No subtitle.
Quality: slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs. Do not shrink type to fit. A cell may wrap to two lines.
Canvas: fully opaque warm off-white, landscape 3:2. Wide margins. Leave a bottom margin under the one condition line for one guide.

Title, one short question: 事情裁決は、どの不服申立てでできる？
Header, navy: 不服申立て | 事情裁決 | どう処理する？
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray. Not by column.
Row 1: 処分についての審査請求 | ○ | 45条3項。処分を取り消し、又は撤廃せずに棄却できる。選んだら、主文で処分の違法又は不当を宣言しなければならない
Row 2: 不作為についての審査請求 | × | 49条3項。理由があれば、不作為の違法又は不当を宣言する。事情裁決による棄却ではない
Row 3: 再調査の請求 | × | 58条・59条。理由があれば、取消し・変更等の決定をする。事実上の行為についての宣言（59条2項）も事情裁決ではない
Row 4: 再審査請求 | ○ | 64条4項。原裁決等を取り消し、又は撤廃せずに棄却できる。選んだら、主文で原裁決等の違法又は不当を宣言しなければならない
The middle column is only the symbol ○ or ×. ○ is teal. × is red. Do not write ある or ない in that column.
Under the table, one line only: ○でも、違法・不当なら必ず棄却するわけではない。取消し・撤廃による公の利益への著しい障害などを考慮し、公共の福祉に適合しないと認めるとき、棄却できる。
Do not repeat that line in the title or in the cells. In the two ○ rows, 棄却できる is optional, and 宣言しなければならない is required only when that dismissal is chosen.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the 再審査請求 row. No speech balloon. Do not cover the table or the condition line. No nameplate.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 4行。事情裁決は、処分の審査請求と再審査請求だけ○。不作為と再調査は×
- [ ] 再審査請求は64条4項。図のどこにも66条がない
- [ ] ○の行は、棄却できる、と、選んだら宣言しなければならない、が両方読める
- [ ] 下の条件は1回。表の中で公の利益の文を繰り返していない
- [ ] 文字は縮んでいない。行は白と薄いグレーの交互
- [ ] 案内役は下余白。せりふで表を繰り返さない
- [ ] ブランド印字なし。名簿外なし

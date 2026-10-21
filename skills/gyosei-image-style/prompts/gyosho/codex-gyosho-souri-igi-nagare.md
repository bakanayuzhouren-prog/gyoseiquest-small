# 総理の異議は、いつ効く？

手順は横一列。箱は段階の名前だけ。異議の効力は、上下からの矢印コメント。異議を、必ず通る5番目の箱にしない。抗告が係属してから効く、とも書かない。

- 状態: やり直し。箱とコメントは維持し、下余白に案内役を1体足す。
- 保存先: assets/images/deepdive/learn/gyosho/souri-igi-nagare.png
- 上書き対象: assets/images/deepdive/learn/gyosho/souri-igi-nagare.png
- 画像キー: learn/gyosho/souri-igi-nagare
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。
- 上書きしない: `assets/images/deepdive/fufuku/shikko-teishi-torikeshi-26.png`

## PRE-GENERATE-CHECK（行政事件訴訟法25条8項、27条）

e-Gov（昭和37年法律第139号）。確認日 2026-10-20。正本は `data/knowledge/canonical/gyosho-shikko-teishi-teiki.md`。

27条1項は、執行停止の申立てがあった場合に、内閣総理大臣が裁判所に異議を述べることができる。執行停止の決定があった後も、同様である。

27条4項は、異議があったときは、裁判所は執行停止をすることができない。すでに執行停止の決定をしているときは、これを取り消さなければならない。

27条5項は、決定後の異議を、その決定をした裁判所に述べる。その決定への抗告が抗告裁判所に係属しているときは、抗告裁判所に述べる。

27条6項は、やむをえない場合でなければ述べてはならない。述べたときは、次の常会において国会に報告しなければならない。

25条8項は、執行停止の決定に対する即時抗告が、その決定の執行を停止する効力を有しない。

取消訴訟を提起しただけでは、27条1項の異議は始まらない。申立て後・決定前の効力は「することができない」。決定後の効力は「取り消さなければならない」。抗告の係属は、効き始める時点ではなく、宛先が変わる時点である。

書かない。決定前の異議は効力がない。抗告が係属してから異議が有効になる。抗告の係属を、申立てと決定の間に置くこと。抗告の係属中は異議ができない、と書くこと。抗告の係属中は執行停止をすることができない、と書くこと。報告は抗告の後だけ。即時抗告で執行停止の効力が止まる。箱を二段に折り返す。箱の中へ効力の文を詰め込む。ブランド名。案内役の名札。底部の判断軸、ひっかけ、暗記。同じ文の繰り返し。案内役を箱や報告の文に重ねること。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（報告の行を指す） | ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png` | 下余白の右に1体。小さい。緑の講師スーツ（白シャツ、緑のズボン、靴）。帽子は頭の上の独立した薄い水色。指し棒で報告の行を指す。箱と文を隠さない。名札は書かない |

## 印字してよい文字

- タイトル: `総理の異議は、いつ効く？`
- 箱1: `取消訴訟の提起`
- 箱1の上: `異議を述べる定めはない`
- 箱2: `執行停止の申立て`
- 箱2の下: `異議を述べると、執行停止をすることができない（27条4項）`
- 箱3: `執行停止の決定`
- 箱3の下: `異議を述べると、決定を取り消さなければならない（27条4項）`
- 箱4: `抗告が抗告裁判所に係属`
- 箱4の上: `係属中も異議はできる。抗告裁判所に述べる（27条5項）。即時抗告があっても、決定の効力は止まらない（25条8項）`
- 列の下: `異議を述べたときは、次の通常国会（常会）で報告しなければならない。やむをえない場合でなければ、述べてはならない（27条6項）`

## GPT Image プロンプト

```text
Japanese legal-study infographic, warm off-white background, navy and teal. Very large gothic type. One sheet, 16:9. One horizontal row. No second row. No bottom cards. No answer band that repeats the comments.

One guide only, in the bottom-right margin, small. Match assets/images/characters/chachalot.png, assets/approved-smiling-hat-mascot.png, and assets/approved-chachalot-pointer.png. Role: guide, pointing at the report line under the row. Good side. Green lecturer suit with white shirt, green trousers, and shoes. The hat is a separate pale-blue hat on the head, with a smiling closed-eye face on the hat and a long brim. Wooden pointer. Do not cover the boxes, arrows, or the report line. Do not print a nameplate. One body only. Not a scene character.

Title, a short question: 総理の異議は、いつ効く？

Four boxes in one row, left to right, with arrows between them. Each box contains only its name. Comments sit outside the boxes, each joined by a short arrow. Wide gaps. Do not wrap the row.

Box 1: 取消訴訟の提起
Comment above box 1: 異議を述べる定めはない

Box 2: 執行停止の申立て
Comment below box 2: 異議を述べると、執行停止をすることができない（27条4項）

Box 3: 執行停止の決定
Comment below box 3: 異議を述べると、決定を取り消さなければならない（27条4項）

Box 4: 抗告が抗告裁判所に係属
Comment above box 4: 係属中も異議はできる。抗告裁判所に述べる（27条5項）。即時抗告があっても、決定の効力は止まらない（25条8項）

One line under the row: 異議を述べたときは、次の通常国会（常会）で報告しなければならない。やむをえない場合でなければ、述べてはならない（27条6項）

Do not print that an objection before the stay decision has no effect. Do not print that the objection becomes effective only after the appeal is pending. Do not place the pending appeal between the application and the stay decision. Do not print that an objection is unavailable while the appeal is pending. Do not print that a stay cannot be ordered while the appeal is pending.

No brand name, no watermark, no logo. No nameplate on the guide.
```

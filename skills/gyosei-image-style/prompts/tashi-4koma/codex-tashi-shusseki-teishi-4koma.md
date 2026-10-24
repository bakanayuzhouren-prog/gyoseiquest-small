# Codex用 — 地方議会議員の出席停止。議会の懲罰は、裁判で争えるか

関連: 合格革命第1回・問41。地方自治の本旨（住民自治と団体自治）は、フッターの1行だけ。出席停止の結論を、本旨の定義で置き換えない。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/kenpou/shusseki-teishi-4koma.png`
- 上書き対象: `assets/images/deepdive/learn/kenpou/shusseki-teishi-4koma.png`
- 画像キー: `learn/kenpou/shusseki-teishi-4koma`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

最大判令和2年11月25日。地方議会が議員に科した出席停止の懲罰は、議会の自律を理由に、司法審査が一切及ばない内部行為ではない。裁判で争うことができる。

この図では、その懲罰が本案で違法だったかどうかは断定しない。聞く一点は、司法審査が及ぶかである。

地方自治の本旨は、住民自治と団体自治である。住民自治だけ、又は団体自治だけ、ではない。

試験で「議会の自律だから、出席停止は一切裁判で争えない」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 懲罰する側 | 悪い役 | 議会（出席停止は内部のことで、裁判に載せたくない） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 1コマだけ |
| 争う側 | いい役 | 議員（出席停止を裁判で争いたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

3コマと4コマには場面役を置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards.

Title: 地方議会議員の出席停止。議会の懲罰は、裁判で争えるか
Subtitle: 最大判令和2年11月25日

Panel 1 title: 議会が出席停止にした
カチャドクロ holds a discipline paper. Label: 議会（裁判に載せたくない）
Caption: 地方議会は、議員に出席停止の懲罰を科した。

Panel 2 title: 議員は、裁判で争いたい
ぴっちゅ stands outside the assembly door. Label: 議員（出席停止を裁判で争いたい）
Caption: 議員は、議場に出られない不利益を、裁判所で争いたい。

Panel 3 title: 議会の内部だけで終わるか
No character. Caption: 見るのは、出席停止が、議会の自律だけを理由に、裁判所の審査が及ばない内部行為か。

Panel 4 title: 司法審査は及ぶ
No character. Caption: 出席停止の懲罰は、議会の自律を理由に、司法審査が一切及ばないわけではない。裁判で争うことができる。

Footer, two short lines:
地方自治の本旨は、住民自治と団体自治である。
試験で「議会の自律だから、出席停止は一切裁判で争えない」と書いてあったら×。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers. The saved blanks are indexes only. Do not invent the missing word-bank items.
Red: 住民自治。団体自治。出席停止は、一切裁判で争えないわけではない。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

# Codex用 — 衆議院定数配分訴訟（昭和51年）。違憲なら、選挙も無効か

関連: LEC公開第1回・問41。同じ問の令和5年1月25日は、別の4コマ `shugiin-r5-4koma.png`。この図を合憲と書かない。人口比例だけが絶対基準、とも書かない。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/kenpou/shugiin-s51-4koma.png`
- 上書き対象: `assets/images/deepdive/learn/kenpou/shugiin-s51-4koma.png`
- 画像キー: `learn/kenpou/shugiin-s51-4koma`
- 上書きしない: `assets/images/deepdive/learn/kenpou/shugiin-r5-4koma.png`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

最大判昭和51年4月14日。昭和47年の衆議院議員総選挙について、選挙区間の投票価値の較差が約5倍に達する定数配分は、憲法の要求する投票価値の平等に反し、違憲である。ただし、選挙自体は無効としない（事情判決）。

投票価値の平等は憲法上の要求である。人口比例だけが絶対の基準ではない。行政区画や地理的条件も考慮でき、国会には裁量がある。その裁量を考慮しても是認できないときに、違憲になる。この判決は、その限度を超えたとして違憲とした。違憲だから選挙も無効、ではない。

試験で「違憲だから、その選挙も無効である」と書いてあったら×。試験で「較差があっても、この判決は合憲である」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 無効にしたい側 | いい役 | 選挙人（区割りが違憲なら、選挙も無効にしたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

1コマ、3コマ、4コマには場面役を置かない。カチャドクロは置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards.

Title: 衆議院定数配分訴訟。違憲なら、選挙も無効か
Subtitle: 最大判昭和51年4月14日。昭和47年総選挙

Panel 1 title: 選挙区で、一票の重さが違った
No character. Caption: 昭和47年の衆議院議員総選挙で、選挙区間の投票価値の最大較差は、約5倍だった。選挙人は、区割りを違憲とし、選挙の無効を求めた。

Panel 2 title: 人口が同じでなければ無効、と言う
ぴっちゅ holds one ballot. Label: 選挙人（区割りが違憲なら、選挙も無効にしたい）
Caption: 選挙人は、投票価値が平等でなければ、その選挙は無効である、と言う。

Panel 3 title: 国会の裁量を超えたか
No character. Caption: 投票価値の平等は憲法上の要求である。人口比例だけが絶対の基準ではない。行政区画や地理も考慮でき、国会に裁量がある。見るのは、その裁量を超えたか。

Panel 4 title: 規定は違憲。選挙は無効にしない
No character. Caption: 約5倍の較差は、裁量を考慮しても是認できない。定数配分規定は違憲である。選挙自体は、無効としない。

Footer, one line: 試験で「違憲だから、その選挙も無効」と書いてあったら×。令和5年1月25日の合憲とは、別の判決である。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers. The saved blanks for this question lost their word-bank text. Do not invent missing items.
Red: 投票価値の平等。人口平等。行政区画・地理。合理的。国会の広範な裁量。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

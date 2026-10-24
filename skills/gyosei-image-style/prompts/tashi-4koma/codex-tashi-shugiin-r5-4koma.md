# Codex用 — 衆議院定数配分訴訟（令和5年）。2倍を超えたら違憲か

関連: LEC公開第1回・問41。昭和51年4月14日は、別の4コマ `shugiin-s51-4koma.png`。この図を違憲と書かない。2倍を超えただけで違憲、とも書かない。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/kenpou/shugiin-r5-4koma.png`
- 上書き対象: `assets/images/deepdive/learn/kenpou/shugiin-r5-4koma.png`
- 画像キー: `learn/kenpou/shugiin-r5-4koma`
- 上書きしない: `assets/images/deepdive/learn/kenpou/shugiin-s51-4koma.png`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

最大判令和5年1月25日。令和3年10月31日施行の衆議院議員総選挙（小選挙区）について、選挙当日の選挙人数の最大較差は1対2.079（鳥取県第1区と東京都第13区）だった。選挙人は、区割りが違憲で選挙も無効である、と主張した。上告は棄却された。

投票価値の平等は憲法上の要求である。絶対の基準ではなく、国会に広範な裁量がある。議員1人当たりの選挙人数又は人口をできる限り平等にすることが、最も重要かつ基本的な基準である。行政区画、面積、人口密度、地理的状況なども、合理性がある限り考慮できる。

この選挙の較差の拡大は、自然的な人口異動以外の要因による事情はうかがわれず、程度も著しくない。新区割制度の枠組みの中で、アダムズ方式による是正が予定されている。投票価値の平等の要求に反する状態には至っていない。区割規定は、憲法14条1項等に違反しない。

試験で「2倍を超えたら違憲である」と書いてあったら×。試験で「人口に比例することだけが、絶対の基準である」と書いてあったら×。昭和51年の違憲・事情判決と混ぜない。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 無効にしたい側 | いい役 | 選挙人（2倍を超えたのだから、選挙を無効にしたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

1コマ、3コマ、4コマには場面役を置かない。カチャドクロは置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards.

Title: 衆議院定数配分訴訟。2倍を超えたら違憲か
Subtitle: 最大判令和5年1月25日。令和3年10月31日総選挙

Panel 1 title: 最大較差は、1対2.079
No character. Caption: 令和3年10月31日の衆議院小選挙区選挙で、選挙人数の最大較差は1対2.079だった。2倍以上の選挙区は、29あった。

Panel 2 title: 2倍を超えたから無効、と言う
ぴっちゅ holds one ballot. Label: 選挙人（2倍を超えたのだから、選挙を無効にしたい）
Caption: 選挙人は、区割りは憲法に違反し、その選挙も無効である、と主張した。

Panel 3 title: 人口異動で広がった較差か
No character. Caption: 見るのは、較差の拡大が、自然的な人口異動以外の要因によるか。程度が、制度の合理性を失わせるほど著しいか。

Panel 4 title: 違憲状態には至っていない
No character. Caption: 拡大は自然的な人口異動によるもので、程度も著しくない。アダムズ方式による是正が、新区割制度の枠組みで予定されている。投票価値の平等に反する状態には至っておらず、憲法14条1項等に違反しない。

Footer, one line: 試験で「2倍を超えたら違憲」と書いてあったら×。昭和51年4月14日は、違憲だが選挙は無効としない、別の判決である。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers. The saved blanks for this question lost their word-bank text. Do not invent missing items.
Red: 投票価値の平等。人口平等。行政区画・地理。合理的。国会の広範な裁量。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

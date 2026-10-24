# Codex用 — 金沢市庁舎前広場事件。庁舎前の示威は、常に断れるか

関連: TAC第2回・問41。泉佐野（公の施設は原則として利用を拒めない）は、この広場には当てない。既存の左右パネル図を、この4コマで上書きする。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/naka/kenpou/kanazawa.png`
- 画像キー: `naka/kenpou/kanazawa`
- 上書き対象: `assets/images/deepdive/naka/kenpou/kanazawa.png`
- 生成は Codex。Cursor は描かない。
- 既存キーの上書きなので、新規の `[[image:]]` は付けない。

## 法律（崩すな）

最三小判令和5年2月21日（民集77巻2号273頁。損害賠償請求事件）。グループは、金沢市庁舎前広場で憲法施行70周年の集会を開くため、庁舎等管理規則の許可を申請した。市長は、特定の政策に賛成し又は反対する目的の示威行為に当たり、管理上の支障があるとして不許可にした。グループは、国家賠償を求めた。上告は棄却された。

庁舎は、主に公務の用に供する施設であり、道路や公園のように主として公衆の共同使用に供する施設ではない。広場は庁舎と一体である。政治的な対立のある論点について、威力又は気勢を示して特定の政策を訴える示威が庁舎で行われると、市が特定の立場を利しているような外観が生じ、外見上の政治的中立性が損なわれ得る。その支障を避ける目的は合理的である。禁止されるのは庁舎等でのその示威であって、公の施設の利用まで妨げない。制限は限定的である。この広場の集会に規則を適用することは、憲法21条1項に違反しない。

集会の自由は、民主主義社会で重要な人権である。公共の福祉による必要かつ合理的な制限はあり得る。思想を理由に、場所を問わず門前払いしてよい、ではない。

試験で「庁舎前なら、政治的な集会は常に拒否できる」と書いてあったら×。試験で「泉佐野と同じで、庁舎前広場も原則貸さなければならない」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 許可しない側 | いい役 | 金沢市（庁舎の外見上の政治的中立を守りたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 1コマだけ |
| 集会を開きたい側 | いい役 | 申請者（庁舎前で示威をしたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

3コマと4コマには場面役を置かない。カチャドクロは置かない。過去の辻さんと代さんは置かない。市を悪い役にしない。不許可は、この判決では憲法21条1項に違反しない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards.

Title: 金沢市庁舎前広場事件。庁舎前の示威は、常に断れるか
Subtitle: 最判令和5年2月21日

Panel 1 title: 庁舎前で集会の許可を求めた
ぴっちゅ holds a small sign reading 憲法施行70周年. Label: 申請者（庁舎前で示威をしたい）
Caption: グループは、金沢市庁舎前広場で集会を開くため、使用の許可を申請した。

Panel 2 title: 市長は不許可にした
タスク亀 holds a refusal paper. Label: 金沢市（外見上の政治的中立を守りたい）
Caption: 市長は、特定の政策に賛成し又は反対する目的の示威であり、庁舎管理上の支障があるとして、不許可にした。

Panel 3 title: 庁舎は、公園とは違う
No character. Caption: 庁舎は、主に公務の用に供する施設である。道路や公園のように、主として公衆の共同使用に供する施設ではない。広場は、庁舎と一体である。

Panel 4 title: この適用は、21条に違反しない
No character. Caption: 威力又は気勢を示して特定の政策を訴える示威は、市が特定の立場を利しているような外観を生じ得る。この広場への適用は、憲法21条1項に違反しない。公の施設の利用まで禁じるものではない。

Footer, one line: 試験で「庁舎前なら政治的な集会は常に拒否できる」と書いてあったら×。泉佐野（公の施設は、正当な理由がなければ拒めない）と混ぜない。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers.
Red: 管理上の支障。政治的中立性。民主主義。必要かつ合理的。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

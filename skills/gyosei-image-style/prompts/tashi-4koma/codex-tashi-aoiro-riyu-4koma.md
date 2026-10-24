# Codex用 — 青色申告の更正。理由の記載を欠くと、更正はどうなるか

関連: LEC公開第2回・問43。同じ問の旅券は `ryoken-riyu-4koma.png`、一級建築士は `kenchikushi-riyu-4koma.png`。この図は、所得税の青色申告の更正に限る。根拠の条文だけで足りる、と書かない。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/tetsuzuki/aoiro-riyu-4koma.png`
- 画像キー: `learn/tetsuzuki/aoiro-riyu-4koma`
- 上書きしない: `assets/images/deepdive/learn/tetsuzuki/ryoken-riyu-4koma.png` `assets/images/deepdive/learn/tetsuzuki/kenchikushi-riyu-4koma.png`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

最二小判昭和38年5月31日（民集17巻4号617頁）。法が行政処分に理由を附記すべきものとしているのは、処分庁の判断の慎重と合理性を担保して恣意を抑えるとともに、処分の理由を相手方に知らせて不服の申立てに便宜を与えるためである。その記載を欠くときは、処分自体が取消しを免れない。

どの程度書くかは、処分の性質と、理由附記を命じた法律の趣旨による。所得税の青色申告の更正では、帳簿書類の記載以上に信憑力のある資料を摘示して、処分の具体的根拠を明らかにする。記載自体から納税者が知り得ない記載は、理由附記として足りない。

試験で「根拠の条文を書けば足りる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 更正する側 | 悪い役 | 税務署（具体的根拠を書かず更正したい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 1コマだけ |
| 争う側 | いい役 | 納税者（何を根拠に更正されたか知りたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

3コマと4コマには場面役を置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards.

Title: 青色申告の更正。理由の記載を欠くと、更正はどうなるか
Subtitle: 最判昭和38年5月31日

Panel 1 title: 青色申告を、更正した
カチャドクロ holds a correction notice with a blank reason box. Label: 税務署（具体的根拠を書かず更正したい）
Caption: 税務署は、所得税の青色申告について更正した。通知の理由は、納税者が記載自体から具体的根拠を知り得ないものだった。

Panel 2 title: 何を根拠にしたのか
ぴっちゅ looks at the blank reason box. Label: 納税者（何を根拠に更正されたか知りたい）
Caption: 納税者は、帳簿の記載を超える資料が示されていないので、更正の理由が分からない、と言う。

Panel 3 title: 理由附記は、何のためか
No character. Caption: 理由を書かせるのは、判断の慎重と合理性を担保して恣意を抑え、不服の申立てに便宜を与えるためである。

Panel 4 title: 記載を欠く更正は、取消しを免れない
No character. Caption: 青色申告の更正では、帳簿書類の記載以上に信憑力のある資料を摘示し、具体的根拠を明らかにする。その記載を欠くときは、更正自体が取消しを免れない。

Footer, one line: 試験で「根拠の条文を書けば足りる」と書いてあったら×。旅券の発給拒否と、一級建築士の免許取消しは、別の判決である。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers. This image carries only the blank that belongs to the blue-return reassessment. The passport blanks and the architect blank stay on their own images.
Red: 理由そのもの。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

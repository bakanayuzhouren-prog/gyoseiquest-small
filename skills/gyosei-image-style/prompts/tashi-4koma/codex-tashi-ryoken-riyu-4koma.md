# Codex用 — 一般旅券の発給拒否。根拠の条文だけを書けば足りるか

関連: LEC公開第2回・問43。青色申告の更正は `aoiro-riyu-4koma.png`、一級建築士は `kenchikushi-riyu-4koma.png`。根拠規定を示すだけで足りる、と結論に書かない。事実関係を当然知りうる例外は、フッターに1行だけ置く。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/tetsuzuki/ryoken-riyu-4koma.png`
- 上書き対象: `assets/images/deepdive/learn/tetsuzuki/ryoken-riyu-4koma.png`
- 画像キー: `learn/tetsuzuki/ryoken-riyu-4koma`
- 上書きしない: `assets/images/deepdive/learn/tetsuzuki/aoiro-riyu-4koma.png` `assets/images/deepdive/learn/tetsuzuki/kenchikushi-riyu-4koma.png`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

最判昭和60年1月22日（民集39巻1号1頁）。一般旅券の発給を拒否する通知に書く理由は、いかなる事実関係に基づき、いかなる法規を適用して拒否したかを、申請者が記載自体から了知できるものでなければならない。単に発給拒否の根拠規定を示すだけでは、その規定の適用の基礎となった事実関係をも当然に知りうる場合を除き、旅券法の要求する理由の付記として十分でない。その拒否は、違法である。

どの程度書くかは、処分の性質と、理由の付記を命じた法律の趣旨による。拒否の判断の慎重と公正を担保して恣意を抑え、拒否の理由を申請者に知らせて不服申立てに便宜を与えるためである。

試験で「根拠法令の摘示だけで足りる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 拒否する側 | 悪い役 | 外務大臣（根拠の条文だけを書いて拒否したい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 1コマだけ |
| 発給を求める側 | いい役 | 申請者（どの事実で拒否されたか知りたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

3コマと4コマには場面役を置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards.

Title: 一般旅券の発給拒否。根拠の条文だけを書けば足りるか
Subtitle: 最判昭和60年1月22日

Panel 1 title: 旅券の発給を拒否した
カチャドクロ holds a refusal notice that shows only an article number. Label: 外務大臣（根拠の条文だけを書いて拒否したい）
Caption: 外務大臣は、一般旅券の発給を拒否し、通知には根拠の規定だけを書いた。

Panel 2 title: どの事実なのか
ぴっちゅ looks at the notice. Label: 申請者（どの事実で拒否されたか知りたい）
Caption: 申請者は、どの事実に、どの法規を適用したのかが、記載からは分からない、と言う。

Panel 3 title: 記載自体から了知できるか
No character. Caption: 見るのは、いかなる事実関係に基づき、いかなる法規を適用したかが、記載自体から分かるか。

Panel 4 title: 根拠規定だけでは、原則として足りない
No character. Caption: 記載自体から了知できなければならない。根拠規定を示すだけでは、原則として、旅券法の理由の付記として十分でない。その拒否は、違法である。

Footer, one line: 試験で「根拠法令の摘示だけで足りる」と書いてあったら×。その規定の事実関係を当然に知りうる場合は、例外である。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers. This image carries the passport blanks. The blue-return blank and the architect blank stay on their own images.
Red: いかなる事実関係に基づき適用したか。根拠法令。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

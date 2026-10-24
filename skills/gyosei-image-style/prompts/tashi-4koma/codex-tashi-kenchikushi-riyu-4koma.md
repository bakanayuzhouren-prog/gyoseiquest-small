# Codex用 — 一級建築士の免許取消し。処分基準の当てはめまで書くか

関連: LEC公開第2回・問43。青色申告の更正は `aoiro-riyu-4koma.png`、旅券は `ryoken-riyu-4koma.png`。聴聞をしたから処分基準の適用は書かなくてよい、と書かない。理由の提示の不備は、後日の説明では治癒しない。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/tetsuzuki/kenchikushi-riyu-4koma.png`
- 上書き対象: `assets/images/deepdive/learn/tetsuzuki/kenchikushi-riyu-4koma.png`
- 画像キー: `learn/tetsuzuki/kenchikushi-riyu-4koma`
- 上書きしない: `assets/images/deepdive/learn/tetsuzuki/aoiro-riyu-4koma.png` `assets/images/deepdive/learn/tetsuzuki/ryoken-riyu-4koma.png`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

最判平成23年6月7日（民集65巻4号2081頁）。行政手続法14条1項本文が、不利益処分のときに理由を名宛人に示さなければならないとしているのは、判断の慎重と合理性を担保して恣意を抑えるとともに、処分の理由を知らせて不服の申立てに便宜を与えるためである。

どの程度示すかは、根拠法令の内容、処分基準の有無・内容・公表の有無、処分の性質と内容、原因となる事実を総合して決める。一級建築士の免許取消しでは、複雑な処分基準が定められ、公にされていた。通知には、根拠規定と非違行為の概要はあったが、処分基準の適用関係はなかった。どの処分基準の適用で免許取消しが選ばれたかが分からないときは、理由の提示として十分でなく、処分は違法で、取消しを免れない。

聴聞があったから、処分基準の適用を書かなくてよい、ではない。戒告、業務停止、免許取消しのどれを選ぶかは処分庁の裁量に委ねられる、というのは前提である。この判決の芯は、理由をどこまで書くかである。

試験で「聴聞をしたから、処分基準の適用は書かなくてよい」と書いてあったら×。試験で「根拠法令と非違行為の概要だけで足りる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 取り消す側 | 悪い役 | 国（根拠と非違の概要だけを書いて、免許を取り消したい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 1コマだけ |
| 争う側 | いい役 | 一級建築士（どの処分基準で取消しになったか知りたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

3コマと4コマには場面役を置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards.

Title: 一級建築士の免許取消し。処分基準の当てはめまで書くか
Subtitle: 最判平成23年6月7日

Panel 1 title: 免許取消しの通知
カチャドクロ holds a cancellation notice. Label: 国（根拠と非違の概要だけを書いて、免許を取り消したい）
Caption: 国は、一級建築士の免許を取り消した。通知には、根拠規定と非違行為の概要はあった。処分基準のどれを適用したかは、書いていなかった。

Panel 2 title: なぜ取消しなのか
ぴっちゅ holds an architect license. Label: 一級建築士（どの処分基準で取消しになったか知りたい）
Caption: 建築士は、戒告や業務停止ではなく、なぜ免許取消しなのかが分からない、と言う。処分基準は、複雑で、公にされていた。

Panel 3 title: 基準の当てはめが見えるか
No character. Caption: 見るのは、根拠法令と事実だけでは、どの処分基準の適用で免許取消しが選ばれたかが分かるか（行政手続法14条1項）。

Panel 4 title: 適用関係がなければ、理由の提示として足りない
No character. Caption: この事情では、処分基準の適用関係が示されていないので、理由の提示として十分でない。免許取消しは違法で、取消しを免れない。

Footer, one line: 試験で「聴聞をしたから、処分基準の適用は書かなくてよい」と書いてあったら×。試験で「根拠法令と非違の概要だけで足りる」と書いてあったら×。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers. This image carries the architect blank. The blue-return blank and the passport blanks stay on their own images.
Red: 処分基準の適用関係。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

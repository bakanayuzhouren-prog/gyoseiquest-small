# Codex用 — 不作為の審査請求。監督のない知事へ出しても、応答義務は生じるか

関連: TAC第2回・問42。申請の中身（何の許可か）は、正本で断定していない。図に許可の種類を書かない。審査請求先の原則と、誤った先の効果だけを描く。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/fufuku/fusakui-seikyusaki-4koma.png`
- 画像キー: `learn/fufuku/fusakui-seikyusaki-4koma`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

最判令和3年1月22日。不作為についての審査請求は、原則として、不作為庁の上級行政庁に対してする（行政不服審査法4条1号）。監督関係のない知事へ出しても、本来の不作為庁に応答義務は生じない。その場合、不作為の違法確認の訴え（行政事件訴訟法3条5項）は、不適法となり得る。

請求先を間違えても、補正すれば常に適法になる、とは書かない。審査請求なしで、不作為の違法確認の訴えが常に適法、とも書かない。

試験で「監督のない知事へ出しても、本来の庁に応答義務が生じる」と書いてあったら×。試験で「請求先を間違えても、訴えは常に適法である」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 誤った先 | 悪い役 | 監督関係のない知事（審査請求を受けても、本来の庁の義務にはしたくない） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 2コマだけ |
| 請求する側 | いい役 | 申請者（応答がないので、審査請求をしたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 1コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

3コマと4コマには場面役を置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards. Do not name a specific permit.

Title: 不作為の審査請求。監督のない知事へ出しても、応答義務は生じるか
Subtitle: 最判令和3年1月22日

Panel 1 title: 申請に、応答がない
ぴっちゅ holds an application. Label: 申請者（応答がないので、審査請求をしたい）
Caption: 申請者は、申請に対する応答がないとして、審査請求をしようとした。

Panel 2 title: 監督のない知事へ出した
カチャドクロ sits at a wrong counter. Label: 監督関係のない知事（本来の庁の義務にはしたくない）
Caption: 申請者は、不作為庁を監督しない知事へ、審査請求を出した。

Panel 3 title: 誰に出せば、応答義務が生じるか
No character. Caption: 不作為の審査請求は、原則として、不作為庁の上級行政庁に対してする（行政不服審査法4条1号）。

Panel 4 title: 誤った先では、義務も訴えも動かない
No character. Caption: 監督関係のない相手へ出しても、本来の不作為庁に応答義務は生じない。不作為の違法確認の訴えは、不適法となり得る。

Footer, one line: 試験で「監督のない知事へ出しても、本来の庁に応答義務が生じる」と書いてあったら×。試験で「請求先を間違えても、訴えは常に適法」と書いてあったら×。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers.
Red: 上級行政庁。不作為の違法確認の訴え。応答義務。不適法。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

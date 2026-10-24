# Codex用 — 裁決のあと、同じ理由でまた拒否できるか

関連: TAC第1回・問43。通称は正本にない。事件名は新たに付けない。タイトルは、場面の問いとする。自治事務と法定受託事務の関与を、同じ強さにしない。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/jichi/kanyo-r5-4koma.png`
- 上書き対象: `assets/images/deepdive/learn/jichi/kanyo-r5-4koma.png`
- 画像キー: `learn/jichi/kanyo-r5-4koma`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

最一小判令和5年9月4日。法定受託事務に係る都道府県知事の処分を取り消す裁決のあと、知事が同一の理由で申請を認容しないことは、地方自治法245条の7第1項の法令違反に当たり得る。

審査請求は、簡易迅速に、国民の権利利益の救済を図る。処分庁と審査庁の関係は、上級行政庁である。自治事務について、同じ強さの関与がある、とは書かない。申請の種類は、この図では断定しない。

試験で「裁決で取り消しても、同じ理由で再び拒否してよい」と書いてあったら×。試験で「自治事務も法定受託事務も、関与の強さは同じ」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 再び拒否する側 | 悪い役 | 都道府県知事（裁決のあと、同じ理由でまた拒否したい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 2コマだけ |
| 認容を求める側 | いい役 | 申請者（取り消された理由では、もう拒否されたくない） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 1コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

3コマと4コマには場面役を置かない。過去の辻さんと代さんは置かない。申請の種類の札は置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards. Do not invent a case nickname. Do not name a specific application.

Title: 裁決のあと、同じ理由でまた拒否できるか
Subtitle: 最判令和5年9月4日。法定受託事務

Panel 1 title: 知事の拒否を、裁決が取り消した
ぴっちゅ holds an application and a cancellation decision. Label: 申請者（同じ理由では、もう拒否されたくない）
Caption: 法定受託事務について、都道府県知事がした処分を、裁決が取り消した。

Panel 2 title: 知事は、同じ理由で認容しない
カチャドクロ holds the same refusal paper. Label: 都道府県知事（同じ理由でまた拒否したい）
Caption: 知事は、裁決のあとにも、同一の理由で申請を認容しない。

Panel 3 title: 裁決に、処分庁は従うか
No character. Caption: 見るのは、法定受託事務の処分を取り消す裁決のあと、処分庁が同じ理由で再び拒否できるか。

Panel 4 title: 同じ理由の拒否は、法令違反に当たり得る
No character. Caption: 同一の理由で申請を認容しないことは、地方自治法245条の7第1項の法令違反に当たり得る。

Footer, one line: 試験で「裁決で取り消しても、同じ理由で再び拒否してよい」と書いてあったら×。自治事務の関与を、法定受託事務と同じ強さにしない。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers.
Red: 都道府県知事。簡易迅速。権利利益。上級行政庁。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

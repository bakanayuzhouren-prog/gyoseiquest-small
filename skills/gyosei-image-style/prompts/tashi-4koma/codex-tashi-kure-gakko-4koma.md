# Codex用 — 呉市学校施設使用不許可事件。支障がなくても、不許可にできるか

関連: LEC公開第1回・問43。泉佐野（公の施設は、正当な理由がなければ拒めない。最判平7.3.7）は、フッターの1行だけ。図の結論を泉佐野でひっくり返さない。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/gyosei/kure-gakko-4koma.png`
- 上書き対象: `assets/images/deepdive/learn/gyosei/kure-gakko-4koma.png`
- 画像キー: `learn/gyosei/kure-gakko-4koma`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

最判平成18年2月7日（民集60巻2号401頁）。学校の体育館・教室の目的外使用は、学校教育上の支障がなくても不許可にできる。学校施設は、道路や公民館のように公衆の共同使用に供する施設ではなく、本来学校教育のために使う行政財産である。支障は、物理的な障害に限らない。

ただし、その不許可の判断が社会通念上著しく妥当性を欠くときは、裁量の逸脱で違法になる。呉市の当該不許可は、この基準で違法とされた。不許可にできることと、その不許可が適法であることとは別である。

試験で「学校教育上の支障がなければ、許可しなければならない」と書いてあったら×。試験で「学校の体育館も、公の施設と同じで、正当な理由がなければ拒めない」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 不許可にする側 | 悪い役 | 呉市（目的外使用を不許可にしたい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 1コマだけ |
| 使いたい側 | いい役 | 申請者（体育館を目的外で使いたい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

3コマと4コマには場面役を置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards.

Title: 呉市学校施設使用不許可事件。支障がなくても、不許可にできるか
Subtitle: 最判平成18年2月7日

Panel 1 title: 体育館の目的外使用
カチャドクロ holds a school gym key. Label: 呉市（目的外使用を不許可にしたい）
Caption: 学校の体育館・教室を、学校教育以外の用途で使いたい、という申請があった。

Panel 2 title: 支障はない、と言う
ぴっちゅ points at an empty gym. Label: 申請者（体育館を目的外で使いたい）
Caption: 申請者は、授業の支障はない、だから許可しなければならない、と言う。

Panel 3 title: 学校施設は、道路とは違う
No character. Caption: 学校施設は、公衆の共同使用に供する道路や公民館ではない。本来、学校教育のための行政財産である。支障は、物理的な障害に限らない。

Panel 4 title: 不許可はできる。当該不許可は違法
No character. Caption: 学校教育上の支障がなくても、不許可にできる。ただし、社会通念上著しく妥当性を欠く不許可は、裁量の逸脱で違法になる。呉市の当該不許可は、違法である。

Footer, two short lines:
不許可にできることと、その不許可が適法であることとは別である。
試験で「支障がなければ許可しなければならない」と書いてあったら×。公の施設（正当な理由がなければ拒めない。泉佐野）と混ぜない。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers.
Red: 目的外使用は裁量。支障は物理的障害に限らない。裁量権の逸脱濫用。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

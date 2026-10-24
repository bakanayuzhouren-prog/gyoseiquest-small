# Codex用 — GPS捜査事件。同意のない位置の把握は、任意捜査か

関連: 合格革命第3回・問41。税務調査の令状不要（川崎民商）は、フッターの1行だけ。この図の結論を税務調査でひっくり返さない。

定型の左右パネルと中央表は使わない。4コマは左から右。底部カードは置かない。案内役は下余白だけ。同じ文をタイトルと各コマで繰り返さない。

- 保存先: `assets/images/deepdive/learn/kenpou/gps-sosa-4koma.png`
- 上書き対象: `assets/images/deepdive/learn/kenpou/gps-sosa-4koma.png`
- 画像キー: `learn/kenpou/gps-sosa-4koma`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。

## 法律（崩すな）

最大判平成29年3月15日。車両にGPS端末を取り付け、対象者の同意なく位置情報を継続的に取得する捜査は、個人のプライバシーを侵害する強制処分である。令状なしにはできない。強制の処分は、法律に定めがなければすることができない（刑事訴訟法197条1項ただし書）。任意捜査として許されない。

試験で「GPS捜査は任意捜査である」と書いてあったら×。試験で「税務調査も、GPSと同じで令状が必須である」と書いてあったら×。税務調査の令状不要は、別の判断である。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 令状なしで付ける側 | 悪い役 | 捜査機関（同意なく位置を取り続けたい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 1コマだけ |
| 位置を取られる側 | いい役 | 対象者（同意なく追われたくない） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 案内 | いい役 | 案内（フッターを指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。せりふなし |

3コマと4コマには場面役を置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: カチャドクロは kachadokuro_sheet.png。ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a Japanese legal-study infographic. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one horizontal row, then a short footer. No comparison table. No left-right debate panels. No bottom cards.

Title: GPS捜査事件。同意のない位置の把握は、任意捜査か
Subtitle: 最大判平成29年3月15日

Panel 1 title: 車に端末を付けた
カチャドクロ attaches a small device to a car. Label: 捜査機関（同意なく位置を取り続けたい）
Caption: 捜査機関は、対象者の同意なく、車両にGPS端末を取り付け、位置を継続的に取得した。令状はなかった。

Panel 2 title: これは任意捜査か
ぴっちゅ looks at the car. Label: 対象者（同意なく追われたくない）
Caption: 対象者は、私的な移動の様子を、同意なく取り続けられた、と言う。

Panel 3 title: プライバシーの侵害か
No character. Caption: 見るのは、個人のプライバシーを侵害する強制処分か、任意捜査か。

Panel 4 title: 令状が要る強制処分
No character. Caption: このGPS捜査は、プライバシーを侵害する強制処分である。令状が要る。法律の根拠がない強制処分はできない（刑事訴訟法197条1項ただし書）。任意捜査ではない。

Footer, one line: 試験で「GPS捜査は任意捜査である」と書いてあったら×。税務調査の令状不要は、別の判断である。

ちゃちゃロット stands in the bottom margin, outside the panels, in a green lecturer suit, white shirt, trousers, and shoes. One mascot only. Pointer does not cover the footer. No speech bubble. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.

Exam-answer color: print each of the following phrases exactly once, in large red type, inside panel 4 under the caption. Do not rephrase them. Do not print a black copy of the same phrase. All other text stays black. Do not print blank numbers. The saved blanks are indexes only. Do not invent the missing word-bank items.
Red: 継続的な位置把握は強制処分。令状が必要。憲法35条。

Do not print any brand name, account name, or app name. Do not print a mock-exam name or a question number. Do not cover the captions with characters.
```

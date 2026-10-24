# 不許可の見直しを求めた。審査庁の判断は、何？

場面が本体。申請先と審査庁は、この事例では別の行政庁。

- 状態: 生成済み（2026-10-22）。てらしぃがこの画像の修正を言うまで上書きしない
- 保存先: `assets/images/deepdive/learn/gyosho/saiketsu-gimetsuke-2.png`
- 画像キー: `learn/gyosho/saiketsu-gimetsuke-2`
- 生成は Codex。Cursor は描かない。
- 連作の2枚目。他の枚は上書きしない。

## PRE-GENERATE-CHECK

確認日 2026-10-21。不許可処分についての審査請求に対する判断は、裁決である。この事例では、申請先の行政庁とは別の行政庁が審査庁である。審査庁が常に別だ、とは書かない。審査請求をすれば必ず裁決の義務付けが使える、とは書かない。まだ裁判所の入口ではない。

書かない。英語の見出し。審査請求をすれば必ず義務付け。審査請求をしないと裁判できない、と一般化すること。ブランド名。左右の欄。底部の3枚。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 申請者 | いい役 | 申請者（不許可の見直しを求める） | ぴっちゅ | `pitchi.png` | 申請先から審査庁への矢印の手前 |
| 案内 | いい役 | 案内（審査庁を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-chachalot-pointer.png` | 下余白。せりふは足さない |

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One horizontal flow. No side panels. No bottom cards.
Title, one short question: 不許可の見直しを求めた。審査庁の判断は、何？
Left box: 申請先の行政庁. Arrow to the right box: 審査庁.
ぴっちゅ between them, label 申請者（不許可の見直しを求める）, speech この不許可を見直してください.
Small note by the clock, not a second conclusion: 相当の期間が経過しても、裁決がないことがある。
Under the flow, one line only: 不許可についての審査請求に対する判断は、裁決である。この事例では、申請先とは別の行政庁が審査庁である。
One trap line: 試験で「審査請求をすれば、必ず裁決の義務付けが使える」と書いてあったら×。
ちゃちゃロット in the bottom margin, green lecturer suit, separate pale-sky-blue hat, pointer toward 審査庁. No extra sentence. Do not cover the text.
Do not print any brand name, account name, or app name. Do not print an English heading.
```

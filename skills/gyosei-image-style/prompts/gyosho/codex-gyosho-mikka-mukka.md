# 不服は3か月。取消しの訴えは6か月。起算は同じ？

表が本体。読みの語呂は表の中の語だけ。語呂の人物は描かない。ちゃちゃロットは下余白に1体。せりふは足さない。

- 状態: 生成済み（2026-10-22）。てらしぃがこの画像の修正を言うまで上書きしない
- 保存先: `assets/images/deepdive/learn/gyosho/mikka-mukka.png`
- 画像キー: `learn/gyosho/mikka-mukka`
- 生成は Codex。Cursor は描かない。
- 上書きしない: `shusso-tanki-choki.png`

## PRE-GENERATE-CHECK

確認日 2026-10-22。行政不服審査法18条。行政事件訴訟法14条。図の略称は行審法と行訴法。

- 審査請求の主観期間（18条1項）。処分があったことを知った日の翌日から起算して3月。
- 再調査の決定があったあとの審査請求（18条1項）。その決定を知った日の翌日から起算して1月。
- 取消訴訟の主観期間（14条1項）。処分又は裁決があったことを知った日から6月。条文は翌日と書かない。
- 審査請求の客観期間（18条2項）。処分があった日の翌日から起算して1年。再調査の請求をしたときは、その決定があった日の翌日から起算して1年。知った日ではない。
- 取消訴訟の客観期間（14条2項）。処分又は裁決の日から1年。翌日ではない。
- 正当な理由があるときは、この限りでない。
- 再調査の請求そのものは、知った日の翌日から3月（54条）。再審査請求の主観は1月（62条）。表の主役にしない。下に1行。
- 義務付け、差止め、無効等確認、不作為の違法確認には、14条の出訴期間は原則として適用されない。

書かない。行服。取消訴訟も翌日から3か月。審査請求が6か月。両方の起算が同じ。義務付けにも6か月が適用される、と書くこと。人の姿の語呂。再調査の客観期間を、決定を知った日の翌日から、と書くこと。ブランド名。左右の欄。底部の3枚。案内役を消すこと。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 案内 | いい役 | 案内（客観期間の行を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。表と下の3行を隠さない |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは chachalot.png、approved-smiling-hat-mascot.png、approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. One table is the whole figure. No side panels. No bottom cards. No speech balloon.
In all Japanese on the image, write 行審法 and 行訴法 only. Do not write any other nickname for those statutes.
Title, one short question: 不服は3か月。取消しの訴えは6か月。起算は同じ？
Header, navy: どの期間か | いつから、どれだけか | 読み
Data rows alternate by row. Row 1 white, row 2 light gray, row 3 white, row 4 light gray. Not by column.
Rows:
審査請求の主観期間（行審法18条1項） | 処分があったことを知った日の翌日から、3か月 | みっか
再調査の決定のあとの審査請求（18条1項） | その決定を知った日の翌日から、1か月 | みっかの例外
取消訴訟の主観期間（行訴法14条1項） | 処分又は裁決があったことを知った日から、6か月 | むっか
客観期間 | どちらも1年。行審法は、処分があった日の翌日。再調査の請求をしたときは、その決定があった日の翌日から1年（18条2項）。行訴法は、処分又は裁決の日 | あって1年
Under the table, three lines only:
再調査の請求そのものは、知った日の翌日から3か月（54条）。再審査請求の主観は1か月（62条）。
正当な理由があるときは、この限りでない。
試験で「取消訴訟も、知った日の翌日から3か月」と書いてあったら×。
Leave a bottom margin under those three lines for one guide. Do not shrink type to fit. Wrap long lines.

ちゃちゃロット is one mascot only, in the bottom margin, green lecturer suit, white shirt, trousers, and shoes. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. The pointer indicates the objective-period row. No speech balloon. Do not cover the table or the three lines. No nameplate.
No owl, bear, cat, extra humans. The mnemonic stays as words in the table. No brand letters.
```

## 目視

- [x] 客観期間の行に、再調査の請求をしたときは、その決定があった日の翌日から1年（18条2項）
- [x] 行訴法の客観期間は、処分又は裁決の日。翌日ではない
- [x] 再調査のあとの1か月は、決定を知った日の翌日。客観期間の「あった日」と入れ替わっていない
- [x] 案内役は下余白。表と下の3行を隠さない。帽子は耳ではない。せりふはない
- [x] 語呂の人物はいない。行服、という略称はない
- [x] ブランド印字なし

# 病院開設中止勧告。勧告は、処分になる？

4コマを横一列。指定を受けられなくなる、と断定しない。通知を勧告と同じ処分にしない。既存のピン図は上書きしない。

- 保存先: `assets/images/deepdive/learn/gyosei/byouin-kaisetsu-4koma.png`
- 画像キー: `learn/gyosei/byouin-kaisetsu-4koma`
- 関連: 最判平17.7.15。第二小法廷。平成14年（行ヒ）第207号。勧告取消等請求事件。通称は病院開設中止勧告。
- 上書きしない: `assets/images/deepdive/learn/pin/hospital-abolition.png`。あちらは結論1行のピン。
- 生成は Codex。Cursor は描かない。PNGができるまで `[[image:]]` は付けない。

## 法律

富山県高岡市で、400床の病院開設を申請した。知事は、その医療圏の病床が計画の必要数に達しているとして、医療法30条の7の開設中止を勧告した。申請者は拒否した。その後、開設は許可された。同時に、勧告に従わず開設すれば保険医療機関の指定を拒否する、と通知された。

医療法上、勧告は任意に従うことを期待する行政指導で、従わなくても開設不許可にはならない。しかし、従わないと、相当程度の確実さをもって、病院を開いても保険医療機関の指定を受けることができなくなる。国民皆保険の下では、指定を受けずに診療する病院はほとんどない。指定を受けられないなら、実際上、開設自体を断念せざるを得ない。勧告は抗告訴訟の対象になる。通知の取消しを求める訴えは不適法のまま。勧告の取消しは富山地方裁判所へ差し戻した。判決の語は「実際上」。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 申請者 | いい役 | 開設しようとする者（勧告を取り消したい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 2コマだけ |
| 誤った主張 | 悪い役 | 原審の立場（勧告は処分ではない、と言いたい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 2コマ。ぴっちゅと並べ、本文を隠さない |
| 裁判所 | いい役 | 裁判所（開設を断念せざるを得ないかを聞きたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 3コマだけ |
| 案内 | いい役 | 案内（結論を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 4コマの下の余白。1体 |

## GPT Image プロンプト

```text
参照必須: ぴっちゅは assets/images/characters/pitchi_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。ちゃちゃロットは assets/approved-chachalot-pointer.png と assets/approved-smiling-hat-mascot.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Exactly four comic panels in one horizontal row. No second row. No comparison table.

Each panel has two zones with a clear empty gap. Upper zone: picture and speech bubbles. Lower zone: the caption, on its own band. No words on the props except a paper labeled 中止勧告. No second copy of the same sentence.

Title: 病院開設中止勧告。勧告は、処分になる？
Subtitle, one line: 最判平17.7.15

Panel 1 title: まず何が起きた
A hospital building and a paper labeled 中止勧告. No character.
Caption, lower band only: 高岡市で400床の病院開設を申請した。病床が必要数に達しているとして、開設中止を勧告された。

Panel 2 title: 当事者の言い分
ぴっちゅ on the left, カチャドクロ on the right, both in the upper zone. Do not cover the caption.
Label under ぴっちゅ: 開設しようとする者（勧告を取り消したい）
Speech bubble: この勧告を取り消せ。
Label under カチャドクロ: 原審（勧告は処分ではない、と言いたい）
Speech bubble: お願いだ。処分ではない。
Caption, lower band only: 申請者は勧告を拒否した。開設は許可され、従わず開設すれば保険の指定を拒否する、と通知された。

Panel 3 title: 裁判所が見た争点
タスク亀 stands in the upper zone. Label: 裁判所（開設を断念せざるを得ないかを聞きたい）
Speech bubble: 従わないと、実際上、開設を断念せざるを得ないか。
Caption, lower band only: 医療法上は行政指導でも、保険の指定に何が起きるか。

Panel 4 title: 判決
No scene character inside this panel.
Caption: 相当程度の確実さで、指定を受けられなくなる。実際上、開設を断念せざるを得ない。勧告は処分。
Next line: 従わなかった旨の通知は、処分ではない。勧告の取消しは差し戻し。

ちゃちゃロット is one mascot only, in the bottom margin under panel 4, outside the panel, green lecturer suit, white shirt, trousers, and shoes. Wooden pointer toward 勧告は処分. Do not cover that sentence. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood. No nameplate. No speech balloon.

Do not print any brand name, account name, or app name.
```

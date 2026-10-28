# Codex用 — 当事者の死亡で、請負と委任は終わるか

- 関連: LEC公開3・問33・オ。請負は死亡だけでは終わらない。委任はどちらの死亡でも終わる。

定型の左右パネル＋中央表＋底部3カードは使わない。左右に分けるのは、請負と委任の2契約だから。破産、後見、報酬、準用の範囲は、この枚に入れない。

- 保存先: `assets/images/deepdive/learn/minnpou/ukeoi-inin-shibou.png`
- 画像キー: `learn/minnpou/ukeoi-inin-shibou`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・債権各論の「もっと深掘る」。アプリ載せは生成後。

## PRE-GENERATE-CHECK

民法632条。請負は、仕事の完成と、その結果に対する報酬の約束で効力を生じる。死亡で終了する規定はない。仕事の完成と報酬は相続される。

民法653条1号。委任は、委任者または受任者の死亡によって終了する。どちらか一方の死亡で足りる。

民法654条。終了後でも、急迫の事情があるときは、受任者またはその相続人は、相手が委任事務を処理できるまで必要な処分をしなければならない。終了しない、ではない。

民法655条。終了事由は、相手方に通知したとき、または相手方が知っていたときに限り、相手方に対抗できる。

試験の×は、請負が当事者の死亡で終了する、とすること。
試験の×は、委任が受任者の死亡だけでは終了しない、とすること。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 請負人 | いい役 | 請負人（仕事を完成したい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 左列の下。書類を隠さない |
| 受任者 | いい役 | 受任者（事務を処理したい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 右列の下。終了の書類を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（請負も死亡で終わる、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部の試験の×だけ。1体 |
| 案内 | いい役 | 案内（急迫の処分を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ。指し棒は文字に重ねない |

相続人は人物にしない。左の書類にする。過去の辻さんと代さんは置かない。死亡を墓や骸骨で描かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は assets/images/characters/task_turtle_sheet.png。ぴっちゅは assets/images/characters/pitchi_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。ちゃちゃロットは skills/gyosei-image-style/assets/approved-chachalot-pointer.png と approved-smiling-hat-mascot.png。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。緑の講師スーツは白シャツ、ズボン、靴まで。1体だけ。下余白の右。指し棒は文字に重ねない。

Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. 16:9. Two columns only. No center table. No bottom three-card row. No graves. No skulls as a death symbol.

Title: 当事者が死亡したとき、請負と委任は終わる？

Left column, teal, title: 請負
Conclusion, large: 終了しない
Body: 注文者が死亡しても、請負人が死亡しても終了しない。仕事の完成と報酬は相続される（632条）。
Small picture: one work-order document with an arrow to a second document. Label on the second document: 相続人（仕事と報酬を引き継ぐ）.
タスク亀 under the documents, label 請負人（仕事を完成したい）.

Right column, navy, title: 委任
Conclusion, large: 終了する
Body: 委任者が死亡しても、受任者が死亡しても終了する（653条1号）。
Next line, only in this column: 急迫の事情があるときは、相手が事務を処理できるまで必要な処分をする（654条）。
Next line: 終了の対抗は、相手方に通知したとき、または相手方が知っていたとき（655条）。
Small picture: one mandate document marked 終了.
ぴっちゅ under the document, label 受任者（事務を処理したい）.

Bottom amber strip, カチャドクロ only here, label 誤った主張（請負も死亡で終わる、とする）:
試験の×は、請負が当事者の死亡で終了する、とすること。
試験の×は、委任が受任者の死亡だけでは終了しない、とすること。

One ちゃちゃロット only, bottom-right cream margin. The pointer aims at the 654条 line from outside the column. No speech bubble. Characters do not cover the title, the two columns, or the amber strip.
Do not print any brand name, account name, or app name.
```

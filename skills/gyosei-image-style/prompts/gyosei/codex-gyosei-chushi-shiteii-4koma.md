# Codex用 — 中絶指定医の撤回（最判昭63.6.17）

定型の左右パネルと中央表は使わない。4コマは背景。フッターに、試験で切る点だけ。撤回を、職権取消しや期間の話と混ぜない。

- 保存先: `assets/images/deepdive/learn/gyosei/chushi-shiteii-tekkai-4koma.png`
- 画像キー: `learn/gyosei/chushi-shiteii-tekkai-4koma`
- 生成は Codex。Cursor は描かない。
- 既存の `shin-gai-torikeshi-tekkai.png` は上書きしない。
- 配置案: 見て聞いて覚える・行政法総論の「もっと深掘る」。アプリ載せは生成後。

## 法律（背景と結論）

当時の優生保護法では、人工妊娠中絶を行うことができるのは、指定を受けた医師に限られた。指定の権限は、都道府県の医師会に付与されていた。

指定のあと、その医師による中絶の実施が著しく適正を欠く状態になった。医師会は指定を撤回した。医師は、撤回について法令に直接の明文がないから、撤回はできないと争った。

最判昭63.6.17。指定権限を付与されている機関は、撤回の明文がなくても、指定を撤回することができる。不利益を考慮しても、公益上の必要が高いときに限る。いつでも自由に撤回できる、ではない。目的は、母体の生命と健康の保護。適正を欠く指定を維持すると、その目的に反する。

撤回は、後から生じた事情で、適法だった行為の効力を将来に向けて失わせること。当初からの違法を理由に効力を失わせる職権取消しとは別。

試験で「明文がなければ、指定は撤回できない」と書いてあったら×。
試験で「授益的な指定は、理由を問わず自由に撤回できる」と書いてあったら×。
試験で「この判例は、中絶を行いうる期間を定めた」と書いてあったら×。
試験で「指定権限を付与されていない機関でも、撤回できる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 指定する側 | いい役 | 医師会（付与された指定権限で、母体の保護のため指定を見直したい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 1コマと2コマ。本文を隠さない |
| 誤った主張 | 悪い役 | 医師（明文がないから、指定は撤回できないと争いたい） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 2コマと3コマ。4コマの結論には置かない |
| 案内 | いい役 | 案内（フッターを指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

ぴっちゅは、この枚には置かない。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one row, then a short footer. No comparison table. No left-right debate panels.

Title: 指定医の指定は、明文がなくても撤回できるか（昭63.6.17）
Subtitle: 争ったのは、中絶を行いうる期間ではない。指定そのものの撤回

Panel 1 title: 指定がないと、中絶は行えない
タスク亀 holds a designation certificate. Caption: 当時の優生保護法では、人工妊娠中絶を行えるのは指定を受けた医師だけ。指定権限は、都道府県の医師会に付与されていた。
Label under タスク亀: 医師会（指定権限を付与されている）.

Panel 2 title: 適正を欠いたので、指定を撤回した
タスク亀 withdraws the certificate. カチャドクロ stands opposite. Caption: 指定のあと、中絶の実施が著しく適正を欠いた。医師会は指定を撤回した。
Label under カチャドクロ: 医師（指定を維持したい）.

Panel 3 title: 医師の主張
カチャドクロ points at a statute book with a blank page. Caption: 撤回の明文がない。だから、指定は撤回できない。
Label under カチャドクロ: 医師（明文がないと争いたい）.

Panel 4 title: 判決
No character in this panel. Caption: 指定権限を付与された機関は、明文がなくても撤回できる。ただし、不利益を考慮しても、公益上の必要が高いときに限る。目的は、母体の生命と健康の保護。
Small line: 試験で「明文がなければ、指定は撤回できない」と書いてあったら×。

Footer, three short lines, not a new comic:
撤回は、後から生じた事情で、将来に向けて効力を失わせること。当初からの違法を消す職権取消しとは別。
試験で「理由を問わず、自由に撤回できる」と書いてあったら×。
試験で「この判例は、中絶を行いうる期間の判例」と書いてあったら×。
試験で「指定権限を付与されていない機関でも撤回できる」と書いてあったら×。

Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only, outside the panels. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 試験で書くのは、明文がなくても、公益上の必要が高ければ撤回できる。

Do not print any brand name, account name, or app name. Do not cover the captions or the footer with characters or the pointer.
```

# Codex用 — 損益通算の年初適用と84条（最一小判平23.9.22）

定型の左右パネルと中央表は使わない。4コマだけ。3コマが争いの中身。4コマが判決。反対やひっかけを判決の結論にしない。

- 保存先: `assets/images/deepdive/learn/kenpou/son-eki-tsusan-84-4koma.png`
- 画像キー: `learn/kenpou/son-eki-tsusan-84-4koma`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・憲法の「もっと深掘る」。アプリ載せは生成後。

## 法律（何を争ったか）

平成16年改正。土地の長期譲渡所得は、税率を下げる一方、損失を他の所得と損益通算できないことにした。法律の施行は4月1日。附則は、同年1月1日以後の譲渡にも当てた。遡及は約3か月。

1月に土地を売った納税者は、まだ通算できると考えて更正の請求をした。税務署は通知で却下した。納税者は、施行前の譲渡に不利益な改正を当てるのは、憲法84条（および30条）に反すると争った。

争点は、課税要件の数字そのものではない。年初からの適用が、84条の趣旨である課税関係の法的安定に反するか、である。84条は、課税要件だけでなく、租税の賦課徴収の手続も、法律で明確に定めることを求める。

判決は合憲。不利益な遡及でも、常に84条違反ではない。法的安定への影響が、納税者の租税法規上の地位に対する合理的な制約として容認されるかを見る。性質、変更の程度、公益を総合衡量する。

本件で容認した芯。変えたのは、成立済みの納税義務ではなく、通算できるかもしれないという期待。損失のときだけ通算できるのは不均衡。公益は、資産デフレ対策と、施行前の駆け込み売却の防止。期間は暦年の初めからの約3か月。

試験で「不利益な遡及は、常に84条違反」と書いてあったら×。
試験で「84条は課税要件だけで、賦課徴収の手続は対象外」と書いてあったら×。
試験で「この判例は、国民健康保険料に84条を直接適用した」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 納税者 | いい役 | 納税者（1月の譲渡の損失を、他の所得と通算したい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 1コマと2コマ。本文を隠さない |
| 裁判所 | いい役 | 裁判所（年初適用が84条に反するかを見たい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 3コマだけ |
| 誤った主張 | 悪い役 | 誤った主張をする側（不利益な遡及は常に違憲、とする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 下部のひっかけだけ。4コマの結論に置かない |
| 案内 | いい役 | 案内（結論を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ |

税務署は人物にしない。却下の通知書で見せる。過去の辻さんと代さんは置かない。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは pitchi_sheet.png。タスク亀は task_turtle_sheet.png。カチャドクロは kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. Four comic panels in one row. No comparison table. No left-right debate panels.

Title: 損益通算の年初適用は、84条に反するか（平23.9.22）
Subtitle: 争ったのは、1月の譲渡に、4月施行の通算廃止を当ててよいか

Panel 1 title: 何が起きた
ぴっちゅ sold land in January. A calendar shows 1月1日 and 4月1日. Caption: 平成16年改正。土地の長期譲渡は、損失を他の所得と通算できなくした。施行は4月1日。適用は同年1月1日以後の譲渡。
Label under ぴっちゅ: 納税者（1月の損失を通算したい）.

Panel 2 title: 納税者の主張
ぴっちゅ files a correction request. A rejection notice, not a person, says 却下. Caption: 1月の譲渡は、まだ通算できるはずだ。施行前に当てるのは、84条に反する。
Label under ぴっちゅ: 納税者（更正の請求をしたい）.

Panel 3 title: 何を争ったか
タスク亀 looks at two lines, not a winner's flag. Line 1: 84条は、課税要件だけでなく、賦課徴収の手続も法律で明確にすることを求める。Line 2: 争点は、年初からの適用が、課税関係の法的安定に反するか。
Label under タスク亀: 裁判所（争点を見たい）.

Panel 4 title: 判決
No character in this panel. Caption: 合憲。変えたのは、成立済みの納税義務ではなく、通算できるかもしれないという期待。遡及は約3か月。不利益な遡及でも、合理的な制約なら84条の趣旨に反しない。
Small line: 試験で「不利益な遡及は、常に84条違反」と書いてあったら×。

Bottom trap strip, amber, カチャドクロ only here, label 誤った主張（不利益な遡及は常に違憲、とする）:
試験で「84条は課税要件だけで、賦課徴収の手続は対象外」と書いてあったら×。
試験で「この判例は、国民健康保険料に84条を直接適用した」と書いてあったら×。

Bottom note, pointed by ちゃちゃロット in a green lecturer suit, white shirt, trousers, and shoes. One mascot only, outside the four panels. Hat is a separate pale-sky-blue hat on the head: two round side peaks, one low center peak, long brim, smiling closed eyes. Not ears. Not a hood.
Note text: 試験で書く結論は、合憲。公益は、資産デフレ対策と、駆け込み売却の防止。

Do not print any brand name, account name, or app name. Do not cover the captions with characters or the pointer.
```

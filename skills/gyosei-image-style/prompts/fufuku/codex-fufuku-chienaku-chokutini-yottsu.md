# Codex用 — 行服法。遅滞なく4つ、直ちに4つ

- 保存先: `assets/images/deepdive/fufuku/chienaku-chokutini-yottsu.png`
- 画像キー: `fufuku/chienaku-chokutini-yottsu`
- 生成は Codex。Cursor は描かない。
- PNGができるまで `[[image:]]` は付けない。
- 上書きしない。`chokutini-sokuni-chienaku.png` は、作成と提出の別図。この保存先のPNGは未作成。

## PRE-GENERATE-CHECK

左右に4つずつ。表が本体。左右の論点パネル、底部3カード、案内役は置かない。箱と見出しで足りる。

e-Gov 行政不服審査法（2026-10-15）。

- 遅滞なくは、37条3項、42条1項、44条、57条。28条は「図らなければならない」であり、この図に入れない。
- 直ちには、21条2項の送付、29条1項の写しの送付、57条の教示の中身、69条3項の罷免。
- 21条1項の経由には、直ちにがない。
- 57条は両方に出す。左は教示の速度。右は教示の文言。同じ仕事に見せない。
- 44条は答申だけではない。審議会等の議を経て裁決するときは、その議を経たとき。それ以外で諮問が不要なときは、意見書が提出されたとき。
- 69条3項は、閉会中又は解散中の任命について、事後の承認が得られないとき。69条7項の罷免は入れない。
- 42条2項の提出は速やかに。この図に入れない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic. ONE job: four uses of 遅滞なく on the left, four uses of 直ちに on the right, in the Administrative Appeal Act.
16:9, warm off-white, slightly POP, large gothic Japanese, generous margins, ZERO overlapping glyphs.
No side essay panels. No bottom cards. No mascot. No arrows. Two columns of four boxes are the whole lesson.

Title, one short question:「行服法で、遅滞なく？直ちに？」

Left header, navy band, white text: 遅滞なく
Right header, navy band, white text: 直ちに

Four rows. Each row is one pair of boxes. Row backgrounds alternate by row: white, light gray, white, light gray. Not column stripes. Same row, same background on left and right.

Row 1 left: 意見の聴取をしたときは、審理の期日と場所、終結の予定時期を決め、審理関係人に通知する。予定を変えたときも同じ（37条3項）
Row 1 right: 処分庁等は、審査請求書又は録取書を、審査庁となるべき行政庁へ送付する（21条2項）

Row 2 left: 審理を終結したときは、審理員意見書を作る（42条1項）
Row 2 right: 指名されたときは、審査請求書又は録取書の写しを処分庁等へ送付する。処分庁等が審査庁なら送付しない（29条1項）

Row 3 left: 裁決する。答申を受けたとき。審議会等の議を経て裁決するときは、その議を経たとき。それ以外で諮問が不要なときは、意見書が提出されたとき（44条）
Row 3 right: 教示の文言は、直ちに審査請求をすることができる旨（57条）

Row 4 left: 再調査の請求の日の翌日から三月を過ぎても係属しているとき、書面で教示する。補正を命じたときは、補正された日の翌日から（57条）
Row 4 right: 閉会中又は解散中の任命につき、両議院の事後の承認が得られないとき、総務大臣がその委員を罷免する（69条3項）

Print only this title, the two headers, and these eight cells. No footer. No extra row. No watermark.
```

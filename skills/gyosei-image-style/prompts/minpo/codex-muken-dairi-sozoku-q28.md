# Codex用 — 無権代理と相続――相続の向き・人数・拒絶の時期（LEC公開２・問28）

既存の同趣旨プロンプトなし。新規1枚。画像は生成しない。

- 保存先: `assets/images/deepdive/learn/minpo/muken-dairi-sozoku-q28.png`
- 画像キー: `learn/minpo/muken-dairi-sozoku-q28`
- 代替テキスト: 無権代理人Aが本人Bの土地を売ったあと、相続の向きと人数と拒絶の時期で結論が分かれる5行図。4行目の共同相続が最も重要。

## 法律の芯（崩すな）

共通: Aは無権代理人。Bは本人。Aが代理権なくBの土地を売却。土地はB所有。

1. BがAを単独相続。追認拒絶可。成立した117条責任は承継。常に責任が成立するとは書かない。
2. AがBを単独相続。本人が自ら契約したのと同様の効果。
3. BとXがAを共同相続し、その後XがBを単独相続。Xは追認拒絶不可。
4. A・Y・ZがBを共同相続。Y・Zが追認拒絶。Aの相続分についても当然には有効とならない。ここを最も強調。
5. Bが追認拒絶したあと、AがBを単独相続。拒絶の効果は残る。

判例年月日は図に書かない。知識ベース本文に残す。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 無権代理と相続――相続の向き・人数・拒絶の時期 |
| 判断軸 | 相続の向き・単独か共同か・拒絶の時期 |
| ひっかけ | 共同相続でも自己の持分だけ有効、とはならない |
| 暗記 | 追認権は不可分。契約の効果と117条責任は別 |
| 5行の背面 | 横一列ずつ白／薄いグレー交互。1行目白、2行目薄いグレー。列ゼブラではない |
| 配置先 | 問28の「もっと深掘る」（生成後） |

## PRE-GENERATE-CHECK

- 相続の向きを取り違えない。死亡の順序と共同相続人を省略しない。OK
- 4行を強調。持分だけ有効にしない。OK
- 117条は成立した責任の承継。常に成立とは書かない。OK
- 人物色は全行で固定。OK
- 5行の背面は白／薄いグレーの行ゼブラ。列ゼブラではない。OK

## 配置方針（生成後）

問28 deepdive と `lec-r2-q28-muken-dairi-sozoku.md`。

## 出典

民法113条・117条。topics 問28。判例は本文のみ。

## GPT Image プロンプト

画像参照: `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study poster from scratch. Portrait or tall landscape, high resolution, one sheet.
Ivory inside a navy frame. Bold Japanese gothic. Wide padding.
No brand names. No exam paper copy. No case dates.

Title:「無権代理と相続――相続の向き・人数・拒絶の時期」

TOP small common scene:
A（無権代理人） sells B's land without authority.
B（本人）. 相手方.
A house or land labeled「B所有の土地」.

CENTER: five timeline rows. Same person colors in every row.
A always the same color. B always the same color. X, Y, Z distinct.
Arrows labeled「死亡」「単独相続」or「共同相続」.
Each row also has one short Japanese sentence of who succeeded whose status.

Row backgrounds MUST alternate horizontally, one full row at a time. Not column zebra.
Row1 WHITE: B inherits A alone.「追認拒絶可／成立した117条責任は承継」
Row2 LIGHT GRAY: A inherits B alone.「本人が自ら契約したのと同様の効果」
Row3 WHITE: B and X inherit A together, then X inherits B alone.「Xは追認拒絶不可」
Row4 LIGHT GRAY, EMPHASIZED, gold outline: A, Y, Z inherit B together. Y and Z refuse ratification.「Aの相続分についても当然には有効とならない」
Row5 WHITE: B first refuses ratification, then A inherits B.「拒絶の効果は残る」
All five rows must keep this white / light-gray / white / light-gray / white backing.

Do not omit the death order. Do not drop co-heirs.

BOTTOM cards:
判断軸「相続の向き・単独か共同か・拒絶の時期」
ひっかけ「共同相続でも自己の持分だけ有効、とはならない」
暗記「追認権は不可分。契約の効果と117条責任は別」

Guide: ちゃちゃロット, ONE only, SMALL bottom margin, green suit, light-blue smiling hat, not ears.
Do not cover the five rows. No nameplate.
Exact on-image Japanese only. No English.
```

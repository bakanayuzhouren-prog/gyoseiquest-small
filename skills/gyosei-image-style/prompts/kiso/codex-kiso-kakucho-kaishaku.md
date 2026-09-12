# Codex用 — 拡張解釈（刑法38条3項の「法律」）

LEC公開２・問１の定番例。**言葉の意味が扇状に広がる**1枚。法令の序列ではない。

- 保存先: `assets/images/deepdive/learn/kiso/kakucho-kaishaku.png`
- 画像キー: `learn/kiso/kakucho-kaishaku`
- 代替テキスト: 刑法38条3項の「法律」から扇状に光が広がり、政令・省令・条例・規則を包み込む。言葉の意味を通常より広く読む拡張解釈を表す図。

## 法律の芯（崩すな）

刑法38条3項：「法律を知らなかったとしても、そのことによって、罪を犯す意思がなかったとすることはできない。ただし、情状により、その刑を減軽することができる。」

- この1枚は、38条3項の「法律」を、国会制定法に限らず、**政令・省令・条例・規則**まで広く読む、という**この条文における解釈例**。
- 拡張解釈＝言葉の**可能な意味の範囲内**で、通常より広く解釈すること。
- 上の「法律」は残る。下の4つは、その意味に**含まれる**。法律が4つに分裂・変化した絵にしない。

**書かない／描かない**

- 法令の効力順位・制定手続のピラミッド。政令→省令→条例→規則の階段。
- 「どの条文でも法律には条例等が含まれる」という一般化。
- 類推解釈（言葉の意味を超えて別事例へ当てはめる）。
- 717条工作物・工場機械（この1枚の仕事ではない。既存カード側）。
- 問題文・肢の全文。

## この1枚の仕事

上の1冊「法律」から光が扇状に広がり、同じ高さの4冊（政令・省令・条例・規則）を包む。  
広がる光＝意味を広く読む。序列ではない。

## レイアウト例外（てらしぃ指定）

表・比較表・論点パネル・底部3カードは**使わない**。横長ポスター。絵とタイポグラフィが主役。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル（背景大字） | 拡張解釈（低コントラスト。4文字すべて読める。欠けない） |
| 中央メタファー | 冊子「法律」から扇状の光が下の4法令を包む |
| 判断軸（図中には書かない） | 文言の可能な意味の範囲内で広く読む |
| ひっかけ（図中には書かない） | 法令階層。一般定義。類推 |
| 暗記（最下部1文） | 言葉の可能な意味の範囲内で、通常より広く解釈する。 |
| 役割 | 案内役を置くなら下端のちゃちゃロット1体のみ |

## PRE-GENERATE-CHECK

- 法律：38条3項の「法律」の拡張。この条文の解釈例。OK
- 条番号：刑法38条3項。OK
- タイトルは拡張解釈。序列図に誤誘導しない。OK
- 口語なし。OK
- あぷし型パネル／底部3カード：てらしぃ指定で不使用（意図的例外）
- 案内役：置く場合はちゃちゃロット1体。緑スーツ。下端余白。中心・法令名・説明を隠さない
- 文字かぶりなし。指定ラベル以外の文字なし。発光で字をぼかさない

## 配置方針（生成後・Cursor）

既存画像は置き換えない。重複を見て**追加**。

- LEC公開２・問１の「もっと深掘る」
- 基礎法学の拡張解釈カード（717条工作物カードとは例が違う。混同して上書きしない）
- 既存 `learn/kiso/kaishaku-4type` は4類型全体図のまま残す

## GPT Image プロンプト

画像参照: `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape. Stylish, restrained, textbook-luxury.
Deep navy background. White lettering. Blue-to-cyan translucent light. Modest 3D only. Readability first.
No table. No comparison chart. No 論点 panel. No ひっかけ panel. No bottom three cards.
Wide empty margins. Almost no decoration. Glow must not blur Japanese text.

Learning goal: For 刑法38条3項 only, the word「法律」is read more widely than a Diet-enacted statute, still inside the possible meaning of the word. The fan of light is the widening of meaning, not a rank of statutes.

Background typography: a huge, low-contrast word「拡張解釈」behind the scene.
All four characters must be fully visible and complete. Do not crop them. Do not place them under foreground labels.

Upper center: one elegant statute book, standing, modest volume.
Cover text large:「法律」
Near the book, small:「刑法38条3項の『法律』」
Keep this book visible. It does not split or morph into other books.

From that book, a large translucent fan of light opens downward.
The top of the fan is narrow. The bottom is wide. Blue to cyan, glass-like transparency.
The widening light itself means reading the word more widely.

Inside the lower part of the light, four books or plates in one straight row, same size, same height.
Left to right:
「政令」
「省令」
「条例」
「規則」
No stairs. No pyramid. No rank. The four sit inside the meaning of the upper「法律」.

On the mid light, one short label:
「言葉の意味を広げる」

A grouping label for the four:
「政令・省令・条例・規則も含む」

Bottom, one readable sentence, no box:
「言葉の可能な意味の範囲内で、通常より広く解釈する。」

Optional guide: ちゃちゃロット, ONE only, SMALL at the bottom edge.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer.
Match the approved smiling-hat identity: independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover the center, the title, statute names, or the bottom sentence. No nameplate.

STRICT:
- Not a hierarchy of legal force or enactment procedure.
- Do not draw 政令→省令→条例→規則 as steps.
- Do not generalize that every statute's「法律」includes ordinances.
- Do not depict 類推解釈 (applying a rule beyond the word's meaning to a different case).
- Exact on-image Japanese only: 拡張解釈 / 法律 / 刑法38条3項の『法律』 / 言葉の意味を広げる / 政令 / 省令 / 条例 / 規則 / 政令・省令・条例・規則も含む / 言葉の可能な意味の範囲内で、通常より広く解釈する。
- No English labels. No extra captions. No brand names.
```

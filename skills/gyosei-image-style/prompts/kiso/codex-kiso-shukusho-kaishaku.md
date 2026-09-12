# Codex用 — 縮小解釈（民法177条の「第三者」）

LEC公開２・問１の定番例。**広い「第三者」を、条件に合う人だけに絞る**1枚。  
拡張解釈（`kakucho-kaishaku`）の「下へ広がる光」と対になる。

- 保存先: `assets/images/deepdive/learn/kiso/shukusho-kaishaku.png`
- 画像キー: `learn/kiso/shukusho-kaishaku`
- 代替テキスト: 民法177条の第三者を、登記の欠缺を主張する正当な利益を有する者に限定する図。第二の買主Cは対象に含まれ、不法占拠者Dは除かれる。

## 法律の芯（崩すな）

民法177条：不動産に関する物権の得喪及び変更は、不動産登記法その他の登記に関する法律の定めるところに従いその登記をしなければ、第三者に対抗することができない。

判例の定義（大連判明41.12.15。図に載せる文言は省略しない）:

**当事者またはその包括承継人以外の者で、登記の欠缺を主張する正当な利益を有する者**

- 縮小解釈＝言葉の意味を、通常より狭く解釈すること。
- 「包括承継人以外なら全員が第三者」ではない。**正当な利益**の限定を落とさない。
- 二重譲渡の第二の買主は、所有権が競合するので第三者に当たる（大連判明41.12.15の典型）。
- 不法占拠者は、当事者でなくても、登記の欠缺を主張する正当な利益がないので第三者に当たらない（最判昭33.7.11）。
- 第三者を善意者だけに限定しない。背信的悪意者は、この1枚では出さない。

**書かない／描かない**

- Cの勝敗、登記の先後、善意だから対象。
- C購入後にDが現れる時系列。
- Dを犯罪者顔・手錠・権利一般を持たない人として描く。
- 人物の身体が小さくなる絵（範囲の限定ではない）。
- 反対解釈（書いてない側の結論を逆転させる）。
- 問題文・肢の全文。

## この1枚の仕事

上は広い「第三者」。光が下へ細く絞られ、条件に合う人だけが残る。  
共通前提は売主A→買主B（未登記）の甲土地。別々の比較場面で、Cは光の内、Dは光の外。

## レイアウト例外（てらしぃ指定）

表・長文解説・底部3カードは**使わない**。横長ポスター。絵が主役。  
`kakucho-kaishaku` と対：あちらは光が下へ広がる。こちらは光が下へ狭まる。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル（背景大字） | 縮小解釈（4文字欠けない） |
| 中央メタファー | 広い光が細く絞られ、条件に合う人物だけを照らす |
| 判断軸（図中には書かない） | 正当な利益があるか。包括承継人除外だけでは足りない |
| ひっかけ（図中には書かない） | 包括承継人以外は全員。善意限定。反対解釈 |
| 暗記（最下部1文） | 言葉の意味を、通常より狭く解釈する。 |
| 役割 | ちゃちゃロット1体。下余白 |

## PRE-GENERATE-CHECK

- 法律：177条の第三者。定義フル。C＝当たる／D＝当たらない。OK
- 条番号：民法177条。OK
- 正当な利益を落とさない。善意限定にしない。OK
- 口語なし。OK
- あぷし型パネル／底部3カード：てらしぃ指定で不使用（意図的例外）
- 案内役：ちゃちゃロット1体。緑スーツ。定義・土地・人物を隠さない
- 文字かぶりなし。定義は小さくしない。指定ラベル以外なし

## 配置方針（生成後・Cursor）

既存画像は置き換えない。重複を見て**追加**。

- LEC公開２・問１の「もっと深掘る」
- 基礎法学の縮小解釈カード
- 民法177条の第三者の範囲に対応する学習カード
- 既存 `learn/kiso/kaishaku-4type` は4類型全体図のまま残す

## GPT Image プロンプト

画像参照: `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape. Picture-first. Stylish, restrained.
Deep navy background. White lettering. Translucent light that shifts from purple to blue.
No table. No long commentary. No 論点 panel. No bottom three cards.
Wide margins. High-contrast labels. Do not shrink the definition text to make room for decoration.
Glow must not blur Japanese.

Learning goal: 縮小解釈. The wide everyday word「第三者」is read more narrowly. People do not become physically smaller. The SET of people who count is limited.

Pair with the previous 拡張解釈 poster: that one opens a fan of light downward. This one NARROWWS a wide light downward into a thin beam.

Background typography: a huge, low-contrast word「縮小解釈」.
All four characters fully visible, not cropped, not under foreground labels.

TOP:
Large white word:「第三者」
Nearby, small:「民法177条」
A wide band of light with several person silhouettes (everyday clothes, not criminals).
Below that, the light width narrows. Only the person who meets the test stays brightly lit.

At the narrowing:「対象を限定する」

Center, readable, 2 or 3 lines, complete, not abbreviated:
「当事者またはその包括承継人以外の者で、
登記の欠缺を主張する正当な利益を有する者」

COMMON PREMISE (small scene, labeled as a shared setup, not a later chapter):
Seller A sells「甲土地」to buyer B. B has no registration yet.
甲土地 is a small vacant lot (no house). Draw a boundary line and the label「甲土地」.

TWO SEPARATE comparison scenes from that same sale. Not one timeline.

INSIDE the narrowed light — C:
A also sells the same 甲土地 to C. An arrow from A to C with a sale contract.
C is an ordinary-clothed person, fully lit and sharp.
Labels only:
「C：第二の買主」
「第三者に当たる」
「所有権が競合する」
Do not show who wins. Do not show whose registration is first. Do not say C is included because of 善意. No 背信的悪意者 facts.

OUTSIDE the light — D:
A different scene, not after C's purchase.
D occupies 甲土地 with no title. A tent and bags make the occupation obvious.
D is outside the beam: outline remains, muted, still readable.
Labels only:
「D：不法占拠者」
「第三者に当たらない」
「正当な利益がない」
No criminal face, no handcuffs. D is not drawn as a person with no rights in general. D is not a party to the sale, yet still not 民法177条の第三者.

Inclusion vs exclusion must be shown by the light boundary AND by the Japanese judgments, not by color alone.

BOTTOM, no box, one sentence:
「言葉の意味を、通常より狭く解釈する。」

Guide: ちゃちゃロット, ONE only, SMALL in the bottom margin.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer.
Match the approved smiling-hat identity: independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover the definition, the lot, or the A-B-C-D relations. No nameplate.

STRICT:
- Do not teach「包括承継人以外なら全員が第三者」.
- Keep 正当な利益.
- Do not limit 第三者 to 善意者.
- Do not confuse 縮小解釈 with 反対解釈.
- Mark C and D as separate comparison scenes from one shared sale.
- Exact on-image Japanese only: 縮小解釈 / 第三者 / 民法177条 / 対象を限定する / 当事者またはその包括承継人以外の者で、登記の欠缺を主張する正当な利益を有する者 / 甲土地 / C：第二の買主 / 第三者に当たる / 所有権が競合する / D：不法占拠者 / 第三者に当たらない / 正当な利益がない / 言葉の意味を、通常より狭く解釈する。
Small letters A and B may appear only as the seller and first buyer in the premise scene.
- No English labels. No extra captions. No brand names.
```

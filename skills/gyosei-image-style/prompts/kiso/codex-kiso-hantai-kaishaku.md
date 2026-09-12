# Codex用 — 反対解釈（飲酒の年齢制限）

LEC公開２・問１の定番例。**中央の「20歳」を挟むと結論が切り替わる**1枚。  
拡張（広がる）・縮小（絞る）とは別仕事。

- 保存先: `assets/images/deepdive/learn/kiso/hantai-kaishaku.png`
- 画像キー: `learn/kiso/hantai-kaishaku`
- 代替テキスト: 20歳の境界を挟み、19歳は飲酒禁止、20歳はその年齢制限による飲酒禁止を受けないと示す。規定の趣旨に照らして、反対の場合の結論を導く反対解釈の図。

## 法律の芯（崩すな）

二十歳未満ノ者ノ飲酒ノ禁止ニ関スル法律1条1項：「二十歳未満ノ者ハ酒類ヲ飲用スルコトヲ得ス」

- 反対解釈：規定された側（20歳未満は飲酒禁止）から、**条件に当たらない側**の結論を、規定の趣旨に照らして導く。
- この規定の反対側は、「20歳以上は、**この年齢制限による**飲酒禁止を受けない」。
- 成年年齢は民法で18歳。飲酒の年齢制限は**20歳のまま**（国税庁キャンペーン等）。
- 機械的に「AならB → AでなければBでない」と必ず裏返せる、という論理規則ではない。

**書かない／描かない**

- 18歳から飲酒できる。
- 20歳の人物を禁止側に置く。
- 「20歳以上なら、どんな状況でも飲酒可能」の一般化。
- 20歳以上に飲酒義務がある。乾杯・祝宴で勧める演出。
- 道路ゲート・立入禁止門として境界を描く。
- 善人／悪人の描き分け。
- 問題文・肢の全文。

## この1枚の仕事

細い白い境界の足元に「20歳」。左＝規定（19歳・禁止）。右＝反対解釈（20歳・年齢による禁止なし）。

## レイアウト例外（てらしぃ指定）

表・長文解説・底部3カードは**使わない**。横長ポスター。絵とタイポグラフィが主役。  
シリーズ: `kakucho-kaishaku`＝広がる／`shukusho-kaishaku`＝絞る／この図＝境界で切り替わる。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル（背景大字） | 反対解釈（4文字欠けない） |
| 中央メタファー | 縦の境界線と「20歳」。結論が左右で切り替わる |
| 判断軸（図中には書かない） | 規定の趣旨。条件に当たるか |
| ひっかけ（図中には書かない） | 18歳で飲める。機械的な裏返し。いつでも飲酒可 |
| 暗記（最下部） | 規定の趣旨に照らし、反対の場合の結論を導く。／成年は18歳。飲酒は20歳から。 |
| 役割 | ちゃちゃロット1体。指し棒は20歳の境界 |

## PRE-GENERATE-CHECK

- 法律：飲酒禁止法1条1項。20歳未満禁止。20歳以上はこの年齢制限による禁止を受けない。成年18歳≠飲酒18歳。OK
- タイトルは反対解釈。機械的裏返しに誤誘導しない。OK
- 口語なし。OK
- あぷし型パネル／底部3カード：てらしぃ指定で不使用（意図的例外）
- 案内役：ちゃちゃロット1体。緑スーツ。境界を指す。文字を隠さない
- 文字かぶりなし。指定ラベル以外なし

## 配置方針（生成後・Cursor）

既存画像は置き換えない。拡張・縮小と同じシリーズとして**追加**。

- LEC公開２・問１の「もっと深掘る」
- 基礎法学の反対解釈カード
- 既存 `learn/kiso/kaishaku-4type` は4類型全体図のまま残す

## GPT Image プロンプト

画像参照: `assets/images/characters/chachalot.png` ＋ `assets/approved-smiling-hat-mascot.png` ＋ `assets/approved-chachalot-pointer.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape. Picture and typography first.
Deep navy background. Left side calm red. Right side teal-blue. Center boundary is a thin white light.
Bold Japanese gothic. Modest glow. Readability first. No table. No long commentary. No bottom three cards.
Same restrained poster family as the 拡張解釈 (widening light) and 縮小解釈 (narrowing light) images.
This poster is different: a BOUNDARY flips the conclusion. Do not widen or squeeze a fan of light.

Learning goal: 反対解釈. From「20歳未満の飲酒は禁止」, the purpose of the rule supports「20歳以上は、この年齢制限による飲酒禁止を受けない」.
Not a mechanical logic toy. Not「20歳以上ならどんな状況でも飲酒可能」. Not a duty to drink.

Background typography: huge low-contrast「反対解釈」. All four characters complete, not cropped, not under labels.

CENTER:
One thin bright vertical boundary. At its base, large:「20歳」
The boundary is an abstract age condition, not a road, gate, or no-entry barrier.

Lower third: a left-to-right age line that does not overlap people or labels:
「19歳」→「20歳」

LEFT (the written rule):
One person in ordinary casual clothes, same size as the right person. Not a villain.
Person label:「19歳」
A glass icon in front. Red prohibition mark on the glass. The person is not drinking.
Small heading:「規定」
Large text:「20歳未満」「飲酒禁止」

RIGHT (conclusion from the other side):
One person in ordinary casual clothes, same size. Not a hero.
Person label:「20歳」
The same glass icon. A teal-blue circle mark beside the glass.
No toast, no banquet, no cheering to drink. Focus on the age condition.
Small heading:「反対解釈」
Large text:「20歳以上」「年齢による飲酒禁止なし」
Do not place the 20歳 person on the prohibited side. Do not show an 18-year-old drinking.

Near the center, short:「条件に当たらない側の結論を導く」

BOTTOM, readable:
「規定の趣旨に照らし、反対の場合の結論を導く。」
Nearby, short:「成年は18歳。飲酒は20歳から。」
Statute line:「二十歳未満ノ者ノ飲酒ノ禁止ニ関スル法律1条1項」

Guide: ちゃちゃロット, ONE only, SMALL in the bottom margin.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer aimed at the 20歳 boundary, not covering text.
Match the approved smiling-hat identity: independent light-blue hat with a nico-nico face ON the head, not ears, not animal head. No nameplate.

STRICT:
- Do not teach that drinking starts at 18.
- Do not generalize unlimited drinking at 20 or older.
- Do not show a duty to drink.
- Do not explain 反対解釈 as「AならBなら必ずAでなければBでない」.
- Split conclusions by the statutory age condition, not by likeable or unlikeable faces.
- Exact on-image Japanese only: 反対解釈 / 20歳 / 19歳 / 19歳→20歳 / 規定 / 20歳未満 / 飲酒禁止 / 反対解釈 / 20歳以上 / 年齢による飲酒禁止なし / 条件に当たらない側の結論を導く / 規定の趣旨に照らし、反対の場合の結論を導く。 / 成年は18歳。飲酒は20歳から。 / 二十歳未満ノ者ノ飲酒ノ禁止ニ関スル法律1条1項
- No English labels. No extra captions. No brand names.
```

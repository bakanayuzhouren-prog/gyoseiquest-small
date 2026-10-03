# 民法・並んだ2軒の書店。隣の敷地を使える場合

- 保存先: assets/images/deepdive/learn/minnpou/rinchi-shiyo-shoten.png
- 画像キー: learn/minnpou/rinchi-shiyo-shoten
- 関連: LEC公開1 問29。TAC1 問29（隣地使用）。同じ図を使い回す。
- 生成は Codex。Cursor は描かない。このPNGは生成済み。てらしぃがこの画像の修正を言うまで上書きしない。
- 見せ方は、横に4コマ。左右の正解／ひっかけパネルにはしない。結論は各コマとフッター。
- 4コマとも、左の建物はカチャドクロ書店、右の建物はちゃちゃロット書店。敷地は右の書店側。位置を入れ替えない。
- 根拠: 民法209条1項1号・1項ただし書・3項・4項。213条の2第1項・5項（確認日: 2026-10-01）。

## PRE-GENERATE-CHECK

- 境界又はその付近における障壁、建物その他の工作物の築造、収去又は修繕に必要な範囲で、隣地の敷地は使える（209条1項1号）。隣地所有者の許可は要らない。目的、日時、場所及び方法の通知は要る。
- 償金は、損害を受けたときだけ。使用料の請求権は209条にない。
- 店舗の中に立ち入る権利は209条にない。承諾が要るのは住家への立入りで、居住者の承諾。書店を住家と書かない。
- ガスタンクは209条では置けない。ガスの供給を受けるための設備で、他の土地に置かなければ供給を受けられないときに限り213条の2。土地の損害には償金（5項。209条4項の損害は除く）。1年ごとの支払ができる。
- タイトルは、2軒の書店が並び、カチャドクロ書店がちゃちゃロット書店の敷地を使える場合、と読めること。
- 左端のコマで、2軒の書店が並んでいることが見える。カチャドクロは、ちゃちゃロット書店の敷地で障壁を築造している。
- 「乗る」「乗らない」は使わない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 並んだ2軒の書店のうち、カチャドクロ書店がちゃちゃロット書店の敷地を使える場合を分ける.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Show a left-to-right story of four scenes. Do not use a left-right trap panel. Each scene states one correct rule.
In EVERY scene, the left building is カチャドクロ書店 and the right building is ちゃちゃロット書店. The yard marked 敷地 belongs to the right bookstore. Never swap, mirror, or hide either building.
Footer is four cards in one row. Header of the footer is navy. Card backgrounds alternate white then light gray, by card, never by column.

Title exactly: 2軒の書店が並んでいる。カチャドクロ書店が、ちゃちゃロット書店の敷地を使える場合
Chip:「209条・213条の2」

Scene 1, both bookstores fully visible side by side:
Left sign 「カチャドクロ書店」. Right sign 「ちゃちゃロット書店」. The owner of the left bookstore is hammering, building a new barrier on the boundary, standing on the right bookstore's yard. The barrier is a fence or wall under construction, separate from any gas tank.
Caption:「境界付近で、障壁を築造し、建物を改装する（209条1項1号）」

Scene 2, same two buildings, same left-right order. Arrow from the left bookstore onto the right bookstore's yard only:
The yard is marked 「敷地」.
Caption:「必要な範囲なら敷地を使える。許可は不要。目的、日時、場所、方法を通知する（209条1項1号・3項）」

Scene 3, same two buildings, same left-right order. A clear stop mark on the doorway of the right bookstore:
Caption:「店舗の中には立ち入れない。住家なら、居住者の承諾がなければ立ち入れない（209条1項ただし書）」

Scene 4, same two buildings, same left-right order. A gas tank on the right bookstore's yard, separate from the barrier:
Caption:「ガスタンクは209条では置けない。ガスの供給を受けるための設備で、他の土地に置かなければ供給を受けられないときに限り設置できる（213条の2第1項）」

Footer cards, exact text:
隣地使用権 | 境界付近の障壁・建物その他の工作物の築造、収去又は修繕に必要な範囲で敷地を使える。許可は不要。通知は必要
償金請求 | 損害を受けたときだけ請求できる。使用料は請求できない（209条4項）
店舗内立ち入り | 隣地使用権では店舗の中に入れない。住家は居住者の承諾がなければ入れない
ガスタンク | 土地の損害には償金を払う。209条4項の損害は除く。1年ごとに支払える（213条の2第5項）

Roles, fixed. Do not cover captions or footer text.
ちゃちゃロット = 右の書店の土地の所有者（敷地を使われる）。ONE only, in the doorway of the right bookstore. 参照 assets/images/characters/chachalot.png and skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png
カチャドクロ = 左の書店の所有者（境界で障壁を築造し、右の書店の敷地を使いたい）。ONE only, on the left bookstore side, and on the right bookstore's yard only when building the barrier. 参照 assets/images/characters/kachadokuro.png
Labels under them are the roles above. Never write だれが. No nameplate with a character name. Shop signs may say the bookstore names.
Cream face on ちゃちゃロット. Independent pale-sky-blue hat: two round side peaks, low center peak, long brim, closed smiling eyes. The hat is not ears, not a cap, not a hood.
Green lecturer suit including green trousers and shoes, white shirt.
No second guide. No logos, no watermarks, no brand names.
No owl, bear, tanuki, cat, or unnamed human.
```

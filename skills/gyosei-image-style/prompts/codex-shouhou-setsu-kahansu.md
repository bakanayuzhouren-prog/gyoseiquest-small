# Codex用・商法教科書（設立の過半数と三分の二）

てらしぃ指示: 設立の決議数字。既存の `setsu-1` `setsu-2` `setsu-3` `setsu-hokki-boshu` は上書きしない。四分の一・四倍は別枚 `codex-shouhou-setsu-yonshiichi.md`。

- 配置予定（生成後・Cursor）: 商法教科書 `/textbook/shouhou` 第2章
- 保存先: `assets/images/deepdive/textbook/shouhou/setsu-kahansu.png`
- 画像キー案: `textbook/shouhou/setsu-kahansu`
- 前提（生成前に必ず開く）:
  - `skills/gyosei-image-style/SKILL.md`
  - `skills/gyosei-image-style/references/visual-guidelines.md`
  - `skills/gyosei-image-style/references/avatar-guidelines.md`
  - レイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
  - 案内役正本: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `assets/images/characters/chachalot.png`
- ブランド: あぷし / X @appshi113
- **禁止**: フクロウ・猫・熊・犬。名札。模試原文転載。他枚の連作。アプリ埋め込み（Cursorへ）
- 範囲: **この1枚の画像生成まで**
- この1枚に載せない: 37条の四分の一、113条の四倍、現物出資、当然失権、検査役の五百万円

## 法律の芯（崩すな）

会社法40条1項: 設立時役員等の選任は、発起人の議決権の過半数をもって決定する。

会社法43条1項: 設立時役員等の解任は、発起人の議決権の過半数（設立時監査等委員である設立時取締役又は設立時監査役を解任する場合にあっては、三分の二以上に当たる多数）をもって決定する。

会社法73条1項: 創立総会の決議は、当該創立総会において議決権を行使することができる設立時株主の議決権の過半数であって、出席した当該設立時株主の議決権の三分の二以上に当たる多数をもって行う。

会社法309条1項（対比用・表の最終行）: 株主総会の決議は、当該株主総会において議決権を行使することができる株主の議決権の過半数を有する株主が出席し、出席した当該株主の議決権の過半数をもって行う。

混ぜない:
- 発起設立の**選任**まで三分の二にするな（40条は過半数）
- 創立総会を、株主総会の普通決議（出席の過半数）と同じにするな
- 設立時監査役・監査等委員の**解任**だけ、発起人側も三分の二

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| タイトル対比 | 設立の決議 — 選任は過半数／創立総会は三分の二 |
| 左右 | 緑＝論点／橙＝ひっかけ |
| 役割 | 発起人（役員を選ぶ・解任する）／設立時株主（創立総会で決める） |
| 中央 | 投票箱の対比。比較表は行ゼブラ |
| 判断軸 | 発起人の選任は過半数。創立総会は全議決権の過半数と出席の三分の二 |
| ひっかけ | 選任も三分の二／創立総会＝普通決議 |
| 暗記 | 選任は過半数。創立総会は出席三分の二。監査役を落とすときも三分の二 |
| 案内役 | ちゃちゃロット。下余白・暗記を指す |
| 配置先 | textbook/shouhou/setsu-kahansu |

## 論点Q&A（GOなし）

- 発起設立の設立時役員選任は → 過半数（40条）
- 創立総会は出席の過半数で足りる？ → NO（73条1項）
- 設立時監査役の解任は → 三分の二以上（43条）

## 役割

- 左寄り: **発起人（役員を選ぶ・解任する）**
- 右寄り: **設立時株主（創立総会で決める）**

## GPT Image プロンプト（このまま生成）

画像参照として必ず渡す:

1. `approved-shusaisha-kyoka.png`（レイアウト密度のみ。フクロウはコピーしない）
2. `approved-smiling-hat-mascot.png` および `chachalot.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: 設立の決議要件（会社法40条・43条・73条1項・309条1項の対比）.
Learning goal: 発起人による設立時役員の選任は過半数。創立総会は、行使できる議決権の過半数があり、かつ出席議決権の三分の二以上。設立時監査役・監査等委員の解任だけ発起人側も三分の二。
Do not teach 37条, 発行可能の四分の一, 現物出資, or 当然失権.

Match LAYOUT density of「主宰者の許可 — 要る３つ / 要らないもの」:
left green / right orange panels, center scene, bottom 判断軸・ひっかけ・暗記,
warm off-white, large Japanese, navy title. 16:9. No overlap. No tiny text.

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点: Q&A only. NO GO / STOP badges. Do NOT mix GO and YES.
- Only one row may say NO. Other rows are short legal phrases.
- Never write「だれが」.
- Character labels MUST be:
  「発起人（役員を選ぶ・解任する）」
  「設立時株主（創立総会で決める）」

Title:「設立の決議 — 選任は過半数／創立総会は三分の二」
Small chip:「監査役の解任も三分の二（43条）」

Center metaphor (ONE): two ballot boxes. Left small box labeled 発起人・過半数. Right larger assembly hall labeled 創立総会・出席三分の二.
Under the scene, a 5-row comparison table (not column zebra). Header navy.
Data row 1 white, row 2 light gray, row 3 white, row 4 light gray, row 5 white.
Columns: 誰が | 何を | 要件
Rows (exact Japanese):
1. 発起人（40条） | 設立時役員等の選任 | 議決権の過半数
2. 発起人（43条） | 設立時取締役等の解任 | 議決権の過半数
3. 発起人（43条） | 設立時監査役・監査等委員の解任 | 議決権の三分の二以上
4. 創立総会（73条1項） | 募集設立の決議（役員選任を含む） | 行使できる議決権の過半数＋出席の三分の二以上
5. 株主総会の普通決議（309条1項） | 成立後の原則 | 定足は過半数出席、賛成は出席の過半数
Keep Japanese large. Do not shrink the table into unreadably small type. If space is tight, slightly reduce the center illustration, never the table text.

Left 論点 (no GO):
1. 発起設立の設立時役員選任は → 過半数（40条）
2. 創立総会は出席の過半数で足りる？ → NO（73条1項）
3. 設立時監査役の解任は → 三分の二以上（43条）

Right ひっかけ (注意 stamps OK):
- 発起設立の選任も三分の二
- 創立総会＝株主総会の普通決議（出席の過半数）
- 設立時取締役の解任まで三分の二
- 創立総会は「過半数が出席すれば足りる」だけで足りる

Bottom (exact Japanese):
- 判断軸:「発起人の選任は過半数。創立総会は全議決権の過半数と出席の三分の二」
- ひっかけ:「選任まで三分の二にするな。創立総会を普通決議と同じにするな」
- 暗記:「選任は過半数。創立総会は出席三分の二。監査役を落とすときも三分の二」
Answer capsule:
「設立時役員等の選任は発起人の議決権の過半数。創立総会の決議は、行使できる議決権の過半数であって出席議決権の三分の二以上。設立時監査役又は監査等委員の解任は三分の二以上。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, wooden 指し棒 pointing at 暗記.
Match chachalot.png. Green lecturer suit (white shirt, green trousers, shoes). Not a scene character.
No nameplate. Pale-sky-blue HAT not ears. Cream face. Not a bear/owl/cat.

Legal accuracy: 40条 is 選任・過半数. 43条 三分の二 is 解任 of 設立時監査役 and 設立時監査等委員 only. 73条1項 needs BOTH 行使できる議決権の過半数 AND 出席の三分の二.
Avoid mock-exam copy, watermarks, filenames.
```

## 生成後

てらしぃが目視OKなら Cursor が教科書第2章・もっと深掘るへ `setsu-kahansu` を載せる。

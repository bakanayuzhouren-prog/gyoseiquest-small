# Codex用・商法教科書（設立の四分の一と四倍）

てらしぃ指示: 設立の数字比較。既存の `setsu-1` `setsu-2` `setsu-3` `setsu-hokki-boshu` は上書きしない。過半数・三分の二は別枚 `codex-shouhou-setsu-kahansu.md`。

- 配置予定（生成後・Cursor）: 商法教科書 `/textbook/shouhou` 第2章
- 保存先: `assets/images/deepdive/textbook/shouhou/setsu-yonshiichi.png`
- 画像キー案: `textbook/shouhou/setsu-yonshiichi`
- 前提（生成前に必ず開く）:
  - `skills/gyosei-image-style/SKILL.md`
  - `skills/gyosei-image-style/references/visual-guidelines.md`
  - `skills/gyosei-image-style/references/avatar-guidelines.md`
  - レイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
  - 案内役正本: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `assets/images/characters/chachalot.png`
- ブランド: あぷし / X @appshi113
- **禁止**: フクロウ・猫・熊・犬。名札。模試原文転載。他枚の連作。アプリ埋め込み（Cursorへ）
- 範囲: **この1枚の画像生成まで**
- この1枚に載せない: 創立総会の決議要件、発起人の過半数、検査役の五百万円、207条の五分の一

## 法律の芯（崩すな）

会社法37条3項: 設立時発行株式の総数は、発行可能株式総数の四分の一を下ることができない。ただし、設立しようとする株式会社が公開会社でない場合は、この限りでない。

同じ式の言い換え: 公開会社では、発行可能株式総数は設立時発行株式の総数の四倍を超えてはならない。

会社法113条3項: 次に掲げる場合には、当該定款の変更後の発行可能株式総数は、当該定款の変更が効力を生じた時における発行済株式の総数の四倍を超えることができない。
一 公開会社が定款を変更して発行可能株式総数を増加する場合
二 公開会社でない株式会社が定款を変更して公開会社となる場合

混ぜない:
- 37条は設立時発行と発行可能。113条3項は成立後の定款変更と発行済
- 非公開会社の設立に四分の一を課すな
- 公開会社＝譲渡制限のない株式を発行できる会社。上場と同義ではない（この1枚では定義を長く書かない）

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| タイトル対比 | 公開会社の発行可能 — 設立は四分の一／変更は四倍 |
| 左右 | 緑＝論点／橙＝ひっかけ |
| 役割 | 発起人（枠と発行数を決める）／株主（持分が薄まるのを防ぎたい） |
| 中央 | 箱（発行可能）と中の株（設立時発行）。比較表は行ゼブラ |
| 判断軸 | 設立は37条3項。成立後に枠を広げる公開会社は113条3項 |
| ひっかけ | 非公開にも四分の一／37条と113条を入れ替える |
| 暗記 | 公開の設立は四分の一以上。枠を増やすときは発行済の四倍まで |
| 案内役 | ちゃちゃロット。下余白・暗記を指す |
| 配置先 | textbook/shouhou/setsu-yonshiichi |

## 論点Q&A（GOなし）

- 公開会社の設立時発行は発行可能の四分の一を下回れる？ → NO（37条3項）
- 非公開会社の設立は → この制限なし
- 公開会社が発行可能を増やす定款変更は → 変更後は発行済の四倍を超えてはならない（113条3項）

## 役割

- 左寄り: **発起人（枠と発行数を決める）**
- 右寄り: **株主（持分が薄まるのを防ぎたい）**

## GPT Image プロンプト（このまま生成）

画像参照として必ず渡す:

1. `approved-shusaisha-kyoka.png`（レイアウト密度のみ。フクロウはコピーしない）
2. `approved-smiling-hat-mascot.png` および `chachalot.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: 公開会社の発行可能株式総数（会社法37条3項・113条3項）.
Learning goal: 設立は設立時発行が発行可能の四分の一を下ってはならない。成立後に公開会社が枠を増やす定款変更は、変更後が発行済の四倍を超えてはならない。非公開の設立にはこの制限がない。
Do not teach 創立総会, 過半数, 三分の二, 検査役, or 207条.

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
  「発起人（枠と発行数を決める）」
  「株主（持分が薄まるのを防ぎたい）」

Title:「公開会社の発行可能 — 設立は四分の一／変更は四倍」
Small chip:「非公開の設立は制限なし」

Center metaphor (ONE): a large frame labeled 発行可能株式総数, filled at least one-quarter with share certificates labeled 設立時発行. A small note「公開会社・37条3項」.
Under the scene, a 2-row comparison table (not column zebra). Header navy.
Data row 1 white, row 2 light gray.
Columns: 局面 | 公開会社 | 非公開会社
Rows (exact Japanese):
1. 設立（37条3項） | 設立時発行は発行可能の四分の一以上 | この制限なし
2. 成立後の定款変更（113条3項） | 発行可能を増やすとき、変更後は発行済の四倍を超えてはならない | 公開会社となる定款変更のとき、同様に四倍
Do not add a 3rd data row.

Left 論点 (no GO):
1. 公開会社の設立時発行は発行可能の四分の一を下回れる？ → NO（37条3項）
2. 非公開会社の設立は → この制限なし
3. 公開会社が発行可能を増やす定款変更は → 変更後は発行済の四倍を超えてはならない（113条3項）

Right ひっかけ (注意 stamps OK):
- 非公開会社の設立にも四分の一がある
- 設立の四分の一と、成立後の113条3項を入れ替える
- 公開会社＝上場会社だと思い込む
- 37条の「設立時発行」を「発行済」と書き換える

Bottom (exact Japanese):
- 判断軸:「設立は37条3項。成立後に枠を広げる公開会社は113条3項」
- ひっかけ:「非公開の設立に四分の一を持ち込むな。設立時発行と発行済を混ぜるな」
- 暗記:「公開の設立は四分の一以上。枠を増やすときは発行済の四倍まで」
Answer capsule:
「公開会社では、設立時発行株式の総数は発行可能株式総数の四分の一を下ることができない。公開会社が発行可能を増加する定款変更では、変更後は発行済の四倍を超えてはならない。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, wooden 指し棒 pointing at 暗記.
Match chachalot.png. Green lecturer suit (white shirt, green trousers, shoes). Not a scene character.
No nameplate. Pale-sky-blue HAT not ears. Cream face. Not a bear/owl/cat.

Legal accuracy: 37条3項 uses 設立時発行株式 and 発行可能株式総数. 113条3項 uses 定款の変更後 and 発行済株式の総数, and only the two listed cases.
Avoid mock-exam copy, watermarks, filenames.
```

## 生成後

てらしぃが目視OKなら Cursor が教科書第2章・もっと深掘るへ `setsu-yonshiichi` を載せる。

# Codex用・商法教科書（発起設立 vs 募集設立）

てらしぃ指示: 設立クラスタの比較1枚目。既存の `setsu-1`（現物）・`setsu-2`（発行可能株式総数）・`setsu-3`（当然失権）は上書きしない。

- 配置予定（生成後・Cursor）: 商法教科書 `/textbook/shouhou` 第2章、比較表の直後
- 保存先: `assets/images/deepdive/textbook/shouhou/setsu-hokki-boshu.png`
- 画像キー案: `textbook/shouhou/setsu-hokki-boshu`
- 前提（生成前に必ず開く）:
  - `skills/gyosei-image-style/SKILL.md`
  - `skills/gyosei-image-style/references/visual-guidelines.md`
  - `skills/gyosei-image-style/references/avatar-guidelines.md`
  - レイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
  - 案内役正本: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `assets/images/characters/chachalot.png`
- ブランド: あぷし / X @appshi113
- **禁止**: フクロウ・猫・熊・犬。名札。模試原文転載。他枚の連作。アプリ埋め込み（Cursorへ）
- 範囲: **この1枚の画像生成まで**
- この1枚に載せない（次枚）: 払込金の保管証明（64条）、現物の不足額填補の無過失免責、37条の四分の一、変態設立の4号全部

## 法律の芯（崩すな）

発起設立: 発起人が設立時発行株式の全部を引き受ける。設立時役員等の選任は発起人の議決権の過半数（40条）。創立総会はない。

募集設立: 発起人以外からも設立時発行株式を引き受ける者を募集する（57条）。創立総会がある。設立時役員等の選任は創立総会（88条）。

現物出資: 設立時は発起人だけ（28条）。募集設立でも引受人は金銭。この1枚では結論一行だけ。詳細図は既存 `setsu-1`。

不履行:
- 発起人の出資不履行 → 期日を定め、その**2週間前まで**に通知。期日までに履行しないと株主となる権利を失う（36条）
- 設立時募集株式の引受人が払込みをしない → **当然に**株主となる権利を失う（63条3項）。催告は要らない

成立: 本店の所在地における設立の登記によって成立する（49条）。この1枚の答え帯には手続の対比を書く。成立の登記は暗記に一行。

混ぜない:
- 募集設立の**引受人**の当然失権と、**発起人**の催告失権を入れ替えるな
- 発起設立でも創立総会で役員選任、は誤り

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| タイトル対比 | 発起設立／募集設立 — 比較する4点 |
| 左右 | 緑＝論点／橙＝ひっかけ |
| 役割 | 発起人（会社を設計する）／引受人（外から払い込む） |
| 中央 | 内側だけで完成する工場 vs 外から人を入れる工場。比較表は行ゼブラ |
| 判断軸 | 外から集めたか。集めたら当然失権と創立総会 |
| ひっかけ | 発起設立でも創立総会／募集でも催告が要る／引受人も現物 |
| 暗記 | 外から集めたら当然失権と創立総会。現物は発起人だけ |
| 案内役 | ちゃちゃロット。下余白・暗記を指す |
| 配置先 | textbook/shouhou/setsu-hokki-boshu |

## 論点Q&A（GOなし）

- 創立総会は発起設立にもある？ → NO（募集設立だけ）
- 募集設立の引受人が払わないと → 当然失権（63条3項）
- 設立時の現物出資は → 発起人だけ（28条）

## 役割

- 左寄り: **発起人（会社を設計する）**
- 右寄り: **引受人（外から払い込む）**

## GPT Image プロンプト（このまま生成）

画像参照として必ず渡す:

1. `approved-shusaisha-kyoka.png`（レイアウト密度のみ。フクロウはコピーしない）
2. `approved-smiling-hat-mascot.png` および `chachalot.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: 発起設立 vs 募集設立（会社法25条・36条・40条・57条・63条3項・88条・28条・49条）.
Learning goal: After one glance, the learner splits 4 points: 引受け、不履行の失権、創立総会、現物は発起人だけ.
Do not teach 保管証明, 填補責任の免責, or 発行可能株式総数の四分の一 on this sheet.

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
  「発起人（会社を設計する）」
  「引受人（外から払い込む）」

Title:「発起設立／募集設立 — 比較する4点」
Small chip:「成立＝設立登記（49条）」

Center metaphor (ONE): split factory. Left closed workshop labeled 発起設立（内側だけで完成）. Right workshop with an open gate labeled 募集設立（外から人を入れる）.
Under the scene, a 4-row comparison table (not column zebra). Header navy.
Data row 1 white, row 2 light gray, row 3 white, row 4 light gray.
Columns: 手続 | 発起設立 | 募集設立
Rows (exact Japanese):
1. 引受け | 発起人が全部 | 外からも募集（57条）
2. 不履行 | 催告して失権（36条・2週間前通知） | 引受人は当然失権（63条3項）
3. 創立総会 | なし | あり（88条）
4. 現物出資 | 発起人だけ（28条） | 発起人だけ（28条）
Do not add a 5th data row. Do not write 保管証明.

Left 論点 (no GO):
1. 創立総会は発起設立にもある？ → NO
2. 募集設立の引受人が払わないと → 当然失権（63条3項）
3. 設立時の現物は → 発起人だけ（28条）

Right ひっかけ (注意 stamps OK):
- 発起設立でも創立総会で役員を選ぶ
- 募集設立の引受人にも催告が必要
- 引受人も土地を現物出資できる
- 払込みをした時に株主になる（成立の時と混ぜるな。この図では答えにしない）

Bottom (exact Japanese):
- 判断軸:「外から集めたか。集めたら当然失権と創立総会」
- ひっかけ:「発起設立に創立総会を持ち込むな。当然失権は引受人」
- 暗記:「外から集めたら当然失権と創立総会。現物は発起人だけ」
Answer capsule:
「発起設立は催告して失権・創立総会なし。募集設立の引受人は当然失権・創立総会あり。設立時の現物出資は発起人に限る。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, wooden 指し棒 pointing at 暗記.
Match chachalot.png. Green lecturer suit (white shirt, green trousers, shoes). Not a scene character.
No nameplate. Pale-sky-blue HAT not ears. Cream face. Not a bear/owl/cat.

Legal accuracy: 36条 is notice then loss for 発起人. 63条3項 is automatic loss for 設立時募集株式の引受人.
40条／88条 may appear only as tiny labels if space, not extra table rows.
Avoid mock-exam copy, watermarks, filenames.
```

## 生成後

てらしぃが目視OKなら Cursor が教科書第2章・もっと深掘る・チャンクへ `setsu-hokki-boshu` を載せる。既存 `setsu-1` `setsu-2` `setsu-3` は残す。

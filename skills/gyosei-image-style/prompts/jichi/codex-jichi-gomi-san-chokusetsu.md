# Codex用 — 直接請求の連署（ゴミさん）

表主役＋語呂1枚。教材転載なし。結論は地方自治法74条・75条・76条・80条・81条。住民監査（242条）は連署不要なので語呂の外。

- 保存先: `assets/images/deepdive/learn/jichi/gomi-san-chokusetsu.png`
- 画像キー: `learn/jichi/gomi-san-chokusetsu`
- 生成済み。再生成しない。上書きしない。
- 生成は Codex。Cursor は描かない。

## 法律の芯（崩すな）

選挙権を有する者の連署による直接請求。

| 請求 | 連署 | 請求先 | 条文 |
|---|---|---|---|
| 条例の制定又は改廃 | 50分の1以上 | 長 | 74条1項 |
| 事務の監査 | 50分の1以上 | 監査委員 | 75条1項 |
| 議会の解散 | 3分の1以上（人口スライドあり） | 選管 | 76条1項 |
| 議員・長の解職 | 3分の1以上（スライドあり） | 選管 | 80条・81条 |

語呂（てらしぃ指定）: **ゴミさん** ＝ 50（ゴ）と 3（み）。やさしい請求は50分の1、重い請求は3分の1。3分の1のルビは「み」。

74条1項ただし書: 地方税の賦課徴収並びに分担金、使用料及び手数料の徴収に関する条例は対象外。
解散・解職の連署は、有権者40万超で超過分6分の1、80万超で超過分8分の1に緩和（76条1項）。**投票の過半数は緩和しない**（78条等）。
副知事・副市町村長等の解職は長へ（86条）。この図の4行表には入れない。
住民監査請求（242条）は住民1人で可。語呂の連署表の外。

**書かない:** 条例請求を議会へ直接。税条例も1/50で請求できる。解散投票の過半数もスライド。口語を答え帯に載せる。あぷし。Gyosei Quest。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | ゴミさん（50分の1／3分の1） |
| 中央メタファー | 4行表。連署の右にルビ（ゴ／み）。語呂の印は人物化しないゴミ袋 |
| 判断軸 | やさしい請求か、重い請求か。請求先は誰か |
| ひっかけ | 全部1/50。条例は議会へ。住民監査も1/50。過半数もスライド |
| 暗記 | ゴミさん。条例・事務監査は50分の1。解散・解職は3分の1 |
| 役割 | 語呂の印（連署の数字を覚える）／案内役 |

## 配役

名簿外の人物は置かない。語呂の印は**人物化しないゴミ袋アイコン**（顔なし・手足なし・衣装なし）。案内役はちゃちゃロット1体だけ。カチャドクロ系は置かない。

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 語呂の印 | — | 語呂の印（連署の数字を覚える） | 人物化しないゴミ袋アイコン | 参照PNGなし。許可キャストに似せるな |
| 案内 | いい役 | 案内（暗記を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 地方自治の直接請求。やさしい請求は50分の1、重い請求は3分の1。語呂はゴミさん（ゴ＝50、み＝3）.
Quality: same density as q26-2.png. slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Canvas/background: fully opaque solid warm off-white across 100% of the entire 16:9 canvas, including all four corners. No transparency, alpha area, checkerboard, black or dark empty background, unpainted margin, vignette, or cropped canvas. Fill every pixel of the canvas with that opaque warm off-white first. No background cut-off.
Match LAYOUT of the approved「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

STRICT: Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP badges on 論点.
Left heading「論点」. Right heading「ひっかけ」.

Title:「ゴミさんで覚える直接請求」
Chip:「74条・75条は50分の1。76条・80条・81条は3分の1」

Left 論点 Q&A ONLY. 説明行は短名＋（〇条）:
1. 条例の制定改廃の連署は（74条1項） → 50分の1
2. 事務監査の連署は（75条1項） → 50分の1
3. 議会解散の連署は（76条1項） → 3分の1
4. 議員・長の解職の連署は（80条・81条） → 3分の1

Right ひっかけ ONLY:
- 直接請求は全部50分の1
- 条例請求は議会へ直接出す
- 税の条例も請求できる
- 住民監査請求にも50分の1の連署が要る
- 解散投票の過半数も人口で緩和される

Center ONLY: one table. Header navy. Row zebra: 1st data row white, 2nd light gray, 3rd white, 4th light gray. NOT column colors.
Columns: 請求 | 連署 | 語呂 | 請求先
Rows:
条例の制定又は改廃（74条） | 50分の1 | ゴ | 長
事務の監査（75条） | 50分の1 | ゴ | 監査委員
議会の解散（76条） | 3分の1 | み | 選管
議員・長の解職（80条・81条） | 3分の1 | み | 選管
The 語呂 cell is ruby-like: small bold kana sitting immediately to the RIGHT of the fraction, like furigana beside the digits. 50分の1＋ゴ, 3分の1＋み.

Caption under the table, large and playful:「ダジャレで覚えようぜ直接請求」then smaller「ゴミさん＝50分の1と3分の1。税条例は除外。住民監査（242条）は1人で可・連署なし。解散・議員解職・長解職の連署には人口スライドがある。投票の過半数は緩和されない」

Scene: below the table, one small non-personified garbage-bag ICON only. Flat cartoon bag. No face, no eyes, no limbs, no human, no costume, no extra mascot. Label「語呂の印（連署の数字を覚える）」. Must not cover the table, ruby, caption, bottom cards, or answer bar. No owl, bear, cat, raccoon. Do not draw カチャドクロ. Do not draw any extra person besides ちゃちゃロット.

Bottom layout: navy answer bar is the very bottom edge. Directly ABOVE the answer bar, at the right end, reserve a dedicated warm-off-white guide safe zone. Keep the three bottom cards within the left approximately 80% of their row and reserve the right approximately 20% for the guide. The guide must not overlap the table, the bag icon, the bottom cards, body text, or the answer bar.
- 判断軸:「やさしい請求か重い請求か。請求先は長か監査委員か選管か」
- ひっかけ:「全部1/50。条例は議会へ。住民監査も連署。過半数もスライド」
- 暗記:「ゴミさん。条例と事務監査は50分の1。解散と解職は3分の1」
Answer:「条例の制定改廃と事務の監査は選挙権者の50分の1以上の連署。議会の解散並びに議員及び長の解職は3分の1以上の連署である。」

Guide: ちゃちゃロット SMALL in the lower-right guide safe zone only, entirely ABOVE the navy answer bar and OUTSIDE the table, bag icon, and bottom cards, wooden 指し棒 pointing at 暗記. Match assets/images/characters/chachalot.png, skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png, and 全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body only. No nameplate. Not a scene character. Every pixel of the guide—including hat, body, feet, shoes, pointer, outline, and shadow—must stay entirely inside the guide safe zone. None of them may touch or overlap the navy answer bar, table, cards, labels, or text. Leave clearly visible warm-off-white space between the guide’s feet and the answer bar. Do not stand on the answer bar.
No brand letters anywhere. No overlapping text. Large gothic Japanese.
```

## 目視チェック

- [ ] 名簿外の人物がいない。語呂の印は顔のないゴミ袋アイコン
- [ ] 50分の1にゴ、3分の1にみが数字の隣
- [ ] 条例の請求先が長。解散・解職が選管
- [ ] 答え帯に口語がない。税除外と住民監査1人はキャプション
- [ ] 全画面不透明。案内役の帽子が耳になっていない。答え帯に乗っていない

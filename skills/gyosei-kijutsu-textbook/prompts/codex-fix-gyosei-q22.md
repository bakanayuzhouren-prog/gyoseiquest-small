# Codex修正プロンプト：行政法記述Q22（訴えの変更・答え帯）

てらしぃ承認。**全体の作り直し禁止。** 「裁判所が相当と認め」を答案から外すだけ。

保存（上書き）: `assets/images/deepdive/textbook/gyosei-kijutsu/q22.png`  
他の行政法図・民法図は触るな。

## 誤っている箇所（現状）

答え帯・論点3・判断軸・暗記に **裁判所が相当と認め** が入っている。正本の答案の芯にはない。

- 図（現状）: 「裁判所が相当と認め、請求の基礎に変更がなければ、口頭弁論終結までに変更を申し立てる。」
- 正本: 「口頭弁論の終結までに、請求の基礎に変更がない限り、訴えの変更を申し立てるのである。」

答案に書く一点は **口頭弁論の終結まで** と **請求の基礎に変更がない限り**。相当は図の答えに載せない。

## 正しい知識（正本）

答案の芯（変更しない・一字一句）:

`口頭弁論の終結までに、請求の基礎に変更がない限り、訴えの変更を申し立てるのである。`

ひっかけ（残してよい）: 別訴必須、時期を落とす、基礎の同一性を落とす。

## 直す文言（この日本語に置換）

- 答え帯: 上の答案の芯と **一字一句同じ**（字数括弧は出さない）
- 左論点3: 「条件は？ → 請求の基礎に変更がない限り」（相当を書くな）
- 判断軸: 「口頭弁論終結まで。請求の基礎に変更なし」
- 暗記: 「口頭弁論終結までに、基礎が同じなら変更を申し立てる」

触るな: タイトル、チップ「別訴必須と決めつけるな」、中央の取消→国賠、別訴のみトラップ、人物ラベル、ちゃちゃロットの位置。

## GPT Image プロンプト

参照必須:
- 元図 `assets/images/deepdive/textbook/gyosei-kijutsu/q22.png`（レイアウト維持）
- 顔 `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
- ポーズ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`

```text
Edit the existing Japanese legal infographic for 行政法記述 Q22. Keep layout, left 論点 / right ひっかけ, center diagram (取消訴訟 → 国家賠償), clock「口頭弁論終結」, trap「別訴のみ」, bottom three cards, navy answer bar, ちゃちゃロット bottom-right with 指し棒. Do NOT redesign. Do NOT regenerate from scratch.

DELETE every instance of「裁判所が相当と認め」「相当と認める」「相当＋」from the answer bar, 論点, 判断軸, and 暗記.

REPLACE the navy 答え band with this EXACT Japanese (no character-count parenthesis):
口頭弁論の終結までに、請求の基礎に変更がない限り、訴えの変更を申し立てるのである。

REPLACE left 論点 item 3 with:
条件は？ → 請求の基礎に変更がない限り

REPLACE 判断軸 with:
口頭弁論終結まで。請求の基礎に変更なし

REPLACE 暗記 with:
口頭弁論終結までに、基礎が同じなら変更を申し立てる

Keep title「訴えの変更 — 口頭弁論終結まで」and chip「別訴必須と決めつけるな」. Keep labels「原告（請求を切り替えたい）」「裁判所（変更を審理する）」.
CHACHALOT: do not turn into a bear. No nameplate. Not a scene character.
Japanese large, no overlap. 16:9.
```

生成後X禁止。Cursorが目視してから `npm run generate:deepdive-images`。

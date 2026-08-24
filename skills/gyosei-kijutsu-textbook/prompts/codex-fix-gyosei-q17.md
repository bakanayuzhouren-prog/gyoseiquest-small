# Codex修正プロンプト：行政法記述Q17（非申請型義務付け・答え帯）

てらしぃ承認。**全体の作り直し禁止。** 答え帯と、それに直結する「一定の処分がされないことにより」だけ直す。

保存（上書き）: `assets/images/deepdive/textbook/gyosei-kijutsu/q17.png`  
他の行政法図・民法図は触るな。

## 誤っている箇所（現状）

答え帯が正本と不一致。

- 図（現状）: 「処分がされないことで重大損害のおそれがあり、その損害を避けるため他に適当な方法がないこと。」
- 正本: 「一定の処分がされないことにより重大な損害を生ずるおそれがあり、他に適当な方法がないこと。」

落ちている標識: **一定の処分がされないことにより**  
足してはいけない語: **その損害を避けるため**（それはQ18・差止め側。Q17の答案の芯には書かない）

左論点2が「処分されないことによる重大損害」だけでも、**一定の** が消える。

## 正しい知識（行訴法37条の2／正本）

非申請型義務付けの答案の芯（変更しない・一字一句）:

`一定の処分がされないことにより重大な損害を生ずるおそれがあり、他に適当な方法がないこと。`

ひっかけ（残してよい）: 申請型の併合、償うことのできない損害。

## 直す文言（この日本語に置換）

- 答え帯: 上の答案の芯と **一字一句同じ**（字数括弧は出さない）
- 左論点2: 「損害は？ → 一定の処分がされないことによる重大な損害のおそれ」
- 暗記: 「一定の処分がされないことにより重大な損害を生ずるおそれがあり、他に適当な方法がない」まで落とさない。短くするなら「一定の処分がされない＋重大損害＋他に方法なし」
- 判断軸に「されないことによる」と書くなら、**一定の処分が** を残す

触るな: タイトル、チップ「申請型の併合は別」、右ひっかけ3点、中央の人物・申請型＝併合トラップ、ちゃちゃロットの位置。

## GPT Image プロンプト

参照必須:
- 元図 `assets/images/deepdive/textbook/gyosei-kijutsu/q17.png`（レイアウト維持）
- 顔 `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
- ポーズ `skills/gyosei-image-style/assets/approved-chachalot-pointer.png`

```text
Edit the existing Japanese legal infographic for 行政法記述 Q17. Keep layout, left 論点 / right ひっかけ, center characters, bottom three cards, navy answer bar, ちゃちゃロット in the bottom-right owl slot with 指し棒. Do NOT redesign. Do NOT regenerate from scratch.

Fix ONLY the missing statutory marker and the answer bar.

REPLACE the navy 答え band with this EXACT Japanese (no character-count parenthesis, no extra words, no「その損害を避けるため」):
一定の処分がされないことにより重大な損害を生ずるおそれがあり、他に適当な方法がないこと。

REPLACE left 論点 item 2 with:
損害は？ → 一定の処分がされないことによる重大な損害のおそれ

If 暗記 or 判断軸 omit「一定の処分が」, insert「一定の処分がされないことにより」. Do not add「その損害を避けるため」anywhere on the answer bar (that is Q18).

Keep title「非申請型義務付け — 重大損害と補充性」and chip「申請型の併合は別」. Keep trap stamp「申請型＝併合」. Keep labels「近隣住民（規制処分を求めたい）」「行政庁（処分しない）」.
CHACHALOT: do not turn into a bear. No nameplate. Not a scene character.
Japanese large, no overlap. 16:9.
```

生成後X禁止。Cursorが目視してから `npm run generate:deepdive-images`。

# 配偶者短期居住権の期間（1037条）

- 状態: 未生成
- 保存先: assets/images/deepdive/learn/minnpou/haigusha-tanki-kyoju-kikan.png
- 画像キー: learn/minnpou/haigusha-tanki-kyoju-kikan
- 論点: 配偶者短期居住権の期間。①は、配偶者を含む共同相続人間で居住建物の遺産分割をすべき場合。帰属確定日と、相続開始から6か月を経過する日の、遅い方。②は①以外。消滅の申入れから6か月を経過する日。
- 配役: この1枚だけ、てらしぃ指定で人間の爺とばあを場面に置く。案内役はちゃちゃロット1体。名簿への追加ではない。
- チェック: 1037条1項1号・2号、3項、ただし書。吹き出しは爺の意地であり、期間の本文ではない。①は6か月より延びることがある。②は申入れの日から6か月を経過する日。

## PRE-GENERATE-CHECK

確認日 2026-10-28。正本は現行民法1037条。

- 1号の場合は、居住建物について配偶者を含む共同相続人間で遺産分割をすべき場合。単なる「遺産分割をするとき」ではない。
- 2号は、1号以外の場合。単なる「遺産分割をしないとき」ではない。
- ただし書は、相続開始の時に配偶者居住権を取得したとき、891条の相続欠格に当たるとき、または廃除によって相続権を失ったとき。
- 吹き出しは期間の本文にしない。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 場面 | てらしぃ指定 | 配偶者（相続開始の時に無償で住んでいた） | ばあさん | 参照PNGなし。この1枚だけの指定 | 家の戸口。意地の悪い顔 |
| 場面 | てらしぃ指定 | 被相続人（死亡した） | 爺さんの魂 | 参照PNGなし。この1枚だけの指定 | 屋根の上。半透明。意地の悪い顔 |
| 案内 | いい役 | 案内（期間を指す。せりふは足さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` | 下余白。1体。緑の講師スーツ。カードと2行を隠さない |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch.
参照必須: ちゃちゃロットは assets/images/characters/chachalot.png と skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png。
Japanese legal-study infographic, warm off-white background, navy and teal, one sheet. Large type. Phone-readable. Simple. Two period cards side by side, left to right. Do not shrink the period sentences. Wrap long headings. Do not repeat the same period in the title, the cards, and a footer.

Title, large and short: 配偶者が無償で住める期間は？

Center scene, small, above the cards. One old wooden house. An elderly woman stands in the doorway, arms crossed, mean squinting face, glaring upward. A translucent ghost of an elderly man floats above the roof, arms crossed, mean squinting face, glaring down at her. They disliked each other in life. No weapons. No animals. No other people.

Role label under the woman, small: 配偶者（相続開始の時に無償で住んでいた）
Role label under the ghost, small: 被相続人（死亡した）

One speech bubble from the ghost only, short, not covering the cards: すこししか住ませてやらん！

Two large cards under the scene. Card ① white. Card ② light gray.

Card ① heading: ① 配偶者を含む共同相続人間で遺産分割をすべき場合
Card ① body, full sentence: 遺産分割により居住建物の帰属が確定した日、または相続開始の時から6か月を経過する日の、いずれか遅い日まで（1037条1項1号）

Card ② heading: ② ①以外の場合
Card ② body, full sentence: 居住建物取得者が消滅の申入れをした日から6か月を経過する日まで（1037条1項2号）

One line under the cards, large: 申入れは、①の場合を除き、いつでもできる（1037条3項）
Second line, large: 相続開始の時に配偶者居住権を取得したとき、相続欠格に当たるとき、または廃除により相続権を失ったときは、生じない（1037条ただし書）

One small character in the bottom margin, not covering the cards or the two lines.
ちゃちゃロット. Role label beside the body, small: 案内（期間を指す）. One body only, green lecturer suit including trousers, white shirt, shoes, wooden pointer aimed at the space between the two cards. Independent pale-sky-blue hat with two round side peaks, a low center, a long brim, and closed smiling eyes on the hat. No nameplate. No speech. No other mascots.

Do not print any brand name, account name, or app name. No bottom cards. No second sheet.
```

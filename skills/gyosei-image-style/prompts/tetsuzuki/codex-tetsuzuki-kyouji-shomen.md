# Codex用 — 書面による教示を求められた場合（行審法82条／行訴法46条）

てらしぃ指定: **書面による教示を求められた場合**の行審法と行訴法の違い。1枚。
既存の `kyoji-hoshiki`（方式）・`kyoji-saichosa-misoshiji`（みなし・83条）とは別仕事。この図の主役は **82条2項・3項の請求** と **46条に対応規定がないこと**。

- 保存先: `assets/images/deepdive/learn/tetsuzuki/kyouji-shomen.png`
- 画像キー: `learn/tetsuzuki/kyouji-shomen`
- 生成は Codex。Cursor は描かない。PNGは未作成。

## PRE-GENERATE-CHECK（e-Gov確認）

**行政不服審査法82条**（e-Gov）
- 1項本文: 不服申立てをすることができる処分をする場合、処分の相手方に、不服申立てができる旨・すべき行政庁・期間を**書面で教示**しなければならない。
- 1項ただし書: **当該処分を口頭でする場合は、この限りでない。**
- 2項: 利害関係人から教示を求められたときは、当該事項を教示しなければならない。
- 3項: 前項の場合において、教示を求めた者が**書面による教示を求めたとき**は、当該教示は**書面で**しなければならない。

**行政事件訴訟法46条**（e-Gov）
- 1項本文: 取消訴訟を提起することができる処分又は裁決をする場合、相手方に、被告とすべき者・出訴期間・審査請求前置があるときはその旨を**書面で教示**しなければならない。
- 1項ただし書: **当該処分を口頭でする場合は、この限りでない。** 口頭の裁決までは含めない。
- 2項・3項は裁決のみ取消訴訟／形式的当事者訴訟の教示。**利害関係人の請求・書面請求に応じる規定はない。**
- 書面処分なら、請求を待たず最初から書面で教示する（1項本文）。

法律内容は指定どおり。左右は必須 **左「論点」／右「ひっかけ」**。両法の比較は中央。対比2語の左右分割は使わない。

## 法律の芯（崩すな）

1. 行審法82条: 処分時は相手方に書面教示が原則。口頭処分は処分時の教示義務の例外。利害関係人から求められたら教示義務（2項）。その者から書面による教示を求められたら書面で教示しなければならない（3項）。
2. 行訴法46条: 取消訴訟を提起できる処分・裁決では、相手方に被告・出訴期間・前置があるときはその旨を書面で教示。口頭処分は教示義務の例外。82条2項・3項のような請求規定はない。

**書かない／主役にしない**  
83条のみなし。誤教示の送付。46条に利害関係人の請求がある。両法とも後から書面を求めれば必ず書面。口頭処分でも処分時の書面教示が必要。あぷし。Gyosei Quest。口語を答え帯・判断軸に入れる。図中の略称は **行審法** と **行訴法**（答え帯は法律の正式名でよい）。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 書面を求められたら？ 行審法は義務、行訴法は請求規定なし |
| 中央 | 行審法82条の請求ルート／行訴法46条の処分時教示と規定なし |
| 判断軸 | 請求に応じる規定か、処分時に当然に行う教示か |
| ひっかけ | 両法とも求めれば書面。46条にも利害関係人の請求。口頭でも処分時の書面教示 |
| 暗記 | 請求されたら書面は行審法82条3項。行訴法46条は処分時の書面教示 |
| 役割 | 案内のみ（ちゃちゃロット1体） |

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内（表を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ 全身指し棒正本 `approved-chachalot-pointer.png` |

場面役は置かない。ちゃちゃロット1体のみ。

## GPT Image プロンプト

```text
参照必須: ちゃちゃロットは全身指し棒正本 approved-chachalot-pointer.png と chachalot.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 書面による教示を求められた場合。行審法82条3項は書面で教示する義務。行訴法46条に同様の請求規定はない.
Quality: same density as q26-2.png. slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas: fully opaque warm off-white, entire 16:9. No dark empty corners.

Match LAYOUT of the approved sample: left green「論点」 / right orange「ひっかけ」, ONE center comparison of 行審法82条 and 行訴法46条, bottom 判断軸 / ひっかけ / 暗記.
Required headings: Left「論点」. Right「ひっかけ」. Do NOT title the side panels「論点（行審法）」or「論点（行訴法）」. No 2-word left/right split. No GO/STOP. Q&A answers are YES, NO, or a short legal phrase. Never「だれが」「問が聞くこと」「（聞かない）」.
ABBREVIATION in boxes and panels: 行審法 and 行訴法. Never 行服法.

Title:「書面を求められたら？ 行審法は義務、行訴法は請求規定なし」
Chip:「82条2項・3項 対 46条」

Left heading 論点. Q&A only:
1. 行審法で書面による教示を求められたら？ → 書面で教示しなければならない（82条3項）
2. 行訴法46条に同様の請求規定はあるか？ → NO
3. 口頭処分の処分時教示は？ → 義務なし

Right heading ひっかけ:
- 両法とも、書面を求められたら必ず書面で教示する
- 行訴法46条にも利害関係人の請求規定がある
- 口頭処分でも処分時の書面教示が必要である

Center ONLY: one comparison, two columns, not a left/right 論点 split. Header navy. If a table is used, data rows zebra by ROW (row 1 white, row 2 light gray, then repeat). Not column zebra.
Left column heading「行審法82条」flow:
利害関係人が教示を請求（2項） → 書面による教示を請求（3項） → 書面で教示する義務
Right column heading「行訴法46条」flow:
書面処分・裁決 → 請求を待たず書面で教示
口頭処分 → 処分時の書面教示義務なし
後から書面を請求 → 46条に対応規定なし
Do not cover title, Q&A, table cells, or answer bar.

Bottom cards, left about 80 percent. Right 20 percent is guide safe zone.
- 判断軸:「請求に応じる規定か、処分時に当然に行う教示か」
- ひっかけ:「両法とも、書面を求められたら必ず書面で教示する。行訴法46条にも利害関係人の請求規定がある。口頭処分でも処分時の書面教示が必要である」
- 暗記:「請求されたら書面は行審法82条3項。行訴法46条は処分時の書面教示」
Answer:「行政不服審査法では、利害関係人が書面による教示を求めたときは書面で教示する。行政事件訴訟法には同様の請求規定はない。」

ちゃちゃロット SMALL in the lower-right guide safe zone only, entirely ABOVE the navy answer bar. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body. No nameplate. No speech balloon. Does not cover text. Leave warm-off-white space between feet and the answer bar.
No other characters. No owl, bear, cat, extra humans. No brand letters. No どっちやねん.
```

## 目視

- [ ] 左見出しは「論点」。右見出しは「ひっかけ」
- [ ] 中央は行審法82条／行訴法46条の比較。左右を論点同士にしていない
- [ ] 82条3項＝書面請求があれば書面義務。46条に同様の請求規定なし
- [ ] 46条ただし書を「口頭の裁決」まで広げていない
- [ ] 83条のみなしを主役にしていない
- [ ] 表を使うなら行背面は白／薄いグレーの交互
- [ ] ちゃちゃロット1体のみ。緑スーツ。独立した薄水色の笑顔帽子
- [ ] ブランド印字なし。名簿外なし

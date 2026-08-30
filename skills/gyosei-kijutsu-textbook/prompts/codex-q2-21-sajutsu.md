# 記述解説図・民法記述Q2（21条・詐術）— X最低ライン（q26-2基準）

- 保存先: assets/images/deepdive/textbook/minpou-kijutsu/q2.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png` および `q1-1.png`
- **既存の q2.png があれば上書きする。** `codex-batch-q2-q11.md` は開かない・使わない。
- **生成は Codex。Cursor は描かない。**
- **q1.png / q1-1.png / q3.png / q4.png は上書きしない**

## PRE-GENERATE-CHECK（Cursor確認済み）

民法21条: 制限行為能力者が行為能力者であることを信じさせるため詐術を用いたときは、その行為を取り消すことができない。

判例（最判昭44.2.13）: 黙秘も、他の言動とあいまって相手方を誤信させ、又は誤信を強めたときは詐術に当たる。黙秘しただけでは直ちに詐術ではない。

答案の芯（変更しない）:
`信じさせるため、他の言動とあいまって、相手方を誤信させ又は誤信を強めたときである。`（41字）

法律行為: 未成年者が、親の同意なく、自己所有の**ノートパソコン**を中古家電店へ売却。図の中央にノートPCを置き、「このPC売買は取り消せるか」が見えること。
売主＝未成年者。買主＝中古家電店。別店の文房具は中央に描かない（ひっかけ側だけ）。
黙秘だけ → 取消し可。詐術に当たる → 取消し不可（21条）。問が聞くのは「黙秘でも詐術になる場合」。
ビールのセリフと老け顔は「他の言動」のたとえ。判例の文言ではない。答え帯・論点②は判例フレーズのまま。
門の文字は「あいまって」（「あいまってい」禁止）。

禁止: 「切る」。GOとYES混在。「だれが」「問が聞くこと」。Owl/bear。眼鏡。21条を「黙秘＝即詐術」と書かない。タイトルに「詐欺」と書かない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし 民法記述 Q2 (Civil Code 21). OVERWRITE q2.png only. Do NOT touch q1.png, q1-1.png, q3.png, q4.png. Do NOT use codex-batch files.
Quality bar: same density as q26-2.png and q1-1.png.
16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs. Explanation text is the priority.

Match LAYOUT of「主宰者の許可」: navy title, left green「論点」, right orange「ひっかけ」, ONE center metaphor, bottom 判断軸 / ひっかけ / 暗記, navy answer bar.

STRICT:
- Left「論点」Q&A only. NO GO/STOP. Do not mix GO and YES.
- Right「ひっかけ」. Never「（聞かない）」.
- Never write「だれが」. Never write 切る／切れない／釣られる.
- Never write 詐欺. This is 詐術（21条）, not 詐欺（96条）. Title and body must say 詐術 only.
- Put the 判例 phrase in FULL on 論点 and 答え帯. Do not shorten to「あいまって」alone.

Title (stylish one point):「黙秘だけでは、詐術に当たらない」
Chip:「別店の文房具は別（日常生活）」

Left 論点:
1. このノートPCの売買は取り消せる？（黙秘だけ） → YES
2. 黙秘＝直ちに詐術？ → NO（21条・判例）
3. 詐術ならPC売買は？ → 取り消すことができない（21条）

Center: 黙秘の壁と、横の門。門のラベル EXACT:「他の言動とあいまって」（no あいまわって / no extra い）.
VISIBLE object between them: a ノートパソコン with tag「このPC売買の取消し」.
Left person: 未成年者 but 老け顔（ほうれい線・大人に見える）。NOT an actual adult. School uniform OK.
Speech bubble EXACT:「やっぱ夏はビールっすよね」
Extra label on that person EXACT:「未成年者なのに老けている」
Role tags EXACT:
「未成年者＝売主（ノートPCを売却したい）」
「中古家電店＝買主（買い受けたい）」
Do NOT draw a 文房具 shop behind the buyer. 文房具 is another store (daily-life trap) — only on ひっかけ.
Do NOT put the beer line on 論点・暗記・答え帯. Those stay the 判例 phrase.

Right ひっかけ:
- 黙っただけで詐術
- 別店の文房具購入
- 店員が顔を知っているだけ
- 「もう成人です」と明示した話にすり替える

Bottom:
- 判断軸:「黙秘単体ではない。他の言動とあいまって誤信させ／強めたか（昭44.2.13）」
- ひっかけ:「黙秘した事実や別店購入で終わらせない」
- 暗記:「信じさせるため＋他の言動とあいまって＋誤信させ又は強めた」
Answer EXACT:
「信じさせるため、他の言動とあいまって、相手方を誤信させ又は誤信を強めたときである。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, circle eyes, pale-sky-blue HAT (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE navy bar. No name tag on the answer bar. Pointer must not cover letters.
```

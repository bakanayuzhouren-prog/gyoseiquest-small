# 記述解説図・1問パイロット（民法記述Q1-1・13条／120条）

てらしぃ指示: 独立論点は別Q。本図は **同意を要する行為かどうか** だけ。取消期間（126条）は Q1-2／`q1.png`。**`q1.png` は上書きしない。**

保存先: `assets/images/deepdive/textbook/minpou-kijutsu/q1-1.png`（新規）  
配線: `content/textbook/app/民法記述/01-joubun-jun-shutudai.md` の Q1-1 問の下に `[[image:textbook/minpou-kijutsu/q1-1]]`（生成後・Cursor）  
参照: レイアウト密度＝主宰者許可図／案内役＝`skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`  
見出し見本: `codex-q1-126-ronten.md`（期間図。本図は中身だけ差し替え）

## チェックリスト

| 欄 | 内容 |
|----|------|
| 見本参照 | レイアウト=`approved-shusaisha-kyoka.png`／案内役=`approved-smiling-hat-mascot.png` |
| タイトル対比 | 不動産は取り消せる／自転車は取り消せない（13条） |
| 左右の意味 | 緑＝論点（Q&A）／橙＝ひっかけ |
| 各行の短名＋条文 | 下記Q&A＋（13条）（120条） |
| 役割ラベル | `保佐人（取り消したい）`／`相手方（売買の相手）` |
| 中央メタファー | 甲土地 vs 自転車（分岐1つ） |
| 判断軸 | 同意を要する行為なら取り消せる。当たらなければ取り消せない（13条・120条） |
| ひっかけ | 期間・詐術・善意に釣られるな。問は同意を要する行為かどうか |
| 暗記一行 | 不動産は同意要／自転車は当たらないので取り消せない |
| 案内役 | ちゃちゃロット（にっこり帽子。chachalot.png） |
| 配置先 | 君の教科書・民法記述 Q1-1 の問の下 |

## 禁止（再発防止）

- **GO と YES を同じ論点パネルに混在させない。** 論点の結論は YES／NO または短い語句だけ。論点に GO／STOP バッジを置かない。
- **「だれが」は書かない。** 人物下は `役割（何をしたいか／立場）`。
- 「問が聞くこと」「（聞かない）」禁止。
- **126条の期間（5年／20年）を論点・答え帯に書かない。** 期間は右のひっかけ（別問）だけ。
- 未成年者5条の「日常生活に関する行為」を保佐の結論ラベルにしない。分かれ目は **13条の同意を要する行為に当たるか**。
- `q1.png` を保存先にしない。

## 正しい知識

- 被保佐人が **13条の同意を要する行為**（不動産その他重要な財産に関する権利の得喪など）をしたときは、保佐人らは取り消せる（120条）。
- **自転車の購入**は同意を要する行為に当たらない → 取り消せない。
- 号の一覧は図に並べない（NOTE: 全部覚える必要はない）。
- 答案の芯: `不動産売買は同意を要する行為だが、自転車購入はこれに当たらないので取り消せない。（40字）`

## 論点Q&A（GOなし）

- 土地売買は取り消せる？ → YES（13条・120条）
- 自転車購入は取り消せる？ → NO
- 分かれ目は → 同意を要する行為か（13条）

1行目 YES、2行目 NO。3行目に YES／NO を付けない。

## 役割

- 左: **保佐人（取り消したい）**
- 右: **相手方（売買の相手）**
- 中央小物: **甲土地** と **自転車**（対比。人物は増やさない）

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest Q1-1 (Civil Code 13 and 120).
Do NOT save over q1.png. This is a different question from Q1-2 (cancellation period / 126).
16:9 warm off-white, navy title, left green / right orange, center one comparison scene,
bottom 判断軸 / ひっかけ / 暗記, answer capsule. Large Japanese, no overlap.

Match approved layout sample「主宰者の許可」density
(skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png).

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点 panel: Q&A only. NO GO badges, NO STOP badges, NO green GO arrows on 論点.
- Do NOT mix GO and YES. Row 1 YES, row 2 NO, row 3 short phrase only.
- Never write「だれが」.
- Do NOT write 5年, 20年, 追認できる時, or 126条 on 論点, 判断軸, 暗記, or 答え.
- Do NOT label the bicycle as「日常生活に関する行為」(that is 未成年者5条 wording). Use「同意を要する行為に当たらない」.
- Character labels MUST be:
  Left:「保佐人（取り消したい）」
  Right:「相手方（売買の相手）」

Title:「保佐の同意 — 不動産は取り消せる／自転車は取り消せない (13条)」
Chip:「期間は別問（126条）」

Left 論点 (no GO):
1. 土地売買は取り消せる？ → YES（13条・120条）
2. 自転車購入は取り消せる？ → NO
3. 分かれ目は → 同意を要する行為か（13条）

Center metaphor (one scene only):
A house/land sign「甲土地」versus a bicycle. The curator looks at both.
Visual contrast only — do not put GO/STOP badges on the left 論点 panel.
Small labels on objects:「甲土地」「自転車」.

Right ひっかけ (注意 stamps OK):
- 取消しの期間（126条）← 別問
- 詐術の有無
- Bの善意
- 追認の話で終わる

Bottom:
- 判断軸:「同意を要する行為なら取り消せる。当たらなければ取り消せない（13条・120条）」
- ひっかけ:「期間・詐術・善意に釣られるな。問は同意を要する行為かどうか」
- 暗記:「不動産は同意要／自転車は当たらないので取り消せない」
Answer:
「不動産売買は同意を要する行為だが、自転車購入はこれに当たらないので取り消せない。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, 指し棒 pointing at 暗記. Match chachalot.png. Not a scene character. No nameplate.
(pale-sky-blue HAT not ears, cream face, equal perfect-circle eyes, four cheek marks per side, no glasses, not a bear/owl/cat).
Place in bottom-right margin with a pointer toward 暗記. Do not cover labels.
```

## 生成後（Cursor）

1. 目視: 論点に GO が混ざっていないか／答え帯に126が混ざっていないか／役割に「だれが」がないか
2. `q1.png` が変わっていないこと
3. MD に `[[image:textbook/minpou-kijutsu/q1-1]]`
4. `npm run generate:deepdive-images` → `npm run bundle:db-textbooks`
5. X投稿は誤情報チェック通過まで禁止

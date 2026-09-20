# Codex用 — 13条1項イロハは聴聞／停止は原則弁明

表主役。ロは未確認の具体例を置かない。営業停止はイ〜ニに当たらないときの原則。特則・ニ・2項は混ぜない。

- 保存先: `assets/images/deepdive/learn/tetsuzuki/13-iroha-eigyo-teishi.png`
- 画像キー: `learn/tetsuzuki/13-iroha-eigyo-teishi`
- 生成は Codex。Cursor は描かない。

## 法律の芯（崩すな）

- 行政手続法13条1項1号: 次のいずれかに該当するとき **聴聞**。
- イ: 許認可等を取り消す不利益処分。
- ロ: イに該当しない資格・地位の直接のはく奪。根拠法と適用関係を確認できる具体例だけ書く。未確認の「委員の解職」「指定の解除」は書かない。
- ハ: 名あて人が法人である場合におけるその役員の解任を命ずる不利益処分、名あて人の業務に従事する者の解任を命ずる不利益処分、又は名あて人の会員である者の除名を命ずる不利益処分。
- ニ: イからハ以外で行政庁が相当と認めるときも聴聞。主表の最終行には入れない。注記で特則・2項と区別する。
- 同項2号: **イからニのいずれにも該当しないとき**、**原則、弁明の機会の付与**。
- 営業停止・業務停止は許可が残る権利制限であり、取消し・はく奪・解任命令ではない。行手法の原則では最終行（イ〜ニのいずれにも該当しない場合）。
- 例外は3系統を混ぜない。(1) **他の法律の特則**（個別法が聴聞等を別に定める） (2) **1号ニ**（相当と認めれば聴聞） (3) **13条2項**（緊急・金銭の確定等。意見陳述手続自体が不要）。営業停止＝軽微、と書かない。

**書かない:** 委員の解職、指定の解除。営業停止は軽いから弁明。営業停止にも聴聞が必須。ハは本人の免許取消し。あぷし。Gyosei Quest。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 取消し・はく奪・解任は聴聞／停止は原則弁明 |
| 中央メタファー | イロハ＋最終行（イ〜ニのいずれにも該当しない場合）の4行表（行ゼブラ） |
| 判断軸 | 許可が残るか。資格そのものを失わせるか。イ〜ニに当たるか |
| ひっかけ | 営業停止にも聴聞必須。イロハは全部許可取消し。軽いから弁明 |
| 暗記 | 取消し・はく奪・解任命令は聴聞。停止は原則弁明 |
| 役割 | 許可を取り消される側（聴聞で防御したい）／営業停止を受ける側（原則、弁明の機会の付与で足りる）／誤った主張をする側（停止にも聴聞が必須だとする） |

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート（pitchi_sheet.png / task_turtle_sheet.png / kachadokuro_sheet.png / subeton_sheet.pngのうち使うもの）を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
Topic: 行政手続法13条1項。聴聞になるイ・ロ・ハと、停止は原則弁明.
Learning goal: 許可取消し・資格はく奪・解任命令は聴聞。営業停止はイ〜ニに当たらなければ原則、弁明の機会の付与.
Quality: same density as q26-2.png. slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Canvas/background: fully opaque solid warm off-white across 100% of the entire 16:9 canvas, including all four corners. No transparency, alpha area, checkerboard, black or dark empty background, unpainted margin, vignette, or cropped canvas. Fill every pixel of the canvas with that opaque warm off-white first. No background cut-off.
Match LAYOUT of the approved「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

STRICT: Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP badges on 論点.
Left heading「論点」. Right heading「ひっかけ」.

Title:「取消し・はく奪・解任は聴聞。停止は原則弁明」
Chip:「13条1項。軽いから弁明、ではない。特則・ニ・2項は別」

Left 論点 Q&A ONLY. 説明行は短名＋（〇条）:
1. 許認可等の取消し（13条1項1号イ） → 聴聞
2. 資格・地位の直接のはく奪（13条1項1号ロ） → 聴聞
3. 解任・除名の命令（13条1項1号ハ） → 聴聞
4. イ〜ニ以外の営業停止（13条1項2号） → 原則、弁明の機会の付与

Right ひっかけ ONLY:
営業停止にも聴聞が必須
イ・ロ・ハは全部許可の取消し
軽い処分だから弁明
ハは本人の免許取消し

Center ONLY: one table. Header navy. Row zebra: 1st data row white, 2nd light gray, 3rd white, 4th light gray. NOT column colors.
Columns: 号 | 何をするか | 具体例 | 手続
Rows:
イ | 許認可等を取り消す | 飲食店の営業許可取消し、宅建業の免許取消し | 聴聞
ロ | 資格・地位の直接のはく奪（イ以外） | イに該当しない資格・地位の直接のはく奪 | 聴聞
ハ | 役員解任・従業者解任・会員除名を命ずる | 会社に取締役の解任を命ずる | 聴聞
イ〜ニのいずれにも該当しない場合 | 許可は残る権利制限 | 営業停止・業務停止 | 原則、弁明の機会の付与
Do NOT write 委員の解職 or 指定の解除 anywhere.
Caption:「例外は3つ。他の法律の特則／1号ニ（相当と認めれば聴聞）／13条2項（手続不要）。混ぜない」

Scene cast SMALL, do not cover table or labels:
- Good role, left of table: ぴっちゅ. Match assets/images/characters/pitchi.png and ポーズシート assets/images/characters/pitchi_sheet.png. Label「許可を取り消される側（聴聞で防御したい）」
- Good role, under table: タスク亀. Match assets/images/characters/task_turtle.png and ポーズシート assets/images/characters/task_turtle_sheet.png. Label「営業停止を受ける側（原則、弁明の機会の付与で足りる）」
- Bad role, right of table: カチャドクロ. Match assets/images/characters/kachadokuro.png and ポーズシート assets/images/characters/kachadokuro_sheet.png. Label「誤った主張をする側（停止にも聴聞が必須だとする）」
Do not swap these roles. No owl, bear, cat, raccoon.

Bottom layout: navy answer bar is the very bottom edge. Directly ABOVE the answer bar, at the right end, reserve a dedicated warm-off-white guide safe zone. Keep the three bottom cards within the left approximately 80% of their row and reserve the right approximately 20% for the guide. The guide must not overlap the table, the bottom cards, body text, or the answer bar.
- 判断軸:「許可が残るか。資格そのものを失わせるか。イ〜ニに当たるか」
- ひっかけ:「営業停止にも聴聞必須。イロハは全部許可取消し。軽いから弁明」
- 暗記:「取消し・はく奪・解任命令は聴聞。停止は原則弁明」
Answer:「許認可等の取消し、イに該当しない資格若しくは地位の直接のはく奪、役員等の解任若しくは除名を命ずる処分は聴聞。イからニのいずれにも該当しない営業停止は、原則、弁明の機会の付与である。」

Guide: ちゃちゃロット SMALL in the lower-right guide safe zone only, entirely ABOVE the navy answer bar and OUTSIDE the table and bottom cards, wooden 指し棒 pointing at 暗記. Match assets/images/characters/chachalot.png, skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png, and 全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body only. No nameplate. Not a scene character. Every pixel of the guide—including hat, body, feet, shoes, pointer, outline, and shadow—must stay entirely inside the guide safe zone. None of them may touch or overlap the navy answer bar, table, cards, labels, or text. Leave clearly visible warm-off-white space between the guide’s feet and the answer bar. Do not stand on the answer bar.
No brand letters anywhere. No overlapping text. Large gothic Japanese.
```

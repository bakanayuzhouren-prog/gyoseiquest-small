# 行政指導のスケール（小／大）— 画像生成プロンプト

てらしぃ依頼: 無灯火注意のような簡易指導だけでなく、規模・影響力の大きい行政指導を図にする。
**生成はてらしぃが Codex に「画像生成して」と言うまでしない。** Cursor は描かない。

見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 保存先: `assets/images/deepdive/learn/gyosei/gyoseishido-shokibo.png`
配置: 見て聞いて覚える「【合格革命・指導事例聴聞通知】」のもっと深掘る先頭

## キャスト（この図で固定）

| 名前 | 参照 | 法律上の役割 | 配置 |
|---|---|---|---|
| ちゃちゃロット | `assets/images/characters/chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 案内役（暗記を指す） | 下余白。本文・矢印を隠さない |
| ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 無灯火の自転車の運転者（任意でライトをつける） | 中央左・小 |
| タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 建築主（確認の応答を求める） | 中央右・マンション側 |
| キングカチャドクロ | `king_kachadokuro.png` ＋ `king_kachadokuro_sheet.png` | 拒否後も確認を留保する建築主事（違法側） | 中央右・マンション側 |
| すべとん | `subeton_sheet.png` | 従わない罰は当然と主張する者（ひっかけ） | 右パネル寄り |

配役はいい役（ちゃちゃロット・ぴっちゅ・タスク亀）／悪い役（カチャドクロ系・すべとん）。

## 法律（原典）

- 行手法2条6号: 行政機関が相手方の任意の協力によって実現することを目的として行う指導・勧告・助言等。処分に該当しない。規模の限定なし。
- 行手法32条: 任意の協力によってのみ実現。相手方が従わなかったことだけを理由とする不利益取扱い禁止。
- **建築確認の留保（最判昭60.7.16、裁判所PDF `hanrei-pdf-52658`）**
  - 確認処分は基本的に裁量の余地のない確認的行為。
  - 建築主が任意に応じていると認められるときは、社会通念上合理的と認められる期間の留保は、直ちに違法な措置であるとはいえない。
  - 留保されたままでの指導には応じられないとの意思を明確に表明したときは、不協力が社会通念上正義の観念に反する特段の事情がない限り、指導を理由とする留保は違法（国賠1条1項）。
  - ×「協力中ならいつまでも可」「拒否後は直ちに確認を出せ」（応答は確認または不適合の通知）。
- **給水拒否（最判平5.2.18）**: 負担金指導に従わないことを理由とする給水拒否は違法。この図では結論だけ。
- **病院開設中止勧告（最判平17.7.15、民集59巻6号1661頁、裁判所PDF `hanrei-pdf-52373`）**
  - 改正前医療法30条の7に基づく勧告は、医療法上は任意の履行を期待する行政指導として定められている。
  - 従わない場合、相当程度の確実さをもって保険医療機関の指定を受けられなくなる。皆保険のもとでは開設自体を断念せざるを得ない。
  - **裁判要旨: 抗告訴訟の対象となる行政処分に当たる。** 「なり得る」で曖昧にしない。
  - 後に指定拒否処分を争えることは、この結論を左右しない。
- 36条の指針・15条の通知は**この図に盛らない**。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 行政指導 小／大 |
| 左右 | 緑＝論点（Q&A）／橙＝ひっかけ |
| 中央メタファー | 自転車ライト（小）とマンション・病院（大） |
| 判断軸 | 処分ではないお願いが原則。任意協力が芯。強制の手段に変えると違法。病院中止勧告は処分に当たる |
| ひっかけ | 指導＝軽い注意だけ。従わない罰OK。確認留保はいつまでも可。病院勧告は常にお願い |
| 暗記 | 小＝無灯火。大＝確認留保・給水拒否・病院勧告。拒否後の留保は特段の事情がなければ違法。病院勧告は処分に当たる |
| 案内役 | ちゃちゃロット |

## PRE-GENERATE-CHECK

- 答え帯・暗記は上記原典と矛盾しない。病院は「処分に当たる」。確認留保は任意協力中の合理的期間／拒否後は特段の事情がなければ違法。OK
- 2条6号・32条。確認の応答は確認または不適合通知。OK
- 向き: タスク亀（建築主）が応答を求める。キングカチャドクロが拒否後も留保する。OK
- 口語なし。OK
- 左＝論点 Q&A。右＝ひっかけ。役割ラベル。OK
- 許可キャストのみ。いい役／悪い役の原則どおり。OK
- ちゃちゃロット1体・緑スーツ。本文を隠さない。OK
- ```text``` にブランド名なし。OK

判定: このプロンプト範囲では全部OK。生成はてらしぃが Codex に「画像生成して」と言うまで行わない。

## GPT Image プロンプト

画像参照: `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` ＋ `pitchi.png` ＋ `pitchi_sheet.png` ＋ `task_turtle.png` ＋ `task_turtle_sheet.png` ＋ `king_kachadokuro_sheet.png` ＋ `subeton_sheet.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape, high resolution, one sheet.
Navy and white base. Bold Japanese gothic. Wide padding. Thin rules. Soft shadow.
Left panel cool green. Right panel warm amber. Center scene cream.
No brand names. No publisher names. No exam paper copy. No English.

Title, navy, centered:「行政指導 小／大」
Small chip:「原則は処分ではない（行手法2条6号）」

LEFT panel, heading:「論点」
Q&A only. YES／NO or short words. No GO badges.
無灯火注意は指導？ → YES（2条6号）
任意協力中の確認留保は？ → 合理的期間なら直ちに違法ではない（昭60.7.16）
拒否を明確にした後の留保は？ → 特段の事情がなければ違法
負担金指導に従わない給水拒否は？ → 違法（平5.2.18）
病院開設中止勧告は？ → 医療法上は指導。本件は処分に当たる（平17.7.15）

RIGHT panel, heading:「ひっかけ」
指導＝軽い注意だけ → ×
従わない罰は当然 → ×（32条）
確認留保はいつまでも可 → ×
病院勧告は常にお願い → ×

CENTER:
Left-small: ぴっちゅ as 無灯火の自転車の運転者（任意でライトをつける）. Match pitchi.png and pitchi_sheet.png. Caption「簡易（注意）」
Right-large: apartment and hospital.
タスク亀 as 建築主（確認の応答を求める）by the apartment. Match task_turtle.png and task_turtle_sheet.png. Good side.
キングカチャドクロ as 拒否後も確認を留保する建築主事（違法側）near the apartment. Match king_kachadokuro_sheet.png. Bad side.
Hospital icon with paper「中止勧告」. No extra mascot as the hospital applicant.
すべとん as 従わない罰は当然と主張する者（ひっかけ）near the right panel. Match subeton_sheet.png. Bad side.
Role labels only as 役割（何をしたいか）. Never write「だれが」.

BOTTOM strip, three cards:
判断軸「原則は処分ではないお願い。任意協力が芯。強制の手段に変えると違法。病院開設中止勧告は処分に当たる。」
ひっかけ「指導＝軽い注意だけ／従わない罰OK／確認留保はいつまでも可／病院勧告は常にお願い」
暗記「小＝無灯火。大＝確認留保・給水拒否・病院勧告。拒否後の留保は特段の事情がなければ違法。病院勧告は処分に当たる。」

Guide: ちゃちゃロット, ONE only, SMALL in the bottom margin.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer.
Independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover panels, arrows, or the memory line. No nameplate.

Exact on-image Japanese only as specified. No extra captions.
```

# 行政指導のスケール（小／大）— 画像生成プロンプト

てらしぃ依頼: 無灯火注意のような簡易指導だけでなく、規模・影響力の大きい行政指導を図にする。
**生成はてらしぃが「作って」と言うまでしない。** このファイルはプロンプト正本。

見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
案内役: `assets/images/characters/chachalot.png` ＋ `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`
保存先（生成時）: `assets/images/deepdive/learn/gyosei/gyoseishido-shokibo.png`
配置: 見て聞いて覚える「【合格革命・指導事例聴聞通知】」のもっと深掘る先頭

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 行政指導 小／大 |
| 左右 | 緑＝論点（Q&A）／橙＝ひっかけ |
| 中央メタファー | 自転車ライト（小）とマンション・病院（大）のスケール |
| 判断軸 | 処分ではないお願い。任意協力が芯。強制の手段に変えると違法 |
| ひっかけ | 指導＝軽い注意だけ。従わない罰OK。病院勧告は常にただのお願い |
| 暗記 | 小＝無灯火。大＝確認留保・給水拒否・病院勧告。任意が芯 |
| 案内役 | ちゃちゃロット（下余白・指し棒だけ） |

## 法律（守る）

- 2条6号: 作為・不作為を求める指導・勧告・助言。処分に該当しない。規模の限定なし。
- 32条: 任意の協力によってのみ実現。従わなかったことだけを理由とする不利益取扱い禁止。
- 品川（昭60.7.16）: 建築確認は羈束。協力中の留保は可。拒否が明確なら直ちに確認。
- 武蔵野（平5.2.18）: 負担金指導に従わないことを理由とする給水拒否は違法。
- 病院開設中止勧告（平17.7.15）: 医療法上は行政指導。保険指定拒否と結びつくと処分になり得る。
- 36条の指針・15条の通知は**この図に盛らない**（別論点。1枚1仕事）。

## プロンプト

```text
Create a Japanese legal-study infographic for Gyosei Quest / あぷし exam prep.
Match the approved LAYOUT of the reference diagram「主宰者の許可 — 要る３つ / 要らないもの」
(assets/approved-shusaisha-kyoka.png): color-coded left/right panels, central scene illustration,
bottom three cards (判断軸 / ひっかけ / 暗記), warm off-white background, flat editorial icons,
large readable Japanese, navy title bar.
Guide character: ちゃちゃロット (Chachalot). Match chachalot.png and approved-smiling-hat-mascot.png.
Place ちゃちゃロット in the SAME slot as the green owl: SMALL, bottom-right margin only, wooden 指し棒 pointing at 暗記. Not a scene character. No nameplate.
Preserve the separate pale-sky-blue smiling hat (not ears), cream face, equal perfect-circle eyes
and highlights, four cheek marks per side. Do not convert into owl, cat, bear, or any animal.
Canvas: landscape 1536x1024.
Topic: 行政指導のスケール（小と大）.
Learning goal: After one glance, the learner can say guidance is not only a tiny street warning; big cases still start as お願い, and become illegal or even 処分 when forced.

Layout:
1) Top title:「行政指導 小／大」+ small chip「処分ではない（2条6号）」
2) Center metaphor: split scale. Left-small: police/staff pointing at a bicycle headlight saying「ライトをつけなさい」. Right-large: a tall apartment and a hospital with a paper labeled「中止勧告」. Labels under figures:「簡易（注意）」／「大規模（勧告・留保）」. Never write「だれが」.
3) Left green panel「論点」as Q&A rows. NEVER mix GO badges with YES. No GO/STOP on 論点.
   - 無灯火注意は指導？ → YES（2条6号）
   - 確認留保は？ → 協力中だけ（昭60.7.16）
   - 給水拒否は？ → 違法（平5.2.18）
   - 病院中止勧告は？ → 形は指導、処分になり得る（平17.7.15）
4) Right orange panel「ひっかけ」with 注意 badges.
   - 指導＝軽い注意だけ → ×
   - 従わない罰は当然 → ×（32条）
   - 病院勧告は常にお願い → ×
   - 任意を強制する手段 → 違法
5) Bottom cards: 判断軸 / ひっかけ / 暗記 — exact Japanese phrases below.
6) ちゃちゃロット in owl slot: SMALL bottom-right, 指し棒 pointing at 暗記. Not a scene character.

Exact Japanese labels to include:
- 判断軸:「処分ではないお願い。任意協力が芯。強制の手段に変えると違法」
- ひっかけ:「指導＝軽い注意だけ／従わない罰OK／病院勧告は常にお願い」
- 暗記:「小＝無灯火。大＝確認留保・給水拒否・病院勧告。任意が芯」

Avoid: tiny text, dense paragraphs, 36条指針, 15条通知リスト, mock-exam copy, watermarks, filenames, owl/cat/bear misreads of the mascot.
Ensure no overlapping text/icons; keep margins; mobile-readable.
```

# Codex用・商法教科書（民法代理 vs 商法504条）

てらしぃ指示: 登場人物クラスタの1枚目。顕名の原則が民法と商法で逆になることだけ。

- 配置予定（生成後・Cursor）: 商法教科書 `/textbook/shouhou` 第8章、図解スロット①
- 保存先: `assets/images/deepdive/textbook/shouhou/cast-agency.png`
- 画像キー案: `textbook/shouhou/cast-agency`
- 前提（生成前に必ず開く）:
  - `skills/gyosei-image-style/SKILL.md`
  - `skills/gyosei-image-style/references/visual-guidelines.md`
  - `skills/gyosei-image-style/references/avatar-guidelines.md`
  - レイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
  - 案内役正本: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png` ＋ `assets/images/characters/chachalot.png`
- ブランド: あぷし / X @appshi113
- **禁止**: フクロウ・猫・熊・犬。名札。模試原文転載。他枚の連作。アプリ埋め込み（Cursorへ）
- 範囲: **この1枚の画像生成まで**

## 法律の芯（崩すな）

民法99条1項: 権限内で、本人のためにすることを**示して**した意思表示は、本人に直接効力。

民法100条: 示さないでした意思表示は、**自己のためにしたものとみなす**。ただし、相手方が、本人のためにすることを**知り、又は知ることができたとき**は、99条1項を準用（本人に効力）。

商法504条: 商行為の代理人が本人のためにすることを示さないでした場合でも、その行為は**本人に対してその効力を生ずる**。ただし、相手方が、代理人が本人のためにすることを**知らなかったとき**は、代理人に対して履行の請求をすることを妨げない。

混ぜない:

- 504条ただし書は「知らなかったとき」。**無過失は要件に書かない**（善意無過失と書くな）
- 連帯責任ではない（本人と代理人の同時請求ではない）
- 506条（本人死亡でも代理権は消滅しない）と111条はこの1枚では扱わない
- 支配人・代理商・仲立・問屋は出さない

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| タイトル対比 | 名乗らなかったとき — 民法は自己／商法は本人 |
| 左右 | 緑＝論点／橙＝ひっかけ |
| 役割 | 代理人（本人のために契約する）／相手方（履行を求めたい） |
| 中央 | 名札を出さない店員と、効果の矢印が会社へ |
| 判断軸 | 商法は非顕名でも本人へ。相手方が知らなければ代理人にも履行請求可（504条） |
| ひっかけ | 民法と同じく自己の行為／連帯／ただし書を善意無過失にする |
| 暗記 | 民法は示せ。商法は示さなくても本人へ。知らなければ代理人にも請求可 |
| 案内役 | ちゃちゃロット。下余白・暗記を指す |
| 配置先 | textbook/shouhou/cast-agency |

## 論点Q&A（GOなし）

- 商法は名乗らなくても本人に効く？ → YES（504条本文）
- 民法100条本文は → 自己のためにしたものとみなす
- 相手方が知らなかったときは → 代理人にも履行請求可（504条ただし書）

## 役割

- 左寄り: **代理人（本人のために契約する）**
- 右寄り: **相手方（履行を求めたい）**
- 背後: **本人（効果の帰属先）**

## GPT Image プロンプト（このまま生成）

画像参照として必ず渡す:

1. `approved-shusaisha-kyoka.png`（レイアウト密度のみ。フクロウはコピーしない）
2. `approved-smiling-hat-mascot.png` および `chachalot.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: Civil-law agency vs commercial-act agency when the agent does not disclose the principal
（民法99条・100条 vs 商法504条）.
Learning goal: After one glance, the learner knows: 民法は原則自己の行為、商法は原則本人に効力。
504条ただし書は「知らなかったとき」だけ。無過失は書かない。連帯ではない。

Match LAYOUT density of「主宰者の許可 — 要る３つ / 要らないもの」:
left green / right orange panels, center scene, bottom 判断軸・ひっかけ・暗記,
warm off-white, large Japanese, navy title. 16:9. No overlap. No tiny text.

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点: Q&A only. NO GO / STOP badges. Do NOT mix GO and YES.
- Only row 1 may say YES. Rows 2–3 are short phrases.
- Never write「だれが」.
- Character labels MUST be:
  「代理人（本人のために契約する）」
  「相手方（履行を求めたい）」
  「本人（効果の帰属先）」

Title:「名乗らなかったとき — 民法は自己／商法は本人」
Small chip:「連帯ではない」

Center metaphor (ONE): split desk. Left (民法): agent without nameplate; thick arrow of contract
stays on the agent (自己のためにしたものとみなす・100条本文). Right (商法): same agent without
nameplate; thick arrow goes to the company principal (本人に効力・504条本文). A small optional
dashed arrow from 相手方 to the agent labeled「知らなかったとき → 代理人にも履行請求（504条ただし書）」.
Do not draw 支配人, 代理商, 仲立人, 問屋. Do not write 善意無過失.

Left 論点 (no GO):
1. 商法は名乗らなくても本人に効く？ → YES（504条本文）
2. 民法100条本文は → 自己のためにしたものとみなす
3. 相手方が知らなかったときは → 代理人にも履行請求可（504条ただし書）

Right ひっかけ (注意 stamps OK):
- 民法と同じく、名乗らなければ本人に効かない
- 本人と代理人が連帯して責任を負う
- ただし書を「善意無過失」まで足す
- 民法100条ただし書（知り、又は知ることができたとき）を商法504条と混ぜる

Bottom (exact Japanese):
- 判断軸:「商法は非顕名でも本人へ。相手方が知らなければ代理人にも履行請求可（504条）」
- ひっかけ:「連帯ではない。ただし書に無過失を足すな」
- 暗記:「民法は示せ。商法は示さなくても本人へ」
Answer capsule:
「商行為の代理は、本人のためにすることを示さなくても本人に効力を生ずる。相手方がそれを知らなかったときは、代理人に対する履行の請求を妨げない。」

Guide: ちゃちゃロット in the owl slot only. SMALL bottom-right, wooden 指し棒 pointing at 暗記.
Match chachalot.png. Green lecturer suit (white shirt, green trousers, shoes). Not a scene character.
No nameplate. Pale-sky-blue HAT not ears. Cream face. Not a bear/owl/cat.

Legal accuracy: ONLY 99・100 vs 504. Do NOT teach 506条, 支配人, or 表見支配人.
Avoid mock-exam copy, watermarks, filenames.
```

## 目視チェック（生成後・必須）

- [ ] 504条ただし書が「知らなかったとき」になっている（無過失がない）
- [ ] 連帯が正しいルールとして緑になっていない
- [ ] 左「論点」右「ひっかけ」。GOなし。YESは1行目だけ
- [ ] ちゃちゃロットが熊化していない。緑スーツ
- [ ] 文字かぶりなし

# Codex用・商法教科書（民法111条 vs 商法506条）

てらしぃ指示: 登場人物クラスタの続き。本人死亡と代理権。504条の顕名とは別枚。

- 配置予定（生成後・Cursor）: 商法教科書 `/textbook/shouhou` 第8章、民法代理の表の「本人が死んだら」の下
- 保存先: `assets/images/deepdive/textbook/shouhou/cast-506.png`
- 画像キー案: `textbook/shouhou/cast-506`
- 見て聞いて覚える（生成後・Cursor）: 506条カードのB列先頭に `[[image:textbook/shouhou/cast-506]]`
- 前提: SKILL.md / visual-guidelines / avatar-guidelines / 主宰者許可図 / ちゃちゃロット正本PNG
- **禁止**: フクロウ。504条の顕名、支配人の権限表、仲立・問屋を混ぜる
- 範囲: **この1枚の画像生成まで**

## 法律の芯（崩すな）

民法111条1項1号: 代理権は**本人の死亡**によって消滅する。

民法111条1項2号: **代理人の死亡**（又は代理人の破産手続開始の決定・後見開始の審判）によっても消滅する。

商法506条: **商行為の委任による代理権**は、**本人の死亡によっては、消滅しない**。

混ぜない・断定しない:

- 506条が外すのは「本人の死亡」だけ。**代理人の死亡まで残るとは書かない**（特則なし → 民法111条1項2号）
- 「あらゆる代理権」ではない。対象は**商行為の委任による代理権**
- 支配人の登記・終任、表見支配人はこの1枚に出さない
- 112条（消滅後の表見）はこの1枚に出さない

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| タイトル | 本人が死亡しても — 民法は消滅／商法は残る |
| 左右 | 緑＝論点／橙＝ひっかけ |
| 役割 | 本人（死亡した商人）／代理人（営業を続ける）／相手方（取引の相手） |
| 中央 | 店は閉まらない。名札「代理権は残る（506条）」 |
| 判断軸 | 商行為の委任による代理権か。本人死亡でも消滅しない（506条） |
| ひっかけ | 民法と同じく消滅／代理人死亡も残る／全ての代理に506条 |
| 暗記 | 本人死亡でも残る。代理人死亡は民法どおり消滅 |
| 配置先 | textbook/shouhou/cast-506 |

## 論点Q&A（GOなし）

- 商法は本人死亡でも代理権が残るか？ → YES（506条）
- 民法111条1項1号は → 本人の死亡で消滅
- 代理人の死亡は → 消滅する（111条1項2号。506条の対象外）

## 役割

- **本人（死亡した商人）**
- **代理人（営業を続ける）**
- **相手方（取引の相手）**

## GPT Image プロンプト（このまま生成）

画像参照: `approved-shusaisha-kyoka.png`（レイアウトのみ）／`approved-smiling-hat-mascot.png` ＋ `chachalot.png`

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: Agency power after the principal's death — 民法111条 vs 商法506条.
Learning goal: 商行為の委任による代理権は、本人の死亡によっては消滅しない。
代理人の死亡まで残ると書いてはいけない。民法は本人の死亡で消滅する。

Match LAYOUT of「主宰者の許可 — 要る３つ / 要らないもの」:
left green 論点 / right orange ひっかけ, center ONE metaphor, bottom 判断軸・ひっかけ・暗記.
Warm off-white. 16:9. Large Japanese. No overlap. No tiny text.

STRICT:
- Left header「論点」. Never「問が聞くこと」.
- Right header「ひっかけ」. Never「（聞かない）」.
- 論点 Q&A. NO GO / STOP. YES only on row 1.
- Never write「だれが」.
- Character labels MUST be:
  「本人（死亡した商人）」
  「代理人（営業を続ける）」
  「相手方（取引の相手）」

Title:「本人が死亡しても — 民法は消滅／商法は残る」
Chip:「対象は商行為の委任による代理権（506条）」

Center metaphor (ONE): a shop that stays open. The merchant is gone (simple absence / portrait with
「死亡」). The agent still stands at the counter dealing with 相手方. A navy ribbon on the counter:
「代理権は消滅しない（506条）」. Do not draw a funeral scene. Do not add 仲立人, 問屋, 支配人 ladder.

Left 論点:
1. 商法は本人死亡でも代理権が残るか？ → YES（506条）
2. 民法111条1項1号は → 本人の死亡で消滅
3. 代理人の死亡は → 消滅する（111条1項2号）

Right ひっかけ:
- 民法と同じく、本人死亡で代理権は消滅する
- 商法なら代理人の死亡でも代理権は残る
- 法定代理・全ての代理に506条が及ぶ
- 504条の非顕名と混ぜる

Bottom (exact Japanese):
- 判断軸:「商行為の委任による代理権か。本人死亡でも消滅しない（506条）」
- ひっかけ:「代理人の死亡まで残ると読むな。506条は本人の死亡だけ」
- 暗記:「本人死亡でも残る。代理人死亡は民法どおり消滅」
Answer capsule:
「商行為の委任による代理権は、本人の死亡によっては消滅しない。代理人の死亡による消滅は民法第111条第1項第2号による。」

Guide: ちゃちゃロット SMALL bottom-right, green lecturer suit (white shirt, green trousers, shoes),
wooden 指し棒 pointing at 暗記. Match chachalot.png. No nameplate. Hat is a hat, not ears.
Not a bear/owl/cat.

Legal accuracy: ONLY 111条1項1号・2号 vs 506条. Do not teach 112条 or 504条.
Avoid mock-exam copy, watermarks, filenames.
```

## 目視チェック（生成後・必須）

- [ ] 代理人死亡でも残る、と緑で書いていない
- [ ] YESは1行目だけ。GOなし
- [ ] ちゃちゃロット緑スーツ。文字かぶりなし

# Codex用・商法教科書（代理商27条通知・31条留置）

てらしぃ指示: 代理商クラスタの追加。発する通知と、占有物の留置。競業は別枚。

- 配置予定（生成後・Cursor）: 商法教科書 `/textbook/shouhou` 第8章、代理商の定義の後
- 保存先: `assets/images/deepdive/textbook/shouhou/cast-tsuchi-ryuchi.png`
- 画像キー案: `textbook/shouhou/cast-tsuchi-ryuchi`
- 見て聞いて覚える（生成後・Cursor）: 27条・31条カードのB列に `[[image:textbook/shouhou/cast-tsuchi-ryuchi]]`
- 前提: SKILL.md / 見本PNG / ちゃちゃロット正本
- 範囲: **この1枚の画像生成まで**

## 法律の芯（崩すな）

商法27条: 代理商は、取引の代理又は媒介をしたときは、**遅滞なく、商人に対して、その旨の通知**を発しなければならない。

商法29条: 物品の販売又はその媒介の委託を受けた代理商は、**第526条第2項の通知その他売買に関する通知を受ける権限**を有する。

商法31条: 代理商は、取引の代理又は媒介をしたことによって生じた債権の**弁済期が到来しているとき**は、その弁済を受けるまでは、**商人のために当該代理商が占有する物又は有価証券を留置**することができる。ただし、当事者が**別段の意思表示**をしたときは、この限りでない。

商法557条: **第27条及び第31条**は問屋について準用する（29条の準用は書いていない）。

混ぜない:

- 27条は商人へ**発する**通知。29条は相手方からの売買通知を**受ける**権限。向きを入れ替えるな
- 留置の目的物は「商人のために当該代理商が占有する物又は有価証券」。商人の全財産ではない
- 弁済期未到来ではこの留置は書かない
- 30条（期間の定めがない契約の2か月前予告解除）はこの1枚の主題にしない
- 28条競業は別図

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| タイトル | 代理商 — 遅滞なく通知せよ／弁済期到来なら留置可 |
| 判断軸 | 発する通知か、受ける権限か。留置は弁済期到来と占有 |
| ひっかけ | 27と29の向き／留置は全財産／弁済期前でも留置 |
| 暗記 | 代理・媒介したら遅滞なく商人へ通知。弁済期到来の債権は占有物を留置可 |
| 配置先 | textbook/shouhou/cast-tsuchi-ryuchi |

## 論点Q&A（GOなし）

- 代理・媒介をしたら商人へ通知するか？ → YES（27条）
- 留置できるのは → 弁済期到来後、占有する物又は有価証券（31条）
- 29条は → 売買に関する通知を受ける権限

## 役割

- **代理商（通知を発し、物を占有する）**
- **商人（通知を受け、弁済すべき）**
- **相手方（売買の通知を発し得る）** ※29条用に小さく

## GPT Image プロンプト（このまま生成）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Topic: 代理商の通知義務 and 留置権（商法27条・29条・31条）. 問屋は27条・31条を準用（557条）.
Learning goal: After agency or mediation, notify the merchant without delay (27).
留置 requires 弁済期到来 and possession of goods or securities held for the merchant (31).
29条 is the power to RECEIVE sale notices, not the duty to SEND 27条 notices.

Match「主宰者の許可」: left 論点 / right ひっかけ, center ONE metaphor,
bottom 判断軸・ひっかけ・暗記. Warm off-white. 16:9. Large Japanese. No overlap.

STRICT:
- Left header「論点」. Right header「ひっかけ」.
- 論点 Q&A. NO GO/STOP. YES only row 1.
- Never「だれが」.
- Labels:
  「代理商（通知を発し、物を占有する）」
  「商人（通知を受け、弁済すべき）」
  「相手方（売買の通知を発し得る）」

Title:「代理商 — 遅滞なく通知せよ／弁済期到来なら留置可」
Chip:「27条は発する。29条は受ける」

Center metaphor (ONE): a two-step conveyor, not two unrelated stories.
Step1 envelope flying FROM 代理商 TO 商人 labeled「遅滞なくその旨の通知（27条）」.
Step2 warehouse box in 代理商's hands labeled「商人のために占有する物・有価証券」
with a lock「弁済期到来まで留置（31条）」.
A small reverse dashed arrow FROM 相手方 TO 代理商 labeled「売買に関する通知を受ける権限（29条）」.
Tiny footer:「問屋には27条と31条を準用（557条）」.
Do not teach 28条競業 or 30条解除.

Left 論点:
1. 代理・媒介をしたら商人へ通知するか？ → YES（27条）
2. 留置できるのは → 弁済期到来後、占有する物又は有価証券（31条）
3. 29条は → 売買に関する通知を受ける権限

Right ひっかけ:
- 27条は相手方からの通知を受ける義務
- 29条は商人への通知義務
- 弁済期前でも留置できる
- 商人の財産なら占有していなくても留置できる
- 別段の意思表示があっても31条は強行

Bottom:
- 判断軸:「発する通知か、受ける権限か。留置は弁済期到来と占有か」
- ひっかけ:「27条と29条の向きを入れ替えるな。留置を全財産に広げるな」
- 暗記:「代理・媒介したら遅滞なく商人へ。弁済期到来の債権は占有物を留置可」
Answer capsule:
「代理商は、取引の代理又は媒介をしたときは、遅滞なく商人にその旨を通知しなければならない。弁済期が到来した債権については、商人のために占有する物又は有価証券を留置することができる。」

Guide: ちゃちゃロット SMALL bottom-right, green lecturer suit, 指し棒 to 暗記.
Match chachalot.png. No nameplate. Not a bear/owl/cat.
```

## 目視チェック（生成後・必須）

- [ ] 27条の矢印が商人向き。29条が「発する義務」になっていない
- [ ] 留置に弁済期到来と占有がある。全財産留置になっていない
- [ ] 557条を29条準用と書いていない
- [ ] ちゃちゃロット緑スーツ。文字かぶりなし

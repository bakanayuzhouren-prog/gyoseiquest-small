# Codex用・商法教科書（仲立人 vs 問屋）

てらしぃ指示（2026-09-29）: この1枚だけ上書きする。全体の作り直しはしない。右下の案内役の帽子を正す。タイトルと表の「乗る」「乗らない」は、当事者になる／当事者にならない、に置き換える。543条・544条・551条・552条の結論は変えない。

- 保存先: `assets/images/deepdive/textbook/shouhou/cast-nakadachi-tonya.png`
- 上書き対象: `assets/images/deepdive/textbook/shouhou/cast-nakadachi-tonya.png`（てらしぃがこのファイルの帽子修正を指示）
- 画像キー: `textbook/shouhou/cast-nakadachi-tonya`
- 前提: SKILL.md / 見本PNG / ちゃちゃロット正本
- 範囲: **この1枚の画像生成まで**

## 法律の芯（崩すな）

商法543条: 仲立人とは、**他人間の商行為の媒介**をすることを業とする者。

商法544条: 仲立人は、その媒介により成立させた行為について、当事者のために**支払その他の給付を受けることができない**。ただし、当事者の別段の意思表示又は別段の慣習があるときは、この限りでない。

（545条は見本保管。代金受領の条文は**544条**。545と取り違えるな。）

商法551条: 問屋とは、**自己の名をもって他人のために**物品の販売又は買入れをすることを業とする者。

商法552条1項: 問屋は、他人のためにした販売又は買入れにより、相手方に対して、**自ら権利を取得し、義務を負う**。

混ぜない（この1枚では書かない）:

- 549条（氏名を示さないときの仲立人の履行責任）
- 553条（問屋の担保責任）
- 555条（介入権）
- 代理商27条（継続的な特定商人のための代理・媒介。仲立は案件ごとの媒介）

## チェックリスト（埋済）

| 欄 | 内容 |
|----|------|
| タイトル | 仲立人は当事者にならない／問屋は当事者になる |
| 中央 | 上下2本の契約線 |
| 表の行 | 白／薄いグレー交互 |
| 判断軸 | 媒介か、自己の名で自ら権利義務を負うか |
| ひっかけ | 仲立＝問屋／問屋は当事者にならない／代金受領を545条にする |
| 暗記 | 仲立は媒介。問屋は自己の名で自ら権利義務 |
| 配置先 | textbook/shouhou/cast-nakadachi-tonya |

## 論点Q&A（GOなし）

- 仲立人は契約の当事者か？ → NO（543条）
- 仲立人は代金等を受け取れるか → 原則できない（544条）
- 問屋の対外当事者は → 問屋自身（551条・552条）

## 役割

- 上: **仲立人（他人間の商行為を媒介する）**
- 下: **問屋（自己の名で販売又は買入れをする）**
- 左右: **委託者（計算の主人）**／**相手方（契約の相手）** ※問屋段のみ委託者は裏

## GPT Image プロンプト（この1枚を上書き）

```text
参照必須: assets/images/characters/chachalot.png、skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png、skills/gyosei-image-style/assets/approved-chachalot-pointer.png。

Edit the existing infographic assets/images/deepdive/textbook/shouhou/cast-nakadachi-tonya.png. Keep the layout, the arrows, the people in the center, the article numbers, and the conclusions. Change only the title, one table cell, and the guide's hat.

Title, replace the current title with this exact line:
仲立人は当事者にならない／問屋は当事者になる

In the table, the 仲立人 column of the 名義 row becomes:
媒介（当事者にならない）

The 問屋 column of that row stays:
自己の名

The guide at the bottom-right is one body in a green lecturer suit, with a white shirt, green trousers, and shoes. A thin pale-sky-blue hat sits on the head as a separate piece. The hat has two round peaks on the left and right, a low peak in the center, and a long smooth brim. The hat's face is a smile with two closed eyes. A wooden pointer aims at the 暗記 card and does not cover the letters. No nameplate.
```

## 目視チェック（生成後・必須）

- [ ] 代金制限が544条（545条になっていない）
- [ ] 問屋は当事者になる。仲立人は当事者にならない。タイトルに「乗る」がない
- [ ] 行ゼブラ。GOなし
- [ ] ちゃちゃロット緑スーツ。文字かぶりなし

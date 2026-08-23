# 廃止 → 1から生成 `codex-gen-q9-145.md` を使え。局所Edit禁止。

# Codex修正プロンプト：民法記述Q9（145条・423条・時効援用の代位）

てらしぃ報告済みの誤情報を直す。**全体の作り直し禁止。** 条文番号のラベルだけ直す。

## 誤っている（現状）

中央のロボットアーム付近に **「民法145条（債権者代位権）」**。

- **145条**＝時効の援用（援用しなければ時効の効果は生じない）
- **423条**＝債権者代位権

145条を「債権者代位権」と呼ぶのは条文の取り違え。フォロワーに出せない。

完成→援用→効果のメタファー、答え帯、判断軸は正しい。壊すな。

## 正しい知識

時効の効果は援用して初めて生じる（145条）。  
本人（債務者X）が援用しないとき、債権者Aは債権者代位権（423条）でXの援用権を行使できる。

答案の芯（変更しない）:
`Aは債権者代位権によってXのYに対する当該債務の消滅時効を援用すれば足りる。`

## 直す文言

- 「民法145条（債権者代位権）」を削除
- 鍵「援用」側:「145条・時効の援用」
- 代位アーム側:「423条・債権者代位権」
- 二つを並べて「代位(423)で本人の援用(145)をする」と読めるようにする

## GPT Image プロンプト

参照必須:
- 元図 `assets/images/deepdive/textbook/minpou-kijutsu/q9.png`
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`

```text
Edit the existing Japanese legal infographic. Keep door-and-key metaphor, 完成→援用→効果 flow, trap panel, bottom cards, answer capsule.

Fix ONLY the statute-number label error.

DELETE / NEVER write:「民法145条（債権者代位権）」
That pairing is legally false.

REPLACE with two separate correct labels:
- On the key / 援用:「145条・時効の援用」
- On the subrogation arm / 債権者代位:「423条・債権者代位権」
Optional small line:「代位(423)で本人の援用(145)をする」

Do NOT change:
- Title「時効援用 — 代位で本人の援用をする」
- Answer:「Aは債権者代位権によってXのYに対する当該債務の消滅時効を援用すれば足りる。」
- 判断軸「時効は援用して初めて効く。代位で本人の援用。」
- Traps: 差押だけ / 口頭約束 / 本人以外が勝手に援用

Guide: smiling-hat mascot from approved-smiling-hat-mascot.png (hat not ears).
Keep Japanese large, no overlap.
```

保存先（上書き）: `assets/images/deepdive/textbook/minpou-kijutsu/q9.png`  
その後 Cursor がマップ・bundle を更新する。

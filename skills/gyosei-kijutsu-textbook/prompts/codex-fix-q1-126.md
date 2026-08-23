# 廃止 → Q1は再生成済みで誤表記なし。触るな。`codex-q1-126-ronten.md` が見本。

# Codex修正プロンプト：民法記述Q1（126条・取消権の期間）

てらしぃ報告済みの誤誘導を直す。**全体の作り直し禁止。** 赤Xの意味と起算の書き分けだけ直す。

## 誤っている／誤誘導（現状）

タイムラインの2箱（「追認できる時から5年」「行為の時から20年」）と答え帯・暗記は正しい。壊すな。

壊れているのは次だけ:

1. 中央の赤Xが「行為の時から起算」に乗っている → **20年の起算まで否定**して読める。
2. 左GO2「起算＝追認をすることができる時」が期間指定なし → 126条の二本立てが潰れる。
3. 左GO3「5年又は20年以内」に起算がない。
4. 判断軸「いつから？追認できる時」だけだと、**20年＝行為の時から**が消える。

## 正しい知識（民法126条）

取消権は、

- **追認をすることができる時から５年**行使しないときは時効消滅
- **行為の時から２０年**を経過したときも同様

答案の芯（変更しない）:
`Xは追認できる時から５年又は行為の時から２０年以内に取消権を行使すればよい。`

## 直す文言（この日本語に置換）

- 左GO2:「５年の起算＝追認できる時から」
- 左GO3:「２０年の起算＝行為の時から」
- 中央の赤X対象:「５年を行為の時から起算」だけ（「行為の時から２０年」は消さない・Xしない）
- 判断軸:「５年は追認できる時から。２０年は行為の時から」
- 暗記・答え帯はそのまま

右の注意「起算を行為の時だけにする」は残してよい（５年側のひっかけ）。

## GPT Image プロンプト

参照必須:
- 元図 `assets/images/deepdive/textbook/minpou-kijutsu/q1.png`（レイアウト維持）
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`

```text
Edit the existing Japanese legal infographic. Keep layout, timeline, land plot, side panels, bottom three cards, answer capsule.

Fix ONLY Civil Code 126 start-point wording.

KEEP unchanged:
- Timeline boxes「追認できる時から5年」and「行為の時から20年」
- Answer:「Xは追認できる時から５年又は行為の時から２０年以内に取消権を行使すればよい」
- 暗記:「追認できる時から5年／行為の時から20年」
- Traps: bicycle, fraud, B's good faith

CHANGE:
- Red X must mark ONLY「５年を行為の時から起算」(not all「行為の時から起算」).
- Do NOT put a red X on「行為の時から20年」.
- Left GO row 2:「５年の起算＝追認できる時から」
- Left GO row 3:「２０年の起算＝行為の時から」
- 判断軸 card:「５年は追認できる時から。２０年は行為の時から」

Guide: replace bear/ear-hat with smiling-hat mascot from approved-smiling-hat-mascot.png
(hat not ears, cream face, equal circle eyes, four cheek marks, no glasses).
Keep Japanese large, no overlap.
```

保存先（上書き）: `assets/images/deepdive/textbook/minpou-kijutsu/q1.png`  
その後 Cursor が deepdiveマップ・bundle を更新する。

# 廃止 → 1から生成 `codex-gen-q11-186.md` を使え。局所Edit禁止。

# Codex修正プロンプト：民法記述Q11（162条・186条・取得時効の推定）

てらしぃ報告済みの誤誘導を直す。**全体の作り直し禁止。** タイトルだけ直す。

## 誤誘導（現状）

タイトル「取得時効 — なぜ占有の証明で足りるか」は、**占有だけで足りる**（無過失不要）に読める。

本件は10年の占有。162条2項の短期取得時効は、占有開始時の **善意かつ無過失** が要る。  
186条1項が推定するのは所有の意思・善意・平穏・公然。**無過失は推定されない**（自分で示す）。

図の中身は正しい:

- 推定される: 所有意思・善意・平穏かつ公然
- ひっかけ:「無過失まで推定される、と誤解」
- 「無過失は別」
- 答え帯は答案の芯どおり

壊すな。タイトルと、占有だけで足りると読める見出しだけ直す。

## 正しい知識

問: 占有したことと無過失を立証すれば足りるとされるのはなぜか。  
理由: 186条で所有意思・善意・平穏・公然は推定されるから。無過失は推定の外。

答案の芯（変更しない）:
`占有者は所有の意思をもって善意で平穏にかつ公然と占有するものと推定されるからである。`

## 直す文言

- タイトル:「取得時効 — 186条推定（無過失は推定されない）」
- 任意チップ:「占有だけで足りる、ではない」
- 左見出しが「占有の証明で足りる」なら「推定で足りるもの」に置換

## GPT Image プロンプト

参照必須:
- 元図 `assets/images/deepdive/textbook/minpou-kijutsu/q11.png`
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`

```text
Edit the existing Japanese legal infographic. Keep 186 shield, left presumed list, right trap list, 無過失は別 bubble, bottom cards, answer capsule.

Fix ONLY the misleading title.

REPLACE title
「取得時効 — なぜ占有の証明で足りるか」
with
「取得時効 — 186条推定（無過失は推定されない）」

Optional small chip:「占有だけで足りる、ではない」

Do NOT change:
- Presumed items: 所有の意思 / 善意 / 平穏かつ公然
- Trap: 無過失まで推定される、と誤解
- Bubble: 無過失は別
- Answer:「占有者は所有の意思をもって善意で平穏にかつ公然と占有するものと推定されるからである。」
- 判断軸 / 暗記 cards

Guide: smiling-hat mascot from approved-smiling-hat-mascot.png (hat not ears).
Keep Japanese large, no overlap.
```

保存先（上書き）: `assets/images/deepdive/textbook/minpou-kijutsu/q11.png`  
その後 Cursor がマップ・bundle を更新する。

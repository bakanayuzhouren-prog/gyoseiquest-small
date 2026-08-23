# 1から生成：民法記述Q4（94条・177条・通謀虚偽表示）

**既存図は捨てる。** 買主Aが走っている誤表記があるため、局所修正せず新規作成。

## 誤表記（旧図）

中央レース「買主A vs 買主D」。Aは仮装譲渡した**所有者**であり買主ではない。問は **CがDに勝つ**条件。

## 正しい知識

- A・Bの通謀虚偽表示は無効（94条1項）
- 善意の第三者には対抗できない（94条2項）→ 本件のC
- 善意同士の後続争いは登記（177条）→ CがDより先に登記

答案の芯:
`虚偽表示につき善意であり、Dより先に対抗要件としての登記を備えたときである。`

## 登場人物（必ずラベル）

- 買主C（先に登記したい）＝Bからの転得者（走る側・緑）
- 買主D（未登記の買主）＝Aからの買主（走る側・橙）
- A＝仮装譲渡した所有者（走らせない。買主と書かない）
- B＝通謀の相手（走らせない）
- 「だれが」は書かない

## GPT Image プロンプト（CREATE FROM SCRATCH）

参照: `approved-shusaisha-kyoka.png`（密度）／`approved-smiling-hat-mascot.png`／`codex-q1-126-ronten.md`（見出し）

```text
Create a NEW Japanese legal-study infographic from scratch for Gyosei Quest / あぷし.
Do not copy the old Q4 racer labels. Never write「買主A」.

Match Q1 heading style (AGENTS.md):
- Left green header MUST be「論点」(never「問が聞くこと」)
- Right orange header MUST be「ひっかけ」(never「（聞かない）」)
- 論点 rows are Q&A. NO GO badges on 論点. Never mix GO and YES.
- Labels:「買主C（先に登記したい）」／「買主D（未登記の買主）」. Never「だれが」.
- Statute numbers as（94条）（177条）inside explanation rows, not only the title
- Bottom cards: 判断軸 / ひっかけ / 暗記
- Answer capsule
- 16:9 warm off-white, navy title, large Japanese, no overlap
- Guide: smiling-hat mascot from approved-smiling-hat-mascot.png
  (pale-sky-blue HAT not ears, cream face, equal circle eyes, four cheek marks, no glasses, not a bear/owl)

Title:「通謀虚偽表示 — 善意同士は登記勝負」
Chip:「物置・地役権はトラップ」

Left 論点 Q&A (no GO):
1. CはDに勝てる？ → YES（条件つき）
2. 善意？ → 虚偽表示につき善意（94条2項）
3. 登記？ → Dより先に対抗要件（177条）

Center metaphor: two-lane race to arch「登記」.
Green racer label「買主C（先に登記したい）」
Orange racer label「買主D（未登記の買主）」
Tiny off-track labels allowed: A＝仮装の所有者 / B＝通謀相手
NEVER label A as 買主.

Right ひっかけ:
- 当事者間の無効だけで終わる
- 物置・地役権の枝葉

Bottom:
- 判断軸:「善意？＋先に登記を備えたか（177条）」
- ひっかけ:「無効だから負け、と早とちりするな」
- 暗記:「善意＋先に登記」
Answer:
「虚偽表示につき善意であり、Dより先に対抗要件としての登記を備えたときである。」
```

保存: `assets/images/deepdive/textbook/minpou-kijutsu/q4.png`

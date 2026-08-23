**廃止（局所Editは使わない）:** 誤表記図は1から生成。正本は `codex-gen-q4-94.md`。

てらしぃ報告済みの誤情報を直す。**全体の作り直し禁止。** ゼッケンの主体だけ直す。

## 誤っている（現状）

中央の登記レースが **「買主A」vs「買主D」**。

本件の当事者:

- A＝仮装譲渡した所有者（売主側。買主ではない）
- B＝通謀相手（仮装譲受人）
- **C**＝Bから転得した善意の第三者
- **D**＝Aから直接買った、まだ登記のない者

問は「**CがDに勝つ**のはどのようなときか」。レースは **C vs D**。Aを買主にしてはいけない。

左パネル・答え帯は正しい（善意＋Dより先に登記）。壊すな。

## 正しい知識

94条2項の善意第三者保護のあと、善意同士の後続争いは177条の登記勝負。  
Cが勝つ要件＝虚偽表示につき善意、かつDより先に対抗要件（登記）。

答案の芯（変更しない）:
`虚偽表示につき善意であり、Dより先に対抗要件としての登記を備えたときである。`

## 直す文言

- 緑レーンのゼッケン:「買主A」→「買主C」
- 橙レーンのゼッケン:「買主D」のまま
- 必要なら小さく「C＝Bからの転得者」「D＝Aからの買主（未登記）」
- 中央見出しは「善意同士の後続争い 登記」のままでよい

## GPT Image プロンプト

参照必須:
- 元図 `assets/images/deepdive/textbook/minpou-kijutsu/q4.png`
- `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`

```text
Edit the existing Japanese legal infographic. Keep layout, two-lane race to 登記 arch, left GO / right trap panels, bottom cards, answer capsule.

Fix ONLY the racer labels (Civil Code 94/177).

WRONG: green racer bib「買主A」
RIGHT: green racer bib「買主C」
Keep orange racer bib「買主D」.

Optional tiny captions near racers:
- C:「Bからの転得者」
- D:「Aからの買主（未登記）」

Do NOT change:
- Title「通謀虚偽表示 — 善意同士は登記勝負」
- Left GO: 虚偽表示につき善意 / Dより先に対抗要件（登記）
- Answer:「虚偽表示につき善意であり、Dより先に対抗要件としての登記を備えたときである。」
- 判断軸「善意？＋先に登記を備えたか（177条）」
- Traps: 当事者間の無効だけで終わる / 物置・地役権

A is the original owner who made a false transfer, NOT a buyer. Never label A as 買主.

Guide: smiling-hat mascot from approved-smiling-hat-mascot.png (hat not ears).
Keep Japanese large, no overlap.
```

保存先（上書き）: `assets/images/deepdive/textbook/minpou-kijutsu/q4.png`  
その後 Cursor がマップ・bundle を更新する。

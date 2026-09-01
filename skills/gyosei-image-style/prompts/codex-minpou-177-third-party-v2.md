# 民法177条・登記なしに対抗できる者（新版・通行地役権行あり）

- 保存先: assets/images/deepdive/learn/minnpou/minpo-bukken-third-party-177-v2.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- **旧図は上書きしない:** `assets/images/deepdive/bukken/reference/minpo-bukken-third-party-177.png`
- 根拠: e-Gov 民法177条、不動産登記法5条1項・2項、大判明41.12.15（制限説）、最判昭25.12.19（不法占拠者）、最判昭34.2.12（無権利の名義人）、最判昭43.8.2（背信的悪意者）、最判平10.2.13（通行地役権の承役地の譲受人）
- 著作権: 市販講座の表・問題文は転載しない。条文・判例の芯から自作。
- **てらしぃ指示:** 記述図の左右パネル（論点／ひっかけ）は置かない。表を主役。行背面は横一列ずつ白／薄いグレー。通行地役権の行を必ず入れる。

配置（生成後・Cursor）: 見て聞いて覚える・民法物権（177条・背信的悪意者・不法占拠）。旧キーは差し替えない。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 177条: 不動産に関する物権の得喪及び変更は、登記をしなければ第三者に対抗することができない。
- 第三者（制限説・大判明41.12.15）: 当事者および包括承継人以外の者で、登記の欠缺を主張する正当な利益を有する者。
- 正当な利益がない者には、登記なしに対抗できる。
- 単なる悪意者は第三者に当たる。二重譲渡のCが悪意でも、背信的悪意者でなければ登記が必要。
- 背信的悪意者は信義則により第三者から排除される（最判昭43.8.2等）。単なる悪意ではない。
- 不動産登記法5条1項: 詐欺又は強迫によって登記の申請を妨げた第三者は、その登記がないことを主張することができない。
- 同5条2項: 他人のために登記を申請する義務を負う第三者は、その登記がないことを主張することができない（ただし書あり。表の注に置く）。
- 通行地役権（最判平10.2.13）: 承役地の譲渡時に、要役地の所有者によって継続的に通路として使用されていることが位置・形状・構造等の物理的状況から客観的に明らかであり、かつ譲受人がそのことを認識していたか又は認識することが可能であったときは、地役権設定の事実を知らなくても、特段の事情がない限り、地役権設定登記の欠缺を主張する正当な利益を有する第三者に当たらない。外形が明らかでない譲受人まで広げない。
- 94条2項の第三者（虚偽表示）とは別棚。図に混ぜない。
- 禁止: 悪意なら常に登記不要、通行地役権は常に登記不要、94条の第三者を177の表に入れる。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 民法177条。登記なしに対抗できる相手を先に外す。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

NO left panel. NO right panel. NO 論点 box. NO ひっかけ side box. The table is the whole center.

Title:「登記なしに対抗できる相手を先に外す」
Chip:「民法177条」

MAIN: one wide comparison table. Three columns: 相手 | 第三者性 | 登記なし対抗
Header row navy white text. Data rows alternate: row1 white, row2 light gray, then white / light gray (ROW zebra only, never column zebra). Wide cell padding. Font large enough to read on a phone. No tiny footnotes inside cells.

Rows EXACT (8 data rows):
当事者・包括承継人 | 第三者に当たらない | できる
前主後主の関係にある者 | 第三者に当たらない | できる
無権利の名義人 | 第三者に当たらない | できる
不法占拠者 | 第三者に当たらない | できる
不登法5条の者（申請妨害・申請義務） | 登記欠缺を主張できない | できる
背信的悪意者 | 信義則で排除 | できる
通行地役権の承役地の譲受人（外形が客観的に明らかで、知り又は知り得たとき） | 第三者に当たらない | できる
単なる悪意者 | 第三者に当たる | 登記が必要

The 7th row MUST include 通行地役権. Do not drop that row. Do not write that every transferee of a servient land can be opposed without registration.

Under the table, one thin note (not a side panel):
第三者は、当事者・包括承継人以外で、登記の欠缺を主張する正当な利益を有する者である（大判明41.12.15）。
通行地役権は、譲渡時に継続的通路使用が位置・形状・構造から客観的に明らかで、譲受人が知り又は知り得たときに限る（最判平10.2.13）。外形が明らかでない譲受人は第三者に当たる。
不登法5条2項にはただし書がある。94条2項の第三者とは別棚。

No center cartoon that covers the table. Optional tiny registry-book icon in the title bar only.

Bottom three cards (below the table, not left/right):
判断軸: 登記の欠缺を主張する正当な利益があるか
ひっかけ: 単なる悪意者にも登記なしで対抗できる、とする。通行地役権は外形も認識可能性もなく常に登記不要、とする
暗記: 正当な利益がない者には登記なしで対抗できる。単なる悪意者には登記が必要。通行地役権は外形が明らかで知り又は知り得たとき

Answer bar EXACT:
「177条の第三者は、登記の欠缺を主張する正当な利益を有する者である。正当な利益がない者には、登記なしに対抗できる。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+white shirt+green trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る as a legal verb. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 単なる悪意者の行は「第三者に当たる／登記が必要」
- [ ] 背信的悪意者の行は「できる」（単なる悪意と混同していない）
- [ ] 通行地役権の行があり、外形が客観的に明らか・知り又は知り得た、の条件が落ちていない
- [ ] 旧図 `minpo-bukken-third-party-177.png` を上書きしていない
- [ ] 保存先は `assets/images/deepdive/learn/minnpou/minpo-bukken-third-party-177-v2.png`
- [ ] 左右パネルがない
- [ ] 行ゼブラ（白／薄いグレー）

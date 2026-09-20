# 個情法57条・全部又は一部／付随／第4章／学術（2枚目）

- 保存先: assets/images/deepdive/learn/kojinjoho/57-ichibu-fuzui-gakujutsu.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 個人情報保護法57条1項本文・3項、18条3項五号・六号、20条2項五号・六号、27条1項五号〜七号、179条。通則ガイドライン「5 適用除外」「7 学術研究機関等の責務」（確認日 2026-09-17）
- 正本: `utils/kojinjoho57Hikaku.ts`／`leckoukai-r2-q55-個人情報保護法の適用除外`（原文転載なし）
- 1枚目: `codex-kojin-57-shutai-mokuteki.md`

配置（生成後・Cursor）: 1枚目の直後。見て聞いて覚える・個人情報。LEC公開2・問55の深掘り。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 57条1項本文は「取り扱う目的の全部又は一部がそれぞれ当該各号に規定する目的であるとき」。一部でも所定目的なら第4章は適用しない。所定目的を全く含まない取扱いまでは除外されない。
- 宗教活動・政治活動には「これに付随する活動を含む」。通則ガイドライン: 付随の例は霊園・宿坊、労働運動の支援等。付随＝何でも可、ではない。
- 外れるのは第4章。法全体が適用されない、と書かない（タイトル・答え帯・暗記も禁止。ひっかけパネルに誤言として置くのは可）。
- 57条3項は安全管理・苦情処理等の自主措置と公表の努力。第4章が外れても何もしなくてよい、ではない。
- 179条（個人情報データベース等不正提供罪）は57条1項各号の者にも適用（通則ガイドライン※5）。
- 学術研究は57条の包括除外ではない。18条・20条・27条の要件付き例外。権利利益の不当侵害のおそれがある場合は例外にならない。59条は学術研究機関等の責務（この枚の表に59条を57条除外として載せない）。
- ○×の意味は「57条の適用除外に該当するか」。学術研究行は×。
- 禁止: GOとYESの混在。ブランド名・透かしの印字。
- 参照パス確認: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`、`skills/gyosei-image-style/assets/approved-chachalot-pointer.png`、`assets/images/characters/task_turtle_sheet.png`、`assets/images/characters/subeton_sheet.png` は実在。

## プロンプト考案チェック

| 欄 | 内容 |
|----|------|
| 見本 | 主宰者許可図。表は行ゼブラ |
| タイトル対比 | 全部又は一部／第4章のみ。学術は57条ではない |
| 左右 | 論点＝範囲。ひっかけ＝全部除外・法全体・研究なら無条件 |
| 中央 | 第4章の箱だけが外れる。他章は残る |
| 判断軸 | 目的に所定目的が含まれるか。学術は別条文 |
| ひっかけ | 全く含まない取扱いまで除外。大学は57条 |
| 暗記 | 一部でも所定目的なら第4章。学術は18・20・27 |
| 場面役 | いい役＝タスク亀（要件を確認）。悪い役＝すべとん（法全体除外） |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 個人情報保護法57条の目的範囲・付随・第4章・学術研究の切り分け。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Do not print any brand names or watermarks.

Title:「全部又は一部。外れるのは第4章。学術は57条ではない」
Chip:「57条1項・3項／18・20・27条」
Legend box (must be readable):「○×＝57条の適用除外に該当するか（第4章が外れるか）」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
全部又は一部で足りる？ → YES
所定目的を全く含まない？ → NO
宗教・政治の付随は含む？ → YES
外れる範囲は？ → 第4章
学術研究は57条？ → NO

Right panel heading ひっかけ:
所定目的を全く含まない取扱いまで除外
付随＝何でも可。属性だけで全業務除外
個人情報保護法全体が適用されない
第4章が外れたから措置は不要
研究目的なら無条件に制限が外れる
大学は57条の包括除外

MAIN: one clean table. Columns: 取扱いの状況 | 57条
Header row navy. Data rows alternate white / light gray by ROW (not by column). First data row white, second light gray, then white, then light gray, then white.

Rows EXACT:
目的の全部が所定目的（57条1項） | ○
目的の一部が所定目的 | ○
所定目的を全く含まない | ×
宗教・政治の付随活動の用（霊園・宿坊、労働運動の支援等） | ○
学術研究目的（大学等。18条・20条・27条） | ×

Tiny footnote under the table (large enough to read, one line):
「第4章が外れても57条3項の自主措置・公表の努力は残る。179条は適用される。」

Small center metaphor only: a box labeled 第4章 lifts off. Boxes labeled 他の章 and 179条 stay on the desk. Do not cover the table.
Role labels under figures (never だれが):
学術研究機関等（要件付き例外を確認したい）＝タスク亀. Match assets/images/characters/task_turtle.png and pose sheet assets/images/characters/task_turtle_sheet.png. Left, small.
法全体除外の主張者（第4章以外まで外したい）＝すべとん. Match pose sheet assets/images/characters/subeton_sheet.png. Right, small.
Do not hide table text, arrows, or the navy answer bar.

Bottom three cards:
判断軸: 所定目的を含むか。含む範囲は第4章。学術は別条
ひっかけ: 全く含まない取扱いまで除外。法全体。大学は57条
暗記: 全部又は一部。付随は宗教・政治。外れるのは第4章。学術は18条・20条・27条

Answer bar EXACT:
「目的の全部又は一部が所定目的であるときに第4章を適用しない。所定目的を全く含まない取扱いまでは除外されない。学術研究は57条の包括除外ではない。」

Guide: ONE ちゃちゃロット only. Copy assets/images/characters/chachalot.png and skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png and skills/gyosei-image-style/assets/approved-chachalot-pointer.png: cream face, pale-sky-blue hat (independent of the head, not ears), green lecturer suit with trousers and shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never「だれが」as a character caption. Never「問が聞くこと」.
Do not write that the entire Act is inapplicable except as a labeled ひっかけ.
```

## 生成後チェック

- [ ] ○×＝57条該当。学術行は×
- [ ] 全部又は一部／全く含まない／付随／第4章／18・20・27
- [ ] 答え帯・暗記に「法全体が対象外」がない
- [ ] 行ゼブラ。文字かぶりなし

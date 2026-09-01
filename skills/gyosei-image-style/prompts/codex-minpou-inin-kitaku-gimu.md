# 委任を軸にした比較（義務側）

- 保存先: assets/images/deepdive/learn/minnpou/inin-kitaku-gimu.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 民法644条〜647条、644条の2、658条、659条、660条、665条、671条、697条〜699条、701条
- 著作権: 市販表の文言・記号列は転載しない。条文から自作する。

配置（生成後・Cursor）: 見て聞いて覚える・債権各論（委任・寄託・事務管理）。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 委任の善管は644条。寄託の644条は665条の準用リストにない。有償寄託は400条、無償は659条（自己の財産と同一の注意）。
- 寄託の665条（現行）は646条から648条まで、649条、650条1項2項。645条（報告）と650条3項は準用しない。報告に近いのは660条（第三者の権利主張等の通知）。
- 組合は671条で644条から650条までを、業務を決定し又は執行する組合員に準用する。
- 事務管理の注意は697条。緊急は698条で悪意又は重過失がなければ賠償責任を負わない。報告は701条で645条準用。開始の通知は699条。
- 復委任（644条の2）は許諾又はやむを得ない事由。寄託の第三者保管は658条で原則として承諾が要る。701条に644条の2はない。
- 禁止: 寄託の報告を645条準用○と書く。寄託の善管を常に644条と書く。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 委任を軸に、寄託・組合・事務管理の義務を比較する。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs. Do not copy any commercial textbook table wording.

Title:「義務は委任が軸。寄託の善管と報告は別条」
Chip:「644〜647／665／671／701」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
委任の善管は？ → 644条
寄託に644条準用？ → NO
寄託に645条準用？ → NO
組合に644〜650準用？ → YES（業務を決定・執行する組合員）

Right panel heading ひっかけ:
寄託も全部644条
寄託の報告も645条準用
事務管理の注意も644条だけ
復委任と転寄託を同じにする

MAIN: one clean table. Columns: 義務 | 委任 | 寄託 | 組合 | 事務管理
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra). Cell text must stay inside cells.

Rows EXACT:
善管注意 | 644条 | 有償400条／無償659条（644は665にない） | 671条で644準用 | 697条。緊急は698条で軽減
報告 | 645条 | 645準用なし。権利主張等は660条 | 645準用 | 701条で645準用。開始は699条
引渡し | 646条 | 665条で646準用 | 646準用 | 701条で646準用
金銭消費 | 647条 | 647準用 | 647準用 | 701条で647準用
復委任等 | 644条の2（許諾又はやむを得ない事由） | 第三者保管は658条で原則承諾 | 644条の2準用 | 644条の2は準用なし

Small center metaphor: four folders labeled 委任 寄託 組合 事務管理. Do not cover the table.

Bottom three cards:
判断軸: 先に665・671・701の準用リストを見る
ひっかけ: 寄託まで委任の善管・報告を横流しする
暗記: 寄託の善管は有償400・無償659。報告は645ではなく660

Answer bar EXACT:
「寄託に644条と645条は準用しない。組合は644条から650条までを準用する。事務管理の注意は697条である。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 寄託に644・645準用なし
- [ ] 組合は644〜650
- [ ] 行ゼブラ・文字かぶりなし

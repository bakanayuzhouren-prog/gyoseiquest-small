# 国賠・1条の対象になる定番（表1）

- 保存先: assets/images/deepdive/learn/kokubai/1jo-ari.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 姉妹: `codex-kokubai-1jo-nashi.md`／`codex-kokubai-2jo-ari.md`／`codex-kokubai-2jo-nashi.md`／`codex-kokubai-kikiwake.md`

配置（生成後・Cursor）: 見て聞いて覚える・国家賠償法、問題を解くの該当肢「もっと深掘る」。

## PRE-GENERATE-CHECK（Cursor確認済み）

根拠: e-Gov 国賠1条1項。正本 `utils/chatTopicBriefsKokubai.ts`／`src/kokubai_learn_content.js`／合格革命・LEC公開模試 topics。問題文・肢の全文は転載しない。

- 1条の対象＝国又は公共団体の公権力の行使に当たる公務員が、職務を行うについて故意又は過失により違法に他人に損害を加えたとき。
- この枚は「棚が1条か」。違法が常に認められる、ではない。違法の中身は芯列に書く。
- パトカー追跡＝1条（最判昭61.2.27）。開始・継続・方法が不必要又は不相当なときに違法になり得る。
- 指定確認検査機関の建築確認＝1条の公務員（最判平17.6.24）。責任主体は確認権限のある地方公共団体。
- 規制権限不行使＝1条（筑豊・クロロキン）。著しく合理性を欠くときに違法になり得る。権限がある＝常に義務ではない。
- 立法不作為＝原則は高度の裁量。例外として在外邦人の選挙権（最大判平17.9.14）・国民審査の長期怠り（最大判令4.5.25）が1条になり得る。
- 税務更正・起訴も枠は1条。取消・無罪だけでは直ちに違法ではない。
- 消防の消火活動は公権力（1条）。失火責任法（重過失）は別棚。この枚で失火結論を断定しない。
- 禁止: 切る／切れない。2条の道路河川表を混入。模試原文。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. PAGE 1 of 国賠1条・2条 tables. Do not draw 2条営造物 rows.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs. Explanation text is the priority.

Title:「国賠1条の対象になる定番」
Chip:「国賠1条1項。公権力の行使に当たる公務員の職務」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
1条の対象は？ → 公務員の公権力行使
人の行為？ → YES
モノの欠陥？ → NO（2条）

Right panel heading ひっかけ:
権限がある＝常に行使義務
取消された＝直ちに1条違法
民間機関だから1条ではない
立法は絶対に国賠にならない

MAIN: one clean table. Columns: 場面 | 結論 | 芯
Header row navy. Data rows alternate: row1 white, row2 light gray, row3 white (row zebra, never column zebra).
結論 column: 1条 only on this page, green circle, large.

Rows EXACT (do not add or invent):
パトカー追跡 | 1条 | 開始・継続・方法が不必要又は不相当なとき違法（昭61.2.27）
指定確認検査機関の建築確認 | 1条 | 公権力の公務員。責任は地方公共団体（平17.6.24）
規制権限の不行使 | 1条 | 著しく合理性を欠くときに違法（筑豊・クロロキン）
立法不作為（例外） | 1条 | 必要不可欠が明白なのに正当理由なく長期に怠るとき
税務署長の更正 | 1条 | 枠は1条。漫然と更正したときに限り違法（平5.3.11）
公訴提起 | 1条 | 枠は1条。無罪確定だけでは直ちに違法ではない（昭53.10.20）
消防の消火活動 | 1条 | 公権力の行使。失火の重過失は別棚

Center metaphor small only: a person in uniform labeled 公務員（職務を行う）. Do not cover the table. Do not write だれが.

Bottom three cards:
判断軸: 人の公権力行使か。違法は職務上の義務違反で見る（国賠1条1項）
ひっかけ: 結果が悪いことだけで直ちに1条違法にしない
暗記: 追跡・指定機関・権限不行使・例外の立法不作為は1条の棚

Answer bar EXACT:
「国賠1条は、公権力の行使に当たる公務員の職務について見る。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 結論列は「1条」だけ。2条行がない
- [ ] 追跡の芯に「又は」がある
- [ ] 立法は例外と書いてある

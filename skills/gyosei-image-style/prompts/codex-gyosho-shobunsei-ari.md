# 行訴法・処分性あり（表1）

- 保存先: assets/images/deepdive/learn/gyosho/shobunsei-ari.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 姉妹: `codex-gyosho-shobunsei-nashi.md`（なし）／`codex-gyosho-shobunsei-kikiwake.md`（聞き分け）
- 原告適格表とは別シリーズ。この枚に原告適格の○×を混ぜない。

配置（生成後・Cursor）: 見て聞いて覚える・行政事件訴訟法の「もっと深掘る」、⑤質問するの処分性ガイド。

## PRE-GENERATE-CHECK（Cursor確認済み）

根拠は e-Gov 行訴法3条2項（処分の取消しの訴え）と、既存正本（`utils/chatTopicBriefsGyoseiGyosho.ts`／`GyoseiSoron.ts`／`GyoseiSoronNet.ts`／模試 topics）。原文の問題文は転載しない。

- 処分性＝権利義務を直接具体的に変動させる公権力の行使か。
- 二項道路の指定（一括指定を含む）＝○（最判平14.1.17）。私権制限が具体的に及ぶ。
- 労災就学援護費は支給決定も不支給決定も○（最判平15.9.4）。サービスだから×は誤り。
- 続柄記載＝公証でも○（最判平11.1.21）。
- 病院開設中止勧告＝形式は指導でも実質○になり得る（最判平17.7.15）。
- 土地区画整理の事業計画＝○（最大判平20.9.10）。青写真判決（昭41.2.23）からの変更。
- 第二種市街地再開発の決定・公告＝○（最判平4.11.26）。
- 特定の公立保育所を廃止する条例＝○（最大判平21.11.26）。条例一般が○ではない。
- 建築確認・代執行の戒告＝○（抗告訴訟の対象になる処分。羈束かどうかは別棚）。
- 確認できない細部（個別条例の事案名の断定など）は表に載せない。
- 禁止: 切る／切れない。原告適格の行を混入。模試原文。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. PAGE 1 of 行訴法・処分性 tables. Do not draw 原告適格.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs. Explanation text is the priority.

Title:「処分性がある定番」
Chip:「行訴法3条2項。権利義務を直接具体的に変動させるか」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
処分性とは？ → 取消訴訟の対象になる処分か
見るのは？ → 法的地位の直接の変動
名前が指導でも？ → 実質で見る

Right panel heading ひっかけ:
支給はサービスだから非処分
一括指定＝立法だから非処分
条例は常に非処分
区画整理はいまも青写真

MAIN: one clean table. Columns: 行為 | 結論 | 芯
Header row navy. Data rows alternate: row1 white, row2 light gray, row3 white (row zebra, never column zebra).
結論 column: ○ only on this page, green circle, large.

Rows EXACT (do not add or invent):
二項道路の指定（一括でも） | ○ | 敷地に建築制限等が及ぶ（平14.1.17）
建築確認 | ○ | 建築できる地位を具体化する
労災就学援護費の支給決定 | ○ | 決定で初めて請求権（平15.9.4）
同・不支給決定 | ○ | 不支給も処分。支給だけではない
住民票の続柄記載 | ○ | 公証でも身分関係の基礎（平11.1.21）
病院開設中止勧告 | ○ | 保険指定の壁など実質の不利益（平17.7.15）
土地区画整理の事業計画 | ○ | 換地を受けるべき地位・建築制限（平20.9.10）
第二種市街地再開発の決定・公告 | ○ | 収用の事業認定の告示とみなす（平4.11.26）
特定の保育所を廃止する条例 | ○ | 入所中の地位を直接奪う（平21.11.26）
代執行の戒告 | ○ | 義務の履行を求める処分。完了後は訴えの利益の棚

Center metaphor small only: a gate labeled 取消訴訟の入口. Do not cover the table.

Bottom three cards:
判断軸: 法的地位が他の処分を待たず直接動くか（行訴法3条2項）
ひっかけ: サービス・一括・条例・計画という名前だけで非処分にしない
暗記: 二項道路・就学援護（支給も）・続柄・病院勧告・区画整理・特定保育所廃止は○

Answer bar EXACT:
「処分性は、権利義務を直接具体的に変動させる公権力の行使かで見る。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] この枚の結論はすべて○。×行が混ざっていない
- [ ] 就学援護は支給と不支給が両方ある
- [ ] 保育所は「特定の廃止」であり条例一般ではない
- [ ] 行ゼブラ（白／薄いグレー）
- [ ] 原告適格の文言がない

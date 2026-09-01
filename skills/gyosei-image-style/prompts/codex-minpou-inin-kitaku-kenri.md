# 委任を軸にした比較（権利側）

- 保存先: assets/images/deepdive/learn/minnpou/inin-kitaku-kenri.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 民法648条、648条の2、649条、650条、651条、661条、665条、671条、701条、702条
- 著作権: 市販表の文言・記号列は転載しない。条文から自作する。

配置（生成後・Cursor）: 見て聞いて覚える・債権各論（委任・寄託・事務管理）。1枚目（義務）の直後。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 665条は648条を準用する（特約がなければ報酬請求不可。履行割合型の648条3項も含む）。648条の2（成果完成型）は665条にない。
- 665条は650条1項2項を準用する。650条3項（自己に過失なく受けた損害の賠償）は寄託に準用しない。661条は寄託物の性質又は瑕疵による損害であり、650条3項とは別。
- 671条は644条から650条までなので、648条の2と650条3項も組合側に入る。
- 701条は645条から647条までだけ。報酬・費用前払・650条3項は事務管理にない。費用は702条（有益費。本人の意思に反したときは現に利益を受けている限度。有益な債務の負担は702条2項）。
- 651条は委任の解除（各当事者がいつでも。相手方に不利な時期は賠償。やむを得ない事由があればこの限りでない）。寄託の解除は662条・663条。651条を寄託に準用しない。
- 禁止: 事務管理にも費用前払と無過失損害填補がある、と書く。寄託に成果完成型報酬がある、と書く。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 委任を軸に、寄託・組合・事務管理の権利を比較する。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs. Do not copy any commercial textbook table wording.

Title:「前払と無過失損害は委任。事務管理にはない」
Chip:「648〜650／665／671／702」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
費用前払は事務管理にある？ → NO
650条3項は寄託に準用？ → NO
成果完成型は寄託にある？ → NO
組合に650条まで準用？ → YES

Right panel heading ひっかけ:
事務管理にも前払と無過失損害填補
寄託に648条の2
寄託の661条を650条3項と同じにする
委任の651条解除を寄託に当てる

MAIN: one clean table. Columns: 権利 | 委任 | 寄託 | 組合 | 事務管理
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra). Cell text must stay inside cells.

Rows EXACT:
報酬（特約・履行割合） | 648条 | 665条で648準用 | 648準用 | 規定なし（701にない）
成果完成型 | 648条の2 | 665条にない | 648条の2準用 | 規定なし
費用前払 | 649条 | 649準用 | 649準用 | 規定なし
費用償還 | 650条1項 | 650条1項準用 | 同左 | 有益費（702条1項3項）
代弁済 | 650条2項 | 650条2項準用 | 同左 | 有益な債務（702条2項）
無過失の損害填補 | 650条3項 | 準用なし。661条は性質・瑕疵 | 650条3項準用 | 規定なし

Small center metaphor: a wallet labeled 委任の権利 and an empty tray labeled 事務管理にない. Do not cover the table.

Bottom three cards:
判断軸: 665条のリストに入るか、702条の有益費か
ひっかけ: 事務管理を委任と同じ権利セットにする
暗記: 前払と無過失損害填補は委任。事務管理は有益費。寄託に650条3項なし

Answer bar EXACT:
「事務管理には費用前払も650条3項の損害填補も報酬請求もない。寄託に648条の2と650条3項は準用しない。委任の解除は651条である。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 寄託に648条の2・650条3項なし
- [ ] 事務管理に前払・650条3項・報酬なし
- [ ] 行ゼブラ

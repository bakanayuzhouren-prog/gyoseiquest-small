# 個情法57条・主体×目的（1枚目）

- 保存先: assets/images/deepdive/learn/kojinjoho/57-shutai-mokuteki.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 個人情報保護法57条1項一号〜四号・2項。通則ガイドライン「5 適用除外（法第57条関係）」（確認日 2026-09-17）
- 正本: `utils/kojinjoho57Hikaku.ts`／`leckoukai-r2-q55-個人情報保護法の適用除外`（原文転載なし）
- 2枚目: `codex-kojin-57-ichibu-fuzui-gakujutsu.md`

配置（生成後・Cursor）: 見て聞いて覚える・個人情報。LEC公開2・問55の深掘り。学術研究・第4章のみ・179条は2枚目。

## PRE-GENERATE-CHECK（Cursor確認済み）

- ○×の意味は「57条の適用除外に該当するか」（第4章が外れるか）。図内にその一文を置く。
- 主体は報道機関（報道を業とする個人を含む）、著述を業とする者、宗教団体、政治団体。目的は各号の用。対になって初めて○。
- 報道の定義は57条2項（不特定かつ多数に客観的事実を事実として知らせること。それに基づく意見・見解を含む）。
- 肩書（政治家・宗教家）だけでは×。属性だけで全業務除外としない。
- この枚に学術研究を57条の○行として載せない（改正後は57条リストにない。2枚目）。
- 禁止: 「個人情報保護法全体が適用されない」「法律全体が対象外」。タイトルも第4章に限定する。
- 禁止: GOとYESの混在。ブランド名・透かしの印字。
- 参照パス確認: `skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png`、`skills/gyosei-image-style/assets/approved-chachalot-pointer.png`、`assets/images/characters/pitchi_sheet.png`、`assets/images/characters/kachadokuro_sheet.png` は実在。

## プロンプト考案チェック

| 欄 | 内容 |
|----|------|
| 見本 | 主宰者許可図の左右＋底部3カード。案内役は承認帽子 |
| タイトル対比 | 主体と目的の対／肩書だけでは足りない |
| 左右 | 論点＝対になるか。ひっかけ＝属性・肩書・個人除外 |
| 中央 | 2つの鍵（主体／目的）が第4章の錠に合う |
| 判断軸 | 誰が、どの目的で取り扱うか |
| ひっかけ | 肩書だけ・フリーは除外されない |
| 暗記 | 報道・著述・宗教・政治は主体と目的の対 |
| 場面役 | いい役＝ぴっちゅ（報道の用）。悪い役＝カチャドクロ（肩書だけ） |

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 個人情報保護法57条1項の主体と目的。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Do not print any brand names or watermarks.

Title:「主体と目的の対。肩書だけでは足りない」
Chip:「57条1項・2項」
Legend box (must be readable):「○×＝57条の適用除外に該当するか（第4章が外れるか）」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
報道機関は？ → 報道の用ならYES
著述業者は？ → 著述の用ならYES
宗教団体は？ → 宗教活動の用ならYES
政治団体は？ → 政治活動の用ならYES
肩書だけは？ → NO

Right panel heading ひっかけ:
報道を業とする個人は除外されない
著述は文芸作品だけ
宗教団体なら全業務が除外
政治家だから除外
個人情報保護法全体が適用されない

MAIN: one clean table. Columns: 主体 | 所定の目的 | 57条
Header row navy. Data rows alternate white / light gray by ROW (not by column). First data row white, second light gray, then white, then light gray.

Rows EXACT:
報道機関（報道を業とする個人を含む） | 報道の用（57条1項一号・2項） | ○
著述を業とする者 | 著述の用（文芸批評・評論を含む） | ○
宗教団体 | 宗教活動（付随を含む）の用 | ○
政治団体 | 政治活動（付随を含む）の用 | ○

Small center metaphor only: two keys labeled 主体 and 目的 fitting one lock labeled 第4章の適用除外.
Role labels under figures (never だれが):
報道を業とする個人（報道の用に供したい）＝ぴっちゅ. Match assets/images/characters/pitchi.png and pose sheet assets/images/characters/pitchi_sheet.png. Left of the lock, small.
肩書だけの主張者（属性だけで第4章を外したい）＝カチャドクロ. Match assets/images/characters/kachadokuro.png and pose sheet assets/images/characters/kachadokuro_sheet.png. Right, small, do not cover the table.
Do not hide table text, arrows, or the navy answer bar.

Bottom three cards:
判断軸: 各号の者と、その号の目的が対になるか
ひっかけ: 肩書だけ・個人は除外されない・法全体が外れる
暗記: 報道・著述・宗教・政治は主体と目的の対。外れるのは第4章

Answer bar EXACT:
「57条1項は、各号の者と所定の目的が対になるときに第4章を適用しない。報道を業とする個人を含む。肩書だけでは足りない。」

Guide: ONE ちゃちゃロット only. Copy assets/images/characters/chachalot.png and skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png and skills/gyosei-image-style/assets/approved-chachalot-pointer.png: cream face, pale-sky-blue hat (independent of the head, not ears), green lecturer suit with trousers and shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never「だれが」as a character caption. Never「問が聞くこと」.
Do not write that the entire Act is inapplicable.
```

## 生成後チェック

- [ ] ○×＝57条該当（第4章）と読める
- [ ] 4行の主体表。学術研究を○にしていない
- [ ] 「法全体が適用されない」はひっかけ側だけ
- [ ] 行ゼブラ。文字かぶりなし

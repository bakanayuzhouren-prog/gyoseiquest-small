# 国賠・2条の瑕疵がない定番（表4）

- 保存先: assets/images/deepdive/learn/kokubai/2jo-nashi.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 姉妹: `codex-kokubai-2jo-ari.md`／`codex-kokubai-kikiwake.md`

配置（生成後・Cursor）: 見て聞いて覚える・国家賠償法、問題を解くの該当肢「もっと深掘る」。

## PRE-GENERATE-CHECK（Cursor確認済み）

根拠: 正本 `chatTopicBriefsKokubai.ts`。確認できない細部は断定しない。

- 大東水害（最判昭59.1.26）＝未改修・改修途上は過渡的な安全性で足りる。請求は瑕疵なしの骨格。氾濫＝即瑕疵ではない。
- 赤色灯標柱（最判昭50.6.26）＝倒れた直後で原状回復の時間的余裕がなければ管理の瑕疵なし。
- テニス審判台（最判平5.3.30）＝本来の用法なら安全。後部から降りるのは通常予測し得ない異常な使用。注意義務は一般市民側。瑕疵なし。
- 防護柵幼児転落（最判昭53.7.4）＝審判台と同型。子どもだから当然瑕疵、ではない。
- 線状降水帯の予報だけ＝直ちに瑕疵ではない。
- 人の公権力行使だけ＝2条ではなく1条。
- 河川に道路（高知）の予算論をそのまま当てない。
- 禁止: 切る／切れない。高知落石・故障車87時間を×にしない。模試原文。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. PAGE 4 of 国賠 tables. 2条の瑕疵× only.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「国賠2条の瑕疵がない定番」
Chip:「事故・氾濫・予報だけでは足りない」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
未改修河川は？ → 過渡的安全性で足りる
倒れた直後は？ → 時間的余裕がなければNO
異常用法は？ → NO

Right panel heading ひっかけ:
氾濫した＝直ちに瑕疵
子どもが死んだ＝直ちに瑕疵
予報が出た＝直ちに瑕疵
道路と同じ基準を河川に当てる

MAIN: one clean table. Columns: 場面 | 結論 | 芯
Header row navy. Data rows alternate white / light gray (row zebra).
結論 column: × only, red, large.

Rows EXACT:
未改修・改修途上の河川（大東） | × | 過渡的な安全性。総合考慮と一般水準・社会通念（昭59.1.26）
予想を超える水害が起きただけ | × | 直ちに瑕疵とは言えない
赤色灯が倒れた直後 | × | 原状回復の時間的余裕がなければ瑕疵なし（昭50.6.26）
テニス審判台への異常な使用 | × | 本来の用法なら安全。注意は一般市民側（平5.3.30）
防護柵で遊ぶ幼児の転落 | × | 通常予測し得ない行動。審判台と同型（昭53.7.4）
線状降水帯の予報だけ | × | 予報だけでは直ちに瑕疵ではない
公務員の公権力行使だけ | × | 2条ではなく1条の棚

Center metaphor small only: a river labeled 未改修（過渡的安全性）. Do not cover the table.

Bottom three cards:
判断軸: 通常有すべき安全性を、用法・時間・改修段階で見る（国賠2条1項）
ひっかけ: 氾濫・死亡・予報を直ちに瑕疵にしない。河川に道路基準を当てない
暗記: 大東・赤色灯直後・審判台と幼児柵の異常用法は瑕疵×

Answer bar EXACT:
「2条でも、通常の用法と時間的余裕と改修段階を外して瑕疵としない。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 結論はすべて×
- [ ] 大東は過渡的安全性
- [ ] 故障車87時間が×行に混ざっていない

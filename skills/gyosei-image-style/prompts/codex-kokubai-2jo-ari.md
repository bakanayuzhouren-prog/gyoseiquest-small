# 国賠・2条の瑕疵がある定番（表3）

- 保存先: assets/images/deepdive/learn/kokubai/2jo-ari.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 姉妹: `codex-kokubai-2jo-nashi.md`／`codex-kokubai-kikiwake.md`

配置（生成後・Cursor）: 見て聞いて覚える・国家賠償法、問題を解くの該当肢「もっと深掘る」。

## PRE-GENERATE-CHECK（Cursor確認済み）

根拠: e-Gov 国賠2条1項・3条。正本 `chatTopicBriefsKokubai.ts`。LEC公開模試は「通常有すべき安全性。事故だけで即瑕疵ではない」。

- 瑕疵＝営造物が通常有すべき安全性を欠くこと（高知落石・最判昭45.8.20）。管理者の過失は不要。
- 高知落石＝瑕疵○。費用多額・予算困却でも直ちに賠償責任を免れない。
- 故障車約87時間放置＝道路管理の瑕疵○（最判昭50.7.25）。警察に規制権限がある、では免れない。
- 大阪国際空港騒音＝供用関連瑕疵になり得る（最大判昭56.12.16）。物的欠陥だけではない。周辺住民も含む。
- 事実上の管理でも責任主体になり得る。法律上の管理権の有無と瑕疵の有無は別。
- 砂の堆積など自然的原因でも、安全性を欠けば瑕疵になり得る。
- 補助金を出した国は費用負担者として3条責任を負い得る（最判昭50.11.28）。瑕疵そのものは2条。
- 多摩川は「常に○」ではない。この枚には「改修済みで計画規模内なのに防げない状態」だけ書く。未改修の大東は載せない。
- 禁止: 切る／切れない。大東・赤色灯・審判台を○にしない。模試原文。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. PAGE 3 of 国賠 tables. 2条の瑕疵○ only. Do not draw 1条追跡表.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「国賠2条の瑕疵がある定番」
Chip:「国賠2条1項。通常有すべき安全性を欠くか」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
2条の対象は？ → 公の営造物の設置・管理
過失は要る？ → NO
事故が起きただけ？ → NO

Right panel heading ひっかけ:
壊れていないから瑕疵ではない
予算不足なら免責
警察の規制権限があるから道路管理者は免責
自然現象なら常に免責

MAIN: one clean table. Columns: 場面 | 結論 | 芯
Header row navy. Data rows alternate white / light gray (row zebra).
結論 column: ○ only, green circle, large.

Rows EXACT:
国道の落石（高知） | ○ | 通常有すべき安全性の欠如。予算不足でも直ちに免れない（昭45.8.20）
故障車の長時間放置 | ○ | 約87時間・安全措置なし。警察権限では免れない（昭50.7.25）
空港の供用に伴う騒音 | ○ | 供用関連瑕疵。外形欠陥だけではない（昭56.12.16）
改修済み河川で計画規模内なのに防げない | ○ | 多摩川型。計画洪水への安全性（平2.12.13）
事実上の管理をしている者 | ○ | 法律上の管理権がなくても責任主体になり得る
自然的原因の砂の堆積など | ○ | 安全性を欠けば瑕疵になり得る。自然＝常に免責ではない
補助金を出した国 | ○ | 瑕疵は2条。費用負担者として3条でも責任（昭50.11.28）

Center metaphor small only: a road with a falling rock labeled 営造物（安全性を欠く）. Do not cover the table.

Bottom three cards:
判断軸: 通常有すべき安全性を欠くか。過失は不要（国賠2条1項）
ひっかけ: 事故が起きたことだけで瑕疵としない。予算・警察権限・自然で一律免責にしない
暗記: 落石・長時間放置・空港騒音・計画規模内の改修済み河川は瑕疵○の定番

Answer bar EXACT:
「国賠2条は、公の営造物が通常有すべき安全性を欠くかで見る。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 結論はすべて○
- [ ] 高知は予算不足でも免れない
- [ ] 大東・赤色灯・審判台が混ざっていない

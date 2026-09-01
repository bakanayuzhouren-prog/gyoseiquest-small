# 国賠・パトカー追跡の事件結論（棄却）

- 保存先: assets/images/deepdive/learn/kokubai/patrol-kikyaku.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 既存表 `1jo-ari` は「1条の対象」だけなので、この枚は事件結論（適法・棄却）専用。

配置（生成後・Cursor）: ピン `patrol_car_chase` の関連画像。見て聞いて覚える・国家賠償法の追跡カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

根拠: 最判昭61.2.27。e-Gov 国賠1条1項。正本 `data/pin/cases/gyosei/patrol_car_chase.md`／`src/kokubai_learn_content.js`。

- 枠は1条（公権力の行使に当たる公務員の職務）。2条にしない。
- 違法となるのは、追跡の必要性がないか、追跡の開始・継続・方法が不必要又は不相当（社会通念上著しく相当性を欠く）場合に限られる。
- **本件は適法。請求棄却。** 「追跡した＝違法」「第三者に損害が出た＝県の責任」ではない。
- 禁止: 切る／切れない。勝訴図にしない。模試原文。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE case: パトカー追跡（最判昭61.2.27）.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「パトカー追跡は、本件では適法」
Chip:「国賠1条1項。必要性と方法が著しく相当性を欠くときに限り違法」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
枠は？ → 1条
本件は違法？ → NO
棄却か？ → YES
いつ違法？ → 必要性なし、又は開始・継続・方法が不相当

Right panel heading ひっかけ:
追跡した＝直ちに違法
第三者に損害＝県の責任
2条の営造物責任
必要性と方法の両方必須（「又は」を「かつ」にしない）

Center metaphor: patrol car and fleeing car, bystander collision. Labels under people: 警察官（職務として追跡）／被害者（県に1条請求）. Small stamp 棄却. Do not cover text.

Bottom three cards:
判断軸: 必要性と、開始・継続・方法の相当性を比較衡量する（国賠1条1項）
ひっかけ: 結果が悪いことだけで違法にしない
暗記: 著しく相当性を欠くときに限り違法。本件は適法で棄却

Answer bar EXACT:
「追跡は1条の枠だが、必要性又は方法が著しく相当性を欠くときに限り違法となり、本件は適法である。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 結論は棄却・適法
- [ ] 「又は」（必要性なし／方法不相当）
- [ ] 2条になっていない

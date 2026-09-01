# 国賠・1条と2条の聞き分け（表5）

- 保存先: assets/images/deepdive/learn/kokubai/kikiwake.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 姉妹: `codex-kokubai-1jo-ari.md`／`codex-kokubai-2jo-ari.md`

配置（生成後・Cursor）: 見て聞いて覚える・国家賠償法の総論カード、問題を解くの1条／2条問。

## PRE-GENERATE-CHECK（Cursor確認済み）

根拠: e-Gov 1条1項・2条1項。正本の暗記「人の行為＝1条。モノの欠陥＝2条。」

- 1条＝公務員の公権力行使。故意又は過失＋違法（職務行為基準）。
- 2条＝公の営造物の設置又は管理の瑕疵。過失不要。
- 対比行は過去問・模試で並ぶ定番だけ。
  - 追跡・権限不行使・指定機関 ＝1条
  - 落石・放置車両・空港騒音 ＝2条
  - 建築確認の過誤 ＝1条（人）。建物そのものの欠陥を2条に混ぜない
  - 道路の予算不足 ＝免責にならない（高知）
  - 未改修河川 ＝過渡的安全性（大東）
- 損失補償（適法な特別犠牲）は別棚。この枚に詳しく書かない。
- 禁止: 切る／切れない。GOバッジ。模試原文。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. PAGE 5 of 国賠 tables. Comparison only.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「国賠は、人なら1条・モノなら2条」
Chip:「1条1項と2条1項の聞き分け」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
人の職務？ → 1条
モノの安全性？ → 2条
過失は？ → 1条は要る／2条は不要

Right panel heading ひっかけ:
事故が起きた＝常に2条
権限がある＝常に1条違法
道路と河川を同じ安全性で見る
取消訴訟の違法＝国賠の違法

MAIN: one clean table. Columns: 対比 | 1条側 | 2条側
Header row navy. Data rows alternate white / light gray (row zebra).

Rows EXACT:
対象 | 公務員の公権力の行使 | 公の営造物の設置・管理
責任の型 | 故意又は過失と違法 | 瑕疵があれば足り、過失不要
定番 | 追跡・権限不行使・指定機関 | 落石・長時間放置・空港騒音
建築確認 | 確認の過誤は1条 | 営造物そのものの欠陥は2条
道路と河川 | （人の行為ではない） | 道路は当初から通常の安全性。未改修河川は過渡的
違法の見方 | 職務上の義務違反 | 通常有すべき安全性の欠如

Center metaphor small only: a split sign 人／モノ. Labels: 公務員（職務を行う） and 営造物（安全性を欠く）. Do not write だれが. Do not cover the table.

Bottom three cards:
判断軸: 先に人かモノかを決める（国賠1条1項／2条1項）
ひっかけ: 結果の損害だけで条を決めない。道路基準を河川に当てない
暗記: 人の行為＝1条。モノの欠陥＝2条。過失は1条側

Answer bar EXACT:
「国賠は、人の公権力行使なら1条、営造物の安全性なら2条。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 1条と2条が列で分かれている
- [ ] 過失の要否が逆になっていない
- [ ] 答え帯が人／モノで読める

# 国賠と損失補償

- 保存先: assets/images/deepdive/learn/kokubai/sonshitsu-hoshou.png
- 画像キー: learn/kokubai/sonshitsu-hoshou
- 生成は Codex。Cursor は描かない。
- 根拠: 国家賠償法1条・2条、憲法29条3項。1条・2条のありなし図は別。河川・道路の細部は既存図。

## PRE-GENERATE-CHECK

- 国賠1条: 公権力の行使、違法、故意又は過失。
- 国賠2条: 公の営造物の設置又は管理の瑕疵（過失は要件にしない）。
- 損失補償: 適法な財産権の侵害で、特別の犠牲。内在的制約には補償しない、が軸。
- 戦争損害の補償拒否、都市計画の内在的制約は「例外の例」に短く。消防活動の損失は確認できない細部を断定しない。
- 禁止: 国賠2条に過失が要る。損失補償＝違法な侵害。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 国賠1条・2条と損失補償の聞き分け.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Title:「違法か、特別の犠牲か」
Chip:「国賠1条・2条。憲法29条3項」

Left heading 論点:
1条の芯は？ → 職務上の違法と故意過失
2条の芯は？ → 営造物の設置又は管理の瑕疵
損失補償の芯は？ → 適法な侵害で特別の犠牲
2条に過失は？ → 要件でない

Right heading ひっかけ:
国賠2条にも故意過失が要る
損失補償は違法な処分の賠償
内在的制約でも常に補償する
人の行為は常に2条

Center ONLY: one table. Header navy. Row zebra white / light gray.
Columns: 制度 | 入口 | 芯
Rows:
国賠1条 | 公務員の公権力の行使 | 違法＋故意又は過失
国賠2条 | 公の営造物 | 設置又は管理の瑕疵
損失補償（29条3項） | 適法な財産権の制約 | 特別の犠牲か、内在する制約か
Caption:「道路の通常有すべき安全性、河川の総合考慮は既存図。この図は三分法だけ」

Roles: 被害者（賠償又は補償を求める）／国又は公共団体（責任の根拠を分ける）. Never だれが.

Bottom:
- 判断軸:「違法な職務か、物の瑕疵か、適法な特別犠牲か」
- ひっかけ:「2条に過失。補償＝違法の賠償」
- 暗記:「1条は人。2条は物。補償は適法な特別の犠牲」
Answer:「国賠1条は公務員の違法な公権力の行使について故意又は過失を要する。2条は営造物の設置又は管理の瑕疵である。損失補償は適法な侵害における特別の犠牲である。」

Guide: ONE ちゃちゃロット only. Cream face, independent pale-sky-blue smiling hat (not ears), green blazer, white shirt, green trousers, shoes, wooden 指し棒. SMALL bottom-right. No nameplate. Never print あぷし, Gyosei Quest, @appshi113.
```

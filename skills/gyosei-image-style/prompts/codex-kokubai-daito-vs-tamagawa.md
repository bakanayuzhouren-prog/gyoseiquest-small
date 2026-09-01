# 国賠・大東と多摩川の聞き分け

- 保存先: assets/images/deepdive/learn/kokubai/daito-vs-tamagawa.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 既存の `kokubai-tamagawa-2jo-safety` は多摩川専用。大東ピンに載せない。この枚が対比の本命。

配置（生成後・Cursor）: ピン `river_management_defect` と `tamagawa_flood` の関連画像。

## PRE-GENERATE-CHECK（Cursor確認済み）

根拠: 大東・最判昭59.1.26。多摩川・最判平2.12.13。e-Gov 国賠2条1項。正本 `utils/chatTopicBriefsKokubai.ts`／`data/knowledge/creator/gyoshosato/gyoseihou-kijutsu-yosou-soumatome.md`。

- 大東＝未改修・改修途上。過渡的な安全性で足りる。氾濫＝直ちに瑕疵ではない。骨格は瑕疵なし。
- 多摩川＝改修済み。工事実施基本計画の計画高水流量等の規模の洪水を防止しうる安全性。計画規模内なのに防げない状態は瑕疵方向。
- 道路（高知落石）の予算論・初期安全性を河川に当てない。
- 線状降水帯の予報だけ＝直ちに瑕疵ではない。
- 禁止: 切る／切れない。大東を瑕疵○、多摩川を常に○と書かない。模試原文。昭56.12.16（大阪空港）を大東の日付にしない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE comparison: 大東（未改修）vs 多摩川（改修済み）.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「河川は、改修段階で安全性の見方が分かれる」
Chip:「大東昭59.1.26 ／ 多摩川平2.12.13。国賠2条1項」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
未改修・途上は？ → 過渡的安全性
改修済みは？ → 計画高水を防げるか
氾濫しただけ？ → 直ちに瑕疵ではない
道路と同じ？ → NO

Right panel heading ひっかけ:
氾濫＝直ちに瑕疵
大東の日付を昭56.12.16（空港）にする
改修した＝絶対安全
高知落石の予算論を河川に当てる
予報が出た＝直ちに瑕疵

MAIN: one clean table. Columns: 対比 | 大東側 | 多摩川側
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
段階 | 未改修・改修途上 | 改修済み
安全性 | 過渡的な安全性で足りる | 計画高水流量の規模の洪水を防げるか
氾濫 | 直ちに瑕疵ではない | 計画規模内で防げなければ瑕疵方向
日付 | 昭59.1.26 | 平2.12.13

Center metaphor small: two river banks, left dirt dike 未改修, right concrete dike 改修済み. Do not cover the table.

Bottom three cards:
判断軸: まず改修段階を見て、通常有すべき安全性を決める（国賠2条1項）
ひっかけ: 氾濫・予報・道路基準で結論を決めない
暗記: 大東は過渡的安全性。多摩川は計画高水。日付を空港と混ぜない

Answer bar EXACT:
「未改修は過渡的安全性、改修済みは計画高水を防げるかで見る。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 大東は昭59.1.26・過渡的安全性
- [ ] 多摩川は平2.12.13・計画高水
- [ ] 行ゼブラ（1行目白・2行目薄灰）
- [ ] 大阪空港の日付が大東に付いていない

# 行政書士法・登録の流れ

- 保存先: assets/images/deepdive/learn/gyoseishoshi/touroku.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 行政書士法6条、6条の2、6条の3、6条の5、7条、18条の4

配置（生成後・Cursor）: 見て聞いて覚える・行政書士法の登録カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 名簿・登録は日行連。申請は事務所所在地の会を経由。直接申請は不可。
- 資格なし等は拒否しなければならない。拒否前に資格審査会の議決と弁明の機会。
- 不正手段の登録は取り消さなければならない（できる、ではない）。
- 死亡等は必要的抹消。2年以上不稼働は抹消することができる。
- 登録拒否の審査請求先は総務大臣。知事ではない。申請から3月沈黙も拒否みなし。
- 資格審査会は日行連に置く。審査対象は拒否・取消し・7条2項の抹消。懲戒そのものはしない。
- 禁止: 切る。知事が登録する。資格審査会が懲戒する。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 行政書士の登録ルート.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「登録は日行連。申請は会経由。不服は総務大臣」
Chip:「6条・6条の2・6条の3・6条の5・7条・18条の4」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
誰が登録する？ → 日行連
申請は？ → 会を経由
拒否の不服は？ → 総務大臣
資格審査会はどこ？ → 日行連

Right panel heading ひっかけ:
都道府県知事が登録する
日行連へ直接申請できる
拒否の審査請求は知事
資格審査会が懲戒する

MAIN: one clean table. Columns: 場面 | 結論
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
名簿と登録（6条） | 日行連が備えて行う
申請（6条の2） | 事務所所在地の会を経由
拒否・不正取消し | しなければならない（裁量ではない）
拒否の前 | 資格審査会の議決＋弁明の機会
拒否の審査請求（6条の3） | 総務大臣（3月沈黙も同じ）
2年不稼働の抹消（7条2項） | することができる

Small center metaphor: a stamp desk labeled 日行連, an in-tray labeled 会経由. Do not cover the table.

Bottom three cards:
判断軸: 登録の本体は日行連。経由と不服先を別に見る
ひっかけ: 知事登録・直接申請・知事への審査請求
暗記: 登録は日行連。申請は会経由。拒否の不服は総務大臣

Answer bar EXACT:
「登録は日行連、申請は会経由、拒否の審査請求は総務大臣。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 登録＝日行連、経由＝会、審査請求＝総務大臣
- [ ] 拒否・不正取消しが義務
- [ ] 2年不稼働は「できる」

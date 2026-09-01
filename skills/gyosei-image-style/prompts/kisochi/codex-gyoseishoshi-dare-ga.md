# 行政書士法・誰が動くか（総表）

- 保存先: assets/images/deepdive/learn/gyoseishoshi/dare-ga.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 行政書士法3条、3条2項、13条の22、16条の2、18条の5、18条の6

配置（生成後・Cursor）: 見て聞いて覚える・行政書士法の比較カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 試験の定め＝総務大臣。施行事務＝都道府県知事。指定試験機関の指定も総務大臣だが、この表では施行を知事と書く（3条2項）。指定の細部は載せすぎない。
- 会則認可：行政書士会＝知事、日行連＝総務大臣（16条の2を18条の5で読み替え）。
- 報告・勧告：会＝知事、日行連＝総務大臣（18条の6）。懲戒（14条）と混ぜない。
- 立入検査＝知事（13条の22）。日行連が立ち入る、と書かない。
- 禁止: 切る／切れない。模試原文。知事が日行連を監督する、と書かない。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: who acts under 行政書士法.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「行政書士法は、先に誰が動くかを見る」
Chip:「3条・16条の2・18条の5・18条の6・13条の22」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
試験の定めは？ → 総務大臣
試験の施行は？ → 都道府県知事
日行連の監督は？ → 総務大臣
会の監督は？ → 都道府県知事

Right panel heading ひっかけ:
知事が日行連を監督する
試験も登録も知事が全部やる
会則認可を全部総務大臣にする
立入検査を日行連がする

MAIN: one clean table. Columns: 仕事 | 誰
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
試験の定め（3条） | 総務大臣
試験の施行（3条2項） | 都道府県知事
会則の認可 | 会は知事／日行連は総務大臣
報告を求め勧告する（18条の6） | 会は知事／日行連は総務大臣
事務所への立入検査（13条の22） | 都道府県知事

Small center metaphor under title only: four labeled doors 総務大臣／知事／日行連／会. Do not cover the table.

Bottom three cards:
判断軸: 国側は総務大臣、都道府県側は知事。団体は日行連と会
ひっかけ: 監督の相手を取り違える
暗記: 日行連は総務大臣。会は知事。試験の施行だけ知事

Answer bar EXACT:
「日行連は総務大臣、会は知事。試験の施行は知事、定めは総務大臣。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 試験の定め＝総務大臣、施行＝知事
- [ ] 18条の6の相手が入れ替わっていない
- [ ] 行ゼブラ

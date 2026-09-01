# 行政書士法・懲戒と注意と監督

- 保存先: assets/images/deepdive/learn/gyoseishoshi/chokai.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 行政書士法14条、14条の2、17条の2、18条の6、14条の5

配置（生成後・Cursor）: 見て聞いて覚える・行政書士法の懲戒カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 行政書士への懲戒は都道府県知事。戒告、2年以内の業務の停止、業務の禁止。
- 行政書士会の注意勧告（17条の2）は懲戒ではない。日行連が懲戒する、と書かない。
- 18条の6の報告・勧告は団体監督。個人への懲戒と混ぜない。
- 懲戒処分の公告は知事が都道府県の公報（14条の5）。
- 停止の上限は2年以内。欠格の3年と混ぜない。
- 禁止: 切る。会が懲戒。総務大臣が個人を懲戒。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 懲戒 vs 注意勧告 vs 団体監督.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「個人の懲戒は知事。会の注意は懲戒ではない」
Chip:「14条・17条の2・18条の6」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
懲戒権者は？ → 都道府県知事
会ができるのは？ → 注意・勧告
日行連への報告勧告は？ → 総務大臣
停止の上限は？ → 2年以内

Right panel heading ひっかけ:
日行連が懲戒する
会の注意勧告＝懲戒
総務大臣が個人を懲戒する
停止は3年（欠格と混ぜる）

MAIN: one clean table. Columns: 種類 | 誰が | 中身
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
懲戒（14条） | 都道府県知事 | 戒告／2年以内の停止／業務の禁止
注意勧告（17条の2） | 行政書士会 | 注意を促し、又は必要な措置を勧告
団体監督（18条の6） | 会は知事／日行連は総務大臣 | 報告を求め、又は勧告
公告（14条の5） | 都道府県知事 | 遅滞なく公報で公告

Small center metaphor: a judge-bench labeled 知事の懲戒, a yellow card labeled 会の注意. Do not cover the table.

Bottom three cards:
判断軸: 個人への不利益処分か、会の内部注意か、団体への監督か
ひっかけ: 会・日行連・総務大臣を懲戒権者にする
暗記: 懲戒は知事。会は注意勧告。日行連の監督は総務大臣

Answer bar EXACT:
「懲戒は都道府県知事。会の注意勧告は懲戒ではない。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 懲戒＝知事、停止＝2年以内
- [ ] 17条の2が懲戒になっていない
- [ ] 18条の6が個人懲戒になっていない

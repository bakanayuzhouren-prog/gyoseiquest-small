# 戸籍法・出生と死亡の期間

- 保存先: assets/images/deepdive/learn/koseki/kigen.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 戸籍法49条、86条

配置（生成後・Cursor）: 見て聞いて覚える・戸籍法の比較カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 出生の届出は十四日以内。国外で出生があったときは三月以内（49条）。起算を死亡の「知った日」と混ぜない。
- 死亡の届出は、届出義務者が死亡の事実を知った日から七日以内。国外は知った日から三月以内（86条）。死亡の日から十四日、ではない。
- 禁止: 出生も知った日から七日、死亡の日から十四日、と答え帯に書く。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 出生届と死亡届の期間。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「出生は十四日。死亡は知った日から七日」
Chip:「戸籍49条／86条」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
国内の出生は？ → 十四日以内
国内の死亡は？ → 知った日から七日
国外の出生は？ → 三月以内
国外の死亡は？ → 知った日から三月以内

Right panel heading ひっかけ:
出生も知った日から七日
死亡の日から十四日
国外も十四日
住基の転入十四日を死亡に当てる

MAIN: one clean table. Columns: 対比 | 出生（49条） | 死亡（86条）
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
国内 | 十四日以内 | 知った日から七日以内
国外 | 三月以内 | 知った日から三月以内
起算の芯 | 出生という事実の期間 | 知った日（死亡の日ではない）
混ぜるな | 住基の転入転居十四日 | 出生の十四日を死亡に横流し

Small center metaphor: two calendars labeled 14日 and 7日. Do not cover the table.

Bottom three cards:
判断軸: 出生か死亡か、国内か国外か
ひっかけ: 七日と十四日、知った日を入れ替える
暗記: 出生は国内十四日・国外三月。死亡は知った日から七日

Answer bar EXACT:
「出生の届出は十四日以内（国外は三月以内）である。死亡の届出は、事実を知った日から七日以内（国外は三月以内）である。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 出生14日／死亡は知った日から7日
- [ ] 行ゼブラ

# 行政書士法・年数表

- 保存先: assets/images/deepdive/learn/gyoseishoshi/nensu.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 行政書士法2条6号、2条の2、6条の3第2項、7条2項、9条2項、14条、18条の4第6項

配置（生成後・Cursor）: 見て聞いて覚える・行政書士法の欠格・帳簿カード。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 欠格の多くは3年（刑の執行終了等、懲戒免職、登録取消し、業務禁止、他士業懲戒等）。未成年・破産未復権は期間ではない。
- 公務員経験による資格は通算20年（高卒等は17年）。欠格の3年と混ぜない。
- 帳簿保存は閉鎖時から2年。懲戒の停止上限2年以内、不稼働2年以上、委員任期2年は全部「2年」だが意味が違う。
- 登録申請から3月沈黙→拒否みなしで総務大臣へ審査請求。3年ではない。
- 指定試験機関まわりの2年は本表に載せない（詰め込み防止）。
- 禁止: 切る。欠格を2年にする。停止を3年にする。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 行政書士法の年数.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「3年は欠格。2年は保存・停止・不稼働・委員」
Chip:「2条の2・7条・9条・14条・18条の4・6条の3」

Left panel heading 論点 (Q&A only, YES/NO or short words. No GO badges):
欠格の多くは？ → 3年
帳簿の保存は？ → 2年
業務の停止は？ → 2年以内
不稼働の抹消は？ → 2年以上できる

Right panel heading ひっかけ:
欠格も停止も全部3年
帳簿保存を5年にする
不稼働の抹消をしなければならないにする
申請沈黙の3月を3年にする

MAIN: one clean table. Columns: テーマ | 数字 | 意味
Header row navy. Data rows alternate white / light gray (row zebra, not column zebra).

Rows EXACT:
欠格の多く（2条の2） | 3年 | 刑・免職・取消し・業務禁止などから経過しない
公務員経験の資格（2条6号） | 20年（高卒等は17年） | 欠格の3年と別
帳簿保存（9条2項） | 2年 | 閉鎖の時から。資格喪失後も同じ
不稼働の抹消（7条2項） | 2年以上 | 抹消することができる
業務の停止（14条） | 2年以内 | 懲戒の上限
資格審査会の委員（18条の4） | 任期2年 | 補欠は残任期間
登録申請の沈黙（6条の3） | 3月 | 拒否とみなして総務大臣へ審査請求

Small center metaphor: a calendar with two stamps 3年 and 2年. Do not cover the table.

Bottom three cards:
判断軸: 欠格の3年と、手続の2年を先に分ける
ひっかけ: 数字だけ見て中身を入れ替える
暗記: 欠格は3年。保存・停止上限・不稼働・委員は2年。沈黙は3月

Answer bar EXACT:
「欠格は3年。帳簿保存・停止上限・不稼働・委員任期は2年。申請沈黙は3月。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 欠格＝3年、停止＝2年以内、不稼働＝できる
- [ ] 3月が3年になっていない
- [ ] 行ゼブラ

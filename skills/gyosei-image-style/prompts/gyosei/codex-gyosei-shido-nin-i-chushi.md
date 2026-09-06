# 行政指導の任意と中止等の求め

- 保存先: assets/images/deepdive/learn/gyosei/shido-nin-i-chushi.png
- 画像キー: learn/gyosei/shido-nin-i-chushi
- 生成は Codex。Cursor は描かない。
- 根拠: e-Gov 行政手続法32条、36条の2、36条の3。条番号を入れ替えるな。

## PRE-GENERATE-CHECK

- 32条: 任意の協力によってのみ実現。従わなかったことだけを理由とする不利益取扱い禁止。
- **36条の2** = **行政指導の中止等の求め**。相手方。法令違反の是正を求める行政指導で、根拠規定が**法律**にあるもの。その指導が法律の要件に適合しないと思料するとき。弁明等を経た指導は除外。申出は**書面**。
- **36条の3** = **処分等の求め**。**何人も**。法令に違反する事実があり、是正のための処分又は行政指導（根拠が法律）がされていないと思料するとき。申出は**書面**。
- 禁止: の2との3を入れ替える。中止の求め＝何人も。従わない罰が当然。要件（法律根拠・書面）を落とす。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 行政指導は任意。36条の2は中止等の求め、36条の3は処分等の求め.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Match LAYOUT of「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Title:「任意か。中止は相手方か」
Chip:「32条・36条の2・36条の3」

Left heading 論点:
実現方法は？ → 任意の協力のみ（32条）
従わないことだけを理由に不利益は？ → 禁止
中止等の求めは誰？ → 相手方（36条の2）
処分等の求めは誰？ → 何人も（36条の3）

Right heading ひっかけ:
従わないことだけを理由に許認可を拒んでよい
中止等の求めは何人もできる
36条の2を処分等の求めにする
指導に処分の効力がある

Center ONLY: one table. Header navy. Row zebra white / light gray.
Columns: 条 | 制度 | 芯
Rows:
32条 | 行政指導の一般原則 | 任意の協力によってのみ実現。不利益取扱いの禁止
36条の2 | 行政指導の中止等の求め | 相手方。法令違反の是正を求める指導（法律根拠）。要件不適合と思料。書面。弁明等を経たものは除外
36条の3 | 処分等の求め | 何人も。法令違反の事実の是正のための処分又は行政指導（法律根拠）がされていないと思料。書面
Caption:「条番号を入れ替えるな。規模の大小（無灯火と病院勧告）は別図」

Roles: 行政指導の相手方（中止を求める）／第三者（処分等の求めをする）.

Bottom:
- 判断軸:「任意協力か。中止を求めるのは相手方か」
- ひっかけ:「従わない罰OK。36条の2と36条の3を入れ替える」
- 暗記:「32条は任意。中止は36条の2で相手方。処分等の求めは36条の3で何人も」
Answer:「行政指導は任意の協力によってのみ実現する。中止等の求めは36条の2で相手方がする。処分等の求めは36条の3で何人もすることができる。」

Guide: ONE ちゃちゃロット only. Cream face, independent pale-sky-blue smiling hat (not ears), green blazer, white shirt, green trousers, shoes, wooden 指し棒. SMALL bottom-right. No nameplate. No logos or watermarks.
```

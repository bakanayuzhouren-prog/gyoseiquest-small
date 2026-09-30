# 記述解説図・民法記述Q11-3（土地賃借権の時効取得）

1枚。左は論点のQ&A、右はひっかけ、中央は関門が二つ、底部は判断軸・ひっかけ・暗記、下に答え帯。表は置かない。`q11.png` と `q11-2.png` は別の図なので、このファイルでは描かない。

- 保存先: `assets/images/deepdive/textbook/minpou-kijutsu/q11-3.png`
- 画像キー: `textbook/minpou-kijutsu/q11-3`
- 生成は Codex。Cursor は描かない。
- 配置: 民法記述Q11-3の問の直下。`[[image:textbook/minpou-kijutsu/q11-3]]` は正本に記入済み。マップ登録は生成後。

## 法律

民法163条。所有権以外の財産権を、自己のためにする意思をもって、平穏に、かつ、公然と行使する者は、前条の区別に従い二十年又は十年を経過した後、その権利を取得する。

土地賃借権の時効取得は、最判昭和43年10月8日第三小法廷（民集22巻10号2145頁）。土地の継続的な用益という外形的事実が存在し、かつ、それが賃借の意思に基づくことが客観的に表現されているとき、163条により取得できる。使い続けただけでは足りない。

賃料の支払を継続していることは、客観的表現の一例である。無権限で所有者を称する者との契約でも、平穏公然な継続的用益と賃料支払の継続があれば、真の所有者に対して時効取得しうる。

所有の意思は162条。地役権は283条（継続的に行使され、かつ、外形上認識することができるものに限り）。地上権は、地上権行使の意思の客観的表現（最判昭和45年5月28日）。この図の答えは賃借権の二要件だけ。

答案の芯（この文を答え帯にそのまま置く）:
土地の継続的な用益という外形的事実があり、賃借の意思に基づくことが客観的に表現されている。

試験で「土地を継続して用益していれば、賃借権を時効取得できる」と書いてあったら×。
試験で「所有の意思が客観的に表現されていれば足りる」と書いてあったら×。
試験で「地役権と同じく、外形上認識することができれば足りる」と書いてあったら×。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 | 配置 |
|---|---|---|---|---|---|
| 用益者 | いい役 | 用益者（賃借の意思を外に出して時効取得したい） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` | 中央の第2関門の手前。関門の文字を隠さない |
| 所有者 | いい役 | 所有者（用益が賃借か見て、中断の機会を持ちたい） | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` | 中央の土地の所有者側。関門の文字を隠さない |
| 誤った主張 | 悪い役 | 誤った主張をする側（使い続けただけで足りる、と言う） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` | 右のひっかけの脇。本文を隠さない |
| 案内 | いい役 | 案内（二つの関門を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` | 下余白の右。1体。緑の講師スーツ（白シャツ・ズボン・靴） |

過去の辻さんと代さんは置かない。名簿外の人物を置かない。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。

## GPT Image プロンプト

```text
参照必須: ぴっちゅは assets/images/characters/pitchi_sheet.png。タスク亀は assets/images/characters/task_turtle_sheet.png。カチャドクロは assets/images/characters/kachadokuro_sheet.png。ちゃちゃロットは skills/gyosei-image-style/assets/approved-chachalot-pointer.png と approved-smiling-hat-mascot.png。帽子は頭と別の薄い水色。左右の丸い山、中央の低い山、長いツバ。帽子の顔はにっこり閉じた目。緑の講師スーツは白シャツ、ズボン、靴まで。1体だけ。下余白の右。指し棒は答え帯に重ねない。

Create a NEW Japanese legal-study infographic from scratch. Warm off-white background. Thick outlines, large gothic type, clear gaps. 16:9. Match the density of a stylish legal-study sheet: navy title, left green panel, right amber panel, one center scene, three bottom cards, navy answer bar.

Title: 土地を使い続けただけでは、賃借権は時効で取れない
Small chip under the title: 民法163条。最判昭和43年10月8日

Left panel heading: 論点
Three rows, short answers only:
1. 使い続けただけで足りる？ → NO
2. 一つ目は？ → 継続的な用益という外形的事実
3. 二つ目は？ → 賃借の意思が客観的に表現されていること
Small line under the rows: つなぎは、かつ（163条）

Center: a path across open land with TWO gates in sequence. Gate 1 labeled 継続的な用益という外形的事実. Gate 2 labeled 賃借の意思に基づくことが客観的に表現されていること. A small rent receipt is visible at gate 2, captioned 賃料の支払継続は、客観的表現の一例. Both gates stay open only together.
Under ぴっちゅ: 用益者（賃借の意思を外に出して時効取得したい）
Under タスク亀: 所有者（用益が賃借か見て、中断の機会を持ちたい）
The characters do not cover the gate labels.

Right panel heading: ひっかけ
- 継続して用益すれば足りる
- 所有の意思で足りる
- 地役権と同じく、外形上認識できれば足りる
- 試験で「土地を継続して用益していれば、賃借権を時効取得できる」と書いてあったら×
カチャドクロ stands beside this panel and does not cover the lines.

Bottom three cards:
判断軸: 外形の用益があるか、かつ、賃借の意思が客観的に出ているか（163条）
ひっかけ: 使い続けただけ、所有の意思、地役権の外形認識、では足りない
暗記: 継続的な用益の外形と、賃借の意思の客観的表現

Navy answer bar, this sentence exactly:
土地の継続的な用益という外形的事実があり、賃借の意思に基づくことが客観的に表現されている。

No table. No extra statute list. One ちゃちゃロット only, bottom-right cream margin above the answer bar.
```

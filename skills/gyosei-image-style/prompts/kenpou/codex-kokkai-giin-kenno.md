# 憲法｜国会の権能と議院の権能

てらしぃ依頼: 国会の権能と各議院の権能を1図にする。模試の問題文・肢は転載しない。
**生成はてらしぃが Codex に「画像生成して」と言うまでしない。** Cursor は描かない。

見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`
- 保存先: `assets/images/deepdive/learn/kenpo/kokkai-giin-kenno.png`
配置: 見て聞いて覚える「弾劾裁判所の設置は国会、資格争訟の裁判は各議院…」のもっと深掘る先頭。キー `learn/kenpo/kokkai-giin-kenno`。

## スロット（新キャラはここだけ差し替え）

| スロット | 陣営 | 法律上の役割 | いまのキャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内役（暗記を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |
| 国会側 | いい役 | 両院で一つの権能として決める者 | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` |
| 議院側 | いい役 | 各議院の自律を示す者 | タスク亀 | `task_turtle.png` ＋ `task_turtle_sheet.png` |
| 棚の入れ替え | 悪い役 | 国政調査は国会だと主張する者 | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` |

## 法律（原典・e-Gov）

切り分け: **国会**＝両議院で一つの国家機関として行う権能。**議院**＝衆議院・参議院がそれぞれ単独で行う権能。棚を入れ替えない。

国会の権能（図の左表）:

| 権能 | 条文 |
|---|---|
| 法律の制定 | 59条 |
| 条約の承認 | 73条3号 |
| 憲法改正の発議 | 96条 |
| 租税の法定 | 84条 |
| 国費の支出・国の債務負担の議決 | 85条 |
| 予備費を設ける議決 | 87条 |
| 皇室の費用の議決 | 88条 |
| 決算の審査 | 90条 |
| 内閣総理大臣の指名 | 67条 |
| 弾劾裁判所の設置 | 64条 |

議院の権能（図の右表）:

| 権能 | 条文 |
|---|---|
| 議院規則の制定 | 58条2項前段 |
| 議員の資格争訟の裁判 | 55条 |
| 議員の懲罰 | 58条2項後段 |
| 国政に関する調査 | 62条 |
| 議員の逮捕の許諾・会期中の釈放要求 | 50条 |
| 会議の公開の停止（秘密会） | 57条1項 |
| 議長その他の役員の選任 | 58条1項 |
| 国務大臣の出席要求 | 63条 |

補足（図に小さく載せてよい。誤らない）:

- 64条: 国会が、両議院の議員で組織する弾劾裁判所を設ける。設置は国会。資格争訟（55条）と混ぜない。
- 73条3号: 条約の締結は内閣。国会が行うのは承認。
- 87条: 予備費を設ける議決は国会。支出そのものを国会が行う、と書かない。
- 90条: 内閣が決算を国会に提出し、国会が審査する。国会が作成する、と書かない。
- 62条: 両議院は各々調査できる。国会の合同権能にしない。

## PRE-GENERATE-CHECK

- 対比2語型。左＝論点（国会）。右＝論点（議院）。右パネル見出しを「ひっかけ」にしない。ひっかけは底部。
- 左表10行・右表8行。行背面は横一列ずつ白／薄いグレー。列ゼブラ禁止。
- 答え帯・暗記: 「弾劾裁判所の設置は国会。資格争訟の裁判と国政調査は各議院」。
- 条約は「承認」と書く。「締結は国会」を正しいルールとして書かない。
- 模試の肢番号・出版社名・講義録ページを図に出さない。
- 口語なし。スロットどおり。ちゃちゃロット1体。```text``` にブランド名なし。

判定: このプロンプト範囲では全部通す。生成はてらしぃ指示まで行わない。

## GPT Image プロンプト

画像参照: `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` ＋ `pitchi.png` ＋ `pitchi_sheet.png` ＋ `task_turtle.png` ＋ `task_turtle_sheet.png` ＋ `kachadokuro.png` ＋ `kachadokuro_sheet.png`

```text
Create a NEW Japanese legal-study poster from scratch. Landscape, high resolution, one sheet.
Navy and white base. Bold Japanese gothic. Wide padding. Thin rules. Soft shadow.
Left panel cool blue. Right panel warm teal. Center cream.
No brand names. No publisher names. No exam paper copy. No English.

Title, navy, centered:「憲法｜国会の権能と議院の権能」
Small chip:「国会は両院で一つ。議院は各議院が単独」

LEFT panel, heading:「論点（国会）」
Role under a small face: 両院で一つの権能として決める者
Match ぴっちゅ: pitchi.png and pitchi_sheet.png. Good side.
Q&A only. YES／NO／短い語句. No GO badges.
法律の制定は？ → 国会（59条）
条約の承認は？ → 国会（73条3号）
弾劾裁判所の設置は？ → 国会（64条）
決算の審査は？ → 国会（90条）
予備費を設ける議決は？ → 国会（87条）
内閣総理大臣の指名は？ → 国会（67条）

TABLE under the Q&A in the same left panel. Navy header. 10 data rows. Zebra by ROW: white / light gray. Never column zebra.
列: 国会の権能｜条文
行1: 法律の制定｜59条
行2: 条約の承認｜73条3号
行3: 憲法改正の発議｜96条
行4: 租税の法定｜84条
行5: 国費の支出・国の債務負担の議決｜85条
行6: 予備費を設ける議決｜87条
行7: 皇室の費用の議決｜88条
行8: 決算の審査｜90条
行9: 内閣総理大臣の指名｜67条
行10: 弾劾裁判所の設置｜64条

RIGHT panel, heading:「論点（議院）」
Role under a small face: 各議院の自律を示す者
Match タスク亀: task_turtle.png and task_turtle_sheet.png. Good side.
Q&A only:
議院規則の制定は？ → 各議院（58条2項前段）
資格争訟の裁判は？ → 各議院（55条）
国政に関する調査は？ → 各議院（62条）
役員の選任は？ → 各議院（58条1項）
国務大臣の出席要求は？ → 各議院（63条）
逮捕の許諾・釈放要求は？ → 各議院（50条）

TABLE under the Q&A in the same right panel. Navy header. 8 data rows. Zebra by ROW: white / light gray. Never column zebra.
列: 議院の権能｜条文
行1: 議院規則の制定｜58条2項前段
行2: 議員の資格争訟の裁判｜55条
行3: 議員の懲罰｜58条2項後段
行4: 国政に関する調査｜62条
行5: 議員の逮捕の許諾・会期中の釈放要求｜50条
行6: 会議の公開の停止（秘密会）｜57条1項
行7: 議長その他の役員の選任｜58条1項
行8: 国務大臣の出席要求｜63条

CENTER, between panels, small:
ぴっちゅ points to a stamp「両院で一つ」. Good side. Role: 両院で一つの権能として決める者
カチャドクロ with stamp「国政調査は国会」and a red ×. Match kachadokuro.png and kachadokuro_sheet.png. Bad side. Role: 国政調査は国会だと主張する者
Caption:「弾劾裁判所の設置は国会（64条）。資格争訟の裁判は各議院（55条）。条約は承認が国会。締結は内閣」

BOTTOM strip, three cards:
判断軸「国会＝両院で一つの権能。議院＝各議院が単独。弾劾の設置は国会。資格争訟と国政調査は議院」
ひっかけ「国政調査は国会／資格争訟は国会／弾劾裁判所は各議院／条約の締結は国会／決算の作成は国会／予備費の支出は国会が行う／大臣の出席要求は国会」
暗記「弾劾裁判所の設置は国会。資格争訟の裁判と国政調査は各議院。法律制定・条約承認・決算は国会。役員選任は議院」

Guide: ちゃちゃロット, ONE only, SMALL in the bottom margin.
Green lecturer suit (blazer, white shirt, trousers, shoes). Wooden pointer to 暗記.
Independent light-blue hat with a nico-nico face ON the head, not ears, not animal head.
Do not cover panels, arrows, tables, or the memory line. No nameplate.

Exact on-image Japanese only as specified. No extra captions.
```

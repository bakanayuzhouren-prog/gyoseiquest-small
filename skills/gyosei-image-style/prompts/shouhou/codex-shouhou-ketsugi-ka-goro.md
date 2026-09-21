# Codex用 — 特別決議は蚊が多い（かい・かぶ・げん）

語呂1枚。既存の左右一覧 `ketsugi-futsu-tokubetsu-ichiran` は触らない。教材転載なし。

- 保存先: `assets/images/deepdive/learn/shouhou/ketsugi-ka-goro.png`
- 画像キー: `learn/shouhou/ketsugi-ka-goro`
- 生成は Codex。Cursor は描かない。

## 法律の芯（崩すな）

右列の特別決議を、読みの頭で3つに分ける。全部を「か」一字に無理寄せしない。

| 語呂 | 読み | この図の対象 |
|---|---|---|
| かい | かい | 監査役の解任。監査等委員である取締役の解任。解散。会社継続（473条／471条1号から3号の場合） |
| かぶ | かぶ | 非公開会社の募集（株主割当て以外）。非公開会社の株主割当て（原則）。特に有利な金額での募集。特定株主からの自己株式取得 |
| げん | げん | 資本金の減少（原則）。現物配当（金銭分配請求権を与えない場合） |

語呂（てらしぃ）: **特別決議は蚊が多い？ 減？** かい・かぶは「か」。最後は減（げん）。補助吹き出し「多いのに、減る。どっちやねん」はタイトル付近だけ。答え帯・判断軸・条文説明には入れない。

入れない: 特殊決議。総株主の同意。取締役会決議。定足・賛成割合。普通決議の一覧。447条3項。公開会社の株主割当て。

**書かない:** 特別決議は全部「か」で始まる。現物配当も「か」。口語を答え帯に残す。あぷし。Gyosei Quest。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル | 特別決議は蚊が多い？ 減？ |
| 中央 | かい／かぶ／げんの3列。かだけ赤。げんのそばに赤い減 |
| 判断軸 | かい＝監査役等の解任・解散・継続。かぶ＝非公開・有利・特定株主。げん＝減少の原則・現物の限定 |
| ひっかけ | 全部が「か」一字。普通の取締役の解任も特別。現物配当は常に特別 |
| 暗記 | 特別決議は蚊が多い。かい・かぶ、最後は減（げん） |
| 役割 | 案内（暗記を指す）／語呂を示す側 |

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内（暗記を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ 全身指し棒正本 |
| 語呂 | 悪い役 | 重い決議側（株主総会を特別にさせる） | カチャドクロ | `kachadokuro.png` ＋ ポーズシート `kachadokuro_sheet.png` |

蚊は小さな記号だけ。名簿外のマスコットにしない。名前を印字しない。

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート kachadokuro_sheet.png を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 特別決議の覚え方。かい・かぶはか。最後は減（げん）.
Quality: same density as q26-2.png. slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Canvas: fully opaque warm off-white, entire 16:9. No transparency, no dark empty corners.
Match LAYOUT of approved「主宰者の許可」: left green 論点 / right orange ひっかけ, ONE center 3-column table, bottom 判断軸 / ひっかけ / 暗記, navy answer bar at the very bottom.

STRICT: Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP badges on 論点.
Title:「特別決議は蚊が多い？ 減？」
Near the title only, one small helper balloon:「多いのに、減る。どっちやねん」
That balloon is mnemonic garnish only. Never put it on the answer bar, 判断軸, 論点, ひっかけ body, table cells, or statute lines.
Chip:「かい・かぶは『か』。最後は減（げん）――多いのに減る」

Left 論点 Q&A ONLY. 短名＋（〇条）:
1. 監査役・監査等委員である取締役の解任、解散、会社継続（473条）は（309条2項） → かい
2. 非公開会社の募集・株主割当て、有利発行、特定株主からの自己株式取得は → かぶ
3. 資本金の減少（原則）と金銭分配請求権を与えない現物配当は（447条・454条4項） → げん

Right ひっかけ ONLY:
- 特別決議は全部「か」で始まる
- 普通の取締役の解任も特別決議である
- 現物配当は常に特別決議である
- 資本金の減少は常に特別決議である

Center ONLY: one 3-column table. Header row navy. Data rows alternate white / light gray by row, not by column.
Navy header lettering: in「かい」and「かぶ」, only the first「か」is red. The remaining「い」and「ぶ」are white. In「げん」, the letters are white; place a small red「減」beside it so「げん＝減る」is visible at a glance. Red on navy must have a thin white or cream outline so it stays readable. Do not redden body text without meaning.
Column1 header「かい」sub「監査役等の解任・解散・継続」
rows: 監査役の解任 / 監査等委員である取締役の解任 / 解散 / 会社継続（473条／471条1号から3号の場合）
Column2 header「かぶ」sub「非公開・有利・特定株主」
rows: 非公開会社の募集（株主割当て以外） / 非公開会社の株主割当て（原則） / 特に有利な金額での募集 / 特定株主からの自己株式取得
Column3 header「げん」sub「減少の原則・現物の限定」
rows: 資本金の減少（原則） / 現物配当（金銭分配請求権を与えない場合）
Small mosquito icons only as decoration near the title. Do not name them. Do not make a new mascot.

カチャドクロ SMALL beside the table. Label「重い決議側（特別にさせる）」. Do not cover text.
Bottom cards in the left 80%. Guide safe zone right 20% above the answer bar.
- 判断軸:「かい＝監査役等の解任・解散・継続。かぶ＝非公開・有利・特定株主。げん＝減少の原則・現物の限定」
- ひっかけ:「全部がか一字。普通の取締役の解任も特別。減少と現物配当は常に特別」
- 暗記:「特別決議は蚊が多い。かい・かぶ、最後は減（げん）」
Answer:「特別決議は蚊が多い。かい（監査役・監査等委員である取締役の解任、解散、会社継続）かぶ（非公開会社の募集と株主割当て、有利発行、特定株主からの自己株式取得）げん（資本金の減少の原則、金銭分配請求権を与えない現物配当）。」

Guide: ちゃちゃロット SMALL in the lower-right guide safe zone, entirely ABOVE the navy answer bar, 指し棒 pointing at 暗記. Match chachalot.png, approved-smiling-hat-mascot.png, 全身指し棒正本. Green lecturer suit, trousers, shoes. Independent pale-sky-blue smiling hat, not ears. One body. No nameplate. No brand letters.
```

## 目視

- [ ] 全部を「か」一字にしていない
- [ ] 普通の取締役解任を特別に含めていない。かいの解任は監査役と監査等委員である取締役だけ
- [ ] 資本金の減少に「原則」がある（447条3項を特別と断定していない）
- [ ] 現物配当に金銭分配請求権を与えない場合がある（454条4項）
- [ ] かぶに非公開会社・有利発行・特定株主からの自己株式取得がある
- [ ] 名簿外マスコットがいない。ブランド印字なし
- [ ] 紺色の表見出しで「かい」「かぶ」の「か」だけが赤い
- [ ] 「げん」と赤い「減」の対応が一目で分かる
- [ ] タイトルが「特別決議は蚊が多い？ 減？」になっている
- [ ] 「どっちやねん」は補助吹き出しだけで、法律説明には混入していない
- [ ] 会社継続に473条が示されている
- [ ] 「普通の取締役」と「監査等委員である取締役」を混同していない
- [ ] 既存の左右一覧を変更していない

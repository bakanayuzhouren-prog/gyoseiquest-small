# 行訴法・原告適格あり（表1）

- 保存先: assets/images/deepdive/learn/gyosho/genkoku-ari.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 姉妹: `codex-gyosho-genkoku-nashi.md`／`codex-gyosho-genkoku-kikiwake.md`
- 処分性表とは別。この枚に「行為の処分性」を混ぜない。

## PRE-GENERATE-CHECK（Cursor確認済み）

行訴法9条1項（法律上の利益）・2項（第三者。法令の趣旨・目的と利益の内容・性質）。正本: `chatTopicBriefsGyoseiGyosho.ts`／`GyoseiSoron.ts`。

- 名宛人は原則○。
- 長沼ナイキ（最判昭57.9.9）保安林解除。森林法は洪水緩和等の個別的利益を保護。一定範囲の住民○。代替施設で危険が解消すれば訴えの利益の棚（適格と混ぜない）。
- 開発区域外でも生命・身体に直接の被害のおそれ（がけ崩れ等・都計法33条1項7号の趣旨）○。
- 場外車券（最判平21.10.15）病院等の開設者○。周辺住民はなし表へ。
- 一般廃棄物処理業（最判平26.1.28）許可・更新を受けている同業者○。
- 公衆浴場の距離制限における既存業者○（薬局距離の憲法論と棚が違う）。
- もんじゅ・原子炉設置許可（最判平4.9.22）。生命・身体の危険がある周辺住民に適格。本案の結論は別。
- 新潟空港・定期航空運送事業免許（最判平元.2.17）。騒音等の周辺住民○。
- 小田急高架・都市計画事業認可（最判平17.12.7）。騒音等の健康被害を直接受ける周辺住民○。運賃認可の単なる利用者（平元.4.13）はなし表。
- たばこ小売の距離制限は、既存業者の営業利益を保護する趣旨があるときに○（距離規制クラスタ）。確認できない事件名は書かない。
- 禁止: 切る。場外車券の周辺住民を○にする。医師の競争を○にする。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. PAGE 1 of 行訴法・原告適格 tables. Do not draw 処分性 ○× of acts.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

Title:「原告適格がある定番」
Chip:「行訴法9条。取消しを求める法律上の利益」

Left panel heading 論点:
名宛人は？ → 原則YES
第三者は？ → 法令が個別利益を保護するか（9条2項）
生命身体は？ → 直接の被害のおそれならYESになりやすい

Right panel heading ひっかけ:
周辺住民は常にYES
区域外は常にNO
競争者は常にYES
適格と訴えの利益を同じにする

MAIN: one clean table. Columns: 立場 | 結論 | 芯
Header navy. Data rows white / light gray alternating (row zebra).
結論: ○ only, green, large.

Rows EXACT:
処分の名宛人 | ○ | 法律上の利益があるのが原則（9条1項）
保安林解除の一定範囲の住民（長沼） | ○ | 森林法が洪水緩和等の個別利益を保護（昭57.9.9）
開発区域外でも生命身体に直接の被害のおそれがある者 | ○ | 都計法33条1項7号の趣旨。区域外でも可
場外車券施設の近隣の病院等の開設者 | ○ | 静穏・療養環境（平21.10.15）
一般廃棄物処理業の許可を受けている同業者 | ○ | 他者の許可取消を争い得る（平26.1.28）
公衆浴場の距離制限下の既存業者 | ○ | 営業利益の保護趣旨。薬局違憲の棚ではない
原子炉設置許可の周辺住民（もんじゅ） | ○ | 生命身体の危険。本案の当否は別（平4.9.22）
定期航空運送事業免許の周辺住民（新潟空港） | ○ | 騒音等（平元.2.17）
都市計画事業認可で健康被害を直接受ける周辺住民 | ○ | 小田急高架（平17.12.7）
たばこ小売の距離制限における既存許可業者 | ○ | 営業を保護する趣旨があるとき

Small metaphor: a person at the courthouse door with a pass labeled 法律上の利益. Do not cover the table. Role label under figure: 取消訴訟を提起したい者（法律上の利益）

Bottom three cards:
判断軸: 根拠法令が、その者の個別利益を保護しているか（9条2項）
ひっかけ: 周辺住民だから常に○。区域外だから常に×
暗記: 名宛人○。長沼の一定範囲○。車券は病院○。ごみは同業者○。生命身体の直接のおそれは○

Answer bar EXACT:
「第三者の原告適格は、法令の趣旨・目的と、侵害される利益の内容・性質で見る。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 場外車券は病院等のみ○。住民を○にしていない
- [ ] 長沼の行に「訴えの利益まで残る」と書いていない
- [ ] 行ゼブラ

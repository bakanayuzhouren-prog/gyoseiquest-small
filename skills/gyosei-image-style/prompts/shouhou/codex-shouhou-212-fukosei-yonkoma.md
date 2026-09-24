# Codex用 — 不公正な払込金額（212条）差額義務と権利行使・4コマ

4コマ主役。1枚。教材転載なし。結論は会社法212条1項1号・208条5項・209条1項。てらしぃ確定: 記述は誤り。差額の支払義務はある。支払った後でなければ株主の権利を行使できない、は誤り。

- 保存先: `assets/images/deepdive/learn/shouhou/212-fukosei-yonkoma.png`
- 画像キー: `learn/shouhou/212-fukosei-yonkoma`
- 生成は Codex。Cursor は描かない。

## 法律の芯（崩すな）

募集株式の引受人は、取締役（指名委員会等設置会社にあっては取締役又は執行役）と通じて著しく不公正な払込金額で募集株式を引き受けたときは、株式会社に対し、当該払込金額と当該募集株式の公正な価額との差額に相当する金額を支払う義務を負う（212条1項1号）。

条文は支払義務だけを定める。株主の権利行使を止める定めはない。

出資の履行は208条。株主となる時期は209条1項。安い払込金額でも、定められた払込金額の全額の払込みは出資の履行である。出資の履行をしないときに株主となる権利を失うのは208条5項であり、本件と混ぜない。株券の交付は株主となる要件ではない。

発行前の差止め（210条2号・著しく不公正な方法）は別論点。この図の主役にしない。

**書かない:** 差額を払うまで議決権なし。未払込みと同じ。株券の交付。出資の履行を209条と書く。口語を答え帯に載せる。あぷし。Gyosei Quest。問題文の全文転載。条文の金額は公正な価額。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 差額は払う／権利は止まらない |
| 中央メタファー | 4コマ（通謀→払込み→言い分→着地） |
| 判断軸 | 通じて安く引き受けたか。払込みはしたか |
| ひっかけ | 差額を払うまで権利行使できない。未払込みと同じ |
| 暗記 | 取締役と通じて著しく不公正な払込金額で引き受けた者は差額を支払う。株主の権利は行使できる |
| 役割 | 会社（差額を回収する）／通じた取締役／安い引受けをした側 |

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 案内 | いい役 | 案内（暗記を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ 全身指し棒正本 |
| 会社 | いい役 | 会社（差額の支払を求める） | タスク亀 | `task_turtle.png` ＋ ポーズシート `task_turtle_sheet.png` |
| 通じた取締役 | 悪い役 | 通じた取締役（安く引き受けさせる） | カチャドクロ | `kachadokuro.png` ＋ ポーズシート `kachadokuro_sheet.png` |
| 引受人 | 悪い役 | 安い引受けをした側（株主の権利を使いたい） | すべとん | ポーズシート `subeton_sheet.png` |

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート（task_turtle_sheet.png / kachadokuro_sheet.png / subeton_sheet.png）を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 取締役と通じた不公正な払込金額。差額の支払義務はある。株主の権利行使は止まらない.
Quality: same density as q26-2.png. slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Canvas/background: fully opaque solid warm off-white across 100% of the entire 16:9 canvas, including all four corners. No transparency, alpha area, checkerboard, black or dark empty background, unpainted margin, vignette, or cropped canvas. Fill every pixel of the canvas with that opaque warm off-white first. No background cut-off.
Match LAYOUT of the approved「主宰者の許可」sample: left green / right orange, FOUR numbered comic panels in the center (not a data table), bottom 判断軸 / ひっかけ / 暗記.

STRICT: Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP badges on 論点.
Left heading「論点」. Right heading「ひっかけ」.

Title:「差額は払う。権利は止まらない」
Chip:「212条1項1号。支払義務。権利行使の停止はない」

Left 論点 Q&A ONLY. 説明行は短名＋（〇条）:
1. 通じて安く引き受けると差額を払うか（212条1項1号） → YES
2. 定められた払込金額の出資の履行（208条）をすれば株主になるか（209条1項） → YES
3. 差額を払うまで権利行使できないか → NO
4. 払込みを全くしない場合と同じか（208条5項） → NO

Right ひっかけ ONLY:
- 差額を支払った後でなければ株主の権利を行使できない
- 安い払込みは出資の履行にならない
- 未払込みと同じで株主にならない
- 支払義務そのものがない
- 株主になるには株券の交付が必要である

Center ONLY: four equal comic panels in a 2x2 grid. Each panel has a numbered heading and one short beat. Characters SMALL. Do not cover the heading or the one-line caption. Do not draw share certificates. Do not show anyone handing over stock certificates.
1. まず何が起きた
カチャドクロ（通じた取締役）とすべとん（安い引受けをした側）が申し合わせ、公正な価額より著しく安い払込金額で募集株式を引き受ける。Label under each:「通じた取締役（安く引き受けさせる）」「安い引受けをした側（株主になりたい）」
2. 出資の履行
すべとんは定められた払込金額を払い込む。札は二つに分ける。「出資の履行（208条）」「株主となる時期（209条1項）」。タスク亀は払込みを受けるだけ。株券も株の手渡しもしない。Label「会社（払込みを受ける）」
3. 当事者の言い分
会社「差額を支払え（212条1項1号）」。安い引受けをした側「差額を払うまで議決権は使えないはずだ」。誤った言い分に赤い×を小さく。
4. 着地
答え札「支払義務はYES。権利行使の停止はNO」。すべとんは株主の権利を使える。会社は差額債権を持つ。未払込み（208条5項）の札は脇に小さく「別論点」。

Do not copy any exam sentence verbatim. Amounts are 公正な価額.

Bottom layout: navy answer bar is the very bottom edge. Directly ABOVE the answer bar, at the right end, reserve a dedicated warm-off-white guide safe zone. Keep the three bottom cards within the left approximately 80% of their row and reserve the right approximately 20% for the guide. The guide must not overlap the panels, the bottom cards, body text, or the answer bar.
- 判断軸:「取締役と通じて著しく不公正な払込金額で引き受けたか。出資の履行（208条）をしたか」
- ひっかけ:「差額を払うまで権利行使できない。未払込みと同じ。株券の交付が必要」
- 暗記:「取締役と通じて著しく不公正な払込金額で引き受けた者は差額を支払う。株主の権利は行使できる」
Answer:「取締役と通じて著しく不公正な払込金額で募集株式を引き受けた者は、株式会社に対し公正な価額との差額を支払う義務を負う。株主の権利の行使は、その支払の完了を条件としない。」

Scene cast: タスク亀. Match assets/images/characters/task_turtle.png and ポーズシート assets/images/characters/task_turtle_sheet.png. カチャドクロ. Match assets/images/characters/kachadokuro.png and ポーズシート assets/images/characters/kachadokuro_sheet.png. すべとん. Match ポーズシート assets/images/characters/subeton_sheet.png. Do not swap these roles. No owl, bear, cat, raccoon. No extra human 純子さん.

Guide: ちゃちゃロット SMALL in the lower-right guide safe zone only, entirely ABOVE the navy answer bar and OUTSIDE the four panels and bottom cards, wooden 指し棒 pointing at 暗記. Match assets/images/characters/chachalot.png, skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png, and 全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body only. No nameplate. Not a scene character. Every pixel of the guide—including hat, body, feet, shoes, pointer, outline, and shadow—must stay entirely inside the guide safe zone. None of them may touch or overlap the navy answer bar, panels, cards, labels, or text. Leave clearly visible warm-off-white space between the guide’s feet and the answer bar. Do not stand on the answer bar.
No brand letters anywhere. No overlapping text. Large gothic Japanese.
```

## 目視チェック

- [ ] 支払義務を否定していない
- [ ] 「支払後でなければ権利行使できない」を正解にしていない
- [ ] 条文は公正な価額。出資の履行は208条、株主となる時期は209条
- [ ] 株券の交付・株の手渡しがない
- [ ] 暗記に「取締役と通じて著しく不公正な払込金額で引き受けた」がある
- [ ] 未払込み（208条5項）と混ぜていない
- [ ] 許可キャスト以外がいない。全画面不透明

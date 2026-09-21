# Codex用 — 共産党袴田事件（最判昭63.12.20）歴史4コマ

てらしぃ修正（2026-09-22）: 本件は**党側の建物明渡請求**。袴田側が**除名の効力を争った**。地位確認訴訟として描かない。判旨の軸は**党規約に基づき適正な手続でされたか**の限定審査。政党を悪い役にしない（内部自律を尊重した判決と噛み合わせる）。殺人再審の袴田巌事件と混ぜない。

- 保存先: `assets/images/deepdive/learn/kenpou/kyosanto-hakamada-yonkoma.png`
- 画像キー: `learn/kenpou/kyosanto-hakamada-yonkoma`
- 生成は Codex。Cursor は描かない。

## 法律の芯（崩すな）

憲法に政党の明文規定はない。議会制民主主義の前提として政党の存在が認められる。

政党は、共通の政治的信念を持つ者の任意結社である。内部の組織、規律、党員の地位は、原則として政党の自律的決定に属する。

本件の訴訟の向き: 日本共産党が、除名後の袴田里見に対し**党の建物の明渡し**を求めた。袴田側は、その請求を拒む前提として**除名の効力**を争った。袴田が原告となって党員の地位確認を求めた構図で描かない。

司法審査の軸（最判昭63.12.20）: 除名の思想的当否には立ち入らない。審査し得るのは、**党規約に基づき適正な手続でされたか否か**に限る。

**書かない:** 袴田が地位確認を求めた。除名は常に実体まで審査する。一切審査できない。党規約に著しく反したとき、だけを軸にする（本件の軸は適正手続）。袴田巌の再審。南九州税理士会・国労広島と同一視。実在の政治家の顔・実名の似顔絵。政党を悪役にする。あぷし。Gyosei Quest。問題文の全文転載。口語を答え帯・判断軸に入れる。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 審査は適正な手続に限る |
| 中央メタファー | 4コマ（明渡し→言い分→限定審査→着地） |
| 判断軸 | 党規約に基づき適正な手続でされたか。除名の当否か |
| ひっかけ | 地位確認訴訟。常に実体審査。一切審査不能。袴田巌 |
| 暗記 | 袴田は明渡し。審査は党規約に基づく適正手続に限る |
| 役割 | 政党（明渡しを求める）／除名された側（除名の効力を争う） |

## 配役

両場面役は**いい役**。判決が内部自律を尊重したので、政党をカチャドクロ系にしない。

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 政党 | いい役 | 政党（明渡しを求める） | タスク亀 | `task_turtle.png` ＋ ポーズシート `task_turtle_sheet.png` |
| 除名された側 | いい役 | 除名された側（除名の効力を争う） | ぴっちゅ | `pitchi.png` ＋ ポーズシート `pitchi_sheet.png` |
| 案内 | いい役 | 案内（暗記を指す） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ 全身指し棒正本 |

## GPT Image プロンプト

```text
参照必須: 場面役はポーズシート task_turtle_sheet.png と pitchi_sheet.png を照合する。ちゃちゃロットは全身指し棒正本 approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 共産党袴田事件。党が建物の明渡しを求める。袴田側は除名の効力を争う。司法審査は党規約に基づき適正な手続でされたか否かに限る.
Quality: same density as q26-2.png. slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas: fully opaque warm off-white, entire 16:9. No dark empty corners.

Match LAYOUT of the approved sample: left green / right orange, FOUR numbered comic panels in the center (2x2, not a data table), bottom 判断軸 / ひっかけ / 暗記.
STRICT: Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP on 論点.
Left heading「論点」. Right heading「ひっかけ」.

Title:「審査は、党規約に基づく適正な手続に限る」
Chip:「最判昭63.12.20。明渡請求。地位確認訴訟ではない」

Left 論点 Q&A ONLY. 短名＋結論:
1. 憲法に政党の明文はあるか → NO
2. 除名の思想の当否まで審査するか → NO
3. 党規約に基づき適正な手続でされたかは審査し得るか → YES

Right ひっかけ ONLY:
- 袴田が党員の地位確認を求めた訴訟である
- 除名は常に実体まで裁判所が審査する
- 内部問題は一切審査できない
- 袴田巌の再審事件である

Center ONLY: four equal comic panels in a 2x2 grid. Numbered headings. Characters SMALL. Do not cover headings or one-line captions. No real-person portraits. No party campaign logos. No extra humans. No skull villains. Both scene characters are cooperative-looking, not evil.
1. まず何が起きた
タスク亀（政党）が建物の鍵と明渡の書面を示す。ぴっちゅ（除名された側）が建物側に立つ。札「除名のあと、建物明渡請求」。Labels「政党（明渡しを求める）」「除名された側（除名の効力を争う）」
2. 当事者の言い分
政党「除名済みである。明け渡せ」。除名された側「除名は無効である」。Do not write「地位を確認せよ」.
3. 裁判所が見た争点
札「党規約に基づき適正な手続でされたか」。小さい札「明文なし」「内部自律」。除名の思想の当否は見ない。
4. 判決の着地
答え札「限定審査＝適正な手続。当否には立ち入らない」。建物の絵は小さく残してよい。地位確認の札は置かない。

Bottom cards, left about 80 percent. Right 20 percent is guide safe zone.
- 判断軸:「党規約に基づき適正な手続でされたか。除名の当否か」
- ひっかけ:「地位確認訴訟。常に実体審査。一切審査不能。袴田巌」
- 暗記:「袴田は明渡し。審査は党規約に基づく適正手続に限る」
Answer:「政党の除名処分は、党規約に基づき適正な手続でされたか否かに限って司法審査し得る。除名の当否そのものには立ち入らない。」

Do not put どっちやねん on the answer bar, 判断軸, or statute lines.

Scene: タスク亀. Match assets/images/characters/task_turtle.png and ポーズシート assets/images/characters/task_turtle_sheet.png. ぴっちゅ. Match assets/images/characters/pitchi.png and ポーズシート assets/images/characters/pitchi_sheet.png. Do not swap these roles. Do not draw カチャドクロ, キングカチャドクロ, プリンセスカチャドクロ, or すべとん.

ちゃちゃロット SMALL in the lower-right guide safe zone only, entirely ABOVE the navy answer bar. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body. No nameplate. Wooden 指し棒 to 暗記. Leave warm-off-white space between feet and the answer bar.
No owl, bear, cat, extra humans. No brand letters.
```

## 目視

- [ ] 訴訟の向きは党の建物明渡請求。袴田側が除名の効力を争う。地位確認訴訟になっていない
- [ ] 判旨の軸は「党規約に基づき適正な手続でされたか」。著しく反したとき、だけが軸になっていない
- [ ] 除名の当否を裁判所が見る図になっていない
- [ ] 政党がキングカチャドクロ等の悪い役になっていない。タスク亀とぴっちゅ
- [ ] 袴田巌の再審と混ぜていない。実在人物の似顔絵がない
- [ ] ブランド印字なし。名簿外なし

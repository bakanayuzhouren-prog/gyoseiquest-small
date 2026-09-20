# Codex用 — 後順位抵当権者のできること／できないこと

表主役。1枚。教材転載なし。結論は民法145条・378条・379条・474条・482条、最判昭24.10.21、最判平11.10.21。

- 保存先: `assets/images/deepdive/learn/minnpou/kogo-teitou-engo.png`
- 画像キー: `learn/minnpou/kogo-teitou-engo`
- 生成は Codex。Cursor は描かない。

## 法律の芯（崩すな）

**後順位抵当権者のまま**では、先順位の被担保債権の消滅時効を援用できない。先順位が消えて順位が上がる利益は**反射的利益**であり、145条の「時効の完成について正当な利益を有する者」に当たらない（最判昭24.10.21、最判平11.10.21）。

保証人・物上保証人・第三取得者は145条が明示する。後順位と混ぜない。

**所有権を取得すれば第三取得者になる。** 代物弁済（482条）でも売買でも同じ。自己の後順位抵当権は混同で消えるのが原則（179条）。その後は先順位との関係で第三取得者の道具が使える。

| 行為 | 後順位のまま | 第三取得者になったあと |
|---|---|---|
| 先順位債権の消滅時効の援用（145条） | × | ○ |
| 抵当権消滅請求（379条） | × | ○（差押えの効力発生前。382条） |
| 代価弁済（378条） | × | ○（所有権または地上権を買い受けたとき） |
| 自己の抵当権の実行・配当 | ○ | 自己の後順位は混同で消えるのが原則 |
| 先順位債権の第三者弁済（474条） | ○（正当な利益） | — |

代価弁済の「買い受けた」に、贈与・相続は乗らない。消滅請求は買い受けに限らないが、主債務者・保証人とその承継人は不可（380条）。

**書かない:** 後順位のままで時効援用できる。代価弁済と代物弁済を同じ制度にする。口語。あぷし。Gyosei Quest。

## チェックリスト

| 欄 | 内容 |
|----|------|
| タイトル対比 | 後順位のままでは援用できない／所有権を取れば第三取得者 |
| 中央メタファー | 行為ごとの可否表（行ゼブラ） |
| 判断軸 | 後順位のままか、第三取得者か |
| ひっかけ | 順位が上がるから援用できる。代物弁済＝代価弁済 |
| 暗記 | 後順位は反射的利益。代物弁済等で所有者になれば援用できる |
| 役割 | 後順位抵当権者（自己の抵当権を実行する）／第三取得者（所有権を守る）／誤った主張をする側（後順位のままで時効を援用する） |

## GPT Image プロンプト

```text
参照必須: 場面役はアイコンに加えポーズシート（pitchi_sheet.png / task_turtle_sheet.png / kachadokuro_sheet.pngのうち使うもの）を照合する。ちゃちゃロットの全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png を照合する。説明行には（〇条）を出す。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 後順位抵当権者のままでは先順位債権の時効を援用できない。所有権を取得すれば第三取得者になる.
Quality: same density as q26-2.png. slightly POP, large gothic Japanese, ZERO overlapping glyphs.
Canvas/background: fully opaque solid warm off-white across 100% of the entire 16:9 canvas, including all four corners. No transparency, alpha area, checkerboard, black or dark empty background, unpainted margin, vignette, or cropped canvas. Fill every pixel of the canvas with that opaque warm off-white first. No background cut-off.
Match LAYOUT of the approved「主宰者の許可」sample: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

STRICT: Never「だれが」「問が聞くこと」「（聞かない）」. No GO/STOP badges on 論点.
Left heading「論点」. Right heading「ひっかけ」. Labels: Left「論点」Right「ひっかけ」

Title:「後順位のままでは援用できない」
Chip:「145条。反射的利益。所有権を取れば第三取得者」

Left 論点 Q&A ONLY. 説明行は短名＋（〇条）:
1. 後順位のまま時効援用できるか（145条） → NO
2. 順位上昇は正当な利益か → NO（反射的利益）
3. 代物弁済で所有者になれるか（482条） → YES
4. 第三取得者は時効援用できるか（145条） → YES

Right ひっかけ ONLY:
- 後順位でも先順位債権の時効を援用できる
- 順位が上がるから正当な利益がある
- 代物弁済と代価弁済は同じ制度である
- 後順位のまま抵当権消滅請求ができる（379条）
Do not write ○ for 後順位のままの時効援用.

Center ONLY: one table. Header navy. Row zebra white / light gray, horizontal not columns.
Columns: 行為 | 後順位のまま | 第三取得者
Rows:
時効の援用（145条） | × | ○
抵当権消滅請求（379条） | × | ○
代価弁済（378条） | × | ○（買い受けたとき）
自己の抵当権の実行 | ○ | 自己の後順位は混同（179条）
先順位債権の第三者弁済（474条） | ○ | —
Caption:「代物弁済（482条）または売買で所有権を取得すれば第三取得者になる。代価弁済（378条）は買い受けた者の制度であり、代物弁済と混ぜない」

Scene cast SMALL, do not cover table or labels:
- Good role, left of table: タスク亀. Match assets/images/characters/task_turtle.png and ポーズシート assets/images/characters/task_turtle_sheet.png. Label「後順位抵当権者（自己の抵当権を実行する）」
- Good role, right of table: ぴっちゅ. Match assets/images/characters/pitchi.png and ポーズシート assets/images/characters/pitchi_sheet.png. Label「第三取得者（所有権を守る）」
- Bad role, far right: カチャドクロ. Match assets/images/characters/kachadokuro.png and ポーズシート assets/images/characters/kachadokuro_sheet.png. Label「誤った主張をする側（後順位のままで時効を援用する）」
Do not swap these roles. No owl, bear, cat, raccoon.

Bottom layout: navy answer bar is the very bottom edge. Directly ABOVE the answer bar, at the right end, reserve a dedicated warm-off-white guide safe zone. Keep the three bottom cards within the left approximately 80% of their row and reserve the right approximately 20% for the guide. The guide must not overlap the table, the bottom cards, body text, or the answer bar.
- 判断軸:「後順位のままか、第三取得者か（145条）」
- ひっかけ:「順位上昇＝正当な利益。代物弁済＝代価弁済。後順位のまま消滅請求」
- 暗記:「後順位は反射的利益。所有権を取れば援用できる」
Answer:「後順位抵当権者は、先順位の被担保債権の消滅時効を援用することができない。債務者から抵当不動産の所有権を取得したときは第三取得者となり、時効を援用することができる。」

Guide: ちゃちゃロット SMALL in the lower-right guide safe zone only, entirely ABOVE the navy answer bar and OUTSIDE the table and bottom cards, wooden 指し棒 pointing at 暗記. Match assets/images/characters/chachalot.png, skills/gyosei-image-style/assets/approved-smiling-hat-mascot.png, and 全身指し棒正本 skills/gyosei-image-style/assets/approved-chachalot-pointer.png. Green lecturer suit, white shirt, green trousers, shoes. Independent pale-sky-blue smiling hat with a smiling hat-face, not ears. One body only. No nameplate. Not a scene character. Every pixel of the guide—including hat, body, feet, shoes, pointer, outline, and shadow—must stay entirely inside the guide safe zone. None of them may touch or overlap the navy answer bar, table, cards, labels, or text. Leave clearly visible warm-off-white space between the guide’s feet and the answer bar. Do not stand on the answer bar.
No brand letters anywhere. No overlapping text. Large gothic Japanese. Do not copy any prep-school page.
```

## 目視チェック

- [ ] 後順位のままの時効援用を○にしていない
- [ ] 代物弁済と代価弁済が別行
- [ ] 全画面不透明オフホワイト。足が答え帯に乗っていない
- [ ] 行ゼブラ。許可キャスト以外がいない

# 制限行為能力者・相手方の催告（比較表）

- 保存先: assets/images/deepdive/learn/minnpou/seigen-saikoku-hikaku.png
- 見本品質: `assets/images/deepdive/textbook/minpou-kijutsu/q26-2.png`
- **生成は Codex。Cursor は描かない。**
- 根拠: e-Gov 民法20条1項〜4項、98条の2
- 著作権: 市販教材の表は転載しない。条文から自作。
- **てらしぃ指示:** 記述図の左右パネル（論点／ひっかけ）は置かない。表を主役。行背面は横一列ずつ白／薄いグレー。

配置（生成後・Cursor）: 見て聞いて覚える・民法総則（制限行為能力者の催告）。未成年が成年に達した後の取消権カードの深掘り候補。

## PRE-GENERATE-CHECK（Cursor確認済み）

- 20条1項: 行為能力者となった後、その者へ催告。期間内に確答を発しないときは追認したものとみなす。期間は一箇月以上。
- 20条2項: 行為能力者とならない間、法定代理人・保佐人・補助人へ、権限内の行為について催告。確答なしは追認したものとみなす。成年後見人は法定代理人。
- 20条3項: 特別の方式を要する行為は、方式を具備した旨の通知を発しないときは取り消したものとみなす。表の注に置く。本体行と混ぜない。
- 20条4項: 被保佐人又は17条1項の審判を受けた被補助人へ、保佐人又は補助人の追認を得るべき旨の催告。追認を得た旨の通知を発しないときは取り消したものとみなす。同意の審判がない被補助人には4項を使わない。
- 未成年者本人・成年被後見人本人（制限中）への追認催告は20条に根拠なし。98条の2により意思表示を対抗できない（試験では催告の効力なし）。
- 禁止: 未成年本人への催告で追認みなし、被保佐人への4項催告を追認みなし、被補助人全員に4項、成年＝取消権消滅。

## GPT Image プロンプト

```text
Create a NEW Japanese legal-study infographic from scratch. ONE job: 民法20条の催告。誰に催告すると、確答なしで何とみなすか。
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, large gothic Japanese, ZERO overlapping glyphs.

NO left panel. NO right panel. NO 論点 box. NO ひっかけ side box. The table is the whole center.

Title:「催告の相手で、沈黙の効果が分かれる」
Chip:「民法20条」

MAIN: one wide comparison table. Four columns: 催告の相手 | いつ | 催告の中身 | 確答なし
Header row navy white text. Data rows alternate: row1 white, row2 light gray, row3 white, row4 light gray (ROW zebra only, never column zebra). Wide cell padding. Font large enough to read on a phone. No tiny footnotes inside cells.

Rows EXACT (8 data rows):
能力者となった本人 | 制限終了後 | 追認するかどうか（20条1項） | 追認したものとみなす
法定代理人（成年後見人など） | 制限中・権限内 | 追認するかどうか（20条2項） | 追認したものとみなす
保佐人 | 制限中・権限内 | 追認するかどうか（20条2項） | 追認したものとみなす
補助人 | 制限中・権限内 | 追認するかどうか（20条2項） | 追認したものとみなす
被保佐人 | 制限中 | 保佐人の追認を得よ（20条4項） | 取り消したものとみなす
被補助人（同意の審判あり） | 制限中 | 補助人の追認を得よ（20条4項） | 取り消したものとみなす
未成年者本人 | 制限中 | 追認催告はできない | 効力なし（98条の2）
成年被後見人本人 | 制限中 | 追認催告はできない | 効力なし（98条の2）

Under the table, one thin note (not a side panel):
期間は一箇月以上。特別の方式を要する行為は、方式を具備した旨の通知がなければ取り消したものとみなす（20条3項）。
同意の審判がない被補助人には4項を使わない。

No center cartoon that covers the table. Optional tiny envelope icon in the title bar only.

Bottom three cards (below the table, not left/right):
判断軸: 催告の相手は、能力者になった本人か、保護者か、制限中の本人か
ひっかけ: 未成年・被後見の本人へ催告して追認みなしにする。被保佐人への催告を追認みなしにする
暗記: 保護者と能力者本人は追認みなし。被保佐と同意補助の本人は取消しみなし。未成年と被後見の本人は効力なし

Answer bar EXACT:
「相手方の催告は、能力者となった本人と保護者への沈黙が追認みなし、被保佐人等への沈黙が取消しみなしである。」

Guide: ONE ちゃちゃロット only. Copy approved-chachalot-pointer.png: cream face, pale-sky-blue hat (not ears), green blazer+white shirt+green trousers+shoes, wooden pointer. NOT owl/bear/tanuki/cat. NO glasses. Bottom-right cream margin ABOVE the navy bar. No name tag. Pointer must not cover letters.
Never write 切る／切れない. Never「だれが」as a character caption. Never「問が聞くこと」.
```

## 生成後チェック

- [ ] 20条1項・2項は追認みなし、4項は取消しみなし
- [ ] 未成年・被後見の本人は効力なし
- [ ] 被補助人は17条1項の審判あり、と書いてある
- [ ] 左右パネルがない
- [ ] 行ゼブラ（白／薄いグレー）

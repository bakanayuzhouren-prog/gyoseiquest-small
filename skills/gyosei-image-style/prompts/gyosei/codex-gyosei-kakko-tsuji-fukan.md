# Codex用 — 法律行為的と準法律行為的（確公通受・附款）

上書き対象: `assets/images/deepdive/learn/gyosei/kakko-tsuji-fukan.png`

てらしぃ指定（2026-09-23）。参照PNGがなくても描く。Codexの名簿外チェックで止めない。
- 過去の辻さん: 眼鏡。優しそう。ニコニコ。釣り竿を背負う。名札の上に振り仮名「かこのつじ」。縮小して隅に置かない。顔・眼鏡・釣り竿が読める大きさ。準法律の図と、附款の図の準法律側。
- 代さん: ニコニコ。たすきは「代」。メダルと印。札は「下限は、許可で免除」。眼鏡も釣り竿も付けない。附款の図の法律行為側だけ。法律行為の図には足さない。

1枚目は附款の可否。2枚目（法律行為）は生成済みのため、このファイルから生成しない。3枚目は準法律4行。既存の `kyoka-tokkyo-meirei-keisei.png` は上書きしない。

- 保存先（附款）: `assets/images/deepdive/learn/gyosei/kakko-tsuji-fukan.png`
- 準法律の図は生成済みで合格。このファイルからは再生成しない。
- 法律行為の図は生成済み。変更指示がないので再生成しない。
- 画像キー: `learn/gyosei/kakko-tsuji-fukan` / `learn/gyosei/kakko-tsuji-horitsu` / `learn/gyosei/kakko-tsuji-jun`
- 生成は Codex。Cursor は描かない。
- 配置案: 見て聞いて覚える・行政法総論の「もっと深掘る」。アプリ載せは生成後。

## PRE-GENERATE-CHECK

**法律行為的行政行為** 行政庁の意思表示で法律効果を発生させる。
- 命令的: 下命（作為義務）／禁止（不作為義務）／許可（一般的禁止の解除）／免除（作為義務の解除）
- 形成的: 特許（新しい権利・地位の設定）／認可（私人の法律行為を補充して完成）／代理（他人に代わってする法律行為）

**準法律行為的行政行為** 効果は法規が直接定める。
- 確認: 特定の事実または法律関係の存否を公に確定する
- 公証: 特定の事実または法律関係の存在を公に証明する
- 通知: 特定の事項を相手方に知らせ、法律がその通知に効果を定める
- 受理: 他人の行為を有効なものとして受け取る

**附款** 条件・期限・負担・撤回権の留保。原則として、裁量のある法律行為的行政行為に付す。準法律行為的行政行為には付せない。法律行為的でも裁量がない行為（羈束行為）には、原則として付せない。例外は2つだけ。法令が附款を付すことを認めているとき。相手方の同意があるとき。この2つは、準法律行為的行政行為には及ばない。裁量があっても、行政行為の目的と異なる附款は違法。「法律行為的だけ」「裁量のある法律行為的だけ」「裁量がない行為には例外なく付せない」と断定しない。

**書かない:** 確認にも附款を付せる。許可と特許は同じ。免除は禁止の解除。辻さんに釣り竿がない図。代さんに眼鏡や釣り竿。口語を答え帯へ。ブランド名。

## 配役

| スロット | 陣営 | 役割（何をしたいか） | キャラ | 参照 |
|---|---|---|---|---|
| 正しい整理 | いい役 | 受験生（附款の有無を分ける） | ぴっちゅ | `pitchi.png` ＋ `pitchi_sheet.png` |
| 誤った主張 | 悪い役 | 誤った主張をする側（確認にも附款を付せるとする） | カチャドクロ | `kachadokuro.png` ＋ `kachadokuro_sheet.png` |
| 案内 | いい役 | 案内（暗記を指す。本文を隠さない） | ちゃちゃロット | `chachalot.png` ＋ `approved-smiling-hat-mascot.png` ＋ `approved-chachalot-pointer.png` |
| 準法律の語呂 | いい役（語呂） | 過去の辻さん（確・公・通・受を覚える） | 過去の辻さん | 参照PNGなし。てらしぃ指定の見た目で描く |
| 法律行為の語呂 | いい役（語呂） | 代さん（特認代と、下限は許可で免除を覚える） | 代さん | 参照PNGなし。てらしぃ指定の見た目で描く |

過去の辻さんと代さんは人物として描く。暗記カードの文字だけにしない。

## 1枚目 GPT Image プロンプト（附款）

```text
参照必須: 場面役はポーズシート pitchi_sheet.png と kachadokuro_sheet.png を照合する。ちゃちゃロットは全身指し棒正本 approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 附款は、原則として裁量のある法律行為的行政行為に付す。準法律行為的行政行為には付せない。裁量がない法律行為的行政行為には、原則として付せない。例外は、法令が認めるとき、または相手方の同意があるときだけ。目的と異なる附款は違法.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas/background: fully opaque solid warm off-white across 100% of the entire 16:9 canvas, including all four corners. No transparency, checkerboard, or unpainted margin.
Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Do not print brand names anywhere on the image.
DRAW two mnemonic people in addition to ぴっちゅ, カチャドクロ, and one ちゃちゃロット. Do not omit them.
Past 辻さん: one kind smiling middle-aged Japanese man, round glasses, fishing rod strapped on his back, casual clothes. Draw him large enough that the face, glasses, and fishing rod are clear. Do not shrink him into a thumbnail. Place him beside the 準法律行為的 row without covering the table. Furigana in small kana directly above 過去の辻:「かこのつじ」. Label under him:「過去の辻さん（確・公・通・受）」.
代さん: one different smiling adult Japanese man, sash reading 代, a small medal and a stamp, a placard reading「下限は、許可で免除」. No glasses. No fishing rod. Place him beside the 命令的 and 形成的 rows without covering the table. Label under him:「代さん（特に、代）」.
Neither covers the table, panels, or answer band. They are humans, not mascots, not ちゃちゃロット.

Left heading 論点. Right heading ひっかけ.
Q&A answers are YES, NO, or a short legal phrase. Do not use GO or STOP.
Labels: Left「受験生（附款の有無を分ける）」Right「誤った主張をする側（確認にも附款を付せるとする）」

Title:「附款は、原則として裁量があるときに付す」
Chip:「行政法総論」

Center ONLY: one table. Header navy. Row zebra white / light gray, horizontal not columns.
Columns: 区分 | 何があるか | 附款
Rows:
命令的（法律行為的） | 下命・禁止・許可・免除 | 裁量があるときに付し得る
形成的（法律行為的） | 特許・認可・代理 | 裁量があるときに付し得る
準法律行為的 | 確認・公証・通知・受理 | 付せない。例外も及ばない
Caption:「附款は条件・期限・負担・撤回権の留保」
Exception box under the table, not a new column zebra:「裁量がない法律行為的行政行為には、原則として付せない。例外は、法令が附款を認めるとき、または相手方の同意があるとき。」

Left 論点:
1. 準法律行為的に附款は付せるか？ → NO
2. 裁量がない法律行為的には？ → 原則NO。法令の定め、または相手方の同意があるときだけ
3. 裁量があれば何でも付せるか？ → NO（目的と異なる附款は違法）

Right ひっかけ:
- 確認にも附款を付せる
- 許可と特許は同じ行為
- 免除は禁止の解除
- 裁量がない行為にも附款を自由に付せる

Bottom:
- 判断軸:「意思表示で効果を発生させるか。法規が直接定めるか。裁量があるか」
- ひっかけ:「確認にも附款。許可＝特許。免除＝禁止の解除」
- 暗記:「確公通受は、過去の辻さん。準法律には附款を付せない」
Answer:「附款は、原則として裁量のある法律行為的行政行為に付す。裁量がない法律行為的行政行為には、法令の定めまたは相手方の同意があるときに限り付し得る。準法律行為的行政行為には付せない。目的と異なる附款は違法。」

Guide: ONE ちゃちゃロット only, SMALL bottom-right margin, wooden 指し棒 pointing at 暗記. Cream face, independent pale-sky-blue smiling hat with three rounded hills and a long brim (not ears, not a hood), closed smiling eyes, green lecturer jacket, white shirt, green trousers, shoes. No nameplate. Do not stand on the answer band.
Scene cast SMALL, do not cover the table: ぴっちゅ left, カチャドクロ right. Do not swap roles. No owl, bear, cat, raccoon.
```

## 2枚目（法律行為的の中身）は生成しない

生成済み。変更指示がない。この節に描画指示は置かない。`kakko-tsuji-horitsu.png` を描き直さない。

## 3枚目 GPT Image プロンプト（準法律行為的の中身）

```text
参照必須: 場面役は pitchi_sheet.png と kachadokuro_sheet.png。ちゃちゃロットは approved-chachalot-pointer.png。
Create a NEW Japanese legal-study infographic from scratch.
ONE job: 準法律行為的行政行為の中身。確認・公証・通知・受理。効果は法規が直接定める.
Quality: same density as q26-2.png. 16:9 warm off-white, slightly POP, VERY LARGE gothic Japanese, ZERO overlapping glyphs.
Canvas/background: fully opaque solid warm off-white across 100% of the entire 16:9 canvas. No transparency or unpainted margin.
Match LAYOUT of「主宰者の許可」: left green / right orange, ONE center TABLE, bottom 判断軸 / ひっかけ / 暗記.

Do not print brand names anywhere on the image.
DRAW 過去の辻さん in the lower-left margin, in addition to ぴっちゅ, カチャドクロ, and one ちゃちゃロット. Do not omit him. Do not draw 代さん on this sheet.
過去の辻さん: one kind smiling middle-aged Japanese man, round glasses, fishing rod strapped on his back, casual clothes. Draw him large enough that the face, glasses, and fishing rod are clear. Do not shrink him into a thumbnail. Do not cover the table or the answer band. Furigana in small kana directly above 過去の辻:「かこのつじ」. Label under him:「過去の辻さん（確・公・通・受）」. He is a human, not a mascot, not ちゃちゃロット.

Left heading 論点. Right heading ひっかけ.
Q&A answers are a short legal phrase. Do not use GO or STOP.
Labels: Left「受験生（法規が効果を定めると整理する）」Right「誤った主張をする側（通知も意思で効果を変えられるとする）」

Title:「効果は、法規が直接定める」
Chip:「準法律行為的行政行為」

Center ONLY: one table. Header navy. Row zebra white / light gray, horizontal not columns.
Columns: 行為 | 中身
Rows:
確認 | 事実・法律関係の存否を確定する
公証 | 事実・法律関係の存在を公に証明する
通知 | 事項を知らせ、効果は法規が定める
受理 | 他人の行為を有効なものとして受け取る
Caption:「確・公・通・受」

Left 論点:
1. 確認は？ → 存否の確定
2. 公証は？ → 存在の公の証明
3. 効果を決めるのは？ → 法規

Right ひっかけ:
- 受理は作為義務を課す
- 通知は行政庁の意思で効果を変えられる
- 確認にも附款を付せる
- 公証は新しい権利の設定

Bottom:
- 判断軸:「確定か、証明か、知らせか、受け取りか」
- ひっかけ:「受理＝下命。通知も意思表示。確認に附款」
- 暗記:「確公通受は、過去の辻さん」
Answer:「確認は存否の確定、公証は存在の証明、通知は告知、受理は受領。効果はいずれも法規が定める。」

Guide: ONE ちゃちゃロット only, SMALL bottom-right, green lecturer suit, white shirt, green trousers, shoes, independent pale-sky-blue smiling hat, wooden 指し棒 at 暗記. No nameplate. Do not stand on the answer band.
Scene cast SMALL: ぴっちゅ left, カチャドクロ right. Do not cover the table. No owl, bear, cat, raccoon.
```
